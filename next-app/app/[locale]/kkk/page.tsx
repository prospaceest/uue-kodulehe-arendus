'use client';

import { useState } from 'react';
import { useTx } from '@/lib/useTx';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { site } from '@/lib/site';
import { marketForLocale } from '@/lib/markets';
import JsonLd from '@/components/seo/JsonLd';
import { lp } from '@/lib/pageUrls';

type FAQItem = [string, string];
type FAQGroup = { h: string; items: FAQItem[] };

export default function FaqPage() {
  const locale = useLocale();
  const market = marketForLocale(locale);
  const ru = locale === 'ru';
  const tx = useTx();

  const groups: FAQGroup[] = [
    {
      h: tx('Заказ', 'Tellimine'),
      items: [
        [tx('Как оформить заказ?', 'Kuidas tellimuse vormistamine käib?'), `${tx('Выберите товары → в корзину → оформите заказ. Заказ приходит на нашу почту', 'Vali tooted → ostukorvi → vormista. Tellimus jõuab meie meili')} (${market.email}). ${tx('В течение 24 ч отвечаем со счётом и подтверждением.', '24 h jooksul vastame arve ja kinnitusega.')}`],
        [tx('Можно ли оплатить картой?', 'Kas saan maksta kohe kaardiga?'), tx('Сейчас принимаем только SEPA-переводы. Отправляем счёт по почте — после поступления отправляем товар.', 'Hetkel pakume ainult SEPA ülekande maksmist. Saadame arve meiliga — peale laekumist paneme kauba teele.')],
        [tx('Какой минимальный заказ?', 'Mis on minimaalne tellimuse kogus?'), tx('Минимального заказа нет. Можно заказывать от 1 шт.', 'Minimaalset kogust ei ole. Tellida saab alates 1 tükist.')],
        [tx('Можно ли изменить заказ после отправки?', 'Kas saan tellimust muuta peale saatmist?'), tx('Да — ответьте на письмо в течение 24 ч. После оплаты изменения сложнее.', 'Jah — vasta meilile 24 h jooksul. Pärast laekumist muutmine on keerukam.')],
      ],
    },
    {
      h: tx('Доставка', 'Tarne'),
      items: [
        [tx('Срок доставки?', 'Milline on tarne aeg?'), tx('Складской товар — самовывоз или Venipak 2–4 рабочих дня. RAL под заказ — 4–5 недель.', 'Laokauba tarne salongist või Venipakiga 2–4 tööpäeva. RAL eritoonid 4–5 nädalat.')],
        [tx('Сколько стоит доставка?', 'Kui palju tarne maksab?'), tx('Venipak по Эстонии: 25 € + НДС. Заказы свыше 200 € — бесплатно. Самовывоз — всегда бесплатно.', 'Venipak üle Eesti: 25 € + KM. Tellimused üle 200 € — tasuta. Salongist kättesaamine alati tasuta.')],
        [tx('Доставляете ли в Финляндию / Латвию?', 'Kas saadate ka Soome / Lätti?'), tx('Да, отправляем по всей Балтии и Скандинавии.', 'Jah, saadame üle Baltikumi ja Skandinaavia.')],
        [tx('Что делать, если посылка повреждена?', 'Mida teha, kui pakk on kahjustatud?'), tx('Фото + e-mail в течение 24 ч. Отправим новый бесплатно.', 'Foto + e-mail 24 h jooksul. Saadame uue tasuta.')],
      ],
    },
    {
      h: tx('Товары', 'Tooted'),
      items: [
        [tx('Можно ли посмотреть товары на месте?', 'Kas saan tooteid kohapeal näha?'), `${tx('Да, в салоне', 'Jah, salongis')} ${site.addressFull}. ${tx('Пн–Пт 10–17. Пожалуйста, забронируйте визит заранее.', 'E–R 10–17. Palume kohtumine eelnevalt broneerida.')}`],
        [tx('Предлагаете ли услугу монтажа?', 'Kas pakute paigaldusteenust?'), tx('Нет, продаём только профили. При необходимости консультируем по монтажу.', 'Ei, müüme vaid profiile. Vajadusel juhendame, kuidas paigaldus peaks toimuma.')],
        [tx('Можно ли заказать окраску в RAL?', 'Kas profiile saab eritellimusel värvida?'), tx('Да — любые оттенки RAL. Поставка 4–5 недель.', 'Jah — kõik RAL toonid. Tarne 4–5 nädalat.')],
        [tx('Как выбрать правильный профиль?', 'Kuidas valida õige profiil?'), tx('Позвоните, напишите или забронируйте консультацию с нашим специалистом.', 'Helista, kirjuta või broneeri konsultatsioon meie spetsialistiga.')],
      ],
    },
    {
      h: tx('B2B / партнёрство', 'B2B / partnerlus'),
      items: [
        [tx('Кто может стать партнёром?', 'Kes saab partneriks?'), tx('Дизайнеры интерьера, монтажники, дистрибьюторы, строительные компании. Регистрация бесплатна.', 'Sisearhitektid, paigaldajad, edasimüüjad, ehitusettevõtted. Liitumine tasuta — täida ankeet.')],
        [tx('Как работает партнёрская скидка?', 'Kuidas soodushind toimib?'), tx('Войдите в свой партнёрский кабинет — скидка (5–35%) применяется автоматически.', 'Logid sisse oma partnerikontoga — soodusprotsent (5–35%) rakendub automaatselt.')],
      ],
    },
  ];

  const [open, setOpen] = useState<Record<string, boolean>>({});
  const totalCount = groups.reduce((s, g) => s + g.items.length, 0);

  // FAQPage structured data — built from the same groups the UI renders.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: groups.flatMap((g) =>
      g.items.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    ),
  };

  return (
    <div>
      <JsonLd data={faqSchema} />
      <section style={{ padding: '72px 56px 32px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          {tx('Часто задаваемые вопросы', 'Korduvad küsimused')} · {totalCount} {tx('ответов', 'vastust')}
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: 0, lineHeight: 0.9 }}>
          {tx('Вопросы.', 'KKK.')}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 680, marginTop: 18 }}>
          {tx('Ответы на вопросы, которые приходят каждый день. Если вашего вопроса нет — напишите ', 'Vastused küsimustele, mis tulevad iga päev. Kui sinu küsimus puudub — kirjuta ')}
          <a href={`mailto:${market.email}`} className="vp-mono" style={{ color: 'inherit', borderBottom: '1px solid currentColor' }}>{market.email}</a>.
        </p>
      </section>

      <section style={{ padding: '48px 56px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, borderBottom: 'var(--border)' }}>
        <aside style={{ position: 'sticky', top: 80, alignSelf: 'start' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tx('Темы', 'Teemad')}</div>
          {groups.map((g) => (
            <a key={g.h} href={`#g-${g.h}`} style={{ display: 'block', padding: '10px 0', fontSize: 14, fontWeight: 500, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              {g.h} <span style={{ color: 'var(--muted)', fontFamily: 'JetBrains Mono', fontSize: 11, marginLeft: 6 }}>{g.items.length}</span>
            </a>
          ))}
          <div style={{ marginTop: 32, padding: '18px 20px', border: 'var(--border)', background: 'var(--paper-2)' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 6 }}>{tx('Не нашли ответа?', 'Ei leia vastust?')}</div>
            <div style={{ fontSize: 13, marginBottom: 10, lineHeight: 1.55 }}>{tx('Напишите нам — ответим в течение 24 ч.', 'Kirjuta meile — vastame 24 h jooksul.')}</div>
            <Link href={lp('/kontakt', locale)} className="vp-btn vp-btn--block">{tx('Контакты →', 'Kontakt →')}</Link>
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
