import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'Журнал — блог о теневых профилях' : 'Uudised — Varjuprofiilide blogi',
    description: ru ? 'Гайды, сравнения и практические советы по выбору и монтажу теневых профилей.' : 'Juhendid, võrdlused ja praktilised nõuanded varjuprofiilide valikul ja paigaldusel. Testitud meie salongis.',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
