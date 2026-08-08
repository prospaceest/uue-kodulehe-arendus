// Single source of truth for non-product page URLs and their locale pairs.
//
// Why this exists: canonical, hreflang, internal links and both sitemaps must
// agree. They didn't — hub pages hardcoded the ET URL as canonical in BOTH
// locales (so every RU hub page declared itself a duplicate of the Estonian one)
// while their hreflang pointed at /ru/led-profili/* paths that had no route, and
// the sitemap advertised a third variant. Everything now reads the table below.
//
// Product URLs are NOT here — they come from catalog.json (`urlPath` /
// `urlPathRu`). Same rule applies there: read, never compute.
//
// I18N_SPEC.md §1: RU slugs are Russian transliterated to Latin — ranks in
// Google.ee + Yandex, and survives copy-paste (Cyrillic would percent-encode).

export const BASE = 'https://varjuprofiilid.ee';

// ── ET path → RU path ───────────────────────────────────────────────────────
// The RU side is the PUBLIC url. Internally every RU page is still served by the
// Estonian-named route (app/[locale]/tooted/…); middleware.ts rewrites the RU
// slug onto it, so no route directories are duplicated.
//
// Category paths follow I18N_SPEC.md §2: led-profili / dekor-profili +
// potolok / pol / stena / centralnyj.
const RU_PATHS: Record<string, string> = {
  '/': '/ru',
  '/tooted': '/ru/katalog',
  '/kkk': '/ru/faq',
  '/tarne': '/ru/dostavka',
  '/garantii': '/ru/garantiya',
  '/impressum': '/ru/rekvizity',
  '/kontakt': '/ru/kontakty',
  '/salong': '/ru/salon',
  '/meist': '/ru/o-nas',
  '/professionaalidele': '/ru/professionalam',
  '/inspiratsioon': '/ru/vdohnovenie',
  '/mis-on-varjuprofiil': '/ru/chto-takoe-tenevoy-profil',
  '/uudised': '/ru/novosti',
  // Hub + category pages
  '/led-varjuprofiilid': '/ru/led-profili',
  '/led-varjuprofiilid/lae': '/ru/led-profili/potolok',
  '/led-varjuprofiilid/poranda': '/ru/led-profili/pol',
  '/led-varjuprofiilid/seina': '/ru/led-profili/stena',
  '/led-varjuprofiilid/kesklae': '/ru/led-profili/centralnyj',
  '/varjuprofiilid': '/ru/dekor-profili',
  '/varjuprofiilid/lae': '/ru/dekor-profili/potolok',
  '/varjuprofiilid/poranda': '/ru/dekor-profili/pol',
  '/varjuprofiilid/seina': '/ru/dekor-profili/stena',
  // Utility pages — noindex, but the RU visitor still deserves a Russian URL.
  // /konto* and /sign-in|/sign-up stay untranslated: they are matched by name in
  // Clerk's isProtectedRoute matcher, so renaming them is an auth change, not an
  // SEO one.
  '/otsing': '/ru/poisk',
  '/korv': '/ru/korzina',
  '/tellimus': '/ru/zakaz',
};

// Content sections whose child slugs pass through untranslated (project and post
// slugs are content, not navigation): /ru/vdohnovenie/eduardi-maja.
const RU_PARENTS: [ruParent: string, etParent: string][] = [
  ['/ru/vdohnovenie', '/inspiratsioon'],
  ['/ru/novosti', '/uudised'],
];

// Reverse lookup for middleware: public RU path → Estonian-named internal path.
const RU_TO_INTERNAL: Record<string, string> = Object.fromEntries(
  Object.entries(RU_PATHS).map(([et, ru]) => [ru, et === '/' ? '/ru' : `/ru${et}`]),
);

// ── Page inventory ─────────────────────────────────────────────────────────
// Indexable non-product pages, keyed by Estonian path. Drives both sitemaps.
// NB: /otsing, /korv, /tellimus, /konto/*, /sign-in, /sign-up and /uudised/* are
// deliberately noindex — they are not listed here.
export const STATIC_PAGES = [
  '/',
  '/tooted',
  '/kkk',
  '/tarne',
  '/garantii',
  '/impressum',
  '/kontakt',
  '/salong',
  '/meist',
  '/professionaalidele',
  '/inspiratsioon',
  '/mis-on-varjuprofiil',
  '/led-varjuprofiilid',
  '/led-varjuprofiilid/lae',
  '/led-varjuprofiilid/poranda',
  '/led-varjuprofiilid/seina',
  '/led-varjuprofiilid/kesklae',
  '/varjuprofiilid',
  '/varjuprofiilid/lae',
  '/varjuprofiilid/seina',
  '/varjuprofiilid/poranda',
];

export const INSPIRATION_SLUGS = ['eduardi-maja', 'tallinna-korter', 'viimsi-vannituba'];

// Blog is hidden (2026-07) until real posts are ready — /uudised/* is noindex.
// Flip this together with the noindex in app/[locale]/uudised/layout.tsx and the
// commented-out nav link in components/layout/Header.tsx.
export const BLOG_ENABLED = false;
export const BLOG_SLUGS = [
  'varjuprofiil-pohjalik-juhend', 'varjuprofiili-tuubid', 'peitliist-interjooris',
  'varjuprofiil-vs-porandaliist', 'varjuvuuk-kogu-ruumis', 'varjuvuuk-eesti-standard',
  'porandaliistu-stiilid-2026', 'peitliist-eelised-7-pohjust',
];

// ── Helpers ────────────────────────────────────────────────────────────────

// ET path → public RU path. Falls back to `/ru` + the ET path for anything not
// in the table (so a new page is reachable in RU before it gets a slug).
export function ruPath(etPath: string): string {
  const [path, query] = etPath.split('?');
  const mapped = RU_PATHS[path];
  if (mapped) return query ? `${mapped}?${query}` : mapped;

  for (const [ruParent, etParent] of RU_PARENTS) {
    if (path.startsWith(`${etParent}/`)) {
      return `${ruParent}${path.slice(etParent.length)}${query ? `?${query}` : ''}`;
    }
  }
  return `/ru${etPath}`;
}

// Internal-link helper — the only correct way to build a locale-aware href.
// Pass the Estonian path (with optional query): lp('/tooted?cat=Tarvikud', locale)
export function lp(etPath: string, locale: string): string {
  return locale === 'ru' ? ruPath(etPath) : etPath;
}

// Public RU path → Estonian-named internal path, for the middleware rewrite.
// Returns null when the path needs no rewrite (ET pages, RU product URLs served
// by the [...slug] catch-all, /api, …).
export function internalRuPath(publicPath: string): string | null {
  const exact = RU_TO_INTERNAL[publicPath];
  if (exact) return exact;

  for (const [ruParent, etParent] of RU_PARENTS) {
    if (publicPath.startsWith(`${ruParent}/`)) {
      return `/ru${etParent}${publicPath.slice(ruParent.length)}`;
    }
  }
  return null;
}

// Self-canonical for the current locale + the hreflang pair. x-default points at
// Estonian: primary market, and the prefix-less URL.
export function abs(path: string): string {
  return path === '/' ? BASE : `${BASE}${path}`;
}

export function pageAlternates(etPath: string, locale: string) {
  const ru = ruPath(etPath);
  const self = locale === 'ru' ? ru : etPath;
  return {
    canonical: abs(self),
    languages: {
      et: abs(etPath),
      ru: abs(ru),
      'x-default': abs(etPath),
    },
  };
}
