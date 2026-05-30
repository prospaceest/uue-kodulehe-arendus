/* Catalog with real CSV data + sidebar filters + category routing */

const _catRu = { Laeprofiilid:'Потолочные', 'Põrandaprofiilid':'Напольные', 'Põrandaliistud':'Плинтусы', 'Seina peiteprofiilid':'Настенные скрытые', 'Kardinaprofiilid':'Карнизные', 'Lisatarvikud':'Аксессуары', 'Nurgaprofiilid':'Угловые' };
function catName(name){ return (window.__locale === 'ru' && _catRu[name]) ? _catRu[name] : name; }

// TOP 10 enimmüüdud — peab vastama page-home.jsx Top 10 nimekirjale
const TOP10_SKUS = ['AST22', 'AST14_12', 'RST14', 'AST30', 'AST50', 'ASPL35', 'ASP112', 'ASP904', 'ASP60', 'ASP198'];
const TOP10_RANK = Object.fromEntries(TOP10_SKUS.map((s, i) => [s, i + 1]));
window.__top10Skus = TOP10_SKUS;
window.__top10Rank = TOP10_RANK;

const CAT_SLUG = {
  'Laeprofiilid': { slug: 'laeprofiilid', short: 'Lae', icon: '01' },
  'Põrandaprofiilid': { slug: 'porandaprofiilid', short: 'Põrand', icon: '02' },
  'Põrandaliistud': { slug: 'porandaliistud', short: 'Liistud', icon: '03' },
  'Seina peiteprofiilid': { slug: 'seina-peiteprofiilid', short: 'Sein', icon: '04' },
};

function productImageCandidates(sku) {
  // Look up the explicit, pre-built index first (hifi/product-images.js).
  // Falls back to a few legacy filename conventions if the SKU is missing.
  const s = (sku || '').toUpperCase();
  const idx = (window.__productImages || {})[s];
  if (idx && idx.length) return idx.map(u => encodeURI(u.normalize('NFD')));
  const l = (sku || '').toLowerCase();
  const out = [];
  for (let i = 1; i <= 6; i++) out.push(`assets/products/${s}_${i}.jpg`);
  for (let i = 1; i <= 6; i++) out.push(`assets/products/${s}_${i}.webp`);
  for (let i = 1; i <= 6; i++) out.push(`assets/products/${l}-${i}.jpg`);
  out.push(`assets/products/${l}.jpg`);
  return out;
}

function productImageUrl(sku) {
  // Returns the FIRST candidate (used as initial src; <FallbackImg> walks the rest).
  return productImageCandidates(sku)[0];
}

function FallbackImg({ sources, alt, style, className, onAllFail, eager }) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => { setIdx(0); }, [Array.isArray(sources) ? sources[0] : sources]);
  if (idx >= sources.length) return null;
  return (
    <img src={sources[idx]} alt={alt} className={className} style={style}
      loading={eager ? 'eager' : 'lazy'} decoding="async"
      onError={() => {
        const next = idx + 1;
        if (next >= sources.length && onAllFail) onAllFail();
        setIdx(next);
      }} />
  );
}

function ProductCard({ p, setPage }) {
  useLocale(); // product card locale
  const [err, setErr] = React.useState(false);
  const sources = productImageCandidates(p.sku);
  const topRank = TOP10_RANK[p.sku];
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); setPage('product', { sku: p.sku }); }}
      style={{ border: '1.5px solid var(--ink)', display: 'block', position: 'relative', background: 'var(--paper)' }}>
      <div className="vp-photo" style={{ aspectRatio: '1', borderBottom: '1.5px solid var(--ink)', position: 'relative' }}>
        {!err ? (
          <FallbackImg sources={sources} alt={`${p.sku} – ${(window.__i18n && window.__i18n.field(p,'seoName')) || p.collection.split(';')[0]}`} onAllFail={() => setErr(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span className="label">{(p.sku || '').toLowerCase()}</span>
        )}
        {/* Badge stack — top-left vertical */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 3 }}>
          {topRank && (
            <span title={tr('Enimmüüdud','Хит продаж')} style={{ background: 'var(--ink)', color: 'var(--paper)', border: '1.5px solid var(--ink)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 10, padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>★ TOP</span>
          )}
          {p.ledCompatible && (
            <span title={tr('LED-valmidusega','Совместим с LED')} style={{ background: '#F4B400', color: '#3a2400', border: '1.5px solid #3a2400', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 10, padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>⚡ LED</span>
          )}
        </div>
        {p.ribbon && (
          <span style={{ position: 'absolute', top: 10, right: 10, background: 'var(--paper)', border: '1.5px solid var(--ink)', fontFamily: 'JetBrains Mono', fontSize: 10, padding: '4px 8px', textTransform: 'uppercase', zIndex: 3 }}>{p.ribbon}</span>
        )}
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span className="vp-mono" style={{ fontSize: 12, fontWeight: 500 }}>{p.sku}</span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{p.price.toFixed(2).replace('.', ',')} €/{p.unit || 'm'}</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>{(window.__i18n && window.__i18n.field(p,'seoName')) || p.seoName || p.collection.split(';')[0]}</div>
        {p.colors.length > 0 && (
          <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>
            {p.colors.map(c => <span key={c.hex} title={c.name} style={{ width: 14, height: 14, borderRadius: '50%', background: c.hex, border: '1px solid var(--ink)' }} />)}
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)', alignSelf: 'center', marginLeft: 4 }}>+ RAL</span>
          </div>
        )}
      </div>
    </a>
  );
}

function CatalogPage({ setPage, params }) {
  useLocale(); // catalog locale
  const all = window.__catalogProducts || [];
  const cats = window.__catalogCategories || [];

  const initialCat = params?.category || null;
  const [activeCat, setActiveCat] = React.useState(initialCat);
  const [activeColors, setActiveColors] = React.useState([]);
  const [ledFilter, setLedFilter] = React.useState('all'); // 'all' | 'led' | 'no-led'
  const [priceRange, setPriceRange] = React.useState([0, 50]);
  const [sort, setSort] = React.useState('popular');

  React.useEffect(() => { setActiveCat(initialCat); }, [initialCat]);

  const filtered = React.useMemo(() => {
    const seen = new Set();
    let items = all.filter(p => {
      if (activeCat && !p.collection.split(';').map(s => s.trim()).includes(activeCat)) return false;
      if (ledFilter === 'led' && !p.ledCompatible) return false;
      if (ledFilter === 'no-led' && p.ledCompatible) return false;
      if (priceRange && (p.price < priceRange[0] || p.price > priceRange[1])) return false;
      if (activeColors.length > 0) {
        const hexes = p.colors.map(c => c.hex.toUpperCase());
        if (!activeColors.some(h => hexes.includes(h.toUpperCase()))) return false;
      }
      if (seen.has(p.sku)) return false;
      seen.add(p.sku);
      return true;
    });
    if (sort === 'price-asc') items = [...items].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [all, activeCat, activeColors, ledFilter, priceRange, sort]);

  const toggleColor = (hex) => {
    setActiveColors(activeColors.includes(hex) ? activeColors.filter(c => c !== hex) : [...activeColors, hex]);
  };

  const colorChoices = [
    { hex: '#D4D4D4', name: tr('Hõbe','Серебро') },
    { hex: '#000000', name: tr('Must','Чёрный') },
    { hex: '#FFFFFF', name: tr('Valge','Белый') },
  ];

  const activeFilterCount = (activeCat ? 1 : 0) + activeColors.length + (ledFilter !== 'all' ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 50 ? 1 : 0);

  return (
    <div className="vp-page">
      <Marquee />
      <section style={{ padding: '48px 56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          <a onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>{tr('Avaleht','Главная')}</a> / {tr('Pood','Магазин')}{activeCat ? <> / <span style={{ color: 'var(--ink)' }}>{catName(activeCat)}</span></> : null}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32 }}>
          <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 7vw, 112px)', margin: 0 }}>{activeCat ? catName(activeCat) : tr('Kõik tooted.','Все товары.')}</h1>
          <p style={{ maxWidth: 380, fontSize: 15, color: 'var(--ink-2)', textAlign: 'right' }}>
            <span className="vp-mono" style={{ fontSize: 12 }}>{all.length} SKU</span>
          </p>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '260px 1fr' }}>
        <aside style={{ padding: '28px 24px', borderRight: '1.5px solid var(--ink)', position: 'sticky', top: 60, alignSelf: 'start', height: 'calc(100vh - 60px)', overflow: 'auto' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 18, display: 'flex', justifyContent: 'space-between' }}>
            <span>{tr('Filtrid','Фильтры')}</span>
            <span>{activeFilterCount} {tr('aktiivset','активных')}</span>
          </div>

          <div style={{ marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{tr('Kategooria','Категория')}</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, marginBottom: 6, cursor: 'pointer', color: 'var(--ink-2)' }}>
              <span style={{ width: 16, height: 16, border: '1.5px solid var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: !activeCat ? 'var(--ink)' : 'transparent', color: 'var(--paper)', fontSize: 10 }}
                onClick={() => setActiveCat(null)}>{!activeCat ? '✓' : ''}</span>
              <span onClick={() => setActiveCat(null)}>{tr('Kõik','Все')} ({all.length})</span>
            </label>
            {cats.map(c => (
              <label key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, marginBottom: 6, cursor: 'pointer', color: 'var(--ink-2)' }}>
                <span style={{ width: 16, height: 16, border: '1.5px solid var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: activeCat === c.name ? 'var(--ink)' : 'transparent', color: 'var(--paper)', fontSize: 10 }}
                  onClick={() => setActiveCat(activeCat === c.name ? null : c.name)}>{activeCat === c.name ? '✓' : ''}</span>
                <span onClick={() => setActiveCat(activeCat === c.name ? null : c.name)}>{catName(c.name)} ({c.count})</span>
              </label>
            ))}
          </div>

          <div style={{ marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{tr('LED-valmidus','LED-готовность')}</div>
            {[
              { k: 'all', l: tr('Kõik','Все') },
              { k: 'led', l: tr('⚡ LED-iga','⚡ С LED') },
              { k: 'no-led', l: tr('Ilma LED','Без LED') },
            ].map((opt) => (
              <label key={opt.k} onClick={() => setLedFilter(opt.k)} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, marginBottom: 6, cursor: 'pointer', color: 'var(--ink-2)' }}>
                <span style={{ width: 16, height: 16, border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {ledFilter === opt.k && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ink)' }} />}
                </span>
                <span>{opt.l}</span>
              </label>
            ))}
          </div>

          <div style={{ marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{tr('Värvus','Цвет')}</div>
            {colorChoices.map(c => {
              const active = activeColors.includes(c.hex);
              return (
                <label key={c.hex} onClick={() => toggleColor(c.hex)} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, marginBottom: 6, cursor: 'pointer', color: 'var(--ink-2)' }}>
                  <span style={{ width: 16, height: 16, border: '1.5px solid var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: active ? 'var(--ink)' : 'transparent', color: 'var(--paper)', fontSize: 10 }}>{active ? '✓' : ''}</span>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', background: c.hex, border: '1px solid var(--ink)' }} />
                  {c.name}
                </label>
              );
            })}
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, marginBottom: 6, color: 'var(--muted)' }}>
              <span style={{ width: 16, height: 16, border: '1.5px solid var(--ink)' }} />
              {tr('RAL eritellimus','RAL под заказ')}
            </label>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{tr('Hind (€/m)','Цена (€/пог.м)')}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--muted)', marginBottom: 6 }}>
              <span>{priceRange[0]} €</span><span>{priceRange[1]} €</span>
            </div>
            <input type="range" min={0} max={50} step={1} value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])} style={{ width: '100%' }} />
          </div>
        </aside>

        <div style={{ padding: '24px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {activeCat && <span className="vp-chip vp-chip--active" onClick={() => setActiveCat(null)} style={{ cursor: 'pointer' }}>{catName(activeCat)} ✕</span>}
              {ledFilter !== 'all' && <span className="vp-chip vp-chip--active" onClick={() => setLedFilter('all')} style={{ cursor: 'pointer' }}>{ledFilter === 'led' ? tr('⚡ LED-iga','⚡ С LED') : tr('Ilma LED','Без LED')} ✕</span>}
              {activeColors.map(c => <span key={c} className="vp-chip vp-chip--active" onClick={() => toggleColor(c)} style={{ cursor: 'pointer' }}>{colorChoices.find(x => x.hex === c)?.name} ✕</span>)}
              {activeFilterCount > 0 && <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', alignSelf: 'center', borderBottom: '1px solid var(--ink)', cursor: 'pointer' }} onClick={() => { setActiveCat(null); setActiveColors([]); setLedFilter('all'); setPriceRange([0, 50]); }}>{tr('Tühjenda kõik','Очистить все')}</span>}
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontFamily: 'JetBrains Mono', fontSize: 12 }}>
              <span style={{ color: 'var(--muted)' }}>{filtered.length} {tr('toodet','товаров')}</span>
              <select value={sort} onChange={e => setSort(e.target.value)} className="vp-chip" style={{ border: '1.5px solid var(--ink)', background: 'var(--paper)', padding: '6px 10px' }}>
                <option value="popular">{tr('Sorteeri: populaarsus','Сортировка: популярные')}</option>
                <option value="price-asc">{tr('Hind: tõusev','Цена: по возрастанию')}</option>
                <option value="price-desc">{tr('Hind: laskuv','Цена: по убыванию')}</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {filtered.map((p, i) => <ProductCard key={p.sku + '-' + p.price + '-' + i} p={p} setPage={setPage} />)}
          </div>
          {filtered.length === 0 && (
            <div style={{ padding: 80, textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono' }}>
              {tr('Selle filtriga tooteid ei leitud.','По этим фильтрам товаров не найдено.')}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

window.CatalogPage = CatalogPage;
window.ProductCard = ProductCard;
window.productImageUrl = productImageUrl;
window.productImageCandidates = productImageCandidates;
window.FallbackImg = FallbackImg;
