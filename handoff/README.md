# Varjuprofiilid.ee — Claude Code Handoff

**Project:** Estonian e-commerce site for aluminium shadow profiles (varjuprofiilid) — LED-ready and decorative, sold to consumers and B2B (architects, builders).
**Parent brand:** PROSPACE OÜ (umbrella). Sister sites: peitlenguksed.ee, prospace.ee (planned).
**Target URL:** https://varjuprofiilid.ee/
**Handoff date:** 28. mai 2026
**Source designer:** prospace.ee team (HTML prototype phase)

---

## About these files

The files in `src/` and `audits/` are **design references created as a single-page HTML prototype**, not production code to ship as-is. They are loaded with Babel-in-browser JSX, a custom state-based router, and unbundled `<script>` tags — a deliberate choice for the prototype phase that **must be replaced** with a real build pipeline (Next.js, Astro, or Vite + React Router) when shipping.

The task is to **recreate this design in a real codebase** — pixel-perfect — using the existing visual vocabulary, brand assets, copy and data. Treat the prototype's behavior, layouts, copy and component composition as the spec; replace the runtime architecture with whatever the target stack uses.

**Fidelity: HIGH.** Colors, typography, spacing, copy and data are final. Layouts are pixel-tuned at 1440px desktop. Mobile-responsive design is **not done** in the prototype (see `PENDING.md`).

---

## Tech stack — recommendation

| Concern | Recommendation | Reason |
|---|---|---|
| Framework | **Next.js 15 App Router** | Multi-URL SSR, image optimization, easy SEO/sitemap, Vercel deploy |
| Lang | TypeScript | Type the product model + page props |
| Styling | CSS Modules + the existing `style.css` token vars | Don't introduce Tailwind — preserve existing variable system |
| Data | JSON files in `/content/` initially → CMS later (Sanity/Strapi) | Catalog has 98 SKUs, ~8 blog posts, 5 inspiration projects |
| Forms | React Hook Form + Zod validation | Contact, B2B, newsletter, checkout |
| Email | Resend or Postmark | Order confirmation, contact form replies |
| Auth (B2B) | Clerk or Supabase Auth | B2B login + account page (`PENDING`) |
| Cart | React Context + localStorage initially, Zustand if it grows | Currently hardcoded 3 items in prototype |
| Analytics | Plausible (privacy-friendly, Estonia-compliant) | Avoid GA4 to skip cookie banner where possible |
| GDPR | Custom Estonian-language consent banner (only if Plausible isn't enough) | `PENDING` |
| Search | Local fuzzy (`fuse.js`) initially — site is small | 98 SKUs, fine in-memory |
| i18n | None initially. Site is Estonian-only. | English may come later — structure routes to allow it |

**Why not Astro?** This is more interactive than a content site (cart, configurator, B2B forms, search, account). Next.js is the safer pick for the interaction density.

---

## Site map

The prototype lives at a single URL with state-based routing. **Each of these becomes its own URL in production:**

### Static pages
| URL | Component (prototype) | Purpose |
|---|---|---|
| `/` | `page-home.jsx` | Home — hero, interactive showroom, categories, top 10, configurator, inspiration, B2B teaser, IG grid, blog, partners |
| `/tooted/` | `page-rest.jsx` → `CategoryHubPage` | All categories grid |
| `/tooted/[kategooria]/` | `page-catalog.jsx` | Category listing — filters, sort, Top 10 badges |
| `/[hub]/[asukoht]/[sku]/` | `page-product.jsx` | Product detail (URLs from `catalog-data.js` `urlPath`) |
| `/inspiratsioon/` | `page-inspiration.jsx` | Inspiration index |
| `/inspiratsioon/[slug]/` | `page-inspiration.jsx` → `ProjectPage` | Single project case study |
| `/uudised/` | `page-blog.jsx` → `BlogIndex` | Blog index |
| `/uudised/[slug]/` | `page-blog.jsx` → `PostPage` | Single blog post |
| `/meist/` | `page-about-products.jsx` | Brand story, RAL, process, value props (3 stats) |
| `/professionaalidele/` | `page-b2b.jsx` | B2B landing + signup form + account dashboard |
| `/kontakt/` | `page-rest.jsx` → `ContactPage` | Contact info + form + map |
| `/kkk/` | `page-info.jsx` → `FaqPage` | FAQ |
| `/tarne/` | `page-info.jsx` → `ShippingPage` | Shipping info |
| `/garantii/` | `page-info.jsx` → `WarrantyPage` | Warranty info |
| `/impressum/` | `page-info.jsx` → `LegalPage` | Legal page (reg.nr, KMKR, address) |
| `/otsing/` | `page-info.jsx` → `SearchPage` | Search results |
| `/korv/` | `page-rest.jsx` → `CartPage` | Cart |
| `/tellimus/` | `page-checkout.jsx` → `CheckoutPage` | Checkout |
| `/konto/` | `page-checkout.jsx` → `AccountPage` | B2B account (PENDING: auth) |
| `/konto/login/` | `page-checkout.jsx` → `LoginPage` | B2B login (PENDING: auth) |
| `/salong/` | `page-rest.jsx` → `ShowroomPage` | Showroom info + map |
| `/showroom-interaktiivne/` | `interactive-scene.jsx` `SceneLightbox` | Interactive 3-scene showroom (elutuba/köök/vannituba) with hotspots |

Total: **22 unique routes** + dynamic product/blog/inspiration slugs.

### URL strategy

Product URLs follow the pattern `/[hub]/[asukoht]/[sku]/` where:
- `hub` ∈ `led-varjuprofiilid` | `varjuprofiilid` | `alumiinium-porandaliistud` | `nurgaprofiilid` | `kardinaprofiilid` | `lisatarvikud`
- `asukoht` ∈ `lae` | `seina` | `poranda` (only for hub=led-varjuprofiilid and varjuprofiilid)
- `sku` = lowercase SKU with `_` → `-`

These URLs are stored in `catalog-data.js` as `urlPath`. **Don't compute them — use `urlPath` directly.** Full mapping in `audits/S-05 draft - 75 toote SEO-nimed.html`.

---

## Data model

### `window.__catalogProducts` (98 entries) — `src/hifi/catalog-data.js`

```typescript
type Product = {
  sku: string;            // 'AST22', 'ASP102', 'KA1' — primary key
  name: string;           // display name (often === sku)
  collection: string;     // 'Laeprofiilid' | 'Põrandaprofiilid' | 'Seina peiteprofiilid' | 'Põrandaliistud' | 'Nurgaprofiilid' | 'Kardinaprofiilid' | 'Lisatarvikud' | 'Muud tooted'
  price: number;          // EUR per linear meter, VAT incl. (24% Estonia)
  ribbon?: string;        // 'LAOS' | 'UUS' | ''
  inStock: boolean;
  description: string;    // Estonian description (15 are unique, ~64 use a template — see PENDING.md S-06)
  colors: Array<{ hex: string; name: string; price: number }>;
  specs: Array<{ k: string; v: string }>;
  ralPrice?: number;
  ledCompatible: boolean; // shows ⚡ badge
  seoName: string;        // 'Lae LED varjuprofiil' — H1 suffix
  slug: string;
  urlPath: string;        // '/led-varjuprofiilid/lae/ast22/'
};
```

### `window.__catalogCategories` — also in `catalog-data.js`

```typescript
type Category = { name: string; count: number };
```

### `window.__site` — `src/hifi/site-config.js`

Single source of truth for company info (email, phone, address, reg.nr, KMKR, social links). **All UI reads from here** — don't hardcode.

### `window.__productImages` — `src/hifi/product-images.js`

`{ [SKU]: string[] }` — array of image paths in `assets/products/`. Some SKUs have 6+ photos; new SKUs (KA1, KA2, AST25, LPA126) have none — user will upload later.

### Blog posts — `src/hifi/blog-posts-a.jsx`, `blog-posts-b.jsx`

8 long-form posts written as React components using helper primitives (`<P>`, `<H2>`, `<UL>`, `<Table>`, `<FaqBlock>`, `<Lead>`). Markdown source is in `src/blog/*.md`. **In production: store as MDX or move to a CMS.**

### Inspiration projects — `src/hifi/page-inspiration.jsx`

5 case studies with cover image, gallery, profile usage, copy. Move to CMS once published frequency picks up.

---

## Design system

### Colors (CSS variables in `src/hifi/style.css`)

```css
--paper:       #F5F2EC;  /* primary background, warm off-white */
--paper-2:     #ECE7DD;  /* secondary background, slightly darker */
--ink:         #1A1A18;  /* primary text, warm near-black */
--ink-2:       #4A4844;  /* secondary text */
--muted:       #8A8680;  /* tertiary, captions */
--accent:      #B84E2E;  /* terracotta — used sparingly for CTAs, eyebrows */
```

### Typography

```css
'Bebas Neue', sans-serif       /* display headlines — H1, H2, big numerals */
'Inter', sans-serif            /* body, UI */
'Inter', serif (italic 300)    /* italic emphasis only (loaded as Inter, faked) */
'JetBrains Mono', monospace    /* eyebrows, labels, technical specs */
```

Scale: H1 80–120px (clamp), H2 40–56px, body 14–16px, eyebrow 10–11px monospace uppercase letter-spacing 0.08–0.1em.

### Layout

- Page max-width: **1320–1440px** on most sections; some sections full-bleed
- Standard padding: **56px horizontal, 72–96px vertical** between sections
- Border style: **1.5px solid var(--ink)** (heavy, intentional) — this is the visual signature
- No border radius — sharp corners everywhere. Don't introduce roundness.
- Spacing scale: roughly 4 / 8 / 12 / 16 / 24 / 32 / 48 / 56 / 72 / 96 px

### Component tokens

- Buttons (`.vp-btn`): 1.5px border, mono font label, uppercase, no radius
- Inputs (`.vp-input`): 1.5px border below, no radius, body font
- Eyebrow text (`.vp-eyebrow`): mono, 10–11px, uppercase, letter-spacing 0.08em, accent color
- Display text (`.vp-display`): Bebas Neue, line-height 0.92–1, letter-spacing 0.005em

Full token list: `src/hifi/style.css` (lines 1–~80 are the variable block).

---

## What's done vs. pending

See `PENDING.md` for the full list. Top-line:

**Done in prototype (port these verbatim):**
- All 22 routes + components, copy, layout
- Catalog data: 98 SKUs with prices, colors, specs, SEO names, URLs
- 15 unique product descriptions (see catalog-data.js `description` field for AST22, AST5, AST50, AST201, ASPL100, ASP102, ASP116, ASP610, LPA909, ASP78, KA1, KA2, AST25, RST12, LPA126)
- Real contact info, reg.nr (16821459), KMKR (EE102661499)
- JSON-LD schema (Organization + WebSite)
- 8 blog posts
- 5 inspiration projects
- Interactive showroom (3 scenes, drag-able hotspots in dev mode)
- `tel:` and `mailto:` everywhere
- Search filter on catalog
- Top 10 product ranking
- Configurator tool (meter input + profile picker → quote)

**Pending — needs Claude Code work:**
- Multi-URL routing + SSR
- Mobile responsive layouts (currently desktop-only)
- Cart state (React Context + localStorage)
- Forms (contact, B2B, newsletter, checkout) — POST handlers + email
- B2B auth + account
- GDPR cookie banner (only if needed past Plausible)
- WCAG a11y audit + fixes (semantic buttons, ARIA, focus-visible)
- Remaining 64 product descriptions (template currently)
- Babel-on-the-fly → Vite/Next bundler
- Image optimization (Next/Image)
- Sitemap.xml generation
- robots.txt

---

## Brand voice & copy rules

Established by the user (Harry) during audit phase — **follow strictly:**

1. **No "shadow gap" jargon.** Use *varjujoon* or *varjuefekt*.
2. **No "subtiilne".** Use *peen* or *vaoshoitud*.
3. **No "premium" or marketing puffery.** State facts.
4. **No "hõljuva mööbli efekt".** Furniture doesn't float in air. *Hõljuva lae / hõljuva seina* are OK (architectural metaphors).
5. **"Kipsplaadi alla", not "kipsplaadi taha"** — profiles install BELOW drywall, not behind.
6. **Color names:** "anodeeritud hõbe" is a *color name* (matches anodized finish look), not a process — don't write "anodeeritud (hõbe)" suggesting it IS anodized.
7. **LED specs by category:**
   - Ceiling profiles: `12 W/m · 234 LED/m · 3000K · 24V`
   - Floor/wall profiles: `COB 16 W/m · 1350 lm/m · CRI 94 · 24V`
8. **Standard lengths:** ceiling 2.5 m (AST35 = 3 m), floor 2.6 m, LPA909/LPA126 = 3 m.
9. **VAT:** 24% (Estonia since July 2025). All `price` fields include VAT.

---

## Files in this handoff

```
handoff/
├── README.md              ← you are here
├── CLAUDE.md              ← drop into the repo root after migration
├── PENDING.md             ← what's left to build
├── DESIGN_TOKENS.md       ← extracted tokens
├── src/                   ← prototype source (READ-ONLY reference)
│   ├── index.html         ← prototype entry (Varjuprofiilid Hi-Fi.html)
│   ├── style.css
│   ├── site-config.js
│   ├── catalog-data.js
│   ├── product-images.js
│   ├── hifi/              ← all React/JSX components
│   ├── blog/              ← markdown source for blog
│   └── tweaks-panel.jsx   ← dev-only, can be discarded in prod
├── audits/                ← decisions log + content briefs
│   ├── Pre-production audit.html
│   ├── Implementation log.html
│   ├── Content gap audit.html
│   ├── URL strateegia ja kategooriabriefid.html
│   ├── S-05 draft - 75 toote SEO-nimed.html
│   ├── 10 unikaalse toote kirjeldused.html
│   ├── 5 uut toodet - kirjeldused.html
│   └── Mis on varjuprofiil.html
└── assets/                ← logos, fonts (product images live in source assets/)
```

---

## Suggested implementation order

1. **Scaffold Next.js 15 app, install Inter + Bebas Neue + JetBrains Mono from Google Fonts.**
2. **Port `style.css` and CSS variables.** Verify visual parity on a single static page first.
3. **Port `site-config.js` → `lib/site.ts`** (TypeScript constant).
4. **Port `catalog-data.js` → `content/catalog.json`** + a typed data loader.
5. **Build the chrome (`Header`, `Footer`, `Marquee`) as RSC.**
6. **Build the catalog page first** (static, data-only) — verify pixel parity.
7. **Build the product detail page** — verify URL pattern + image fallback.
8. **Build the home page** — most complex layout, lots of sections.
9. **Build remaining static pages** (info, legal, FAQ, shipping, warranty).
10. **Build forms** — contact, B2B, newsletter (Resend integration).
11. **Build cart + checkout** (Context + localStorage first).
12. **Build B2B auth + account** (Clerk).
13. **Mobile responsive pass** across everything.
14. **a11y pass** — replace clickable divs with buttons, ARIA, focus-visible.
15. **SEO finalization** — generate sitemap, robots.txt, per-page metadata from `seoName`.
16. **Image optimization** — convert source JPGs to Next/Image with proper alt text (already written, see `coverAlt` / `alt` fields in inspiration data).

Don't try to do (1)–(9) sequentially if you can parallelize.
