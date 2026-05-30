import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import { products } from '@/lib/catalog';

export default async function Hero() {
  const locale = await getLocale();
  const t = useTranslations;
  const ru = locale === 'ru';
  const inStock = products.filter((p) => p.inStock).length;

  const stats = [
    { n: String(inStock),  l: ru ? 'Товаров на складе'              : 'Toodet laos'           },
    { n: '200 €+',         l: ru ? 'Бесплатная доставка по Эстонии' : 'Tasuta tarne Eestis'   },
    { n: '∞',              l: ru ? 'Оттенков RAL'                   : 'RAL värvitoone'         },
    { n: ru ? '14 дн.' : '14 p', l: ru ? 'Право возврата'          : 'Tagastusõigus'          },
  ];

  const catalogHref = ru ? '/ru/tooted' : '/tooted';

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 60px)',
        minHeight: 640,
        maxHeight: 920,
        overflow: 'hidden',
        borderBottom: 'var(--border)',
        background: '#0a0a0a',
        color: '#fff',
      }}
    >
      {/* Hero video — served from public/assets/hero.mp4 */}
      <video
        src="/assets/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.55) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 40%, transparent 60%)' }} />

      {/* Top eyebrow row */}
      <div style={{
        position: 'absolute', top: 32, left: 56, right: 56, zIndex: 3,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
        textTransform: 'uppercase', letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.85)',
      }}>
        <span>{ru ? '★ Коллекция 026 — Весна 2026' : '★ Kollektsioon 026 — Kevad 2026'}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5544', display: 'inline-block', boxShadow: '0 0 8px rgba(255,85,68,0.7)' }} />
          Live · {inStock} {ru ? 'товаров на складе' : 'toodet laos'}
        </span>
      </div>

      {/* Headline + CTA */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '100px 56px 140px',
      }}>
        <h1 className="vp-display" style={{
          fontSize: 'clamp(64px, 9vw, 160px)',
          margin: 0, lineHeight: 0.92, color: '#fff',
          maxWidth: '14ch', textShadow: '0 2px 40px rgba(0,0,0,0.3)',
        }}>
          {ru ? 'Профили,' : 'Profiilid,'}<br />
          <span style={{
            fontFamily: "'Inter', serif", fontStyle: 'italic',
            fontWeight: 300, fontSize: '0.62em', letterSpacing: '-0.02em',
            display: 'inline-block', transform: 'translateY(-0.05em)',
          }}>
            {ru ? 'которые исчезают' : 'mis kaovad'}
          </span><br />
          {ru ? 'в стене.' : 'seinte sisse.'}
        </h1>

        <p style={{
          maxWidth: 480, fontSize: 17, lineHeight: 1.55,
          marginTop: 28, color: 'rgba(255,255,255,0.85)',
          textShadow: '0 1px 12px rgba(0,0,0,0.4)',
        }}>
          {ru
            ? 'Эстонский магазин алюминиевых теневых профилей. LED и декоративные модели для потолка, стены, пола. Окраска RAL, прямо со склада.'
            : 'Eesti alumiinium varjuprofiilide pood. LED-iga ja dekoratiivsed mudelid laele, seinale, põrandale. RAL-värvitud, saadaval otse laost.'}
        </p>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 32 }}>
          <Link
            href={catalogHref}
            className="vp-btn vp-btn--lg"
            style={{ background: '#fff', color: '#000', borderColor: '#fff' }}
          >
            {ru ? 'Открыть каталог →' : 'Avasta tooted →'}
          </Link>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid rgba(255,255,255,0.18)',
        background: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: '#fff',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: '22px 28px',
            borderRight: i < 3 ? '1px solid rgba(255,255,255,0.18)' : 'none',
            display: 'flex', alignItems: 'baseline', gap: 14,
            justifyContent: 'space-between',
          }}>
            <div className="vp-display" style={{ fontSize: 42, lineHeight: 1, color: '#fff' }}>{s.n}</div>
            <div className="vp-mono" style={{
              fontSize: 11, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', textAlign: 'right',
            }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
