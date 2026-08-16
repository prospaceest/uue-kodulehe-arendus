import Link from 'next/link';
import { tx } from '@/lib/tx';
import { getLocale } from 'next-intl/server';
import { products } from '@/lib/catalog';
import { lp } from '@/lib/pageUrls';

type Category = {
  n: string;
  labelEt: string;
  labelRu: string;
  img: string;
  collectionKey: string;
};

const CATEGORIES: Category[] = [
  { n: '01', labelEt: 'Laeprofiilid',           labelRu: 'Потолочные',           img: '/assets/categories/laeprofiilid.webp',         collectionKey: 'Laeprofiilid' },
  { n: '02', labelEt: 'Põrandaprofiilid',        labelRu: 'Напольные',            img: '/assets/categories/porandaprofiilid.webp',     collectionKey: 'Põrandaprofiilid' },
  { n: '03', labelEt: 'Põrandaliistud',          labelRu: 'Плинтусы',             img: '/assets/categories/porandaliistud.webp',       collectionKey: 'Põrandaliistud' },
  { n: '04', labelEt: 'Seina peiteprofiilid',    labelRu: 'Настенные скрытые',    img: '/assets/categories/seina-peitesiinid.webp', collectionKey: 'Seina peiteprofiilid' },
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
            {tx(locale, '02 / Коллекции', '02 / Kollektsioonid')}
          </div>
          <h2 className="vp-display" style={{ fontSize: 64, margin: 0 }}>
            {tx(locale, 'Покупки по категориям', 'Osta kategooria järgi')}
          </h2>
        </div>
        <Link
          href={lp('/tooted', locale)}
          style={{ fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: 'var(--border)' }}
        >
          {tx(locale, 'Смотреть все →', 'Vaata kõiki →')}
        </Link>
      </div>

      {/* 4-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {CATEGORIES.map((cat) => {
          const count = countByCollection(cat.collectionKey);
          // Catalog filters by ?cat=<collection name>; path segments like
          // /tooted/laeprofiilid have no route and 404.
          const href = lp(`/tooted?cat=${encodeURIComponent(cat.collectionKey)}`, locale);
          const label = tx(locale, cat.labelRu, cat.labelEt);

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
                  {cat.n} / {count} {tx(locale, 'товаров', 'toodet')}
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
