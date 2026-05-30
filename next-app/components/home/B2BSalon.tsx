import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { site } from '@/lib/site';

export default async function B2BSalon() {
  const locale = await getLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)' }}>
      {/* B2B */}
      <div style={{ padding: '56px 48px', borderRight: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
          {ru ? 'Профессионалам' : 'Professionaalidele'}
        </div>
        <h3 className="vp-display" style={{ fontSize: 42, margin: '0 0 14px' }}>
          {ru ? 'Архитектор · Дизайнер' : 'Arhitekt · Sisekujundaja'}<br />
          {ru ? 'Строитель' : 'Ehitaja'}
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 400, marginBottom: 24 }}>
          {ru
            ? 'Скидки, образцы, техническая поддержка и совместный маркетинг.'
            : 'Soodushinnad, näidiskomplektid, tehniline tugi ja kaasturundus.'}
        </p>
        <Link href={`${pfx}/professionaalidele`} className="vp-btn vp-btn--ghost">
          {ru ? 'Стать партнёром →' : 'Liitu partneriprogrammiga →'}
        </Link>
      </div>

      {/* Salon */}
      <div style={{ padding: '56px 48px', background: 'var(--paper-2)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
          {ru ? 'Салон · Таллинн' : 'Salong · Tallinn'}
        </div>
        <h3 className="vp-display" style={{ fontSize: 42, margin: '0 0 14px' }}>
          {ru ? 'Приходите смотреть' : 'Tule näidiseid'}<br />
          {ru ? 'образцы' : 'vaatama'}
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          {site.addressFull} · {site.hours}<br />
          <a href={site.phoneUrl} style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>
            {site.phone}
          </a>
        </p>
        <Link href={`${pfx}/salong`} className="vp-btn vp-btn--ghost">
          {ru ? 'Записаться на визит →' : 'Broneeri visiit →'}
        </Link>
      </div>
    </section>
  );
}
