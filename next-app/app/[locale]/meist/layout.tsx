import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'Теневые профили в современном интерьере' : 'Varjuprofiilid kaasaegsesse interjööri',
    description: ru
      ? 'Почему теневые профили: скрытые соединения создают эффект парящего потолка или стены. Минималистичный, архитектурно цельный результат. PROSPACE OÜ, Таллинн.'
      : 'Miks varjuprofiilid: peidetud ühenduslahendused loovad hõljuva lae või seina efekti. Minimalistlik ja arhitektuurselt terviklik tulemus. PROSPACE OÜ, Tallinn.',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
