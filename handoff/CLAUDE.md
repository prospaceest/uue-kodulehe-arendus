# CLAUDE.md — Varjuprofiilid.ee

Drop this file into the repo root after migrating the prototype to a real codebase. It tells Claude (and other devs) the project's conventions.

## What this project is

E-commerce site for **alumiinium varjuprofiilid** (aluminium shadow profiles) — LED-ready and decorative. Target: consumers + B2B (architects, interior designers, builders). Estonian-language. Operated by PROSPACE OÜ.

## Brand voice — copy rules

These were established during prototype audit. **Follow strictly.**

1. **No "shadow gap" jargon.** Use *varjujoon* / *varjuefekt*.
2. **No "subtiilne".** Use *peen* / *vaoshoitud*.
3. **No "premium" or marketing puffery.** State facts.
4. **No "hõljuva mööbli efekt".** Furniture doesn't float. *Hõljuva lae / hõljuva seina* are OK.
5. **"Kipsplaadi alla", not "kipsplaadi taha"** — profiles install below drywall.
6. **Color names:** "anodeeritud hõbe" is a *color name* matching anodized look — not the process. Don't write "anodeeritud (hõbe)" as if it IS anodized.
7. **LED specs by category:**
   - Ceiling: `12 W/m · 234 LED/m · 3000K · 24V`
   - Floor/wall: `COB 16 W/m · 1350 lm/m · CRI 94 · 24V`
8. **Standard lengths:** ceiling 2.5 m (AST35 = 3 m), floor 2.6 m, LPA909/LPA126 = 3 m.
9. **VAT:** 24% (Estonia, since July 2025). All `price` fields include VAT.

## Design system

- **Colors:** `--paper` warm off-white, `--ink` warm near-black, `--accent` terracotta (`#B84E2E`). Avoid introducing new accents.
- **Type:** Bebas Neue (display), Inter (body), JetBrains Mono (eyebrows/specs).
- **Borders:** 1.5px solid `--ink`. Sharp corners. **Never add border-radius** unless explicitly requested.
- **Spacing:** 4/8/12/16/24/32/48/56/72/96 px scale.
- **No gradients, no shadows** as primary signals — borders + color do the work.

## Data conventions

- Catalog products: typed model in `lib/catalog.ts`. **SKU is the primary key**; `name` is a display label that may differ (e.g. sku=`RST14`, name=`RST14_12`).
- **Product URLs come from `urlPath` field. Never compute.** They follow the pattern `/[hub]/[asukoht]/[sku]/` but encode some legacy / SEO decisions (e.g. `kardinaprofiilid` hub has no `asukoht`).
- Site-wide info (email, phone, address, reg.nr, KMKR) lives in `lib/site.ts`. **Read from here, never hardcode.**
- Prices include 24% VAT. Display them as-is. Show "KM-iga" (with VAT) hint if needed.

## What NOT to do

- Don't introduce Tailwind. The CSS variable system is established — extend it, don't replace it.
- Don't introduce gradients, glassmorphism, rounded cards, or "modern SaaS" tropes. The aesthetic is editorial / catalog / Bauhaus — sharp, factual, restrained.
- Don't introduce emoji in product UI. Lightning bolt ⚡ for LED is the only sanctioned glyph (and it's a Unicode arrow, not emoji).
- Don't translate the site to English without an editor pass. Estonian voice rules above don't auto-translate.
- Don't paginate the catalog. 98 SKUs fits on one page. Keep filters + sort, skip pagination.

## When in doubt

- Check `handoff/README.md` and `handoff/PENDING.md` for the full spec.
- Original prototype source is in `handoff/src/` — refer to it for layout details that aren't documented elsewhere.

## .gitignore — keep these out of production

The prototype project carried disposable dev-artefacts. When you scaffold the real repo, ensure your `.gitignore` excludes:

```
# Disposable dev artefacts from prototype phase
_archive/         # Old wireframes & explorations (audit A-04)
uploads/          # Source PDFs, screenshots, raw photos (~80 MB) — audit A-05
scraps/           # Sketch tool dumps — audit A-06
.design-canvas.state.json
.thumbnail
.om-*             # Direct-edit override stylesheets

# Audit & spec docs (keep accessible to devs, not deployed)
audits/           # Or move to /docs/audits/ in repo
```

If you imported `handoff/src/` verbatim, also strip `data-comment-anchor="…"` attributes from the JSX before shipping — they're prototype design-tool metadata, harmless but noise (audit A-07). A simple Babel/SWC plugin or `npm run cleanup:anchors` script does the trick.
