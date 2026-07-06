import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import { products } from '@/lib/catalog';
import { getProductImagePath } from '@/lib/productImages';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const ru = locale === 'ru';
  return {
    title: ru
      ? 'LED теневые профили — LED профили для потолка и пола'
      : 'LED varjuprofiilid – LED laeprofiilid ja LED põrandaprofiilid',
    description: ru
      ? 'LED теневые профили — алюминиевые профили с каналом для LED-ленты. Для потолка, пола, стены, центрального потолка. Склад в Таллинне, доставка по Эстонии.'
      : 'LED varjuprofiilid — alumiiniumprofiilid LED-riba paigalduseks. Laele, põrandale, seinale, kesklakke. Ladu Tallinnas, tarne üle Eesti.',
    alternates: {
      canonical: 'https://varjuprofiilid.ee/led-varjuprofiilid',
      languages: {
        et: 'https://varjuprofiilid.ee/led-varjuprofiilid',
        ru: 'https://varjuprofiilid.ee/ru/led-profili',
      },
    },
  };
}

const SUBCATEGORIES = [
  {
    slugEt: 'lae', slugRu: 'potolok',
    labelEt: 'Lae LED varjuprofiilid', labelRu: 'Потолочные LED профили',
    descEt: 'Paigaldatakse lae ja seina ühenduskohta. Hõljuva lae efekt + pehme LED-perimeetrivalgustus.',
    descRu: 'Монтируются на стыке потолка и стены. Эффект парящего потолка + мягкая LED-периметральная подсветка.',
    skus: ['LHV10', 'AST22', 'AST30', 'AST50', 'AST35', 'AST201', 'RST14', 'RST22', 'RST25'],
    n: '01',
  },
  {
    slugEt: 'poranda', slugRu: 'pol',
    labelEt: 'Põranda LED varjuprofiilid', labelRu: 'Напольные LED профили',
    descEt: 'Asendab põrandaliistu, lisab pehme peitevalgustuse põranda servale.',
    descRu: 'Заменяет плинтус, добавляет мягкую скрытую подсветку вдоль пола.',
    skus: ['ASP102', 'ASPL35', 'ASPL60', 'ASPL100', 'ASPL130', 'ASP904', 'ASP905', 'ASP238'],
    n: '02',
  },
  {
    slugEt: 'seina', slugRu: 'stena',
    labelEt: 'Seina LED varjuprofiilid', labelRu: 'Настенные LED профили',
    descEt: 'Seinasiseste pindade üleminekud, ukse- ja aknakosraamid LED-valgusega.',
    descRu: 'Переходы внутри стен, обрамление дверей и окон с LED-подсветкой.',
    skus: ['ASP410', 'ASP610', 'ASPL35', 'ASPL60', 'ASP106'],
    n: '03',
  },
  {
    slugEt: 'kesklae', slugRu: 'centralnyj',
    labelEt: 'Kesklae LED varjuprofiilid', labelRu: 'LED профили для центрального потолка',
    descEt: 'Paigaldatakse lae keskele dekoratiivseks valgusreaks, ringiks või muu kujundina.',
    descRu: 'Монтируются в центр потолка как декоративная световая линия, кольцо или иная форма.',
    skus: ['RST14', 'RST22', 'RST25', 'RST40', 'RST1020'],
    n: '04',
  },
];

const FAQ = [
  {
    q: 'Mis vahe on LED varjuprofiilil ja tavalisel LED profiilil?',
    a: 'LED varjuprofiil ühendab kaks funktsiooni: loob arhitektuurse varjujoone ja peidab LED-riba. Tavaline LED profiil on ainult valgustuse kandja. LED varjuprofiilide puhul on varjujoon sama oluline kui valgustus.',
  },
  {
    q: 'Millise LED-riba valida?',
    a: 'Laeprofiilide jaoks: 12 W/m · 234 LED/m · 3000K · 24V. Põranda ja seina profiilide jaoks: COB 16 W/m · 1350 lm/m · CRI 94 · 24V. Alati vali 24V (mitte 12V) pinge — vähem pingelangust pikkadel jooksudel.',
  },
  {
    q: 'Kas LED varjuprofiilid sobivad niiskesse ruumi?',
    a: 'Laeprofiilid: vali IP44-sertifitseeritud LED-riba (aurustumisel kaitseb). Põrandaprofiilid: vali IP65 (veepritsmete korral kaitseb). Alumiiniumprofiiil ise talub niiskust ilma korrosioonita.',
  },
  {
    q: 'Kas LED-riba tuleb eraldi osta?',
    a: 'Jah — LED-riba ja hajuti on eraldi tellimusel. Profiilid on ühilduvad enamiku 24V LED-ribadega. Küsi meie soovitust, milline sobib sinu konkreetsele profiilikonfiguratsioonile.',
  },
  {
    q: 'Milline värvitemperatuur valida?',
    a: '2700K — soe, kodune, sobib magamistubadesse ja elutubadesse. 3000K — universaalne, sobib enamikku ruumidesse. 4000K — neutraalne valge, sobib kontoritesse ja vannitubadesse.',
  },
];

export default async function LedVarjuprofiilid() {
  const locale = await getLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  const ledProducts = products.filter((p) =>
    p.urlPath.startsWith('/led-varjuprofiilid/')
  ).slice(0, 8);

  return (
    <div>
      {/* Breadcrumb */}
      <section style={{ padding: '32px 56px 0', borderBottom: 'none' }}>
        <div className="vp-eyebrow">
          <Link href={pfx || '/'}>{ru ? 'Главная' : 'Avaleht'}</Link>
          {' / '}
          <span style={{ color: 'var(--ink)' }}>{ru ? 'LED теневые профили' : 'LED varjuprofiilid'}</span>
        </div>
      </section>

      {/* Hero */}
      <section style={{ padding: '48px 56px 64px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
              {ru ? 'Sammas 1 · LED с интегрированной подсветкой' : 'Sammas 1 · LED-valgustusega profiilid'}
            </div>
            <h1 className="vp-display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', margin: '0 0 24px', lineHeight: 0.9 }}>
              {ru ? 'LED теневые профили.' : 'LED varjuprofiilid.'}
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-2)', maxWidth: 520, marginBottom: 32 }}>
              {ru
                ? 'LED теневые профили — алюминиевые профили с каналом для LED-ленты. Одно решение даёт намеренную теневую линию и интегрированное освещение. В Эстонии также известны как LED-профиль для потолка, LED-профиль для пола, LED-профиль скрытого монтажа.'
                : 'LED varjuprofiilid on alumiiniumprofiilid, mille soonde paigaldatakse LED-riba — nii saad ühe lahendusega tahtliku varjujoone ja integreeritud valgustuse. Eesti turul tuntakse neid ka kui LED laeprofiile, LED põrandaprofiile või LED süvisprofiile.'}
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href={`${pfx}/tooted`} className="vp-btn vp-btn--lg">{ru ? 'Все товары →' : 'Vaata kõiki →'}</Link>
              <Link href={`${pfx}/mis-on-varjuprofiil`} className="vp-btn vp-btn--ghost">{ru ? 'Что такое теневой профиль?' : 'Mis on varjuprofiil?'}</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--ink)', border: 'var(--border)', alignSelf: 'start' }}>
            {(['LED laeprofiil', 'LED põrandaprofiil', 'LED süvisprofiil', 'LED varjuprofiil'] as const).map((term, i) => (
              <div key={i} style={{ background: 'var(--paper)', padding: '20px 18px' }}>
                <div className="vp-mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                  {ru ? 'Термин' : 'Termin'} {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{term}</div>
                <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>{ru ? '= LED теневой профиль' : '= LED varjuprofiil'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-categories */}
      <section style={{ padding: '64px 56px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
          {ru ? 'LED профили по месту установки' : 'LED varjuprofiilid asukoha järgi'}
        </div>
        <h2 className="vp-display" style={{ fontSize: 64, margin: '0 0 40px', lineHeight: 0.92 }}>
          {ru ? 'Потолок, пол, стена, центр.' : 'Lagi, põrand, sein, kesklagi.'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--ink)', border: 'var(--border)' }}>
          {SUBCATEGORIES.map((cat) => {
            const href = `${pfx}/led-varjuprofiilid/${cat.slugEt}/`;
            return (
              <Link key={cat.slugEt} href={href} style={{ display: 'block', background: 'var(--paper)', padding: '36px 32px', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                  <span className="vp-display" style={{ fontSize: 48, lineHeight: 1, color: 'var(--accent)' }}>{cat.n}</span>
                  <span style={{ fontSize: 20 }}>→</span>
                </div>
                <div className="vp-display" style={{ fontSize: 32, marginBottom: 8 }}>{ru ? cat.labelRu : cat.labelEt}</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: '0 0 14px' }}>{ru ? cat.descRu : cat.descEt}</p>
                <div className="vp-mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {cat.skus.slice(0, 4).join(' · ')} {cat.skus.length > 4 ? `+${cat.skus.length - 4}` : ''}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      {ledProducts.length > 0 && (
        <section style={{ padding: '64px 56px', borderBottom: 'var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{ru ? 'Популярные LED профили' : 'Populaarsed LED varjuprofiilid'}</div>
              <h2 className="vp-display" style={{ fontSize: 48, margin: 0 }}>{ru ? 'Выбор покупателей' : 'Ostjate valik'}</h2>
            </div>
            <Link href={`${pfx}/tooted`} style={{ fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: 'var(--border)', paddingBottom: 2, color: 'var(--ink)', textDecoration: 'none' }}>
              {ru ? 'Все товары →' : 'Kõik tooted →'}
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {ledProducts.map((p) => {
              const img = getProductImagePath(p.sku);
              const href = ru ? `/ru${p.urlPathRu}` : p.urlPath;
              return (
                <Link key={p.sku} href={href} style={{ border: 'var(--border)', display: 'block', textDecoration: 'none', color: 'inherit', background: 'var(--paper)' }}>
                  <div style={{ aspectRatio: '1', borderBottom: 'var(--border)', background: 'var(--paper-2)', overflow: 'hidden' }}>
                    {img && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt={p.sku} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    )}
                    {!img && <span className="label">{p.sku.toLowerCase()}</span>}
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div className="vp-mono" style={{ fontSize: 11, marginBottom: 3 }}>{p.sku}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>{ru ? p.seoNameRu : p.seoName}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>{p.price.toFixed(2).replace('.', ',')} {ru ? '€/пог.м' : '€/m'}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* How to choose */}
      <section style={{ padding: '64px 56px', borderBottom: 'var(--border)', background: 'var(--paper-2)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Как выбрать' : 'Kuidas valida'}</div>
            <h2 className="vp-display" style={{ fontSize: 56, margin: 0, lineHeight: 0.92 }}>
              {ru ? 'Четыре вопроса.' : 'Neli küsimust.'}
            </h2>
          </div>
          <div>
            {[
              { n: '01', qEt: 'Kuhu paigaldad?', qRu: 'Куда монтируешь?', aEt: 'Lagi, põrand, sein või kesklagi — see on esimene valik. Iga asukoht vajab erinevat profiili.', aRu: 'Потолок, пол, стена или центральный потолок — первый выбор. Каждое место требует своего профиля.' },
              { n: '02', qEt: 'Milline LED-riba?', qRu: 'Какая LED-лента?', aEt: 'Laeprofiilile: 12 W/m · 234 LED/m · 3000K · 24V. Põranda profiilile: COB 16 W/m · CRI 94 · 24V.', aRu: 'Для потолка: 12 Вт/м · 234 LED/м · 3000K · 24V. Для пола: COB 16 Вт/м · CRI 94 · 24V.' },
              { n: '03', qEt: 'Milline värv?', qRu: 'Какой цвет?', aEt: 'Must ja valge — laos 2–4 tööpäeva. RAL-eritoon pulbervärvitud — 4–5 nädalat. Anodeeritud hõbe — laos.', aRu: 'Чёрный и белый — со склада 2–4 рабочих дня. RAL-порошковая окраска — 4–5 недель. Анодированное серебро — на складе.' },
              { n: '04', qEt: 'Kui palju meetreid?', qRu: 'Сколько метров?', aEt: 'Mõõda ühenduskoha pikkus + 10% varu. Standard-pikkused 2,5 m (laeprofiilid) ja 2,6 m (põrandaprofiilid).', aRu: 'Замерь длину стыка + запас 10%. Стандартные длины 2,5 м (потолочные) и 2,6 м (напольные).' },
            ].map((q) => (
              <div key={q.n} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16, padding: '16px 0', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <span className="vp-display" style={{ fontSize: 32, lineHeight: 1, color: 'var(--accent)' }}>{q.n}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{ru ? q.qRu : q.qEt}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{ru ? q.aRu : q.aEt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '64px 56px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Часто задаваемые вопросы' : 'Korduma kippuvad küsimused'}</div>
        <h2 className="vp-display" style={{ fontSize: 56, margin: '0 0 40px', lineHeight: 0.92 }}>
          {ru ? 'KKK · LED профили.' : 'KKK · LED varjuprofiilid.'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--ink)', border: 'var(--border)' }}>
          {FAQ.map((item, i) => (
            <div key={i} style={{ background: 'var(--paper)', padding: '28px 24px' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{item.q}</div>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal links */}
      <section style={{ padding: '48px 56px', borderBottom: 'var(--border)', background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="vp-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>{ru ? 'Смотрите также:' : 'Vaata ka:'}</span>
          {[
            { hrefEt: '/varjuprofiilid/', labelEt: 'Dekoratiivsed varjuprofiilid', labelRu: 'Декоративные теневые профили' },
            { hrefEt: '/mis-on-varjuprofiil/', labelEt: 'Mis on varjuprofiil?', labelRu: 'Что такое теневой профиль?' },
            { hrefEt: '/alumiinium-porandaliistud/', labelEt: 'Alumiinium põrandaliistud', labelRu: 'Алюминиевые плинтусы' },
            { hrefEt: '/tooted/', labelEt: 'Kõik tooted', labelRu: 'Все товары' },
          ].map((l) => (
            <Link key={l.hrefEt} href={`${pfx}${l.hrefEt}`} style={{ color: 'var(--paper)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: 2, fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {ru ? l.labelRu : l.labelEt}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
