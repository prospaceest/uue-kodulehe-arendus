import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { products } from '@/lib/catalog';

type Category = {
  n: string;
  labelEt: string;
  labelRu: string;
  img: string;
  hrefEt: string;
  hrefRu: string;
  collectionKey: string;
};

const CATEGORIES: Category[] = [
  { n: '01', labelEt: 'Laeprofiilid',           labelRu: 'Потолочные',           img: '/assets/categories/laeprofiilid.webp',       hrefEt: '/tooted/laeprofiilid',          hrefRu: '/ru/tooted/laeprofiilid',         collectionKey: 'Laeprofiilid' },
  { n: '02', labelEt: 'Põrandaprofiilid',        labelRu: 'Напольные',            img: '/assets/categories/porandaprofiilid.webp',   hrefEt: '/tooted/porandaprofiilid',      hrefRu: '/ru/tooted/porandaprofiilid',     collectionKey: 'Põrandaprofiilid' },
  { n: '03', labelEt: 'Põrandaliistud',          labelRu: 'Плинтусы',             img: '/assets/categories/porandaliistud.webp',     hrefEt: '/tooted/porandaliistud',        hrefRu: '/ru/tooted/porandaliistud',       collectionKey: 'Põrandaliistud' },
  { n: '04', labelEt: 'Seina peiteprofiilid',    labelRu: 'Настенные скрытые',    img: '/assets/categories/seina-peitesiinid.webp',  hrefEt: '/tooted/seina-peiteprofiilid',  hrefRu: '/ru/tooted/seina-peiteprofiilid', collectionKey: 'Seina peiteprofiilid' },
];

function countByCollection(key: string) {
  const seen = new Set<string>();
  products.forEach((p) => {
    if (p.collection.split(';').map((s) => s.trim()).includes(key)) {
      seen.add(p.sku);
    }
  });
  return seen.size;
}

export default async function CategoryGrid() {
  const locale = await getLocale();
  const ru = locale === 'ru';

  return (
    <section style={{ padding: '80px 56px', borderBottom: 'var(--border)' }}>
      {/* Section header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 8 }}>
            {ru ? '02 / Коллекции' : '02 / Kollektsioonid'}
          </div>
          <h2 className="vp-display" style={{ fontSize: 64, margin: 0 }}>
            {ru ? 'Покупки по категориям' : 'Osta kategooria järgi'}
          </h2>
        </div>
        <Link
          href={ru ? '/ru/tooted' : '/tooted'}
          style={{ fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: 'var(--border)' }}
        >
          {ru ? 'Смотреть все →' : 'Vaata kõiki →'}
        </Link>
      </div>

      {/* 4-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {CATEGORIES.map((cat) => {
          const count = countByCollection(cat.collectionKey);
          // Catalog filters by ?cat=<collection name>; path segments like
          // /tooted/laeprofiilid have no route and 404.
          const href = `${ru ? '/ru' : ''}/tooted?cat=${encodeURIComponent(cat.collectionKey)}`;
          const label = ru ? cat.labelRu : cat.labelEt;

          return (
            <Link key={cat.n} href={href} style={{ border: 'var(--border)', display: 'block', position: 'relative', textDecoration: 'none', color: 'inherit' }}>
              {/* Image area */}
              <div className="vp-photo" style={{ aspectRatio: '4/5', borderBottom: 'var(--border)', position: 'relative', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.img}
                  alt={label}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={undefined}
                />
                <span className="label">{cat.n}</span>
              </div>

              {/* Card footer */}
              <div style={{ padding: '18px 18px 20px' }}>
                <div className="vp-eyebrow">
                  {cat.n} / {count} {ru ? 'товаров' : 'toodet'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                  <span className="vp-display" style={{ fontSize: 28 }}>{label}</span>
                  <span style={{ fontSize: 18 }}>→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
