import type { MetadataRoute } from 'next';
import { sitemapEntries } from '@/lib/sitemapData';

// Estonian sitemap. The Russian URLs get their own file (/sitemap-ru.xml) — both
// are listed in robots.txt and both are submitted to Google Search Console and
// Yandex Webmaster (I18N_SPEC.md §5–6). Yandex does not lean on hreflang the way
// Google does, so the RU URLs must be listed as <loc>s of their own, not merely
// as alternates of the Estonian ones.
export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified gives Google a freshness signal to re-crawl. Without it there is
  // no cue to revisit pages that were cached as noindex during the 2026-06/07
  // Vercel bot-protection incident — so recovery stalls. Build time is a coarse
  // but honest signal: it advances on every deploy.
  const lastModified = new Date();
  return sitemapEntries().map((e) => ({
    url: e.et,
    lastModified,
    alternates: { languages: { et: e.et, ru: e.ru, 'x-default': e.et } },
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
