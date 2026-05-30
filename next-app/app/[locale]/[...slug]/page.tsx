import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { products } from '@/lib/catalog';
import ProductClient from '@/components/product/ProductClient';

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = findProduct(slug, locale);
  if (!product) return {};

  const ru = locale === 'ru';
  const name = ru ? product.nameRu : product.name;
  const seoName = ru ? product.seoNameRu : product.seoName;
  const description = ru ? product.descriptionRu : product.description;
  const canonical = ru
    ? `https://varjuprofiilid.ee/ru${product.urlPathRu}`
    : `https://varjuprofiilid.ee${product.urlPath}`;

  return {
    title: `${name} – ${seoName}`,
    description: description.slice(0, 160),
    alternates: {
      canonical,
      languages: {
        et: `https://varjuprofiilid.ee${product.urlPath}`,
        ru: `https://varjuprofiilid.ee/ru${product.urlPathRu}`,
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

  return <ProductClient product={product} related={related} locale={locale} />;
}
