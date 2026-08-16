import type { Metadata } from 'next';
import { tx } from '@/lib/tx';
import { getLocale } from 'next-intl/server';
import { pageAlternates } from '@/lib/pageUrls';
import { pageMetaOverride } from '@/lib/pageMeta';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    alternates: pageAlternates('/kkk', locale),
    title: tx(locale, 'Часто задаваемые вопросы', 'Korduma kippuvad küsimused'),
    description: tx(locale, 'Часто задаваемые вопросы о монтаже, доставке, ценах и заказе RAL-оттенков теневых профилей.', 'Korduma kippuvad küsimused varjuprofiilide paigalduse, tarnimise, hindade ja RAL-tellimuste kohta.'),
    // Soome/rootsi title + description (lib/pageMeta.ts) kirjutavad
    // ülemised read üle; eesti ja vene keele puhul on see tühi objekt.
    ...pageMetaOverride('/kkk', locale),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
