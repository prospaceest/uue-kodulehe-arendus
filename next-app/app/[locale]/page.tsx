import Hero from '@/components/home/Hero';
import InteractiveShowroom from '@/components/home/InteractiveShowroom';
import CategoryGrid from '@/components/home/CategoryGrid';
import ConfiguratorSection from '@/components/home/ConfiguratorSection';
import InspirationGrid from '@/components/home/InspirationGrid';
import B2BSalon from '@/components/home/B2BSalon';
import InstagramFeed from '@/components/home/InstagramFeed';
// Uudised peidetud kuni päris postitused valmis (2026-07). Taasta import + <BlogPosts />.
// import BlogPosts from '@/components/home/BlogPosts';
import Partners from '@/components/home/Partners';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { getLocale } = await import('next-intl/server');
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'Varjuprofiilid.ee — Алюминиевые теневые профили в Эстонии' : 'Varjuprofiilid.ee — Alumiinium varjuprofiilid Eestis',
    description: ru ? 'Алюминиевые теневые профили с LED и декоративные — для потолка, пола и стены. PROSPACE OÜ, Таллинн. На складе 98 SKU.' : 'Alumiinium varjuprofiilid LED-valgustuse ja dekoratiivsete profiilidega — lae, põranda ja seina lahendused. PROSPACE OÜ, Tallinn. Laos 98 SKU.',
  };
}

export default function HomePage() {
  return (
    <div>
      <Hero />
      <InteractiveShowroom />
      <CategoryGrid />
      <ConfiguratorSection />
      <InspirationGrid />
      <B2BSalon />
      <InstagramFeed />
      {/* <BlogPosts /> — peidetud kuni päris postitused valmis (2026-07) */}
      <Partners />
    </div>
  );
}
