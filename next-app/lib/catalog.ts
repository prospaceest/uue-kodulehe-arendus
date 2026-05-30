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
  seoName: string;
  seoNameRu: string;
  slug: string;
  urlPath: string;         // e.g. '/led-varjuprofiilid/lae/ast22/'
  urlPathRu: string;       // e.g. '/led-profili/potolok/ast22/'
};

export type Category = {
  name: string;
  count: number;
};

// ----------------------------------------------------------------
// Data (typed from content/catalog.json)
// ----------------------------------------------------------------

const raw = catalogJson as { products: Product[]; categories: Category[] };

export const products: Product[] = raw.products;
export const categories: Category[] = raw.categories;

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------

export function getProductBySku(sku: string): Product | undefined {
  return products.find((p) => p.sku.toLowerCase() === sku.toLowerCase());
}

export function getProductByUrlPath(urlPath: string): Product | undefined {
  const normalized = urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
  return products.find((p) => p.urlPath === normalized || p.urlPathRu === normalized);
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
  return locale === 'ru' ? `/ru${product.urlPathRu}` : product.urlPath;
}
