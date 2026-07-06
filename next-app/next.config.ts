import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// 301 redirects — old viimistlussiinid.ee URL structure → new varjuprofiilid.ee structure
// These also handle any links that may have been indexed by Google under old paths.
const redirects = async () => [
  // ── Category pages ──────────────────────────────────────────────────────
  { source: '/lae-led-varjuprofiilid',                   destination: '/led-varjuprofiilid/lae/',      permanent: true },
  { source: '/lae-led-varjuprofiilid/:path*',            destination: '/led-varjuprofiilid/lae/',      permanent: true },
  { source: '/kesklae-led-varjuprofiilid',               destination: '/led-varjuprofiilid/kesklae/',  permanent: true },
  { source: '/kesklae-led-varjuprofiilid/:path*',        destination: '/led-varjuprofiilid/kesklae/',  permanent: true },
  { source: '/poranda-led-varjuprofiilid',               destination: '/led-varjuprofiilid/poranda/',  permanent: true },
  { source: '/poranda-led-varjuprofiilid/:path*',        destination: '/led-varjuprofiilid/poranda/',  permanent: true },
  { source: '/seina-varjuprofiilid',                     destination: '/led-varjuprofiilid/seina/',    permanent: true },
  { source: '/seina-varjuprofiilid/:path*',              destination: '/led-varjuprofiilid/seina/',    permanent: true },
  { source: '/lae-varjuprofiilid',                       destination: '/varjuprofiilid/lae/',          permanent: true },
  { source: '/lae-varjuprofiilid/:path*',                destination: '/varjuprofiilid/lae/',          permanent: true },
  { source: '/poranda-alumiiniumist-varjuprofiilid',     destination: '/varjuprofiilid/poranda/',      permanent: true },
  { source: '/poranda-alumiiniumist-varjuprofiilid/:path*', destination: '/varjuprofiilid/poranda/',   permanent: true },
  { source: '/alumiinium-porandaliistud',                destination: '/tooted',                        permanent: true },
  { source: '/alumiinium-porandaliistud/:path*',         destination: '/tooted',                        permanent: true },

  // ── Old product-page/* URLs → catalog ───────────────────────────────────
  // Specific known redirects
  { source: '/product-page/asp102',                      destination: '/led-varjuprofiilid/poranda/asp102/', permanent: true },
  { source: '/product-page/lhv10',                       destination: '/led-varjuprofiilid/poranda/lhv10/',  permanent: true },
  { source: '/product-page/ast22',                       destination: '/varjuprofiilid/lae/ast22/',          permanent: true },
  { source: '/product-page/ast50',                       destination: '/varjuprofiilid/lae/ast50/',          permanent: true },
  { source: '/product-page/aspl35',                      destination: '/led-varjuprofiilid/poranda/aspl35/', permanent: true },
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

  // ── Russian equivalents of old URLs ─────────────────────────────────────
  { source: '/ru/product-page/:slug*',                   destination: '/ru/tooted',                          permanent: true },
  { source: '/ru/lae-led-varjuprofiilid',                destination: '/ru/led-profili/potolok/',            permanent: true },
  { source: '/ru/poranda-led-varjuprofiilid',            destination: '/ru/led-profili/pol/',                permanent: true },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  redirects,
};

export default withNextIntl(nextConfig);
