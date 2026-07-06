import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'Поиск товаров' : 'Tooteotsing',
    description: ru ? 'Поиск среди теневых профилей по артикулу, названию или ключевому слову. 98 товаров в наличии.' : 'Otsi varjuprofiilide seast SKU, nime või märksõna järgi. 98 toodet laos.',
    robots: { index: false, follow: true },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
