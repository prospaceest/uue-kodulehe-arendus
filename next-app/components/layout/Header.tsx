'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { lp } from '@/lib/pageUrls';
import { Show, UserButton } from '@clerk/nextjs';
import styles from './Header.module.css';

// Estonian paths only — lp() resolves the Russian slug from lib/pageUrls.ts.
const NAV_LINKS = [
  { key: 'shop',        href: '/tooted'        },
  { key: 'about',       href: '/meist'         },
  { key: 'inspiration', href: '/inspiratsioon' },
  // Uudised peidetud kuni päris postitused valmis (2026-07). Taasta see rida.
  // { key: 'blog',        href: '/uudised'       },
  { key: 'salon',       href: '/salong'        },
];

export default function Header() {
  const t = useTranslations('nav');
  const tLocale = useTranslations('locale');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: string) {
    if (next === locale) return;

    // Read the target URL off the page's own hreflang link. That way the switcher
    // can never disagree with what we tell Google — and it handles the cases
    // prefix-juggling got wrong: product URLs differ per locale
    // (/led-varjuprofiilid/lae/ast12 vs /ru/led-profili/potolok/ast12), as do all
    // page slugs now. Importing the catalog here would ship it to the browser.
    const alt = document.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${next}"]`,
    );
    if (alt) {
      router.push(new URL(alt.href).pathname + window.location.search);
      return;
    }

    // Fallback for pages without alternates (noindex utility routes).
    router.push(
      next === 'ru' ? '/ru' + (pathname === '/' ? '' : pathname) : pathname.replace(/^\/ru/, '') || '/',
    );
  }

  const { totalItems } = useCart();
  const cartHref = lp('/korv', locale);
  const accountHref = lp('/konto', locale);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
    {/* Mobile nav drawer */}
    {mobileOpen && (
      <div className="vp-mobile-nav open" role="dialog" aria-label="Navigatsioon">
        <button onClick={() => setMobileOpen(false)} style={{ alignSelf: 'flex-end', fontSize: 28, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 16 }} aria-label="Sulge">✕</button>
        {NAV_LINKS.map(({ key, href }) => (
          <Link key={key} href={lp(href, locale)} onClick={() => setMobileOpen(false)}>
            {t(key as Parameters<typeof t>[0])}
          </Link>
        ))}
        <Link href={cartHref} onClick={() => setMobileOpen(false)}>{t('cart')} {totalItems > 0 && `(${totalItems})`}</Link>
        <div style={{ display: 'flex', gap: 12, marginTop: 16, paddingTop: 16, borderTop: 'var(--border)' }}>
          <button onClick={() => { switchLocale('et'); setMobileOpen(false); }} style={{ fontFamily: 'JetBrains Mono', fontWeight: locale === 'et' ? 700 : 400, opacity: locale === 'et' ? 1 : 0.5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>ET</button>
          <span style={{ opacity: 0.3 }}>|</span>
          <button onClick={() => { switchLocale('ru'); setMobileOpen(false); }} style={{ fontFamily: 'JetBrains Mono', fontWeight: locale === 'ru' ? 700 : 400, opacity: locale === 'ru' ? 1 : 0.5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>RU</button>
        </div>
      </div>
    )}
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href={lp('/', locale)} className={styles.logo} aria-label="PROSPACE">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/prospace-must.svg" alt="PROSPACE" style={{ height: 28, width: 'auto', display: 'block' }} />
        </Link>

        <nav className="vp-nav" aria-label="Peamine navigatsioon">
          {NAV_LINKS.map(({ key, href }) => (
            <Link key={key} href={lp(href, locale)}>
              {t(key as Parameters<typeof t>[0])}
            </Link>
          ))}
        </nav>
      </div>

      {/* Hamburger — visible only on mobile */}
      <button className="vp-hamburger" onClick={() => setMobileOpen(true)} aria-label="Menüü">☰</button>
      <div className="vp-nav-right">
        {/* Search */}
        <Link href={lp('/otsing', locale)} aria-label={t('search')} className={styles.iconBtn}>
          ⌕
        </Link>

        {/* Locale switcher */}
        <span
          role="group"
          aria-label={tLocale('switch.aria')}
          className={styles.localeSwitcher}
        >
          <button
            type="button"
            onClick={() => switchLocale('et')}
            aria-pressed={locale === 'et'}
            className={styles.localeBtn}
            data-active={locale === 'et'}
          >
            {tLocale('et')}
          </button>
          <span aria-hidden className={styles.localeSep}>|</span>
          <button
            type="button"
            onClick={() => switchLocale('ru')}
            aria-pressed={locale === 'ru'}
            className={styles.localeBtn}
            data-active={locale === 'ru'}
          >
            {tLocale('ru')}
          </button>
        </span>

        {/* Account — shows UserButton when signed in, link when signed out */}
        <Show when="signed-out">
          <Link href={accountHref} className={styles.iconBtn}>
            {t('account')}
          </Link>
        </Show>
        <Show when="signed-in">
          <UserButton
            appearance={{
              elements: {
                avatarBox: { width: 28, height: 28 },
                userButtonPopoverCard: { borderRadius: 0, border: '1.5px solid var(--ink)' },
              },
            }}
          />
        </Show>

        {/* Cart */}
        <Link href={cartHref} className={styles.cartPill}>
          <span>{t('cart')}</span>
          <span className="vp-mono" style={{ fontSize: 11 }}>{totalItems}</span>
        </Link>
      </div>
    </header>
    </>
  );
}
