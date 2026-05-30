import Link from 'next/link';
import { getLocale } from 'next-intl/server';

const PROJECTS = [
  {
    id: 'eduardi-maja',
    labelEt: 'Eramaja · Harjumaa · 2025',
    labelRu: 'Частный дом · Харьюмаа · 2025',
    titleEt: 'Üks maja, kolm SKU-d, üks pidev joon',
    titleRu: 'Один дом, три SKU, одна непрерывная линия',
    img: '/assets/projects/eduardi-maja/00-home-cover.png',
    profiles: 'AST22 · AST30 · AST50',
    meters: '184 jm',
  },
  {
    id: 'tallinna-korter',
    labelEt: 'Korter · Tallinn · 2025',
    labelRu: 'Квартира · Таллинн · 2025',
    titleEt: 'Valgus ja jooned ilma sisearhitektita',
    titleRu: 'Свет и линии без дизайнера интерьера',
    img: '/assets/projects/tallinna-korter/00-home-cover.png',
    profiles: 'AST22 · AST30 · AST50 · MPA015',
    meters: '144 jm',
  },
  {
    id: 'viimsi-vannituba',
    labelEt: 'Eramaja · Viimsi · 2026',
    labelRu: 'Частный дом · Виймси · 2026',
    titleEt: 'Üks vann, kaks LED-joont, kolm stseeni',
    titleRu: 'Одна ванна, две LED-линии, три сцены',
    img: '/assets/projects/viimsi-vannituba/00-home-cover.png',
    profiles: 'AST30 · ASPL130',
    meters: '8 jm',
  },
];

export default async function InspirationGrid() {
  const locale = await getLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  return (
    <section style={{ padding: '80px 56px', borderBottom: 'var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 8 }}>
            {ru ? '05 / Реальные проекты' : '05 / Päris projektid'}
          </div>
          <h2 className="vp-display" style={{ fontSize: 64, margin: 0 }}>
            {ru ? 'Вдохновение' : 'Inspiratsioon'}
          </h2>
        </div>
        <Link href={`${pfx}/inspiratsioon`} style={{ fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: 'var(--border)' }}>
          {ru ? 'Смотреть все →' : 'Vaata kõiki →'}
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {PROJECTS.map((p) => (
          <Link key={p.id} href={`${pfx}/inspiratsioon/${p.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ aspectRatio: '4/5', marginBottom: 14, overflow: 'hidden', border: 'var(--border)', background: 'var(--paper-2)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={ru ? p.titleRu : p.titleEt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
            </div>
            <div className="vp-eyebrow" style={{ marginBottom: 6 }}>
              {ru ? p.labelRu : p.labelEt}
            </div>
            <h3 style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 400, fontSize: 22, margin: 0, lineHeight: 1.3 }}>
              &ldquo;{ru ? p.titleRu : p.titleEt}.&rdquo;
            </h3>
            <div className="vp-mono" style={{ fontSize: 11, marginTop: 10, color: 'var(--muted)' }}>
              {p.profiles} · {p.meters}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
