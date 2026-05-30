# I18N_SPEC.md — Russian locale (et + ru) for Varjuprofiilid.ee

**Created:** 28. mai 2026 — prototype phase
**Status:** Architecture + UI strings + catalog short fields done. Long content (78 product descriptions, 8 blog posts, ~25 pages of copy) is **AI draft** and needs professional EST→RU translator review before launch.

This spec tells Claude Code how to wire the Russian locale alongside Estonian in the Next.js migration.

---

## 1. Locale strategy

| Decision | Value | Rationale |
|---|---|---|
| Default locale | `et` | Brand is Estonian-first |
| Secondary locale | `ru` | Estonian-Russian community (~25% of population) |
| URL pattern | **Subfolder** `/ru/...` | Best SEO — domain authority shared, hreflang clean, single sitemap |
| Slug language | **Russian transliterated to Latin** (`/ru/led-profili/potolok/ast22/`) | Universal support, ranks in Google.ee + Yandex; avoids URL-encoded Cyrillic in shares |
| Cookies | `vp-locale` localStorage + cookie mirror for SSR | Persists user choice |
| Fallback chain | URL pathname → cookie → `Accept-Language` → `et` | URL wins so links survive |

**No subdomain (`ru.varjuprofiilid.ee`)** — would split domain authority. **No query param** (`?lang=ru`) — bad SEO.

---

## 2. URL slug mapping

The same SKU lives at TWO URLs (one per locale). Both URLs return canonical-self + `hreflang` pointing to the other locale.

### Category hub mapping

| Estonian path | Russian path |
|---|---|
| `/led-varjuprofiilid/` | `/ru/led-profili/` |
| `/varjuprofiilid/` | `/ru/dekor-profili/` |
| `/alumiinium-porandaliistud/` | `/ru/alyuminievye-plintusy/` |
| `/kardinaprofiilid/` | `/ru/karniznye-profili/` |
| `/nurgaprofiilid/` | `/ru/uglovye-profili/` |
| `/tarvikud/` | `/ru/aksessuary/` |

### Location segment mapping (used under led-profili / dekor-profili)

| Estonian | Russian |
|---|---|
| `/lae/` | `/potolok/` |
| `/poranda/` | `/pol/` |
| `/seina/` | `/stena/` |

### Tarvikud descriptor suffix mapping

| Estonian | Russian |
|---|---|
| `-otsakork` | `-zaglushka` |
| `-sisemine-nurk` | `-vnut-ugol` |
| `-valimine-nurk` | `-vnesh-ugol` |
| `-uhendus` | `-soedinitel` |
| `hajuti-matt` | `diffuzor-matovyy` |

### Example mappings

```
/led-varjuprofiilid/lae/ast22/         →  /ru/led-profili/potolok/ast22/
/varjuprofiilid/poranda/asp117/        →  /ru/dekor-profili/pol/asp117/
/alumiinium-porandaliistud/mpa013/     →  /ru/alyuminievye-plintusy/mpa013/
/kardinaprofiilid/ka1/                 →  /ru/karniznye-profili/ka1/
/tarvikud/asp60-otsakork/              →  /ru/aksessuary/asp60-zaglushka/
```

**Source of truth:** every catalog product carries both `urlPath` and `urlPathRu` fields. Never compute URLs at runtime — read from the product object.

---

## 3. Catalog data — RU fields

Each of the 98 SKUs in `catalog-data.js` now has these RU fields (alongside their EST equivalents):

| Field | Purpose |
|---|---|
| `nameRu` | Display name (usually equal to `name` since names are SKU codes; 8 descriptive names translated) |
| `seoNameRu` | H1 / title tag / breadcrumb — the descriptive category-level label |
| `urlPathRu` | The Russian URL path (with `/ru` prefix in the actual URL but stored without it in data — prepend at render time) |

**TODO (Claude Code or later content sprint):**
- `descriptionRu` — long product description (134–155 words each, 78 SKUs)
- `specs[].kRu` / `specs[].vRu` — spec table keys/values (or use a separate spec-translation dict)

---

## 4. hreflang & metadata

Every page emits these tags:

```html
<link rel="canonical" href="https://varjuprofiilid.ee/{path}/" />
<link rel="alternate" hreflang="et" href="https://varjuprofiilid.ee/{path-et}/" />
<link rel="alternate" hreflang="ru" href="https://varjuprofiilid.ee/ru/{path-ru}/" />
<link rel="alternate" hreflang="x-default" href="https://varjuprofiilid.ee/{path-et}/" />
```

For the prototype phase, these are added to the homepage in `index.html`. **In Next.js, generate them per route from the metadata API.**

Per-page meta to translate:
- `<title>` — short, locale-specific
- `<meta name="description">` — locale-specific
- Open Graph: `og:title`, `og:description`, `og:locale` (`et_EE` or `ru_RU`), `og:locale:alternate`
- Twitter: `twitter:title`, `twitter:description`
- Schema.org `Product.name`, `Product.description` — locale-specific JSON-LD blocks

---

## 5. Sitemap & robots

Two sitemaps, both submitted to Google + Yandex:

```
/sitemap.xml          # Estonian URLs only
/sitemap-ru.xml       # Russian URLs only
/sitemap-index.xml    # Master index linking both
```

Each `<url>` entry includes `<xhtml:link rel="alternate" hreflang="..." href="..."/>` for the other locale.

`robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://varjuprofiilid.ee/sitemap-index.xml
Sitemap: https://varjuprofiilid.ee/sitemap.xml
Sitemap: https://varjuprofiilid.ee/sitemap-ru.xml
```

---

## 6. Yandex setup (priority)

Estonian-Russians use **both Google.ee + Yandex** for Russian-language search.

Pre-launch checklist:
1. Register `varjuprofiilid.ee` in **Yandex Webmaster** (yandex.com/support/webmaster) using domain ownership verification (DNS TXT or HTML file in `/.well-known/`)
2. Submit `sitemap-ru.xml` explicitly in Yandex Webmaster
3. Add region preference: **Эстония (Estonia)** — not Russia/Belarus/Kazakhstan
4. Add `mirror` directive if domain has both http and https versions
5. Yandex.Metrica install (alternative to Google Analytics; preferred by Russian-speaking audience analytics)
6. Add Yandex.Verify meta:
   ```html
   <meta name="yandex-verification" content="YOUR_CODE_HERE" />
   ```
7. Submit indexing request for `/ru/` paths after launch

**For prototype phase: skip Yandex Webmaster registration — defer to Claude Code launch sprint.**

---

## 7. Prototype runtime (current implementation)

The prototype carries a lightweight `window.__i18n` runtime that demonstrates the architecture. It is **deprecated on Next.js migration** — replace with `next-intl` or Next.js native i18n routing.

### Files

| File | Role |
|---|---|
| `hifi/i18n.js` | Locale storage + change events; exposes `window.__i18n.t() / .set() / .field()` |
| `hifi/i18n-strings.js` | Flat UI string catalog `{ et: {...}, ru: {...} }` — ~100 keys |
| `hifi/chrome.jsx` | Adds `useLocale()` React hook + ET\|RU switcher in header |
| `hifi/catalog-data.js` | Carries `nameRu` / `seoNameRu` / `urlPathRu` for all 98 SKUs |

### Switcher UX

Right-side of the header has a compact `ET | RU` toggle. Active locale = bold + full opacity. The toggle updates `localStorage`, dispatches `vp-locale-change`, and components subscribed via `useLocale` re-render.

In Next.js, replace the switcher with `<Link href={alternateUrlForOtherLocale}>` so the URL updates too (and SSR delivers RU content).

---

## 8. Migration to Next.js — checklist for Claude Code

Recommended approach: **`next-intl`** (most flexible) or Next.js built-in App Router i18n.

1. **App structure:**
   ```
   app/[locale]/(...routes)/page.tsx
   app/[locale]/layout.tsx
   middleware.ts                  # detects locale, redirects /ru → /ru/, etc.
   lib/i18n/
     ├ messages.et.json           # convert hifi/i18n-strings.js → JSON
     ├ messages.ru.json
     └ config.ts                  # locale list, default, mapping helpers
   ```

2. **Catalog routing:**
   - Slug-based catch-all: `app/[locale]/[hub]/[asukoht]/[sku]/page.tsx`
   - Read `urlPathRu` vs `urlPath` based on `locale` param
   - `generateStaticParams()` enumerates all product paths in both locales
   - 404 if a path doesn't match either locale's `urlPath` for that SKU

3. **Metadata:**
   - Use Next.js `generateMetadata()` per route
   - Localized `title`, `description`, `openGraph.locale`, `alternates.languages`

4. **Forms:**
   - Email subject/body to admin: include locale tag (`[ET]` or `[RU]`)
   - Customer-facing confirmation emails: send in customer's locale (use Resend templates per locale)

5. **Search:**
   - Index both `name` + `nameRu`, `description` + `descriptionRu`, plus tag synonyms
   - Russian users search both Cyrillic ("потолочный") and Latin ("led profil") — index both forms

6. **Currency:** Stays in € for both locales. EU/Estonia legal — VAT 24%. Don't show ₽ even in RU.

---

## 9. What still needs human translation review

This is the prototype's AI draft. Before launch, a professional EST→RU translator should review:

- [x] `i18n-strings.js` — all `ru:` keys (~100 strings) — **DRAFT DONE 28.05**
- [x] `i18n-pages.js` — page-level long copy for home, about, FAQ, legal, contact, salon, B2B, inspiration, notfound — **DRAFT DONE 28.05**
- [x] `catalog-data.js` — all `seoNameRu` (35 unique values) + descriptive `nameRu` (8 values) + `urlPathRu` (98 SKUs) — **DONE 28.05**
- [x] All 98 `descriptionRu` (long-form, ~135 words each, ~13,000 words total) — **DRAFT DONE 28.05**
- [x] All 8 blog posts (`blog-posts-a-ru.jsx`, `blog-posts-b-ru.jsx`) — **DRAFT DONE 28.05** (Lead + main sections + FAQ; some prose condensed vs ET)
- [ ] Email templates (order confirmation, RAL quote, B2B intro, newsletter) — Claude Code task
- [ ] Cookie banner + GDPR copy — Claude Code task
- [ ] 404 / error pages — partially in `i18n-pages.js`; expand in Claude Code phase

Estimated remaining: ~5,000 Russian words of email/legal templates + native-speaker review of all AI drafts. Budget for a professional EST→RU translator at €0.08–0.12/word + native proofreader on the existing ~50,000-word AI corpus = ~€3,000–4,000.

**Brand voice rules for the translator** — see `BRAND_VOICE_RU.md`.

---

## 10. How to render RU on pages (prototype runtime)

The prototype demonstrates RU in three places:

1. **Header / footer UI labels** — translated via `t()` in `chrome.jsx` (powered by `i18n-strings.js`).
2. **Catalog product list / detail pages** — read locale-aware fields via `window.__i18n.field(product, 'seoName')` etc. (Most JSX files still need this integration — only chrome.jsx is wired in the prototype.)
3. **Blog posts** — `page-blog.jsx` dispatches to `*Ru` body components when `window.__locale === 'ru'`. All 8 RU post bodies are available as window globals.

**For pages NOT yet wired** (Home long-form, About, FAQ, Legal, Contact, Inspiration, B2B, Salon, Checkout, Product details): the RU content exists in `i18n-pages.js` and the JSX needs `useLocale()` + `window.__i18nPages[locale].xxx` integration. This is a Claude Code task during Next.js migration — in Next.js, the `[locale]` URL segment + server-side rendering replaces this manual wiring.

The architecture is correct; the visible RU experience is partial in the prototype because rewriting every JSX to use `t()` would risk breaking the EST output. Claude Code will replace this whole prototype with `next-intl`-powered SSR, so the integration work is one-shot.
