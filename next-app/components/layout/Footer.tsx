import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { site } from '@/lib/site';
import styles from './Footer.module.css';

export default async function Footer() {
  const locale = await getLocale();
  const t = useTranslations;
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  const columns = [
    {
      heading: ru ? 'Магазин' : 'Pood',
      links: [
        { label: ru ? 'Все товары' : 'Kõik tooted',             href: `${pfx}/tooted` },
        { label: ru ? 'Потолочные профили' : 'Laeprofiilid',    href: `${pfx}/tooted/laeprofiilid` },
        { label: ru ? 'Напольные профили' : 'Põrandaprofiilid', href: `${pfx}/tooted/porandaprofiilid` },
        { label: ru ? 'Плинтусы' : 'Põrandaliistud',            href: `${pfx}/tooted/porandaliistud` },
        { label: ru ? 'Аксессуары' : 'Lisatarvikud',            href: `${pfx}/tooted/lisatarvikud` },
      ],
    },
    {
      heading: ru ? 'Информация' : 'Info',
      links: [
        { label: ru ? 'Что такое теневой профиль?' : 'Mis on varjuprofiil?', href: `${pfx}/mis-on-varjuprofiil` },
        { label: ru ? 'О продукции' : 'Toodetest',      href: `${pfx}/meist` },
        { label: ru ? 'Вдохновение' : 'Inspiratsioon',  href: `${pfx}/inspiratsioon` },
        { label: ru ? 'Журнал' : 'Uudised',             href: `${pfx}/uudised` },
        { label: ru ? 'Поиск' : 'Otsing',               href: `${pfx}/otsing` },
      ],
    },
    {
      heading: ru ? 'Поддержка' : 'Tugi',
      links: [
        { label: ru ? 'Контакты' : 'Kontakt',    href: `${pfx}/kontakt` },
        { label: ru ? 'Салон' : 'Salong',        href: `${pfx}/salong` },
        { label: ru ? 'Доставка' : 'Tarne',      href: `${pfx}/tarne` },
        { label: ru ? 'Гарантия' : 'Garantii',   href: `${pfx}/garantii` },
        { label: ru ? 'Вопросы' : 'KKK',         href: `${pfx}/kkk` },
        { label: ru ? 'Условия' : 'Tingimused',  href: `${pfx}/impressum` },
      ],
    },
    {
      heading: ru ? 'B2B / Кабинет' : 'B2B / Konto',
      links: [
        { label: ru ? 'Партнёрская программа' : 'Partneriprogramm', href: `${pfx}/professionaalidele` },
        { label: ru ? 'Войти' : 'Logi sisse',                       href: `${pfx}/konto/login` },
        { label: ru ? 'Личный кабинет' : 'Minu konto',              href: `${pfx}/konto` },
        { label: ru ? 'Корзина' : 'Korv',                           href: `${pfx}/korv` },
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
            <a href={site.emailUrl}>{site.email}</a>
            <span>{site.hoursLong}</span>
          </div>
          <div className={styles.social}>
            {[
              { label: 'IG', href: site.instagram, aria: 'Instagram' },
              { label: 'FB', href: site.facebook,  aria: 'Facebook' },
            ].map((s) => (
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
          <a href="https://prospace.ee" target="_blank" rel="noopener">prospace.ee</a>
          <a href="https://peitlenguksed.ee" target="_blank" rel="noopener">peitlenguksed.ee</a>
          <span>varjuprofiilid.ee</span>
        </span>
      </div>
    </footer>
  );
}
