import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'Контакт — PROSPACE OÜ' : 'Kontakt — PROSPACE OÜ',
    description: ru ? 'Свяжитесь с нами — Vana-Kalamaja 8–110, Таллинн. Телефон, e-mail, часы работы салона.' : 'Võta meiega ühendust — Vana-Kalamaja 8–110, Tallinn. Telefon, e-post, salongi lahtiolekuajad.',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
