import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'Часто задаваемые вопросы' : 'Korduma kippuvad küsimused',
    description: ru ? 'Часто задаваемые вопросы о монтаже, доставке, ценах и заказе RAL-оттенков теневых профилей.' : 'Korduma kippuvad küsimused varjuprofiilide paigalduse, tarnimise, hindade ja RAL-tellimuste kohta.',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
