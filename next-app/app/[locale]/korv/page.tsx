'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useCart } from '@/lib/cart';
import { site } from '@/lib/site';

export default function CartPage() {
  const locale = useLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';
  const { items, subtotal, shipping, total, removeItem, updateQty } = useCart();

  const fmt = (n: number) => n.toFixed(2).replace('.', ',');

  return (
    <div>
      <section style={{ padding: '48px 56px 24px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          {ru ? '1. Корзина → 2. Данные → 3. Доставка → 4. Оплата' : '1. Korv → 2. Andmed → 3. Tarne → 4. Maksmine'}
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: 0 }}>
          {ru ? 'Ваша корзина' : 'Sinu korv'} ({items.length})
        </h1>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr' }}>
        {/* Items */}
        <div style={{ borderRight: 'var(--border)' }}>
          {items.length === 0 ? (
            <div style={{ padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
              <div className="vp-display" style={{ fontSize: 64, color: 'var(--muted)' }}>∅</div>
              <div className="vp-mono" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>
                {ru ? 'Корзина пуста' : 'Korv on tühi'}
              </div>
              <Link href={`${pfx}/tooted`} className="vp-btn">{ru ? 'Смотреть товары →' : 'Vaata tooteid →'}</Link>
            </div>
          ) : (
            <>
              {items.map((item) => {
                const lineTotal = item.pricePerM * item.qty * item.pieceLengthM;
                return (
                  <div key={item.sku + item.color + (item.ralCode ?? '')} style={{ display: 'grid', gridTemplateColumns: '130px 1fr auto', gap: 24, padding: '28px 40px', borderBottom: 'var(--border)', alignItems: 'center' }}>
                    <div className="vp-photo" style={{ aspectRatio: '1', border: 'var(--border)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/assets/products/${item.sku.toUpperCase()}_1.jpg`} alt={item.sku} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      <span className="label" style={{ fontSize: 9 }}>{item.sku.toLowerCase()}</span>
                    </div>
                    <div>
                      <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>{item.sku}</div>
                      <div className="vp-display" style={{ fontSize: 28, marginBottom: 4 }}>{item.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>
                        {item.color}{item.ralCode ? ` · RAL ${item.ralCode}` : ''} · {(item.pieceLengthM * 1000).toFixed(0)} mm
                      </div>
                      <div style={{ display: 'flex', gap: 14, marginTop: 14, alignItems: 'center' }}>
                        <div className="vp-stepper" style={{ height: 36 }}>
                          <button style={{ width: 36, height: 34 }} onClick={() => updateQty(item.sku, item.color, item.qty - 1)}>−</button>
                          <input value={item.qty} onChange={(e) => updateQty(item.sku, item.color, parseInt(e.target.value) || 1)} style={{ width: 48, height: 34 }} />
                          <button style={{ width: 36, height: 34 }} onClick={() => updateQty(item.sku, item.color, item.qty + 1)}>+</button>
                        </div>
                        <button onClick={() => removeItem(item.sku, item.color)} className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', background: 'none', border: 'none', borderBottom: '1px solid var(--ink)', cursor: 'pointer', padding: 0, color: 'var(--ink)' }}>
                          {ru ? 'Удалить' : 'Eemalda'}
                        </button>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
                        {item.qty} × {fmt(item.pieceLengthM).replace('.', ',')} m × {fmt(item.pricePerM)} €
                      </div>
                      <div className="vp-display" style={{ fontSize: 32 }}>{fmt(lineTotal)}&nbsp;€</div>
                    </div>
                  </div>
                );
              })}
              <div style={{ padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href={`${pfx}/tooted`} className="vp-mono" style={{ fontSize: 12, textTransform: 'uppercase', borderBottom: 'var(--border)' }}>
                  {ru ? '← Продолжить покупки' : '← Jätka ostlemist'}
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Summary */}
        <aside style={{ padding: '40px', background: 'var(--paper-2)', position: 'sticky', top: 60, alignSelf: 'start' }}>
          <h2 className="vp-display" style={{ fontSize: 42, margin: '0 0 22px' }}>{ru ? 'Сводка' : 'Kokkuvõte'}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{ru ? 'Товары' : 'Tooted'}</span>
              <span>{fmt(subtotal)} €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{ru ? 'Доставка (Venipak)' : 'Tarne (Venipak)'}</span>
              <span>{shipping === 0 ? (ru ? 'Бесплатно' : 'Tasuta') : `${fmt(shipping)} €`}</span>
            </div>
            {subtotal > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: 12 }}>
                <span>{ru ? 'в т.ч. НДС 24%' : 'sh. käibemaks 24%'}</span>
                <span>{fmt(total * 0.24 / 1.24)} €</span>
              </div>
            )}
          </div>
          <hr className="vp-divider" style={{ margin: '18px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <span className="vp-eyebrow">{ru ? 'Итого' : 'Kokku'}</span>
            <span className="vp-display" style={{ fontSize: 48 }}>{fmt(total)}&nbsp;€</span>
          </div>
          <Link
            href={items.length > 0 ? `${pfx}/tellimus` : '#'}
            className="vp-btn vp-btn--lg vp-btn--block"
            style={{ marginBottom: 10, display: 'flex', justifyContent: 'center', opacity: items.length === 0 ? 0.4 : 1, pointerEvents: items.length === 0 ? 'none' : 'auto' }}
          >
            {ru ? 'Оформить заказ →' : 'Vormista tellimus →'}
          </Link>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', fontSize: 10, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-2)', marginTop: 14, padding: '12px 0', borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
            <span>{ru ? '✓ Бесплатно от 200 €' : '✓ Tasuta tarne 200 €+'}</span>
            <span>{ru ? '✓ Возврат 14 дней' : '✓ 14 päeva tagastus'}</span>
            <span>{ru ? '✓ Гарантия 5 лет' : '✓ Garantii 5 a'}</span>
          </div>
          <div style={{ marginTop: 14, padding: '12px 14px', border: '1.5px dashed rgba(0,0,0,0.2)', fontSize: 12, lineHeight: 1.55, color: 'var(--ink-2)' }}>
            <strong>{ru ? 'Оплата:' : 'Maksmine:'}</strong>{' '}
            {ru ? 'На сайте автоматическая оплата картой не доступна. Отправим счёт в течение 24 ч — оплатите SEPA-переводом.' : 'Kodulehel automaatset kaardimakset ei paku. Saadame sulle 24 h jooksul e-arve — tasud SEPA ülekandega.'}
          </div>
          <div style={{ marginTop: 14, fontSize: 12, lineHeight: 1.6, color: 'var(--ink-2)' }}>
            <strong>{ru ? 'Нужна консультация?' : 'Vajad nõu?'}</strong>{' '}
            <a href={site.emailUrl} style={{ color: 'inherit', borderBottom: '1px solid currentColor' }}>{site.email}</a>
            {' '}{ru ? 'или' : 'või'}{' '}
            <a href={site.phoneUrl} style={{ color: 'inherit', borderBottom: '1px solid currentColor' }}>{site.phone}</a>
          </div>
        </aside>
      </section>
    </div>
  );
}
