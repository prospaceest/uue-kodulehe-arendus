import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { products, productUrl, productPath, productText } from '@/lib/catalog';
import ProductClient from '@/components/product/ProductClient';
import { getProductImages } from '@/lib/productImages';
import { site } from '@/lib/site';
import { MARKETS, marketForLocale, marketPrice, OG_LOCALE } from '@/lib/markets';
import JsonLd from '@/components/seo/JsonLd';

type Props = {
  params: Promise<{ locale: string; slug: string[] }>;
};

// Igal keelel on oma tootetee. NB: võrdlus käib täpselt selle keele välja
// vastu, mitte "kõik väljad läbi" — muidu vastaks soome domeen ka eestikeelsele
// URL-ile ja tekiks kaks teed sama sisuni.
const URL_FIELD = {
  et: 'urlPath', ru: 'urlPathRu', fi: 'urlPathFi', sv: 'urlPathSv',
} as const;

function urlField(locale: string) {
  return URL_FIELD[locale as keyof typeof URL_FIELD] ?? 'urlPath';
}

function findProduct(slug: string[], locale: string) {
  const path = '/' + slug.join('/') + '/';
  const field = urlField(locale);
  return products.find((p) => p[field] === path);
}

// Same product, wrong locale prefix — e.g. /ru/led-varjuprofiilid/lae/ast12
// (ET slugs under /ru) instead of /ru/led-profili/potolok/ast12. Google knows a
// batch of these from an earlier hreflang pass; 308 them to the locale-correct
// URL so they consolidate instead of 404-ing with a noindex tag.
// Vale keele tee (nt soome domeenil eestikeelne slug) → 301 õigele teele.
function findCrossLocale(slug: string[], locale: string) {
  const path = '/' + slug.join('/') + '/';
  const own = urlField(locale);
  for (const field of ['urlPath', 'urlPathRu', 'urlPathFi', 'urlPathSv'] as const) {
    if (field === own) continue;
    const hit = products.find((p) => p[field] === path);
    if (hit) return hit;
  }
  return undefined;
}

// urlPath fields carry a trailing slash, but Next serves the slash-less form
// (308-normalised) — canonicals must point at the final URL, not the redirect.
// Päritolu tuleb turult: /ru/... elab varjuprofiilid.ee peal, /sv/... läheb
// www.prospace.fi peale. Vaikimisi Eesti turg (marketForLocale('et')).
function absUrl(path: string, origin: string = MARKETS.ee.origin): string {
  return `${origin}${path}`.replace(/\/$/, '');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = findProduct(slug, locale);
  if (!product) return {};

  const ru = locale === 'ru';
  const { name, seoName, description } = productText(product, locale);
  const selfMarket = marketForLocale(locale);
  const canonical = absUrl(productPath(product, locale), selfMarket.origin);

  // Sama reegel kui lehtedel (lib/pageUrls.ts pageAlternates): teise turu keeled
  // lisatakse alles siis, kui see turg on otsimootoritele avatud.
  const languages: Record<string, string> = {};
  for (const market of Object.values(MARKETS)) {
    if (market.id !== selfMarket.id && !market.indexable) continue;
    for (const l of market.locales) {
      languages[l] = absUrl(productPath(product, l), market.origin);
    }
  }
  languages['x-default'] = absUrl(product.urlPath, MARKETS.ee.origin);

  return {
    title: `${name} – ${seoName}`,
    description: description.slice(0, 160),
    alternates: { canonical, languages },
    openGraph: {
      title: `${name} – ${seoName}`,
      description: description.slice(0, 160),
      locale: OG_LOCALE[locale] ?? 'et_EE',
    },
  };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string[] }[] = [];

  // Kõik neli keelt: igal on oma tootetee (productPath lisab /ru ja /sv
  // eesliited, mida marsruut ootab keeleprefiksi järel juba maha võetuna).
  for (const p of products) {
    for (const locale of ['et', 'ru', 'fi', 'sv'] as const) {
      const path = productPath(p, locale)
        .replace(new RegExp(`^/(ru|sv)(?=/)`), '')
        .replace(/^\/|\/$/g, '');
      params.push({ locale, slug: path.split('/') });
    }
  }

  return params;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();

  const product = findProduct(slug, locale);
  if (!product) {
    const wrongLocale = findCrossLocale(slug, locale);
    if (wrongLocale) permanentRedirect(productUrl(wrongLocale, locale));
    notFound();
  }

  const cat = product.collection.split(';')[0].trim();
  const related = products
    .filter((p) => p.sku !== product.sku && p.collection.split(';').map((s) => s.trim()).includes(cat))
    .slice(0, 4);

  // Product structured data — enables rich results (price, availability).
  // Hind ja pildilingid tulevad turult: Eestis 24% KM ja varjuprofiilid.ee,
  // Soomes 25,5% KM ja www.prospace.fi.
  const ru = locale === 'ru';
  const market = marketForLocale(locale);
  const { name: pName, seoName } = productText(product, locale);
  const canonical = absUrl(productPath(product, locale), market.origin);
  const images = getProductImages(product.sku).map((u) =>
    u.startsWith('http') ? u : `${market.origin}${u}`,
  );
  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${pName} – ${seoName}`,
    sku: product.sku,
    description: productText(product, locale).description.slice(0, 300),
    brand: { '@type': 'Brand', name: market.storefront },
    offers: {
      '@type': 'Offer',
      price: marketPrice(product.price, market).toFixed(2),
      priceCurrency: 'EUR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: canonical,
      seller: { '@type': 'Organization', name: site.legal },
    },
  };
  if (images.length > 0) productSchema.image = images;

  return (
    <>
      <JsonLd data={productSchema} />
      <ProductClient product={product} related={related} locale={locale} />
    </>
  );
}
