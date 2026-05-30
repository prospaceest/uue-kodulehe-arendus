'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/catalog';
import { getProductImagePath } from '@/lib/productImages';

const TOP10_SKUS = ['AST22', 'AST14_12', 'RST14', 'AST30', 'AST50', 'ASPL35', 'ASP112', 'ASP904', 'ASP60', 'ASP198'];
const TOP10_RANK: Record<string, number> = Object.fromEntries(TOP10_SKUS.map((s, i) => [s, i + 1]));

type Props = { product: Product; locale: string };

export default function ProductCard({ product: p, locale }: Props) {
  const imgSrc = getProductImagePath(p.sku);
  const [imgFailed, setImgFailed] = useState(false);
  const topRank = TOP10_RANK[p.sku];
  const ru = locale === 'ru';

  const href = ru ? `/ru${p.urlPathRu}` : p.urlPath;
  const label = ru ? p.seoNameRu : p.seoName;

  return (
    <Link
      href={href}
      style={{ border: 'var(--border)', display: 'block', position: 'relative', background: 'var(--paper)', textDecoration: 'none', color: 'inherit' }}
    >
      {/* Image */}
      <div className="vp-photo" style={{ aspectRatio: '1', borderBottom: 'var(--border)', position: 'relative' }}>
        {imgSrc && !imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt={`${p.sku} – ${label}`}
            onError={() => setImgFailed(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        ) : (
          <span className="label">{p.sku.toLowerCase()}</span>
        )}

        {/* Badges — top left */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 3 }}>
          {topRank && (
            <span style={{ background: 'var(--ink)', color: 'var(--paper)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 10, padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              ★ TOP
            </span>
          )}
          {p.ledCompatible && (
            <span style={{ background: '#F4B400', color: '#3a2400', border: '1.5px solid #3a2400', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 10, padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              ⚡ LED
            </span>
          )}
        </div>

        {/* Ribbon — top right */}
        {p.ribbon && (
          <span style={{ position: 'absolute', top: 10, right: 10, background: 'var(--paper)', border: 'var(--border)', fontFamily: 'JetBrains Mono', fontSize: 10, padding: '4px 8px', textTransform: 'uppercase', zIndex: 3 }}>
            {p.ribbon}
          </span>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span className="vp-mono" style={{ fontSize: 12, fontWeight: 500 }}>{p.sku}</span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>
            {p.price.toFixed(2).replace('.', ',')} {ru ? '€/пог.м' : '€/m'}
          </span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>{label}</div>

        {/* Color dots */}
        {p.colors.length > 0 && (
          <div style={{ display: 'flex', gap: 5, marginTop: 10, alignItems: 'center' }}>
            {p.colors.map((c) => (
              <span
                key={c.hex}
                title={c.name}
                style={{ width: 14, height: 14, borderRadius: '50%', background: c.hex, border: '1px solid var(--ink)', flexShrink: 0 }}
              />
            ))}
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)', marginLeft: 4 }}>
              + RAL
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
