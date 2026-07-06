import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'Корзина' : 'Ostukorv',
    description: ru ? 'Ваша корзина — просмотрите добавленные товары, измените количество и оформите заказ.' : 'Sinu ostukorv — vaata lisatud tooteid, muuda koguseid ja vormista tellimus.',
    robots: { index: false, follow: true },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
