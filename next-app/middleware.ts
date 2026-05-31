import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
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

  // API, tRPC and Clerk internal routes must bypass the next-intl middleware —
  // otherwise it rewrites them into the [locale] route tree and they 404.
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/trpc') ||
    pathname.startsWith('/__clerk')
  ) {
    return NextResponse.next();
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

  // Run next-intl middleware for locale detection/routing
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
    '/((?!_next|_vercel|.*\\..*).*)'],
};
