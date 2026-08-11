// Primary image filename for each SKU (relative to /assets/products/).
// null = no image available → ProductCard shows SKU text fallback.
export const PRODUCT_IMAGES: Record<string, string | null> = {
  // Exact {SKU}_1.jpg
  LHV10:    'lhv10-lae-varjuprofiil.webp',
  AST20:    'AST20_1.jpg',
  AST10:    'AST10_1.jpg',
  AST8:     'ast8-lae-varjuprofiil.webp',
  AST5:     'ast5-lae-varjuprofiil.webp',
  AST201:   'AST201_1.jpg',
  AST50:    'ast50-lae-varjuprofiil.webp',
  AST35:    'AST35_1.jpg',
  AST30:    'ast30-lae-varjuprofiil.webp',
  AST22:    'ast22-lae-varjuprofiil.webp',
  RST25:    'rst25-lae-varjuprofiil.webp',
  ASP611:   'ASP611_2.jpg',
  ASP411:   'ASP411_2.jpg',
  ASP112:   'asp112-poranda-varjuprofiil-valge.webp',
  ASPL100:  'ASPL100_1.jpg',
  ASPL60:   'ASPL60_1.jpg',
  ASPL35:   'ASPL35_1.jpg',
  ASP610:   'ASP610_1.jpg',
  ASP410:   'ASP410_2.jpg',
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
  MPV018:   'mvp018-alumiinium-porandaliist-must-3.jpg',

  // Different extension
  AST45:    'AST45_1.avif',
  LPA909:   'lpa909-varjuprofiil.webp',
  ASP905:   'asp905-poranda-varjuprofiil-must.webp',
  ASP904:   'ASP904_4.webp',
  ASP238:   'asp238-poranda-varjuprofiil-valge.webp',
  MPA013:   'MPA013_1.avif',
  MPA301:   'MPA301_1.avif',
  MPA302:   'mpa302-alumiinium-porandaliist-must-5.jpg',
  MVP018:   'mvp018-alumiinium-porandaliist-must-3.jpg',
  MVP172:   'mvp172-alumiinium-porandaliist-hobe-2.jpg',
  AST25:    'AST25_1.png',
  AST101:   'AST101_1.png',
  ASP115:   'asp115-poranda-varjuprofiil-mootmed-2.webp',
  ASP198:   'ASP198_1.png',

  // Filename differs from SKU pattern
  AST14_12: 'ast14-12-lae-varjuprofiil.webp',
  ASP168:   'ASP168_60mm_1.jpg',
  ASP117:   'asp117-poranda-varjuprofiil-valge.webp',
  ASP116:   'asp116-seina-peiteprofiil.webp',
  ASP78:    'asp78-alumiinium-porandaliist-hobe.webp',

  // Space in filenames
  ASP58:    'asp58-alumiinium-porandaliist-hobe.webp',
  MPA217:   'mpa217-alumiinium-porandaliist-hobe.jpg',
  MPA015:   'mpa015-alumiinium-porandaliist-hobe.jpg',
  ASP100:   'asp100-alumiinium-porandaliist-hobe.webp',
  ASP80:    'asp80-alumiinium-porandaliist.webp',
  ASP60:    'asp60-alumiinium-porandaliist-hobe.webp',
  ASP40:    'asp40-alumiinium-porandaliist-hobe.webp',
  ASP108:   'asp108-poranda-varjuprofiil-hobe-5.jpg',
  ASPL120:  'aspl120-poranda-varjuprofiil-hobe.jpg',
  ASPL130:  'aspl130-poranda-varjuprofiil-hobe.webp',
  MPV301:   'mpv301-alumiinium-porandaliist-hobe-7.jpg',
  AVP859:   'avp859-poranda-varjuprofiil-mootmed-1.png',

  // Color variant SKUs — reuse parent product image
  'ASP40-NV':  'asp40-alumiinium-porandaliist-hobe.webp',
  'ASP40-NS':  'asp40-alumiinium-porandaliist-must.webp',
  'ASP40-OK':  'asp40-alumiinium-porandaliist-hobe.webp',
  'ASP40-Y':   'asp40-alumiinium-porandaliist-hobe.webp',
  'ASP60-NV':  'asp60-alumiinium-porandaliist-hobe.webp',
  'ASP60-NS':  'asp60-alumiinium-porandaliist-must.webp',
  'ASP60-OK':  'asp60-alumiinium-porandaliist-hobe.webp',
  'ASP60-Y':   'asp60-alumiinium-porandaliist-hobe.webp',
  'ASP80-NV':  'asp80-alumiinium-porandaliist.webp',
  'ASP80-NS':  'asp80-alumiinium-porandaliist-must.webp',
  'ASP80-OK':  'asp80-alumiinium-porandaliist.webp',
  'ASP80-Y':   'asp80-alumiinium-porandaliist.webp',
  'ASP100-NV': 'asp100-alumiinium-porandaliist-hobe.webp',
  'ASP100-NS': 'asp100-alumiinium-porandaliist-must.webp',
  'ASP100-OK': 'asp100-alumiinium-porandaliist-hobe.webp',
  'ASP100-Y':  'asp100-alumiinium-porandaliist-hobe.webp',

  // Previously Cyrillic filenames — now copied with Latin names
  ASP102:  'ASP102_1.jpg',
  ASP36:   'asp36-alumiinium-porandaliist-valge-2.webp',
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

// ----------------------------------------------------------------
// Originaalkataloogist lisatud pildid (08.2026)
// ----------------------------------------------------------------
// Allikas: "Profiilide originaal pildid" — failinimed olid kirillitsas
// (Чертеж АСТ35 = AST35 mõõtjoonis) ja pildid kuni 8000x8000 px. Kopeerimisel
// teisendatud WebP-ks (max 1600 px, joonised lossless) ja nimetatud SEO-kujule
// {sku}-{kategooria}[-{värv}][-mootmed-{n}].webp — kirjeldav, ladina
// tähestikus, sidekriipsudega, ilma täpitähtedeta.
//
// Duplikaadid on välistatud md5-võrdlusega olemasolevate failide vastu.

// Lisavaated ja värvivariandid — KÕIK kaustas tegelikult olemas olevad failid,
// mitte oletused. Järjestus: hõbe → valge → must → muud, ühendusdetailid lõppu.
export const PRODUCT_PHOTOS: Record<string, string[]> = {
  ASP100: ['asp100-alumiinium-porandaliist-valge.webp', 'asp100-alumiinium-porandaliist-must.webp', 'asp100-alumiinium-porandaliist.webp', 'asp100-connector.png', 'asp100-endcap.png', 'asp100-inner.png', 'asp100-outer.png', 'asp100-alumiinium-porandaliist-must-uhendus.jpg'],
  ASP102: ['asp102-poranda-varjuprofiil-hobe.webp', 'asp102-poranda-varjuprofiil-valge.webp', 'asp102-poranda-varjuprofiil-must.webp'],
  ASP106: ['asp106-poranda-varjuprofiil-hobe.jpg', 'asp106-poranda-varjuprofiil-hobe.webp', 'asp106-poranda-varjuprofiil-must.webp', 'asp106-poranda-varjuprofiil.webp'],
  ASP108: ['asp108-poranda-varjuprofiil-hobe-3.jpg', 'asp108-poranda-varjuprofiil-hobe-6.jpg', 'asp108-poranda-varjuprofiil-hobe.jpg', 'asp108-poranda-varjuprofiil-valge.jpg', 'asp108-poranda-varjuprofiil-must.jpg'],
  ASP112: ['asp112-poranda-varjuprofiil-hobe.webp', 'asp112-poranda-varjuprofiil-must.webp'],
  ASP116: ['asp116-seina-peiteprofiil-valge.webp', 'asp116-seina-peiteprofiil-must.webp', 'ASP116_60mm_2.jpg', 'ASP116_60mm_4.jpg'],
  ASP117: ['asp117-poranda-varjuprofiil-must.webp', 'ASP117_70mm_3.jpg'],
  ASP168: ['ASP168_60mm_2.jpg'],
  ASP198: ['asp198-seina-peiteprofiil.webp'],
  ASP238: ['asp238-poranda-varjuprofiil-hobe.webp', 'asp238-poranda-varjuprofiil-must.webp', 'ASP238_5.webp'],
  ASP36: ['asp36-alumiinium-porandaliist-hobe.webp', 'asp36-alumiinium-porandaliist-valge.webp', 'asp36-alumiinium-porandaliist-must.webp', 'asp36-alumiinium-porandaliist-3.webp'],
  ASP38: ['ASP38_2.jpg', 'ASP38_3.jpg', 'ASP38_4.jpg', 'ASP38_5.jpg', 'ASP38_6.jpg', 'ASP38_7.jpg', 'ASP38_8.jpg', 'ASP38_9.jpg'],
  ASP40: ['asp40-alumiinium-porandaliist-valge.webp', 'asp40-alumiinium-porandaliist-must.webp', 'asp40-alumiinium-porandaliist.webp', 'asp40-connector.png', 'asp40-endcap.png', 'asp40-inner.png', 'asp40-alumiinium-porandaliist-valge-uhendus.jpg'],
  ASP58: ['asp58-alumiinium-porandaliist-valge-2.jpg', 'asp58-alumiinium-porandaliist-valge.webp', 'asp58-alumiinium-porandaliist-must.jpg', 'asp58-alumiinium-porandaliist-must.webp'],
  ASP60: ['asp60-alumiinium-porandaliist-valge.webp', 'asp60-alumiinium-porandaliist-must.webp', 'asp60-alumiinium-porandaliist.webp', 'asp60-connector.png', 'asp60-endcap.png', 'asp60-inner.png', 'asp60-outer.png', 'asp60-alumiinium-porandaliist-must-uhendus.jpg'],
  ASP78: ['asp78-alumiinium-porandaliist-valge-2.webp', 'asp78-alumiinium-porandaliist-valge.webp', 'asp78-alumiinium-porandaliist-must.webp', 'ASP78_2_must.jpg'],
  ASP80: ['asp80-alumiinium-porandaliist-valge.webp', 'asp80-alumiinium-porandaliist-must.webp', 'asp80-connector.png', 'asp80-endcap.png', 'asp80-inner.png', 'asp80-outer.png', 'asp80-alumiinium-porandaliist-must-uhendus.jpg'],
  ASP904: ['asp904-poranda-varjuprofiil-hobe.webp', 'asp904-poranda-varjuprofiil-valge.webp', 'asp904-poranda-varjuprofiil-must.webp', 'ASP904_5.webp', 'ASP904_7.png'],
  ASP905: ['asp905-poranda-varjuprofiil-hobe.webp', 'asp905-poranda-varjuprofiil-valge.webp', 'ASP905_5.webp'],
  ASPL100: ['aspl100-poranda-varjuprofiil-valge.webp', 'aspl100-poranda-varjuprofiil-must.webp', 'ASPL100_3.jpg'],
  ASPL120: ['aspl120-poranda-varjuprofiil-valge-2.jpg', 'aspl120-poranda-varjuprofiil-valge.jpg', 'aspl120-poranda-varjuprofiil-must-2.jpg', 'aspl120-poranda-varjuprofiil-must.jpg'],
  ASPL130: ['aspl130-poranda-varjuprofiil-valge.webp', 'ASPL130_must.jpg'],
  ASPL35: ['aspl35-poranda-varjuprofiil-valge.webp', 'aspl35-poranda-varjuprofiil-must.webp', 'ASPL35_4.jpg', 'ASPL35_6.png', 'aspl35-poranda-varjuprofiil.webp'],
  ASPL60: ['aspl60-poranda-varjuprofiil-valge.webp', 'aspl60-poranda-varjuprofiil-must.webp', 'ASPL60_3.jpg', 'ASPL60_7.png', 'aspl60-poranda-varjuprofiil.webp'],
  AST10: ['AST10_2.jpg', 'AST10_3.jpg', 'AST10_4.png', 'ast10-lae-varjuprofiil.webp'],
  AST101: ['AST101_2.jpg', 'AST101_3.jpg', 'AST101_4.jpg', 'ast101-lae-varjuprofiil.webp'],
  AST12: ['AST12_2.jpg', 'AST12_3.jpg', 'ast12-lae-varjuprofiil.webp'],
  'AST14_12': ['AST1412_2.jpg', 'AST1412_3.jpg', 'AST1412_4.jpg', 'AST1412_5.jpg', 'AST1412_6.jpg', 'AST14_12.jpg'],
  AST20: ['AST20_2.jpg', 'AST20_3.jpg', 'ast20-lae-varjuprofiil.webp'],
  AST201: ['AST201_2.jpg', 'AST201_3.jpg', 'AST201_4.jpg', 'AST201_5.jpg', 'AST201_6.jpg', 'ast201-lae-varjuprofiil.webp'],
  AST218: ['AST218_2.jpg', 'AST218_3.jpg', 'AST218_4.jpg', 'AST218_5.jpg', 'AST218_6.jpg', 'AST218_7.png'],
  AST22: ['AST22_2.jpg', 'AST22_3.jpg', 'AST22_4.png'],
  AST25: ['AST25_2.png', 'AST25_3.jpg', 'AST25_4.jpg', 'AST25_5.jpg'],
  AST30: ['AST30_2.jpg', 'AST30_3.jpg', 'AST30_4.jpg', 'AST30_5.jpg', 'AST30_6.jpg'],
  AST35: ['AST35_2.jpg', 'AST35_3.jpg', 'AST35_4.jpg', 'AST35_5.jpg', 'AST35_6.jpg', 'ast35-lae-varjuprofiil.webp'],
  AST45: ['AST45_2.avif', 'AST45_3.avif', 'AST45_4.avif', 'AST45_5.avif', 'AST45_6.avif', 'AST45_7.avif'],
  AST5: ['AST5_4.png', 'ast5-lae-varjuprofiil-2.jpg', 'ast5-lae-varjuprofiil-3.jpg'],
  AST50: ['AST50_2.jpg', 'AST50_3.jpg', 'AST50_4.png'],
  AST8: ['AST8_2.jpg', 'AST8_3.jpg', 'AST8_4.png', 'AST8_5.png'],
  KA1: ['KA1_2.jpg', 'KA1_3.jpg', 'KA1_4.jpg', 'KA1_5.jpg', 'KA1_6.jpg', 'KA1_7.jpg', 'KA1_8.jpg', 'KA1_9.jpg'],
  KA2: ['KA2_2.jpg', 'KA2_3.jpg', 'KA2_4.jpg', 'KA2_5.jpg', 'KA2_6.jpg', 'KA2_7.jpg', 'KA2_8.jpg', 'KA2_9.jpg'],
  LHV10: ['LHV10_10sk.jpg', 'LHV10_11sk.jpg', 'LHV10_12sk.jpg', 'LHV10_7sk.jpg', 'LHV10_8sk.jpg', 'LHV10_9sk.jpg', 'lhv10-2.jpg', 'lhv10-3.jpg', 'lhv10-4.jpg', 'lhv10-5.jpg', 'lhv10-6.jpg'],
  LPA126: ['LPA126_10.jpg', 'LPA126_11.jpg', 'LPA126_12.jpg', 'LPA126_13.jpg', 'LPA126_14.jpg', 'LPA126_2.jpg', 'LPA126_4.jpg', 'LPA126_5.jpg', 'LPA126_7.jpg', 'LPA126_8.jpg', 'LPA126_9.jpg', 'lpa126-lae-varjuprofiil.webp'],
  LPA909: ['LPA909_2.webp', 'LPA909_3.webp', 'LPA909_5.png'],
  MPA013: ['MPA013.avif', 'MPA013_2.avif', 'MPA013_3.avif', 'MPA013_4.avif', 'MPA013_5.avif', 'MPA013_6.avif', 'MPA013_7.avif'],
  MPA015: ['mpa015-alumiinium-porandaliist-hobe-2.jpg', 'mpa015-alumiinium-porandaliist-valge-2.jpg', 'mpa015-alumiinium-porandaliist-valge.jpg', 'mpa015-alumiinium-porandaliist-must-2.jpg', 'mpa015-alumiinium-porandaliist-must.jpg'],
  MPA217: ['mpa217-alumiinium-porandaliist-hobe-2.jpg', 'mpa217-alumiinium-porandaliist-valge-2.jpg', 'mpa217-alumiinium-porandaliist-valge.jpg', 'mpa217-alumiinium-porandaliist-must-2.jpg', 'mpa217-alumiinium-porandaliist-must.jpg', 'mpa217-alumiinium-porandaliist.png'],
  MPA301: ['MPA301.avif', 'MPA301_10.avif', 'MPA301_2.avif', 'MPA301_3.avif', 'MPA301_4.avif', 'MPA301_5.avif', 'MPA301_6.avif', 'MPA301_7.avif', 'MPA301_8.avif', 'MPA301_9.avif'],
  MPA302: ['mpa302-alumiinium-porandaliist-hobe-2.jpg', 'mpa302-alumiinium-porandaliist-hobe-3.jpg', 'mpa302-alumiinium-porandaliist-hobe.jpg', 'mpa302-alumiinium-porandaliist-valge-2.jpg', 'mpa302-alumiinium-porandaliist-valge-3.jpg', 'mpa302-alumiinium-porandaliist-valge.jpg', 'mpa302-alumiinium-porandaliist-must-4.jpg', 'MPA302_5.avif', 'MPA302_8.avif', 'mpa302-alumiinium-porandaliist-3.jpg', 'mpa302-alumiinium-porandaliist.jpg'],
  MPV301: ['mpv301-alumiinium-porandaliist-hobe-2.jpg', 'mpv301-alumiinium-porandaliist-hobe-5.jpg', 'mpv301-alumiinium-porandaliist-hobe-6.jpg', 'mpv301-alumiinium-porandaliist-hobe.jpg', 'mpv301-alumiinium-porandaliist-valge-2.jpg', 'mpv301-alumiinium-porandaliist-valge-5.jpg', 'mpv301-alumiinium-porandaliist-valge-6.jpg', 'mpv301-alumiinium-porandaliist-valge-7.jpg', 'mpv301-alumiinium-porandaliist-valge.jpg', 'mpv301-alumiinium-porandaliist-must-2.jpg', 'mpv301-alumiinium-porandaliist-must-3.jpg', 'mpv301-alumiinium-porandaliist-must-5.jpg', 'mpv301-alumiinium-porandaliist-must-6.jpg'],
  MVP018: ['mvp018-alumiinium-porandaliist-hobe-2.jpg', 'mvp018-alumiinium-porandaliist-hobe-3.jpg', 'mvp018-alumiinium-porandaliist-hobe.jpg', 'mvp018-alumiinium-porandaliist-valge-2.jpg', 'mvp018-alumiinium-porandaliist-valge-3.jpg', 'mvp018-alumiinium-porandaliist-valge.jpg', 'mvp018-alumiinium-porandaliist-must-4.jpg', 'mvp018-alumiinium-porandaliist-must.jpg', 'MPV018_5.png', 'MPV018_6.png', 'MPV018_7.png'],
  MVP172: ['mvp172-alumiinium-porandaliist-hobe-3.jpg', 'mvp172-alumiinium-porandaliist-hobe.jpg', 'mvp172-alumiinium-porandaliist-valge-2.jpg', 'mvp172-alumiinium-porandaliist-valge-3.jpg', 'mvp172-alumiinium-porandaliist-valge.jpg', 'mvp172-alumiinium-porandaliist-must-3.jpg', 'mvp172-alumiinium-porandaliist-must-4.jpg', 'mvp172-alumiinium-porandaliist-must.jpg'],
  P1: ['p1-varjuprofiili-tarvik-valge.jpg', 'p1-varjuprofiili-tarvik-must.jpg', 'p1-varjuprofiili-tarvik.jpg'],
  RST1020: ['RST1020.jpg', 'RST1020_2.jpg'],
  RST12: ['rst12-lae-varjuprofiil-valge.jpg', 'rst12-lae-varjuprofiil-must.jpg', 'RST12_2.png', 'RST12_3.jpg', 'RST12_4.png', 'RST12_5.jpg', 'RST12_6.jpg'],
  RST22: ['RST22_2.jpg', 'RST22_3.jpg', 'RST22_4.jpg', 'RST22_5.jpg', 'RST22_6.jpg', 'RST22_7.png', 'rst22-lae-varjuprofiil.webp'],
  RST25: ['RST25_2.jpg', 'RST25_3.jpg', 'RST25_4.jpg'],
  RST40: ['RST40_2.jpg', 'RST40_3.jpg', 'RST40_4.jpg', 'RST40_5.jpg', 'RST40_6.jpg', 'RST40_7.png', 'RST40_8.png', 'rst40-lae-varjuprofiil.webp'],
};

// Mõõtjoonised. Need lähevad galerii lõppu, et paigaldusvaade jääks esimeseks.
export const PRODUCT_DIMENSIONS: Record<string, string[]> = {
  ASL300: ['asl300-varjuprofiili-tarvik-mootmed-1.webp', 'asl300-varjuprofiili-tarvik-mootmed-2.webp'],
  ASL40: ['asl40-varjuprofiili-tarvik-mootmed-1.webp'],
  ASP100: ['asp100-alumiinium-porandaliist-mootmed-1.webp'],
  ASP102: ['asp102-poranda-varjuprofiil-mootmed-2.webp'],
  ASP106: ['asp106-poranda-varjuprofiil-mootmed-1.webp', 'asp106-poranda-varjuprofiil-mootmed-2.png'],
  ASP108: ['asp108-poranda-varjuprofiil-mootmed-1.png'],
  ASP112: ['asp112-poranda-varjuprofiil-mootmed-1.webp'],
  ASP115: ['asp115-poranda-varjuprofiil-mootmed-2.webp'],
  ASP116: ['asp116-seina-peiteprofiil-mootmed-1.png', 'asp116-seina-peiteprofiil-mootmed-3.webp', 'asp116-seina-peiteprofiil-mootmed-4.webp'],
  ASP117: ['asp117-poranda-varjuprofiil-mootmed-1.webp', 'asp117-poranda-varjuprofiil-mootmed-2.webp'],
  ASP168: ['asp168-seina-peiteprofiil-mootmed-1.webp'],
  ASP198: ['asp198-seina-peiteprofiil-mootmed-1.webp'],
  ASP238: ['asp238-poranda-varjuprofiil-mootmed-1.webp'],
  ASP36: ['asp36-alumiinium-porandaliist-mootmed-1.webp'],
  ASP40: ['asp40-alumiinium-porandaliist-mootmed-1.webp'],
  ASP410: ['asp410-seina-peiteprofiil-mootmed-1.webp'],
  ASP411: ['asp411-seina-peiteprofiil-mootmed-1.webp'],
  ASP58: ['asp58-alumiinium-porandaliist-mootmed-1.png'],
  ASP60: ['asp60-alumiinium-porandaliist-mootmed-1.webp'],
  ASP610: ['asp610-seina-peiteprofiil-mootmed-1.webp'],
  ASP611: ['asp611-seina-peiteprofiil-mootmed-1.webp'],
  ASP78: ['asp78-alumiinium-porandaliist-mootmed-1.webp'],
  ASP80: ['asp80-alumiinium-porandaliist-mootmed-1.webp'],
  ASP904: ['asp904-poranda-varjuprofiil-mootmed-1.webp'],
  ASP905: ['asp905-poranda-varjuprofiil-mootmed-1.webp'],
  ASPL100: ['aspl100-poranda-varjuprofiil-mootmed-5.webp', 'aspl100-poranda-varjuprofiil-mootmed-6.webp'],
  ASPL120: ['aspl120-poranda-varjuprofiil-mootmed-1.png'],
  ASPL130: ['aspl130-poranda-varjuprofiil-mootmed-3.webp'],
  ASPL35: ['aspl35-poranda-varjuprofiil-mootmed-5.webp'],
  ASPL60: ['aspl60-poranda-varjuprofiil-mootmed-3.webp', 'aspl60-poranda-varjuprofiil-mootmed-4.webp'],
  AST10: ['ast10-lae-varjuprofiil-mootmed-1.webp'],
  'AST14_12': ['ast14-12-lae-varjuprofiil-mootmed-1.webp', 'ast14-12-lae-varjuprofiil-mootmed-3.webp'],
  AST20: ['ast20-lae-varjuprofiil-mootmed-1.webp', 'ast20-lae-varjuprofiil-mootmed-2.webp'],
  AST201: ['ast201-lae-varjuprofiil-mootmed-1.webp', 'ast201-lae-varjuprofiil-mootmed-2.webp'],
  AST22: ['ast22-lae-varjuprofiil-mootmed-1.webp'],
  AST30: ['ast30-lae-varjuprofiil-mootmed-1.webp', 'ast30-lae-varjuprofiil-mootmed-2.webp'],
  AST35: ['ast35-lae-varjuprofiil-mootmed-1.webp', 'ast35-lae-varjuprofiil-mootmed-4.webp'],
  AST5: ['ast5-lae-varjuprofiil-mootmed-1.webp', 'ast5-lae-varjuprofiil-mootmed-2.webp'],
  AST50: ['ast50-lae-varjuprofiil-mootmed-1.webp'],
  AST8: ['ast8-lae-varjuprofiil-mootmed-1.webp'],
  AVP609: ['avp609-poranda-varjuprofiil-mootmed-1.png'],
  AVP859: ['avp859-poranda-varjuprofiil-mootmed-1.png'],
  LHV10: ['lhv10-lae-varjuprofiil-mootmed-1.webp', 'lhv10-lae-varjuprofiil-mootmed-2.webp'],
  LPA126: ['lpa126-lae-varjuprofiil-mootmed-1.png', 'lpa126-lae-varjuprofiil-mootmed-2.png', 'lpa126-lae-varjuprofiil-mootmed-3.png'],
  LPA909: ['lpa909-varjuprofiil-mootmed-1.webp', 'lpa909-varjuprofiil-mootmed-2.webp', 'lpa909-varjuprofiil-mootmed-3.webp'],
  MPA015: ['mpa015-alumiinium-porandaliist-mootmed-1.png'],
  MPA217: ['mpa217-alumiinium-porandaliist-mootmed-1.png'],
  MPA302: ['mpa302-alumiinium-porandaliist-mootmed-1.png'],
  MPV301: ['mpv301-alumiinium-porandaliist-mootmed-1.png'],
  MVP018: ['mvp018-alumiinium-porandaliist-mootmed-1.png'],
  MVP172: ['mvp172-alumiinium-porandaliist-mootmed-1.png'],
  P1: ['p1-varjuprofiili-tarvik-mootmed-1.png', 'p1-varjuprofiili-tarvik-mootmed-5.png'],
  RST22: ['rst22-lae-varjuprofiil-mootmed-1.webp'],
  RST25: ['rst25-lae-varjuprofiil-mootmed-1.webp'],
  RST40: ['rst40-lae-varjuprofiil-mootmed-1.webp'],
};

// Pildi roll failinime järgi — annab komponentidele sisuka alt-teksti
// (tühi alt jättis mõõtjoonised ja värvivariandid ligipääsetavuse ja
// pildiotsingu jaoks nimetuks).
export function getImageRole(path: string): { dimension: boolean; color: string | null } {
  const file = path.split('/').pop() ?? '';
  const color = /-hobe[-.]/.test(file) ? 'hõbe'
    : /-valge[-.]/.test(file) ? 'valge'
    : /-must[-.]/.test(file) ? 'must'
    : null;
  return { dimension: /-mootmed/.test(file), color };
}

export function getProductImagePath(sku: string): string | null {
  // PRODUCT_IMAGES on käsitsi valitud paigaldusvaade. Kui see puudub, kasuta
  // originaalkataloogist lisatud fotot ja alles siis mõõtjoonist — nii ei näita
  // kataloogikaart paljast SKU-teksti, kui pilt on tegelikult olemas.
  const img = PRODUCT_IMAGES[sku] ?? PRODUCT_PHOTOS[sku]?.[0] ?? PRODUCT_DIMENSIONS[sku]?.[0] ?? null;
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
  // Varem tuletati galerii kaanepildi nimest (_2 … _8) ja lasti brauseril
  // olematud failid <img onError> kaudu ära peita — see tähendas igal tootelehel
  // kuni 8 päringut, mis vastasid 404-ga. Nüüd loetletakse ainult failid, mis
  // kaustas päriselt olemas on (PRODUCT_PHOTOS / PRODUCT_DIMENSIONS on
  // genereeritud kausta sisu põhjal).
  //
  // Värvivariandi SKU-d (ASP40-NV jne) kasutavad emaprofiili pilte.
  const parent = sku.replace(/-(NV|NS|OK|Y)$/, '');
  const cover = PRODUCT_IMAGES[sku] ?? PRODUCT_IMAGES[parent] ?? null;
  const photos = PRODUCT_PHOTOS[sku] ?? PRODUCT_PHOTOS[parent] ?? [];
  const dims = PRODUCT_DIMENSIONS[sku] ?? PRODUCT_DIMENSIONS[parent] ?? [];

  const files: string[] = [];
  for (const f of [cover, ...photos, ...dims]) {
    if (f && !files.includes(f)) files.push(f);
  }
  return files.map((f) => `/assets/products/${f}`);
}
