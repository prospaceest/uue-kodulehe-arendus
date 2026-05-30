'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { site } from '@/lib/site';

const FAQ_ITEMS = [
  { q: ['Kas saan tooteid kohapeal näha?', 'Можно ли посмотреть товары на месте?'], a: ['Jah, salongis Vana-Kalamaja 8, Tallinn. E–R 10–17. Soovitame salongi külastus eelnevalt kokku leppida — nii võtame sinu jaoks aega ja ei ole ohtu, et peate teiste klientide järgi ootama.', 'Да, в салоне Vana-Kalamaja 8, Tallinn. Пн–Пт 10–17. Рекомендуем заранее забронировать визит — выделим вам время и вы не будете ждать в очереди.'] },
  { q: ['Kas pakute paigaldusteenust?', 'Предлагаете ли услугу монтажа?'], a: ['Me ei tegele paigaldusega — sellega tegelevad tavaliselt ehitusettevõtted. Vajadusel suhtleme paigaldajaga ning juhendame, kuidas paigaldus peaks toimuma.', 'Монтажом не занимаемся — этим обычно занимаются строительные компании. При необходимости связываемся с монтажником и консультируем по процессу.'] },
  { q: ['Kas on B2B / edasimüügi võimalus?', 'Есть ли B2B / возможность перепродажи?'], a: ['Jah — sisearhitektidele, paigaldajatele, edasimüüjatele ja ehitusettevõtetele. Soodustus 5–35% käibe alusel, liitumine tasuta. Täida ankeet B2B-lehel.', 'Да — для дизайнеров интерьера, монтажников, реселлеров и строительных компаний. Скидка 5–35% по обороту, регистрация бесплатна. Заполните анкету на B2B-странице.'] },
  { q: ['Kuidas tagastada toode?', 'Как вернуть товар?'], a: ['14-päevane tagastusõigus alates kauba kättesaamisest. Toode peab olema kasutamata ja originaalpakendis. Tagastusveo kannab klient (v.a. defekti korral). Eritellimusel valmistatud toodetel tagastusõigus ei kehti.', '14 дней с момента получения. Товар должен быть неиспользованным и в оригинальной упаковке. Стоимость обратной доставки — за счёт клиента (кроме дефектов). На товары под заказ возврат не действует.'] },
  { q: ['Mis on minimaalne tellimuse kogus?', 'Минимальный заказ?'], a: ['Minimaalset kogust ei ole — tellida saab alates 1 tükist. Soovitame tellida 10–15% varuga.', 'Минимума нет — можно заказывать от 1 шт. Рекомендуем заказывать с запасом 10–15%.'] },
];

export default function ContactPage() {
  const locale = useLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const update = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.topic, message: form.message, locale }),
      });
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* HERO */}
      <section style={{ padding: '56px 56px 40px', borderBottom: 'var(--border)', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'end' }}>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
            {ru ? 'Приходите · звоните · пишите' : 'Külasta · helista · kirjuta'}
          </div>
          <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 180px)', margin: 0, lineHeight: 0.9 }}>
            {ru ? 'Заходите в гости.' : 'Tule külla.'}
          </h1>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)', margin: '0 0 8px', maxWidth: 480 }}>
          {ru
            ? 'Хотите ли вы сделать дом уютнее или создать современные функциональные рабочие пространства — мы здесь, чтобы предложить уникальные решения для каждого проекта.'
            : 'Olgu tegemist erakliendi sooviga kujundada kodu hubasemaks või ärikliendi sooviga luua kaasaegseid ja funktsionaalseid töökeskkondi — oleme siin, et pakkuda unikaalseid lahendusi igale projektile.'}
        </p>
      </section>

      {/* SALON INFO + PHOTO */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)' }}>
        <div style={{ padding: '48px', borderRight: 'var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 18 }}>
            <div>
              <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{ru ? 'Салон' : 'Salong'}</div>
              <h2 className="vp-display" style={{ fontSize: 48, margin: 0 }}>
                {ru ? 'Таллинн · Vana-Kalamaja' : 'Tallinn · Vana-Kalamaja'}
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ width: 34, height: 34, borderRadius: '50%', border: 'var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'var(--ink)', fontFamily: 'serif', fontSize: 16, fontWeight: 600 }}>f</a>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ width: 34, height: 34, borderRadius: '50%', border: 'var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'var(--ink)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '14px 18px', fontSize: 15, lineHeight: 1.55 }}>
            <span className="vp-eyebrow" style={{ alignSelf: 'start', paddingTop: 2 }}>{ru ? 'Адрес' : 'Aadress'}</span>
            <span>
              {site.addressLine1}<br />{site.addressLine2}
              <span style={{ display: 'block', marginTop: 8, fontSize: 13, color: 'var(--ink-2)' }}>
                {ru ? 'Если едете на машине — улица Kesk-Kalamaja ведёт прямо к салону.' : 'Kui tuled autoga, siis Kesk-Kalamaja tänav toob otse salongi ette.'}
              </span>
            </span>
            <span className="vp-eyebrow" style={{ alignSelf: 'center' }}>{ru ? 'Телефон' : 'Telefon'}</span>
            <span><a href={site.phoneUrl} style={{ color: 'inherit', textDecoration: 'none' }}>{site.phone}</a></span>
            <span className="vp-eyebrow" style={{ alignSelf: 'center' }}>E-mail</span>
            <span><a href={site.emailUrl} style={{ color: 'inherit', textDecoration: 'none' }}>{site.email}</a></span>
            <span className="vp-eyebrow" style={{ alignSelf: 'start', paddingTop: 2 }}>{ru ? 'Время работы' : 'Tööaeg'}</span>
            <span>
              {ru ? 'Пн–Пт 10:00–17:00' : 'E–R 10:00–17:00'}<br />
              {ru ? 'Сб–Вс по договорённости' : 'L–P kokkuleppel'}
              <span style={{ display: 'block', marginTop: 8, fontSize: 13, color: 'var(--ink-2)' }}>
                {ru ? 'Чтобы предложить максимально персональный опыт, просим заранее забронировать визит по телефону.' : 'Et saaksime pakkuda võimalikult personaalset kogemust, palume salongi külastus eelnevalt kokku leppida telefoni teel.'}
              </span>
            </span>
          </div>

          <div style={{ marginTop: 32, padding: '18px 22px', border: 'var(--border)', background: 'var(--paper-2)', display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ fontSize: 32 }}>◉</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{ru ? 'Забронировать 1:1 консультацию' : 'Broneeri 1:1 konsultatsioon'}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>{ru ? '30-минутная встреча со специалистом · бесплатно' : '30-minutiline kohtumine spetsialistiga · tasuta'}</div>
            </div>
            <a href={site.phoneUrl} className="vp-btn" style={{ whiteSpace: 'nowrap' }}>{ru ? 'Позвонить →' : 'Helista →'}</a>
          </div>
        </div>

        {/* Salon photo */}
        <div style={{ minHeight: 480, backgroundImage: 'url("/assets/salong-tallinn.jpg")', backgroundSize: 'cover', backgroundPosition: '30% center' }} />
      </section>

      {/* MAP + FORM */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)' }}>
        <div style={{ minHeight: 480, borderRight: 'var(--border)', position: 'relative' }}>
          <iframe
            title={ru ? 'Карта салона' : 'Salongi kaart'}
            src="https://www.openstreetmap.org/export/embed.html?bbox=24.7323%2C59.4439%2C24.7423%2C59.4479&layer=mapnik&marker=59.4459%2C24.7373"
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, border: 0, filter: 'grayscale(0.4) contrast(1.05)' }}
            loading="lazy"
          />
          <a href="https://www.google.com/maps/search/?api=1&query=Vana-Kalamaja+8,+Tallinn,+Estonia" target="_blank" rel="noopener" className="vp-mono" style={{ position: 'absolute', left: 16, bottom: 16, background: 'var(--paper)', border: 'var(--border)', padding: '8px 12px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', color: 'var(--ink)' }}>
            {ru ? 'Открыть в картах →' : 'Ava kaardirakenduses →'}
          </a>
        </div>

        <div style={{ padding: '48px', background: 'var(--paper-2)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{ru ? 'Отправить сообщение' : 'Saada sõnum'}</div>
          <h2 className="vp-display" style={{ fontSize: 42, margin: '0 0 22px' }}>
            {ru ? 'Ответим не позднее, чем через 24 ч' : 'Vastame hiljemalt 24 tunni jooksul'}
          </h2>

          {success ? (
            <div style={{ padding: '32px 24px', border: 'var(--border)', background: 'var(--paper)', textAlign: 'center' }}>
              <div className="vp-display" style={{ fontSize: 48, marginBottom: 12 }}>✓</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                {ru ? 'Спасибо — ответим в течение 24 часов.' : 'Aitäh — vastame 24 tunni jooksul.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
              <input className="vp-input" placeholder={ru ? 'Имя' : 'Nimi'} required value={form.name} onChange={update('name')} />
              <input className="vp-input" type="email" placeholder="E-mail" required value={form.email} onChange={update('email')} />
              <select className="vp-input" value={form.topic} onChange={update('topic')} style={{ cursor: 'pointer' }}>
                <option value="">{ru ? 'Тема — выберите...' : 'Teema — vali...'}</option>
                <option>{ru ? 'Запрос по товару' : 'Toote päring'}</option>
                <option>{ru ? 'Оптовые цены / B2B' : 'Hulgihinnad / B2B'}</option>
                <option>{ru ? 'Техподдержка' : 'Tehniline tugi'}</option>
                <option>{ru ? 'RAL-заказ' : 'RAL-tellimus'}</option>
                <option>{ru ? 'Другое' : 'Muu'}</option>
              </select>
              <textarea className="vp-input" rows={5} placeholder={ru ? 'Сообщение...' : 'Sõnum...'} required value={form.message} onChange={update('message')} />
              <button type="submit" className="vp-btn vp-btn--block" disabled={loading}>
                {loading ? (ru ? 'Отправка…' : 'Saadan…') : (ru ? 'Отправить →' : 'Saada sõnum →')}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '56px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <h2 className="vp-display" style={{ fontSize: 48, margin: 0 }}>{ru ? 'Часто задаваемые' : 'Korduvad küsimused'}</h2>
          <Link href={`${pfx}/kkk`} className="vp-mono" style={{ fontSize: 12, textTransform: 'uppercase', borderBottom: 'var(--border)', paddingBottom: 2 }}>
            {ru ? 'Все вопросы →' : 'Kõik KKK-d →'}
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 56px' }}>
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ padding: '18px 0', borderBottom: '1px solid rgba(0,0,0,0.15)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 18 }}>
                <span style={{ fontSize: 16, fontWeight: 500 }}>{ru ? q[1] : q[0]}</span>
                <span style={{ fontSize: 22, lineHeight: 1, color: openFaq === i ? 'var(--ink)' : 'var(--muted)' }}>{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', marginTop: 12, paddingRight: 32 }}>{ru ? a[1] : a[0]}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
