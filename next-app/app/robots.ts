import type { MetadataRoute } from 'next';

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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: BLOCKED_BOTS, disallow: '/' },
    ],
    sitemap: 'https://varjuprofiilid.ee/sitemap.xml',
  };
}
