import Link from 'next/link';
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
      heading: ru ? 'Магазин' : 'Pood',
      links: [
        // Catalog filters via ?cat=<collection>; /tooted/<slug> paths 404.
        { label: ru ? 'Все товары' : 'Kõik tooted',             href: lp(`/tooted`, locale) },
        { label: ru ? 'Потолочные профили' : 'Laeprofiilid',    href: lp(`/tooted?cat=${encodeURIComponent('Laeprofiilid')}`, locale) },
        { label: ru ? 'Напольные профили' : 'Põrandaprofiilid', href: lp(`/tooted?cat=${encodeURIComponent('Põrandaprofiilid')}`, locale) },
        { label: ru ? 'Плинтусы' : 'Põrandaliistud',            href: lp(`/tooted?cat=${encodeURIComponent('Põrandaliistud')}`, locale) },
        { label: ru ? 'Аксессуары' : 'Lisatarvikud',            href: lp(`/tooted?cat=${encodeURIComponent('Lisatarvikud')}`, locale) },
      ],
    },
    {
      heading: ru ? 'Информация' : 'Info',
      links: [
        { label: ru ? 'Что такое теневой профиль?' : 'Mis on varjuprofiil?', href: lp(`/mis-on-varjuprofiil`, locale) },
        { label: ru ? 'О продукции' : 'Toodetest',      href: lp(`/meist`, locale) },
        { label: ru ? 'Вдохновение' : 'Inspiratsioon',  href: lp(`/inspiratsioon`, locale) },
        // Uudised peidetud kuni päris postitused valmis (2026-07). Taasta see rida.
        // { label: ru ? 'Журнал' : 'Uudised',             href: lp(`/uudised`, locale) },
        { label: ru ? 'Поиск' : 'Otsing',               href: lp(`/otsing`, locale) },
      ],
    },
    {
      heading: ru ? 'Поддержка' : 'Tugi',
      links: [
        { label: ru ? 'Контакты' : 'Kontakt',    href: lp(`/kontakt`, locale) },
        { label: ru ? 'Салон' : 'Salong',        href: lp(`/salong`, locale) },
        { label: ru ? 'Доставка' : 'Tarne',      href: lp(`/tarne`, locale) },
        { label: ru ? 'Гарантия' : 'Garantii',   href: lp(`/garantii`, locale) },
        { label: ru ? 'Вопросы' : 'KKK',         href: lp(`/kkk`, locale) },
        { label: ru ? 'Условия' : 'Tingimused',  href: lp(`/impressum`, locale) },
      ],
    },
    {
      heading: ru ? 'B2B / Кабинет' : 'B2B / Konto',
      links: [
        { label: ru ? 'Партнёрская программа' : 'Partneriprogramm', href: lp(`/professionaalidele`, locale) },
        { label: ru ? 'Войти' : 'Logi sisse',                       href: lp(`/konto/login`, locale) },
        { label: ru ? 'Личный кабинет' : 'Minu konto',              href: lp(`/konto`, locale) },
        { label: ru ? 'Корзина' : 'Korv',                           href: lp(`/korv`, locale) },
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
            {ru
              ? 'Магазин алюминиевых теневых профилей в Эстонии. Техническая точность + архитектурный дизайн.'
              : 'Alumiinium varjuprofiilide pood Eestis. Tehniline täpsus + arhitektuurne disain.'}
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
