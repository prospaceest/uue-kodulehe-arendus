import Link from 'next/link';
import { getLocale } from 'next-intl/server';

const POSTS = [
  {
    id: 'varjuprofiil-pohjalik-juhend',
    titleEt: 'Põrandaliist, mida sa ei märka: täisjuhend varjuprofiilide valikule (2026)',
    titleRu: 'Плинтус, которого не видно: полный гид по выбору теневого профиля (2026)',
    catEt: 'Juhend', catRu: 'Гайд',
    year: '2026 · mai', readEt: '10 min', readRu: '10 мин',
    cover: '/assets/projects/eduardi-maja/00-home-cover.png',
    excerptEt: 'Mis on varjuprofiil, kuidas see asendab põrandaliistu ja millised tüübid sobivad Eesti korterisse.',
    excerptRu: 'Что такое теневой профиль, как он заменяет плинтус и какие модели подходят для эстонской квартиры.',
  },
  {
    id: 'varjuprofiili-tuubid',
    titleEt: 'Varjuprofiilide erinevad tüübid: juhend kaasaegseks siseviimistluseks',
    titleRu: 'Виды теневых профилей: гид по современной внутренней отделке',
    catEt: 'Tüübivalik', catRu: 'Виды',
    year: '2026 · apr', readEt: '7 min', readRu: '7 мин',
    cover: '/assets/projects/tallinna-korter/00-home-cover.png',
    excerptEt: 'Standardne, LED-iga ja MDF-täitega varjuprofiil — kolm peamist lahendust.',
    excerptRu: 'Стандартный, с LED и с MDF-заполнением — три основных решения.',
  },
  {
    id: 'peitliist-interjooris',
    titleEt: 'Mis on varjuprofiil ja kuidas seda interjööris kasutada?',
    titleRu: 'Что такое теневой профиль и как его использовать в интерьере?',
    catEt: 'Disain', catRu: 'Дизайн',
    year: '2026 · märts', readEt: '7 min', readRu: '7 мин',
    cover: '/assets/projects/viimsi-vannituba/00-home-cover.png',
    excerptEt: 'Definitsioon, peamised eelised, lihtne paigaldus ja viis loovat võimalust kasutada.',
    excerptRu: 'Определение, главные преимущества, простой монтаж и пять творческих способов применения.',
  },
];

export default async function BlogPosts() {
  const locale = await getLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  return (
    <section style={{ padding: '80px 56px', borderBottom: 'var(--border)', background: 'var(--paper-2)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, gap: 24, flexWrap: 'wrap' }}>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 8 }}>
            {ru ? '07 / Журнал' : '07 / Uudised'}
          </div>
          <h2 className="vp-display" style={{ fontSize: 64, margin: 0 }}>
            {ru ? 'Гайды и вдохновение' : 'Juhendid & inspiratsioon'}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 520, marginTop: 14 }}>
            {ru
              ? 'Делимся рекомендациями, представляем новинки и показываем, как решения внедрили другие.'
              : 'Avaldame soovitusi, tutvustame uusi tooteid ja jagame, kuidas teised on lahendused oma kodus ellu viinud.'}
          </p>
        </div>
        <Link href={`${pfx}/uudised`} style={{ fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: 'var(--border)', paddingBottom: 2 }}>
          {ru ? 'Все статьи →' : 'Vaata kõiki artikleid →'}
        </Link>
      </div>

      {/* 3-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {POSTS.map((p) => (
          <Link key={p.id} href={`${pfx}/uudised/${p.id}`} style={{ display: 'flex', flexDirection: 'column', border: 'var(--border)', background: 'var(--paper)', textDecoration: 'none', color: 'inherit' }}>
            {/* Cover */}
            <div style={{ aspectRatio: '4/3', borderBottom: 'var(--border)', position: 'relative', overflow: 'hidden', background: 'var(--paper-2)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.cover} alt={ru ? p.titleRu : p.titleEt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              <span style={{ position: 'absolute', top: 12, left: 12, background: 'var(--paper)', border: 'var(--border)', fontFamily: 'JetBrains Mono', fontSize: 10, padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {ru ? p.catRu : p.catEt}
              </span>
            </div>

            {/* Body */}
            <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
              <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {p.year} · {ru ? p.readRu : p.readEt} {ru ? 'чтение' : 'lugemine'}
              </div>
              <h3 className="vp-display" style={{ fontSize: 26, margin: 0, lineHeight: 1.05 }}>
                {ru ? p.titleRu : p.titleEt}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
                {ru ? p.excerptRu : p.excerptEt}
              </p>
              <span style={{ marginTop: 'auto', fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: 'var(--border)', alignSelf: 'flex-start', paddingBottom: 2 }}>
                {ru ? 'Читать статью →' : 'Loe artiklit →'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
