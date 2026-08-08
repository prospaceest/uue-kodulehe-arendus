import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { pageAlternates } from '@/lib/pageUrls';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    alternates: pageAlternates('/professionaalidele', locale),
    title: ru ? 'B2B Партнёрская программа — Дизайнерам и Строителям' : 'B2B Partneriprogramm — Sisearhitektidele ja Ehitajatele',
    description: ru ? 'Станьте партнёром PROSPACE — персональные скидки, приоритетная доставка, техподдержка. Для дизайнеров, монтажников, реселлеров.' : 'Liitu PROSPACE partneriks — personaalsed soodustused, prioriteetne tarne, tehniline tugi. Sisearhitektidele, paigaldajatele, edasimüüjatele.',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
