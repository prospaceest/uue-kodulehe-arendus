/* Product page — driven by CSV data via params.sku */

function ProductPage({ setPage, params }) {
  useLocale(); // product page locale
  const all = window.__catalogProducts || [];
  const sku = params?.sku || 'LHV10';
  const product = all.find((p) => p.sku === sku) || all[0] || {
    sku: 'LHV10', name: 'LHV10', collection: 'Lae LED varjuprofiilid', price: 13.5,
    description: '', colors: [{ hex: '#D4D4D4', name: 'Hõbe' }, { hex: '#000000', name: 'Must' }, { hex: '#FFFFFF', name: 'Valge' }],
    specs: [], ribbon: '', inStock: true
  };

  const [color, setColor] = React.useState(product.colors[0]?.hex || '#000000');
  const [ralCode, setRalCode] = React.useState('');
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState('specs');
  const [mainImg, setMainImg] = React.useState(0);
  const [imgErrs, setImgErrs] = React.useState({});

  React.useEffect(() => {
    setColor(product.colors[0]?.hex || '#000000');
    setRalCode('');
    setMainImg(0);
    setImgErrs({});
  }, [product.sku]);

  // Read the pre-built image index (hifi/product-images.js).
  const indexed = ((window.__productImages || {})[product.sku.toUpperCase()] || []).map((u) => encodeURI(u.normalize('NFD')));
  // Each gallery slot gets ONE source (no candidate fallbacks needed thanks to the index).
  const photoCandidates = indexed.length > 0 ?
  indexed.map((u) => [u]) :
  Array.from({ length: 6 }).map((_, i) => [
  `assets/products/${product.sku}_${i + 1}.jpg`,
  `assets/products/${product.sku}_${i + 1}.webp`,
  `assets/products/${product.sku.toLowerCase()}-${i + 1}.jpg`]
  );
  // Fallback single image if numbered ones don't exist
  const photoFallback = `assets/products/${product.sku.toLowerCase()}.jpg`;

  // Per-piece length in meters. Read from spec "Pikkus" (e.g. "2500mm" / "2,6m"); fall back by category.
  const cat = product.collection.split(';')[0].trim();
  const pieceLength = (() => {
    const raw = (product.specs || []).find((s) => s.k === 'Pikkus')?.v || '';
    const mm = raw.match(/([\d.,]+)\s*mm/i);
    if (mm) return parseFloat(mm[1].replace(',', '.')) / 1000;
    const m = raw.match(/([\d.,]+)\s*m\b/i);
    if (m) return parseFloat(m[1].replace(',', '.'));
    return cat.startsWith('Põranda') ? 2.6 : 2.5;
  })();
  const isRal = color === 'RAL';
  // Per-color price: each color may carry its own price (mill finish cheaper, RAL premium).
  // Fallback: product.price (main / silver-equivalent).
  const activePrice = (() => {
    if (isRal && typeof product.ralPrice === 'number') return product.ralPrice;
    const selected = product.colors.find((c) => c.hex === color);
    if (selected && typeof selected.price === 'number') return selected.price;
    return product.price;
  })();
  const isFixedUnit = product.fixedPrice || (product.unit && product.unit !== 'm');
  const unitLabel = product.unit || 'm';
  const totalMeters = +(qty * pieceLength).toFixed(2);
  const totalQty = isFixedUnit ? qty : totalMeters;
  const total = (activePrice * totalQty).toFixed(2).replace('.', ',');
  const fmtM = (n) => (Number.isInteger(n) ? n.toString() : n.toFixed(2).replace(/\.?0+$/, '')).replace('.', ',');
  // Min price across all color variants (incl. mill finish & RAL) — shown as a hint.
  const millColor = product.colors.find((c) => c.name === 'Töötlemata');
  const hasMill = millColor && typeof millColor.price === 'number';
  const hasRal = typeof product.ralPrice === 'number';
  const ralPriceVal = hasRal ? product.ralPrice : null;
  const standardColors = product.colors.filter((c) => c.name !== 'Töötlemata');
  const standardPrices = standardColors.map((c) => typeof c.price === 'number' ? c.price : product.price);
  const standardMin = standardPrices.length > 0 ? Math.min(...standardPrices) : product.price;
  const standardMax = standardPrices.length > 0 ? Math.max(...standardPrices) : product.price;
  const minColorPrice = Math.min(hasMill ? millColor.price : Infinity, standardMin, hasRal ? ralPriceVal : Infinity);
  const maxColorPrice = Math.max(hasRal ? ralPriceVal : -Infinity, standardMax);
  const hasPriceRange = (maxColorPrice - minColorPrice) > 0.01;
  // Build hint segments
  const rangeMin = hasMill ? `${tr('al.','от')} ${millColor.price.toFixed(2).replace('.', ',')} € (${tr('töötlemata','без покрытия')})` : null;
  const rangeMax = hasRal && (ralPriceVal - standardMax) > 0.01 ? `${tr('kuni','до')} ${ralPriceVal.toFixed(2).replace('.', ',')} € (${tr('RAL värv','цвет RAL')})` : null;
  const rangeHint = [rangeMin, rangeMax].filter(Boolean).join(' → ') + (rangeMin || rangeMax ? tr(' · vali värv allpool',' · выберите цвет ниже') : '');
  const ralNote = isRal && ralCode.trim() ? `RAL ${ralCode.trim()}` : '';

  const related = all.filter((p) => p.sku !== product.sku && p.collection.split(';').map((s) => s.trim()).some((c) => c === cat)).slice(0, 4);

  // SEO-friendly subtitle: prefer catalog seoName, else compute from category
  const productSubtitle = (window.__i18n && window.__i18n.field(product,'seoName')) || product.seoName || (() => {
    const led = product.ledCompatible ? 'LED ' : '';
    if (cat === 'Laeprofiilid')          return tr(`Lae ${led}varjuprofiil`,`Потолочный ${led}профиль`);
    if (cat === 'Põrandaprofiilid')      return tr(`Põranda ${led}varjuprofiil`,`Напольный ${led}профиль`);
    if (cat === 'Seina peiteprofiilid')  return tr(`Seina ${led}varjuprofiil`,`Настенный ${led}профиль`);
    if (cat === 'Põrandaliistud')        return tr('Alumiinium põrandaliist','Алюминиевый плинтус');
    if (cat === 'Nurgaprofiilid')        return tr('Alumiinium nurgaprofiil','Алюминиевый угловой профиль');
    if (cat === 'Lisatarvikud')          return tr('Lisatarvik','Аксессуар');
    return cat;
  })();

  const onImgErr = (i) => setImgErrs((prev) => ({ ...prev, [i]: true }));

  // Display photos: only those that haven't errored (or fallback)
  const validIdx = photoCandidates.map((_, i) => i).filter((i) => !imgErrs[i]);
  const showFallback = validIdx.length === 0;
  const FBImg = window.FallbackImg;

  // If the current main image errors out, jump to the first surviving slot.
  React.useEffect(() => {
    if (imgErrs[mainImg] && validIdx.length > 0) setMainImg(validIdx[0]);
  }, [imgErrs, mainImg]);

  return (
    <div className="vp-page">
      <Marquee />
      <div style={{ padding: '18px 56px', fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>
        <a onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>{tr('Avaleht','Главная')}</a> / <a onClick={() => setPage('catalog')} style={{ cursor: 'pointer' }}>{tr('Pood','Магазин')}</a> / <a onClick={() => setPage('catalog', { category: cat })} style={{ cursor: 'pointer' }}>{(window.__locale==='ru' ? ({Laeprofiilid:'Потолочные',Põrandaprofiilid:'Напольные',Põrandaliistud:'Плинтусы','Seina peiteprofiilid':'Настенные скрытые',Kardinaprofiilid:'Карнизные',Lisatarvikud:'Аксессуары',Nurgaprofiilid:'Угловые'})[cat]||cat : cat)}</a> / <span style={{ color: 'var(--ink)' }}>{product.sku}</span>
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', borderTop: '1.5px solid var(--ink)' }}>
        {/* Gallery */}
        <div style={{ padding: 24, background: 'var(--paper-2)', borderRight: '1.5px solid var(--ink)' }}>
          <div style={{ aspectRatio: '1', marginBottom: 10, border: '1.5px solid var(--ink)', overflow: 'hidden', background: 'var(--paper)', position: 'relative' }}>
            {showFallback ?
            <img src={photoFallback} alt={product.sku}
            loading="eager" decoding="async"
            onError={(e) => {e.currentTarget.style.display = 'none';e.currentTarget.parentElement.querySelector('.fb-label').style.display = 'flex';}}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> :

            <FBImg sources={photoCandidates[mainImg]} alt={product.sku} eager
            onAllFail={() => onImgErr(mainImg)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            }
            <div className="fb-label" style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono', fontSize: 32, color: 'var(--muted)', background: 'var(--paper-2)' }}>{product.sku.toLowerCase()}</div>
          </div>
          {!showFallback && validIdx.length > 1 &&
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 16 }}>
              {photoCandidates.map((srcs, i) => imgErrs[i] ? null :
            <div key={i} onClick={() => setMainImg(i)} style={{ aspectRatio: '1', border: mainImg === i ? '2px solid var(--accent)' : '1.5px solid var(--ink)', cursor: 'pointer', overflow: 'hidden', background: 'var(--paper)' }}>
                  <FBImg sources={srcs} alt="" onAllFail={() => onImgErr(i)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
            )}
            </div>
          }
        </div>

        {/* Info */}
        <div style={{ padding: '40px 48px' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span>{(window.__locale==='ru' ? ({Laeprofiilid:'Потолочные',Põrandaprofiilid:'Напольные',Põrandaliistud:'Плинтусы','Seina peiteprofiilid':'Настенные скрытые',Kardinaprofiilid:'Карнизные',Lisatarvikud:'Аксессуары',Nurgaprofiilid:'Угловые'})[cat]||cat : cat)}</span>
            {product.ledCompatible && (
              <span title={tr('LED-valmidusega','Совместим с LED')} style={{ background: '#F4B400', color: '#3a2400', border: '1.5px solid #3a2400', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 10, padding: '3px 7px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>⚡ LED</span>
            )}
            {product.ribbon && <span style={{ color: 'var(--accent)' }}>· {product.ribbon}</span>}
          </div>
          <h1 className="vp-display" style={{ fontSize: 96, margin: '0 0 6px', lineHeight: 0.92 }}>{product.sku}</h1>
          <div style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 24, lineHeight: 1.2, color: 'var(--ink-2)', marginBottom: 16 }}>{productSubtitle}</div>
          {product.description &&
          <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.5, marginTop: 0, marginBottom: 20 }}>
              {(window.__i18n && window.__i18n.field(product,'description')) || product.description}
            </p>
          }
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8, paddingBottom: 8, flexWrap: 'wrap' }}>
            <span className="vp-display" style={{ fontSize: 56 }}>{activePrice.toFixed(2).replace('.', ',')}&nbsp;€</span>
            <span className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)' }}>/ {isFixedUnit ? unitLabel : tr('jooksev meeter','пог.м')} · {tr('KM-ga','с НДС')}</span>
          </div>
          {hasPriceRange && (hasMill || (hasRal && (ralPriceVal - standardMax) > 0.01)) && (
            <div className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--muted)', marginBottom: 24, paddingBottom: 24, borderBottom: '1.5px solid var(--ink)' }}>
              {rangeHint}
            </div>
          )}
          {!(hasPriceRange && (hasMill || (hasRal && (ralPriceVal - standardMax) > 0.01))) && (
            <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1.5px solid var(--ink)' }} />
          )}

          {product.colors.length > 0 &&
          <div style={{ marginBottom: 24 }}>
              <div className="vp-eyebrow" style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                <span>{tr('Värvus','Цвет')}</span>
                <span style={{ color: 'var(--ink)' }}>{
                  isRal
                    ? (ralCode.trim() ? `RAL ${ralCode.trim()}` : tr('RAL — vali toon','RAL — выберите оттенок'))
                    : (product.colors.find((c) => c.hex === color)?.name || '')
                }</span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.colors.map((c) =>
              <div key={c.hex} className={'vp-swatch ' + (color === c.hex ? 'vp-swatch--active' : '')} onClick={() => setColor(c.hex)}>
                    <div className="dot" style={{ background: c.hex }} />
                    <div className="name">{c.name}</div>
                  </div>
              )}
                <div className={'vp-swatch ' + (isRal ? 'vp-swatch--active' : '')} onClick={() => setColor('RAL')}>
                  <div className="dot" style={{ background: 'conic-gradient(red,yellow,lime,cyan,blue,magenta,red)' }} />
                  <div className="name">RAL+</div>
                </div>
              </div>
              {isRal &&
              <div style={{ marginTop: 14, padding: '14px 16px', border: '1.5px solid var(--ink)', background: 'var(--paper-2)' }}>
                <label className="vp-eyebrow" style={{ display: 'block', marginBottom: 8 }} htmlFor="ral-input">{tr('RAL kood','Код RAL')}</label>
                <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, border: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
                  <span className="vp-mono" style={{ padding: '10px 12px', borderRight: '1.5px solid var(--ink)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', background: 'var(--paper-2)' }}>RAL</span>
                  <input
                    id="ral-input"
                    value={ralCode}
                    onChange={(e) => setRalCode(e.target.value.replace(/[^0-9 ]/g, '').slice(0, 8))}
                    placeholder={tr('nt 9005, 7016, 9010','напр. 9005, 7016, 9010')}
                    style={{ flex: 1, padding: '10px 12px', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.04em' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 14, marginTop: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-2)', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--accent)' }}>{tr('⏱ Eritellimus — tarne ~5 nädalat','⏱ Под заказ — поставка ~5 недель')}</span>
                  <span style={{ color: 'var(--accent)' }}>{tr('✕ Tagastusõigus ei kehti','✕ Возврат не действует')}</span>
                  <span>{tr('Pulbervärvitus tehases','Порошковая окраска на заводе')}</span>
                </div>
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                  {tr('RAL toon märgitakse tellimuse juurde märkusena. Eritellimusena valmistatud profiilidele tagastusõigus VÕS § 53 lg 4 p 3 alusel ei kehti.','Оттенок RAL указывается в заказе как примечание. На профили под заказ право возврата на основании VÕS § 53 п.4 пп.3 не действует.')}
                </div>
              </div>
              }
            </div>
          }

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, marginBottom: 24 }}>
            <div>
              <div className="vp-eyebrow" style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span>{tr('Kogus','Количество')} ({isFixedUnit ? unitLabel : tr('tk','шт')})</span>
                {!isFixedUnit && <span style={{ color: 'var(--muted)' }}>{tr('1 tk','1 шт')} = {fmtM(pieceLength)} {tr('m','м')}</span>}
              </div>
              <div className="vp-stepper">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <input value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} />
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isFixedUnit
                  ? `${qty} ${unitLabel}`
                  : (qty > 1 ? `${qty} × ${fmtM(pieceLength)} ${tr('m','м')} = ${fmtM(totalMeters)} ${tr('m kokku','м всего')}` : `${fmtM(pieceLength)} ${tr('m','м')}`)}
              </div>
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <div className="vp-eyebrow" style={{ marginBottom: 4 }}>{tr('Kokku','Итого')}</div>
              <div className="vp-display" style={{ fontSize: 36 }}>{total}&nbsp;€</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <button className="vp-btn vp-btn--lg vp-btn--block" onClick={() => setPage('cart')} style={{ flex: 1 }}>{tr('Lisa korvi','В корзину')} → {total} €</button>
            <button className="vp-btn vp-btn--ghost vp-btn--lg" style={{ padding: '18px 22px' }}>♡</button>
          </div>

          {isRal &&
          <div style={{ marginBottom: 14, padding: '10px 14px', border: '1.5px dashed var(--ink)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-2)', display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <span>{tr('Korvi märge','Заметка в корзине')}</span>
            <span style={{ color: 'var(--ink)' }}>{ralCode.trim() ? `${tr('Värv','Цвет')}: RAL ${ralCode.trim()}` : tr('Värv: RAL — vali toon','Цвет: RAL — выберите оттенок')}</span>
          </div>
          }

          <div style={{ display: 'flex', gap: 18, marginTop: 8, paddingTop: 18, borderTop: '1px solid rgba(0,0,0,0.1)', fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-2)' }}>
            {product.inStock && !isRal && <span>{tr('✓ Laos','✓ На складе')}</span>}
            {isRal
              ? <span style={{ color: 'var(--accent)' }}>{tr('⏱ Tarne ~5 nädalat (eritellimus)','⏱ Поставка ~5 недель (под заказ)')}</span>
              : <span>{tr('✓ Tarne 2–4 päeva','✓ Доставка 2–4 дня')}</span>}
            {isRal
              ? <span style={{ color: 'var(--accent)' }}>{tr('✕ Tagastusõigus ei kehti','✕ Возврат не действует')}</span>
              : <span>{tr('✓ Tagastus 14 päeva','✓ Возврат 14 дней')}</span>}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ borderTop: '1.5px solid var(--ink)' }}>
        <div style={{ display: 'flex', borderBottom: '1.5px solid var(--ink)', flexWrap: 'wrap' }}>
          {[['specs', tr('Tehnilised andmed','Технические данные')], ['faq', tr('Küsimused','Вопросы')]].map(([id, label]) =>
          <button key={id} onClick={() => setTab(id)} style={{ padding: '18px 28px', background: tab === id ? 'var(--ink)' : 'var(--paper)', color: tab === id ? 'var(--paper)' : 'var(--ink)', border: 'none', borderRight: '1.5px solid var(--ink)', fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer' }}>{label}</button>
          )}
        </div>
        <div style={{ padding: '40px 56px' }}>
          {tab === 'specs' &&
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 56px' }}>
              {(product.specs.length > 0 ? product.specs : [
            { k: tr('Pikkus','Длина'), v: '2500 mm' },
            { k: tr('Materjal','Материал'), v: tr('Alumiinium','Алюминий') }]).
            map(({ k, v }) =>
            <div key={k} className="vp-spec-row">
                  <span className="k">{k}</span>
                  <span style={{ fontWeight: 500 }}>{v}</span>
                </div>
            )}
            </div>
          }
          {tab === 'faq' &&
          <ProductFaq product={product} />
          }
        </div>
      </section>

      {/* Cross-sell */}
      {related.length > 0 &&
      <section style={{ padding: '72px 56px', background: 'var(--paper-2)', borderTop: '1.5px solid var(--ink)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
            <h2 className="vp-display" style={{ fontSize: 48, margin: 0 }}>{tr('Sarnased tooted','Похожие товары')}</h2>
            <a className="vp-mono" onClick={() => setPage('catalog', { category: cat })} style={{ fontSize: 12, textTransform: 'uppercase', borderBottom: '1.5px solid var(--ink)', cursor: 'pointer' }}>{tr('Vaata kõiki →','Смотреть все →')}</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {related.map((p) => <ProductCard key={p.sku + p.price} p={p} setPage={setPage} />)}
          </div>
        </section>
      }
    </div>);

}

window.ProductPage = ProductPage;

function ProductFaq({ product }) {
  const [open, setOpen] = React.useState(0);
  const items = [
  [tr('Kas seda profiili saab pahteldada?','Можно ли шпаклевать этот профиль?'), product.sku && product.sku.startsWith('LHV') ? tr('Jah — LHV-seeria on disainitud pahtelda-tav ülemise servaga. Pahtli pealekandmise järel saavutad täiesti sileda seinaülemineku.','Да — серия LHV спроектирована с прошпаклёвываемой верхней кромкой. После шпатлёвки получается идеально ровный переход к стене.') : tr('Pahteldatav variant on LHV-seerias. See toode on pinnapaigaldus — paigaldatav nähtava servaga.','Прошпаклёвываемый вариант — в серии LHV. Этот товар — для видимого монтажа с открытой кромкой.')],
  [tr('Kas saab tellida eritellimuse pikkust?','Можно ли заказать профиль нестандартной длины?'), tr('Ei — me ei lõika profiile. Pakume standardpikkuses (2,5 m laeprofiile ja 2,6 m põrandaprofiile). Vajadusel saab paigaldaja need objektil mõõtu lõigata.','Нет — мы не режем профили. Предлагаем стандартные длины (2,5 м потолочные, 2,6 м напольные). При необходимости монтажник режет их по месту.')],
  [tr('Milline värv on tarne aeg?','Какой срок поставки по цветам?'), tr('Must ja valge — enamasti laos, 2–4 tööpäeva. RAL eritoonid 4–5 nädalat (pulbervärvitus).','Чёрный и белый — обычно на складе, 2–4 рабочих дня. RAL под заказ — 4–5 недель (порошковая окраска).')],
  [tr('Kas LED-iga versioon on olemas?','Есть ли версия с LED?'), tr('Selle profiili LED-versioon on AST-seeria all. LED-ribasid ise me ei müü — profiil on selleks lihtsalt ühilduv.','LED-версия этого профиля — в серии AST. Сами LED-ленты мы не продаём — профиль просто совместим с ними.')],
  [tr('Milline garantii?','Какая гарантия?'), tr('Profiilile ja selle värvile. Katame tootmisdefektid, korrosiooni ja värvi tuhmumise sisetingimustes. LED-ribasid me ei müü ega garanteeri.','На профиль и его покрытие. Покрываем заводские дефекты, коррозию и выцветание краски в сухих помещениях. LED-ленты не продаём и не гарантируем.')]];

  return (
    <div style={{ maxWidth: 880 }}>
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} onClick={() => setOpen(isOpen ? null : i)} style={{ padding: '18px 0', borderTop: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 18 }}>
              <span style={{ fontSize: 16, fontWeight: 600 }}>{q}</span>
              <span style={{ fontSize: 22, lineHeight: 1, color: isOpen ? 'var(--ink)' : 'var(--muted)' }}>{isOpen ? '−' : '+'}</span>
            </div>
            {isOpen && <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', marginTop: 12, paddingRight: 32 }}>{a}</div>}
          </div>);

      })}
    </div>);

}
window.ProductFaq = ProductFaq;