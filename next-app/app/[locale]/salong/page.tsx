import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import { site } from '@/lib/site';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { getLocale } = await import('next-intl/server');
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'Салон в Таллинне — Vana-Kalamaja 8–110' : 'Salong Tallinnas — Vana-Kalamaja 8–110',
    description: ru ? 'Салон PROSPACE в Таллинне — посмотрите образцы профилей, получите консультацию, заберите сами. Пн–Пт 10–17.' : 'PROSPACE salong Tallinnas — vaata profiilide näidiseid, otsi nõu ja tule ise järele. Avatud E–R 10–17.',
  };
}

export default async function SalonPage() {
  const locale = await getLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  return (
    <div>
      {/* Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)', minHeight: 560 }}>
        <div style={{ padding: '72px 56px', borderRight: 'var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="vp-eyebrow">{ru ? 'Салон · Таллинн · Vana-Kalamaja 8' : 'Salong · Tallinn · Vana-Kalamaja 8'}</div>
          <div>
            <h1 className="vp-display" style={{ fontSize: 'clamp(64px, 9vw, 144px)', margin: '24px 0 0', lineHeight: 0.9 }}>
              {ru ? 'Приходите смотреть.' : 'Tule näidiseid vaatama.'}
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 480, marginTop: 28 }}>
              {ru
                ? 'В нашем салоне можно вживую посмотреть все серии профилей, потрогать покрытия, сравнить цвета RAL. Рекомендуем заранее забронировать визит.'
                : 'Meie salongis saad kõik profiiliseeriad oma silmaga üle vaadata, katteid katsuda, RAL-värve võrrelda. Soovitame külastuse ette broneerida.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 40 }}>
            <a href={site.phoneUrl} className="vp-btn vp-btn--lg">{ru ? 'Забронировать визит →' : 'Broneeri visiit →'}</a>
            <Link href={`${pfx}/kontakt`} className="vp-btn vp-btn--ghost vp-btn--lg">{ru ? 'Написать нам' : 'Kirjuta meile'}</Link>
          </div>
        </div>
        <div style={{ backgroundImage: 'url("/assets/salong-tallinn.jpg")', backgroundSize: 'cover', backgroundPosition: '30% center', minHeight: 480 }} />
      </section>

      {/* Info grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: 'var(--border)' }}>
        {[
          { n: ru ? 'Адрес' : 'Aadress',          v: `${site.addressLine1}\n${site.addressLine2}`, href: `https://maps.google.com/maps?q=${site.mapsQuery}` },
          { n: ru ? 'Часы работы' : 'Lahtiolekuaeg', v: site.hoursLong,                             href: null },
          { n: ru ? 'Контакт' : 'Kontakt',          v: `${site.phone}\n${site.email}`,              href: site.phoneUrl },
        ].map((b, i) => (
          <div key={b.n} style={{ padding: '48px 40px', borderRight: i < 2 ? 'var(--border)' : 'none' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{b.n}</div>
            {b.href ? (
              <a href={b.href} target={b.href.startsWith('https://maps') ? '_blank' : undefined} rel="noopener" style={{ color: 'inherit', textDecoration: 'none' }}>
                <div className="vp-display" style={{ fontSize: 28, lineHeight: 1.2, whiteSpace: 'pre-line' }}>{b.v}</div>
              </a>
            ) : (
              <div className="vp-display" style={{ fontSize: 28, lineHeight: 1.2, whiteSpace: 'pre-line' }}>{b.v}</div>
            )}
          </div>
        ))}
      </section>

      {/* Map */}
      <section style={{ borderBottom: 'var(--border)', position: 'relative', height: 420 }}>
        <iframe
          title={ru ? 'Карта салона' : 'Salongi asukoht'}
          src={site.osmEmbed}
          width="100%"
          height="420"
          style={{ border: 'none', display: 'block', filter: 'grayscale(0.4) contrast(1.05)' }}
          loading="lazy"
        />
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${site.mapsQuery}`}
          target="_blank"
          rel="noopener"
          className="vp-mono"
          style={{ position: 'absolute', left: 16, bottom: 16, background: 'var(--paper)', border: 'var(--border)', padding: '8px 12px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', color: 'var(--ink)' }}
        >
          {ru ? 'Открыть в картах →' : 'Ava kaardirakenduses →'}
        </a>
      </section>

      {/* What to see in salon */}
      <section style={{ padding: '72px 56px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Что можно посмотреть' : 'Mida saab näha'}</div>
        <h2 className="vp-display" style={{ fontSize: 64, margin: '0 0 48px', lineHeight: 0.95 }}>
          {ru ? 'Все серии в наличии.' : 'Kõik seeriad kohapeal.'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
            { tEt: 'Laeprofiilid',             tRu: 'Потолочные профили',    dEt: 'Kõik laeprofiile, sh pahteldatavad LHV-seeria profiilid.',     dRu: 'Все потолочные, включая прошпаклёвываемые серии LHV.' },
            { tEt: 'Põranda- ja seinaprofiilid', tRu: 'Напольные и настенные', dEt: 'ASP- ja LPA-seeria profiilid põrandale ja seinale.',          dRu: 'Серии ASP и LPA для пола и стены.' },
            { tEt: 'RAL värvitoonid',            tRu: 'Оттенки RAL',           dEt: 'Füüsilised RAL-näidised kõikidest populaarsematest toonidest.', dRu: 'Физические образцы RAL — все популярные оттенки.' },
            { tEt: 'LED-ühilduvus',              tRu: 'Совместимость с LED',   dEt: 'Vaata kuidas LED-riba profiilides töötab ja millist valgust annab.', dRu: 'Посмотрите, как работает LED-лента в профилях и какой даёт свет.' },
          ].map((c, i) => (
            <div key={i} style={{ padding: '28px 24px', border: 'var(--border)' }}>
              <div className="vp-mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>0{i + 1}</div>
              <div className="vp-display" style={{ fontSize: 26, lineHeight: 1.05, marginBottom: 10 }}>{ru ? c.tRu : c.tEt}</div>
              <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>{ru ? c.dRu : c.dEt}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section style={{ padding: '72px 56px', background: 'var(--paper-2)', borderBottom: 'var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Забронировать визит' : 'Broneeri visiit'}</div>
          <h2 className="vp-display" style={{ fontSize: 56, margin: 0, lineHeight: 0.95 }}>
            {ru ? '30 минут · бесплатно.' : '30 minutit · tasuta.'}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', marginTop: 18 }}>
            {ru
              ? 'Персональная встреча со специалистом — покажем профили, ответим на вопросы по монтажу и подберём оттенок RAL.'
              : 'Isiklik kohtumine spetsialistiga — näitame profiile, vastame paigalduse küsimustele ja aitame RAL tooni valida.'}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <a href={site.phoneUrl} className="vp-btn vp-btn--lg" style={{ textAlign: 'center' }}>
            {ru ? `Позвонить: ${site.phone}` : `Helista: ${site.phone}`}
          </a>
          <a href={site.emailUrl} className="vp-btn vp-btn--ghost vp-btn--lg" style={{ textAlign: 'center' }}>
            {ru ? `Написать: ${site.email}` : `Kirjuta: ${site.email}`}
          </a>
        </div>
      </section>
    </div>
  );
}
