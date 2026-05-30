# Design tokens — Varjuprofiilid.ee

Extracted from `src/hifi/style.css`. **Source of truth — port to CSS variables / Tailwind theme / Style Dictionary verbatim.**

## Colors

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F5F2EC` | Primary background, warm off-white |
| `--paper-2` | `#ECE7DD` | Secondary background, slightly darker |
| `--ink` | `#1A1A18` | Primary text, warm near-black |
| `--ink-2` | `#4A4844` | Secondary text |
| `--muted` | `#8A8680` | Tertiary, captions, labels |
| `--accent` | `#B84E2E` | Terracotta — CTAs, eyebrows, single accent only |

**Functional colors (use sparingly):**
- LED badge background: `#F4B400` (warning yellow)
- LED badge text: `#3A2400` (dark brown)
- Success (stock, "done" status): `#1F7A3E`
- Warning (pending status): `#D97E29`
- Error (critical issue): `#C0392B`

**Do not introduce additional accents.** Variety comes from typography weight + spacing, not color.

## Typography

```css
/* Display — H1, H2, big numerals, eyebrow stats */
font-family: 'Bebas Neue', sans-serif;
font-weight: 400;
letter-spacing: 0.005em;
line-height: 0.88–1.0;  /* tight, depends on size */

/* Body — paragraphs, UI labels */
font-family: 'Inter', sans-serif;
font-weight: 400;
line-height: 1.55–1.65;

/* Italic emphasis — quotes, light asides */
font-family: 'Inter', serif;  /* loaded as Inter italic-light */
font-style: italic;
font-weight: 300;

/* Eyebrow, monospace labels, technical specs */
font-family: 'JetBrains Mono', monospace;
font-size: 10–12px;
text-transform: uppercase;
letter-spacing: 0.08–0.12em;
```

### Type scale

| Use | Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Hero H1 | Bebas | clamp(80px, 11vw, 160px) | 400 | 0.88 | 0.005em |
| Section H2 | Bebas | clamp(40px, 5vw, 80px) | 400 | 0.92 | 0.005em |
| Card H3 | Bebas | 28–48px | 400 | 1.05 | 0.005em |
| Body large | Inter | 16px | 400 | 1.6 | normal |
| Body | Inter | 14px | 400 | 1.6 | normal |
| Body small | Inter | 13px | 400 | 1.55 | normal |
| Eyebrow | JetBrains Mono | 10–11px | 500 | 1 | 0.08–0.12em |
| Caption | JetBrains Mono | 12px | 400 | 1.5 | 0.04em |

## Spacing

Scale: `4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 36 · 48 · 56 · 64 · 72 · 96 · 120 px`

**Section vertical padding:** 72–96 px desktop, 48–56 px mobile (when done).
**Section horizontal padding:** 56 px desktop, 24 px below 900 px.
**Card internal padding:** 28–32 px.
**Grid gap:** 14–24 px depending on density.

## Borders

- Width: **1.5 px** (the signature — not 1, not 2)
- Color: `var(--ink)` for primary structural, `rgba(0,0,0,0.1–0.15)` for secondary dividers
- Style: **solid**
- Border-radius: **0** everywhere. No exceptions in product UI.

## Shadows

Used sparingly:
- Interactive scene hero image: `0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)` (only when over dark background)
- No drop shadows on cards, buttons, or anything else by default.

## Z-index scale

- Sticky header: 100
- Dropdowns / popovers: 200
- Modals / lightboxes: 1000
- Toast / notifications: 1500

## Breakpoints (target — prototype is desktop-only)

| Name | Min-width |
|---|---|
| sm | 640 |
| md | 768 |
| lg | 1024 |
| xl | 1280 |
| 2xl | 1440 |

## Iconography

- **No icon library.** Use plain Unicode glyphs where needed: `→` arrow, `✓` check, `⚡` LED badge, `★` accent, `↗` external link.
- For category illustrations and product photos, use real images.

## Component conventions

### Buttons (`.vp-btn`)
- 1.5 px border, no radius
- Padding: 12 × 22 px (`.vp-btn--lg`: 16 × 28 px)
- JetBrains Mono, 11–12px, uppercase, letter-spacing 0.06em
- Background: transparent (variant: filled `var(--ink)` or `var(--paper)`)
- Hover: invert (paper → ink, ink → paper)

### Inputs (`.vp-input`)
- 1.5 px bottom border, no top/side border
- Background: transparent
- Padding: 10 × 0 px
- Inter, 14px

### Eyebrow (`.vp-eyebrow`)
- JetBrains Mono, 10–11px
- Uppercase, letter-spacing 0.08–0.1em
- Color: `var(--accent)` or `var(--muted)`
