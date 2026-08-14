import { defineRouting } from 'next-intl/routing';

// NB: `domains` seadistust siin teadlikult EI kasutata. Soome turu haru on
// middleware.ts-is oma kood, mis puudutab ainult .fi hosti — nii ei muutu
// eestikeelse lehe teekond next-intl'i sees ühegi baiti võrra. Teegi
// domeenitugi teeks ka domeenidevahelisi ümbersuunamisi, mida me ei taha.
export const routing = defineRouting({
  locales: ['et', 'ru', 'fi', 'sv'],
  defaultLocale: 'et',
  // Estonian URLs have no prefix (/tooted/...)
  // Russian URLs have /ru/ prefix (/ru/...)
  localePrefix: {
    mode: 'as-needed',
  },
  // Disable auto-detection: without this, navigating to /tooted while the
  // NEXT_LOCALE cookie says "ru" causes the middleware to redirect back to
  // /ru/tooted, making it impossible to switch back to Estonian.
  localeDetection: false,
});
