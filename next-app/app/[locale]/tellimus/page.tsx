'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useCart } from '@/lib/cart';
import { site } from '@/lib/site';
import Link from 'next/link';

type BuyerType = 'eraisik' | 'ettevote';
type DeliveryType = 'venipak' | 'salong';

export default function CheckoutPage() {
  const locale = useLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';
  const { items, subtotal, clear } = useCart();

  const [buyerType, setBuyerType] = useState<BuyerType>('eraisik');
  const [delivery, setDelivery] = useState<DeliveryType>('venipak');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orderNr, setOrderNr] = useState('');
  const [terms, setTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '', regNr: '', kmkr: '', contact: '',
    email: '', phone: '',
    address: '', city: '', zip: '',
    notes: '',
  });

  const overThreshold = subtotal >= 200;
  const shippingCost = delivery === 'salong' ? 0 : (overThreshold ? 0 : 25);
  const total = subtotal + shippingCost;
  const fmt = (n: number) => n.toFixed(2).replace('.', ',');

  const up = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

  const labelSt: React.CSSProperties = {
    fontSize: 11, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase',
    letterSpacing: '0.06em', color: 'var(--muted)', display: 'block', marginBottom: 6,
  };
  const fieldSt: React.CSSProperties = { display: 'grid', gap: 6 };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!terms) return;
    setLoading(true);
    setError(false);
    const nr = 'VP-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, buyerType, delivery, items, subtotal, shippingCost, total, locale, orderNr: nr }),
      });
      if (res.ok) {
        setOrderNr(nr);
        clear();
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0 && !submitted) {
    return (
      <div style={{ padding: '120px 56px', textAlign: 'center' }}>
        <div className="vp-display" style={{ fontSize: 64, marginBottom: 24 }}>
          {ru ? 'Корзина пуста.' : 'Korv on tühi.'}
        </div>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', marginBottom: 32 }}>
          {ru ? 'Добавьте товары в корзину, чтобы оформить заказ.' : 'Lisa tooteid korvi, et tellimust vormistada.'}
        </p>
        <Link href={`${pfx}/tooted`} className="vp-btn vp-btn--lg">{ru ? 'Смотреть товары →' : 'Vaata tooteid →'}</Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div>
        {/* Steps header */}
        <section style={{ padding: '48px 56px 24px', borderBottom: 'var(--border)' }}>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>
            <span>{ru ? '1. Корзина ✓' : '1. Korv ✓'}</span><span>→</span>
            <span>{ru ? '2. Данные ✓' : '2. Andmed ✓'}</span><span>→</span>
            <span style={{ color: 'var(--ink)', borderBottom: '1.5px solid var(--ink)', paddingBottom: 2 }}>{ru ? '3. Отправлено' : '3. Saadetud'}</span>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', borderBottom: 'var(--border)', minHeight: 560 }}>
          {/* Left */}
          <div style={{ padding: '72px 56px', borderRight: 'var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{ru ? 'Заказ отправлен' : 'Tellimus saadetud'}</div>
            <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: '0 0 24px', lineHeight: 0.9 }}>
              {ru ? 'Спасибо!' : 'Aitäh!'}<br />
              <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.4em', letterSpacing: '-0.02em' }}>{ru ? 'ответим в течение 24 ч.' : 'vastame 24 h jooksul.'}</span>
            </h1>
            <div style={{ display: 'inline-flex', gap: 18, alignItems: 'center', padding: '14px 20px', border: 'var(--border)', alignSelf: 'flex-start', background: 'var(--paper-2)' }}>
              <span className="vp-eyebrow">{ru ? '№ заказа' : 'Tellimuse nr'}</span>
              <span className="vp-mono" style={{ fontSize: 20, fontWeight: 600 }}>{orderNr}</span>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 560, marginTop: 32 }}>
              {ru
                ? <>Отправили подтверждение на ваш e-mail. <strong>В течение 24 ч</strong> (Пн–Пт 10–17) получите по почте счёт и реквизиты. Если товар на складе, доставка Venipak 2–4 рабочих дня.</>
                : <>Saatsime kinnituse e-posti aadressile{form.email ? <> <span className="vp-mono">{form.email}</span></> : ''}. <strong>24 tunni jooksul</strong> (E–R 10–17) saad meilile arve ja makseinfo. Kui kaup on laos, jõuab Venipakiga 2–4 tööpäevaga.</>}
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
              <Link href={pfx || '/'} className="vp-btn vp-btn--lg">{ru ? '← На главную' : '← Avalehele'}</Link>
              <Link href={`${pfx}/tooted`} className="vp-btn vp-btn--ghost vp-btn--lg">{ru ? 'Продолжить покупки' : 'Jätka ostlemist'}</Link>
            </div>
          </div>

          {/* Right: Mis edasi */}
          <div style={{ padding: '48px', background: 'var(--paper-2)', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="vp-eyebrow">{ru ? 'Что дальше' : 'Mis edasi'}</div>
            {[
              { n: '01', t: ru ? 'Получите письмо в течение 24 ч' : 'Saad meili 24 h jooksul', d: ru ? 'Счёт, реквизиты (SEPA-перевод) и точный срок доставки.' : 'Arve, makseinfo (SEPA ülekanne) ja täpne tarne aeg.' },
              { n: '02', t: ru ? 'Оплачиваете счёт' : 'Tasud arve', d: ru ? 'Перевод на счёт PROSPACE OÜ. После поступления отправляем товар.' : 'Ülekanne PROSPACE OÜ kontole. Pärast laekumist paneme kauba teele.' },
              { n: '03', t: ru ? 'Получаете трек-номер' : 'Saad jälgimisnumbri', d: ru ? 'Отправляем трек-номер. Venipak звонит перед доставкой.' : 'Saadame sulle jälgimisnumbri. Venipak helistab enne kauba kätte toimetamist.' },
              { n: '04', t: ru ? 'На месте' : 'Kohal', d: ru ? 'Курьер доставляет товар или забираете в салоне, если выбрали.' : 'Kuller toimetab kauba sinuni või saad kätte salongist, kui oled nii valinud.' },
            ].map((s) => (
              <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 14 }}>
                <div className="vp-display" style={{ fontSize: 40, color: 'var(--muted)' }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{s.t}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)' }}>{s.d}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: '1px solid rgba(0,0,0,0.15)', fontSize: 13, lineHeight: 1.6 }}>
              <strong>{ru ? 'Вопросы?' : 'Küsimusi?'}</strong> {ru ? 'Напишите' : 'Kirjuta'} <a href={site.emailUrl} className="vp-mono" style={{ color: 'inherit' }}>{site.email}</a> {ru ? 'или позвоните' : 'või helista'} <a href={site.phoneUrl} className="vp-mono" style={{ color: 'inherit' }}>{site.phone}</a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Steps header */}
      <section style={{ padding: '48px 56px 24px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', marginBottom: 18, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Link href={`${pfx}/korv`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>{ru ? '1. Корзина ✓' : '1. Korv ✓'}</Link>
          <span style={{ color: 'var(--muted)' }}>→</span>
          <span style={{ borderBottom: '1.5px solid var(--ink)', paddingBottom: 2 }}>{ru ? '2. Данные' : '2. Andmed'}</span>
          <span style={{ color: 'var(--muted)' }}>→</span>
          <span style={{ color: 'var(--muted)' }}>{ru ? '3. Отправлено' : '3. Saadetud'}</span>
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: '0 0 18px' }}>
          {ru ? 'Данные заказа.' : 'Tellimuse andmed.'}
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 640 }}>
          {ru
            ? <>Заполните данные и отправьте заказ. Ответим <strong>в течение 24 ч</strong> счётом, реквизитами и подтверждением — на адрес <span className="vp-mono">{site.email}</span>.</>
            : <>Täida andmed ja saada tellimus. Vastame <strong>24 tunni jooksul</strong> arve, makseinfo ning kinnitusega — meiliaadressile <span className="vp-mono">{site.email}</span>.</>}
        </p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', borderBottom: 'var(--border)' }}>
        {/* Left: form */}
        <form onSubmit={handleSubmit} style={{ borderRight: 'var(--border)' }}>

          {/* 01 · Contact */}
          <div style={{ padding: '40px 48px', borderBottom: 'var(--border)' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '01 · Кому отправляем' : '01 · Kellele saadame'}</div>

            {/* Buyer type toggle */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 24, border: 'var(--border)' }}>
              {([['eraisik', ru ? 'Частное лицо' : 'Eraisik'], ['ettevote', ru ? 'Компания' : 'Ettevõte']] as [BuyerType, string][]).map(([k, l], i) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setBuyerType(k)}
                  style={{
                    flex: 1, padding: '14px 18px',
                    border: 'none', borderRight: i === 0 ? 'var(--border)' : 'none',
                    background: buyerType === k ? 'var(--ink)' : 'transparent',
                    color: buyerType === k ? 'var(--paper)' : 'var(--ink)',
                    fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13,
                    textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer',
                  }}
                >{l}</button>
              ))}
            </div>

            {buyerType === 'ettevote' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div style={fieldSt}><span style={labelSt}>{ru ? 'Название компании *' : 'Ettevõtte nimi *'}</span><input className="vp-input" required value={form.company} onChange={up('company')} placeholder="OÜ Näide" /></div>
                <div style={fieldSt}><span style={labelSt}>{ru ? 'Рег.№ *' : 'Reg.nr *'}</span><input className="vp-input" required value={form.regNr} onChange={up('regNr')} placeholder="12345678" /></div>
                <div style={fieldSt}><span style={labelSt}>{ru ? 'ИНН' : 'KMKR nr'}</span><input className="vp-input" value={form.kmkr} onChange={up('kmkr')} placeholder="EE123456789" /></div>
                <div style={fieldSt}><span style={labelSt}>{ru ? 'Контактное лицо *' : 'Kontaktisik *'}</span><input className="vp-input" required value={form.contact} onChange={up('contact')} /></div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div style={fieldSt}><span style={labelSt}>{ru ? 'Имя *' : 'Eesnimi *'}</span><input className="vp-input" required value={form.firstName} onChange={up('firstName')} /></div>
                <div style={fieldSt}><span style={labelSt}>{ru ? 'Фамилия *' : 'Perekonnanimi *'}</span><input className="vp-input" required value={form.lastName} onChange={up('lastName')} /></div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={fieldSt}><span style={labelSt}>E-mail *</span><input className="vp-input" type="email" required value={form.email} onChange={up('email')} placeholder={ru ? 'ivan@primer.ee' : 'mari@naaide.ee'} /></div>
              <div style={fieldSt}><span style={labelSt}>{ru ? 'Телефон *' : 'Telefon *'}</span><input className="vp-input" type="tel" required value={form.phone} onChange={up('phone')} placeholder="+372 5xxx xxxx" /></div>
            </div>
          </div>

          {/* 02 · Delivery */}
          <div style={{ padding: '40px 48px', borderBottom: 'var(--border)' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '02 · Способ доставки' : '02 · Tarneviis'}</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {([
                {
                  k: 'venipak' as DeliveryType,
                  t: ru ? 'Venipak — по Эстонии' : 'Venipak — üle Eesti',
                  d: ru ? 'Доставка 2–4 рабочих дня (со склада). RAL под заказ — 4–5 недель.' : 'Tarne 2–4 tööpäeva (laokaup). RAL eritoonid 4–5 nädalat.',
                  p: overThreshold ? (ru ? 'Бесплатно' : 'Tasuta') : `25,00 €`,
                },
                {
                  k: 'salong' as DeliveryType,
                  t: ru ? 'Заберу сам из салона' : 'Tulen ise salongist',
                  d: ru ? 'Vana-Kalamaja 8–110, Tallinn · Пн–Пт 10–17. Сообщим, когда товар готов.' : 'Vana-Kalamaja 8–110, Tallinn · E–R 10–17. Teavitame kui kaup on valmis.',
                  p: ru ? 'Бесплатно' : 'Tasuta',
                },
              ] as { k: DeliveryType; t: string; d: string; p: string }[]).map((o) => (
                <label key={o.k} onClick={() => setDelivery(o.k)} style={{ display: 'grid', gridTemplateColumns: '24px 1fr auto', gap: 14, padding: '18px 20px', border: 'var(--border)', cursor: 'pointer', background: delivery === o.k ? 'var(--paper-2)' : 'transparent', alignItems: 'center' }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {delivery === o.k && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ink)' }} />}
                  </span>
                  <span>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{o.t}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>{o.d}</div>
                  </span>
                  <span className="vp-mono" style={{ fontSize: 13, fontWeight: 600 }}>{o.p}</span>
                </label>
              ))}
            </div>

            {delivery === 'venipak' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 18 }}>
                <div style={{ ...fieldSt, gridColumn: '1 / -1' }}><span style={labelSt}>{ru ? 'Адрес доставки *' : 'Tarneaadress *'}</span><input className="vp-input" required value={form.address} onChange={up('address')} placeholder={ru ? 'Улица 12–34' : 'Tänav 12–34'} /></div>
                <div style={fieldSt}><span style={labelSt}>{ru ? 'Город *' : 'Linn *'}</span><input className="vp-input" required value={form.city} onChange={up('city')} placeholder="Tallinn" /></div>
                <div style={fieldSt}><span style={labelSt}>{ru ? 'Индекс *' : 'Postiindeks *'}</span><input className="vp-input" required value={form.zip} onChange={up('zip')} placeholder="10412" /></div>
              </div>
            )}
          </div>

          {/* 03 · Notes + submit */}
          <div style={{ padding: '40px 48px' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '03 · Комментарий (необязательно)' : '03 · Märkused (vabatahtlik)'}</div>
            <textarea className="vp-input" rows={4} placeholder={ru ? 'Пожелания, размеры, удобное время доставки...' : 'Soovid, mõõdud, eelistatud tarneaeg...'} value={form.notes} onChange={up('notes')} style={{ resize: 'vertical' }} />

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 18, fontSize: 13, color: 'var(--ink-2)', cursor: 'pointer' }}>
              <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} style={{ marginTop: 3 }} required />
              <span>
                {ru ? 'Ознакомлен с ' : 'Olen tutvunud '}
                <Link href={`${pfx}/impressum`} style={{ borderBottom: '1px solid var(--ink)', color: 'inherit' }}>{ru ? 'условиями продажи' : 'müügitingimustega'}</Link>
                {ru ? ' и ' : ' ja '}
                <Link href={`${pfx}/impressum`} style={{ borderBottom: '1px solid var(--ink)', color: 'inherit' }}>{ru ? 'политикой конфиденциальности' : 'privaatsuspoliitikaga'}</Link>.
              </span>
            </label>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 10, fontSize: 13, color: 'var(--ink-2)', cursor: 'pointer' }}>
              <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} style={{ marginTop: 3 }} />
              <span>{ru ? 'Хочу получать новости и вдохновение (макс. 1×/месяц).' : 'Soovin saada uudiseid ja inspiratsiooni (max 1×/kuus).'}</span>
            </label>

            <button type="submit" disabled={loading || !terms} className="vp-btn vp-btn--lg vp-btn--block" style={{ marginTop: 24 }}>
              {loading
                ? (ru ? 'Отправка…' : 'Saadan…')
                : (ru ? `Отправить заказ → ${fmt(total)} €` : `Esita tellimus → ${fmt(total)} €`)}
            </button>

            {!terms && (
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10, textAlign: 'center' }}>
                {ru ? 'Отметьте согласие с условиями, чтобы отправить заказ.' : 'Märgi nõustumine tingimustega, et tellimust esitada.'}
              </div>
            )}
            {error && (
              <div role="alert" style={{ fontSize: 13, color: '#b00020', background: 'rgba(176,0,32,0.06)', border: '1.5px solid rgba(176,0,32,0.3)', padding: '12px 14px', marginTop: 12 }}>
                {ru
                  ? 'Не удалось отправить заказ. Попробуйте ещё раз или напишите нам: '
                  : 'Tellimuse saatmine ebaõnnestus. Proovi uuesti või kirjuta meile: '}
                <a href={site.emailUrl} style={{ color: 'inherit', borderBottom: '1px solid currentColor' }}>{site.email}</a>
              </div>
            )}

            <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--ink-2)', padding: '12px 14px', border: '1.5px dashed rgba(0,0,0,0.2)', marginTop: 16 }}>
              {ru
                ? 'После отправки мы вышлем счёт по SEPA на указанный e-mail. Заказ выполняется после 100% оплаты.'
                : 'Peale esitamist saadame SEPA arve märgitud e-maili aadressile. Tellimus täidetakse peale 100% laekumist.'}
            </div>
          </div>
        </form>

        {/* Right: order summary */}
        <aside style={{ padding: '40px', background: 'var(--paper-2)', position: 'sticky', top: 60, alignSelf: 'start' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 18 }}>{ru ? 'Ваш заказ' : 'Sinu tellimus'}</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
            {items.map((item) => (
              <div key={item.sku + item.color} style={{ display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 12, alignItems: 'center' }}>
                <div style={{ aspectRatio: '1', border: 'var(--border)', background: 'var(--paper)', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/assets/products/${item.sku}_1.jpg`} alt={item.sku} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <div>
                  <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{item.sku} · {item.color}</div>
                  <div style={{ fontSize: 13 }}>{item.qty} {ru ? 'шт' : 'tk'} × {item.pieceLengthM.toFixed(1)} m = {(item.qty * item.pieceLengthM).toFixed(1)} m</div>
                </div>
                <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>{fmt(item.pricePerM * item.qty * item.pieceLengthM)} €</div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: 'var(--border)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{ru ? 'Товары' : 'Tooted'}</span><span>{fmt(subtotal)} €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{ru ? 'Доставка' : 'Tarne'}</span>
              <span>{shippingCost === 0 ? (ru ? 'Бесплатно' : 'Tasuta') : `${fmt(shippingCost)} €`}</span>
            </div>
            {!overThreshold && delivery === 'venipak' && (
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                {ru ? `Бесплатная доставка от 200 €` : `Tasuta tarne ülalt 200 €`}
              </div>
            )}
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="vp-eyebrow">{ru ? 'Итого' : 'Kokku'}</span>
            <span className="vp-display" style={{ fontSize: 48 }}>{fmt(total)}&nbsp;€</span>
          </div>
          <div className="vp-mono" style={{ fontSize: 10, color: 'var(--muted)', marginTop: 6 }}>
            {ru ? 'Включая НДС 24%' : 'KM 24% sees'}
          </div>
        </aside>
      </section>
    </div>
  );
}
