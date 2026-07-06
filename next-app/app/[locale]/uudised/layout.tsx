import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'Журнал — блог о теневых профилях' : 'Uudised — Varjuprofiilide blogi',
    description: ru ? 'Гайды, сравнения и практические советы по выбору и монтажу теневых профилей.' : 'Juhendid, võrdlused ja praktilised nõuanded varjuprofiilide valikul ja paigaldusel. Testitud meie salongis.',
    // Uudised ajutiselt peidetud (2026-07) — noindex kuni päris postitused valmis.
    // Kehtib ka /uudised/[slug] lehtedele (need ei sea ise robots'it). Eemalda taastamisel.
    robots: { index: false, follow: false },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
