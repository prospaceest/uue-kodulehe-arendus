import { getLocale } from 'next-intl/server';
import { site } from '@/lib/site';

const TILES = [
  { img: '/assets/projects/eduardi-maja/01-elutuba-hero.jpg',        cap: 'Eduardi maja — AST50 LED perimeeter elutoas. 184 jm ühte rütmi.', likes: '742', comments: '38', tag: '#AST50 #LED' },
  { img: '/assets/products/AST22_1.jpg',                             cap: 'AST22 must matt — õhuke joon põranda ja seina vahel.', likes: '218', comments: '9',  tag: '#AST22' },
  { img: '/assets/projects/tallinna-korter/02-kook-hoeljuv-lagi.jpg', cap: 'Tallinna korter — hõljuv lagi köögi kohal, omanik ise paigaldas.', likes: '512', comments: '34', tag: '#AST50 #DIY' },
  { img: '/assets/LHV10/LHV10_1.jpg',                                 cap: 'LHV10 — meie enimmüüdud lae peiteprofiil.', likes: '894', comments: '47', tag: '#LHV10' },
  { img: '/assets/projects/viimsi-vannituba/01-profiilitulled.jpg',   cap: 'Viimsi vannituba — ainult profiilide LED. Kaks joont, kolm stsenaariumi.', likes: '631', comments: '28', tag: '#ASPL130 #AST30' },
  { img: '/assets/products/AST30_1.jpg',                             cap: 'AST30 — 30 mm LED-tasku, sobib uksesilluste ja niššide raamimiseks.', likes: '276', comments: '12', tag: '#AST30' },
  { img: '/assets/projects/tallinna-korter/07-porandaliist-detail.jpg', cap: 'MPA015 alumiinium põrandaliist — sirge joon, lihtne paigaldus.', likes: '423', comments: '21', tag: '#MPA015' },
  { img: '/assets/products/ASPL35_1.jpg',                             cap: 'ASPL35 — 35 mm põranda LED varjuprofiil, 2,6 m standard.', likes: '189', comments: '7',  tag: '#ASPL35' },
  { img: '/assets/products/ASP904_4.webp',                            cap: 'ASP904 LED-profiil — 24 V valgusriba ühildub täielikult.', likes: '358', comments: '15', tag: '#ASP904 #LED' },
  { img: '/assets/projects/eduardi-maja/11-terrass-led.jpg',          cap: 'Terrass — AST50 LED välimine varjuprofiil. Töötab ka aastaringselt.', likes: '342', comments: '18', tag: '#terrass #AST50' },
];

export default async function InstagramFeed() {
  const locale = await getLocale();
  const ru = locale === 'ru';

  // Duplicate for seamless loop
  const loop = [...TILES, ...TILES];

  return (
    <section style={{ borderBottom: 'var(--border)', background: 'var(--paper)' }}>
      {/* Header */}
      <div style={{ padding: '64px 56px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
            {ru ? '06 / Соцсети' : '06 / Sotsiaalmeedia'}
          </div>
          <h2 className="vp-display" style={{ fontSize: 64, margin: 0, lineHeight: 0.95 }}>
            @varjuprofiilid.ee
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 520, marginTop: 14 }}>
            {ru
              ? 'Следите за нами в Instagram — вдохновение и последние тренды.'
              : 'Jälgi meid Instagrammis, saa inspiratsiooni ja ole alati kursis viimaste suundadega.'}
          </p>
        </div>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="vp-btn vp-btn--ghost" style={{ alignSelf: 'flex-end' }}>
          {ru ? 'Подписаться в Instagram →' : 'Jälgi Instagramis →'}
        </a>
      </div>

      {/* Running feed */}
      <div className="vp-ig-viewport" style={{ paddingBottom: 64 }}>
        <div className="vp-ig-track">
          {loop.map((tile, i) => (
            <a key={i} href={site.instagram} target="_blank" rel="noopener noreferrer" className="vp-ig-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tile.img} alt={tile.cap} loading="lazy" />
              <span className="vp-ig-corner" />
              <div className="vp-ig-tile-meta">
                <div className="vp-ig-tile-caption">{tile.cap}</div>
                <div className="vp-ig-tile-stats">
                  <span>♥ {tile.likes}</span>
                  <span>◷ {tile.comments}</span>
                  <span style={{ marginLeft: 'auto', opacity: 0.7 }}>{tile.tag}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
