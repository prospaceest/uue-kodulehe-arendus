import { getLocale } from 'next-intl/server';
import { tx } from '@/lib/tx';
import Link from 'next/link';

import type { Metadata } from 'next';
import { lp, pageAlternates } from '@/lib/pageUrls';
import { pageMetaOverride } from '@/lib/pageMeta';

export async function generateMetadata(): Promise<Metadata> {
  const { getLocale } = await import('next-intl/server');
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    alternates: pageAlternates('/inspiratsioon', locale),
    title: tx(locale, 'Вдохновение — Реальные проекты с теневыми профилями', 'Inspiratsioon — Päriseluprojektid varjuprofiilide'),
    description: tx(locale, 'Реальные проекты с теневыми профилями PROSPACE — частные дома, квартиры, ванные, офисы. Фото, список профилей, размеры.', 'Päriseluprojektid PROSPACE varjuprofiilide — eramajad, korterid, vannitoad, bürood. Fotod, profiilide loetelu, mõõtmed.'),
    // Soome/rootsi title + description (lib/pageMeta.ts) kirjutavad
    // ülemised read üle; eesti ja vene keele puhul on see tühi objekt.
    ...pageMetaOverride('/inspiratsioon', locale),
  };
}

const PROJECTS = [
  { id: 'eduardi-maja',       labelEt: 'Eramaja · Harjumaa · 2025',  labelRu: 'Частный дом · Харьюмаа · 2025',   titleEt: 'Üks maja, kolm SKU-d, üks pidev joon',               titleRu: 'Один дом, три SKU, одна непрерывная линия',     cover: '/assets/projects/eduardi-maja/00-home-cover.png',       profiles: 'AST22 · AST30 · AST50',          meters: '184 jm' },
  { id: 'tallinna-korter',    labelEt: 'Korter · Tallinn · 2025',     labelRu: 'Квартира · Таллинн · 2025',        titleEt: 'Valgus ja jooned ilma sisearhitektita',               titleRu: 'Свет и линии без дизайнера интерьера',         cover: '/assets/projects/tallinna-korter/00-home-cover.png',    profiles: 'AST22 · AST30 · AST50 · MPA015', meters: '144 jm' },
  { id: 'viimsi-vannituba',   labelEt: 'Eramaja · Viimsi · 2026',     labelRu: 'Частный дом · Виймси · 2026',      titleEt: 'Üks vann, kaks LED-joont, kolm stseeni',              titleRu: 'Одна ванна, две LED-линии, три сцены',         cover: '/assets/projects/viimsi-vannituba/00-home-cover.png',   profiles: 'AST30 · ASPL130',                meters: '8 jm'  },
  // Peidetud (ajutiselt): narva-büroo, parnu-hotell — taasta vajadusel git-ajaloost
];

export default async function InspirationIndexPage() {
  const locale = await getLocale();
  const ru = locale === 'ru';

  return (
    <div>
      <section style={{ padding: '72px 56px 32px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tx(locale, 'Реальные проекты', 'Päris projektid')}</div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: 0, lineHeight: 0.9 }}>
          {tx(locale, 'Вдохновение.', 'Inspiratsioon.')}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 680, marginTop: 18 }}>
          {`${PROJECTS.length} ${tx(locale, 'реальных проектов с нашими профилями — от частных домов до гостиниц.', 'päriseluprojekti meie profiilidega — eramajadestest hotellide ja büroodeni.')}`}
        </p>
      </section>

      <section style={{ padding: '56px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {PROJECTS.map((p) => (
            <Link key={p.id} href={lp(`/inspiratsioon/${p.id}`, locale)} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ aspectRatio: '4/5', marginBottom: 14, overflow: 'hidden', border: 'var(--border)', background: 'var(--paper-2)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.cover} alt={tx(locale, p.titleRu, p.titleEt)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
              </div>
              <div className="vp-eyebrow" style={{ marginBottom: 6 }}>{tx(locale, p.labelRu, p.labelEt)}</div>
              <h2 style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 400, fontSize: 22, margin: 0, lineHeight: 1.3 }}>
                &ldquo;{tx(locale, p.titleRu, p.titleEt)}.&rdquo;
              </h2>
              <div className="vp-mono" style={{ fontSize: 11, marginTop: 10, color: 'var(--muted)' }}>
                {p.profiles} · {p.meters}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
