import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// 301 redirects — old viimistlussiinid.ee URL structure → new varjuprofiilid.ee structure
// These also handle any links that may have been indexed by Google under old paths.
// NB: destinations carry NO trailing slash — Next 308-normalises `/x/` → `/x`,
// so a slashed destination turns every legacy hit into a 301 → 308 chain.
const redirects = async () => [
  // ── Category pages ──────────────────────────────────────────────────────
  { source: '/lae-led-varjuprofiilid',                   destination: '/led-varjuprofiilid/lae',       permanent: true },
  { source: '/lae-led-varjuprofiilid/:path*',            destination: '/led-varjuprofiilid/lae',       permanent: true },
  { source: '/kesklae-led-varjuprofiilid',               destination: '/led-varjuprofiilid/kesklae',   permanent: true },
  { source: '/kesklae-led-varjuprofiilid/:path*',        destination: '/led-varjuprofiilid/kesklae',   permanent: true },
  { source: '/poranda-led-varjuprofiilid',               destination: '/led-varjuprofiilid/poranda',   permanent: true },
  { source: '/poranda-led-varjuprofiilid/:path*',        destination: '/led-varjuprofiilid/poranda',   permanent: true },
  { source: '/seina-varjuprofiilid',                     destination: '/led-varjuprofiilid/seina',     permanent: true },
  { source: '/seina-varjuprofiilid/:path*',              destination: '/led-varjuprofiilid/seina',     permanent: true },
  { source: '/lae-varjuprofiilid',                       destination: '/varjuprofiilid/lae',           permanent: true },
  { source: '/lae-varjuprofiilid/:path*',                destination: '/varjuprofiilid/lae',           permanent: true },
  { source: '/poranda-alumiiniumist-varjuprofiilid',     destination: '/varjuprofiilid/poranda',       permanent: true },
  { source: '/poranda-alumiiniumist-varjuprofiilid/:path*', destination: '/varjuprofiilid/poranda',    permanent: true },
  // NB: /alumiinium-porandaliistud/{sku} are REAL product pages (15 SKUs) —
  // only the bare hub path (which has no page) may redirect to the catalog.
  // Same for /tarvikud/{sku} (28) and /nurgaprofiilid/{sku} (3): bare path only.
  { source: '/alumiinium-porandaliistud',                destination: '/tooted',                        permanent: true },
  { source: '/tarvikud',                                 destination: '/tooted',                        permanent: true },
  { source: '/nurgaprofiilid',                           destination: '/tooted',                        permanent: true },

  // ── Old product-page/* URLs → catalog ───────────────────────────────────
  // Specific known redirects
  { source: '/product-page/asp102',                      destination: '/led-varjuprofiilid/poranda/asp102',  permanent: true },
  { source: '/product-page/lhv10',                       destination: '/led-varjuprofiilid/poranda/lhv10',   permanent: true },
  { source: '/product-page/ast22',                       destination: '/varjuprofiilid/lae/ast22',           permanent: true },
  { source: '/product-page/ast50',                       destination: '/varjuprofiilid/lae/ast50',           permanent: true },
  { source: '/product-page/aspl35',                      destination: '/led-varjuprofiilid/poranda/aspl35',  permanent: true },
  // Wildcard fallback — all other /product-page/* go to catalog
  { source: '/product-page/:slug*',                      destination: '/tooted',                             permanent: true },

  // ── Old blog/info paths ──────────────────────────────────────────────────
  { source: '/blog/:slug*',                              destination: '/uudised/:slug*',                     permanent: true },
  { source: '/artiklid/:slug*',                          destination: '/uudised/:slug*',                     permanent: true },
  { source: '/juhendid/:slug*',                          destination: '/uudised',                            permanent: true },

  // ── Old account paths ────────────────────────────────────────────────────
  { source: '/login',                                    destination: '/konto/login',                        permanent: true },
  { source: '/minu-konto',                               destination: '/konto',                              permanent: true },
  { source: '/account/:path*',                           destination: '/konto/:path*',                       permanent: true },

  // NB: /led-varjuprofiilid and /varjuprofiilid are REAL hub pages — do not
  // redirect them. /kardinaprofiilid has no hub page, so it goes to the catalog.
  { source: '/kardinaprofiilid',                         destination: '/tooted',                             permanent: true },

  // ── RU: Estonian-slug URLs → Russian slugs ──────────────────────────────
  // Every RU page now lives at a Russian slug (lib/pageUrls.ts is the table;
  // middleware.ts serves them off the Estonian-named routes). These 308s retire
  // the ET-slug versions that were live until 8.08.2026.
  // NB: exact sources only — /ru/led-varjuprofiilid/lae/ast12 (a product URL
  // under the wrong prefix) is handled in app/[locale]/[...slug]/page.tsx.
  { source: '/ru/tooted',                                destination: '/ru/katalog',                         permanent: true },
  { source: '/ru/kkk',                                   destination: '/ru/faq',                             permanent: true },
  { source: '/ru/tarne',                                 destination: '/ru/dostavka',                         permanent: true },
  { source: '/ru/garantii',                              destination: '/ru/garantiya',                        permanent: true },
  { source: '/ru/impressum',                             destination: '/ru/rekvizity',                        permanent: true },
  { source: '/ru/kontakt',                               destination: '/ru/kontakty',                         permanent: true },
  { source: '/ru/salong',                                destination: '/ru/salon',                            permanent: true },
  { source: '/ru/meist',                                 destination: '/ru/o-nas',                            permanent: true },
  { source: '/ru/professionaalidele',                    destination: '/ru/professionalam',                   permanent: true },
  { source: '/ru/inspiratsioon',                         destination: '/ru/vdohnovenie',                      permanent: true },
  { source: '/ru/inspiratsioon/:slug*',                  destination: '/ru/vdohnovenie/:slug*',               permanent: true },
  { source: '/ru/mis-on-varjuprofiil',                   destination: '/ru/chto-takoe-tenevoy-profil',        permanent: true },
  { source: '/ru/uudised',                               destination: '/ru/novosti',                          permanent: true },
  { source: '/ru/uudised/:slug*',                        destination: '/ru/novosti/:slug*',                   permanent: true },
  { source: '/ru/led-varjuprofiilid',                    destination: '/ru/led-profili',                      permanent: true },
  { source: '/ru/led-varjuprofiilid/lae',                destination: '/ru/led-profili/potolok',              permanent: true },
  { source: '/ru/led-varjuprofiilid/poranda',            destination: '/ru/led-profili/pol',                  permanent: true },
  { source: '/ru/led-varjuprofiilid/seina',              destination: '/ru/led-profili/stena',                permanent: true },
  { source: '/ru/led-varjuprofiilid/kesklae',            destination: '/ru/led-profili/centralnyj',           permanent: true },
  { source: '/ru/varjuprofiilid',                        destination: '/ru/dekor-profili',                    permanent: true },
  { source: '/ru/varjuprofiilid/lae',                    destination: '/ru/dekor-profili/potolok',            permanent: true },
  { source: '/ru/varjuprofiilid/poranda',                destination: '/ru/dekor-profili/pol',                permanent: true },
  { source: '/ru/varjuprofiilid/seina',                  destination: '/ru/dekor-profili/stena',              permanent: true },
  { source: '/ru/otsing',                                destination: '/ru/poisk',                            permanent: true },
  { source: '/ru/korv',                                  destination: '/ru/korzina',                          permanent: true },
  { source: '/ru/tellimus',                              destination: '/ru/zakaz',                            permanent: true },

  // ── RU equivalents of old viimistlussiinid.ee URLs ──────────────────────
  { source: '/ru/product-page/:slug*',                   destination: '/ru/katalog',                          permanent: true },
  { source: '/ru/lae-led-varjuprofiilid',                destination: '/ru/led-profili/potolok',               permanent: true },
  { source: '/ru/lae-led-varjuprofiilid/:path*',         destination: '/ru/led-profili/potolok',               permanent: true },
  { source: '/ru/kesklae-led-varjuprofiilid',            destination: '/ru/led-profili/centralnyj',            permanent: true },
  { source: '/ru/kesklae-led-varjuprofiilid/:path*',     destination: '/ru/led-profili/centralnyj',            permanent: true },
  { source: '/ru/poranda-led-varjuprofiilid',            destination: '/ru/led-profili/pol',                   permanent: true },
  { source: '/ru/poranda-led-varjuprofiilid/:path*',     destination: '/ru/led-profili/pol',                   permanent: true },
  { source: '/ru/seina-varjuprofiilid',                  destination: '/ru/led-profili/stena',                 permanent: true },
  { source: '/ru/seina-varjuprofiilid/:path*',           destination: '/ru/led-profili/stena',                 permanent: true },
  { source: '/ru/lae-varjuprofiilid',                    destination: '/ru/dekor-profili/potolok',             permanent: true },
  { source: '/ru/lae-varjuprofiilid/:path*',             destination: '/ru/dekor-profili/potolok',             permanent: true },
  { source: '/ru/poranda-alumiiniumist-varjuprofiilid',  destination: '/ru/dekor-profili/pol',                 permanent: true },
  { source: '/ru/poranda-alumiiniumist-varjuprofiilid/:path*', destination: '/ru/dekor-profili/pol',           permanent: true },
  { source: '/ru/alumiinium-porandaliistud',             destination: '/ru/katalog',                           permanent: true },
  { source: '/ru/kardinaprofiilid',                      destination: '/ru/katalog',                           permanent: true },
  { source: '/ru/blog/:slug*',                           destination: '/ru/novosti/:slug*',                    permanent: true },
  { source: '/ru/artiklid/:slug*',                       destination: '/ru/novosti/:slug*',                    permanent: true },
  { source: '/ru/login',                                 destination: '/ru/konto/login',                       permanent: true },
  { source: '/ru/minu-konto',                            destination: '/ru/konto',                             permanent: true },

  // ── RU product-URL prefixes without a SKU ───────────────────────────────
  // /ru/alyuminievye-plintusy/mpv301 is a product page, but these prefixes have
  // no hub page of their own → catalog instead of a 404. (led-profili and
  // dekor-profili are NOT here: those are real RU hub pages now.)
  { source: '/ru/alyuminievye-plintusy',                 destination: '/ru/katalog',                           permanent: true },
  { source: '/ru/aksessuary',                            destination: '/ru/katalog',                           permanent: true },
  { source: '/ru/uglovye-profili',                       destination: '/ru/katalog',                           permanent: true },
  { source: '/ru/karniznye-profili',                     destination: '/ru/katalog',                           permanent: true },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  redirects,
};

export default withNextIntl(nextConfig);
