import type { Metadata } from 'next';
import { tx } from '@/lib/tx';
import { getLocale } from 'next-intl/server';
import { pageAlternates } from '@/lib/pageUrls';
import { pageMetaOverride } from '@/lib/pageMeta';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    alternates: pageAlternates('/professionaalidele', locale),
    title: tx(locale, 'B2B Партнёрская программа — Дизайнерам и Строителям', 'B2B Partneriprogramm — Sisearhitektidele ja Ehitajatele'),
    description: tx(locale, 'Станьте партнёром PROSPACE — персональные скидки, приоритетная доставка, техподдержка. Для дизайнеров, монтажников, реселлеров.', 'Liitu PROSPACE partneriks — personaalsed soodustused, prioriteetne tarne, tehniline tugi. Sisearhitektidele, paigaldajatele, edasimüüjatele.'),
    // Soome/rootsi title + description (lib/pageMeta.ts) kirjutavad
    // ülemised read üle; eesti ja vene keele puhul on see tühi objekt.
    ...pageMetaOverride('/professionaalidele', locale),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
