'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { lp } from '@/lib/pageUrls';
import { marketForLocale } from '@/lib/markets';
import { Show, UserButton } from '@clerk/nextjs';
import styles from './Header.module.css';

// Estonian paths only — lp() resolves the Russian slug from lib/pageUrls.ts.
const NAV_LINKS = [
  { key: 'shop',        href: '/tooted'        },
  { key: 'about',       href: '/meist'         },
  { key: 'inspiration', href: '/inspiratsioon' },
  { key: 'architects',  href: '/professionaalidele' },
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

  // Keelevalik piirdub selle turu keeltega: varjuprofiilid.ee peal ET/RU,
  // www.prospace.fi peal FI/SV. Muidu satuks .fi külastaja ühe klikiga Eesti
  // domeenile — talle peab paistma, et kogu sait on prospace.fi.
  const market = marketForLocale(locale);
  const localeChoices = market.locales;

  function switchLocale(next: string) {
    if (next === locale) return;

    // Read the target URL off the page's own hreflang link. That way the switcher
    // can never disagree with what we tell Google — and it handles the cases
    // prefix-juggling got wrong: product URLs differ per locale
    // (/led-varjuprofiilid/lae/ast12 vs /ru/led-profili/potolok/ast12), as do all
    // page slugs now. Importing the catalog here would ship it to the browser.
    //
    // NB: hreflang-sildid katavad ka teise turu keeli (Google vajab seda), aga
    // siia jõuavad ainult oma turu keeled — teise domeeni linki me ei ava.
    const alt = document.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${next}"]`,
    );
    if (alt) {
      const target = new URL(alt.href);
      // Kaitse: kui hreflang viitab teisele domeenile, ära navigeeri sinna.
      if (target.host === window.location.host) {
        router.push(target.pathname + window.location.search);
        return;
      }
    }

    // Fallback for pages without alternates (noindex utility routes).
    // Turu vaikekeel on eesliiteta, ülejäänud eesliitega (as-needed).
    const stripped = pathname.replace(new RegExp(`^/(${localeChoices.join('|')})(?=/|$)`), '') || '/';
    router.push(
      next === market.defaultLocale
        ? stripped
        : `/${next}${stripped === '/' ? '' : stripped}`,
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
          {localeChoices.map((code, i) => (
            <span key={code} style={{ display: 'contents' }}>
              {i > 0 && <span style={{ opacity: 0.3 }}>|</span>}
              <button
                onClick={() => { switchLocale(code); setMobileOpen(false); }}
                style={{ fontFamily: 'JetBrains Mono', fontWeight: locale === code ? 700 : 400, opacity: locale === code ? 1 : 0.5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}
              >
                {code.toUpperCase()}
              </button>
            </span>
          ))}
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
          {localeChoices.map((code, i) => (
            <span key={code} style={{ display: 'contents' }}>
              {i > 0 && <span aria-hidden className={styles.localeSep}>|</span>}
              <button
                type="button"
                onClick={() => switchLocale(code)}
                aria-pressed={locale === code}
                className={styles.localeBtn}
                data-active={locale === code}
              >
                {code === 'et' || code === 'ru' ? tLocale(code) : code.toUpperCase()}
              </button>
            </span>
          ))}
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
