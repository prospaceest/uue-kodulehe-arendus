import type { MetadataRoute } from 'next';
import { products } from '@/lib/catalog';

const BASE = 'https://varjuprofiilid.ee';

const STATIC_ET = [
  '/', '/tooted', '/kkk', '/tarne', '/garantii', '/impressum',
  '/kontakt', '/salong', '/meist', '/professionaalidele',
  '/inspiratsioon', '/mis-on-varjuprofiil',
  // NB: /otsing (search) is noindex — deliberately excluded from the sitemap.
  // NB: /uudised (blog) is temporarily hidden (2026-07) — restore with BLOG_SLUGS loop below.
  // Hub pages
  '/led-varjuprofiilid',
  '/led-varjuprofiilid/lae',
  '/led-varjuprofiilid/poranda',
  '/led-varjuprofiilid/seina',
  '/led-varjuprofiilid/kesklae',
  '/varjuprofiilid',
  '/varjuprofiilid/lae',
  '/varjuprofiilid/seina',
  '/varjuprofiilid/poranda',
];

const BLOG_SLUGS = [
  'varjuprofiil-pohjalik-juhend', 'varjuprofiili-tuubid', 'peitliist-interjooris',
  'varjuprofiil-vs-porandaliist', 'varjuvuuk-kogu-ruumis', 'varjuvuuk-eesti-standard',
  'porandaliistu-stiilid-2026', 'peitliist-eelised-7-pohjust',
];

const INSPIRATION_SLUGS = [
  'eduardi-maja', 'tallinna-korter', 'viimsi-vannituba',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static ET pages
  for (const path of STATIC_ET) {
    const ruPath = path === '/' ? '/ru' : `/ru${path}`;
    entries.push({
      url: `${BASE}${path}`,
      alternates: { languages: { et: `${BASE}${path}`, ru: `${BASE}${ruPath}` } },
      changeFrequency: 'weekly',
      priority: path === '/' ? 1 : 0.8,
    });
  }

  // Blog posts — temporarily hidden (2026-07) until real posts are ready.
  // Flip BLOG_ENABLED back to true together with the /uudised nav links + noindex removal.
  const BLOG_ENABLED = false;
  if (BLOG_ENABLED) {
    for (const slug of BLOG_SLUGS) {
      entries.push({
        url: `${BASE}/uudised/${slug}`,
        alternates: { languages: { et: `${BASE}/uudised/${slug}`, ru: `${BASE}/ru/uudised/${slug}` } },
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  // Inspiration projects
  for (const slug of INSPIRATION_SLUGS) {
    entries.push({
      url: `${BASE}/inspiratsioon/${slug}`,
      alternates: { languages: { et: `${BASE}/inspiratsioon/${slug}`, ru: `${BASE}/ru/inspiratsioon/${slug}` } },
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // Product pages. urlPath carries a trailing slash, but Next serves the
  // slash-less form (308-normalised) — the sitemap must list final URLs.
  const noSlash = (path: string) => `${BASE}${path}`.replace(/\/$/, '');
  for (const p of products) {
    entries.push({
      url: noSlash(p.urlPath),
      alternates: { languages: { et: noSlash(p.urlPath), ru: noSlash(`/ru${p.urlPathRu}`) } },
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  }

  return entries;
}
