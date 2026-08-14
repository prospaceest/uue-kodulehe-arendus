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
  publicPath,
} from './pageUrls';
import { MARKETS } from './markets';
import { productPath } from './catalog';

// Soome turu URL-id ehitatakse teisele päritolule — sitemapis peavad olema
// absoluutsed lõplikud aadressid, mitte Eesti domeen soome slugiga.
const FI_ORIGIN = MARKETS.fi.origin;
const fiAbs = (path: string) => abs(path, FI_ORIGIN);

export type SitemapEntry = {
  et: string;   // absolute ET url
  ru: string;   // absolute RU url
  fi: string;   // absolute FI url (varjoprofiilit.fi)
  sv: string;   // absolute SV url (varjoprofiilit.fi/sv)
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
      fi: fiAbs(publicPath(path, 'fi')),
      sv: fiAbs(publicPath(path, 'sv')),
      priority: path === '/' ? 1 : 0.8,
      changeFrequency: 'weekly',
    });
  }

  for (const slug of INSPIRATION_SLUGS) {
    const path = `/inspiratsioon/${slug}`;
    entries.push({
      et: abs(path), ru: abs(ruPath(path)),
      fi: fiAbs(publicPath(path, 'fi')), sv: fiAbs(publicPath(path, 'sv')),
      priority: 0.6, changeFrequency: 'monthly',
    });
  }

  if (BLOG_ENABLED) {
    for (const slug of BLOG_SLUGS) {
      const path = `/uudised/${slug}`;
      entries.push({
        et: abs(path), ru: abs(ruPath(path)),
        fi: fiAbs(publicPath(path, 'fi')), sv: fiAbs(publicPath(path, 'sv')),
        priority: 0.6, changeFrequency: 'monthly',
      });
    }
  }

  for (const p of products) {
    entries.push({
      et: abs(noSlash(p.urlPath)),
      ru: abs(noSlash(`/ru${p.urlPathRu}`)),
      fi: fiAbs(noSlash(productPath(p, 'fi'))),
      sv: fiAbs(noSlash(productPath(p, 'sv'))),
      priority: 0.9,
      changeFrequency: 'monthly',
    });
  }

  return entries;
}
