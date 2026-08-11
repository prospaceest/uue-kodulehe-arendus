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
  ASP78:    'asp78-alumiinium-porandaliist-hobe.webp',

  // Space in filenames
  ASP58:    'asp58-alumiinium-porandaliist-hobe.webp',
  MPA217:   'mpa217-alumiinium-porandaliist-hobe.jpg',
  MPA015:   'mpa015-alumiinium-porandaliist-hobe.jpg',
  ASP100:   'asp100-alumiinium-porandaliist-hobe.webp',
  ASP80:    'asp80-alumiinium-porandaliist-hobe.webp',
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
  'ASP80-NV':  'asp80-alumiinium-porandaliist-hobe.webp',
  'ASP80-NS':  'asp80-alumiinium-porandaliist-must.webp',
  'ASP80-OK':  'asp80-alumiinium-porandaliist-hobe.webp',
  'ASP80-Y':   'asp80-alumiinium-porandaliist-hobe.webp',
  'ASP100-NV': 'asp100-alumiinium-porandaliist-hobe.webp',
  'ASP100-NS': 'asp100-alumiinium-porandaliist-must.webp',
  'ASP100-OK': 'asp100-alumiinium-porandaliist-hobe.webp',
  'ASP100-Y':  'asp100-alumiinium-porandaliist-hobe.webp',

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
  ASP100: ['asp100-alumiinium-porandaliist-valge.webp', 'asp100-alumiinium-porandaliist-must.webp', 'asp100-alumiinium-porandaliist.webp', 'ASP100_4.jpg', 'ASP100_5.jpg', 'asp100-connector.png', 'asp100-endcap.png', 'asp100-inner.png', 'asp100-outer.png', 'asp100-alumiinium-porandaliist-hobe-uhendus.jpg', 'asp100-alumiinium-porandaliist-valge-uhendus.jpg', 'asp100-alumiinium-porandaliist-must-uhendus.jpg'],
  ASP102: ['asp102-poranda-varjuprofiil-hobe.webp', 'asp102-poranda-varjuprofiil-valge.webp', 'asp102-poranda-varjuprofiil-must.webp'],
  ASP106: ['asp106-poranda-varjuprofiil-hobe.jpg', 'asp106-poranda-varjuprofiil-hobe.webp', 'asp106-poranda-varjuprofiil-must.webp', 'asp106-poranda-varjuprofiil.webp', 'ASP106_2.jpg', 'ASP106_3.jpg'],
  ASP108: ['asp108-poranda-varjuprofiil-hobe-3.jpg', 'asp108-poranda-varjuprofiil-hobe-6.jpg', 'asp108-poranda-varjuprofiil-hobe.jpg', 'asp108-poranda-varjuprofiil-valge.jpg', 'asp108-poranda-varjuprofiil-must.jpg'],
  ASP112: ['asp112-poranda-varjuprofiil-hobe.webp', 'asp112-poranda-varjuprofiil-valge.webp', 'asp112-poranda-varjuprofiil-must.webp', 'ASP112_2.jpg', 'ASP112_3.jpg', 'ASP112_4.png', 'ASP112_5.png'],
  ASP115: ['ASP115_53mm__2.png'],
  ASP116: ['asp116-seina-peiteprofiil-valge.webp', 'asp116-seina-peiteprofiil-must.webp', 'asp116-seina-peiteprofiil.webp', 'ASP116_60mm_2.jpg', 'ASP116_60mm_3.jpg', 'ASP116_60mm_4.jpg', 'ASP116GK_60mm_1.jpg', 'ASP116GK_60mm_2.jpg', 'ASP116GK_60mm_3.jpg', 'ASP116GK_60mm_4.jpg', 'ASP116GK_60mm_5.png', 'ASP116GK_60mm_6.png'],
  ASP117: ['asp117-poranda-varjuprofiil-valge.webp', 'asp117-poranda-varjuprofiil-must.webp', 'ASP117_70mm_2.jpg', 'ASP117_70mm_3.jpg'],
  ASP168: ['ASP168_60mm_2.jpg', 'ASP168_60mm_3.jpg'],
  ASP198: ['asp198-seina-peiteprofiil.webp', 'ASP198.jpg'],
  ASP238: ['asp238-poranda-varjuprofiil-hobe.webp', 'asp238-poranda-varjuprofiil-valge.webp', 'asp238-poranda-varjuprofiil-must.webp', 'asp238-poranda-varjuprofiil.webp', 'ASP238_3.webp', 'ASP238_5.webp', 'ASP238_7.png'],
  ASP36: ['asp36-alumiinium-porandaliist-hobe.webp', 'asp36-alumiinium-porandaliist-valge-2.webp', 'asp36-alumiinium-porandaliist-valge.webp', 'asp36-alumiinium-porandaliist-must.webp', 'asp36-alumiinium-porandaliist-3.webp'],
  ASP38: ['ASP38_2.jpg', 'ASP38_3.jpg', 'ASP38_4.jpg', 'ASP38_5.jpg', 'ASP38_6.jpg', 'ASP38_7.jpg', 'ASP38_8.jpg', 'ASP38_9.jpg'],
  ASP40: ['asp40-alumiinium-porandaliist-valge.webp', 'asp40-alumiinium-porandaliist-must.webp', 'asp40-alumiinium-porandaliist.webp', 'asp40-connector.png', 'asp40-endcap.png', 'asp40-inner.png', 'asp40-outer.png', 'asp40-alumiinium-porandaliist-hobe-uhendus.jpg', 'asp40-alumiinium-porandaliist-valge-uhendus.jpg', 'asp40-alumiinium-porandaliist-must-uhendus.jpg'],
  ASP410: ['ASP410_2.jpg', 'ASP410_3.png'],
  ASP411: ['ASP411_2.jpg', 'ASP411_3.png'],
  ASP58: ['asp58-alumiinium-porandaliist-valge-2.jpg', 'asp58-alumiinium-porandaliist-valge.webp', 'asp58-alumiinium-porandaliist-must.jpg', 'asp58-alumiinium-porandaliist-must.webp'],
  ASP60: ['asp60-alumiinium-porandaliist-valge.webp', 'asp60-alumiinium-porandaliist-must.webp', 'asp60-alumiinium-porandaliist.webp', 'asp60-connector.png', 'asp60-endcap.png', 'asp60-inner.png', 'asp60-outer.png', 'asp60-alumiinium-porandaliist-hobe-uhendus.jpg', 'asp60-alumiinium-porandaliist-must-uhendus.jpg', 'asp60-alumiinium-porandaliist-uhendus.jpg'],
  ASP610: ['ASP610_2.png', 'ASP610.jpg'],
  ASP611: ['ASP611_2.jpg', 'ASP611_3.png'],
  ASP78: ['asp78-alumiinium-porandaliist-valge-2.webp', 'asp78-alumiinium-porandaliist-valge.webp', 'asp78-alumiinium-porandaliist-must.webp', 'ASP78_2_must.jpg', 'ASP78_2_valge.jpg'],
  ASP80: ['asp80-alumiinium-porandaliist-valge.webp', 'asp80-alumiinium-porandaliist-must.webp', 'asp80-alumiinium-porandaliist.webp', 'asp80-connector.png', 'asp80-endcap.png', 'asp80-inner.png', 'asp80-outer.png', 'asp80-alumiinium-porandaliist-hobe-uhendus.jpg', 'asp80-alumiinium-porandaliist-valge-uhendus.jpg', 'asp80-alumiinium-porandaliist-must-uhendus.jpg'],
  ASP904: ['asp904-poranda-varjuprofiil-hobe.webp', 'asp904-poranda-varjuprofiil-valge.webp', 'asp904-poranda-varjuprofiil-must.webp', 'asp904-poranda-varjuprofiil.webp', 'ASP904_5.webp', 'ASP904_7.png'],
  ASP905: ['asp905-poranda-varjuprofiil-hobe.webp', 'asp905-poranda-varjuprofiil-valge.webp', 'asp905-poranda-varjuprofiil-must.webp', 'asp905-poranda-varjuprofiil.webp', 'ASP905_5.webp', 'ASP905_7.png'],
  ASPL100: ['aspl100-poranda-varjuprofiil-valge.webp', 'aspl100-poranda-varjuprofiil-must.webp', 'ASPL100_10.png', 'ASPL100_2.jpg', 'ASPL100_3.jpg', 'ASPL100_4.jpg', 'ASPL100_5.png', 'ASPL100_6.png', 'ASPL100_7.png', 'ASPL100_8.png', 'ASPL100_9.png'],
  ASPL120: ['aspl120-poranda-varjuprofiil-valge-2.jpg', 'aspl120-poranda-varjuprofiil-valge.jpg', 'aspl120-poranda-varjuprofiil-must-2.jpg', 'aspl120-poranda-varjuprofiil-must.jpg'],
  ASPL130: ['aspl130-poranda-varjuprofiil-valge.webp', 'ASPL130_must.jpg', 'ASPL130_valge.jpg'],
  ASPL35: ['aspl35-poranda-varjuprofiil-valge.webp', 'aspl35-poranda-varjuprofiil-must.webp', 'aspl35-poranda-varjuprofiil.webp', 'ASPL35_10.png', 'ASPL35_2.jpg', 'ASPL35_3.jpg', 'ASPL35_4.jpg', 'ASPL35_5.jpg', 'ASPL35_6.png', 'ASPL35_7.png', 'ASPL35_8.png', 'ASPL35_9.png'],
  ASPL60: ['aspl60-poranda-varjuprofiil-valge.webp', 'aspl60-poranda-varjuprofiil-must.webp', 'aspl60-poranda-varjuprofiil.webp', 'ASPL60_2.jpg', 'ASPL60_3.jpg', 'ASPL60_4.jpg', 'ASPL60_5.jpg', 'ASPL60_6.png', 'ASPL60_7.png', 'ASPL60_8.png', 'ASPL60_9.png'],
  AST10: ['ast10-lae-varjuprofiil.webp', 'AST10_2.jpg', 'AST10_3.jpg', 'AST10_4.png', 'AST10_5.png'],
  AST101: ['ast101-lae-varjuprofiil.webp', 'AST10_1.jpg', 'AST101_2.jpg', 'AST101_3.jpg', 'AST101_4.jpg'],
  AST12: ['ast12-lae-varjuprofiil.webp', 'AST12_2.jpg', 'AST12_3.jpg'],
  'AST14_12': ['ast14-12-lae-varjuprofiil.webp', 'AST14_12.jpg', 'AST1412_10.png', 'AST1412_2.jpg', 'AST1412_3.jpg', 'AST1412_4.jpg', 'AST1412_5.jpg', 'AST1412_6.jpg', 'AST1412_7.png', 'AST1412_8.png', 'AST1412_9.png'],
  AST20: ['ast20-lae-varjuprofiil.webp', 'AST20_2.jpg', 'AST20_3.jpg', 'AST20_4.png', 'AST20_5.png'],
  AST201: ['ast201-lae-varjuprofiil.webp', 'AST20_1.jpg', 'AST201_2.jpg', 'AST201_3.jpg', 'AST201_4.jpg', 'AST201_5.jpg', 'AST201_6.jpg', 'AST201_7.png', 'AST201_8.png'],
  AST218: ['AST218_2.jpg', 'AST218_3.jpg', 'AST218_4.jpg', 'AST218_5.jpg', 'AST218_6.jpg', 'AST218_7.png'],
  AST22: ['ast22-lae-varjuprofiil.webp', 'AST22_2.jpg', 'AST22_3.jpg', 'AST22_4.png', 'AST22_5.png'],
  AST25: ['AST25_2.png', 'AST25_3.jpg', 'AST25_4.jpg', 'AST25_5.jpg'],
  AST30: ['ast30-lae-varjuprofiil.webp', 'AST30_2.jpg', 'AST30_3.jpg', 'AST30_4.jpg', 'AST30_5.jpg', 'AST30_6.jpg', 'AST30_7.png', 'AST30_8.png'],
  AST35: ['ast35-lae-varjuprofiil.webp', 'AST35_2.jpg', 'AST35_3.jpg', 'AST35_4.jpg', 'AST35_5.jpg', 'AST35_6.jpg'],
  AST45: ['AST45_2.avif', 'AST45_3.avif', 'AST45_4.avif', 'AST45_5.avif', 'AST45_6.avif', 'AST45_7.avif'],
  AST5: ['ast5-lae-varjuprofiil.webp', 'AST5_2.jpg', 'AST5_3.jpg', 'AST5_4.png', 'AST5_5.png', 'ast5-lae-varjuprofiil-2.jpg', 'ast5-lae-varjuprofiil-3.jpg'],
  AST50: ['ast50-lae-varjuprofiil.webp', 'AST50_2.jpg', 'AST50_3.jpg', 'AST50_4.png', 'AST50_5.png'],
  AST8: ['ast8-lae-varjuprofiil.webp', 'AST8_2.jpg', 'AST8_3.jpg', 'AST8_4.png', 'AST8_5.png'],
  KA1: ['KA1_2.jpg', 'KA1_3.jpg', 'KA1_4.jpg', 'KA1_5.jpg', 'KA1_6.jpg', 'KA1_7.jpg', 'KA1_8.jpg', 'KA1_9.jpg'],
  KA2: ['KA2_2.jpg', 'KA2_3.jpg', 'KA2_4.jpg', 'KA2_5.jpg', 'KA2_6.jpg', 'KA2_7.jpg', 'KA2_8.jpg', 'KA2_9.jpg'],
  LHV10: ['lhv10-lae-varjuprofiil.webp', 'LHV10_10sk.jpg', 'LHV10_11sk.jpg', 'LHV10_12sk.jpg', 'LHV10_2.jpg', 'LHV10_3.jpg', 'LHV10_4.jpg', 'LHV10_5.jpg', 'LHV10_6.jpg', 'LHV10_7sk.jpg', 'LHV10_8sk.jpg', 'LHV10_9sk.jpg', 'lhv10-2.jpg', 'lhv10-3.jpg', 'lhv10-4.jpg', 'lhv10-5.jpg', 'lhv10-6.jpg'],
  LPA126: ['lpa126-lae-varjuprofiil.webp', 'LPA126_10.jpg', 'LPA126_11.jpg', 'LPA126_12.jpg', 'LPA126_13.jpg', 'LPA126_14.jpg', 'LPA126_2.jpg', 'LPA126_3.jpg', 'LPA126_4.jpg', 'LPA126_5.jpg', 'LPA126_6.jpg', 'LPA126_7.jpg', 'LPA126_8.jpg', 'LPA126_9.jpg'],
  LPA909: ['lpa909-varjuprofiil.webp', 'LPA909_2.webp', 'LPA909_3.webp', 'LPA909_4.png', 'LPA909_5.png', 'LPA909_6.png'],
  MPA013: ['MPA013_2.avif', 'MPA013_3.avif', 'MPA013_4.avif', 'MPA013_5.avif', 'MPA013_6.avif', 'MPA013_7.avif', 'MPA013.avif'],
  MPA015: ['mpa015-alumiinium-porandaliist-hobe-2.jpg', 'mpa015-alumiinium-porandaliist-valge-2.jpg', 'mpa015-alumiinium-porandaliist-valge.jpg', 'mpa015-alumiinium-porandaliist-must-2.jpg', 'mpa015-alumiinium-porandaliist-must.jpg'],
  MPA217: ['mpa217-alumiinium-porandaliist-hobe-2.jpg', 'mpa217-alumiinium-porandaliist-valge-2.jpg', 'mpa217-alumiinium-porandaliist-valge.jpg', 'mpa217-alumiinium-porandaliist-must-2.jpg', 'mpa217-alumiinium-porandaliist-must.jpg', 'mpa217-alumiinium-porandaliist.png'],
  MPA301: ['MPA301_10.avif', 'MPA301_2.avif', 'MPA301_3.avif', 'MPA301_4.avif', 'MPA301_5.avif', 'MPA301_6.avif', 'MPA301_7.avif', 'MPA301_8.avif', 'MPA301_9.avif', 'MPA301.avif'],
  MPA302: ['mpa302-alumiinium-porandaliist-hobe-2.jpg', 'mpa302-alumiinium-porandaliist-hobe-3.jpg', 'mpa302-alumiinium-porandaliist-hobe.jpg', 'mpa302-alumiinium-porandaliist-valge-2.jpg', 'mpa302-alumiinium-porandaliist-valge-3.jpg', 'mpa302-alumiinium-porandaliist-valge.jpg', 'mpa302-alumiinium-porandaliist-must-4.jpg', 'mpa302-alumiinium-porandaliist-must-5.jpg', 'MPA302_2.avif', 'MPA302_3.avif', 'MPA302_4.avif', 'MPA302_5.avif', 'MPA302_6.avif', 'MPA302_7.avif', 'MPA302_8.avif', 'mpa302-alumiinium-porandaliist-3.jpg', 'mpa302-alumiinium-porandaliist.jpg'],
  MPV301: ['mpv301-alumiinium-porandaliist-hobe-2.jpg', 'mpv301-alumiinium-porandaliist-hobe-5.jpg', 'mpv301-alumiinium-porandaliist-hobe-6.jpg', 'mpv301-alumiinium-porandaliist-hobe.jpg', 'mpv301-alumiinium-porandaliist-valge-2.jpg', 'mpv301-alumiinium-porandaliist-valge-5.jpg', 'mpv301-alumiinium-porandaliist-valge-6.jpg', 'mpv301-alumiinium-porandaliist-valge-7.jpg', 'mpv301-alumiinium-porandaliist-valge.jpg', 'mpv301-alumiinium-porandaliist-must-2.jpg', 'mpv301-alumiinium-porandaliist-must-3.jpg', 'mpv301-alumiinium-porandaliist-must-5.jpg', 'mpv301-alumiinium-porandaliist-must-6.jpg'],
  MVP018: ['mvp018-alumiinium-porandaliist-hobe-2.jpg', 'mvp018-alumiinium-porandaliist-hobe-3.jpg', 'mvp018-alumiinium-porandaliist-hobe.jpg', 'mvp018-alumiinium-porandaliist-valge-2.jpg', 'mvp018-alumiinium-porandaliist-valge-3.jpg', 'mvp018-alumiinium-porandaliist-valge.jpg', 'mvp018-alumiinium-porandaliist-must-3.jpg', 'mvp018-alumiinium-porandaliist-must-4.jpg', 'mvp018-alumiinium-porandaliist-must.jpg', 'MPV018_1.jpg', 'MPV018_2.jpg', 'MPV018_3.jpg', 'MPV018_4.jpg', 'MPV018_5.png', 'MPV018_6.png', 'MPV018_7.png', 'MVP018_2.avif', 'MVP018_3.avif', 'MVP018_4.avif'],
  MVP172: ['mvp172-alumiinium-porandaliist-hobe-2.jpg', 'mvp172-alumiinium-porandaliist-hobe-3.jpg', 'mvp172-alumiinium-porandaliist-hobe.jpg', 'mvp172-alumiinium-porandaliist-valge-2.jpg', 'mvp172-alumiinium-porandaliist-valge-3.jpg', 'mvp172-alumiinium-porandaliist-valge.jpg', 'mvp172-alumiinium-porandaliist-must-3.jpg', 'mvp172-alumiinium-porandaliist-must-4.jpg', 'mvp172-alumiinium-porandaliist-must.jpg', 'MVP172_2.avif', 'MVP172_3.avif', 'MVP172_4.avif', 'MVP172_5.avif', 'MVP172_6.avif', 'MVP172.avif'],
  P1: ['p1-varjuprofiili-tarvik-valge.jpg', 'p1-varjuprofiili-tarvik-must.jpg', 'ASP130_30mm_1.jpg', 'ASP130_30mm_2.jpg', 'ASP130_30mm_3.jpg', 'p1-varjuprofiili-tarvik.jpg'],
  RST1020: ['RST1020_2.jpg', 'RST1020.jpg'],
  RST12: ['rst12-lae-varjuprofiil-valge.jpg', 'rst12-lae-varjuprofiil-must.jpg', 'RST12_2.png', 'RST12_3.jpg', 'RST12_4.png', 'RST12_5.jpg', 'RST12_6.jpg'],
  RST22: ['rst22-lae-varjuprofiil.webp', 'RST22_2.jpg', 'RST22_3.jpg', 'RST22_4.jpg', 'RST22_5.jpg', 'RST22_6.jpg', 'RST22_7.png'],
  RST25: ['rst25-lae-varjuprofiil.webp', 'RST25_2.jpg', 'RST25_3.jpg', 'RST25_4.jpg', 'RST25_5.jpg', 'RST25_6.jpg'],
  RST40: ['rst40-lae-varjuprofiil.webp', 'RST40_2.jpg', 'RST40_3.jpg', 'RST40_4.jpg', 'RST40_5.jpg', 'RST40_6.jpg', 'RST40_7.png', 'RST40_8.png'],
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
  ASP78: ['asp78-alumiinium-porandaliist-mootmed-1.png', 'asp78-alumiinium-porandaliist-mootmed-1.webp'],
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
  AST35: ['ast35-lae-varjuprofiil-mootmed-1.webp', 'ast35-lae-varjuprofiil-mootmed-3.webp', 'ast35-lae-varjuprofiil-mootmed-4.webp'],
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
  P1: ['p1-varjuprofiili-tarvik-mootmed-1.png', 'p1-varjuprofiili-tarvik-mootmed-2.png', 'p1-varjuprofiili-tarvik-mootmed-5.png'],
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
