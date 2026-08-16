import Link from 'next/link';
import { tx } from '@/lib/tx';
import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { site } from '@/lib/site';
import styles from './Footer.module.css';
import { lp } from '@/lib/pageUrls';
import { marketForLocale } from '@/lib/markets';

export default async function Footer() {
  const locale = await getLocale();
  // E-post, sotsiaalkanalid ja poe nimi tulevad turult — .fi jalus ei tohi
  // viidata Eesti kanalitele ega saata külastajat teisele domeenile.
  const market = marketForLocale(locale);
  const t = useTranslations;
  const ru = locale === 'ru';

  const columns = [
    {
      heading: tx(locale, 'Магазин', 'Pood'),
      links: [
        // Catalog filters via ?cat=<collection>; /tooted/<slug> paths 404.
        { label: tx(locale, 'Все товары', 'Kõik tooted'),             href: lp(`/tooted`, locale) },
        { label: tx(locale, 'Потолочные профили', 'Laeprofiilid'),    href: lp(`/tooted?cat=${encodeURIComponent('Laeprofiilid')}`, locale) },
        { label: tx(locale, 'Напольные профили', 'Põrandaprofiilid'), href: lp(`/tooted?cat=${encodeURIComponent('Põrandaprofiilid')}`, locale) },
        { label: tx(locale, 'Плинтусы', 'Põrandaliistud'),            href: lp(`/tooted?cat=${encodeURIComponent('Põrandaliistud')}`, locale) },
        { label: tx(locale, 'Аксессуары', 'Lisatarvikud'),            href: lp(`/tooted?cat=${encodeURIComponent('Lisatarvikud')}`, locale) },
      ],
    },
    {
      heading: tx(locale, 'Информация', 'Info'),
      links: [
        { label: tx(locale, 'Что такое теневой профиль?', 'Mis on varjuprofiil?'), href: lp(`/mis-on-varjuprofiil`, locale) },
        { label: tx(locale, 'О продукции', 'Toodetest'),      href: lp(`/meist`, locale) },
        { label: tx(locale, 'Вдохновение', 'Inspiratsioon'),  href: lp(`/inspiratsioon`, locale) },
        // Uudised peidetud kuni päris postitused valmis (2026-07). Taasta see rida.
        // { label: tx(locale, 'Журнал', 'Uudised'),             href: lp(`/uudised`, locale) },
        { label: tx(locale, 'Поиск', 'Otsing'),               href: lp(`/otsing`, locale) },
      ],
    },
    {
      heading: tx(locale, 'Поддержка', 'Tugi'),
      links: [
        { label: tx(locale, 'Контакты', 'Kontakt'),    href: lp(`/kontakt`, locale) },
        { label: tx(locale, 'Салон', 'Salong'),        href: lp(`/salong`, locale) },
        { label: tx(locale, 'Доставка', 'Tarne'),      href: lp(`/tarne`, locale) },
        { label: tx(locale, 'Гарантия', 'Garantii'),   href: lp(`/garantii`, locale) },
        { label: tx(locale, 'Вопросы', 'KKK'),         href: lp(`/kkk`, locale) },
        { label: tx(locale, 'Условия', 'Tingimused'),  href: lp(`/impressum`, locale) },
      ],
    },
    {
      heading: tx(locale, 'B2B / Кабинет', 'B2B / Konto'),
      links: [
        { label: tx(locale, 'Партнёрская программа', 'Partneriprogramm'), href: lp(`/professionaalidele`, locale) },
        { label: tx(locale, 'Войти', 'Logi sisse'),                       href: lp(`/konto/login`, locale) },
        { label: tx(locale, 'Личный кабинет', 'Minu konto'),              href: lp(`/konto`, locale) },
        { label: tx(locale, 'Корзина', 'Korv'),                           href: lp(`/korv`, locale) },
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Brand column */}
        <div className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/prospace-valge.svg" alt="PROSPACE" style={{ height: 34, width: 'auto', display: 'block' }} />
          <p className={styles.tagline}>
            {tx(locale, 'Магазин алюминиевых теневых профилей в Эстонии. Техническая точность + архитектурный дизайн.', 'Alumiinium varjuprofiilide pood Eestis. Tehniline täpsus + arhitektuurne disain.')}
          </p>
          <div className={styles.contact}>
            <a href={site.phoneUrl}>{site.phone}</a>
            <a href={`mailto:${market.email}`}>{market.email}</a>
            <span>{site.hoursLong}</span>
          </div>
          <div className={styles.social}>
            {[
              { label: 'IG', href: market.social.instagram, aria: 'Instagram' },
              { label: 'FB', href: market.social.facebook,  aria: 'Facebook' },
            ].filter((s) => s.href).map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.aria} className={styles.socialBtn}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.heading}>
            <div className={`vp-eyebrow ${styles.colHeading}`}>{col.heading}</div>
            {col.links.map((l) => (
              <Link key={l.href} href={l.href} className={styles.colLink}>
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <span>© 2026 {site.legal} — {site.addressFull} — Reg {site.regNr}</span>
        <span className={styles.sisters}>
          {market.sisters.map((s) => (
            <a key={s} href={`https://${s}`} target="_blank" rel="noopener">{s}</a>
          ))}
          <span>{market.storefront.toLowerCase()}</span>
        </span>
      </div>
    </footer>
  );
}
