'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { site } from '@/lib/site';

type FAQItem = [string, string];
type FAQGroup = { h: string; items: FAQItem[] };

export default function FaqPage() {
  const locale = useLocale();
  const ru = locale === 'ru';

  const groups: FAQGroup[] = [
    {
      h: ru ? 'Заказ' : 'Tellimine',
      items: [
        [ru ? 'Как оформить заказ?' : 'Kuidas tellimuse vormistamine käib?', ru ? `Выберите товары → в корзину → оформите заказ. Заказ приходит на нашу почту (${site.email}). В течение 24 ч отвечаем со счётом и подтверждением.` : `Vali tooted → ostukorvi → vormista. Tellimus jõuab meie meili (${site.email}). 24 h jooksul vastame arve ja kinnitusega.`],
        [ru ? 'Можно ли оплатить картой?' : 'Kas saan maksta kohe kaardiga?', ru ? 'Сейчас принимаем только SEPA-переводы. Отправляем счёт по почте — после поступления отправляем товар.' : 'Hetkel pakume ainult SEPA ülekande maksmist. Saadame arve meiliga — peale laekumist paneme kauba teele.'],
        [ru ? 'Какой минимальный заказ?' : 'Mis on minimaalne tellimuse kogus?', ru ? 'Минимального заказа нет. Можно заказывать от 1 шт.' : 'Minimaalset kogust ei ole. Tellida saab alates 1 tükist.'],
        [ru ? 'Можно ли изменить заказ после отправки?' : 'Kas saan tellimust muuta peale saatmist?', ru ? 'Да — ответьте на письмо в течение 24 ч. После оплаты изменения сложнее.' : 'Jah — vasta meilile 24 h jooksul. Pärast laekumist muutmine on keerukam.'],
      ],
    },
    {
      h: ru ? 'Доставка' : 'Tarne',
      items: [
        [ru ? 'Срок доставки?' : 'Milline on tarne aeg?', ru ? 'Складской товар — самовывоз или Venipak 2–4 рабочих дня. RAL под заказ — 4–5 недель.' : 'Laokauba tarne salongist või Venipakiga 2–4 tööpäeva. RAL eritoonid 4–5 nädalat.'],
        [ru ? 'Сколько стоит доставка?' : 'Kui palju tarne maksab?', ru ? 'Venipak по Эстонии: 25 € + НДС. Заказы свыше 200 € — бесплатно. Самовывоз — всегда бесплатно.' : 'Venipak üle Eesti: 25 € + KM. Tellimused üle 200 € — tasuta. Salongist kättesaamine alati tasuta.'],
        [ru ? 'Доставляете ли в Финляндию / Латвию?' : 'Kas saadate ka Soome / Lätti?', ru ? 'Да, отправляем по всей Балтии и Скандинавии.' : 'Jah, saadame üle Baltikumi ja Skandinaavia.'],
        [ru ? 'Что делать, если посылка повреждена?' : 'Mida teha, kui pakk on kahjustatud?', ru ? 'Фото + e-mail в течение 24 ч. Отправим новый бесплатно.' : 'Foto + e-mail 24 h jooksul. Saadame uue tasuta.'],
      ],
    },
    {
      h: ru ? 'Товары' : 'Tooted',
      items: [
        [ru ? 'Можно ли посмотреть товары на месте?' : 'Kas saan tooteid kohapeal näha?', ru ? `Да, в салоне ${site.addressFull}. Пн–Пт 10–17. Пожалуйста, забронируйте визит заранее.` : `Jah, salongis ${site.addressFull}. E–R 10–17. Palume kohtumine eelnevalt broneerida.`],
        [ru ? 'Предлагаете ли услугу монтажа?' : 'Kas pakute paigaldusteenust?', ru ? 'Нет, продаём только профили. При необходимости консультируем по монтажу.' : 'Ei, müüme vaid profiile. Vajadusel juhendame, kuidas paigaldus peaks toimuma.'],
        [ru ? 'Можно ли заказать окраску в RAL?' : 'Kas profiile saab eritellimusel värvida?', ru ? 'Да — любые оттенки RAL. Поставка 4–5 недель.' : 'Jah — kõik RAL toonid. Tarne 4–5 nädalat.'],
        [ru ? 'Как выбрать правильный профиль?' : 'Kuidas valida õige profiil?', ru ? 'Позвоните, напишите или забронируйте консультацию с нашим специалистом.' : 'Helista, kirjuta või broneeri konsultatsioon meie spetsialistiga.'],
      ],
    },
    {
      h: ru ? 'B2B / партнёрство' : 'B2B / partnerlus',
      items: [
        [ru ? 'Кто может стать партнёром?' : 'Kes saab partneriks?', ru ? 'Дизайнеры интерьера, монтажники, дистрибьюторы, строительные компании. Регистрация бесплатна.' : 'Sisearhitektid, paigaldajad, edasimüüjad, ehitusettevõtted. Liitumine tasuta — täida ankeet.'],
        [ru ? 'Как работает партнёрская скидка?' : 'Kuidas soodushind toimib?', ru ? 'Войдите в свой партнёрский кабинет — скидка (5–35%) применяется автоматически.' : 'Logid sisse oma partnerikontoga — soodusprotsent (5–35%) rakendub automaatselt.'],
      ],
    },
  ];

  const [open, setOpen] = useState<Record<string, boolean>>({});
  const totalCount = groups.reduce((s, g) => s + g.items.length, 0);

  return (
    <div>
      <section style={{ padding: '72px 56px 32px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          {ru ? 'Часто задаваемые вопросы' : 'Korduvad küsimused'} · {totalCount} {ru ? 'ответов' : 'vastust'}
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: 0, lineHeight: 0.9 }}>
          {ru ? 'Вопросы.' : 'KKK.'}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 680, marginTop: 18 }}>
          {ru ? 'Ответы на вопросы, которые приходят каждый день. Если вашего вопроса нет — напишите ' : 'Vastused küsimustele, mis tulevad iga päev. Kui sinu küsimus puudub — kirjuta '}
          <a href={site.emailUrl} className="vp-mono" style={{ color: 'inherit', borderBottom: '1px solid currentColor' }}>{site.email}</a>.
        </p>
      </section>

      <section style={{ padding: '48px 56px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, borderBottom: 'var(--border)' }}>
        <aside style={{ position: 'sticky', top: 80, alignSelf: 'start' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Темы' : 'Teemad'}</div>
          {groups.map((g) => (
            <a key={g.h} href={`#g-${g.h}`} style={{ display: 'block', padding: '10px 0', fontSize: 14, fontWeight: 500, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              {g.h} <span style={{ color: 'var(--muted)', fontFamily: 'JetBrains Mono', fontSize: 11, marginLeft: 6 }}>{g.items.length}</span>
            </a>
          ))}
          <div style={{ marginTop: 32, padding: '18px 20px', border: 'var(--border)', background: 'var(--paper-2)' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 6 }}>{ru ? 'Не нашли ответа?' : 'Ei leia vastust?'}</div>
            <div style={{ fontSize: 13, marginBottom: 10, lineHeight: 1.55 }}>{ru ? 'Напишите нам — ответим в течение 24 ч.' : 'Kirjuta meile — vastame 24 h jooksul.'}</div>
            <Link href={ru ? '/ru/kontakt' : '/kontakt'} className="vp-btn vp-btn--block">{ru ? 'Контакты →' : 'Kontakt →'}</Link>
          </div>
        </aside>

        <div>
          {groups.map((g) => (
            <div key={g.h} id={`g-${g.h}`} style={{ marginBottom: 48 }}>
              <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 18px' }}>{g.h}</h2>
              {g.items.map(([q, a], i) => {
                const id = `${g.h}-${i}`;
                const isOpen = open[id];
                return (
                  <div key={i} onClick={() => setOpen({ ...open, [id]: !isOpen })} style={{ borderBottom: '1px solid rgba(0,0,0,0.15)', padding: '20px 0', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                      <span style={{ fontSize: 17, fontWeight: 500 }}>{q}</span>
                      <span style={{ fontSize: 24, lineHeight: 1 }}>{isOpen ? '−' : '+'}</span>
                    </div>
                    {isOpen && <div style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', marginTop: 14, maxWidth: 720 }}>{a}</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
