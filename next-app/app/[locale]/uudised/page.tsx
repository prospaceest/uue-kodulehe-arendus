'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

const POSTS = [
  { id: 'varjuprofiil-pohjalik-juhend',  feat: true,  catEt: 'Juhend',       catRu: 'Гид',           yearEt: '2026 · mai',   yearRu: '2026 · май',   read: '10 min', cover: '/assets/projects/eduardi-maja/00-home-cover.png', titleEt: 'Põrandaliist, mida sa ei märka: täisjuhend varjuprofiilide valikule (2026)', titleRu: 'Плинтус, который не замечают: полный гид по выбору теневых профилей (2026)', excerptEt: 'Mis on varjuprofiil, kuidas see asendab põrandaliistu ja millised tüübid sobivad Eesti korterisse? Tüübid, hinnad, paigaldus ja kolm levinud viga.', excerptRu: 'Что такое теневой профиль, как он заменяет плинтус и какие типы подходят для эстонской квартиры? Типы, цены, монтаж и три распространённые ошибки.' },
  { id: 'varjuprofiili-tuubid',           feat: false, catEt: 'Tüübivalik',   catRu: 'Типы',          yearEt: '2026 · apr',   yearRu: '2026 · апр',   read: '7 min',  cover: '/assets/projects/tallinna-korter/00-home-cover.png', titleEt: 'Varjuprofiilide erinevad tüübid: juhend kaasaegseks siseviimistluseks',    titleRu: 'Разные типы теневых профилей: гид по современной отделке',    excerptEt: 'Standardne, LED-iga ja MDF-täitega varjuprofiil — kolm peamist lahendust, paigaldusnõuanded ja kasutusalad.',  excerptRu: 'Стандартный, с LED и с MDF-заполнением — три основных решения, советы по монтажу и применению.' },
  { id: 'peitliist-interjooris',          feat: false, catEt: 'Disain',       catRu: 'Дизайн',        yearEt: '2026 · märts', yearRu: '2026 · март',  read: '7 min',  cover: '/assets/projects/viimsi-vannituba/00-home-cover.png', titleEt: 'Mis on varjuprofiil ja kuidas seda interjööris kasutada?',                 titleRu: 'Что такое теневой профиль и как использовать в интерьере?',   excerptEt: 'Definitsioon, peamised eelised, lihtne paigaldus ja viis loovat võimalust varjuprofiili interjööris kasutada.', excerptRu: 'Определение, главные преимущества, простой монтаж и пять творческих способов применения.' },
  { id: 'varjuprofiil-vs-porandaliist',   feat: false, catEt: 'Võrdlus',      catRu: 'Сравнение',     yearEt: '2026 · märts', yearRu: '2026 · март',  read: '5 min',  cover: '/assets/projects/showroom-elutuba.jpg', titleEt: 'Varjuprofiil vs. põrandaliist: kumb valida?',                              titleRu: 'Теневой профиль vs. плинтус: что выбрать?',                   excerptEt: 'Võrdleme mõlemat lahendust hinna, paigalduse ja välimuse poolest.',                               excerptRu: 'Сравниваем оба решения по цене, монтажу и внешнему виду.' },
  { id: 'varjuvuuk-kogu-ruumis',          feat: false, catEt: 'Inspiratsioon', catRu: 'Вдохновение',  yearEt: '2026 · veebr', yearRu: '2026 · фев',   read: '8 min',  cover: '/assets/projects/showroom-kook.jpg', titleEt: 'Varjuvuuk kogu ruumis: lagi, sein, põrand ühes kontseptsioonis',           titleRu: 'Теневой шов по всему помещению: потолок, стена, пол в единой концепции', excerptEt: 'Kuidas saavutada ühtne, puhas joonte süsteem kogu toas.',              excerptRu: 'Как добиться единой чистой системы линий во всей комнате.' },
  { id: 'varjuvuuk-eesti-standard',       feat: false, catEt: 'Tehniline',    catRu: 'Технический',   yearEt: '2026 · jaan',  yearRu: '2026 · янв',   read: '6 min',  cover: '/assets/projects/showroom-vannituba.jpg', titleEt: 'Varjuvuuk Eesti ehitusstandardites: mida peab teadma?',                    titleRu: 'Теневой шов в строительных стандартах Эстонии: что нужно знать?', excerptEt: 'Millised nõuded kehtivad profiilide paigaldusele Eestis.',         excerptRu: 'Какие требования действуют к монтажу профилей в Эстонии.' },
  { id: 'porandaliistu-stiilid-2026',     feat: false, catEt: 'Trend',        catRu: 'Тренды',        yearEt: '2025 · dets',  yearRu: '2025 · дек',   read: '5 min',  cover: '/assets/projects/projekt01.webp', titleEt: 'Põrandaliistu stiilid 2026: 5 trendi, mis kujundavad siseviimistlust',     titleRu: 'Стили плинтусов 2026: 5 трендов, которые формируют современную отделку', excerptEt: 'Milliseid põrandaliistu stiile eelistavad Eesti sisearhitektid 2026. aastal.', excerptRu: 'Какие стили плинтусов предпочитают эстонские дизайнеры в 2026 году.' },
  { id: 'peitliist-eelised-7-pohjust',    feat: false, catEt: 'Juhend',       catRu: 'Гид',           yearEt: '2025 · nov',   yearRu: '2025 · ноя',   read: '4 min',  cover: '/assets/projects/projekt02.webp', titleEt: '7 põhjust, miks kasutada peitliistu tavalise põrandaliistu asemel',        titleRu: '7 причин использовать скрытый плинтус вместо обычного',       excerptEt: 'Argumendid, miks varjuprofiil on parem lahendus kui traditsiooniline põrandaliist.', excerptRu: 'Аргументы в пользу теневого профиля по сравнению с традиционным плинтусом.' },
];

export default function BlogIndexPage() {
  const locale = useLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  const [activeCat, setActiveCat] = useState(ru ? 'Все' : 'Kõik');
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const cats = Array.from(new Set(POSTS.map((p) => ru ? p.catRu : p.catEt)));
  const allLabel = ru ? 'Все' : 'Kõik';

  const filtered = useMemo(() => {
    let items = POSTS;
    if (activeCat !== allLabel) {
      items = items.filter((p) => (ru ? p.catRu : p.catEt) === activeCat);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((p) => (ru ? p.titleRu + p.excerptRu : p.titleEt + p.excerptEt).toLowerCase().includes(q));
    }
    return items;
  }, [activeCat, search, ru, allLabel]);

  const feat = POSTS.find((p) => p.feat);
  const rest = filtered.filter((p) => !p.feat || activeCat !== allLabel || search);

  return (
    <div>
      {/* Header */}
      <section style={{ padding: '56px 56px 32px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          {ru ? 'Журнал' : 'Uudised'} · {POSTS.length} {ru ? 'статей' : 'artiklit'}
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: 0, lineHeight: 0.9 }}>
          {ru ? 'Журнал.' : 'Uudised.'}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 680, marginTop: 18 }}>
          {ru
            ? 'Гайды, сравнения и практические советы. Каждая статья проверена в нашем салоне и опробована монтажниками.'
            : 'Juhendid, võrdlused ja praktilised nõuanded. Iga artikkel — testitud meie salongis, kontrollitud paigaldajate poolt.'}
        </p>
      </section>

      {/* Category filter + search */}
      <section style={{ padding: '24px 56px', borderBottom: 'var(--border)', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => setActiveCat(allLabel)} className={`vp-chip${activeCat === allLabel ? ' vp-chip--active' : ''}`}>{allLabel}</button>
        {cats.map((c) => (
          <button key={c} onClick={() => setActiveCat(c)} className={`vp-chip${activeCat === c ? ' vp-chip--active' : ''}`}>{c}</button>
        ))}
        <input
          className="vp-input"
          placeholder={ru ? 'Поиск статьи...' : 'Otsi artiklit...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: 'auto', maxWidth: 240 }}
        />
      </section>

      {/* Featured article — only when no filter active */}
      {feat && activeCat === allLabel && !search && (
        <section style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', borderBottom: 'var(--border)', minHeight: 520 }}>
          <Link href={`${pfx}/uudised/${feat.id}`} style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ height: '100%', minHeight: 520, backgroundImage: `url("${feat.cover}")`, backgroundSize: 'cover', backgroundPosition: 'center', borderRight: 'var(--border)' }} />
          </Link>
          <div style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
                ★ {ru ? 'Главная статья' : 'Esiletõstetud'} · {ru ? feat.catRu : feat.catEt} · {ru ? feat.yearRu : feat.yearEt}
              </div>
              <h2 className="vp-display" style={{ fontSize: 56, lineHeight: 0.95, margin: '0 0 22px' }}>
                {ru ? feat.titleRu : feat.titleEt}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: 520 }}>
                {ru ? feat.excerptRu : feat.excerptEt}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
              <span className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{feat.read} {ru ? 'чтение' : 'lugemine'}</span>
              <Link href={`${pfx}/uudised/${feat.id}`} className="vp-btn">
                {ru ? 'Читать статью →' : 'Loe artiklit →'}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Article grid */}
      <section style={{ padding: '48px 56px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, borderBottom: 'var(--border)' }}>
        {(activeCat === allLabel && !search ? rest : filtered).map((p) => (
          <Link key={p.id} href={`${pfx}/uudised/${p.id}`} style={{ display: 'flex', flexDirection: 'column', gap: 14, textDecoration: 'none', color: 'inherit' }}>
            <div style={{ aspectRatio: '4/3', border: 'var(--border)', overflow: 'hidden', backgroundImage: `url("${p.cover}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="vp-eyebrow">{ru ? p.catRu : p.catEt} · {ru ? p.yearRu : p.yearEt} · {p.read}</div>
            <div className="vp-display" style={{ fontSize: 30, lineHeight: 1, margin: 0 }}>{ru ? p.titleRu : p.titleEt}</div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)' }}>{ru ? p.excerptRu : p.excerptEt}</div>
            <span style={{ fontSize: 12, color: 'var(--ink)', borderBottom: 'var(--border)', alignSelf: 'flex-start', paddingBottom: 2, fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>
              {ru ? 'Читать →' : 'Loe →'}
            </span>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '80px 0', textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono', fontSize: 13 }}>
            {ru ? 'Статей не найдено.' : 'Artikleid ei leitud.'}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section style={{ padding: '72px 56px', background: 'var(--ink)', color: 'var(--paper)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', opacity: 0.6, marginBottom: 10 }}>Newsletter</div>
          <h2 className="vp-display" style={{ fontSize: 64, margin: 0, lineHeight: 0.95 }}>
            {ru ? 'Одно письмо в месяц.' : 'Üks meil kuus.'}<br />{ru ? 'Ноль спама.' : 'Null spämmi.'}
          </h2>
        </div>
        <div>
          <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.85, marginBottom: 18, maxWidth: 440 }}>
            {ru
              ? 'Новые проекты, сезонные цветовые решения, акции. Бесплатно. Отписаться можно в любой момент.'
              : 'Uued projektid, hooaja värvilahendused, sooduspakkumised. Tasuta. Lahkud millal tahad.'}
          </p>
          {newsletterSent ? (
            <div className="vp-mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
              ✓ {ru ? 'Подписка оформлена!' : 'Telli õnnestus!'}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="vp-input"
                placeholder={ru ? 'ваш@email.ee' : 'su@meil.ee'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ background: 'transparent', border: '1.5px solid var(--paper)', color: 'var(--paper)' }}
              />
              <button className="vp-btn" style={{ background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)', whiteSpace: 'nowrap' }} onClick={() => email && setNewsletterSent(true)}>
                {ru ? 'Подписаться →' : 'Liitu →'}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
