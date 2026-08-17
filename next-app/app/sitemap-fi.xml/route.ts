import { sitemapEntries, fiOnlyEntries } from '@/lib/sitemapData';
import type { SitemapEntry, FiOnlyEntry } from '@/lib/sitemapData';
import { MARKETS } from '@/lib/markets';

// Soome sitemap (varjoprofiilit.fi). Kirjete allikas on sama nimekiri, mis
// Eesti sitemapil (lib/sitemapData.ts) — nii ei saa turud lahku minna.
//
// hreflang ristviited lisatakse ainult siis, kui teine turg on avatud
// (markets.ts indexable). Suletud turule viitav hreflang oleks GSC-s viga.

export const dynamic = 'force-static';

export function GET() {
  const eeOpen = MARKETS.ee.indexable;

  // Soome-only lehtedel (nt /jalleenmyyjille) ei ole eesti ega vene vastet.
  const hasEeSide = (e: SitemapEntry | FiOnlyEntry): e is SitemapEntry => 'et' in e;

  const urls = [...sitemapEntries(), ...fiOnlyEntries()]
    .map((e) => {
      const alts = [
        `    <xhtml:link rel="alternate" hreflang="fi" href="${e.fi}"/>`,
        `    <xhtml:link rel="alternate" hreflang="sv" href="${e.sv}"/>`,
        // Soome-only lehtedel (nt /jalleenmyyjille) ei ole eesti ega vene
        // vastet — 'et' in e eristab need tavalistest kirjetest.
        ...(eeOpen && hasEeSide(e)
          ? [
              `    <xhtml:link rel="alternate" hreflang="et" href="${e.et}"/>`,
              `    <xhtml:link rel="alternate" hreflang="ru" href="${e.ru}"/>`,
              `    <xhtml:link rel="alternate" hreflang="x-default" href="${e.et}"/>`,
            ]
          : []),
      ].join('\n');

      return `  <url>
    <loc>${e.fi}</loc>
${alts}
    <changefreq>${e.changeFrequency}</changefreq>
    <priority>${e.priority}</priority>
  </url>`;
    })
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
