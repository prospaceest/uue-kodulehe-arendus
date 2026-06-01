// Primary image filename for each SKU (relative to /assets/products/).
// null = no image available → ProductCard shows SKU text fallback.
export const PRODUCT_IMAGES: Record<string, string | null> = {
  // Exact {SKU}_1.jpg
  LHV10:    'LHV10_1.jpg',
  AST20:    'AST20_1.jpg',
  AST10:    'AST10_1.jpg',
  AST8:     'AST8_1.jpg',
  AST5:     'AST5_1.jpg',
  AST201:   'AST201_1.jpg',
  AST50:    'AST50_1.jpg',
  AST35:    'AST35_1.jpg',
  AST30:    'AST30_1.jpg',
  AST22:    'AST22_1.jpg',
  RST25:    'RST25_1.jpg',
  ASP611:   'ASP611_1.jpg',
  ASP411:   'ASP411_1.jpg',
  ASP112:   'ASP112_1.jpg',
  ASPL100:  'ASPL100_1.jpg',
  ASPL60:   'ASPL60_1.jpg',
  ASPL35:   'ASPL35_1.jpg',
  ASP610:   'ASP610_1.jpg',
  ASP410:   'ASP410_1.jpg',
  ASP106:   'ASP106_1.jpg',
  AVP609:   'AVP609_1.jpg',
  ASP38:    'ASP38_1.jpg',
  AST218:   'AST218_1.jpg',
  AST12:    'AST12_1.jpg',
  RST12:    'RST12_1.jpg',
  RST22:    'RST22_1.jpg',
  RST40:    'RST40_1.jpg',
  KA1:      'KA1_1.jpg',
  KA2:      'KA2_1.jpg',
  LPA126:   'LPA126_1.jpg',
  RST1020:  'RST1020_1.jpg',
  MPV018:   'MPV018_1.jpg',

  // Different extension
  AST45:    'AST45_1.avif',
  LPA909:   'LPA909_1.webp',
  ASP905:   'ASP905_3.webp',
  ASP904:   'ASP904_4.webp',
  ASP238:   'ASP238_1.webp',
  MPA013:   'MPA013_1.avif',
  MPA301:   'MPA301_1.avif',
  MPA302:   'MPA302_1.avif',
  MVP018:   'MVP018_1.avif',
  MVP172:   'MVP172_1.avif',
  AST25:    'AST25_1.png',
  AST101:   'AST101_1.png',
  ASP115:   'ASP115_53mm_1.png',
  ASP198:   'ASP198_1.png',

  // Filename differs from SKU pattern
  AST14_12: 'AST1412_1.jpg',
  ASP168:   'ASP168_60mm_1.jpg',
  ASP117:   'ASP117_70mm_1.jpg',
  ASP116:   'ASP116_60mm_1.jpg',
  ASP78:    'ASP78_2_must.jpg',

  // Space in filenames
  ASP58:    'ASP58_2 hõbe.jpg',
  MPA217:   'MPA217_1 hõbe.jpg',
  MPA015:   'MPA015_1 hõbe.jpg',
  ASP100:   'ASP100 hõbe.jpg',
  ASP80:    'ASP80 hõbe.jpg',
  ASP60:    'ASP60 hõbe.jpg',
  ASP40:    'ASP40  hõbe.jpg',
  ASP108:   'ASP108 hobe parketi peal.jpg',
  ASPL120:  'ASPL120 hobe led.jpg',
  ASPL130:  'ASPL130_hõbe.jpg',
  MPV301:   'MPV301 hobe.jpg',
  AVP859:   'AVP859 skeem.png',

  // Color variant SKUs — reuse parent product image
  'ASP40-NV':  'ASP40  hõbe.jpg',
  'ASP40-NS':  'ASP40 must.jpg',
  'ASP40-OK':  'ASP40  hõbe.jpg',
  'ASP40-Y':   'ASP40  hõbe.jpg',
  'ASP60-NV':  'ASP60 hõbe.jpg',
  'ASP60-NS':  'ASP60 must.jpg',
  'ASP60-OK':  'ASP60 hõbe.jpg',
  'ASP60-Y':   'ASP60 hõbe.jpg',
  'ASP80-NV':  'ASP80 hõbe.jpg',
  'ASP80-NS':  'ASP80 must.jpg',
  'ASP80-OK':  'ASP80 hõbe.jpg',
  'ASP80-Y':   'ASP80 hõbe.jpg',
  'ASP100-NV': 'ASP100 hõbe.jpg',
  'ASP100-NS': 'ASP100 must.jpg',
  'ASP100-OK': 'ASP100 hõbe.jpg',
  'ASP100-Y':  'ASP100 hõbe.jpg',

  // Previously Cyrillic filenames — now copied with Latin names
  ASP102:  'ASP102_1.jpg',
  ASP36:   'ASP36_1.jpg',
  RST14:   null,
  MPA317:  null,
  DKP1010: null,
  DKP1515: null,
  DKP2020: null,
  ASL302:  null,
  ASL312:  null,
  ASL300:  null,
  ASL25:   null,
  ASL40:   null,
  ASK100:  null,
  P1:      null,
  F40:     null,
  F60:     null,
  F80:     null,
  F100:    null,
  'HAJUTI-M': null,
};

export function getProductImagePath(sku: string): string | null {
  const img = PRODUCT_IMAGES[sku] ?? null;
  if (!img) return null;
  return `/assets/products/${img}`;
}

// Full gallery for a SKU. Starts from the known-correct primary filename
// (PRODUCT_IMAGES) and derives sibling numbered variants by swapping the
// trailing _<n>.<ext> (e.g. ASP168_60mm_1.jpg → _2, _3). Non-existent
// candidates are hidden client-side via <img onError>. Returns [] when the
// SKU has no image, so the product page shows the SKU-text fallback —
// matching the catalog card behaviour.
export function getProductImages(sku: string): string[] {
  const primary = PRODUCT_IMAGES[sku] ?? null;
  if (!primary) return [];

  const files = [primary];
  const m = primary.match(/^(.*_)(\d+)(\.[a-z0-9]+)$/i);
  if (m) {
    const [, base, numStr, ext] = m;
    const num = parseInt(numStr, 10);
    for (let i = 1; i <= 8; i++) {
      if (i === num) continue;
      const cand = `${base}${i}${ext}`;
      if (!files.includes(cand)) files.push(cand);
    }
  }
  return files.map((f) => `/assets/products/${f}`);
}
