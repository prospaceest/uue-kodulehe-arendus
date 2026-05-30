import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import { site } from '@/lib/site';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { getLocale } = await import('next-intl/server');
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru ? 'Доставка и возврат' : 'Tarne ja tagastus',
    description: ru ? 'Условия доставки: бесплатно от 200 €, Venipak 1–4 рабочих дня. Возврат 14 дней. Счёт SEPA.' : 'Tarnetingimused: tasuta tarne üle 200 €, Venipak 1–4 tööpäevaga. Tagastusõigus 14 päeva. SEPA arve.',
  };
}

export default async function ShippingPage() {
  const locale = await getLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  const boxes = [
    { n: '25 €', t: ru ? 'Venipak по Эстонии' : 'Venipak üle Eesti', d: ru ? '+ НДС 24%. Доставка 2–4 рабочих дня при наличии на складе.' : '+ KM 24%. Tarne 2–4 tööpäeva, kui kaup on laos.' },
    { n: ru ? 'Бесплатно' : 'Tasuta', t: ru ? 'От заказов 200 €+' : 'Tellimustelt 200 €+', d: ru ? 'Автоматически — мы покрываем стоимость доставки.' : 'Automaatselt — meie kanname tarnekulu.' },
    { n: ru ? 'Бесплатно' : 'Tasuta', t: ru ? 'Самовывоз в Таллинне' : 'Salongist Tallinnas', d: ru ? `${site.addressFull}, Пн–Пт 10–17. Сообщим, когда готово.` : `${site.addressFull}, E–R 10–17. Teavitame, kui valmis.` },
  ];

  return (
    <div>
      <section style={{ padding: '72px 56px 32px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          {ru ? 'Сервис · Доставка и оплата' : 'Klienditeenindus · Tarne ja maksmine'}
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: 0, lineHeight: 0.9 }}>
          {ru ? 'Доставка.' : 'Tarne.'}<br />
          <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.5em', letterSpacing: '-0.02em' }}>
            {ru ? 'по всей Эстонии за 2–4 дня.' : 'kogu Eesti, 2–4 päevaga.'}
          </span>
        </h1>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: 'var(--border)' }}>
        {boxes.map((b, i) => (
          <div key={i} style={{ padding: '48px 32px', borderRight: i < 2 ? 'var(--border)' : 'none', textAlign: 'center' }}>
            <div className="vp-display" style={{ fontSize: 80, lineHeight: 0.9, marginBottom: 12 }}>{b.n}</div>
            <div className="vp-display" style={{ fontSize: 28, marginBottom: 10 }}>{b.t}</div>
            <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>{b.d}</div>
          </div>
        ))}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)' }}>
        <div style={{ padding: '56px 48px', borderRight: 'var(--border)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '01 / Срок доставки' : '01 / Tarne aeg'}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 18px' }}>{ru ? 'Как быстро\nдойдёт?' : 'Kui kiiresti\nkohale jõuab?'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '14px 24px', fontSize: 15, lineHeight: 1.55 }}>
            <span className="vp-mono" style={{ fontSize: 13, color: 'var(--muted)' }}>{ru ? 'Со склада' : 'Laokaup'}</span>
            <span><strong>2–4 {ru ? 'рабочих дня' : 'tööpäeva'}</strong> · {ru ? 'Чёрный и белый — обычно на складе.' : 'Must ja valge — enamasti laos.'}</span>
            <span className="vp-mono" style={{ fontSize: 13, color: 'var(--muted)' }}>{ru ? 'RAL под заказ' : 'RAL eritoon'}</span>
            <span><strong>4–5 {ru ? 'недель' : 'nädalat'}</strong> · {ru ? 'Порошковая окраска под заказ.' : 'Pulbervärvitus eritellimusena.'}</span>
          </div>
        </div>
        <div style={{ padding: '56px 48px', background: 'var(--paper-2)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '02 / Оплата' : '02 / Maksmine'}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 18px' }}>{ru ? 'SEPA-перевод.' : 'SEPA ülekanne.'}</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>
            {ru
              ? 'На сайте автоматическая оплата картой не доступна. В течение 24 ч отправим счёт — оплатите SEPA-переводом. Товар отгружается только после 100% оплаты.'
              : 'Me ei paku automaatset kaardimakset. Saadame 24 h jooksul e-arve — tasud SEPA ülekandega. Profiilid lähetame välja alles siis, kui arve on 100% makstud.'}
          </p>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)' }}>
        <div style={{ padding: '56px 48px', borderRight: 'var(--border)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '03 / Возврат' : '03 / Tagastus'}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 22px' }}>{ru ? '14 дней.' : '14 päeva.'}</h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            {ru
              ? 'Право возврата в течение 14 дней с момента получения. Товар должен быть неиспользованным, в оригинальной упаковке. Стоимость обратной доставки — за счёт покупателя (кроме дефектов).'
              : 'E-poest ostes kehtib 14-päevane tagastusõigus alates kauba kättesaamisest. Toode peab olema kasutamata, originaalpakendis. Tagastusveo eest tasub klient (v.a. defekti korral).'}
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--muted)', marginTop: 14 }}>
            {ru ? 'На товары под заказ (RAL) право возврата не распространяется.' : 'Eritellimusel valmistatud (RAL värv) toodetel tagastusõigus ei kehti.'}
          </p>
        </div>
        <div style={{ padding: '56px 48px' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '04 / Дефекты' : '04 / Defektid'}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 22px' }}>{ru ? 'Претензии.' : 'Pretensioonid.'}</h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            {ru ? 'Обнаружили повреждение? Фото + e-mail ' : 'Avastasid kahjustuse? Foto + e-mail '}
            <a href={site.emailUrl} className="vp-mono" style={{ color: 'inherit', borderBottom: '1px solid currentColor' }}>{site.email}</a>
            {ru ? ' в течение 24 ч. Отвечаем в тот же день, заменяем бесплатно.' : ' 24 h jooksul. Vastame samal päeval, asendame defektsed tooted tasuta.'}
          </p>
        </div>
      </section>

      <section style={{ padding: '56px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href={`${pfx}/professionaalidele`} className="vp-btn vp-btn--lg">{ru ? 'Стать B2B-партнёром →' : 'Liitu B2B partneriks →'}</Link>
          <Link href={`${pfx}/kontakt`} className="vp-btn vp-btn--ghost vp-btn--lg">{ru ? 'Запросить предложение' : 'Küsi pakkumist'}</Link>
        </div>
      </section>
    </div>
  );
}
