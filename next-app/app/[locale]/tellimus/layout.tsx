import type { Metadata } from 'next';
import { tx } from '@/lib/tx';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: tx(locale, 'Оформление заказа', 'Tellimuse vormistamine'),
    description: tx(locale, 'Оформите заказ — введите данные, выберите способ доставки, отправьте. Ответим в течение 24 ч со счётом.', 'Vormista tellimus — täida kontaktandmed, vali tarneviis ja saada. Vastame 24 h arve ja kinnitusega.'),
    robots: { index: false, follow: true },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
