import type { MetadataRoute } from 'next';
import { sitemapEntries } from '@/lib/sitemapData';

// Estonian sitemap. The Russian URLs get their own file (/sitemap-ru.xml) — both
// are listed in robots.txt and both are submitted to Google Search Console and
// Yandex Webmaster (I18N_SPEC.md §5–6). Yandex does not lean on hreflang the way
// Google does, so the RU URLs must be listed as <loc>s of their own, not merely
// as alternates of the Estonian ones.
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries().map((e) => ({
    url: e.et,
    alternates: { languages: { et: e.et, ru: e.ru, 'x-default': e.et } },
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
