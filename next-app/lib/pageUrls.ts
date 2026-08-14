// Single source of truth for non-product page URLs and their locale pairs.
//
// Why this exists: canonical, hreflang, internal links and both sitemaps must
// agree. They didn't — hub pages hardcoded the ET URL as canonical in BOTH
// locales (so every RU hub page declared itself a duplicate of the Estonian one)
// while their hreflang pointed at /ru/led-profili/* paths that had no route, and
// the sitemap advertised a third variant. Everything now reads the table below.
//
// Product URLs are NOT here — they come from catalog.json (`urlPath` /
// `urlPathRu`). Same rule applies there: read, never compute.
//
// I18N_SPEC.md §1: RU slugs are Russian transliterated to Latin — ranks in
// Google.ee + Yandex, and survives copy-paste (Cyrillic would percent-encode).

import { MARKETS, marketForLocale } from './markets';

// Eesti turu päritolu. Jäetud eksporti tagasiühilduvuse pärast — uus kood
// küsigu päritolu turult (lib/markets.ts), sest .fi peal on see teine.
export const BASE = MARKETS.ee.origin;

// ── ET path → RU path ───────────────────────────────────────────────────────
// The RU side is the PUBLIC url. Internally every RU page is still served by the
// Estonian-named route (app/[locale]/tooted/…); middleware.ts rewrites the RU
// slug onto it, so no route directories are duplicated.
//
// Category paths follow I18N_SPEC.md §2: led-profili / dekor-profili +
// potolok / pol / stena / centralnyj.
const RU_PATHS: Record<string, string> = {
  '/': '/ru',
  '/tooted': '/ru/katalog',
  '/kkk': '/ru/faq',
  '/tarne': '/ru/dostavka',
  '/garantii': '/ru/garantiya',
  '/impressum': '/ru/rekvizity',
  '/kontakt': '/ru/kontakty',
  '/salong': '/ru/salon',
  '/meist': '/ru/o-nas',
  '/professionaalidele': '/ru/professionalam',
  '/inspiratsioon': '/ru/vdohnovenie',
  '/mis-on-varjuprofiil': '/ru/chto-takoe-tenevoy-profil',
  '/uudised': '/ru/novosti',
  // Hub + category pages
  '/led-varjuprofiilid': '/ru/led-profili',
  '/led-varjuprofiilid/lae': '/ru/led-profili/potolok',
  '/led-varjuprofiilid/poranda': '/ru/led-profili/pol',
  '/led-varjuprofiilid/seina': '/ru/led-profili/stena',
  '/led-varjuprofiilid/kesklae': '/ru/led-profili/centralnyj',
  '/varjuprofiilid': '/ru/dekor-profili',
  '/varjuprofiilid/lae': '/ru/dekor-profili/potolok',
  '/varjuprofiilid/poranda': '/ru/dekor-profili/pol',
  '/varjuprofiilid/seina': '/ru/dekor-profili/stena',
  // Utility pages — noindex, but the RU visitor still deserves a Russian URL.
  // /konto* and /sign-in|/sign-up stay untranslated: they are matched by name in
  // Clerk's isProtectedRoute matcher, so renaming them is an auth change, not an
  // SEO one.
  '/otsing': '/ru/poisk',
  '/korv': '/ru/korzina',
  '/tellimus': '/ru/zakaz',
};

// Content sections whose child slugs pass through untranslated (project and post
// slugs are content, not navigation): /ru/vdohnovenie/eduardi-maja.
const RU_PARENTS: [ruParent: string, etParent: string][] = [
  ['/ru/vdohnovenie', '/inspiratsioon'],
  ['/ru/novosti', '/uudised'],
];

// ── ET path → FI / SV path (www.prospace.fi) ───────────────────────────────
// Soome turul on soome keel eesliiteta (nagu eesti keel .ee peal) ja rootsi
// keel /sv all. Slugid on ASCII-tähtedega meelega: ä/ö URL-is muutub
// protsendikoodiks ja lõhub kopeerimise, Google mõistab mõlemat.
//
// Terminoloogia: soome kaubanduses käibivad nii "varjolista" kui
// "varjoprofiili"; valitud on varjoprofiili(t), sest see katab ka LED-versiooni
// ja on lähem tootekategooriale. Põrandal on eraldi suur otsingumaht sõnal
// "jalkalista" — see kuulub pealkirjadesse ja meta-teksti, mitte URL-i.
const FI_PATHS: Record<string, string> = {
  '/': '/',
  '/tooted': '/tuotteet',
  '/kkk': '/ukk',
  '/tarne': '/toimitus',
  '/garantii': '/takuu',
  '/impressum': '/yritystiedot',
  '/kontakt': '/yhteystiedot',
  '/salong': '/nayttelytila',
  '/meist': '/meista',
  '/professionaalidele': '/jalleenmyyjille',
  '/inspiratsioon': '/inspiraatio',
  '/mis-on-varjuprofiil': '/mika-on-varjoprofiili',
  '/uudised': '/uutiset',
  '/led-varjuprofiilid': '/led-varjoprofiilit',
  '/led-varjuprofiilid/lae': '/led-varjoprofiilit/katto',
  '/led-varjuprofiilid/poranda': '/led-varjoprofiilit/lattia',
  '/led-varjuprofiilid/seina': '/led-varjoprofiilit/seina',
  '/led-varjuprofiilid/kesklae': '/led-varjoprofiilit/keskikatto',
  '/varjuprofiilid': '/varjoprofiilit',
  '/varjuprofiilid/lae': '/varjoprofiilit/katto',
  '/varjuprofiilid/poranda': '/varjoprofiilit/lattia',
  '/varjuprofiilid/seina': '/varjoprofiilit/seina',
  '/otsing': '/haku',
  '/korv': '/kori',
  '/tellimus': '/tilaus',
};

const SV_PATHS: Record<string, string> = {
  '/': '/sv',
  '/tooted': '/sv/produkter',
  '/kkk': '/sv/vanliga-fragor',
  '/tarne': '/sv/leverans',
  '/garantii': '/sv/garanti',
  '/impressum': '/sv/foretagsuppgifter',
  '/kontakt': '/sv/kontakt',
  '/salong': '/sv/showroom',
  '/meist': '/sv/om-oss',
  '/professionaalidele': '/sv/aterforsaljare',
  '/inspiratsioon': '/sv/inspiration',
  '/mis-on-varjuprofiil': '/sv/vad-ar-en-skuggprofil',
  '/uudised': '/sv/nyheter',
  '/led-varjuprofiilid': '/sv/led-skuggprofiler',
  '/led-varjuprofiilid/lae': '/sv/led-skuggprofiler/tak',
  '/led-varjuprofiilid/poranda': '/sv/led-skuggprofiler/golv',
  '/led-varjuprofiilid/seina': '/sv/led-skuggprofiler/vagg',
  '/led-varjuprofiilid/kesklae': '/sv/led-skuggprofiler/mittentak',
  '/varjuprofiilid': '/sv/skuggprofiler',
  '/varjuprofiilid/lae': '/sv/skuggprofiler/tak',
  '/varjuprofiilid/poranda': '/sv/skuggprofiler/golv',
  '/varjuprofiilid/seina': '/sv/skuggprofiler/vagg',
  '/otsing': '/sv/sok',
  '/korv': '/sv/varukorg',
  '/tellimus': '/sv/bestallning',
};

const FI_PARENTS: [publicParent: string, etParent: string][] = [
  ['/inspiraatio', '/inspiratsioon'],
  ['/uutiset', '/uudised'],
];

const SV_PARENTS: [publicParent: string, etParent: string][] = [
  ['/sv/inspiration', '/inspiratsioon'],
  ['/sv/nyheter', '/uudised'],
];

// Kõik tõlgitud teetabelid ühes kohas, et marsruutimine ja sitemapid saaksid
// neid ühtemoodi lugeda. RU on jäetud eraldi funktsioonidesse allpool, kuna
// see loogika on livis ja töötab — uut üldistust ei tasu talle peale suruda
// enne, kui Soome pool on püsti ja kontrollitud.
export const LOCALE_PATHS: Record<string, Record<string, string>> = {
  fi: FI_PATHS,
  sv: SV_PATHS,
};

export const LOCALE_PARENTS: Record<string, [string, string][]> = {
  fi: FI_PARENTS,
  sv: SV_PARENTS,
};

// Reverse lookup for middleware: public RU path → Estonian-named internal path.
const RU_TO_INTERNAL: Record<string, string> = Object.fromEntries(
  Object.entries(RU_PATHS).map(([et, ru]) => [ru, et === '/' ? '/ru' : `/ru${et}`]),
);

// ── Page inventory ─────────────────────────────────────────────────────────
// Indexable non-product pages, keyed by Estonian path. Drives both sitemaps.
// NB: /otsing, /korv, /tellimus, /konto/*, /sign-in, /sign-up and /uudised/* are
// deliberately noindex — they are not listed here.
export const STATIC_PAGES = [
  '/',
  '/tooted',
  '/kkk',
  '/tarne',
  '/garantii',
  '/impressum',
  '/kontakt',
  '/salong',
  '/meist',
  '/professionaalidele',
  '/inspiratsioon',
  '/mis-on-varjuprofiil',
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

export const INSPIRATION_SLUGS = ['eduardi-maja', 'tallinna-korter', 'viimsi-vannituba'];

// Blog is hidden (2026-07) until real posts are ready — /uudised/* is noindex.
// Flip this together with the noindex in app/[locale]/uudised/layout.tsx and the
// commented-out nav link in components/layout/Header.tsx.
export const BLOG_ENABLED = false;
export const BLOG_SLUGS = [
  'varjuprofiil-pohjalik-juhend', 'varjuprofiili-tuubid', 'peitliist-interjooris',
  'varjuprofiil-vs-porandaliist', 'varjuvuuk-kogu-ruumis', 'varjuvuuk-eesti-standard',
  'porandaliistu-stiilid-2026', 'peitliist-eelised-7-pohjust',
];

// ── Helpers ────────────────────────────────────────────────────────────────

// ET path → public RU path. Falls back to `/ru` + the ET path for anything not
// in the table (so a new page is reachable in RU before it gets a slug).
export function ruPath(etPath: string): string {
  const [path, query] = etPath.split('?');
  const mapped = RU_PATHS[path];
  if (mapped) return query ? `${mapped}?${query}` : mapped;

  for (const [ruParent, etParent] of RU_PARENTS) {
    if (path.startsWith(`${etParent}/`)) {
      return `${ruParent}${path.slice(etParent.length)}${query ? `?${query}` : ''}`;
    }
  }
  return `/ru${etPath}`;
}

// ET path → avalik tee soome/rootsi keeles. Sama muster kui ruPath(), aga
// tabel tuleb keele järgi. Tundmatu tee puhul jääb eestikeelne tee alles —
// nii on uus leht kohe kättesaadav, kuigi slug on veel tõlkimata.
export function localePath(etPath: string, locale: string): string {
  const table = LOCALE_PATHS[locale];
  if (!table) return etPath;

  const [path, query] = etPath.split('?');
  const mapped = table[path];
  if (mapped) return query ? `${mapped}?${query}` : mapped;

  for (const [publicParent, etParent] of LOCALE_PARENTS[locale] ?? []) {
    if (path.startsWith(`${etParent}/`)) {
      return `${publicParent}${path.slice(etParent.length)}${query ? `?${query}` : ''}`;
    }
  }
  return locale === 'sv' ? `/sv${etPath}` : etPath;
}

// Avalik tee → eestikeelne sisemine tee, middleware'i rewrite'i jaoks.
// Vaste puudumisel null (nt tootelehed, mis lahenevad [...slug] kaudu).
export function internalPath(publicPath: string, locale: string): string | null {
  const table = LOCALE_PATHS[locale];
  if (!table) return null;

  for (const [etPath, mapped] of Object.entries(table)) {
    if (mapped === publicPath) return etPath === '/' ? `/${locale}` : `/${locale}${etPath}`;
  }

  for (const [publicParent, etParent] of LOCALE_PARENTS[locale] ?? []) {
    if (publicPath.startsWith(`${publicParent}/`)) {
      return `/${locale}${etParent}${publicPath.slice(publicParent.length)}`;
    }
  }
  return null;
}

// Internal-link helper — the only correct way to build a locale-aware href.
// Pass the Estonian path (with optional query): lp('/tooted?cat=Tarvikud', locale)
export function lp(etPath: string, locale: string): string {
  if (locale === 'ru') return ruPath(etPath);
  if (LOCALE_PATHS[locale]) return localePath(etPath, locale);
  return etPath;
}

// Public RU path → Estonian-named internal path, for the middleware rewrite.
// Returns null when the path needs no rewrite (ET pages, RU product URLs served
// by the [...slug] catch-all, /api, …).
export function internalRuPath(publicPath: string): string | null {
  const exact = RU_TO_INTERNAL[publicPath];
  if (exact) return exact;

  for (const [ruParent, etParent] of RU_PARENTS) {
    if (publicPath.startsWith(`${ruParent}/`)) {
      return `/ru${etParent}${publicPath.slice(ruParent.length)}`;
    }
  }
  return null;
}

// Self-canonical for the current locale + the hreflang pair. x-default points at
// Estonian: primary market, and the prefix-less URL.
//
// Päritolu on parameeter, sest sama tee elab kahel domeenil: /tooted on
// varjuprofiilid.ee peal, /tuotteet www.prospace.fi peal. Vaikeväärtus on Eesti
// turg, nii et olemasolevad kutsed käituvad täpselt nagu enne.
export function abs(path: string, origin: string = MARKETS.ee.origin): string {
  return path === '/' ? origin : `${origin}${path}`;
}

// ET tee → selle keele AVALIK tee. Iga keelel on oma slug ja canonical peab
// osutama just sellele — muidu kuulutab soomekeelne leht end eestikeelse
// duplikaadiks (täpselt see viga oli varem vene lehtedel).
export function publicPath(etPath: string, locale: string): string {
  if (locale === 'ru') return ruPath(etPath);
  if (LOCALE_PATHS[locale]) return localePath(etPath, locale);
  return etPath;
}

export function pageAlternates(etPath: string, locale: string) {
  // Turg tuletatakse keelest, mitte hostist — nii jääb leht staatiliseks
  // (headers() lugemine muudaks iga lehe dünaamiliseks).
  const selfMarket = marketForLocale(locale);

  // hreflang katab oma turu keeled alati ja teise turu keeled ainult siis, kui
  // see turg on otsimootoritele avatud. Nii ei viita eestikeelne leht kunagi
  // veel valmimata soome lehele (Google loeks seda veaks), aga hetkel, mil
  // markets.ts-is indexable: true, tekib täielik ristdomeeni-klaster ise.
  const languages: Record<string, string> = {};
  for (const market of Object.values(MARKETS)) {
    if (market.id !== selfMarket.id && !market.indexable) continue;
    for (const l of market.locales) {
      languages[l] = abs(publicPath(etPath, l), market.origin);
    }
  }
  languages['x-default'] = abs(etPath, MARKETS.ee.origin);

  return {
    canonical: abs(publicPath(etPath, locale), selfMarket.origin),
    languages,
  };
}
