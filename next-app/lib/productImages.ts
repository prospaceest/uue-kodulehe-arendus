// Toote piltide kaardistus SKU -> failinimi (assets/products/ suhtes).
// Genereeritud: scripts/gen_product_images.py (ära muuda käsitsi — muuda skripti).
//
// Kolm rolli:
//   PRODUCT_IMAGES    — poe grid-kaardi kaanepilt: nurga-/paigaldusvaade.
//                       Mitte kunagi mõõtjoonis. null = tekst-fallback.
//   PRODUCT_PHOTOS    — galerii fotod (paigaldus/foto/lifestyle + ühendusdetailid).
//   PRODUCT_DIMENSIONS— mõõtjoonised. Galeriis ALATI viimasena, poe gridis mitte.

export const PRODUCT_IMAGES: Record<string, string | null> = {
  LHV10: 'lhv10-lae-varjuprofiil.webp',
  AST5: 'ast5-lae-varjuprofiil.webp',
  AST8: 'ast8-lae-varjuprofiil.webp',
  AST10: 'ast10-lae-varjuprofiil.webp',
  AST12: 'ast12-lae-varjuprofiil.webp',
  AST20: 'ast20-lae-varjuprofiil.webp',
  AST22: 'ast22-lae-varjuprofiil.webp',
  AST30: 'ast30-lae-varjuprofiil.webp',
  AST14_12: 'ast14-12-lae-varjuprofiil.webp',
  AST35: 'AST35_2.jpg',
  AST45: 'AST45_2.avif',
  AST50: 'AST50_2.jpg',
  AST101: 'ast101-lae-varjuprofiil.webp',
  AST201: 'AST201_2.jpg',
  AST218: 'AST218_3.jpg',
  AST25: 'AST25_3.jpg',
  RST12: 'RST12_3.jpg',
  RST14: null,
  RST22: 'RST22_2.jpg',
  RST25: 'RST25_2.jpg',
  RST40: 'RST40_5.jpg',
  RST1020: 'RST1020.jpg',
  LPA126: 'LPA126_14.jpg',
  LPA909: 'LPA909_2.webp',
  ASP36: 'asp36-alumiinium-porandaliist-hobe.webp',
  ASP38: 'ASP38_8.jpg',
  ASP40: 'asp40-alumiinium-porandaliist-hobe.webp',
  ASP58: 'asp58-alumiinium-porandaliist-hobe.webp',
  ASP60: 'asp60-alumiinium-porandaliist-hobe.webp',
  ASP78: 'asp78-alumiinium-porandaliist-hobe.webp',
  ASP80: 'asp80-alumiinium-porandaliist.webp',
  ASP100: 'asp100-alumiinium-porandaliist-hobe.webp',
  ASP102: 'asp102-poranda-varjuprofiil-hobe.webp',
  ASP106: 'asp106-poranda-varjuprofiil-hobe.webp',
  ASP108: 'asp108-poranda-varjuprofiil-hobe.jpg',
  ASP112: 'asp112-poranda-varjuprofiil-hobe.webp',
  ASP115: null,
  ASP116: 'asp116-seina-peiteprofiil.webp',
  ASP117: 'ASP117_70mm_3.jpg',
  ASP168: 'ASP168_60mm_2.jpg',
  ASP198: 'asp198-seina-peiteprofiil.webp',
  ASP238: 'ASP238_5.webp',
  ASP410: 'ASP410_2.jpg',
  ASP411: 'ASP411_2.jpg',
  ASP610: 'ASP610_1.jpg',
  ASP611: 'ASP611_2.jpg',
  ASP904: 'ASP904_4.webp',
  ASP905: 'asp905-poranda-varjuprofiil-hobe.webp',
  ASPL35: 'ASPL35_1.jpg',
  ASPL60: 'ASPL60_1.jpg',
  ASPL100: 'ASPL100_1.jpg',
  ASPL120: 'aspl120-poranda-varjuprofiil-hobe.jpg',
  ASPL130: 'aspl130-poranda-varjuprofiil-hobe.webp',
  AVP609: 'AVP609_1.jpg',
  AVP859: null,
  MPA013: 'MPA013.avif',
  MPA015: 'mpa015-alumiinium-porandaliist-hobe.jpg',
  MPA217: 'mpa217-alumiinium-porandaliist-hobe.jpg',
  MPA301: 'MPA301_1.avif',
  MPA302: 'mpa302-alumiinium-porandaliist-hobe.jpg',
  MPA317: null,
  MVP018: 'mvp018-alumiinium-porandaliist-hobe.jpg',
  MVP172: 'mvp172-alumiinium-porandaliist-hobe.jpg',
  MPV301: 'mpv301-alumiinium-porandaliist-hobe-2.jpg',
  KA1: 'KA1_2.jpg',
  KA2: 'KA2_2.jpg',
  'ASP40-NV': 'asp40-alumiinium-porandaliist-hobe.webp',
  'ASP40-NS': 'asp40-alumiinium-porandaliist-must.webp',
  'ASP40-OK': 'asp40-alumiinium-porandaliist-hobe.webp',
  'ASP40-Y': 'asp40-alumiinium-porandaliist-hobe.webp',
  'ASP60-NV': 'asp60-alumiinium-porandaliist-hobe.webp',
  'ASP60-NS': 'asp60-alumiinium-porandaliist-must.webp',
  'ASP60-OK': 'asp60-alumiinium-porandaliist-hobe.webp',
  'ASP60-Y': 'asp60-alumiinium-porandaliist-hobe.webp',
  'ASP80-NV': 'asp80-alumiinium-porandaliist.webp',
  'ASP80-NS': 'asp80-alumiinium-porandaliist-must.webp',
  'ASP80-OK': 'asp80-alumiinium-porandaliist.webp',
  'ASP80-Y': 'asp80-alumiinium-porandaliist.webp',
  'ASP100-NV': 'asp100-alumiinium-porandaliist-hobe.webp',
  'ASP100-NS': 'asp100-alumiinium-porandaliist-must.webp',
  'ASP100-OK': 'asp100-alumiinium-porandaliist-hobe.webp',
  'ASP100-Y': 'asp100-alumiinium-porandaliist-hobe.webp',
  DKP1010: null,
  DKP1515: null,
  DKP2020: null,
  ASL302: null,
  ASL312: null,
  ASL300: null,
  ASL25: null,
  ASL40: null,
  ASK100: null,
  P1: null,
  F40: null,
  F60: null,
  F80: null,
  F100: null,
  'HAJUTI-M': null,
};

export const PRODUCT_PHOTOS: Record<string, string[]> = {
  AST5: ['ast5-lae-varjuprofiil-2.jpg', 'ast5-lae-varjuprofiil-3.jpg', 'ast5-lae-varjuprofiil.webp', 'AST5_4.png'],
  AST8: ['AST8_2.jpg', 'AST8_3.jpg', 'ast8-lae-varjuprofiil.webp'],
  AST10: ['ast10-lae-varjuprofiil.webp', 'AST10_1.jpg', 'AST10_3.jpg', 'AST10_2.jpg'],
  AST12: ['ast12-lae-varjuprofiil.webp', 'AST12_1.jpg', 'AST12_3.jpg', 'AST12_2.jpg'],
  AST20: ['ast20-lae-varjuprofiil.webp', 'AST20_1.jpg', 'AST20_3.jpg', 'AST20_2.jpg'],
  AST22: ['ast22-lae-varjuprofiil.webp', 'AST22_2.jpg', 'AST22_3.jpg'],
  AST30: ['ast30-lae-varjuprofiil.webp', 'AST30_2.jpg', 'AST30_3.jpg', 'AST30_4.jpg', 'AST30_5.jpg'],
  AST35: ['AST35_2.jpg', 'AST35_1.jpg', 'AST35_4.jpg', 'AST35_3.jpg', 'AST35_6.jpg', 'AST35_5.jpg', 'ast35-lae-varjuprofiil.webp'],
  AST45: ['AST45_2.avif', 'AST45_1.avif', 'AST45_3.avif', 'AST45_4.avif', 'AST45_5.avif', 'AST45_6.avif'],
  AST50: ['AST50_2.jpg', 'AST50_3.jpg', 'ast50-lae-varjuprofiil.webp'],
  AST101: ['ast101-lae-varjuprofiil.webp', 'AST101_2.jpg', 'AST101_3.jpg', 'AST101_4.jpg'],
  AST201: ['AST201_2.jpg', 'AST201_1.jpg', 'AST201_3.jpg', 'AST201_4.jpg', 'AST201_5.jpg', 'AST201_6.jpg', 'ast201-lae-varjuprofiil.webp'],
  AST218: ['AST218_3.jpg', 'AST218_1.jpg', 'AST218_2.jpg', 'AST218_4.jpg', 'AST218_5.jpg', 'AST218_6.jpg'],
  AST14_12: ['ast14-12-lae-varjuprofiil.webp', 'AST14_12.jpg', 'AST1412_2.jpg', 'AST1412_3.jpg', 'AST1412_4.jpg', 'AST1412_5.jpg', 'AST1412_6.jpg'],
  AST25: ['AST25_3.jpg', 'AST25_4.jpg', 'AST25_5.jpg'],
  RST12: ['RST12_3.jpg', 'RST12_1.jpg', 'rst12-lae-varjuprofiil-must.jpg', 'rst12-lae-varjuprofiil-valge.jpg'],
  RST22: ['RST22_2.jpg', 'RST22_4.jpg', 'RST22_6.jpg', 'RST22_1.jpg', 'RST22_3.jpg', 'RST22_5.jpg', 'rst22-lae-varjuprofiil.webp'],
  RST25: ['RST25_2.jpg', 'RST25_3.jpg', 'rst25-lae-varjuprofiil.webp', 'RST25_4.jpg'],
  RST40: ['RST40_5.jpg', 'RST40_1.jpg', 'RST40_2.jpg', 'RST40_3.jpg', 'RST40_4.jpg', 'RST40_6.jpg', 'rst40-lae-varjuprofiil.webp'],
  RST1020: ['RST1020.jpg', 'RST1020_1.jpg', 'RST1020_2.jpg'],
  LHV10: ['lhv10-lae-varjuprofiil.webp', 'LHV10_7sk.jpg', 'LHV10_8sk.jpg', 'LHV10_9sk.jpg', 'LHV10_10sk.jpg', 'LHV10_11sk.jpg', 'LHV10_12sk.jpg', 'lhv10-2.jpg', 'lhv10-3.jpg', 'lhv10-4.jpg', 'lhv10-5.jpg', 'lhv10-6.jpg'],
  LPA126: ['LPA126_14.jpg', 'LPA126_1.jpg', 'LPA126_5.jpg', 'LPA126_7.jpg', 'LPA126_8.jpg', 'LPA126_11.jpg', 'LPA126_2.jpg', 'LPA126_9.jpg', 'LPA126_4.jpg', 'lpa126-lae-varjuprofiil.webp'],
  LPA909: ['LPA909_2.webp', 'LPA909_3.webp', 'LPA909_5.png', 'lpa909-varjuprofiil.webp'],
  ASP36: ['asp36-alumiinium-porandaliist-hobe.webp', 'asp36-alumiinium-porandaliist-valge.webp', 'asp36-alumiinium-porandaliist-must.webp', 'asp36-alumiinium-porandaliist-3.webp'],
  ASP38: ['ASP38_8.jpg', 'ASP38_7.jpg', 'ASP38_9.jpg', 'ASP38_3.jpg', 'ASP38_4.jpg', 'ASP38_5.jpg', 'ASP38_6.jpg'],
  ASP40: ['asp40-alumiinium-porandaliist-hobe.webp', 'asp40-alumiinium-porandaliist.webp', 'asp40-alumiinium-porandaliist-valge.webp', 'asp40-alumiinium-porandaliist-must.webp', 'asp40-alumiinium-porandaliist-valge-uhendus.jpg', 'asp40-connector.png', 'asp40-endcap.png', 'asp40-inner.png'],
  ASP58: ['asp58-alumiinium-porandaliist-hobe.webp', 'asp58-alumiinium-porandaliist-valge.webp', 'asp58-alumiinium-porandaliist-valge-2.jpg', 'asp58-alumiinium-porandaliist-must.webp', 'asp58-alumiinium-porandaliist-must.jpg'],
  ASP60: ['asp60-alumiinium-porandaliist-hobe.webp', 'asp60-alumiinium-porandaliist.webp', 'asp60-alumiinium-porandaliist-valge.webp', 'asp60-alumiinium-porandaliist-must.webp', 'asp60-alumiinium-porandaliist-must-uhendus.jpg', 'asp60-connector.png', 'asp60-endcap.png', 'asp60-inner.png', 'asp60-outer.png'],
  ASP78: ['asp78-alumiinium-porandaliist-hobe.webp', 'asp78-alumiinium-porandaliist-valge.webp', 'asp78-alumiinium-porandaliist-valge-2.webp', 'asp78-alumiinium-porandaliist-must.webp', 'ASP78_2_must.jpg'],
  ASP80: ['asp80-alumiinium-porandaliist.webp', 'asp80-alumiinium-porandaliist-must.webp', 'asp80-alumiinium-porandaliist-valge.webp', 'asp80-alumiinium-porandaliist-must-uhendus.jpg', 'asp80-connector.png', 'asp80-endcap.png', 'asp80-inner.png', 'asp80-outer.png'],
  ASP100: ['asp100-alumiinium-porandaliist-hobe.webp', 'asp100-alumiinium-porandaliist.webp', 'asp100-alumiinium-porandaliist-valge.webp', 'asp100-alumiinium-porandaliist-must.webp', 'asp100-alumiinium-porandaliist-must-uhendus.jpg', 'asp100-connector.png', 'asp100-endcap.png', 'asp100-inner.png', 'asp100-outer.png'],
  ASP102: ['asp102-poranda-varjuprofiil-hobe.webp', 'asp102-poranda-varjuprofiil-valge.webp', 'asp102-poranda-varjuprofiil-must.webp', 'ASP102_1.jpg'],
  ASP106: ['asp106-poranda-varjuprofiil-hobe.webp', 'asp106-poranda-varjuprofiil-hobe.jpg', 'asp106-poranda-varjuprofiil.webp', 'asp106-poranda-varjuprofiil-must.webp', 'ASP106_1.jpg'],
  ASP108: ['asp108-poranda-varjuprofiil-hobe.jpg', 'asp108-poranda-varjuprofiil-must.jpg', 'asp108-poranda-varjuprofiil-valge.jpg', 'asp108-poranda-varjuprofiil-hobe-3.jpg', 'asp108-poranda-varjuprofiil-hobe-5.jpg', 'asp108-poranda-varjuprofiil-hobe-6.jpg'],
  ASP112: ['asp112-poranda-varjuprofiil-hobe.webp', 'asp112-poranda-varjuprofiil-must.webp', 'asp112-poranda-varjuprofiil-valge.webp'],
  ASP116: ['asp116-seina-peiteprofiil.webp', 'asp116-seina-peiteprofiil-must.webp', 'asp116-seina-peiteprofiil-valge.webp', 'ASP116_60mm_2.jpg', 'ASP116_60mm_4.jpg'],
  ASP117: ['ASP117_70mm_3.jpg', 'asp117-poranda-varjuprofiil-must.webp', 'asp117-poranda-varjuprofiil-valge.webp'],
  ASP168: ['ASP168_60mm_2.jpg', 'ASP168_60mm_1.jpg'],
  ASP198: ['asp198-seina-peiteprofiil.webp'],
  ASP238: ['ASP238_5.webp', 'asp238-poranda-varjuprofiil-hobe.webp', 'asp238-poranda-varjuprofiil-must.webp', 'asp238-poranda-varjuprofiil-valge.webp'],
  ASP410: ['ASP410_2.jpg'],
  ASP411: ['ASP411_2.jpg'],
  ASP610: ['ASP610_1.jpg'],
  ASP611: ['ASP611_2.jpg'],
  ASP904: ['ASP904_4.webp', 'ASP904_5.webp', 'asp904-poranda-varjuprofiil-hobe.webp', 'asp904-poranda-varjuprofiil-must.webp', 'asp904-poranda-varjuprofiil-valge.webp'],
  ASP905: ['asp905-poranda-varjuprofiil-hobe.webp', 'asp905-poranda-varjuprofiil-must.webp', 'asp905-poranda-varjuprofiil-valge.webp', 'ASP905_5.webp'],
  ASPL35: ['ASPL35_1.jpg', 'ASPL35_4.jpg', 'aspl35-poranda-varjuprofiil.webp', 'aspl35-poranda-varjuprofiil-must.webp', 'aspl35-poranda-varjuprofiil-valge.webp'],
  ASPL60: ['ASPL60_1.jpg', 'ASPL60_3.jpg', 'aspl60-poranda-varjuprofiil.webp', 'aspl60-poranda-varjuprofiil-must.webp', 'aspl60-poranda-varjuprofiil-valge.webp'],
  ASPL100: ['ASPL100_1.jpg', 'ASPL100_3.jpg', 'aspl100-poranda-varjuprofiil-must.webp', 'aspl100-poranda-varjuprofiil-valge.webp'],
  ASPL120: ['aspl120-poranda-varjuprofiil-hobe.jpg', 'aspl120-poranda-varjuprofiil-must.jpg', 'aspl120-poranda-varjuprofiil-valge.jpg', 'aspl120-poranda-varjuprofiil-must-2.jpg', 'aspl120-poranda-varjuprofiil-valge-2.jpg'],
  ASPL130: ['aspl130-poranda-varjuprofiil-hobe.webp', 'ASPL130_must.jpg', 'aspl130-poranda-varjuprofiil-valge.webp'],
  AVP609: ['AVP609_1.jpg'],
  MPA013: ['MPA013.avif', 'MPA013_1.avif', 'MPA013_2.avif', 'MPA013_3.avif', 'MPA013_4.avif', 'MPA013_5.avif', 'MPA013_6.avif', 'MPA013_7.avif'],
  MPA015: ['mpa015-alumiinium-porandaliist-hobe.jpg', 'mpa015-alumiinium-porandaliist-must.jpg', 'mpa015-alumiinium-porandaliist-valge.jpg', 'mpa015-alumiinium-porandaliist-hobe-2.jpg', 'mpa015-alumiinium-porandaliist-must-2.jpg', 'mpa015-alumiinium-porandaliist-valge-2.jpg'],
  MPA217: ['mpa217-alumiinium-porandaliist-hobe.jpg', 'mpa217-alumiinium-porandaliist-must.jpg', 'mpa217-alumiinium-porandaliist-valge.jpg', 'mpa217-alumiinium-porandaliist-hobe-2.jpg', 'mpa217-alumiinium-porandaliist-must-2.jpg', 'mpa217-alumiinium-porandaliist-valge-2.jpg', 'mpa217-alumiinium-porandaliist.png'],
  MPA301: ['MPA301_1.avif', 'MPA301.avif', 'MPA301_2.avif', 'MPA301_4.avif', 'MPA301_5.avif', 'MPA301_3.avif', 'MPA301_7.avif', 'MPA301_8.avif', 'MPA301_9.avif', 'MPA301_6.avif'],
  MPA302: ['mpa302-alumiinium-porandaliist-hobe.jpg', 'mpa302-alumiinium-porandaliist-must-4.jpg', 'mpa302-alumiinium-porandaliist-valge.jpg', 'mpa302-alumiinium-porandaliist-hobe-2.jpg', 'mpa302-alumiinium-porandaliist-hobe-3.jpg', 'mpa302-alumiinium-porandaliist-must-5.jpg', 'mpa302-alumiinium-porandaliist-valge-2.jpg', 'mpa302-alumiinium-porandaliist-valge-3.jpg', 'mpa302-alumiinium-porandaliist-3.jpg', 'MPA302_5.avif', 'MPA302_8.avif', 'mpa302-alumiinium-porandaliist.jpg'],
  MVP018: ['mvp018-alumiinium-porandaliist-hobe.jpg', 'mvp018-alumiinium-porandaliist-must.jpg', 'mvp018-alumiinium-porandaliist-valge.jpg', 'mvp018-alumiinium-porandaliist-hobe-2.jpg', 'mvp018-alumiinium-porandaliist-must-3.jpg', 'mvp018-alumiinium-porandaliist-valge-2.jpg', 'mvp018-alumiinium-porandaliist-hobe-3.jpg', 'mvp018-alumiinium-porandaliist-must-4.jpg', 'mvp018-alumiinium-porandaliist-valge-3.jpg', 'MPV018_5.png', 'MPV018_6.png', 'MPV018_7.png'],
  MVP172: ['mvp172-alumiinium-porandaliist-hobe.jpg', 'mvp172-alumiinium-porandaliist-must.jpg', 'mvp172-alumiinium-porandaliist-valge.jpg', 'mvp172-alumiinium-porandaliist-hobe-2.jpg', 'mvp172-alumiinium-porandaliist-must-3.jpg', 'mvp172-alumiinium-porandaliist-valge-2.jpg', 'mvp172-alumiinium-porandaliist-hobe-3.jpg', 'mvp172-alumiinium-porandaliist-must-4.jpg', 'mvp172-alumiinium-porandaliist-valge-3.jpg'],
  MPV301: ['mpv301-alumiinium-porandaliist-hobe-2.jpg', 'mpv301-alumiinium-porandaliist-must-3.jpg', 'mpv301-alumiinium-porandaliist-valge-2.jpg', 'mpv301-alumiinium-porandaliist-hobe-5.jpg', 'mpv301-alumiinium-porandaliist-must-5.jpg', 'mpv301-alumiinium-porandaliist-valge-5.jpg', 'mpv301-alumiinium-porandaliist-hobe.jpg', 'mpv301-alumiinium-porandaliist-must-2.jpg', 'mpv301-alumiinium-porandaliist-valge.jpg', 'mpv301-alumiinium-porandaliist-hobe-6.jpg', 'mpv301-alumiinium-porandaliist-must-6.jpg', 'mpv301-alumiinium-porandaliist-valge-6.jpg', 'mpv301-alumiinium-porandaliist-hobe-7.jpg', 'mpv301-alumiinium-porandaliist-valge-7.jpg'],
  KA1: ['KA1_2.jpg', 'KA1_1.jpg', 'KA1_3.jpg', 'KA1_4.jpg', 'KA1_7.jpg', 'KA1_5.jpg', 'KA1_8.jpg', 'KA1_9.jpg'],
  KA2: ['KA2_2.jpg', 'KA2_1.jpg', 'KA2_3.jpg', 'KA2_5.jpg', 'KA2_6.jpg', 'KA2_7.jpg', 'KA2_8.jpg', 'KA2_9.jpg'],
  P1: ['p1-varjuprofiili-tarvik-valge.jpg', 'p1-varjuprofiili-tarvik-must.jpg', 'p1-varjuprofiili-tarvik.jpg'],
};

export const PRODUCT_DIMENSIONS: Record<string, string[]> = {
  AST5: ['ast5-lae-varjuprofiil-mootmed-1.webp', 'ast5-lae-varjuprofiil-mootmed-2.webp'],
  AST8: ['AST8_4.png', 'AST8_5.png', 'ast8-lae-varjuprofiil-mootmed-1.webp'],
  AST10: ['AST10_4.png', 'ast10-lae-varjuprofiil-mootmed-1.webp'],
  AST20: ['ast20-lae-varjuprofiil-mootmed-1.webp', 'ast20-lae-varjuprofiil-mootmed-2.webp'],
  AST22: ['AST22_4.png', 'ast22-lae-varjuprofiil-mootmed-1.webp'],
  AST30: ['AST30_6.jpg', 'ast30-lae-varjuprofiil-mootmed-1.webp'],
  AST35: ['ast35-lae-varjuprofiil-mootmed-1.webp', 'ast35-lae-varjuprofiil-mootmed-4.webp'],
  AST45: ['AST45_7.avif'],
  AST50: ['AST50_4.png', 'ast50-lae-varjuprofiil-mootmed-1.webp'],
  AST101: ['AST101_1.png'],
  AST201: ['ast201-lae-varjuprofiil-mootmed-1.webp', 'ast201-lae-varjuprofiil-mootmed-2.webp'],
  AST218: ['AST218_7.png'],
  AST14_12: ['ast14-12-lae-varjuprofiil-mootmed-1.webp', 'ast14-12-lae-varjuprofiil-mootmed-3.webp'],
  AST25: ['AST25_1.png', 'AST25_2.png'],
  RST12: ['RST12_2.png', 'RST12_4.png'],
  RST22: ['RST22_7.png', 'rst22-lae-varjuprofiil-mootmed-1.webp'],
  RST25: ['rst25-lae-varjuprofiil-mootmed-1.webp'],
  RST40: ['RST40_7.png', 'RST40_8.png', 'rst40-lae-varjuprofiil-mootmed-1.webp'],
  LHV10: ['lhv10-lae-varjuprofiil-mootmed-1.webp', 'lhv10-lae-varjuprofiil-mootmed-2.webp'],
  LPA126: ['lpa126-lae-varjuprofiil-mootmed-1.png', 'lpa126-lae-varjuprofiil-mootmed-2.png', 'lpa126-lae-varjuprofiil-mootmed-3.png'],
  LPA909: ['lpa909-varjuprofiil-mootmed-1.webp', 'lpa909-varjuprofiil-mootmed-2.webp', 'lpa909-varjuprofiil-mootmed-3.webp'],
  ASP36: ['asp36-alumiinium-porandaliist-mootmed-1.webp'],
  ASP38: ['ASP38_1.jpg', 'ASP38_2.jpg'],
  ASP40: ['asp40-alumiinium-porandaliist-mootmed-1.webp'],
  ASP58: ['asp58-alumiinium-porandaliist-mootmed-1.png'],
  ASP60: ['asp60-alumiinium-porandaliist-mootmed-1.webp'],
  ASP78: ['asp78-alumiinium-porandaliist-mootmed-1.webp'],
  ASP80: ['asp80-alumiinium-porandaliist-mootmed-1.webp'],
  ASP100: ['asp100-alumiinium-porandaliist-mootmed-1.webp'],
  ASP102: ['asp102-poranda-varjuprofiil-mootmed-2.webp'],
  ASP106: ['asp106-poranda-varjuprofiil-mootmed-1.webp', 'asp106-poranda-varjuprofiil-mootmed-2.png'],
  ASP108: ['asp108-poranda-varjuprofiil-mootmed-1.png'],
  ASP112: ['asp112-poranda-varjuprofiil-mootmed-1.webp'],
  ASP115: ['asp115-poranda-varjuprofiil-mootmed-2.webp'],
  ASP116: ['asp116-seina-peiteprofiil-mootmed-1.png', 'asp116-seina-peiteprofiil-mootmed-3.webp', 'asp116-seina-peiteprofiil-mootmed-4.webp'],
  ASP117: ['asp117-poranda-varjuprofiil-mootmed-1.webp', 'asp117-poranda-varjuprofiil-mootmed-2.webp'],
  ASP168: ['asp168-seina-peiteprofiil-mootmed-1.webp'],
  ASP198: ['asp198-seina-peiteprofiil-mootmed-1.webp', 'ASP198_1.png'],
  ASP238: ['asp238-poranda-varjuprofiil-mootmed-1.webp'],
  ASP410: ['asp410-seina-peiteprofiil-mootmed-1.webp'],
  ASP411: ['asp411-seina-peiteprofiil-mootmed-1.webp'],
  ASP610: ['asp610-seina-peiteprofiil-mootmed-1.webp'],
  ASP611: ['asp611-seina-peiteprofiil-mootmed-1.webp'],
  ASP904: ['ASP904_7.png', 'asp904-poranda-varjuprofiil-mootmed-1.webp'],
  ASP905: ['asp905-poranda-varjuprofiil-mootmed-1.webp'],
  ASPL35: ['ASPL35_6.png', 'aspl35-poranda-varjuprofiil-mootmed-5.webp'],
  ASPL60: ['ASPL60_7.png', 'aspl60-poranda-varjuprofiil-mootmed-3.webp', 'aspl60-poranda-varjuprofiil-mootmed-4.webp'],
  ASPL100: ['aspl100-poranda-varjuprofiil-mootmed-5.webp', 'aspl100-poranda-varjuprofiil-mootmed-6.webp'],
  ASPL120: ['aspl120-poranda-varjuprofiil-mootmed-1.png'],
  ASPL130: ['aspl130-poranda-varjuprofiil-mootmed-3.webp'],
  AVP609: ['avp609-poranda-varjuprofiil-mootmed-1.png'],
  AVP859: ['avp859-poranda-varjuprofiil-mootmed-1.png'],
  MPA015: ['mpa015-alumiinium-porandaliist-mootmed-1.png'],
  MPA217: ['mpa217-alumiinium-porandaliist-mootmed-1.png'],
  MPA301: ['MPA301_10.avif'],
  MPA302: ['mpa302-alumiinium-porandaliist-mootmed-1.png'],
  MVP018: ['mvp018-alumiinium-porandaliist-mootmed-1.png'],
  MVP172: ['mvp172-alumiinium-porandaliist-mootmed-1.png'],
  MPV301: ['mpv301-alumiinium-porandaliist-mootmed-1.png'],
  KA1: ['KA1_6.jpg'],
  KA2: ['KA2_4.jpg'],
  P1: ['p1-varjuprofiili-tarvik-mootmed-1.png', 'p1-varjuprofiili-tarvik-mootmed-5.png'],
};

// Kõik mõõtjoonis-failid (rolli tuvastamiseks alt-tekstis) — sisaldab ka
// nummerdatud faile (nt AST25_1.png), mille nimes pole "mootmed".
const DIMENSION_FILES = new Set(Object.values(PRODUCT_DIMENSIONS).flat());

// Värvivariandi SKU (ASP40-NV jne) -> emaprofiil.
function parentSku(sku: string): string {
  return sku.replace(/-(NV|NS|OK|Y)$/, '');
}

// Pildi roll failinime järgi — annab komponentidele sisuka alt-teksti.
export function getImageRole(path: string): { dimension: boolean; color: string | null } {
  const file = path.split('/').pop() ?? '';
  const color = /-hobe[-.]/.test(file) ? 'hõbe'
    : /-valge[-.]/.test(file) ? 'valge'
    : /-must[-.]/.test(file) ? 'must'
    : null;
  return { dimension: /-mootmed/.test(file) || DIMENSION_FILES.has(file), color };
}

// Poe grid-kaardi kaanepilt. Ainult nurga-/paigaldusvaade — mõõtjooniseid
// SIIN kunagi ei tagastata (isegi kui tootel on ainult mõõtjoonis, siis null →
// kaart näitab SKU-teksti). null = pilti pole.
export function getProductImagePath(sku: string): string | null {
  const parent = parentSku(sku);
  const img =
    PRODUCT_IMAGES[sku] ??
    PRODUCT_IMAGES[parent] ??
    PRODUCT_PHOTOS[sku]?.[0] ??
    PRODUCT_PHOTOS[parent]?.[0] ??
    null;
  if (!img) return null;
  return `/assets/products/${img}`;
}

// Toote galerii: kaanepilt → fotod → mõõtjoonised (viimasena). Ainult päriselt
// olemasolevad failid (loetelud genereeritud kausta sisust). Tühi => SKU-tekst.
export function getProductImages(sku: string): string[] {
  const parent = parentSku(sku);
  const cover = PRODUCT_IMAGES[sku] ?? PRODUCT_IMAGES[parent] ?? null;
  const photos = PRODUCT_PHOTOS[sku] ?? PRODUCT_PHOTOS[parent] ?? [];
  const dims = PRODUCT_DIMENSIONS[sku] ?? PRODUCT_DIMENSIONS[parent] ?? [];

  const files: string[] = [];
  for (const f of [cover, ...photos, ...dims]) {
    if (f && !files.includes(f)) files.push(f);
  }
  return files.map((f) => `/assets/products/${f}`);
}
