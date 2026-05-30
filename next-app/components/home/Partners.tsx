import { getLocale } from 'next-intl/server';

const PARTNERS = [
  { src: '/assets/partners/bildgren.svg',         alt: 'Bildgren',          h: 40 },
  { src: '/assets/partners/diotech-nord.png',     alt: 'Diotech Nord',      h: 56 },
  { src: '/assets/partners/dorpat-ehitus.png',    alt: 'Dorpat Ehitus',     h: 46 },
  { src: '/assets/partners/mapri-ehitus.png',     alt: 'Mapri Ehitus',      h: 84 },
  { src: '/assets/partners/ace-of-space.png',     alt: 'Ace of Space',      h: 96 },
  { src: '/assets/partners/hanset-ehitus.png',    alt: 'Hanset Ehitus',     h: 68 },
  { src: '/assets/partners/krc.png',              alt: 'KRC Ehitus',        h: 64 },
  { src: '/assets/partners/metropoli-ehitus.png', alt: 'Metropoli Ehitus',  h: 36 },
  { src: '/assets/partners/timber-element.png',   alt: 'Timber Element',    h: 72 },
  { src: '/assets/partners/tulevara.png',         alt: 'Tulevara',          h: 44 },
  { src: '/assets/partners/ehitusinsener.png',    alt: 'Ehitusinsener',     h: 32 },
  { src: '/assets/partners/ars-interjoor.png',    alt: 'ARS Interjöör',     h: 36 },
  { src: '/assets/partners/maidisain.png',        alt: 'Maidisain',         h: 36 },
  { src: '/assets/partners/soome-maja.png',       alt: 'Soome Maja',        h: 24 },
];

const COLS = 5;
const ROWS = Math.ceil(PARTNERS.length / COLS);
const TOTAL = COLS * ROWS;

export default async function Partners() {
  const locale = await getLocale();
  const ru = locale === 'ru';

  const cells = [...PARTNERS, ...Array<null>(TOTAL - PARTNERS.length).fill(null)];

  return (
    <section style={{ padding: '48px 48px 56px', borderBottom: 'var(--border)', background: 'var(--paper)' }}>
      <div style={{ marginBottom: 32 }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          {ru ? '08 / Клиенты и партнёры' : '08 / Kliendid ja koostööpartnerid'}
        </div>
        <h3 className="vp-display" style={{ fontSize: 36, margin: 0 }}>
          {ru ? 'Нам доверяют архитекторы и строители Эстонии' : 'Usaldatud eesti arhitektide ja ehitajate poolt'}
        </h3>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        borderTop: '1px solid var(--ink)',
        borderLeft: '1px solid var(--ink)',
      }}>
        {cells.map((p, i) => (
          <div
            key={i}
            style={{
              borderRight: '1px solid var(--ink)',
              borderBottom: '1px solid var(--ink)',
              padding: '32px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 160,
              background: 'var(--paper)',
            }}
          >
            {p ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.src}
                alt={p.alt}
                style={{ height: p.h, width: 'auto', maxWidth: '90%', objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.75 }}
                loading="lazy"
              />
            ) : i === cells.length - 1 ? (
              <span className="vp-mono" style={{ fontSize: 11, color: 'var(--ink-2)', opacity: 0.55, letterSpacing: '0.08em' }}>
                {ru ? '+ И ДРУГИЕ' : '+ JA TEISED'}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
