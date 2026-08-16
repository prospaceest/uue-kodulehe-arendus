import type { Metadata } from 'next';
import { tx } from '@/lib/tx';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: tx(locale, 'B2B вход — PROSPACE', 'B2B sisselogimine — PROSPACE'),
    description: tx(locale, 'Войдите в B2B-кабинет для доступа к партнёрским ценам и истории заказов.', 'Logi sisse oma B2B-kontole ja pääse ligi partnerihindadele ja tellimuste ajaloole.'),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
