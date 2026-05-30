// ============================================================
// i18n — lightweight locale runtime
// ============================================================
//
// Loaded BEFORE other scripts in index.html.
//
// Exposes:
//   window.__locale            — current locale: 'et' | 'ru'
//   window.__i18n.set(locale)  — switch language (updates storage + dispatches event)
//   window.__i18n.t(key)       — translate UI string (reads window.__i18nStrings)
//   window.__i18n.field(p, k)  — read locale-aware field from a product
//                                e.g. field(p, 'seoName') returns seoNameRu when locale='ru'
//
// React components subscribe to changes via:
//   const [locale, setLocale] = React.useState(window.__locale);
//   React.useEffect(() => {
//     const h = (e) => setLocale(e.detail.locale);
//     window.addEventListener('vp-locale-change', h);
//     return () => window.removeEventListener('vp-locale-change', h);
//   }, []);
//
// SSR note (for Claude Code migration):
//   This runtime is a prototype convenience. In Next.js, locale is resolved by
//   middleware from the URL pathname (/ru/...) and passed via React context.
//   See handoff/I18N_SPEC.md.

(function () {
  const SUPPORTED = ['et', 'ru'];
  const DEFAULT_LOCALE = 'et';
  const STORAGE_KEY = 'vp-locale';

  function readFromUrl() {
    try {
      const path = window.location.pathname || '';
      if (path === '/ru' || path.startsWith('/ru/')) return 'ru';
    } catch (e) {}
    return null;
  }

  function readFromStorage() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function initialLocale() {
    const fromUrl = readFromUrl();
    if (fromUrl && SUPPORTED.includes(fromUrl)) return fromUrl;
    const fromStorage = readFromStorage();
    if (fromStorage && SUPPORTED.includes(fromStorage)) return fromStorage;
    return DEFAULT_LOCALE;
  }

  let current = initialLocale();
  window.__locale = current;

  window.__i18n = {
    get current() { return window.__locale; },
    supported: SUPPORTED.slice(),

    set: function (locale) {
      if (!SUPPORTED.includes(locale)) return;
      if (locale === window.__locale) return;
      window.__locale = locale;
      try { localStorage.setItem(STORAGE_KEY, locale); } catch (e) {}
      window.dispatchEvent(new CustomEvent('vp-locale-change', { detail: { locale: locale } }));
    },

    // Translate UI string. Returns key if missing.
    t: function (key, vars) {
      const all = window.__i18nStrings || {};
      const dict = all[window.__locale] || {};
      const fallback = all[DEFAULT_LOCALE] || {};
      let s = dict[key];
      if (s == null) s = fallback[key];
      if (s == null) return key;
      if (vars && typeof s === 'string') {
        for (const k in vars) s = s.replace('{' + k + '}', vars[k]);
      }
      return s;
    },

    // Read a locale-aware field from a product object.
    //   field(product, 'seoName') → product.seoNameRu when locale='ru', else product.seoName
    field: function (obj, fieldName) {
      if (!obj) return undefined;
      if (window.__locale === 'ru') {
        const ruKey = fieldName + 'Ru';
        if (obj[ruKey] != null && obj[ruKey] !== '') return obj[ruKey];
      }
      return obj[fieldName];
    },

    // Convenience: read currency-formatted price with locale-aware "€/m" suffix
    priceLabel: function () {
      return window.__locale === 'ru' ? '€/пог.м' : '€/jm';
    }
  };

  // Shortcut: inline ET/RU dispatch — tr('Pood', 'Магазин')
  // Accepts (et, ru) or ({et, ru}) form.
  window.tr = function (et, ru) {
    if (typeof et === 'object' && et !== null && !Array.isArray(et)) {
      return (window.__locale === 'ru' && et.ru != null) ? et.ru : et.et;
    }
    return (window.__locale === 'ru' && ru != null) ? ru : et;
  };

  // Convenience: read page-level long copy via window.__i18nPages
  window.pages = function () {
    const all = window.__i18nPages || {};
    return all[window.__locale] || all.et || {};
  };

  // ── Document-level SEO sync on locale change ───────────────
  // Reads ET defaults from <title>/<meta name="description"> and swaps to RU
  // equivalents stored in <meta name="title-ru"> / <meta name="description-ru">.
  // Also updates html lang, og:locale, og:title/description, twitter, canonical.
  function syncDocSeo() {
    const useRu = window.__locale === 'ru';
    const docEl = document.documentElement;
    docEl.setAttribute('lang', useRu ? 'ru' : 'et');

    const titleEt = (document.head.querySelector('title')?.dataset.et) ||
                    document.head.querySelector('title')?.textContent || '';
    const titleRu = document.head.querySelector('meta[name="title-ru"]')?.getAttribute('content') || titleEt;
    const descEt = (document.head.querySelector('meta[name="description"]')?.dataset.et) ||
                   document.head.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const descRu = document.head.querySelector('meta[name="description-ru"]')?.getAttribute('content') || descEt;

    // Cache ET originals on first run so we can switch back
    const titleEl = document.head.querySelector('title');
    if (titleEl && !titleEl.dataset.et) titleEl.dataset.et = titleEl.textContent;
    const descEl = document.head.querySelector('meta[name="description"]');
    if (descEl && !descEl.dataset.et) descEl.dataset.et = descEl.getAttribute('content') || '';

    const newTitle = useRu ? titleRu : (titleEl?.dataset.et || titleEt);
    const newDesc = useRu ? descRu : (descEl?.dataset.et || descEt);

    if (titleEl) titleEl.textContent = newTitle;
    document.title = newTitle;
    if (descEl) descEl.setAttribute('content', newDesc);

    const setMeta = (sel, val) => {
      const el = document.head.querySelector(sel);
      if (el) el.setAttribute('content', val);
    };
    setMeta('meta[property="og:title"]', newTitle);
    setMeta('meta[property="og:description"]', newDesc);
    setMeta('meta[name="twitter:title"]', newTitle);
    setMeta('meta[name="twitter:description"]', newDesc);
    setMeta('meta[property="og:locale"]', useRu ? 'ru_RU' : 'et_EE');

    // Canonical URL — append /ru/ for RU locale
    const canonEl = document.head.querySelector('link[rel="canonical"]');
    if (canonEl) {
      if (!canonEl.dataset.et) canonEl.dataset.et = canonEl.getAttribute('href') || '';
      const baseEt = canonEl.dataset.et;
      const newCanon = useRu && baseEt.startsWith('https://varjuprofiilid.ee/') && !baseEt.includes('/ru/')
        ? baseEt.replace('https://varjuprofiilid.ee/', 'https://varjuprofiilid.ee/ru/')
        : baseEt;
      canonEl.setAttribute('href', newCanon);
      setMeta('meta[property="og:url"]', newCanon);
    }
  }

  // Run once on load, then on every locale change
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', syncDocSeo);
    } else {
      syncDocSeo();
    }
    window.addEventListener('vp-locale-change', syncDocSeo);
  }
})();
