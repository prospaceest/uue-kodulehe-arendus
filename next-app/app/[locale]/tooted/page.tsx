import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { products, categories } from '@/lib/catalog';
import CatalogClient from '@/components/catalog/CatalogClient';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'Магазин — все товары' : 'Pood — kõik tooted',
    description: ru
      ? 'Все алюминиевые теневые профили — потолочные, напольные, настенные. Фильтр по категории, цвету и LED.'
      : 'Kõik alumiinium varjuprofiilid — lae-, põranda-, seinaprofiilid. Filtreeri kategooria, värvi ja LED järgi.',
  };
}

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ cat?: string }>;
};

export default async function CatalogPage({ searchParams }: Props) {
  const { cat } = await searchParams;

  // Validate cat against known collection names
  const allCollections = new Set(products.flatMap((p) => p.collection.split(';').map((s) => s.trim())));
  const initialCat = cat && allCollections.has(cat) ? cat : undefined;

  return (
    <CatalogClient
      products={products}
      categories={categories}
      initialCat={initialCat}
    />
  );
}
