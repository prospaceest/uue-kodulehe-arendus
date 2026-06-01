'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import ProductCard from './ProductCard';
import type { Product, Category } from '@/lib/catalog';

const CAT_RU: Record<string, string> = {
  Laeprofiilid: 'Потолочные',
  Põrandaprofiilid: 'Напольные',
  Põrandaliistud: 'Плинтусы',
  'Seina peiteprofiilid': 'Настенные скрытые',
  Kardinaprofiilid: 'Карнизные',
  Lisatarvikud: 'Аксессуары',
  Nurgaprofiilid: 'Угловые',
  'Muud tooted': 'Прочие товары',
};

const COLOR_CHOICES = [
  { hex: '#D4D4D4', nameEt: 'Hõbe',   nameRu: 'Серебро' },
  { hex: '#000000', nameEt: 'Must',    nameRu: 'Чёрный' },
  { hex: '#FFFFFF', nameEt: 'Valge',   nameRu: 'Белый' },
];

type Props = {
  products: Product[];
  categories: Category[];
  initialCat?: string;
};

type LedFilter = 'all' | 'led' | 'no-led';
type SortKey = 'popular' | 'price-asc' | 'price-desc';

export default function CatalogClient({ products, categories, initialCat }: Props) {
  const locale = useLocale();
  const ru = locale === 'ru';

  const [activeCat, setActiveCat] = useState<string | null>(initialCat ?? null);
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [ledFilter, setLedFilter] = useState<LedFilter>('all');
  const [maxPrice, setMaxPrice] = useState(50);
  const [sort, setSort] = useState<SortKey>('popular');

  function catLabel(name: string) {
    return ru && CAT_RU[name] ? CAT_RU[name] : name;
  }

  function toggleColor(hex: string) {
    setActiveColors((prev) =>
      prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]
    );
  }

  function clearAll() {
    setActiveCat(null);
    setActiveColors([]);
    setLedFilter('all');
    setMaxPrice(50);
    setSort('popular');
  }

  const filtered = useMemo(() => {
    const seen = new Set<string>();
    let items = products.filter((p) => {
      if (activeCat && !p.collection.split(';').map((s) => s.trim()).includes(activeCat)) return false;
      if (ledFilter === 'led' && !p.ledCompatible) return false;
      if (ledFilter === 'no-led' && p.ledCompatible) return false;
      if (p.price > maxPrice) return false;
      if (activeColors.length > 0) {
        const hexes = p.colors.map((c) => c.hex.toUpperCase());
        if (!activeColors.some((h) => hexes.includes(h.toUpperCase()))) return false;
      }
      if (seen.has(p.sku)) return false;
      seen.add(p.sku);
      return true;
    });
    if (sort === 'price-asc')  items = [...items].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [products, activeCat, activeColors, ledFilter, maxPrice, sort]);

  const activeFilterCount =
    (activeCat ? 1 : 0) +
    activeColors.length +
    (ledFilter !== 'all' ? 1 : 0) +
    (maxPrice < 50 ? 1 : 0);

  const pageTitle = activeCat ? catLabel(activeCat) : (ru ? 'Все товары.' : 'Kõik tooted.');

  return (
    <div>
      {/* Page header */}
      <section style={{ padding: '48px 56px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          <Link href={ru ? '/ru' : '/'}>{ru ? 'Главная' : 'Avaleht'}</Link>
          {' / '}
          <Link href={ru ? '/ru/tooted' : '/tooted'}>{ru ? 'Магазин' : 'Pood'}</Link>
          {activeCat && <> / <span style={{ color: 'var(--ink)' }}>{catLabel(activeCat)}</span></>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32 }}>
          <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 7vw, 112px)', margin: 0 }}>
            {pageTitle}
          </h1>
          <p style={{ maxWidth: 380, fontSize: 15, color: 'var(--ink-2)', textAlign: 'right' }}>
            <span className="vp-mono" style={{ fontSize: 12 }}>{products.length} SKU</span>
          </p>
        </div>
      </section>

      {/* Sidebar + grid */}
      <section style={{ display: 'grid', gridTemplateColumns: '260px 1fr' }}>
        {/* Sidebar */}
        <aside className="vp-catalog-sidebar" style={{ padding: '28px 24px', borderRight: 'var(--border)', position: 'sticky', top: 60, alignSelf: 'start', maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 18, display: 'flex', justifyContent: 'space-between' }}>
            <span>{ru ? 'Фильтры' : 'Filtrid'}</span>
            <span>{activeFilterCount} {ru ? 'активных' : 'aktiivset'}</span>
          </div>

          {/* Category filter */}
          <div style={{ marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{ru ? 'Категория' : 'Kategooria'}</div>
            <CheckRow
              checked={!activeCat}
              onClick={() => setActiveCat(null)}
              label={`${ru ? 'Все' : 'Kõik'} (${products.length})`}
            />
            {categories.map((c) => (
              <CheckRow
                key={c.name}
                checked={activeCat === c.name}
                onClick={() => setActiveCat(activeCat === c.name ? null : c.name)}
                label={`${catLabel(c.name)} (${c.count})`}
              />
            ))}
          </div>

          {/* LED filter */}
          <div style={{ marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{ru ? 'LED-готовность' : 'LED-valmidus'}</div>
            {([
              { k: 'all',    l: ru ? 'Все'       : 'Kõik'      },
              { k: 'led',    l: ru ? '⚡ С LED'   : '⚡ LED-iga' },
              { k: 'no-led', l: ru ? 'Без LED'   : 'Ilma LED'  },
            ] as { k: LedFilter; l: string }[]).map((opt) => (
              <RadioRow
                key={opt.k}
                checked={ledFilter === opt.k}
                onClick={() => setLedFilter(opt.k)}
                label={opt.l}
              />
            ))}
          </div>

          {/* Color filter */}
          <div style={{ marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{ru ? 'Цвет' : 'Värvus'}</div>
            {COLOR_CHOICES.map((c) => (
              <CheckRow
                key={c.hex}
                checked={activeColors.includes(c.hex)}
                onClick={() => toggleColor(c.hex)}
                label={ru ? c.nameRu : c.nameEt}
                swatch={c.hex}
              />
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--muted)' }}>
              <span style={{ width: 16, height: 16, border: 'var(--border)' }} />
              {ru ? 'RAL под заказ' : 'RAL eritellimus'}
            </div>
          </div>

          {/* Price filter */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
              {ru ? 'Цена (€/пог.м)' : 'Hind (€/m)'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--muted)', marginBottom: 6 }}>
              <span>0 €</span><span>{maxPrice} €</span>
            </div>
            <input
              type="range" min={0} max={50} step={1} value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </aside>

        {/* Product grid */}
        <div style={{ padding: '24px 32px' }}>
          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {activeCat && (
                <button className="vp-chip vp-chip--active" onClick={() => setActiveCat(null)}>
                  {catLabel(activeCat)} ✕
                </button>
              )}
              {ledFilter !== 'all' && (
                <button className="vp-chip vp-chip--active" onClick={() => setLedFilter('all')}>
                  {ledFilter === 'led' ? (ru ? '⚡ С LED' : '⚡ LED-iga') : (ru ? 'Без LED' : 'Ilma LED')} ✕
                </button>
              )}
              {activeColors.map((hex) => (
                <button key={hex} className="vp-chip vp-chip--active" onClick={() => toggleColor(hex)}>
                  {COLOR_CHOICES.find((c) => c.hex === hex)?.[ru ? 'nameRu' : 'nameEt']} ✕
                </button>
              ))}
              {activeFilterCount > 0 && (
                <button onClick={clearAll} style={{ fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', background: 'none', border: 'none', borderBottom: '1px solid var(--ink)', cursor: 'pointer', padding: 0 }}>
                  {ru ? 'Очистить все' : 'Tühjenda kõik'}
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontFamily: 'JetBrains Mono', fontSize: 12 }}>
              <span style={{ color: 'var(--muted)' }}>
                {filtered.length} {ru ? 'товаров' : 'toodet'}
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                style={{ border: 'var(--border)', background: 'var(--paper)', padding: '6px 10px', fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--ink)', cursor: 'pointer' }}
              >
                <option value="popular">{ru ? 'Популярные' : 'Populaarsed'}</option>
                <option value="price-asc">{ru ? 'Цена ↑' : 'Hind ↑'}</option>
                <option value="price-desc">{ru ? 'Цена ↓' : 'Hind ↓'}</option>
              </select>
            </div>
          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {filtered.map((p) => (
                <ProductCard key={p.sku} product={p} locale={locale} />
              ))}
            </div>
          ) : (
            <div style={{ padding: 80, textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono' }}>
              {ru ? 'По этим фильтрам товаров не найдено.' : 'Selle filtriga tooteid ei leitud.'}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ----------------------------------------------------------------
// Small helper components
// ----------------------------------------------------------------

function CheckRow({ checked, onClick, label, swatch }: { checked: boolean; onClick: () => void; label: string; swatch?: string }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, marginBottom: 6, cursor: 'pointer', color: 'var(--ink-2)' }} onClick={onClick}>
      <span style={{ width: 16, height: 16, border: 'var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: checked ? 'var(--ink)' : 'transparent', color: 'var(--paper)', fontSize: 10, flexShrink: 0 }}>
        {checked ? '✓' : ''}
      </span>
      {swatch && <span style={{ width: 14, height: 14, borderRadius: '50%', background: swatch, border: '1px solid var(--ink)', flexShrink: 0 }} />}
      {label}
    </label>
  );
}

function RadioRow({ checked, onClick, label }: { checked: boolean; onClick: () => void; label: string }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, marginBottom: 6, cursor: 'pointer', color: 'var(--ink-2)' }} onClick={onClick}>
      <span style={{ width: 16, height: 16, border: 'var(--border)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {checked && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ink)' }} />}
      </span>
      {label}
    </label>
  );
}
