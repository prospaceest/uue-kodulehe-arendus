import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['et', 'ru'],
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
