// Neli keelt, kaks turgu: et + ru elavad varjuprofiilid.ee peal, fi + sv
// varjoprofiilit.fi peal (lib/markets.ts on turgude tabel). defaultLocale on
// eesti keel — see on eesliiteta keel .ee peal ja ühtlasi Nexti staatilise
// genereerimise vaikeväärtus. Soome turul on eesliiteta keel soome keel, mille
// eest hoolitseb middleware.ts hostipõhine haru.
export const locales = ['et', 'ru', 'fi', 'sv'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'et';

export const localeNames: Record<Locale, string> = {
  et: 'ET',
  ru: 'RU',
  fi: 'FI',
  sv: 'SV',
};
