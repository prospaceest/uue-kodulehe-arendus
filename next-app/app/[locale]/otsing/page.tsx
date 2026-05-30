'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { products } from '@/lib/catalog';
import ProductCard from '@/components/catalog/ProductCard';

const POPULAR_ET = ['LED', 'lae', 'põrand', 'sein', 'must', 'AST22', 'ASP102', 'LHV10', 'RAL', 'pahteldatav'];
const POPULAR_RU = ['LED', 'потолок', 'пол', 'стена', 'чёрный', 'AST22', 'ASP102', 'LHV10', 'RAL', 'скрытый'];

export default function SearchPage() {
  const locale = useLocale();
  const ru = locale === 'ru';
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.trim().toLowerCase();
    const seen = new Set<string>();
    return products.filter((p) => {
      if (seen.has(p.sku)) return false;
      const hay = [p.sku, p.name, p.collection, p.description, p.seoName,
                   ru ? p.descriptionRu : '', ru ? p.seoNameRu : ''].join(' ').toLowerCase();
      if (!hay.includes(needle)) return false;
      seen.add(p.sku);
      return true;
    }).slice(0, 24);
  }, [q, ru]);

  const tags = ru ? POPULAR_RU : POPULAR_ET;

  return (
    <div>
      <section style={{ padding: '56px 56px 32px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{ru ? 'Поиск' : 'Otsing'}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
          <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: 0, lineHeight: 0.95 }}>
            {q ? `"${q}"` : (ru ? 'Найти товары.' : 'Otsi tooteid.')}
          </h1>
          {q && <span className="vp-mono" style={{ fontSize: 14, color: 'var(--muted)' }}>{results.length} {ru ? 'результатов' : 'tulemust'}</span>}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 24, maxWidth: 560 }}>
          <input
            className="vp-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={ru ? 'Поиск: SKU, название, ключевое слово...' : 'Otsi: SKU, nimi, märksõna...'}
            autoFocus
          />
          <button className="vp-btn" type="button">{ru ? 'Найти →' : 'Otsi →'}</button>
        </div>
      </section>

      <section style={{ padding: '40px 56px', borderBottom: 'var(--border)' }}>
        {!q.trim() ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {ru ? 'Введите поисковый запрос выше' : 'Sisesta otsingsõna ülalt'}
          </div>
        ) : results.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--muted)' }}>
            <div className="vp-display" style={{ fontSize: 36, marginBottom: 10, color: 'var(--ink)' }}>{ru ? 'Результатов не найдено' : 'Tulemusi ei leitud'}</div>
            <p style={{ fontSize: 14 }}>{ru ? "Попробуйте другое слово, например SKU (AST50, ASP102) или ключевое слово ('LED', 'пол', 'потолок')." : "Proovi teist sõna, näiteks SKU-d (AST50, ASP102) või märksõna ('LED', 'põrand', 'lae')."}</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {results.map((p) => <ProductCard key={p.sku} product={p} locale={locale} />)}
          </div>
        )}
      </section>

      <section style={{ padding: '48px 56px', background: 'var(--paper-2)', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Популярные запросы' : 'Populaarsed otsingud'}</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {tags.map((t) => (
            <button key={t} className="vp-chip" onClick={() => setQ(t)}>{t}</button>
          ))}
        </div>
      </section>
    </div>
  );
}
