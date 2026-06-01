'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/catalog';
import { getProductImages, getProductImagePath } from '@/lib/productImages';

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

const FAQ_ET = [
  ['Kas seda profiili saab pahteldada?', 'Pahteldatav variant on LHV-seerias. See toode on pinnapaigaldus — paigaldatav nähtava servaga.'],
  ['Kas saab tellida eritellimuse pikkust?', 'Ei — me ei lõika profiile. Pakume standardpikkuses (2,5 m laeprofiile ja 2,6 m põrandaprofiile).'],
  ['Milline värv on tarneaeg?', 'Must ja valge — enamasti laos, 2–4 tööpäeva. RAL eritoonid 4–5 nädalat (pulbervärvitus).'],
  ['Milline garantii?', '5 aastat tootmisdefektide, korrosiooni ja värvituhmumise vastu sisetingimustes.'],
];

const FAQ_RU = [
  ['Можно ли шпаклевать этот профиль?', 'Прошпаклёвываемый вариант — в серии LHV. Этот товар — для видимого монтажа с открытой кромкой.'],
  ['Можно ли заказать нестандартную длину?', 'Нет — мы не режем профили. Предлагаем стандартные длины (2,5 м потолочные, 2,6 м напольные).'],
  ['Какой срок поставки по цветам?', 'Чёрный и белый — обычно на складе, 2–4 рабочих дня. RAL под заказ — 4–5 недель.'],
  ['Какая гарантия?', '5 лет на дефекты производства, коррозию и выцветание покрытия в сухих помещениях.'],
];

type Props = {
  product: Product;
  related: Product[];
  locale: string;
};

export default function ProductClient({ product, related, locale }: Props) {
  const ru = locale === 'ru';
  const cat = product.collection.split(';')[0].trim();
  const { addItem } = useCart();
  const router = useRouter();

  // Derive piece length from spec or category
  const pieceLength = (() => {
    const raw = product.specs.find((s) => s.k === 'Pikkus')?.v ?? '';
    const mm = raw.match(/([\d.,]+)\s*mm/i);
    if (mm) return parseFloat(mm[1].replace(',', '.')) / 1000;
    const m = raw.match(/([\d.,]+)\s*m\b/i);
    if (m) return parseFloat(m[1].replace(',', '.'));
    return cat.startsWith('Põranda') ? 2.6 : 2.5;
  })();

  const [color, setColor] = useState(product.colors[0]?.hex ?? '#000000');
  const [ralCode, setRalCode] = useState('');
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'specs' | 'faq'>('specs');
  const [mainImg, setMainImg] = useState(0);
  const [imgFailed, setImgFailed] = useState<Record<number, boolean>>({});
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    setColor(product.colors[0]?.hex ?? '#000000');
    setRalCode('');
    setMainImg(0);
    setImgFailed({});
  }, [product.sku]);

  const isRal = color === 'RAL';

  const activePrice = (() => {
    if (isRal && product.ralPrice != null) return product.ralPrice;
    const sel = product.colors.find((c) => c.hex === color);
    return sel?.price ?? product.price;
  })();

  const totalMeters = +(qty * pieceLength).toFixed(2);
  const total = (activePrice * totalMeters).toFixed(2).replace('.', ',');

  const fmt = (n: number) =>
    (Number.isInteger(n) ? n.toString() : n.toFixed(2).replace(/\.?0+$/, '')).replace('.', ',');

  const hasMill = product.colors.some((c) => c.name === 'Töötlemata');
  const hasRal = product.ralPrice != null;
  const millPrice = product.colors.find((c) => c.name === 'Töötlemata')?.price;
  const stdPrices = product.colors.filter((c) => c.name !== 'Töötlemata').map((c) => c.price);
  const stdMax = stdPrices.length ? Math.max(...stdPrices) : product.price;
  const hasPriceRange = hasMill || (hasRal && product.ralPrice! - stdMax > 0.01);

  const catalogHref = ru ? `/ru/tooted` : `/tooted`;
  const catLabel = ru ? CAT_RU[cat] ?? cat : cat;
  const subtitle = ru ? product.seoNameRu : product.seoName;
  const description = ru ? product.descriptionRu : product.description;

  // Image URLs for gallery — resolved from the PRODUCT_IMAGES manifest
  // (same source the catalog cards use), not a naive {SKU}_1.jpg guess.
  const imgSlots = getProductImages(product.sku);
  const validSlots = imgSlots.filter((_, i) => !imgFailed[i]);

  const faqItems = ru ? FAQ_RU : FAQ_ET;

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ padding: '18px 56px', fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>
        <Link href={ru ? '/ru' : '/'}>{ru ? 'Главная' : 'Avaleht'}</Link>
        {' / '}
        <Link href={catalogHref}>{ru ? 'Магазин' : 'Pood'}</Link>
        {' / '}
        <Link href={`${catalogHref}?cat=${encodeURIComponent(cat)}`}>{catLabel}</Link>
        {' / '}
        <span style={{ color: 'var(--ink)' }}>{product.sku}</span>
      </div>

      {/* Main grid */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', borderTop: 'var(--border)' }}>
        {/* Gallery */}
        <div style={{ padding: 24, background: 'var(--paper-2)', borderRight: 'var(--border)' }}>
          {/* Main image */}
          <div style={{ aspectRatio: '1', marginBottom: 10, border: 'var(--border)', overflow: 'hidden', background: 'var(--paper)', position: 'relative' }}>
            {validSlots.length > 0 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imgSlots[mainImg] ?? imgSlots[0]}
                alt={`${product.sku} – ${subtitle}`}
                onError={() => setImgFailed((prev) => ({ ...prev, [mainImg]: true }))}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="eager"
              />
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono', fontSize: 32, color: 'var(--muted)' }}>
                {product.sku.toLowerCase()}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {validSlots.length > 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 16 }}>
              {imgSlots.map((src, i) =>
                imgFailed[i] ? null : (
                  <div
                    key={i}
                    onClick={() => setMainImg(i)}
                    style={{ aspectRatio: '1', border: mainImg === i ? '2px solid var(--accent)' : 'var(--border)', cursor: 'pointer', overflow: 'hidden', background: 'var(--paper)' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" onError={() => setImgFailed((prev) => ({ ...prev, [i]: true }))} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Info column */}
        <div style={{ padding: '40px 48px' }}>
          {/* Eyebrow */}
          <div className="vp-eyebrow" style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span>{catLabel}</span>
            {product.ledCompatible && (
              <span style={{ background: '#F4B400', color: '#3a2400', border: '1.5px solid #3a2400', fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 10, padding: '3px 7px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>⚡ LED</span>
            )}
            {product.ribbon && <span style={{ color: 'var(--accent)' }}>· {product.ribbon}</span>}
          </div>

          <h1 className="vp-display" style={{ fontSize: 96, margin: '0 0 6px', lineHeight: 0.92 }}>{product.sku}</h1>
          <div style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 24, lineHeight: 1.2, color: 'var(--ink-2)', marginBottom: 16 }}>{subtitle}</div>

          {description && (
            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.5, marginTop: 0, marginBottom: 20 }}>{description}</p>
          )}

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8, paddingBottom: 8, flexWrap: 'wrap' }}>
            <span className="vp-display" style={{ fontSize: 56 }}>{activePrice.toFixed(2).replace('.', ',')}&nbsp;€</span>
            <span className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)' }}>
              / {ru ? 'пог.м' : 'jooksev meeter'} · {ru ? 'с НДС' : 'KM-ga'}
            </span>
          </div>

          {hasPriceRange && (
            <div className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--muted)', marginBottom: 24, paddingBottom: 24, borderBottom: 'var(--border)' }}>
              {hasMill && millPrice && `${ru ? 'от' : 'al.'} ${millPrice.toFixed(2).replace('.', ',')} € (${ru ? 'без покрытия' : 'töötlemata'})`}
              {hasMill && hasRal && ' → '}
              {hasRal && product.ralPrice && `${ru ? 'до' : 'kuni'} ${product.ralPrice.toFixed(2).replace('.', ',')} € (${ru ? 'цвет RAL' : 'RAL värv'})`}
              {' · '}{ru ? 'выберите цвет ниже' : 'vali värv allpool'}
            </div>
          )}
          {!hasPriceRange && <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: 'var(--border)' }} />}

          {/* Color selector */}
          {product.colors.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div className="vp-eyebrow" style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                <span>{ru ? 'Цвет' : 'Värvus'}</span>
                <span style={{ color: 'var(--ink)' }}>
                  {isRal
                    ? (ralCode.trim() ? `RAL ${ralCode.trim()}` : (ru ? 'RAL — выберите оттенок' : 'RAL — vali toon'))
                    : (product.colors.find((c) => c.hex === color)?.name ?? '')}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.colors.map((c) => (
                  <button key={c.hex} onClick={() => setColor(c.hex)} className={`vp-swatch${color === c.hex ? ' vp-swatch--active' : ''}`} style={{ background: 'none', border: color === c.hex ? '1.5px solid var(--ink)' : '1.5px solid transparent', cursor: 'pointer' }}>
                    <div className="dot" style={{ background: c.hex }} />
                    <div className="name">{c.name}</div>
                  </button>
                ))}
                <button onClick={() => setColor('RAL')} className={`vp-swatch${isRal ? ' vp-swatch--active' : ''}`} style={{ background: 'none', border: isRal ? '1.5px solid var(--ink)' : '1.5px solid transparent', cursor: 'pointer' }}>
                  <div className="dot" style={{ background: 'conic-gradient(red,yellow,lime,cyan,blue,magenta,red)' }} />
                  <div className="name">RAL+</div>
                </button>
              </div>

              {isRal && (
                <div style={{ marginTop: 14, padding: '14px 16px', border: 'var(--border)', background: 'var(--paper-2)' }}>
                  <label className="vp-eyebrow" style={{ display: 'block', marginBottom: 8 }} htmlFor="ral-input">
                    {ru ? 'Код RAL' : 'RAL kood'}
                  </label>
                  <div style={{ display: 'flex', alignItems: 'stretch', border: 'var(--border)', background: 'var(--paper)' }}>
                    <span className="vp-mono" style={{ padding: '10px 12px', borderRight: 'var(--border)', fontSize: 13, background: 'var(--paper-2)', display: 'flex', alignItems: 'center' }}>RAL</span>
                    <input
                      id="ral-input"
                      value={ralCode}
                      onChange={(e) => setRalCode(e.target.value.replace(/[^0-9 ]/g, '').slice(0, 8))}
                      placeholder={ru ? 'напр. 9005, 7016, 9010' : 'nt 9005, 7016, 9010'}
                      style={{ flex: 1, padding: '10px 12px', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'JetBrains Mono, monospace', fontSize: 14 }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 14, marginTop: 12, fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', color: 'var(--accent)', flexWrap: 'wrap' }}>
                    <span>{ru ? '⏱ Под заказ — поставка ~5 недель' : '⏱ Eritellimus — tarne ~5 nädalat'}</span>
                    <span>{ru ? '✕ Возврат не действует' : '✕ Tagastusõigus ei kehti'}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quantity + total */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, marginBottom: 24 }}>
            <div>
              <div className="vp-eyebrow" style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span>{ru ? 'Количество (шт)' : 'Kogus (tk)'}</span>
                <span style={{ color: 'var(--muted)' }}>1 {ru ? 'шт' : 'tk'} = {fmt(pieceLength)} {ru ? 'м' : 'm'}</span>
              </div>
              <div className="vp-stepper">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <input value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} />
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8, textTransform: 'uppercase' }}>
                {qty > 1 ? `${qty} × ${fmt(pieceLength)} ${ru ? 'м' : 'm'} = ${fmt(totalMeters)} ${ru ? 'м всего' : 'm kokku'}` : `${fmt(pieceLength)} ${ru ? 'м' : 'm'}`}
              </div>
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <div className="vp-eyebrow" style={{ marginBottom: 4 }}>{ru ? 'Итого' : 'Kokku'}</div>
              <div className="vp-display" style={{ fontSize: 36 }}>{total}&nbsp;€</div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <button
              className="vp-btn vp-btn--lg vp-btn--block"
              style={{ flex: 1 }}
              onClick={() => {
                const selectedColor = product.colors.find((c) => c.hex === color);
                addItem({
                  sku: product.sku,
                  name: ru ? product.seoNameRu : product.seoName,
                  color: isRal ? 'RAL' : (selectedColor?.name ?? color),
                  colorHex: isRal ? 'conic-gradient(red,yellow,lime,cyan,blue,magenta,red)' : color,
                  ralCode: isRal ? ralCode : undefined,
                  pieceLengthM: pieceLength,
                  qty,
                  pricePerM: activePrice,
                });
                router.push(ru ? '/ru/korv' : '/korv');
              }}
            >
              {ru ? `В корзину → ${total} €` : `Lisa korvi → ${total} €`}
            </button>
            <button className="vp-btn vp-btn--ghost vp-btn--lg" style={{ padding: '18px 22px' }} aria-label={ru ? 'В избранное' : 'Soovide nimekirja'}>♡</button>
          </div>

          {/* Delivery status */}
          <div style={{ display: 'flex', gap: 18, paddingTop: 18, borderTop: '1px solid rgba(0,0,0,0.1)', fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', color: 'var(--ink-2)', flexWrap: 'wrap' }}>
            {product.inStock && !isRal && <span>{ru ? '✓ На складе' : '✓ Laos'}</span>}
            {isRal
              ? <span style={{ color: 'var(--accent)' }}>{ru ? '⏱ Поставка ~5 недель' : '⏱ Tarne ~5 nädalat'}</span>
              : <span>{ru ? '✓ Доставка 2–4 дня' : '✓ Tarne 2–4 päeva'}</span>}
            {isRal
              ? <span style={{ color: 'var(--accent)' }}>{ru ? '✕ Возврат не действует' : '✕ Tagastusõigus ei kehti'}</span>
              : <span>{ru ? '✓ Возврат 14 дней' : '✓ Tagastus 14 päeva'}</span>}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ borderTop: 'var(--border)' }}>
        <div style={{ display: 'flex', borderBottom: 'var(--border)', flexWrap: 'wrap' }}>
          {(['specs', 'faq'] as const).map((id) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{ padding: '18px 28px', background: tab === id ? 'var(--ink)' : 'var(--paper)', color: tab === id ? 'var(--paper)' : 'var(--ink)', border: 'none', borderRight: 'var(--border)', fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer' }}
            >
              {id === 'specs' ? (ru ? 'Технические данные' : 'Tehnilised andmed') : (ru ? 'Вопросы' : 'Küsimused')}
            </button>
          ))}
        </div>
        <div style={{ padding: '40px 56px' }}>
          {tab === 'specs' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 56px' }}>
              {(product.specs.length > 0 ? product.specs : [{ k: ru ? 'Длина' : 'Pikkus', v: '2500 mm' }]).map(({ k, v }) => (
                <div key={k} className="vp-spec-row">
                  <span className="k">{k}</span>
                  <span style={{ fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          )}
          {tab === 'faq' && (
            <div style={{ maxWidth: 880 }}>
              {faqItems.map(([q, a], i) => (
                <div key={q} onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ padding: '18px 0', borderTop: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 18 }}>
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{q}</span>
                    <span style={{ fontSize: 22, lineHeight: 1, color: faqOpen === i ? 'var(--ink)' : 'var(--muted)' }}>{faqOpen === i ? '−' : '+'}</span>
                  </div>
                  {faqOpen === i && <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', marginTop: 12, paddingRight: 32 }}>{a}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ padding: '72px 56px', background: 'var(--paper-2)', borderTop: 'var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
            <h2 className="vp-display" style={{ fontSize: 48, margin: 0 }}>{ru ? 'Похожие товары' : 'Sarnased tooted'}</h2>
            <Link href={`${catalogHref}?cat=${encodeURIComponent(cat)}`} className="vp-mono" style={{ fontSize: 12, textTransform: 'uppercase', borderBottom: 'var(--border)' }}>
              {ru ? 'Смотреть все →' : 'Vaata kõiki →'}
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {related.map((p) => {
              const href = ru ? `/ru${p.urlPathRu}` : p.urlPath;
              const relImg = getProductImagePath(p.sku);
              return (
                <Link key={p.sku} href={href} style={{ border: 'var(--border)', display: 'block', textDecoration: 'none', color: 'inherit', background: 'var(--paper)' }}>
                  <div className="vp-photo" style={{ aspectRatio: '1', borderBottom: 'var(--border)', position: 'relative' }}>
                    {relImg && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={relImg}
                        alt={p.sku}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                    <span className="label">{p.sku.toLowerCase()}</span>
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <div className="vp-mono" style={{ fontSize: 12 }}>{p.sku}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>{ru ? p.seoNameRu : p.seoName}</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>{p.price.toFixed(2).replace('.', ',')} €/m</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
