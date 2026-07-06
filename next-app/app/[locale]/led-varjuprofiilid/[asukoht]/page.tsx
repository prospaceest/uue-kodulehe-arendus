import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import { products } from '@/lib/catalog';
import { getProductImagePath } from '@/lib/productImages';

type Asukoht = 'lae' | 'poranda' | 'seina' | 'kesklae';

const CONFIG: Record<Asukoht, {
  titleEt: string; titleRu: string;
  h1Et: string; h1Ru: string;
  descEt: string; descRu: string;
  eyebrowEt: string; eyebrowRu: string;
  intlSlug: string;
}> = {
  lae: {
    titleEt: 'Lae LED varjuprofiilid – LED laeprofiilid alumiiniumist',
    titleRu: 'Потолочные LED теневые профили – LED профили для потолка',
    h1Et: 'Lae LED varjuprofiilid – LED laeprofiilid alumiiniumist',
    h1Ru: 'Потолочные LED профили – LED профили для потолка из алюминия',
    descEt: 'Lae LED varjuprofiilid (tuntud ka kui LED laeprofiilid või LED süvisprofiilid) on alumiiniumprofiilid, mis paigaldatakse lae ja seina ühenduskohta. Profiili soonde paigaldatakse LED-riba, mis loob nii tahtliku varjujoone kui ka pehme perimeetrivalgustuse — hõljuva lae efekti.',
    descRu: 'Потолочные LED теневые профили (также известные как LED-профили для потолка или LED-профили скрытого монтажа) — алюминиевые профили, монтируемые в стык потолка и стены. В канал профиля устанавливается LED-лента, создающая теневую линию и мягкую периметральную подсветку.',
    eyebrowEt: 'LED · Lae varjuprofiilid',
    eyebrowRu: 'LED · Потолочные профили',
    intlSlug: 'potolok',
  },
  poranda: {
    titleEt: 'Põranda LED varjuprofiilid – LED põrandaprofiilid alumiiniumist',
    titleRu: 'Напольные LED теневые профили – LED профили для пола',
    h1Et: 'Põranda LED varjuprofiilid – LED põrandaprofiilid alumiiniumist',
    h1Ru: 'Напольные LED профили – LED профили для пола из алюминия',
    descEt: 'Põranda LED varjuprofiilid asendavad traditsioonilise põrandaliistu, lisades pehme peitevalgustuse põranda servale. Profiil paigaldatakse kipsplaadi alla enne viimistlust — ei ulatuta seinast välja, pind jääb ühes tasapinnas.',
    descRu: 'Напольные LED теневые профили заменяют традиционный плинтус, добавляя мягкую скрытую подсветку вдоль пола. Профиль монтируется под гипсокартон до финишной отделки — не выступает из стены.',
    eyebrowEt: 'LED · Põranda varjuprofiilid',
    eyebrowRu: 'LED · Напольные профили',
    intlSlug: 'pol',
  },
  seina: {
    titleEt: 'Seina LED varjuprofiilid – seina peiteprofiilid LED-iga',
    titleRu: 'Настенные LED профили – LED профили скрытого монтажа для стен',
    h1Et: 'Seina LED varjuprofiilid – LED peiteprofiilid',
    h1Ru: 'Настенные LED профили – профили скрытого монтажа',
    descEt: 'Seina LED varjuprofiilid paigaldatakse seinasiseste pindade üleminekutesse — akna ja ukse raamidesse, kahe seinakihi vahelisse üleminekusse, riiuliservade alla. LED-riba loob pehme ambient-valguse mõjul.',
    descRu: 'Настенные LED профили устанавливаются во внутренние переходы стен — в обрамление окон и дверей, в переход между двумя слоями стены, под края полок. LED-лента создаёт мягкий ambient-свет.',
    eyebrowEt: 'LED · Seina varjuprofiilid',
    eyebrowRu: 'LED · Настенные профили',
    intlSlug: 'stena',
  },
  kesklae: {
    titleEt: 'Kesklae LED varjuprofiilid – dekoratiivsed LED-read lakke',
    titleRu: 'LED профили для центрального потолка',
    h1Et: 'Kesklae LED varjuprofiilid',
    h1Ru: 'LED профили для центрального потолка',
    descEt: 'Kesklae LED varjuprofiilid paigaldatakse lae keskele dekoratiivseks elemendiks — eraldi reana, ringina, geomeetrilise kujundina. Loovad graafilise valgusjoone, mis määratleb ruumi visuaalselt.',
    descRu: 'LED профили для центрального потолка монтируются в центр потолка как декоративный элемент — отдельной полосой, кольцом, геометрической формой. Создают графическую световую линию, визуально определяющую пространство.',
    eyebrowEt: 'LED · Kesklae varjuprofiilid',
    eyebrowRu: 'LED · Профили для центрального потолка',
    intlSlug: 'centralnyj',
  },
};

type Props = { params: Promise<{ locale: string; asukoht: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { asukoht } = await params;
  const locale = await getLocale();
  const cfg = CONFIG[asukoht as Asukoht];
  if (!cfg) return {};
  const ru = locale === 'ru';
  return {
    title: ru ? cfg.titleRu : cfg.titleEt,
    description: ru ? cfg.descRu : cfg.descEt,
    alternates: {
      canonical: `https://varjuprofiilid.ee/led-varjuprofiilid/${asukoht}/`,
      languages: {
        et: `https://varjuprofiilid.ee/led-varjuprofiilid/${asukoht}/`,
        ru: `https://varjuprofiilid.ee/ru/led-profili/${cfg.intlSlug}/`,
      },
    },
  };
}

export function generateStaticParams() {
  return (['lae', 'poranda', 'seina', 'kesklae'] as Asukoht[]).flatMap((a) => [
    { locale: 'et', asukoht: a },
    { locale: 'ru', asukoht: a },
  ]);
}

export default async function LedCategoryPage({ params }: Props) {
  const { asukoht } = await params;
  const locale = await getLocale();
  const cfg = CONFIG[asukoht as Asukoht];
  if (!cfg) notFound();

  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  const categoryProducts = products.filter((p) =>
    p.urlPath.startsWith(`/led-varjuprofiilid/${asukoht}/`)
  );

  return (
    <div>
      {/* Breadcrumb */}
      <section style={{ padding: '32px 56px 0' }}>
        <div className="vp-eyebrow">
          <Link href={pfx || '/'}>{ru ? 'Главная' : 'Avaleht'}</Link>
          {' / '}
          <Link href={`${pfx}/led-varjuprofiilid/`}>{ru ? 'LED профили' : 'LED varjuprofiilid'}</Link>
          {' / '}
          <span style={{ color: 'var(--ink)' }}>{ru ? cfg.eyebrowRu : cfg.eyebrowEt}</span>
        </div>
      </section>

      {/* Header */}
      <section style={{ padding: '48px 56px 56px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? cfg.eyebrowRu : cfg.eyebrowEt}</div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(40px, 6vw, 80px)', margin: '0 0 24px', lineHeight: 0.95, maxWidth: '20ch' }}>
          {ru ? cfg.h1Ru : cfg.h1Et}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-2)', maxWidth: 720 }}>
          {ru ? cfg.descRu : cfg.descEt}
        </p>
      </section>

      {/* Product grid */}
      <section style={{ padding: '56px' }}>
        {categoryProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div className="vp-display" style={{ fontSize: 48, marginBottom: 16 }}>
              {ru ? 'Скоро.' : 'Tulekul.'}
            </div>
            <p style={{ color: 'var(--ink-2)', marginBottom: 24 }}>
              {ru ? 'Товары этой категории появятся в ближайшее время.' : 'Selle kategooria tooted on varsti saadaval.'}
            </p>
            <Link href={`${pfx}/led-varjuprofiilid/`} className="vp-btn">{ru ? '← Назад' : '← Tagasi'}</Link>
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
                    <div style={{ aspectRatio: '1', borderBottom: 'var(--border)', background: 'var(--paper-2)', overflow: 'hidden', position: 'relative' }}>
                      {img
                        ? <img src={img} alt={p.sku} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /> // eslint-disable-line @next/next/no-img-element
                        : <span className="label">{p.sku.toLowerCase()}</span>}
                      {p.ledCompatible && (
                        <span style={{ position: 'absolute', top: 10, left: 10, background: '#F4B400', color: '#3a2400', border: '1.5px solid #3a2400', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 10, padding: '4px 8px', textTransform: 'uppercase' }}>
                          ⚡ LED
                        </span>
                      )}
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

      {/* Related categories */}
      <section style={{ padding: '48px 56px', borderBottom: 'var(--border)', background: 'var(--paper-2)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 16 }}>{ru ? 'Другие LED профили' : 'Teised LED varjuprofiilid'}</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {(['lae', 'poranda', 'seina', 'kesklae'] as Asukoht[]).filter((a) => a !== asukoht).map((a) => (
            <Link key={a} href={`${pfx}/led-varjuprofiilid/${a}/`} className="vp-btn vp-btn--ghost">
              {ru ? CONFIG[a].eyebrowRu : CONFIG[a].eyebrowEt} →
            </Link>
          ))}
          <Link href={`${pfx}/varjuprofiilid/`} className="vp-btn vp-btn--ghost">
            {ru ? 'Декоративные →' : 'Dekoratiivsed →'}
          </Link>
        </div>
      </section>
    </div>
  );
}
