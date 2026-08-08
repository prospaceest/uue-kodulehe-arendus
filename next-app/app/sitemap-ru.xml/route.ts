import { sitemapEntries } from '@/lib/sitemapData';

// Russian sitemap. Hand-rendered rather than a second sitemap.ts because Next's
// MetadataRoute.Sitemap only generates one file per app; the entries come from
// the same list as /sitemap.xml (lib/sitemapData.ts) so the two cannot drift.
//
// Submit this file explicitly in Yandex Webmaster — Yandex indexes the RU URLs
// from their own <loc> entries, not from the Estonian sitemap's hreflang.

export const dynamic = 'force-static';

export function GET() {
  const urls = sitemapEntries()
    .map(
      (e) => `  <url>
    <loc>${e.ru}</loc>
    <xhtml:link rel="alternate" hreflang="ru" href="${e.ru}"/>
    <xhtml:link rel="alternate" hreflang="et" href="${e.et}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${e.et}"/>
    <changefreq>${e.changeFrequency}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
    },
  });
}
