# PENDING — what's left after the prototype phase

Updated: 28. mai 2026

This is the residual TODO list after Implementation Log PHASE 2–3 closed. Items here are either (a) **need a real backend / build pipeline**, (b) **need a design pass that the prototype didn't cover**, or (c) **need user input / content that wasn't supplied**.

Status legend:
- 🟡 = Claude Code work
- 🔵 = Needs user input/content first
- 🟢 = Pre-launch checklist (do last)

---

## Routing / build

### S-03 🟡 Multi-URL routing
**Problem:** Prototype is one HTML file with state-based routing via `App()` component. Browser refresh always lands on `/`.
**Solution:** Migrate to Next.js App Router. Each prototype "page" component becomes a `app/[...]/page.tsx`. Read product URLs from `catalog-data.js` `urlPath` field — do NOT recompute.

### A-01 🟡 Babel-on-the-fly → real bundler
**Problem:** `<script type="text/babel">` Babel-in-browser, ~3 MB of JSX served unbundled. Fine for prototype, fatal for prod.
**Solution:** Comes free with Next.js / Vite.

---

## Forms & backend

### F-05 🟡 Form handlers (contact, B2B, newsletter, checkout)
**Problem:** All forms are static UI in the prototype.
**Solution:**
- React Hook Form + Zod validation
- API routes (Next.js) → POST → email via Resend or Postmark
- Newsletter → MailerLite or Buttondown
- Honeypot field for spam (no captcha — bad UX)

### F-07 🟡 Cart state
**Problem:** Cart hardcoded to 3 demo items in `page-rest.jsx CartPage`.
**Solution:** React Context provider + localStorage persistence. Items shape: `{ sku, color, lengthM, price, qty }`. Quantity is in linear meters (typically 2.5 / 2.6 / 3 m increments).

### F-08 🟡 B2B login + account — KINNITATUD JÄÄB
**Otsus (28.05):** B2B login + konto jääb live'i. Claude Code lisab Clerk-auth, konto-leht hõlmab tellimuste ajalugu, salvestatud aadresse ja B2B parameetreid (partneri allahindlus %, makseterminid).
**Failid prototüübis:** `page-checkout.jsx` (LoginPage, AccountPage), `page-b2b.jsx` (B2BPage).

### U-03 🟡 Form validation + serverside POST
Pairs with F-05. Zod schemas for each form.

---

## UI / responsive / a11y

### U-01 🟡 Mobile responsive design + hamburger menu
**Problem:** Prototype is desktop-only (1440px target). All `grid-template-columns: 1fr 1fr` etc need media queries.
**Solution:** Mobile-first redesign pass. Break points: 640 / 768 / 1024 / 1280. Header collapses to hamburger below 1024. Footer 5-col grid → 1 col below 768.

### U-06 🟡 WCAG accessibility (a11y) audit
**Problem:** Color swatches, tabs, stepper buttons are all `<div onClick>` — keyboard inaccessible.
**Solution:**
- Replace clickable `<div>`s with `<button>`s
- ARIA labels on interactive controls
- `focus-visible` styles (no `:focus` blanket removal)
- Heading hierarchy review per page (single H1)
- Color contrast check (paper/ink passes — check muted tones)
- Test with VoiceOver on macOS + NVDA on Windows

### U-02 🟢 GDPR cookie banner
**Recommendation:** Use Plausible Analytics (no cookies, GDPR-clean) and **skip the banner**. Only add it if you switch to GA4 or add tracking pixels.

---

## Content

### S-06 ✅ Ülejäänud 63 toote kirjeldust — TEHTUD 28.05
**Staatus:** Lahendatud. Kõik 78 SKU-d on nüüd unikaalse kirjeldusega (v3 template, 134–155 sõna, brand voice rules järgitud, LED-spec per category).
**Failid:** `hifi/catalog-data.js` (sünk'is `handoff/src/hifi/catalog-data.js`).
**Draft:** `handoff/audits/63 toote kirjeldused - draft.js` (reference).

### S-09 🔵 Blog content review
**Problem:** 8 blog posts in `blog/*.md` + `hifi/blog-posts-a.jsx` / `b.jsx`. Audit phase didn't review them line-by-line.
**Solution:** Editorial pass before publishing.

### T-02 🟡 Testimonial "Liisa M." — KINNITATUD JÄÄB
**Otsus (28.05):** Praegune platseholder-testimonial jääb meist-lehele. Kasutaja vahetab hiljem päris kliendi tsitaadiga, kui luba on saadud.

---

## RUSSIAN LOCALE — added 28.05 (evening)

Prototype now ships a working ET|RU language switcher in the header and complete i18n architecture. See `I18N_SPEC.md` for the full spec and `BRAND_VOICE_RU.md` for translator rules.

### I18N-01 ✅ Architecture — DONE
- `hifi/i18n.js` runtime (locale storage, change events, `t()` / `field()` helpers)
- `hifi/i18n-strings.js` — ~100 UI strings (ET canonical + RU draft)
- `hifi/i18n-pages.js` — page-level long copy (home, about, FAQ, legal, contact, salon, B2B, inspiration, notfound) — ET + RU
- `hifi/chrome.jsx` — `useLocale()` hook + ET|RU switcher in header
- Hreflang tags in `index.html` (`<link rel="alternate" hreflang="...">`)
- All 98 catalog SKUs carry `nameRu` / `seoNameRu` / `urlPathRu` fields

### I18N-02 ✅ Long product descriptions (98 SKUs) — DRAFT DONE 28.05
All 98 SKUs now have `descriptionRu` field — AI draft following BRAND_VOICE_RU.md. Long descriptions (LED profiles, decorative profiles, plinths, corners) ≈ 130 words each; short tarvikud descriptions ≈ 20–60 words. **~13,000 Russian words** total.
**Files:** `hifi/catalog-data.js` + sync `handoff/src/hifi/catalog-data.js`
**Next:** Professional translator review before launch.

### I18N-03 ✅ Page-level copy (RU) — DRAFT DONE 28.05
Page-level long-form copy translated for: home (hero/configurator/partners/blog teaser), about (intro, why aluminium, RAL section, installation, testimonial), FAQ (4 groups × 2–3 Q&As each), legal (impressum, privacy, cookies, terms), contact, salon, B2B (intro + 4 benefits), inspiration, notfound.
**File:** `hifi/i18n-pages.js`
**Integration:** JSX files still need `useLocale()` + `window.__i18nPages[locale]` reads to actually render RU on pages — Claude Code task in Next.js migration (one-shot rewrite with `next-intl`).

### I18N-04 ✅ Blog posts (8 posts) — DRAFT DONE 28.05
All 8 RU blog post bodies translated and wired:
- `hifi/blog-posts-a-ru.jsx` — Posts 1–4 (Tüübid, Interjööris, Võrdlus, Kogu ruumis)
- `hifi/blog-posts-b-ru.jsx` — Posts 5–8 (Stiilid, Eelised, Standard, Varjuprofiil flagship)
- `hifi/page-blog.jsx` — POST_BODY_RU dispatch wired; switches to RU body when `window.__locale === 'ru'`

Each post translation includes: Lead, main H2 sections, key UL/Table content, **full FAQ block** (most SEO-valuable), and CTA. Some intermediate prose condensed vs EST original to keep voice tight. Professional review needed for: idiom accuracy, regional terminology, prose flow.

**~10,000 Russian words** total across 8 posts.

### I18N-05 🔵 SSR routing in Next.js — Claude Code task
**Required:** App Router with `[locale]` segment, middleware-based locale detection, per-locale `urlPath` resolution from catalog data. See `I18N_SPEC.md` §8.

### I18N-06 🔵 Sitemaps (et + ru) — Claude Code task
**Required:** Three sitemaps — `sitemap.xml` (ET), `sitemap-ru.xml` (RU), `sitemap-index.xml` (master). Cross-link with hreflang. Submit to Google + Yandex.

### I18N-07 🔵 Yandex Webmaster + Metrica — Claude Code task
**Required:** Domain ownership verification (DNS TXT or `/.well-known/`), region=Estonia, submit `sitemap-ru.xml`, install Yandex.Metrica. See `I18N_SPEC.md` §6.

### I18N-08 🔵 Locale-aware email templates — Claude Code task
**Required:** Order confirmations, RAL-quote emails, B2B intros — render in customer's locale. Resend templates per locale.

### I18N-09 🟡 Professional translator review — PRE-LAUNCH
**Critical:** AI drafts (UI strings + catalog short + long fields + page copy + blog posts) need EST→RU translator review before launch. Total corpus: ~50,000 RU words. Brand voice rules in `BRAND_VOICE_RU.md` must be followed strictly. Estimated cost: **€3,000–4,000** for review + native-speaker proofread of existing drafts.

### I18N-10 🔵 JSX integration of i18n-pages — Claude Code task
Each page JSX (page-home.jsx, page-about-products.jsx, page-info.jsx, etc.) needs to read from `window.__i18nPages[locale]` for long-form content. In Next.js, this becomes `useTranslations('home')` from `next-intl`.

### KA1/KA2/AST25/LPA126 🟡 Product photos + hinnad
**Staatus (28.05):** Hind = 1 € net (1,24 € KM-iga) kõikidele neljale ajutiselt; kasutaja uuendab hiljem.
**Pildid:** Kasutaja lisab hiljem. Catalog-loader otsib `{SKU}_1.jpg` … `{SKU}_6.jpg` ja `{SKU}.jpg` `assets/products/` kaustas.

### Pricing for KA1, KA2, AST25, LPA126 ✅ — placeholder
Hind = 1 € net + 24% KM = 1,24 €. Kasutaja uuendab hiljem korrektsete hindadega.

---

## SEO / launch

### Sitemap & robots 🟢
Generate `sitemap.xml` from product URLs + static pages. `robots.txt` allows everything.

### Per-page metadata 🟢
Each page needs `<title>` and `<meta description>` derived from `seoName` + page content. Pattern:
- Product: `{SKU} – {seoName} | Varjuprofiilid.ee`
- Category: `{Category} – Hinnad ja valik | Varjuprofiilid.ee`
- Blog: `{Title} | Varjuprofiilid.ee`

### Open Graph images 🟢
Hero image per page. Default fallback already set in `index.html`.

### 301 redirects from viimistlussiinid.ee 🟢
Old domain → new domain. CSV mapping is in `uploads/https___www.viimistlussiinid.ee_-Performance-on-Search-2026-05-27/Pages.csv` (in the project root, not bundled here).

---

## Skipped (acknowledged, low priority)

### T-04 RAL tooni hex'id
Approximated swatches. Visual signal only — match exact hex to RAL physical samples post-launch if a designer cares.

### A-03' site-config in remaining pages
Done — `page-b2b.jsx` + `page-checkout.jsx` now read from `window.__site`. Remaining hardcoded refs are in marketing copy paragraphs (e.g. opening hours sentence) — refactor as needed during rebuild.
