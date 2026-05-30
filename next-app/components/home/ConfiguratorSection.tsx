'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { products } from '@/lib/catalog';

const TOP10_SKUS = ['AST22', 'AST14_12', 'RST14', 'AST30', 'AST50', 'ASPL35', 'ASP112', 'ASP904', 'ASP60', 'ASP198'];

function Configurator() {
  const locale = useLocale();
  const t = useTranslations('home.configurator');
  const ru = locale === 'ru';

  const [meters, setMeters] = useState(34);
  const [type, setType] = useState<'lae' | 'porand'>('lae');

  const profileLength = type === 'lae' ? 2.5 : 2.6;
  const pieces = Math.ceil(meters / profileLength);
  const totalLength = pieces * profileLength;

  const catalogHref = ru
    ? `/ru/tooted/${type === 'lae' ? 'laeprofiilid' : 'porandaprofiilid'}`
    : `/tooted/${type === 'lae' ? 'laeprofiilid' : 'porandaprofiilid'}`;

  return (
    <div style={{ padding: '56px 48px', borderRight: 'var(--border)', background: 'var(--paper)' }}>
      <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{t('eyebrow')}</div>
      <h2 className="vp-display" style={{ fontSize: 56, margin: 0 }}>{t('title')}</h2>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 380, margin: '14px 0 28px' }}>
        {t('desc')}
      </p>

      {/* Meters input */}
      <div style={{ marginBottom: 14 }}>
        <label className="vp-eyebrow" style={{ display: 'block', marginBottom: 8 }}>{t('fieldMeters')}</label>
        <input
          className="vp-input"
          type="number"
          min={1}
          value={meters}
          onChange={(e) => setMeters(parseFloat(e.target.value) || 0)}
        />
      </div>

      {/* Type selector */}
      <div style={{ marginBottom: 18 }}>
        <label className="vp-eyebrow" style={{ display: 'block', marginBottom: 8 }}>{t('fieldType')}</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button
            onClick={() => setType('lae')}
            className={`vp-btn${type !== 'lae' ? ' vp-btn--ghost' : ''}`}
            style={{ padding: '14px', fontSize: 12 }}
          >
            {t('typeCeiling')}
          </button>
          <button
            onClick={() => setType('porand')}
            className={`vp-btn${type !== 'porand' ? ' vp-btn--ghost' : ''}`}
            style={{ padding: '14px', fontSize: 12 }}
          >
            {t('typeFloor')}
          </button>
        </div>
      </div>

      {/* Result box */}
      <div style={{ padding: '18px 20px', border: 'var(--border)', background: 'var(--paper-2)', marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6, color: 'var(--ink-2)' }}>
          <span>{meters} m ÷ {profileLength.toString().replace('.', ',')} m</span>
          <span className="vp-mono" style={{ color: 'var(--muted)' }}>
            {(meters / profileLength).toFixed(2)} → ↑
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 10, marginTop: 8 }}>
          <div>
            <div className="vp-display" style={{ fontSize: 48, lineHeight: 1 }}>{pieces}</div>
            <div className="vp-eyebrow" style={{ marginTop: 4 }}>{t('pieces')}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
              {t('totalLength', { len: totalLength.toFixed(1).replace('.', ',') })}
            </div>
          </div>
        </div>
      </div>

      <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.5 }}>
        {t('note')}
      </div>

      <Link href={catalogHref} className="vp-btn">
        {type === 'lae' ? t('ctaCeiling') : t('ctaFloor')}
      </Link>
    </div>
  );
}

function Top10Thumb({ sku, rank }: { sku: string; rank: number }) {
  const s = sku.toUpperCase();
  // Try multiple candidate paths in order
  const candidates = [
    `/assets/products/${s}_1.jpg`,
    `/assets/products/${s}_1.webp`,
    `/assets/products/${s}_4.webp`,
    `/assets/products/${s}.jpg`,
    `/assets/products/${s}_1.png`,
    `/assets/products/${s} h%C3%B5be.jpg`,  // "hõbe" URL-encoded
  ];
  const [idx, setIdx] = useState(0);
  const allFailed = idx >= candidates.length;

  return (
    <div style={{ width: 64, height: 64, flexShrink: 0, border: '1px solid var(--ink)', position: 'relative', overflow: 'hidden', background: 'var(--paper-2)' }}>
      {!allFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={candidates[idx]}
          alt={sku}
          onError={() => setIdx((i) => i + 1)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      ) : (
        <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase' }}>
          {String(rank).padStart(2, '0')}
        </span>
      )}
    </div>
  );
}

function Bestsellers() {
  const locale = useLocale();
  const ru = locale === 'ru';

  const top10 = TOP10_SKUS.map((key) =>
    products.find((p) => p.sku === key || p.name === key)
  ).filter(Boolean);

  return (
    <div style={{ padding: '56px 48px', background: 'var(--paper-2)' }}>
      <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
        {ru ? '04 / Хиты продаж' : '04 / Enimmüüdud'}
      </div>
      <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 24px' }}>
        {ru ? 'Топ-10' : 'Top 10'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {top10.map((prod, i) => {
          if (!prod) return null;
          const href = ru ? `/ru${prod.urlPathRu}` : prod.urlPath;
          const priceStr = prod.price ? prod.price.toFixed(2).replace('.', ',') : '—';

          return (
            <Link
              key={prod.sku}
              href={href}
              style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.1)', textDecoration: 'none', color: 'inherit' }}
            >
              <Top10Thumb sku={prod.sku} rank={i + 1} />
              <div style={{ flex: 1 }}>
                <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{prod.sku}</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{priceStr} €/m</div>
              </div>
              <span style={{ fontSize: 18 }}>→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function ConfiguratorSection() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)' }}>
      <Configurator />
      <Bestsellers />
    </section>
  );
}
