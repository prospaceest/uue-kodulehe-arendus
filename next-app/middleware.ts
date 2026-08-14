import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { internalRuPath, internalPath, publicPath } from './lib/pageUrls';
import { marketFromHost, MARKETS } from './lib/markets';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createIntlMiddleware(routing);

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/(et|ru)/konto((?!/login).*)',
  '/konto((?!/login).*)',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { pathname } = req.nextUrl;

  // Retired domain → canonical domain. viimistlussiinid.ee (and its www) was a
  // separate legacy site; permanently redirect everything to varjuprofiilid.ee,
  // preserving path + query so old deep links resolve (further path-level
  // redirects are handled in next.config.ts).
  const host = (req.headers.get('host') || '').toLowerCase().split(':')[0];
  if (host === 'viimistlussiinid.ee' || host === 'www.viimistlussiinid.ee') {
    const target = new URL(pathname + req.nextUrl.search, 'https://varjuprofiilid.ee');
    return NextResponse.redirect(target, 308);
  }

  // API, tRPC and Clerk internal routes must bypass the next-intl middleware —
  // otherwise it rewrites them into the [locale] route tree and they 404.
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/trpc') ||
    pathname.startsWith('/__clerk')
  ) {
    return NextResponse.next();
  }

  // ── Soome turg (varjoprofiilit.fi) ────────────────────────────────────────
  // Sama koodibaas, aga eesliiteta keel on soome ja rootsi keel elab /sv all.
  // Kogu haru on hostipõhine: .ee päring siia ei jõua, seega eestikeelse lehe
  // teekond jääb täpselt endiseks.
  const market = marketFromHost(req.headers.get('x-forwarded-host') ?? host);

  if (market.id === 'fi') {
    // Eesti turu keeled ei kuulu Soome domeenile — saada õigele saidile,
    // et ei tekiks kahte URL-i sama sisuga.
    if (/^\/(et|ru)(\/|$)/.test(pathname)) {
      return NextResponse.redirect(
        new URL(pathname + req.nextUrl.search, MARKETS.ee.origin),
        308,
      );
    }

    // Konto- ja sisselogimisalad jäävad esialgu ainult Eesti domeenile: Clerk
    // vajaks teise domeeni jaoks eraldi seadistust ja katkine login on halvem
    // kui puuduv. Soome partner jõuab meieni jälleenmyyjille-vormi kaudu.
    if (/^\/(konto|tili|sign-in|sign-up)(\/|$)/.test(pathname)) {
      return NextResponse.redirect(new URL('/jalleenmyyjille', req.url), 307);
    }

    const isSv = pathname === '/sv' || pathname.startsWith('/sv/');
    const locale = isSv ? 'sv' : 'fi';

    // Avalik soome/rootsi slug → eestikeelse nimega sisemine tee, täpselt nagu
    // vene keele puhul. Tabelist puudu (tootelehed, tõlkimata teed) → jääb
    // eestikeelne tee, ainult keeleprefiks ette.
    const internal =
      internalPath(pathname, locale) ??
      (isSv ? pathname : pathname === '/' ? '/fi' : `/fi${pathname}`);

    req.nextUrl.pathname = internal;
    return intlMiddleware(req);
  }

  // Soome keeled ei kuulu Eesti domeenile. Tee tõlgitakse ka slugi tasemel —
  // /fi/tooted peab jõudma /tuotteet peale, mitte tekitama .fi peale teist
  // URL-i sama sisuga.
  if (/^\/(fi|sv)(\/|$)/.test(pathname)) {
    const isSv = pathname === '/sv' || pathname.startsWith('/sv/');
    const etPath = pathname.replace(/^\/(fi|sv)/, '') || '/';
    return NextResponse.redirect(
      new URL(publicPath(etPath, isSv ? 'sv' : 'fi') + req.nextUrl.search, MARKETS.fi.origin),
      308,
    );
  }

  // Protect B2B account routes — redirect to login if not authenticated
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const locale = req.nextUrl.pathname.startsWith('/ru') ? '/ru' : '';
      const loginUrl = new URL(`${locale}/konto/login`, req.url);
      loginUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Russian pages are published at Russian slugs (/ru/katalog, /ru/led-profili/
  // potolok) but served by the Estonian-named routes (app/[locale]/tooted, …).
  // Rewrite the pathname before next-intl sees it — the address bar keeps the
  // Russian URL, so it is the only URL Google and Yandex ever get. Product URLs
  // are not in the table: they reach the [...slug] catch-all, which resolves
  // them via urlPathRu.
  if (pathname === '/ru' || pathname.startsWith('/ru/')) {
    const internal = internalRuPath(pathname);
    if (internal) {
      req.nextUrl.pathname = internal;
    }
  }

  // Run next-intl middleware for locale detection/routing
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
    '/((?!_next|_vercel|.*\\..*).*)'],
};
