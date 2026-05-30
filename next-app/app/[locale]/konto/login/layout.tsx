import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'B2B вход — PROSPACE' : 'B2B sisselogimine — PROSPACE',
    description: ru ? 'Войдите в B2B-кабинет для доступа к партнёрским ценам и истории заказов.' : 'Logi sisse oma B2B-kontole ja pääse ligi partnerihindadele ja tellimuste ajaloole.',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
