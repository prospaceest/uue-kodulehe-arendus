import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { products } from '@/lib/catalog';
import ProductClient from '@/components/product/ProductClient';
import { getProductImages } from '@/lib/productImages';
import { site } from '@/lib/site';
import JsonLd from '@/components/seo/JsonLd';

type Props = {
  params: Promise<{ locale: string; slug: string[] }>;
};

function findProduct(slug: string[], locale: string) {
  const path = '/' + slug.join('/') + '/';
  if (locale === 'ru') {
    return products.find((p) => p.urlPathRu === path);
  }
  return products.find((p) => p.urlPath === path);
}

// urlPath fields carry a trailing slash, but Next serves the slash-less form
// (308-normalised) — canonicals must point at the final URL, not the redirect.
function absUrl(path: string): string {
  return `https://varjuprofiilid.ee${path}`.replace(/\/$/, '');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = findProduct(slug, locale);
  if (!product) return {};

  const ru = locale === 'ru';
  const name = ru ? product.nameRu : product.name;
  const seoName = ru ? product.seoNameRu : product.seoName;
  const description = ru ? product.descriptionRu : product.description;
  const canonical = absUrl(ru ? `/ru${product.urlPathRu}` : product.urlPath);

  return {
    title: `${name} – ${seoName}`,
    description: description.slice(0, 160),
    alternates: {
      canonical,
      languages: {
        et: absUrl(product.urlPath),
        ru: absUrl(`/ru${product.urlPathRu}`),
      },
    },
    openGraph: {
      title: `${name} – ${seoName}`,
      description: description.slice(0, 160),
      locale: ru ? 'ru_RU' : 'et_EE',
    },
  };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string[] }[] = [];

  for (const p of products) {
    // ET paths — strip leading and trailing slash, split
    const etSlug = p.urlPath.replace(/^\/|\/$/g, '').split('/');
    params.push({ locale: 'et', slug: etSlug });

    // RU paths — strip slashes, split
    const ruSlug = p.urlPathRu.replace(/^\/|\/$/g, '').split('/');
    params.push({ locale: 'ru', slug: ruSlug });
  }

  return params;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();

  const product = findProduct(slug, locale);
  if (!product) notFound();

  const cat = product.collection.split(';')[0].trim();
  const related = products
    .filter((p) => p.sku !== product.sku && p.collection.split(';').map((s) => s.trim()).includes(cat))
    .slice(0, 4);

  // Product structured data — enables rich results (price, availability).
  // Prices include 24% VAT; image paths resolved via the same manifest the UI uses.
  const ru = locale === 'ru';
  const seoName = ru ? product.seoNameRu : product.seoName;
  const canonical = absUrl(ru ? `/ru${product.urlPathRu}` : product.urlPath);
  const images = getProductImages(product.sku).map((u) =>
    u.startsWith('http') ? u : `${site.url}${u}`,
  );
  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${ru ? product.nameRu : product.name} – ${seoName}`,
    sku: product.sku,
    description: (ru ? product.descriptionRu : product.description).slice(0, 300),
    brand: { '@type': 'Brand', name: site.storefront },
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
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
