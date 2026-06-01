import '@/app/globals.css';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ClerkProvider } from '@clerk/nextjs';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/config';
import Header from '@/components/layout/Header';
import Marquee from '@/components/layout/Marquee';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/cart';

export const metadata: Metadata = {
  title: {
    template: '%s | Varjuprofiilid.ee',
    default: 'Varjuprofiilid.ee — Alumiinium varjuprofiilid',
  },
  description:
    'Alumiinium varjuprofiilid LED-valgustusega ja dekoratiivsed — laele, põrandale, seinale. PROSPACE OÜ, Tallinn.',
  metadataBase: new URL('https://varjuprofiilid.ee'),
  openGraph: {
    siteName: 'Varjuprofiilid.ee',
    type: 'website',
    images: [{ url: '/assets/hero-hoeljuv-lagi.jpg', width: 1200, height: 630, alt: 'Varjuprofiilid — hõljuva lae efekt' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/assets/hero-hoeljuv-lagi.jpg'],
  },
  alternates: {
    languages: {
      et: 'https://varjuprofiilid.ee',
      ru: 'https://varjuprofiilid.ee/ru',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Zoom jäetud sisse ligipääsetavuse huvides (ära lisa maximumScale/userScalable).
  // Vaba "panimise" tõkestab globals.css overflow-x: clip.
  viewportFit: 'cover',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang={locale}>
        <head>
          {/* Yandex Webmaster verification — replace with actual code from webmaster.yandex.com */}
          {process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && (
            <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_VERIFICATION} />
          )}
        </head>
        <body>
          <NextIntlClientProvider messages={messages}>
            <CartProvider>
              <Header />
              <Marquee />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </NextIntlClientProvider>
          {/* Yandex.Metrica — add counter ID in .env.local */}
          {process.env.NEXT_PUBLIC_YM_COUNTER && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${process.env.NEXT_PUBLIC_YM_COUNTER},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`,
              }}
            />
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
