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
      ? 'Теневые профили – декоративные алюминиевые профили для потолка, стены, пола'
      : 'Varjuprofiilid – dekoratiivsed alumiiniumprofiilid laele, seinale, põrandale',
    description: ru
      ? 'Декоративные теневые профили без LED — чистая архитектурная теневая линия из алюминия. Для потолка, стены и пола. Любой оттенок RAL. Склад в Таллинне.'
      : 'Dekoratiivsed varjuprofiilid ilma LED-ita — puhas arhitektuurne varjujoon alumiiniumist. Laele, seinale ja põrandale. Iga RAL-toon. Ladu Tallinnas.',
    alternates: {
      canonical: 'https://varjuprofiilid.ee/varjuprofiilid',
      languages: {
        et: 'https://varjuprofiilid.ee/varjuprofiilid',
        ru: 'https://varjuprofiilid.ee/ru/varjuprofiily',
      },
    },
  };
}

const SUBCATEGORIES = [
  {
    slug: 'lae',
    labelEt: 'Lae varjuprofiilid', labelRu: 'Потолочные теневые профили',
    descEt: 'Paigaldatakse lae ja seina ühenduskohta — loob puhta arhitektuurse joone ilma valgustuseta.',
    descRu: 'Монтируются на стыке потолка и стены — создают чистую архитектурную линию без подсветки.',
    skus: 'AST5 · AST8 · AST10 · AST20', n: '01',
  },
  {
    slug: 'seina',
    labelEt: 'Seina varjuprofiilid', labelRu: 'Настенные теневые профили',
    descEt: 'Seinasiseste pindade üleminekud, akna- ja ukseraamid — dekoratiivne varjujoon.',
    descRu: 'Переходы внутри стен, обрамление окон и дверей — декоративная теневая линия.',
    skus: 'LPA909 · ASP611 · ASP411 · ASP168', n: '02',
  },
  {
    slug: 'poranda',
    labelEt: 'Põranda varjuprofiilid', labelRu: 'Напольные теневые профили',
    descEt: 'Asendab põrandaliistu — minimaalne, sirgjooneline alumiiniumprofiil ilma LED-ta.',
    descRu: 'Заменяет плинтус — минималистичный прямолинейный алюминиевый профиль без LED.',
    skus: 'ASP112 · ASP116 · ASP117 · ASP168', n: '03',
  },
];

export default async function Varjuprofiilid() {
  const locale = await getLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  const dekorProducts = products.filter((p) =>
    p.urlPath.startsWith('/varjuprofiilid/')
  ).slice(0, 8);

  return (
    <div>
      {/* Breadcrumb */}
      <section style={{ padding: '32px 56px 0' }}>
        <div className="vp-eyebrow">
          <Link href={pfx || '/'}>{ru ? 'Главная' : 'Avaleht'}</Link>
          {' / '}
          <span style={{ color: 'var(--ink)' }}>{ru ? 'Теневые профили' : 'Varjuprofiilid'}</span>
        </div>
      </section>

      {/* Hero */}
      <section style={{ padding: '48px 56px 64px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
              {ru ? 'Sammas 2 · Декоративные, без LED' : 'Sammas 2 · Dekoratiivsed, ilma LED-ita'}
            </div>
            <h1 className="vp-display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', margin: '0 0 24px', lineHeight: 0.9 }}>
              {ru ? 'Теневые профили.' : 'Varjuprofiilid.'}
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-2)', maxWidth: 520, marginBottom: 24 }}>
              {ru
                ? 'Теневые профили (по-английски shadow gap profiles) — алюминиевые профили, создающие между двумя поверхностями намеренную, равномерную теневую линию без подсветки. Чисто архитектурная деталь. Используются там, где нужна визуальная граница — не освещение.'
                : 'Varjuprofiilid (inglise k. shadow gap profiles) on alumiiniumprofiilid, mis loovad kahe pinna vahele tahtliku, ühtlase varjujoone — ilma valgustuseta. Puhtalt arhitektuurne detail. Kasutatakse seal, kus on vaja visuaalset eraldust — mitte valgustust.'}
            </p>
            <div style={{ padding: '16px 20px', border: 'var(--border)', background: 'var(--paper-2)', marginBottom: 32, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
              {ru ? '«Все LED профили — теневые профили. Но не все теневые профили — LED.»' : '"Kõik LED profiilid on varjuprofiilid. Aga kõik varjuprofiilid ei ole LED."'}
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href={`${pfx}/tooted`} className="vp-btn vp-btn--lg">{ru ? 'Все товары →' : 'Vaata kõiki →'}</Link>
              <Link href={`${pfx}/led-varjuprofiilid/`} className="vp-btn vp-btn--ghost">{ru ? 'LED версии →' : 'LED versioonid →'}</Link>
            </div>
          </div>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Декоративные vs LED' : 'Dekoratiivne vs LED'}</div>
            <div style={{ border: 'var(--border)' }}>
              {[
                { prop: ru ? 'LED-подсветка' : 'LED-valgustus', deco: ru ? '✗ нет' : '✗ ei', led: ru ? '✓ integreeritud' : '✓ integreeritud' },
                { prop: ru ? 'Функция' : 'Funktsioon', deco: ru ? 'Архитект. деталь' : 'Arhitektuurne detail', led: ru ? 'Деталь + свет' : 'Detail + valgus' },
                { prop: ru ? 'Монтаж' : 'Paigaldus', deco: ru ? 'Проще' : 'Lihtsam', led: ru ? 'Нужна проводка' : 'Vajab juhtmestikku' },
                { prop: ru ? 'Цена' : 'Hind', deco: ru ? 'Ниже' : 'Madalam', led: ru ? 'Выше' : 'Kõrgem' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < 3 ? '1px solid rgba(0,0,0,0.1)' : 'none' }}>
                  <div style={{ padding: '14px 16px', fontWeight: 600, fontSize: 13, borderRight: '1px solid rgba(0,0,0,0.1)' }}>{row.prop}</div>
                  <div style={{ padding: '14px 16px', fontSize: 13, borderRight: '1px solid rgba(0,0,0,0.1)', background: 'var(--paper-2)' }}>{row.deco}</div>
                  <div style={{ padding: '14px 16px', fontSize: 13 }}>{row.led}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sub-categories */}
      <section style={{ padding: '64px 56px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
          {ru ? 'Декоративные по месту установки' : 'Dekoratiivsed asukoha järgi'}
        </div>
        <h2 className="vp-display" style={{ fontSize: 64, margin: '0 0 40px', lineHeight: 0.92 }}>
          {ru ? 'Потолок, стена, пол.' : 'Lagi, sein, põrand.'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--ink)', border: 'var(--border)' }}>
          {SUBCATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`${pfx}/varjuprofiilid/${cat.slug}/`} style={{ display: 'block', background: 'var(--paper)', padding: '36px 32px', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                <span className="vp-display" style={{ fontSize: 48, lineHeight: 1, color: 'var(--accent)' }}>{cat.n}</span>
                <span style={{ fontSize: 20 }}>→</span>
              </div>
              <div className="vp-display" style={{ fontSize: 32, marginBottom: 8 }}>{ru ? cat.labelRu : cat.labelEt}</div>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: '0 0 14px' }}>{ru ? cat.descRu : cat.descEt}</p>
              <div className="vp-mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{cat.skus}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      {dekorProducts.length > 0 && (
        <section style={{ padding: '64px 56px', borderBottom: 'var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{ru ? 'Популярные деко профили' : 'Populaarsed dekoratiivsed profiilid'}</div>
              <h2 className="vp-display" style={{ fontSize: 48, margin: 0 }}>{ru ? 'Выбор покупателей' : 'Ostjate valik'}</h2>
            </div>
            <Link href={`${pfx}/tooted`} style={{ fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: 'var(--border)', paddingBottom: 2, color: 'var(--ink)', textDecoration: 'none' }}>
              {ru ? 'Все →' : 'Kõik →'}
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {dekorProducts.map((p) => {
              const img = getProductImagePath(p.sku);
              const href = ru ? `/ru${p.urlPathRu}` : p.urlPath;
              return (
                <Link key={p.sku} href={href} style={{ border: 'var(--border)', display: 'block', textDecoration: 'none', color: 'inherit', background: 'var(--paper)' }}>
                  <div style={{ aspectRatio: '1', borderBottom: 'var(--border)', background: 'var(--paper-2)', overflow: 'hidden' }}>
                    {img
                      ? <img src={img} alt={p.sku} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /> // eslint-disable-line @next/next/no-img-element
                      : <span className="label">{p.sku.toLowerCase()}</span>}
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                      <span className="vp-mono" style={{ fontSize: 11 }}>{p.sku}</span>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{p.price.toFixed(2).replace('.', ',')} {ru ? '€/пог.м' : '€/m'}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>{ru ? p.seoNameRu : p.seoName}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Internal links */}
      <section style={{ padding: '48px 56px', borderBottom: 'var(--border)', background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="vp-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>{ru ? 'Смотрите также:' : 'Vaata ka:'}</span>
          {[
            { hrefEt: '/led-varjuprofiilid/', labelEt: 'LED varjuprofiilid', labelRu: 'LED теневые профили' },
            { hrefEt: '/mis-on-varjuprofiil/', labelEt: 'Mis on varjuprofiil?', labelRu: 'Что такое теневой профиль?' },
            { hrefEt: '/alumiinium-porandaliistud/', labelEt: 'Alumiinium põrandaliistud', labelRu: 'Алюминиевые плинтусы' },
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
