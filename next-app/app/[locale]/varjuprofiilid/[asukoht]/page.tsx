import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import { products } from '@/lib/catalog';
import { getProductImagePath } from '@/lib/productImages';

type Asukoht = 'lae' | 'seina' | 'poranda';

const CONFIG: Record<Asukoht, { titleEt: string; titleRu: string; h1Et: string; h1Ru: string; descEt: string; descRu: string; eyebrowEt: string; eyebrowRu: string }> = {
  lae: {
    titleEt: 'Lae varjuprofiilid – alumiiniumprofiilid laele',
    titleRu: 'Потолочные теневые профили – алюминиевые профили для потолка',
    h1Et: 'Lae varjuprofiilid – varjujoon lae ja seina vahele',
    h1Ru: 'Потолочные теневые профили – теневая линия между потолком и стеной',
    descEt: 'Dekoratiivsed lae varjuprofiilid paigaldatakse lae ja seina ühenduskohta ilma LED-ita — puhtalt arhitektuurne detail, mis loob puhta varjujoone. AST5 (5mm), AST8 (8mm), AST10 (10mm), AST20 (20mm) — vali sügavus vastavalt soovitud varjujoone laiusele.',
    descRu: 'Декоративные потолочные теневые профили монтируются в стык потолка и стены без LED — чисто архитектурная деталь, создающая чистую теневую линию. AST5 (5мм), AST8 (8мм), AST10 (10мм), AST20 (20мм) — выбирайте глубину под желаемую ширину тени.',
    eyebrowEt: 'Dekoratiivne · Lae varjuprofiilid',
    eyebrowRu: 'Декоративные · Потолочные профили',
  },
  seina: {
    titleEt: 'Seina varjuprofiilid – dekoratiivsed profiilid seinale',
    titleRu: 'Настенные теневые профили – декоративные профили для стен',
    h1Et: 'Seina varjuprofiilid – dekoratiivne varjujoon seinale',
    h1Ru: 'Настенные теневые профили – декоративная теневая линия',
    descEt: 'Seina varjuprofiilid ehk seina peiteprofiilid kasutatakse seinasiseste pindade üleminekute peitmiseks — aken, uks, kaks erinevat seinapinda. Loovad puhta arhitektuurse joone ilma nähtava liimisaumata.',
    descRu: 'Настенные теневые профили используются для скрытия переходов внутри стен — окно, дверь, две разные поверхности стены. Создают чистую архитектурную линию без видимого шва.',
    eyebrowEt: 'Dekoratiivne · Seina varjuprofiilid',
    eyebrowRu: 'Декоративные · Настенные профили',
  },
  poranda: {
    titleEt: 'Põranda varjuprofiilid – dekoratiivsed põrandaliistude alternatiivid',
    titleRu: 'Напольные теневые профили – декоративные альтернативы плинтусам',
    h1Et: 'Põranda varjuprofiilid – minimalistlikud põrandaliistu alternatiivid',
    h1Ru: 'Напольные теневые профили – минималистичные альтернативы плинтусам',
    descEt: 'Dekoratiivsed põranda varjuprofiilid asendavad traditsioonilise põrandaliistu — alumiiniumist, ilma LED-ita, sirgjoonelised. ASP112, ASP116, ASP117, ASP168 — erineva sügavuse ja laiusega mudelid.',
    descRu: 'Декоративные напольные теневые профили заменяют традиционный плинтус — алюминиевые, без LED, прямолинейные. ASP112, ASP116, ASP117, ASP168 — модели разной глубины и ширины.',
    eyebrowEt: 'Dekoratiivne · Põranda varjuprofiilid',
    eyebrowRu: 'Декоративные · Напольные профили',
  },
};

type Props = { params: Promise<{ locale: string; asukoht: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { asukoht } = await params;
  const locale = await getLocale();
  const cfg = CONFIG[asukoht as Asukoht];
  if (!cfg) return {};
  const ru = locale === 'ru';
  return { title: ru ? cfg.titleRu : cfg.titleEt, description: ru ? cfg.descRu : cfg.descEt };
}

export function generateStaticParams() {
  return (['lae', 'seina', 'poranda'] as Asukoht[]).flatMap((a) => [
    { locale: 'et', asukoht: a },
    { locale: 'ru', asukoht: a },
  ]);
}

export default async function DekorCategoryPage({ params }: Props) {
  const { asukoht } = await params;
  const locale = await getLocale();
  const cfg = CONFIG[asukoht as Asukoht];
  if (!cfg) notFound();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  const categoryProducts = products.filter((p) =>
    p.urlPath.startsWith(`/varjuprofiilid/${asukoht}/`)
  );

  return (
    <div>
      <section style={{ padding: '32px 56px 0' }}>
        <div className="vp-eyebrow">
          <Link href={pfx || '/'}>{ru ? 'Главная' : 'Avaleht'}</Link>
          {' / '}
          <Link href={`${pfx}/varjuprofiilid/`}>{ru ? 'Теневые профили' : 'Varjuprofiilid'}</Link>
          {' / '}
          <span style={{ color: 'var(--ink)' }}>{ru ? cfg.eyebrowRu : cfg.eyebrowEt}</span>
        </div>
      </section>

      <section style={{ padding: '48px 56px 56px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? cfg.eyebrowRu : cfg.eyebrowEt}</div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(40px, 6vw, 80px)', margin: '0 0 24px', lineHeight: 0.95, maxWidth: '20ch' }}>
          {ru ? cfg.h1Ru : cfg.h1Et}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-2)', maxWidth: 720 }}>
          {ru ? cfg.descRu : cfg.descEt}
        </p>
      </section>

      <section style={{ padding: '56px' }}>
        {categoryProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div className="vp-display" style={{ fontSize: 48, marginBottom: 16 }}>{ru ? 'Скоро.' : 'Tulekul.'}</div>
            <Link href={`${pfx}/varjuprofiilid/`} className="vp-btn">{ru ? '← Назад' : '← Tagasi'}</Link>
          </div>
        ) : (
          <>
            <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>
              {categoryProducts.length} {ru ? 'товаров' : 'toodet'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {categoryProducts.map((p) => {
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
          </>
        )}
      </section>

      <section style={{ padding: '48px 56px', borderBottom: 'var(--border)', background: 'var(--paper-2)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 16 }}>{ru ? 'Другие категории' : 'Teised kategooriad'}</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {(['lae', 'seina', 'poranda'] as Asukoht[]).filter((a) => a !== asukoht).map((a) => (
            <Link key={a} href={`${pfx}/varjuprofiilid/${a}/`} className="vp-btn vp-btn--ghost">
              {ru ? CONFIG[a].eyebrowRu : CONFIG[a].eyebrowEt} →
            </Link>
          ))}
          <Link href={`${pfx}/led-varjuprofiilid/`} className="vp-btn vp-btn--ghost">
            {ru ? 'LED версии →' : 'LED versioonid →'}
          </Link>
        </div>
      </section>
    </div>
  );
}
