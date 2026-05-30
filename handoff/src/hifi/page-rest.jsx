/* Cart, Category, Contact pages */

function CartPage({ setPage }) {  useLocale(); // CartPage locale
  const items = [
  { sku: 'LHV10', name: 'Lae LED peitesiin', color: 'Must', length: '2500 mm', qty: 10, price: 13.50 },
  { sku: 'AST20', name: 'LED nurkprofiil', color: 'Hõbe', length: '2500 mm', qty: 6, price: 13.50 },
  { sku: 'ASP611', name: 'Põrandaliist', color: 'Valge', length: '2500 mm', qty: 14, price: 15.03 }];

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 200 ? 0 : 9.90;
  const total = subtotal + shipping;
  return (
    <div className="vp-page">
      <Marquee />
      <section style={{ padding: '48px 56px 24px', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('1. Korv → 2. Andmed → 3. Tarne → 4. Maksmine','1. Корзина → 2. Данные → 3. Доставка → 4. Оплата')}</div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: 0 }}>{tr('Sinu korv','Ваша корзина')} ({items.length})</h1>
      </section>
      <section style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr' }}>
        <div style={{ borderRight: '1.5px solid var(--ink)' }}>
          {items.map((it, i) =>
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '130px 1fr auto', gap: 24, padding: '28px 40px', borderBottom: '1.5px solid var(--ink)', alignItems: 'center' }}>
              <div className="vp-photo" style={{ aspectRatio: '1', border: '1.5px solid var(--ink)' }}><span className="label">{it.sku.toLowerCase()}</span></div>
              <div>
                <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>{it.sku}</div>
                <div className="vp-display" style={{ fontSize: 32, marginBottom: 4 }}>{it.name}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>{it.color} · {it.length}</div>
                <div style={{ display: 'flex', gap: 14, marginTop: 14, alignItems: 'center' }}>
                  <div className="vp-stepper" style={{ height: 36 }}>
                    <button style={{ width: 36, height: 34 }}>−</button>
                    <input value={it.qty} readOnly style={{ width: 48, height: 34 }} />
                    <button style={{ width: 36, height: 34 }}>+</button>
                  </div>
                  <span className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', borderBottom: '1px solid var(--ink)', cursor: 'pointer' }}>{tr('Eemalda','Удалить')}</span>
                  <span className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', borderBottom: '1px solid var(--ink)', cursor: 'pointer' }}>{tr('Salvesta hiljemaks','Сохранить на потом')}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{it.qty} × {it.price.toFixed(2).replace('.', ',')} €</div>
                <div className="vp-display" style={{ fontSize: 32 }}>{(it.qty * it.price).toFixed(2).replace('.', ',')}&nbsp;€</div>
              </div>
            </div>
          )}
          <div style={{ padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a onClick={() => setPage('catalog')} style={{ cursor: 'pointer', fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', borderBottom: '1.5px solid var(--ink)' }}>{tr('← Jätka ostlemist','← Продолжить покупки')}</a>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="vp-input" placeholder={tr('Sooduskood','Промокод')} style={{ width: 200 }} />
              <button className="vp-btn vp-btn--ghost">{tr('Rakenda','Применить')}</button>
            </div>
          </div>
        </div>
        <aside style={{ padding: '40px 40px', background: 'var(--paper-2)', position: 'sticky', top: 60, alignSelf: 'start' }}>
          <h2 className="vp-display" style={{ fontSize: 42, margin: '0 0 22px' }}>{tr('Kokkuvõte','Сводка')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{tr('Tooted','Товары')} ({items.reduce((s, i) => s + i.qty, 0)} {tr('m','м')})</span><span>{subtotal.toFixed(2).replace('.', ',')} €</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{tr('Tarne (Venipak, 2–4 p)','Доставка (Venipak, 2–4 дн.)')}</span><span>{shipping === 0 ? tr('Tasuta','Бесплатно') : shipping.toFixed(2).replace('.', ',') + ' €'}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: 12 }}><span>{tr('sh. käibemaks 24%','в т.ч. НДС 24%')}</span><span>{(total * 0.24 / 1.24).toFixed(2).replace('.', ',')} €</span></div>
          </div>
          <hr className="vp-divider" style={{ margin: '18px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <span className="vp-eyebrow">{tr('Kokku','Итого')}</span>
            <span className="vp-display" style={{ fontSize: 48 }}>{total.toFixed(2).replace('.', ',')}&nbsp;€</span>
          </div>
          <button className="vp-btn vp-btn--lg vp-btn--block" style={{ marginBottom: 10 }} onClick={() => setPage('checkout')}>{tr('Vormista tellimus →','Оформить заказ →')}</button>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', fontSize: 10, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-2)', marginTop: 14, padding: '12px 0', borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
            <span>{tr('✓ Tasuta tarne 200 €+','✓ Бесплатно от 200 €')}</span>
            <span>{tr('✓ 14 päeva tagastus','✓ Возврат 14 дней')}</span>
            <span>{tr('✓ Garantii 5 a','✓ Гарантия 5 лет')}</span>
          </div>
          <div style={{ marginTop: 14, padding: '12px 14px', border: '1.5px dashed rgba(0,0,0,0.2)', fontSize: 12, lineHeight: 1.55, color: 'var(--ink-2)' }}>
            <strong>{tr('Maksmine:','Оплата:')}</strong> {tr('kodulehel automaatset kaardimakset ei paku. Saadame sulle 24 h jooksul e-arve — tasud SEPA ülekandega.','на сайте автоматическая оплата картой не доступна. Отправим счёт в течение 24 ч — оплатите SEPA-переводом.')}
          </div>
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(0,0,0,0.1)', fontSize: 12, lineHeight: 1.6, color: 'var(--ink-2)' }}>
            <strong>{tr('Vajad nõu?','Нужна консультация?')}</strong> {tr('Kirjuta','Напишите')} <a href={(window.__site||{}).emailUrl} style={{color:'inherit', borderBottom:'1px solid currentColor'}}>{(window.__site||{}).email}</a> {tr('või helista','или позвоните')} <a href={(window.__site||{}).phoneUrl} style={{color:'inherit', borderBottom:'1px solid currentColor'}}>{(window.__site||{}).phone}</a> ({tr('E–R 10–17','Пн–Пт 10–17')}).
          </div>
        </aside>
      </section>
    </div>);

}

const CATEGORY_META = {
  'Laeprofiilid': {
    num: '01',
    title: ['Lae-', 'profiilid.'],
    img: 'assets/categories/laeprofiilid.webp',
    blurb: 'Peitevalgustuse alumiiniumprofiilid lae ja seina ühenduseks. Pahteldatav, värvitav, LED-ühilduv.',
    facets: ['Kõik', 'Pahteldatav', 'LED-ühilduv']
  },
  'Põrandaprofiilid': {
    num: '02',
    title: ['Põranda-', 'profiilid.'],
    img: 'assets/categories/porandaprofiilid.webp',
    blurb: 'Peidetud paigaldusega põranda varjuprofiilid — selge joon põranda ja seina vahel ilma traditsioonilise liistuta.',
    facets: ['Kõik', 'Pahteldatav', 'LED-ühilduv', 'MDF-täidisega']
  },
  'Põrandaliistud': {
    num: '03',
    title: ['Põranda-', 'liistud.'],
    img: 'assets/categories/porandaliistud.webp',
    blurb: 'Õhukesed alumiiniumist põrandaliistud kaasaegseks viimistluseks. RAL värvitud, lihtne paigaldus.',
    facets: ['Kõik', '35 mm', '60 mm', '100 mm']
  },
  'Seina peiteprofiilid': {
    num: '04',
    title: ['Seina', 'peiteprofiil.'],
    img: 'assets/categories/seina-peitesiinid.webp',
    blurb: 'Seina peiteprofiilid võimaldavad jätta ilma liistuda viimistluse kuni põrandani.',
    facets: ['Kõik']
  }
};

function CategoryPage({ setPage, params }) {  useLocale(); // CategoryPage locale
  const all = window.__catalogProducts || [];
  const categoryName = params && params.category || 'Laeprofiilid';
  const meta = CATEGORY_META[categoryName] || CATEGORY_META['Laeprofiilid'];

  const products = React.useMemo(() => {
    const seen = new Set();
    return all.filter((p) => {
      if (!p.collection.split(';').map((s) => s.trim()).includes(categoryName)) return false;
      if (seen.has(p.sku)) return false;
      seen.add(p.sku);
      return true;
    });
  }, [all, categoryName]);

  const [sort, setSort] = React.useState('popular');
  const TOP10_RANK = window.__top10Rank || {};
  const sorted = React.useMemo(() => {
    const arr = [...products];
    if (sort === 'price-asc') arr.sort((a, b) => a.price - b.price);else
    if (sort === 'price-desc') arr.sort((a, b) => b.price - a.price);else
    arr.sort((a, b) => {
      const ra = TOP10_RANK[a.sku] || 999,rb = TOP10_RANK[b.sku] || 999;
      return ra - rb;
    });
    return arr;
  }, [products, sort]);

  const minPrice = products.length ? Math.min(...products.map((p) => p.price)) : 0;
  const others = Object.entries(CATEGORY_META).filter(([n]) => n !== categoryName);
  const others3 = others.slice(0, 3);

  return (
    <div className="vp-page" data-screen-label={`Kategooria · ${categoryName}`}>
      <Marquee />
      {/* Hero with category context */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1.5px solid var(--ink)', minHeight: 520 }}>
        <div style={{ padding: '56px 48px', borderRight: '1.5px solid var(--ink)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
              <a onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>{tr('Avaleht','Главная')}</a> / <a onClick={() => setPage('catalog')} style={{ cursor: 'pointer' }}>{tr('Pood','Магазин')}</a> / <span style={{ color: 'var(--ink)' }}>{(window.__locale==='ru' ? ({Laeprofiilid:'Потолочные',Põrandaprofiilid:'Напольные',Põrandaliistud:'Плинтусы','Seina peiteprofiilid':'Настенные скрытые',Kardinaprofiilid:'Карнизные',Lisatarvikud:'Аксессуары',Nurgaprofiilid:'Угловые'})[categoryName]||categoryName : categoryName)}</span>
            </div>
            <div className="vp-mono" style={{ fontSize: 13, marginBottom: 14 }}>{meta.num} / 04</div>
            <h1 className="vp-display" style={{ fontSize: 'clamp(64px, 9vw, 132px)', margin: 0, lineHeight: 0.92 }}>{tr(meta.title[0]+meta.title[1], ({Laeprofiilid:'Потолочные профили.',Põrandaprofiilid:'Напольные профили.',Põrandaliistud:'Плинтусы.','Seina peiteprofiilid':'Настенные скрытые.'})[categoryName] || (meta.title[0]+meta.title[1]))}</h1>
            <p style={{ maxWidth: 460, fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', marginTop: 24 }}>
              {tr(meta.blurb, ({Laeprofiilid:'Алюминиевые профили скрытой подсветки для стыка потолка и стены. Прошпаклёвываемые, окрашиваемые, совместимы с LED.',Põrandaprofiilid:'Напольные теневые профили скрытого монтажа — чёткая линия между полом и стеной без обычного плинтуса.',Põrandaliistud:'Тонкие алюминиевые плинтусы для современной отделки. Окраска RAL, простой монтаж.','Seina peiteprofiilid':'Настенные скрытые профили позволяют завершить отделку без плинтуса до самого пола.'})[categoryName] || meta.blurb)}
              <strong style={{ display: 'block', marginTop: 10 }}>{products.length} {tr('toodet','товаров')}{minPrice ? ` · ${tr('alates','от')} ${minPrice.toFixed(2).replace('.', ',')} €/${tr('m','пог.м')}` : ''}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
            {meta.facets.map((f, i) =>
            <span key={f} className={i === 0 ? 'vp-chip vp-chip--active' : 'vp-chip'}>{tr(f, ({'Kõik':'Все','Pahteldatav':'Прошпаклёвываемый','LED-ühilduv':'С LED','MDF-täidisega':'С MDF-заполнением'})[f]||f)}</span>
            )}
          </div>
        </div>
        <div className="vp-photo" style={{ position: 'relative', overflow: 'hidden' }}>
          <img src={meta.img} alt={categoryName} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>
      {/* Products */}
      <section style={{ padding: '48px 56px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
          <h2 className="vp-display" style={{ fontSize: 48, margin: 0 }}>{tr('Tooted','Товары')} ({products.length})</h2>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontFamily: 'JetBrains Mono', fontSize: 12 }}>
            <span style={{ color: 'var(--muted)' }}>{tr('Sorteeri:','Сортировка:')}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="vp-chip" style={{ border: '1.5px solid var(--ink)', background: 'var(--paper)', padding: '6px 10px' }}>
              <option value="popular">{tr('populaarsus','популярность')}</option>
              <option value="price-asc">{tr('hind: tõusev','цена: по возрастанию')}</option>
              <option value="price-desc">{tr('hind: laskuv','цена: по убыванию')}</option>
            </select>
            <a onClick={() => setPage('catalog', { category: categoryName })} style={{ cursor: 'pointer', borderBottom: '1.5px solid var(--ink)', fontSize: 11, textTransform: 'uppercase', padding: '4px 0' }}>{tr('Avatud filtritega →','С фильтрами →')}</a>
          </div>
        </div>
        {sorted.length === 0 ?
        <div style={{ padding: 80, textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono' }}>{tr('Selles kategoorias pole hetkel tooteid.','В этой категории пока нет товаров.')}</div> :

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {sorted.map((p, i) =>
          <ProductCard key={p.sku + '-' + i} p={p} setPage={setPage} />
          )}
          </div>
        }
      </section>
      {/* Other categories */}
      <section style={{ padding: '56px', background: 'var(--paper-2)', borderTop: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('Vaata teisi kollektsioone','Смотреть другие коллекции')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {others3.map(([name, m]) => {
            const count = all.filter((p) => {
              const cols = p.collection.split(';').map((s) => s.trim());
              return cols.includes(name);
            }).reduce((acc, p) => {acc[p.sku] = 1;return acc;}, {});
            const n = Object.keys(count).length;
            return (
              <a key={name} onClick={() => setPage('category', { category: name })} style={{ cursor: 'pointer', border: '1.5px solid var(--ink)', display: 'grid', gridTemplateColumns: '120px 1fr auto', alignItems: 'center', gap: 18, background: 'var(--paper)' }}>
                <div className="vp-photo" style={{ aspectRatio: '1', borderRight: '1.5px solid var(--ink)', position: 'relative', overflow: 'hidden' }}>
                  <img src={m.img} alt={name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '18px 0' }}>
                  <div className="vp-eyebrow" style={{ marginBottom: 4 }}>{m.num} / {n} {tr('toodet','товаров')}</div>
                  <span className="vp-display" style={{ fontSize: 28 }}>{tr(name, ({Laeprofiilid:'Потолочные',Põrandaprofiilid:'Напольные',Põrandaliistud:'Плинтусы','Seina peiteprofiilid':'Настенные скрытые'})[name]||name)}</span>
                </div>
                <span style={{ fontSize: 22, paddingRight: 22 }}>→</span>
              </a>);

          })}
        </div>
      </section>
    </div>);

}

function ContactPage({ setPage }) {  useLocale(); // ContactPage locale
  const [openFaq, setOpenFaq] = React.useState(null);
  const contactFaq = [
  [tr('Kas saan tooteid kohapeal näha?','Можно ли посмотреть товары на месте?'), tr('Jah, salongis Vana-Kalamaja 8, Tallinn. E–R 10–17. Soovitame salongi külastus eelnevalt kokku leppida — nii võtame sinu jaoks aega ja ei ole ohtu, et peate teiste klientide järgi ootama.','Да, в салоне Vana-Kalamaja 8, Tallinn. Пн–Пт 10–17. Рекомендуем заранее забронировать визит — выделим вам время и вы не будете ждать в очереди.')],
  [tr('Kas pakute paigaldusteenust?','Предлагаете ли услугу монтажа?'), tr('Me ei tegele paigaldusega — sellega tegelevad tavaliselt ehitusettevõtted või lagede ehitajad. Vajadusel suhtleme paigaldajaga ning juhendame, kuidas paigaldus peaks toimuma.','Монтажом не занимаемся — этим обычно занимаются строительные компании или монтажники потолков. При необходимости связываемся с монтажником и консультируем по процессу.')],
  [tr('Kas on B2B / edasimüügi võimalus?','Есть ли B2B / возможность перепродажи?'), tr('Jah — sisearhitektidele, paigaldajatele, edasimüüjatele ja ehitusettevõtetele. Soodustus 5–35% käibe alusel, liitumine tasuta. Täida ankeet B2B-lehel.','Да — для дизайнеров интерьера, монтажников, реселлеров и строительных компаний. Скидка 5–35% по обороту, регистрация бесплатна. Заполните анкету на B2B-странице.')],
  [tr('Kuidas tagastada toode?','Как вернуть товар?'), tr('14-päevane tagastusõigus alates kauba kättesaamisest. Toode peab olema kasutamata ja originaalpakendis. Tagastusveo kannab klient (v.a. defekti korral). Eritellimusel valmistatud toodetel tagastusõigus ei kehti.','14 дней с момента получения. Товар должен быть неиспользованным и в оригинальной упаковке. Стоимость обратной доставки — за счёт клиента (кроме случаев дефекта). На товары под заказ возврат не действует.')],
  [tr('Mis on minimaalne tellimuse kogus?','Минимальный заказ?'), tr('Minimaalset kogust ei ole — tellida saab alates 1 tükist. Soovitame tellida 10–15% varuga.','Минимума нет — можно заказывать от 1 шт. Рекомендуем заказывать с запасом 10–15%.')]];

  return (
    <div className="vp-page">
      <Marquee />
      <section style={{ padding: '56px 56px 40px', borderBottom: '1.5px solid var(--ink)', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'end' }}>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('Külasta · helista · kirjuta','Приходите · звоните · пишите')}</div>
          <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 180px)', margin: 0, lineHeight: 0.9 }}>{tr('Tule külla.','Заходите в гости.')}</h1>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)', margin: '0 0 8px', maxWidth: 480 }}>
          {tr('Olgu tegemist erakliendi sooviga kujundada kodu hubasemaks või ärikliendi sooviga luua kaasaegseid ja funktsionaalseid töökeskkondi — oleme siin, et pakkuda unikaalseid lahendusi igale projektile.','Хотите ли вы сделать дом уютнее или создать современные функциональные рабочие пространства — мы здесь, чтобы предложить уникальные решения для каждого проекта.')}
        </p>
      </section>
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ padding: '48px 48px', borderRight: '1.5px solid var(--ink)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 18 }}>
            <div>
              <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('Salong','Салон')}</div>
              <h2 className="vp-display" style={{ fontSize: 48, margin: 0 }}>{tr('Tallinn · Vana-Kalamaja','Таллинн · Vana-Kalamaja')}</h2>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <a href={(window.__site||{}).facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'var(--ink)', fontFamily: 'serif', fontSize: 16, fontWeight: 600 }}>f</a>
              <a href={(window.__site||{}).instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'var(--ink)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '14px 18px', fontSize: 15, lineHeight: 1.55 }}>
            <span className="vp-eyebrow" style={{ alignSelf: 'start', paddingTop: 2 }}>{tr('Aadress','Адрес')}</span>
            <span>
              Vana-Kalamaja 8–110<br />10412 Tallinn
              <span style={{ display: 'block', marginTop: 8, fontSize: 13, color: 'var(--ink-2)' }}>{tr('Kui tuled autoga, siis Kesk-Kalamaja tänav toob otse salongi ette.','Если едете на машине — улица Kesk-Kalamaja ведёт прямо к салону.')}</span>
            </span>
            <span className="vp-eyebrow" style={{ alignSelf: 'center' }}>{tr('Telefon','Телефон')}</span><span><a href={(window.__site||{}).phoneUrl} style={{color:'inherit', textDecoration:'none', borderBottom:'1px solid transparent'}}>{(window.__site||{}).phone}</a></span>
            <span className="vp-eyebrow" style={{ alignSelf: 'center' }}>{tr('E-post','E-mail')}</span><span><a href={(window.__site||{}).emailUrl} style={{color:'inherit', textDecoration:'none', borderBottom:'1px solid transparent'}}>{(window.__site||{}).email}</a></span>
            <span className="vp-eyebrow" style={{ alignSelf: 'start', paddingTop: 2 }}>{tr('Tööaeg','Время работы')}</span>
            <span>
              {tr('E–R 10:00–17:00','Пн–Пт 10:00–17:00')}<br />{tr('L–P kokkuleppel','Сб–Вс по договорённости')}
              <span style={{ display: 'block', marginTop: 8, fontSize: 13, color: 'var(--ink-2)' }}>{tr('Et saaksime pakkuda võimalikult personaalset kogemust, palume salongi külastus eelnevalt kokku leppida telefoni või kalendri kaudu.','Чтобы предложить максимально персональный опыт, просим заранее забронировать визит по телефону или через календарь.')}</span>
            </span>
          </div>
          <div style={{ marginTop: 32, padding: '18px 22px', border: '1.5px solid var(--ink)', background: 'var(--paper-2)', display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ fontSize: 32 }}>◉</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{tr('Broneeri 1:1 konsultatsioon','Забронировать 1:1 консультацию')}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>{tr('30-minutiline kohtumine spetsialistiga · tasuta','30-минутная встреча со специалистом · бесплатно')}</div>
            </div>
            <button className="vp-btn">{tr('Broneeri →','Забронировать →')}</button>
          </div>
        </div>
        <div style={{ minHeight: 480, backgroundImage: 'url(assets/salong-tallinn.jpg)', backgroundSize: 'cover', backgroundPosition: '30% center' }}>
        </div>
      </section>
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ minHeight: 420, borderRight: '1.5px solid var(--ink)', position: 'relative' }}>
          <iframe title="Varjuprofiilid salong · Vana-Kalamaja 8" src="https://www.openstreetmap.org/export/embed.html?bbox=24.7323%2C59.4439%2C24.7423%2C59.4479&layer=mapnik&marker=59.4459%2C24.7373" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, border: 0, filter: 'grayscale(0.4) contrast(1.05)' }} loading="lazy"></iframe>
          <a href="https://www.google.com/maps/search/?api=1&query=Vana-Kalamaja+8,+Tallinn,+Estonia" target="_blank" rel="noopener" className="vp-mono" style={{ position: 'absolute', left: 16, bottom: 16, background: 'var(--paper)', border: '1.5px solid var(--ink)', padding: '8px 12px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', color: 'var(--ink)' }}>{tr('Ava kaardirakenduses →','Открыть в картах →')}</a>
        </div>
        <div style={{ padding: '48px 48px', background: 'var(--paper-2)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('Saada sõnum','Отправить сообщение')}</div>
          <h2 className="vp-display" style={{ fontSize: 42, margin: '0 0 22px' }}>{tr('Vastame hiljemalt 24 tunni jooksul','Ответим не позднее, чем через 24 ч')}</h2>
          <div style={{ display: 'grid', gap: 10, marginBottom: 14 }}>
            <input className="vp-input" placeholder={tr('Nimi','Имя')} />
            <input className="vp-input" placeholder={tr('E-post','E-mail')} />
            <select className="vp-input"><option>{tr('Teema — vali...','Тема — выберите...')}</option><option>{tr('Toote päring','Запрос по товару')}</option><option>{tr('Hulgihinnad / B2B','Оптовые цены / B2B')}</option><option>{tr('Tehniline tugi','Техподдержка')}</option></select>
            <textarea className="vp-input" rows={5} placeholder={tr('Sõnum...','Сообщение...')} />
          </div>
          <button className="vp-btn vp-btn--block">{tr('Saada sõnum →','Отправить →')}</button>
        </div>
      </section>
      <section style={{ padding: '56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <h2 className="vp-display" style={{ fontSize: 48, margin: 0 }}>{tr('Korduvad küsimused','Часто задаваемые')}</h2>
          <a onClick={() => setPage('faq')} className="vp-mono" style={{ fontSize: 12, textTransform: 'uppercase', borderBottom: '1.5px solid var(--ink)', cursor: 'pointer' }}>{tr('Kõik KKK-d →','Все вопросы →')}</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 56px' }}>
          {contactFaq.map(([q, a], i) => {
            const isOpen = openFaq === i;
            return (
              <div key={q} onClick={() => setOpenFaq(isOpen ? null : i)} style={{ padding: '18px 0', borderBottom: '1px solid rgba(0,0,0,0.15)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 18 }}>
                  <span style={{ fontSize: 16, fontWeight: 500 }}>{q}</span>
                  <span style={{ fontSize: 22, lineHeight: 1, color: isOpen ? 'var(--ink)' : 'var(--muted)' }}>{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', marginTop: 12, paddingRight: 32 }}>{a}</div>}
              </div>);

          })}
        </div>
      </section>
    </div>);

}

window.CartPage = CartPage;
window.CategoryPage = CategoryPage;
window.ContactPage = ContactPage;