import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { pageAlternates } from '@/lib/pageUrls';
import { pageMetaOverride } from '@/lib/pageMeta';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    alternates: pageAlternates('/impressum', locale),
    title: ru ? 'Правовая информация' : 'Õigusteave',
    description: ru ? 'Условия продажи, политика конфиденциальности, куки и импрессум. PROSPACE OÜ.' : 'Müügitingimused, privaatsuspoliitika, küpsiste poliitika ja impressum. PROSPACE OÜ.',
    // Soome/rootsi title + description (lib/pageMeta.ts) kirjutavad
    // ülemised read üle; eesti ja vene keele puhul on see tühi objekt.
    ...pageMetaOverride('/impressum', locale),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
