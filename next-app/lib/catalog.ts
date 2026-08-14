import catalogJson from '@/content/catalog.json';

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------

export type ProductColor = {
  hex: string;
  name: string;
  price: number;
};

export type ProductSpec = {
  k: string;   // key (Estonian)
  v: string;   // value
};

export type Product = {
  sku: string;
  name: string;
  nameRu: string;
  collection: string;
  price: number;           // EUR/jm, VAT 24% incl.
  ribbon?: string;         // 'LAOS' | 'UUS' | ''
  inStock: boolean;
  description: string;
  descriptionRu: string;
  colors: ProductColor[];
  specs: ProductSpec[];
  ralPrice?: number;
  ledCompatible: boolean;
  hidden?: boolean;        // true = peidetud kõikjalt (loendid, otsing, sitemap, otse-URL 404)
  seoName: string;
  seoNameRu: string;
  slug: string;
  urlPath: string;         // e.g. '/led-varjuprofiilid/lae/ast22/'
  urlPathRu: string;       // e.g. '/led-profili/potolok/ast22/'
  urlPathFi: string;       // e.g. '/led-varjoprofiilit/katto/ast22/'
  urlPathSv: string;       // e.g. '/led-skuggprofiler/tak/ast22/'  (ilma /sv eesliidet)
};

export type Category = {
  name: string;
  count: number;
};

// ----------------------------------------------------------------
// Data (typed from content/catalog.json)
// ----------------------------------------------------------------

const raw = catalogJson as { products: Product[]; categories: Category[] };

// Peidetud tooted (hidden: true) jäetakse kõikjalt välja — loendid, otsing,
// sitemap, seotud tooted ja otse-URL (generateStaticParams ei genereeri → 404).
export const products: Product[] = raw.products.filter((p) => !p.hidden);
export const categories: Category[] = raw.categories;

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------

export function getProductBySku(sku: string): Product | undefined {
  return products.find((p) => p.sku.toLowerCase() === sku.toLowerCase());
}

export function getProductByUrlPath(urlPath: string): Product | undefined {
  const normalized = urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
  return products.find(
    (p) =>
      p.urlPath === normalized ||
      p.urlPathRu === normalized ||
      p.urlPathFi === normalized ||
      p.urlPathSv === normalized,
  );
}

// Tootetee keele kaupa. urlPath* väljad on ANDMED — neid ei arvutata kunagi
// slugist, sest nad kannavad ajaloolisi ja SEO-otsuseid (nt kardinaprofiilid
// ilma asukohata). Rootsi tee saab /sv eesliite alles siin.
export function productPath(p: Product, locale: string): string {
  switch (locale) {
    case 'ru': return `/ru${p.urlPathRu}`;
    case 'fi': return p.urlPathFi;
    case 'sv': return `/sv${p.urlPathSv}`;
    default:   return p.urlPath;
  }
}

// Internal-link helper. urlPath/urlPathRu are stored WITH a trailing slash, but
// Next serves the slash-less form (308-normalised) — so <Link> targets must be
// slash-less too, otherwise every click/crawl hits a redirect. Mirrors the
// sitemap's noSlash() and the product page's absUrl().
// Tagasiühilduvus: paljud kutsujad annavad ikka `ru`-lipu. Uus kood andku keel.
export function productUrl(p: Product, localeOrRu: string | boolean): string {
  const locale =
    typeof localeOrRu === 'boolean' ? (localeOrRu ? 'ru' : 'et') : localeOrRu;
  return productPath(p, locale).replace(/\/$/, '');
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.collection === collection);
}

export function getInStockProducts(): Product[] {
  return products.filter((p) => p.inStock);
}

export function getLedProducts(): Product[] {
  return products.filter((p) => p.ledCompatible);
}

export function getTopProducts(limit = 10): Product[] {
  return products.filter((p) => p.ribbon === 'LAOS').slice(0, limit);
}

export function getUrlPath(product: Product, locale: string): string {
  return productPath(product, locale);
}

// ----------------------------------------------------------------
// Shop display order
// ----------------------------------------------------------------

// The order the poe listing (/tooted) shows products in by default. Mirrors the
// sequence of the printed / enuprofili.lv catalogue the owner works from:
//
//   1. Laeprofiilid   2. Põrandaprofiilid   3. Pealepandavad põrandaliistud
//   4. Süvistatavad (MDF-) liistud         5. Nurga- ja kardinaprofiilid
//
// A SKU appears once — its first occurrence sets its rank (LHV10 and ASPL35/60/
// 100 are in several categories on the source pages). SKUs not listed here fall
// to the end in catalog.json order, so new products and the 28 lisatarvikud need
// no maintenance here.
export const DISPLAY_ORDER: string[] = [
  // ── Laeprofiilid ─────────────────────────────────────────────────────────
  'AST10', 'LHV10', 'AST14_12', 'RST14', 'RST1020', 'RST22', 'AST22', 'AST12',
  'AST218', 'AST201', 'AST30', 'AST45', 'AST50', 'AST35', 'AST20', 'AST8',
  'AST5', 'RST40',
  // Laeprofiilid, mida allikalehel ei ole
  'RST12', 'RST25', 'AST101', 'AST25', 'LPA126',

  // ── Põrandaprofiilid ─────────────────────────────────────────────────────
  'ASP102', 'ASPL120', 'ASPL130', 'ASP238', 'LPA909', 'ASP112', 'ASP117',
  'ASP905', 'ASP904', 'ASP106', 'ASP611', 'ASPL35', 'ASPL60', 'ASPL100',
  // Põrandaprofiilid, mida allikalehel ei ole
  'ASP115', 'ASP108', 'AVP609', 'AVP859',

  // ── Pealepandavad põrandaliistud ─────────────────────────────────────────
  // NB: MPA015 ja MPA217 on allikalehel olemas, aga catalog.json-is
  // hidden: true — seetõttu poes ei kuvata. Rank on siin valmis, kui need
  // kunagi nähtavaks tehakse.
  'MPA015', 'MVP172', 'MVP018', 'MPA217', 'MPA317', 'MPA013', 'MPA302',
  'MPA301', 'ASP36', 'ASP38', 'ASP58', 'ASP78', 'ASP40', 'ASP60', 'ASP80',
  'ASP100',
  'MPV301',

  // ── Süvistatavad liistud (allikalehel "+MDF") ────────────────────────────
  'ASP198', 'ASP168', 'ASP410', 'ASP411', 'ASP610',
  'ASP116',

  // ── Nurga- ja kardinaprofiilid ───────────────────────────────────────────
  'DKP1010', 'DKP1515', 'DKP2020', 'KA1', 'KA2',
];

const DISPLAY_RANK = new Map(DISPLAY_ORDER.map((sku, i) => [sku, i]));

// Comparator for the shop listing. Array.prototype.sort is stable, so products
// outside DISPLAY_ORDER keep their catalog.json order at the end of the list.
export function byDisplayOrder(a: Product, b: Product): number {
  const ra = DISPLAY_RANK.get(a.sku) ?? Number.MAX_SAFE_INTEGER;
  const rb = DISPLAY_RANK.get(b.sku) ?? Number.MAX_SAFE_INTEGER;
  return ra - rb;
}
