export const locales = ['et', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'et';

export const localeNames: Record<Locale, string> = {
  et: 'ET',
  ru: 'RU',
};
