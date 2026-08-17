import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { MARKETS, marketForLocale } from '@/lib/markets';
import { abs, publicPath } from '@/lib/pageUrls';

// Leht eksisteerib AINULT Soome turul. Eesti poolel katab B2B-teema
// /professionaalidele, seega et/ru puhul 404 — nii ei teki varjuprofiilid.ee
// peale tühja lehte ega Google'isse kahte URL-i sama teemaga.
const FI_ONLY = ['fi', 'sv'];

const META = {
  fi: {
    title: 'Jälleenmyyjäksi — etsimme kumppaneita Suomesta',
    description:
      'Etsimme jälleenmyyjiä Suomesta alumiinisille varjoprofiileille. Porrastetut jälleenmyyjähinnat, suoratoimitus asiakkaalle, mallikappaleet ja tekninen tuki. Jätä yhteydenottopyyntö.',
  },
  sv: {
    title: 'Bli återförsäljare — vi söker partner i Finland',
    description:
      'Vi söker återförsäljare i Finland för skuggprofiler i aluminium. Stegvisa återförsäljarpriser, direktleverans till kunden, prover och teknisk support. Lämna en förfrågan.',
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  if (!FI_ONLY.includes(locale)) return {};

  const market = marketForLocale(locale);
  const meta = META[locale as 'fi' | 'sv'];

  // hreflang katab ainult soome ja rootsi — eesti ega vene vastet ei ole,
  // ja puuduvale keelele viitav hreflang oleks GSC-s viga.
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: abs(publicPath('/edasimuujaks', locale), market.origin),
      languages: {
        fi: abs(publicPath('/edasimuujaks', 'fi'), MARKETS.fi.origin),
        sv: abs(publicPath('/edasimuujaks', 'sv'), MARKETS.fi.origin),
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  if (!FI_ONLY.includes(locale)) notFound();
  return children;
}
