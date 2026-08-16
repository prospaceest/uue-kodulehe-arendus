import type { Metadata } from 'next';
import { tx } from '@/lib/tx';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: tx(locale, 'Мой аккаунт — B2B', 'Minu konto — B2B'),
    description: tx(locale, 'B2B-кабинет PROSPACE — управляйте заказами, скидками и партнёрскими условиями.', 'PROSPACE B2B-konto — halda tellimusi, soodustusi ja partneritingimusi.'),
    robots: { index: false, follow: false },
  };
}

export default function KontoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
