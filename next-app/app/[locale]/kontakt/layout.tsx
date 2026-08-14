import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { pageAlternates } from '@/lib/pageUrls';
import { pageMetaOverride } from '@/lib/pageMeta';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    alternates: pageAlternates('/kontakt', locale),
    title: ru ? 'Контакт — PROSPACE OÜ' : 'Kontakt — PROSPACE OÜ',
    description: ru ? 'Свяжитесь с нами — Vana-Kalamaja 8–110, Таллинн. Телефон, e-mail, часы работы салона.' : 'Võta meiega ühendust — Vana-Kalamaja 8–110, Tallinn. Telefon, e-post, salongi lahtiolekuajad.',
    // Soome/rootsi title + description (lib/pageMeta.ts) kirjutavad
    // ülemised read üle; eesti ja vene keele puhul on see tühi objekt.
    ...pageMetaOverride('/kontakt', locale),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
