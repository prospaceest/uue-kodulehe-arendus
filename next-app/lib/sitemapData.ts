// Shared inventory for both sitemaps (/sitemap.xml = ET, /sitemap-ru.xml = RU).
// One list, two renderings — so the Estonian and Russian sitemaps can never drift
// apart. Kept out of lib/pageUrls.ts because that file is imported by
// middleware.ts and must not pull catalog.json into the edge bundle.

import { products } from '@/lib/catalog';
import {
  STATIC_PAGES,
  INSPIRATION_SLUGS,
  BLOG_SLUGS,
  BLOG_ENABLED,
  abs,
  ruPath,
} from './pageUrls';

export type SitemapEntry = {
  et: string;   // absolute ET url
  ru: string;   // absolute RU url
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
};

// urlPath/urlPathRu carry a trailing slash, but Next serves the slash-less form
// (308-normalised) — sitemaps must list final URLs, never a redirect.
const noSlash = (path: string) => path.replace(/\/$/, '');

export function sitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  for (const path of STATIC_PAGES) {
    entries.push({
      et: abs(path),
      ru: abs(ruPath(path)),
      priority: path === '/' ? 1 : 0.8,
      changeFrequency: 'weekly',
    });
  }

  for (const slug of INSPIRATION_SLUGS) {
    const path = `/inspiratsioon/${slug}`;
    entries.push({ et: abs(path), ru: abs(ruPath(path)), priority: 0.6, changeFrequency: 'monthly' });
  }

  if (BLOG_ENABLED) {
    for (const slug of BLOG_SLUGS) {
      const path = `/uudised/${slug}`;
      entries.push({ et: abs(path), ru: abs(ruPath(path)), priority: 0.6, changeFrequency: 'monthly' });
    }
  }

  for (const p of products) {
    entries.push({
      et: abs(noSlash(p.urlPath)),
      ru: abs(noSlash(`/ru${p.urlPathRu}`)),
      priority: 0.9,
      changeFrequency: 'monthly',
    });
  }

  return entries;
}
