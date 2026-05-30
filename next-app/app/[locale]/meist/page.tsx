'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function AboutPage() {
  const locale = useLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    [
      ru ? 'Чем теневой профиль отличается от обычного плинтуса?' : 'Mille poolest erineb varjuprofiil tavalisest põrandaliistust?',
      ru ? 'Напольный теневой профиль или заглублён в стену, или максимально минималистичен. У многих заглублённых профилей есть возможность LED-подсветки.' : 'Põranda varjuprofiil on kas seina sisse süvistatud või väga minimaalne. Paljudel süvistatud põrandaprofiilidel on ka LED paigaldus võimalus.',
    ],
    [
      ru ? 'Можно ли заказать оттенок под спецификации?' : 'Kas saan tellida ka eritellimuse värvitooni?',
      ru ? 'Да, предлагаем все оттенки RAL. Заказы собираем раз в месяц, поставка примерно 4–5 недель.' : 'Jah, pakume kõiki RAL toone. Eritellimusi koondame üks kord kuus ning tarne on umbes 4–5 nädalat.',
    ],
    [
      ru ? 'Можно ли установить профили самому?' : 'Kas saan profiile ise paigaldada?',
      ru ? 'Да, ни потолочные, ни напольные профили сами по себе несложно установить. При необходимости консультируем и DIY-монтажников, и строителей.' : 'Jah, nii lae- kui põrandaprofiile ei ole iseenesest keeruline paigaldada. Vajadusel pakume tuge nii isepaigaldajatele kui ehitajatele.',
    ],
    [
      ru ? 'Минимальный объём заказа?' : 'Mis on minimaalne tellimuse kogus?',
      ru ? 'Минимума нет — можно заказывать от 1 шт. Рекомендуем заказывать с запасом 10–15%.' : 'Meil ei ole minimaalset tellimuse kogust — tellida saab alates 1 tükist. Soovitame tellida 10–15% varuga.',
    ],
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)', minHeight: 560 }}>
        <div style={{ padding: '72px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: 'var(--border)' }}>
          <div className="vp-eyebrow">{ru ? 'О продукции · Почему теневые профили' : 'Toodetest · Miks varjuprofiilid'}</div>
          <div>
            <h1 className="vp-display" style={{ fontSize: 'clamp(64px, 9vw, 144px)', margin: '24px 0 0', lineHeight: 0.9 }}>
              {ru ? 'Теневые' : 'Varjuprofiilid'}<br />
              <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.5em', letterSpacing: '-0.02em' }}>
                {ru ? 'в современный' : 'kaasaegsesse'}
              </span><br />
              {ru ? 'интерьер.' : 'interjööri.'}
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 480, marginTop: 28 }}>
              <strong>{ru ? 'Минималистичный дизайн. Максимальный эффект.' : 'Minimalistlik disain. Maksimaalne efekt.'}</strong>{' '}
              {ru ? 'Скрытые соединения, создающие эффект «парящего потолка или стены» — помещение становится просторнее, выразительнее и архитектурно цельнее.' : 'Peidetud ühenduslahendused, mis loovad "hõljuva lae või seina" efekti — ruum muutub avaramaks, luksuslikumaks ja arhitektuurselt terviklikuks.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>
            <Link href={`${pfx}/tooted`} className="vp-btn vp-btn--lg">{ru ? 'Смотреть товары →' : 'Vaata tooteid →'}</Link>
            <Link href={`${pfx}/kontakt`} className="vp-btn vp-btn--ghost vp-btn--lg">{ru ? 'Бесплатная консультация' : 'Tasuta nõustamine'}</Link>
          </div>
        </div>
        <div style={{ minHeight: 480, backgroundImage: 'url("/assets/hero-hoeljuv-lagi.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
            <span>{ru ? 'Проект · Таллинн 2025 · Эффект парящего потолка' : 'Projekt · Tallinn 2025 · Hõljuva lae efekt'}</span>
          </div>
        </div>
      </section>

      {/* 3 VALUE PROPS */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: 'var(--border)' }}>
        {[
          { n: '01', big: '∞',   tEt: 'Ajatu disain',   tRu: 'Вневременной дизайн',    dEt: 'Minimalistlik esteetika, mis ei lähe moest. Sirged jooned, peidetud üleminekud, arhitektuurne terviklikkus.', dRu: 'Минималистичная эстетика вне моды. Прямые линии, скрытые переходы, архитектурная цельность.' },
          { n: '02', big: '25+', tEt: 'Aastat eluiga',  tRu: 'Лет службы',              dEt: 'Alumiinium 6063-T5 — UV-kindel, niiskuskindel, korrosioonivaba. Kvaliteet, mis kestab põlvkondi.',         dRu: 'Алюминий 6063-T5 — устойчив к УФ, влаге, коррозии. Качество на поколения.' },
          { n: '03', big: 'RAL', tEt: 'Iga värvitoon',  tRu: 'Любой оттенок',           dEt: 'Pulbervärvitud mistahes RAL toonis — vastavalt teie interjööri värvilahendusele.',                           dRu: 'Порошковая окраска в любой оттенок RAL — под цветовое решение вашего интерьера.' },
        ].map((b, i) => (
          <div key={b.n} style={{ padding: '56px 40px', borderRight: i < 2 ? 'var(--border)' : 'none', display: 'flex', flexDirection: 'column' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 24 }}>{b.n} / {ru ? 'Преимущество' : 'Eelis'}</div>
            <div className="vp-display" style={{ fontSize: 120, lineHeight: 0.9, margin: '0 0 20px' }}>{b.big}</div>
            <div className="vp-display" style={{ fontSize: 32, marginBottom: 10 }}>{ru ? b.tRu : b.tEt}</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>{ru ? b.dRu : b.dEt}</p>
          </div>
        ))}
      </section>

      {/* APPLICATIONS */}
      <section style={{ padding: '80px 56px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'flex-start' }}>
          <div style={{ position: 'sticky', top: 80 }}>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '04 / Применение' : '04 / Kasutusalad'}</div>
            <h2 className="vp-display" style={{ fontSize: 72, margin: 0, lineHeight: 0.95 }}>
              {ru ? 'Потолок,' : 'Lagi,'}<br />{ru ? 'пол,' : 'põrand,'}<br />{ru ? 'стена.' : 'sein.'}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', marginTop: 24, maxWidth: 380 }}>
              {ru ? 'Стильная современная альтернатива традиционным плинтусам и потолочным решениям. Подходит и для жилья, и для коммерческих объектов.' : 'Stiilne ja kaasaegne alternatiiv traditsioonilistele põrandaliistudele ja laelahendustele. Sobib nii elamu- kui äriprojektidele.'}
            </p>
          </div>
          <div>
            {[
              { tEt: 'Lagede varjuliinid',          tRu: 'Потолочные теневые линии',        dEt: 'Peidetud ühenduskoht lae ja seina vahel — visuaalne "hõljuva lae" efekt.',              dRu: 'Скрытый стык потолка и стены — визуальный эффект «парящего потолка».' },
              { tEt: 'Minimalistlikud põrandaliistud', tRu: 'Минималистичные плинтусы',      dEt: 'Asendab traditsioonilised liistud sirgjoonelise alumiiniumprofiiliga.',                  dRu: 'Заменяет обычные плинтусы прямолинейным алюминиевым профилем.' },
              { tEt: 'LED-valgustuse integratsioon', tRu: 'Интеграция LED-подсветки',        dEt: 'Pehme, ühtlane valgus ilma nähtava plastdiffuuserita.',                                 dRu: 'Мягкий ровный свет без видимого пластикового диффузора.' },
              { tEt: 'Elamu- ja äriprojektid',       tRu: 'Жилые и коммерческие проекты',   dEt: 'Sobib nii eramutesse, korteritesse kui kontoritesse, restoranidesse, hotellidesse.',    dRu: 'Подходит для частных домов, квартир, офисов, ресторанов, отелей.' },
            ].map((it, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 20, padding: '28px 0', borderTop: '1px solid rgba(0,0,0,0.12)', alignItems: 'baseline' }}>
                <span className="vp-mono" style={{ fontSize: 13, color: 'var(--muted)' }}>0{i + 1}.</span>
                <div>
                  <div className="vp-display" style={{ fontSize: 32, marginBottom: 6, lineHeight: 1.05 }}>{ru ? it.tRu : it.tEt}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>{ru ? it.dRu : it.dEt}</p>
                </div>
                <span style={{ fontSize: 24, color: 'var(--accent)' }}>+</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LED FEATURE — dark */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', borderBottom: 'var(--border)', background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{ minHeight: 600, borderRight: '1.5px solid var(--paper)', backgroundImage: 'url("/assets/feature-led-gradient.png")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ padding: '72px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="vp-eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>{ru ? '05 / Световое решение' : '05 / Valguslahendus'}</div>
          <h2 className="vp-display" style={{ fontSize: 80, margin: 0, lineHeight: 0.92, color: 'var(--paper)' }}>
            {ru ? 'Свет,' : 'Valgus,'}<br />
            {ru ? 'который не показывает' : 'mis ei näita'}<br />
            {ru ? 'себя.' : 'ennast.'}
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.82, marginTop: 28, maxWidth: 440 }}>
            {ru ? 'Потолочные теневые профили используют ' : 'Lae varjuprofiilid kasutavad '}
            <strong>{ru ? 'отражённый LED-свет' : 'peegeldatud LED-valgust'}</strong>
            {ru ? ' — мягкий ровный градиент на стене без видимого пластикового диффузора.' : ' — pehme ja ühtlane gradient seinale ilma nähtava plastdiffuuserita.'}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'grid', gap: 14 }}>
            {(ru
              ? ['Создаёт уютную атмосферу', 'Подчёркивает архитектуру помещения', 'Визуально увеличивает ощущение пространства', 'Идеально подходит для современного дома']
              : ['Loob hubase atmosfääri', 'Rõhutab ruumi arhitektuuri', 'Suurendab visuaalselt ruumitunnet', 'Sobib ideaalselt modernsesse kodusse']
            ).map((l) => (
              <li key={l} style={{ display: 'flex', gap: 14, alignItems: 'baseline', fontSize: 16, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono', fontSize: 13 }}>↳</span>
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MATERIAL SPECS */}
      <section style={{ padding: '80px 56px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '06 / Материал' : '06 / Materjal'}</div>
            <h2 className="vp-display" style={{ fontSize: 80, margin: 0, lineHeight: 0.92 }}>
              {ru ? 'Алюминий.' : 'Alumiinium.'}<br />{ru ? 'Идеальный выбор.' : 'Ideaalne valik.'}
            </h2>
          </div>
          <div className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.1em', textAlign: 'right', maxWidth: 280 }}>
            {ru ? 'Алюминий 6063-T5' : '6063-T5 alumiinium'}<br />{ru ? 'Стандарт EN 755-2' : 'EN 755-2 standard'}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', borderTop: 'var(--border)', borderLeft: 'var(--border)' }}>
          {[
            { ic: '⚖', tEt: 'Kerge, kuid tugev',  tRu: 'Лёгкий, но прочный' },
            { ic: '≈', tEt: 'Niiskuskindel',       tRu: 'Влагостойкий' },
            { ic: '☀', tEt: 'UV-kindel',           tRu: 'УФ-стойкий' },
            { ic: '⊘', tEt: 'Korrosioonivaba',     tRu: 'Без коррозии' },
            { ic: '∞', tEt: 'Pika elueaga',        tRu: 'Долгий срок службы' },
            { ic: '↻', tEt: 'Taaskasutatav',       tRu: 'Перерабатываемый' },
          ].map((p, i) => (
            <div key={p.ic} style={{ padding: '40px 24px', borderRight: 'var(--border)', borderBottom: 'var(--border)', background: i % 2 === 0 ? 'var(--paper)' : 'var(--paper-2)' }}>
              <div className="vp-display" style={{ fontSize: 64, lineHeight: 1, marginBottom: 18, color: 'var(--accent)' }}>{p.ic}</div>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{ru ? p.tRu : p.tEt}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RAL COLORS */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', borderBottom: 'var(--border)' }}>
        <div style={{ padding: '72px 56px', borderRight: 'var(--border)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '07 / Цвет' : '07 / Värvus'}</div>
          <h2 className="vp-display" style={{ fontSize: 64, margin: 0, lineHeight: 0.95 }}>
            {ru ? 'Любой оттенок RAL.' : 'Iga RAL toon.'}<br />{ru ? 'Ваш интерьер.' : 'Sinu interjöör.'}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', marginTop: 24, maxWidth: 400 }}>
            {ru ? 'Порошковая окраска по RAL — профили идеально вписываются в стиль и цветовое решение интерьера.' : 'Pulbervärvimine vastavalt RAL toonidele — profiilid sobituvad ideaalselt interjööri üldise stiili ja värvilahendusega.'}
          </p>
          <div className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)', marginTop: 32, letterSpacing: '0.08em' }}>
            {ru ? 'Со склада · 1–3 дня' : 'Laos olev kaup · 1–3 päeva'}<br />{ru ? 'Под заказ · 4–5 недель' : 'Eritellimus · 4–5 nädalat'}
          </div>
        </div>
        <div style={{ padding: '56px 48px', background: 'var(--paper-2)' }}>
          <div className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: 18 }}>{ru ? 'Популярные оттенки' : 'Populaarsemad toonid'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
            {[
              { ral: '9005', n: ru ? 'Глубокий чёрный' : 'Sügav must',    c: '#0a0a0a' },
              { ral: '9011', n: ru ? 'Графитовый чёрный' : 'Grafiitmust', c: '#1c1c1c' },
              { ral: '7016', n: ru ? 'Антрацит' : 'Antratsiit',           c: '#373f43' },
              { ral: '7022', n: ru ? 'Умбра' : 'Umbra',                   c: '#534c43' },
              { ral: '7037', n: ru ? 'Тёмно-серый' : 'Tumehall',          c: '#6f7376' },
              { ral: '9006', n: ru ? 'Серебро' : 'Hõbe',                  c: '#a4a4a4' },
              { ral: '7035', n: ru ? 'Светло-серый' : 'Helehall',         c: '#cdd0cf' },
              { ral: '9001', n: ru ? 'Кремово-белый' : 'Kreemvalge',      c: '#efe6d3' },
              { ral: '1015', n: ru ? 'Светло-бежевый' : 'Helebeež',       c: '#e6d2b0' },
              { ral: '1013', n: ru ? 'Перламутровый' : 'Pärlvalge',       c: '#eae6da' },
              { ral: '9016', n: ru ? 'Транспортный белый' : 'Liiklusvalge', c: '#f3f3f0' },
              { ral: '9010', n: ru ? 'Чисто белый' : 'Puhasvalge',        c: '#fafaf2' },
            ].map((s) => (
              <div key={s.ral}>
                <div style={{ aspectRatio: '1', background: s.c, border: 'var(--border)', marginBottom: 6 }} />
                <div className="vp-mono" style={{ fontSize: 9, color: 'var(--muted)' }}>RAL {s.ral}</div>
                <div style={{ fontSize: 11, fontWeight: 500 }}>{s.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTALLATION */}
      <section style={{ padding: '80px 56px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '08 / Монтаж' : '08 / Paigaldus'}</div>
            <h2 className="vp-display" style={{ fontSize: 80, margin: 0, lineHeight: 0.92 }}>{ru ? 'Просто. Точно.' : 'Lihtne. Täpne.'}</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--ink)', border: 'var(--border)' }}>
          {[
            { n: '01', tEt: 'Mõõdistamine',         tRu: 'Замеры',          dEt: 'Mõõda vastavalt projekti joonisele jooksvad meetrid profiili, mida vajad.', dRu: 'Измерьте по проекту погонные метры профиля, которые нужны.' },
            { n: '02', tEt: 'Vali profiil + toon',  tRu: 'Профиль + цвет', dEt: 'Vali profiilitüüp ja sobiv toon — laos olev toode või RAL eritellimus.',     dRu: 'Выберите тип профиля и оттенок — складской товар или RAL под заказ.' },
            { n: '03', tEt: 'Tarne',                tRu: 'Доставка',        dEt: 'Laos: 1–3 päeva. Eritellimus: ~4 nädalat. Venipakiga otse kliendi aadressile.', dRu: 'Со склада: 1–3 дня. Под заказ: ~4 недели. Venipak на адрес клиента.' },
            { n: '04', tEt: 'Paigaldus',            tRu: 'Монтаж',          dEt: 'Paigaldab tavaliselt ehitusettevõte. Vajadusel juhendame paigaldajat.', dRu: 'Обычно монтирует строительная компания. При необходимости консультируем монтажника.' },
          ].map((s) => (
            <div key={s.n} style={{ background: 'var(--paper)', padding: '32px 28px', minHeight: 240 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
                <span className="vp-display" style={{ fontSize: 48, lineHeight: 1, color: 'var(--accent)' }}>{s.n}</span>
                <span style={{ fontSize: 18, color: 'var(--muted)' }}>→</span>
              </div>
              <div className="vp-display" style={{ fontSize: 28, marginBottom: 10, lineHeight: 1.05 }}>{ru ? s.tRu : s.tEt}</div>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>{ru ? s.dRu : s.dEt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding: '96px 56px', borderBottom: 'var(--border)', background: 'var(--paper-2)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 24, textAlign: 'center' }}>{ru ? '09 / Почему мы' : '09 / Miks meie'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: 'var(--border)', background: 'var(--paper)' }}>
            {[
              { big: '5+', eyEt: 'aastat tootmist', eyRu: 'лет производства', dEt: 'Eesti tehases — alumiiniumi pressimine, lõikamine, viimistlus.', dRu: 'На эстонском заводе — прессование алюминия, резка, отделка.' },
              { big: 'RAL', eyEt: 'mistahes toon', eyRu: 'любой оттенок', dEt: 'Pulbervärvimine eritellimusel — ~4–5 nädalat.', dRu: 'Порошковая окраска под заказ — ~4–5 недель.' },
              { big: '1:1', eyEt: 'tehniline tugi', eyRu: 'техподдержка', dEt: 'Arhitektidele ja ehitajatele — paigaldusjoonised, näidised, projektikonsultatsioon.', dRu: 'Для архитекторов и строителей — монтажные чертежи, образцы, проектная консультация.' },
            ].map((b, i) => (
              <div key={b.big} style={{ padding: '40px 32px', borderRight: i < 2 ? 'var(--border)' : 'none' }}>
                <div className="vp-display" style={{ fontSize: 64, lineHeight: 1, marginBottom: 12, color: 'var(--accent)' }}>{b.big}</div>
                <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{ru ? b.eyRu : b.eyEt}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>{ru ? b.dRu : b.dEt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)' }}>
        <div style={{ padding: '72px 56px', borderRight: 'var(--border)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '10 / Наше обещание' : '10 / Meie lubadus'}</div>
          <h2 className="vp-display" style={{ fontSize: 72, margin: 0, lineHeight: 0.92 }}>
            {ru ? 'Создаём интерьеры на поколения.' : 'Loome interjööre mitmeks põlvkonnaks.'}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', marginTop: 24, maxWidth: 440 }}>
            {ru
              ? 'Качественный интерьер объединяет эстетику, функциональность и долговечность. Многолетний опыт + продуманные решения = отвечаем самым требовательным дизайн-идеям.'
              : 'Kvaliteetne sisekujundus ühendab esteetika, funktsionaalsuse ja kestvuse. Pikaajaline kogemus + läbimõeldud lahendused = vastame ka kõige nõudlikumatele disainiideedele.'}
          </p>
        </div>
        <div style={{ padding: '48px 0' }}>
          {[
            { tEt: 'Professionaalne nõustamine',      tRu: 'Профессиональная консультация', dEt: 'Tasuta 1:1 konsultatsioon spetsialistiga.',               dRu: 'Бесплатная 1:1 консультация со специалистом.' },
            { tEt: 'Kvaliteetsed materjalid',          tRu: 'Качественные материалы',        dEt: 'Alumiinium 6063-T5, garantii 5 aastat.',                  dRu: 'Алюминий 6063-T5, гарантия 5 лет.' },
            { tEt: 'Innovatiivsed lahendused',         tRu: 'Инновационные решения',          dEt: 'CAD-failid, paigaldusvideod, B2B tugi.',                  dRu: 'CAD-файлы, видео монтажа, B2B-поддержка.' },
            { tEt: 'Kaasaegne minimalistlik disain',   tRu: 'Современный минималистичный дизайн', dEt: 'Ajatu esteetika, mis ei lähe moest.',              dRu: 'Вневременная эстетика, не выходящая из моды.' },
            { tEt: 'Kõrge viimistluskvaliteet',        tRu: 'Высокое качество отделки',      dEt: 'Kontrollitud iga partii enne saadetist.',                 dRu: 'Каждая партия проверяется перед отправкой.' },
          ].map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 18, padding: '18px 56px 18px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.12)', alignItems: 'center' }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>✓</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 2 }}>{ru ? p.tRu : p.tEt}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>{ru ? p.dRu : p.dEt}</div>
              </div>
              <span style={{ color: 'var(--muted)', fontSize: 18 }}>→</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '72px 56px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '11 / Частые вопросы' : '11 / Korduvad küsimused'}</div>
            <h2 className="vp-display" style={{ fontSize: 48, margin: 0, lineHeight: 0.95 }}>
              {ru ? 'Знакомитесь' : 'Uurid'}<br />{ru ? 'впервые?' : 'esmakordselt?'}
            </h2>
            <Link href={`${pfx}/kkk`} className="vp-btn vp-btn--ghost" style={{ display: 'inline-block', marginTop: 24 }}>{ru ? 'Все вопросы →' : 'Kõik KKK-d →'}</Link>
          </div>
          <div>
            {faqItems.map(([q, a], i) => (
              <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ padding: '20px 0', borderTop: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 17, fontWeight: 600 }}>{q}</span>
                  <span style={{ fontSize: 22, lineHeight: 1, color: openFaq === i ? 'var(--ink)' : 'var(--muted)' }}>{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: '12px 0 0', maxWidth: 640 }}>{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '120px 56px', textAlign: 'center', background: 'var(--ink)', color: 'var(--paper)', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>{ru ? 'Готовы начать?' : 'Valmis alustama?'}</div>
        <h2 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 180px)', margin: 0, lineHeight: 0.88, color: 'var(--paper)' }}>
          {ru ? 'Чистая, современная,' : 'Puhas, modernne,'}<br />
          <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.6em' }}>{ru ? 'вневременная' : 'ajatu'}</span>{' '}
          {ru ? 'отделка.' : 'viimistlus.'}
        </h2>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 48, flexWrap: 'wrap' }}>
          <Link href={`${pfx}/tooted`} className="vp-btn vp-btn--lg" style={{ background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)' }}>
            {ru ? 'Смотреть все товары →' : 'Vaata kõiki tooteid →'}
          </Link>
        </div>
        <p style={{ marginTop: 32, fontSize: 13, opacity: 0.6, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {ru ? 'Бесплатная доставка от 200 € · Возврат 14 дней · Гарантия 5 лет' : 'Tasuta tarne ülalt 200 € · Tagastusõigus 14 päeva · Garantii 5 aastat'}
        </p>
      </section>
    </div>
  );
}
