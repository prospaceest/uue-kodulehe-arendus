import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { marketFromHost } from '@/lib/markets';

// Aggressive AI / scraper crawlers that generate heavy request volume without
// SEO value. Blocking them here cuts load (the well-behaved ones obey robots.txt)
// without touching real search engines (Googlebot, Bingbot, Yandex). Firewall
// rules enforce the ones that ignore robots.txt (e.g. Bytespider).
const BLOCKED_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'CCBot',
  'Google-Extended',
  'PerplexityBot',
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
  'Applebot-Extended',
];

// Sitemapid turu kaupa. Kummalgi domeenil peab robots.txt reklaamima ainult
// oma sitemappe — vastasel juhul saadaks prospace.fi Google'i Eesti URL-idele.
const SITEMAPS: Record<string, string[]> = {
  ee: ['/sitemap.xml', '/sitemap-ru.xml'],
  fi: ['/sitemap-fi.xml', '/sitemap-sv.xml'],
};

// Hosti lugemine muudab selle marsruudi dünaamiliseks — see on ainult
// robots.txt, mitte leheküljed, seega hind on olematu.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const h = await headers();
  const market = marketFromHost(h.get('x-forwarded-host') ?? h.get('host'));

  // Turg, mille sisu pole veel valmis, jääb otsimootoritele kinni. Nii ei jõua
  // pooleldi tõlgitud lehed indeksisse ja hiljem ei pea vigu välja roomama.
  if (!market.indexable) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: BLOCKED_BOTS, disallow: '/' },
    ],
    sitemap: (SITEMAPS[market.id] ?? SITEMAPS.ee).map((p) => `${market.origin}${p}`),
  };
}
