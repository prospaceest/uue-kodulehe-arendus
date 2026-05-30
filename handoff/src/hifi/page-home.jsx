/* Home (B-style) + Cart (A-style) + Contact (B-style) */

function ConfiguratorForm({ setPage }) {
  useLocale(); // configurator re-renders on locale change
  const [meters, setMeters] = React.useState(34);
  const [type, setType] = React.useState('lae');
  const profileLength = type === 'lae' ? 2.5 : 2.6;
  const pieces = Math.ceil(meters / profileLength);
  const totalLength = pieces * profileLength;
  return (
    <>
      <div style={{ marginBottom: 14 }}>
        <label className="vp-eyebrow" style={{ display: 'block', marginBottom: 8 }}>{tr('Vajalik kogus (m)','Нужная длина (м)')}</label>
        <input className="vp-input" type="number" min={1} value={meters} onChange={(e) => setMeters(parseFloat(e.target.value) || 0)} />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label className="vp-eyebrow" style={{ display: 'block', marginBottom: 8 }}>{tr('Profiili tüüp','Тип профиля')}</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button onClick={() => setType('lae')} className={'vp-btn ' + (type !== 'lae' ? 'vp-btn--ghost' : '')} style={{ padding: '14px 14px', fontSize: 12 }}>
            {tr('Lae profiil · 2,5 m','Потолочный · 2,5 м')}
          </button>
          <button onClick={() => setType('porand')} className={'vp-btn ' + (type !== 'porand' ? 'vp-btn--ghost' : '')} style={{ padding: '14px 14px', fontSize: 12 }}>
            {tr('Põranda profiil · 2,6 m','Напольный · 2,6 м')}
          </button>
        </div>
      </div>
      <div style={{ padding: '18px 20px', border: '1.5px solid var(--ink)', background: 'var(--paper-2)', marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6, color: 'var(--ink-2)' }}>
          <span>{meters} m ÷ {profileLength.toString().replace('.', ',')} m</span>
          <span className="vp-mono" style={{ color: 'var(--muted)' }}>{(meters / profileLength).toFixed(2)} → ↑</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 10, marginTop: 8 }}>
          <div>
            <div className="vp-display" style={{ fontSize: 48, lineHeight: 1 }}>{pieces}</div>
            <div className="vp-eyebrow" style={{ marginTop: 4 }}>{tr('profiili tükki','штук профиля')}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>= {totalLength.toFixed(1).replace('.', ',')} {tr('m kogupikkus','м общая длина')}</div>
          </div>
        </div>
      </div>
      <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.5 }}>
        {tr('Profiile ei poolitata — kogus ümardatakse järgmise täistükini.','Профили не режутся — количество округляется до целой штуки.')}
      </div>
      <button className="vp-btn" onClick={() => setPage && setPage('category', { category: type === 'lae' ? 'Laeprofiilid' : 'Põrandaprofiilid' })}>{tr('Vaata','Смотреть')} {type === 'lae' ? tr('laeprofiile','потолочные') : tr('põrandaprofiile','напольные')} →</button>
    </>);

}

function HomePage({ setPage, tweaks }) {
  useLocale(); // re-render on locale change
  const heroVariant = tweaks.heroStyle || 'asymmetric';
  return (
    <div className="vp-page">
      {/* HERO — full-bleed cinematic video */}
      <section style={{ position: 'relative', width: '100%', height: 'calc(100vh - 60px)', minHeight: 640, maxHeight: 920, overflow: 'hidden', borderBottom: '1.5px solid var(--ink)', background: '#000', color: '#fff' }}>
        <video
          src="assets/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', zIndex: 0 }} />
        
        {/* Gradient overlays for text legibility — strong on edges, softer mid */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.55) 100%)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0) 60%)', zIndex: 1, pointerEvents: 'none' }} />

        {/* Top-left eyebrow row */}
        <div style={{ position: 'absolute', top: 32, left: 56, right: 56, zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.85)' }}>
          <span>{tr('★ Kollektsioon 026 — Kevad 2026','★ Коллекция 026 — Весна 2026')}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5544', display: 'inline-block', boxShadow: '0 0 8px rgba(255,85,68,0.7)' }} />
            {tr('Live','Live')} · {(window.__catalogProducts || []).filter((p) => p.inStock).length} {tr('toodet laos','товаров на складе')}
          </span>
        </div>

        {/* Centered headline */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 56px 140px' }}>
          <h1 className="vp-display" style={{ fontSize: 'clamp(64px, 9vw, 160px)', margin: 0, lineHeight: 0.92, color: '#fff', maxWidth: '14ch', textShadow: '0 2px 40px rgba(0,0,0,0.3)' }}>
            {tr('Profiilid,','Профили,')}<br />
            <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.62em', letterSpacing: '-0.02em', display: 'inline-block', transform: 'translateY(-0.05em)' }}>{tr('mis kaovad','которые исчезают')}</span><br />
            {tr('seinte sisse.','в стене.')}
          </h1>
          <p style={{ maxWidth: 480, fontSize: 17, lineHeight: 1.55, marginTop: 28, color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}>{tr('Eesti alumiinium varjuprofiilide pood. LED-iga ja dekoratiivsed mudelid laele, seinale, põrandale. RAL-värvitud, saadaval otse laost.','Эстонский магазин алюминиевых теневых профилей. LED и декоративные модели для потолка, стены, пола. Окраска RAL, прямо со склада.')}

          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 32 }}>
            <button
              className="vp-btn vp-btn--lg"
              onClick={() => setPage('catalog')}
              style={{ background: '#fff', color: '#000', borderColor: '#fff' }}>
              
              {tr('Avasta tooted →','Открыть каталог →')}
            </button>

          </div>
        </div>

        {/* Bottom stats strip — dark glass */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(255,255,255,0.18)', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', color: '#fff' }}>
          {[
          { n: String((window.__catalogProducts || []).filter((p) => p.inStock).length), l: tr('Toodet laos','Товаров на складе') },
          { n: '200 €+', l: tr('Tasuta tarne Eestis','Бесплатная доставка по Эстонии') },
          { n: '∞', l: tr('RAL värvitoone','Оттенков RAL') },
          { n: tr('14 p','14 дн.'), l: tr('Tagastusõigus','Право возврата') }].
          map((s, i) =>
          <div key={i} style={{ padding: '22px 28px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.18)' : 'none', display: 'flex', alignItems: 'baseline', gap: 14, justifyContent: 'space-between' }}>
              <div className="vp-display" style={{ fontSize: 42, lineHeight: 1, color: '#fff' }}>{s.n}</div>
              <div className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}>{s.l}</div>
            </div>
          )}
        </div>

        {/* Scroll cue removed — was hardcoded "01 / 08", not useful (U-09 fix) */}
      </section>

      {/* INTERACTIVE SCENE */}
      <InteractiveScene tweaks={tweaks} setPage={setPage} />

      {/* CATEGORY GRID */}
      <section style={{ padding: '80px 56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{tr('02 / Kollektsioonid','02 / Коллекции')}</div>
            <h2 className="vp-display" style={{ fontSize: 64, margin: 0 }}>{tr('Osta kategooria järgi','Покупки по категориям')}</h2>
          </div>
          <a href="#" onClick={(e) => {e.preventDefault();setPage('catalog');}} style={{ fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1.5px solid var(--ink)' }}>{tr('Vaata kõiki →','Смотреть все →')}</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {(() => {
            const all = window.__catalogProducts || [];
            const count = (cat) => {
              const seen = new Set();
              all.forEach((p) => {
                if (p.collection.split(';').map((s) => s.trim()).includes(cat)) seen.add(p.sku);
              });
              return seen.size;
            };
            return [
              { n: '01', t: tr('Laeprofiilid','Потолочные'), c: count('Laeprofiilid'), img: 'assets/categories/laeprofiilid.webp', cat: 'Laeprofiilid' },
              { n: '02', t: tr('Põrandaprofiilid','Напольные'), c: count('Põrandaprofiilid'), img: 'assets/categories/porandaprofiilid.webp', cat: 'Põrandaprofiilid' },
              { n: '03', t: tr('Põrandaliistud','Плинтусы'), c: count('Põrandaliistud'), img: 'assets/categories/porandaliistud.webp', cat: 'Põrandaliistud' },
              { n: '04', t: tr('Seina peiteprofiilid','Настенные скрытые'), c: count('Seina peiteprofiilid'), img: 'assets/categories/seina-peitesiinid.webp', cat: 'Seina peiteprofiilid' }
            ].map((c) =>
          <a key={c.n} href="#" onClick={(e) => {e.preventDefault();setPage('category', { category: c.cat });}} style={{ border: '1.5px solid var(--ink)', display: 'block', position: 'relative' }}>
              <div className="vp-photo" style={{ aspectRatio: '4/5', borderBottom: '1.5px solid var(--ink)', position: 'relative', overflow: 'hidden' }}>
                <img src={c.img} alt={c.t} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '18px 18px 20px' }}>
                <div className="vp-eyebrow">{c.n} / {c.c} {tr('toodet','товаров')}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                  <span className="vp-display" style={{ fontSize: 28 }}>{c.t}</span>
                  <span style={{ fontSize: 18 }}>→</span>
                </div>
              </div>
            </a>
          );
          })()}
        </div>
      </section>

      {/* CONFIGURATOR + BESTSELLERS */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ padding: '56px 48px', borderRight: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('03 / Tööriist','03 / Калькулятор')}</div>
          <h2 className="vp-display" style={{ fontSize: 56, margin: 0 }}>{tr('Konfiguraator','Конфигуратор')}</h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 380, margin: '14px 0 28px' }}>{tr('Sisesta vajalik meetrite kogus ja vali profiili tüüp - arvutame välja vajaliku tükkide arvu.','Введите нужную длину в метрах и выберите тип профиля — рассчитаем количество штук.')}

          </p>
          <ConfiguratorForm setPage={setPage} />
        </div>
        <div style={{ padding: '56px 48px', background: 'var(--paper-2)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('04 / Enimmüüdud','04 / Хиты продаж')}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 24px' }}>{tr('Top 10','Топ-10')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {['AST22', 'AST14_12', 'RST14', 'AST30', 'AST50', 'ASPL35', 'ASP112', 'ASP904', 'ASP60', 'ASP198'].
            map((key, i) => {
              const list = window.__catalogProducts || [];
              const prod = list.find((x) => x.sku === key) || list.find((x) => x.name === key) || { sku: key, name: key, price: 0 };
              const navSku = prod.sku;
              const imgs = (window.__productImages || {})[navSku] || (window.__productImages || {})[key] || (window.__productImages || {})[key.replace('_', '')] || [];
              const thumb = imgs[0];
              const priceStr = prod.price ? prod.price.toFixed(2).replace('.', ',') : '—';
              return (
                <a key={key} href="#" onClick={(e) => {e.preventDefault();setPage('product', { sku: navSku });}} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <div className="vp-photo" style={{ width: 64, height: 64, flexShrink: 0, border: '1px solid var(--ink)', position: 'relative', overflow: 'hidden' }}>
                  {thumb ?
                    <img src={encodeURI(thumb.normalize('NFD'))} alt={key} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> :
                    <span className="label" style={{ fontSize: 8, padding: '2px 4px' }}>{(i + 1).toString().padStart(2, '0')}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{key}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{priceStr} €/m</div>
                </div>
                <span style={{ fontSize: 18 }}>→</span>
              </a>);
            })}
          </div>
        </div>
      </section>

      {/* INSPIRATION GRID */}
      <section style={{ padding: '80px 56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{tr('05 / Päris projektid','05 / Реальные проекты')}</div>
            <h2 className="vp-display" style={{ fontSize: 64, margin: 0 }}>{tr('Inspiratsioon','Вдохновение')}</h2>
          </div>
          <a onClick={() => setPage('inspiration')} style={{ cursor: 'pointer', fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1.5px solid var(--ink)' }}>{tr('Vaata kõiki →','Смотреть все →')}</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {[
          {
            id: 'eduardi-maja',
            l: 'Eramaja · Harjumaa · 2025',
            t: 'Üks maja, kolm SKU-d, üks pidev joon',
            img: 'assets/projects/eduardi-maja/00-home-cover.png',
            alt: 'Eduardi maja peamagamistuba — AST50 LED varjuprofiili soe perimeeter lae ja seina üleminekul, sisseehitatud garderoob ja lapse maal molbertil',
            profiles: 'AST22 · AST30 · AST50',
            meters: '184 jm'
          },
          {
            id: 'tallinna-korter',
            l: 'Korter · Tallinn · 2025',
            t: 'Valgus ja jooned ilma sisearhitektita',
            img: 'assets/projects/tallinna-korter/00-home-cover.png',
            alt: 'Tallinna korteri köök — AST50 LED varjuprofiili hõljuv lagi köögisaare kohal, tammeparkett ja mattbeež köögimööbel',
            profiles: 'AST22 · AST30 · AST50 · MPA015',
            meters: '144 jm'
          },
          {
            id: 'viimsi-vannituba',
            l: 'Eramaja · Viimsi · 2026',
            t: 'Üks vann, kaks LED-joont, kolm stseeni',
            img: 'assets/projects/viimsi-vannituba/00-home-cover.png',
            alt: 'Viimsi vannituba — vabaltseisev kivivann nišis, AST30 LED varjuprofiili soe joon laeserval ja ASPL130 põranda LED varjuprofiil hõljuva valguskoridorina',
            profiles: 'AST30 · ASPL130',
            meters: '8 jm'
          }].
          map((p, i) =>
          <article key={p.id} onClick={() => setPage('project', { id: p.id })} style={{ cursor: 'pointer' }}>
              <div style={{ aspectRatio: '4/5', marginBottom: 14, overflow: 'hidden', border: '1.5px solid var(--ink)' }}>
                <img src={p.img} alt={p.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div className="vp-eyebrow" style={{ marginBottom: 6 }}>{p.l}</div>
              <h3 style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 400, fontSize: 22, margin: 0, lineHeight: 1.3 }}>"{p.t}."</h3>
              <div className="vp-mono" style={{ fontSize: 11, marginTop: 10, color: 'var(--muted)' }}>{p.profiles} · {p.meters}</div>
            </article>
          )}
        </div>
      </section>

      {/* B2B + SALON */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ padding: '56px 48px', borderRight: '1.5px solid var(--ink)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('Professionaalidele','Профессионалам')}</div>
          <h3 className="vp-display" style={{ fontSize: 42, margin: '0 0 14px' }}>{tr('Arhitekt · Sisekujundaja','Архитектор · Дизайнер')}<br />{tr('Ehitaja','Строитель')}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 400, marginBottom: 24 }}>
Soodushinnad, näidiskomplektid, tehniline tugi ja kaasturundus.
          </p>
          <button className="vp-btn vp-btn--ghost">{tr('Liitu partneriprogrammiga →','Стать партнёром →')}</button>
        </div>
        <div style={{ padding: '56px 48px', background: 'var(--paper-2)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('Salong · Tallinn','Салон · Таллинн')}</div>
          <h3 className="vp-display" style={{ fontSize: 42, margin: '0 0 14px' }}>{tr('Tule näidiseid','Приходите смотреть')}<br />{tr('vaatama','образцы')}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
            {(window.__site||{}).addressFull} · {(window.__site||{}).hours}<br /><a href={(window.__site||{}).phoneUrl} style={{color:'inherit', textDecoration:'none', borderBottom:'1px solid currentColor'}}>{(window.__site||{}).phone}</a>
          </p>
          <button className="vp-btn vp-btn--ghost" onClick={() => setPage('contact')}>{tr('Broneeri visiit →','Записаться на визит →')}</button>
        </div>
      </section>

      {/* INSTAGRAM RUNNING FEED */}
      <section style={{ borderBottom: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
        <div style={{ padding: '64px 56px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('06 / Sotsiaalmeedia','06 / Соцсети')}</div>
            <h2 className="vp-display" style={{ fontSize: 64, margin: 0, lineHeight: 0.95 }}>@varjuprofiilid.ee</h2>
<p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 520, marginTop: 14 }}>
              {tr('Jälgi meid Instagrammis, saa inspiratsiooni ja ole alati kursis viimaste suundadega.','Следите за нами в Instagram — вдохновение и последние тренды.')}
            </p>
          </div>
          <a href="https://www.instagram.com/varjuprofiilid.ee/" target="_blank" rel="noopener" className="vp-btn vp-btn--ghost" style={{ alignSelf: 'flex-end' }}>{tr('Jälgi Instagramis →','Подписаться в Instagram →')}</a>
        </div>
        <div className="vp-ig-viewport" style={{ paddingBottom: 64 }}>
          {(() => {
            const tiles = [
            { img: 'assets/projects/projekt01.webp', cap: 'Köögi LED-riba lakke — pereelu valgustab @studio_kahekesi paigaldus.', likes: '342', comments: '18', tag: '#LHV10 #LED' },
            { img: 'assets/products/AST22_1.jpg', cap: 'AST22 must matt — õhuke joon põranda ja seina vahel.', likes: '218', comments: '9', tag: '#AST22 #peitliist' },
            { img: 'assets/projects/projekt02.webp', cap: 'Vannitoa peitevalgustus — niiskuskindel LED-profiil.', likes: '512', comments: '34', tag: '#vannituba' },
            { img: 'assets/LHV10/LHV10_1.jpg', cap: 'LHV10 — meie enimmüüdud lae peiteprofiil pahteldatud paigalduses.', likes: '894', comments: '47', tag: '#LHV10' },
            { img: 'assets/products/AST30_1.jpg', cap: 'AST30 — 30 mm sokliprofiil RAL 9005 toonis.', likes: '276', comments: '12', tag: '#sokkel' },
            { img: 'assets/projects/projekt03.webp', cap: 'Magamistoa nurgaprofiil — pehme detail, suur mõju.', likes: '631', comments: '28', tag: '#magamistuba' },
            { img: 'assets/products/ASPL35_1.jpg', cap: 'ASPL35 alumiinium põrandaliist — 2,6 m standard.', likes: '189', comments: '7', tag: '#ASPL35' },
            { img: 'assets/LHV10/LHV10_4.jpg', cap: 'Detail: LHV10 paigaldus enne pahteldust.', likes: '423', comments: '21', tag: '#paigaldus' },
            { img: 'assets/products/ASP904_4.webp', cap: 'ASP904 LED-profiil — 24 V valgusriba ühildub.', likes: '358', comments: '15', tag: '#ASP904 #LED' },
            { img: 'assets/products/AST14_12.jpg', cap: 'AST14_12 — Top 1 paigaldajate seas.', likes: '742', comments: '38', tag: '#AST14' }];

            const loop = [...tiles, ...tiles];
            return (
              <div className="vp-ig-track">
                {loop.map((t, i) =>
                <a key={i} href="https://www.instagram.com/varjuprofiilid.ee/" target="_blank" rel="noopener" className="vp-ig-tile">
                    <img src={encodeURI(t.img.normalize('NFD'))} alt={t.cap} loading="lazy" />
                    <span className="vp-ig-corner" />
                    <div className="vp-ig-tile-meta">
                      <div className="vp-ig-tile-caption">{t.cap}</div>
                      <div className="vp-ig-tile-stats">
                        <span>♥ {t.likes}</span>
                        <span>◷ {t.comments}</span>
                        <span style={{ marginLeft: 'auto', opacity: 0.7 }}>{t.tag}</span>
                      </div>
                    </div>
                  </a>
                )}
              </div>);

          })()}
        </div>
      </section>

      {/* BLOG / UUDISED */}
      <section style={{ padding: '80px 56px', borderBottom: '1.5px solid var(--ink)', background: 'var(--paper-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{tr('07 / Uudised','07 / Журнал')}</div>
            <h2 className="vp-display" style={{ fontSize: 64, margin: 0 }}>{tr('Juhendid & inspiratsioon','Гайды и вдохновение')}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 520, marginTop: 14 }}>
{tr('Miks lugeda meie uudiseid? Avaldame soovitusi, tutvustame uusi tooteid ja jagame, kuidas teised on lahendused oma kodus ellu viinud.','Зачем читать наш журнал? Делимся рекомендациями, представляем новинки и показываем, как решения внедрили другие.')}
            </p>
          </div>
          <a href="#" onClick={(e) => {e.preventDefault();setPage('blog');}} style={{ fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1.5px solid var(--ink)', paddingBottom: 2 }}>{tr('Vaata kõiki artikleid →','Все статьи →')}</a>
        </div>
        {(() => {
          const posts = [
          { id: 'b0', t: 'Põrandaliist, mida sa ei märka: täisjuhend varjuprofiilide valikule (2026)', cat: 'Juhend', y: '2026 · mai', read: '10 min', cover: 'assets/projects/projekt01.webp', excerpt: 'Mis on varjuprofiil, kuidas see asendab põrandaliistu ja millised tüübid sobivad Eesti korterisse.' },
          { id: 'b1', t: 'Varjuprofiilide erinevad tüübid: juhend kaasaegseks siseviimistluseks', cat: 'Tüübivalik', y: '2026 · apr', read: '7 min', cover: 'assets/projects/projekt02.webp', excerpt: 'Standardne, LED-iga ja MDF-täitega varjuprofiil — kolm peamist lahendust.' },
          { id: 'b2', t: 'Mis on varjuprofiil ja kuidas seda interjööris kasutada?', cat: 'Disain', y: '2026 · märts', read: '7 min', cover: 'assets/projects/projekt03.webp', excerpt: 'Definitsioon, peamised eelised, lihtne paigaldus ja viis loovat võimalust kasutada.' }];

          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {posts.map((p, i) =>
              <a key={p.id || i} href="#" onClick={(e) => {e.preventDefault();setPage('post', { id: p.id });}}
              style={{ display: 'flex', flexDirection: 'column', border: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
                  <div style={{ aspectRatio: '4/3', borderBottom: '1.5px solid var(--ink)', position: 'relative', overflow: 'hidden', background: 'var(--paper-2)' }}>
                    <img src={p.cover} alt={p.t} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    <span style={{ position: 'absolute', top: 12, left: 12, background: 'var(--paper)', border: '1.5px solid var(--ink)', fontFamily: 'JetBrains Mono', fontSize: 10, padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {p.cat}
                    </span>
                  </div>
                  <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
                    <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p.y} · {p.read} {tr('lugemine','чтение')}</div>
                    <h3 className="vp-display" style={{ fontSize: 26, margin: 0, lineHeight: 1.05 }}>{p.t}</h3>
                    {p.excerpt && <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>{p.excerpt}</p>}
                    <span style={{ marginTop: 'auto', fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1.5px solid var(--ink)', alignSelf: 'flex-start', paddingBottom: 2 }}>{tr('Loe artiklit →','Читать статью →')}</span>
                  </div>
                </a>
              )}
            </div>);

        })()}
      </section>

      {/* PARTNERS */}
      <section style={{ padding: '48px 48px 56px', borderBottom: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('08 / Kliendid ja koostööpartnerid','08 / Клиенты и партнёры')}</div>
            <h3 className="vp-display" style={{ fontSize: 36, margin: 0 }}>{tr('Usaldatud eesti arhitektide ja ehitajate poolt','Нам доверяют архитекторы и строители Эстонии')}</h3>
          </div>
          {/* "Vaata kõiki partnereid →" link eemaldatud (U-07) — partnerite-lehte pole */}
        </div>
        {(() => {
          const partners = [
          { src: 'assets/partners/bildgren.svg', alt: 'Bildgren', h: 40 },
          { src: 'assets/partners/diotech-nord.png', alt: 'Diotech Nord', h: 56 },
          { src: 'assets/partners/dorpat-ehitus.png', alt: 'Dorpat Ehitus', h: 46 },
          { src: 'assets/partners/mapri-ehitus.png', alt: 'Mapri Ehitus', h: 84 },
          { src: 'assets/partners/ace-of-space.png', alt: 'Ace of Space', h: 96 },
          { src: 'assets/partners/hanset-ehitus.png', alt: 'Hanset Ehitus', h: 68 },
          { src: 'assets/partners/krc.png', alt: 'KRC Ehitus', h: 64 },
          { src: 'assets/partners/metropoli-ehitus.png', alt: 'Metropoli Ehitus', h: 36 },
          { src: 'assets/partners/timber-element.png', alt: 'Timber Element', h: 72 },
          { src: 'assets/partners/tulevara.png', alt: 'Tulevara', h: 44 },
          { src: 'assets/partners/ehitusinsener.png', alt: 'Ehitusinsener', h: 32 },
          { src: 'assets/partners/ars-interjoor.png', alt: 'ARS Interjöör', h: 36 },
          { src: 'assets/partners/maidisain.png', alt: 'Maidisain', h: 36 },
          { src: 'assets/partners/soome-maja.png', alt: 'Soome Maja', h: 24 }];

          const cols = 5;
          const rows = Math.ceil(partners.length / cols);
          const total = cols * rows;
          const cells = [...partners, ...Array(total - partners.length).fill(null)];
          return (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, borderTop: '1px solid var(--ink)', borderLeft: '1px solid var(--ink)' }}>
              {cells.map((p, i) =>
              <div key={i} style={{ borderRight: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)', padding: '32px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160, background: 'var(--paper)', transition: 'background 0.2s' }}
              onMouseEnter={(e) => {if (p) e.currentTarget.style.background = 'var(--paper-2)';}}
              onMouseLeave={(e) => {if (p) e.currentTarget.style.background = 'var(--paper)';}}>
                  {p ?
                <img src={p.src} alt={p.alt} style={{ height: p.h, width: 'auto', maxWidth: '90%', objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.75, transition: 'all 0.2s' }}
                onMouseEnter={(e) => {e.currentTarget.style.filter = 'grayscale(0)';e.currentTarget.style.opacity = '1';}}
                onMouseLeave={(e) => {e.currentTarget.style.filter = 'grayscale(1)';e.currentTarget.style.opacity = '0.75';}} /> :

                i === cells.length - 1 ?
                <span className="vp-mono" style={{ fontSize: 11, color: 'var(--ink-2)', opacity: 0.55, letterSpacing: '0.08em' }}>{tr('+ JA TEISED','+ И ДРУГИЕ')}</span> :
                null
                }
                </div>
              )}
            </div>);

        })()}
      </section>
    </div>);

}

window.HomePage = HomePage;