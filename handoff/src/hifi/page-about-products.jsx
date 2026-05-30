/* Toodetest — sales-focused content/landing page */

function AboutProductsPage({ setPage }) {
  useLocale(); // AboutProductsPage locale
  const [openFaq, setOpenFaq] = React.useState(0);
  return (
    <div className="vp-page">
      <Marquee />

      {/* HERO — editorial split with big claim */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1.5px solid var(--ink)', minHeight: 560 }}>
        <div style={{ padding: '72px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1.5px solid var(--ink)' }}>
          <div className="vp-eyebrow">{tr('Toodetest · Miks varjuprofiilid','О продукции · Почему теневые профили')}</div>
          <div>
            <h1 className="vp-display" style={{ fontSize: 'clamp(64px, 9vw, 144px)', margin: '24px 0 0', lineHeight: 0.9 }}>
              {tr('Varjuprofiilid','Теневые')}<br />
              <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.5em', letterSpacing: '-0.02em' }}>{tr('kaasaegsesse','в современный')}</span><br />
              {tr('interjööri.','интерьер.')}
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 480, marginTop: 28 }}>
              <strong>{tr('Minimalistlik disain. Maksimaalne efekt.','Минималистичный дизайн. Максимальный эффект.')}</strong> {tr('Peidetud ühenduslahendused, mis loovad','Скрытые соединения, создающие')} <em>{tr('"hõljuva lae või seina"','«парящего потолка или стены»')}</em> {tr('efekti — ruum muutub avaramaks, luksuslikumaks ja arhitektuurselt terviklikuks.','эффект — помещение становится просторнее, выразительнее и архитектурно цельнее.')}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>
            <button className="vp-btn vp-btn--lg" onClick={() => setPage('catalog')}>{tr('Vaata tooteid →','Смотреть товары →')}</button>
            <button className="vp-btn vp-btn--ghost vp-btn--lg" onClick={() => setPage('contact')}>{tr('Tasuta nõustamine','Бесплатная консультация')}</button>
          </div>
        </div>
        <div className="vp-photo" style={{ position: 'relative', backgroundImage: 'url("assets/hero-hoeljuv-lagi.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          {/* corner caption */}
          <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 3, fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
            <span>{tr('Projekt · Tallinn 2025 · Hõljuva lae efekt','Проект · Таллинн 2025 · Эффект парящего потолка')}</span>
            <span style={{ borderBottom: '1.5px solid #fff' }}>{tr('Vaata projekti →','Смотреть проект →')}</span>
          </div>
        </div>
      </section>

      {/* THREE BIG NUMBERS / VALUE PROPS */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1.5px solid var(--ink)' }}>
        {[
        { n: '01', big: '∞', t: tr('Ajatu disain','Вневременной дизайн'), d: tr('Minimalistlik esteetika, mis ei lähe moest. Sirged jooned, peidetud üleminekud, arhitektuurne terviklikkus.','Минималистичная эстетика вне моды. Прямые линии, скрытые переходы, архитектурная цельность.') },
        { n: '02', big: '25+', t: tr('Aastat eluiga','Лет службы'), d: tr('Alumiinium 6063-T5 — UV-kindel, niiskuskindel, korrosioonivaba. Kvaliteet, mis kestab põlvkondi.','Алюминий 6063-T5 — устойчив к УФ, влаге, коррозии. Качество на поколения.') },
        { n: '03', big: 'RAL', t: tr('Iga värvitoon','Любой оттенок'), d: tr('Pulbervärvitud mistahes RAL toonis — vastavalt teie interjööri värvilahendusele.','Порошковая окраска в любой оттенок RAL — под цветовое решение вашего интерьера.') }].
        map((b, i) =>
        <div key={b.n} style={{ padding: '56px 40px', borderRight: i < 2 ? '1.5px solid var(--ink)' : 'none', display: 'flex', flexDirection: 'column' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 24 }}>{b.n} / {tr('Eelis','Преимущество')}</div>
            <div className="vp-display" style={{ fontSize: 120, lineHeight: 0.9, margin: '0 0 20px' }}>{b.big}</div>
            <div className="vp-display" style={{ fontSize: 32, marginBottom: 10 }}>{b.t}</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>{b.d}</p>
          </div>
        )}
      </section>

      {/* APPLICATIONS — checklist */}
      <section style={{ padding: '80px 56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'flex-start' }}>
          <div style={{ position: 'sticky', top: 80 }}>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('04 / Kasutusalad','04 / Применение')}</div>
            <h2 className="vp-display" style={{ fontSize: 72, margin: 0, lineHeight: 0.95 }}>{tr('Lagi,','Потолок,')}<br />{tr('põrand,','пол,')}<br />{tr('sein.','стена.')}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', marginTop: 24, maxWidth: 380 }}>
              {tr('Stiilne ja kaasaegne alternatiiv traditsioonilistele põrandaliistudele ja laelahendustele. Sobib nii elamu- kui äriprojektidele.','Стильная современная альтернатива традиционным плинтусам и потолочным решениям. Подходит и для жилья, и для коммерческих объектов.')}
            </p>
          </div>
          <div>
            {[
            { t: tr('Lagede varjuliinid','Потолочные теневые линии'), d: tr('Peidetud ühenduskoht lae ja seina vahel — visuaalne "hõljuva lae" efekt.','Скрытый стык потолка и стены — визуальный эффект «парящего потолка».') },
            { t: tr('Minimalistlikud põrandaliistud','Минималистичные плинтусы'), d: tr('Asendab traditsioonilised liistud sirgjoonelise alumiiniumprofiiliga.','Заменяет обычные плинтусы прямолинейным алюминиевым профилем.') },
            { t: tr('LED-valgustuse integratsioon','Интеграция LED-подсветки'), d: tr('Pehme, ühtlane valgus ilma nähtava plastdiffuuserita.','Мягкий ровный свет без видимого пластикового диффузора.') },
            { t: tr('Modernsed ja luksuslikud interjöörid','Современные и роскошные интерьеры'), d: tr('Premium viimistlus, mis rõhutab kaasaegset arhitektuuri.','Премиум-отделка, подчёркивающая современную архитектуру.') },
            { t: tr('Elamu- ja äriprojektid','Жилые и коммерческие проекты'), d: tr('Sobib nii eramutesse, korteritesse kui kontoritesse, restoranidesse, hotellidesse.','Подходит для частных домов, квартир, офисов, ресторанов, отелей.') }].
            map((it, i) =>
            <div key={it.t} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 20, padding: '28px 0', borderTop: '1px solid rgba(0,0,0,0.12)', alignItems: 'baseline' }}>
                <span className="vp-mono" style={{ fontSize: 13, color: 'var(--muted)' }}>0{i + 1}.</span>
                <div>
                  <div className="vp-display" style={{ fontSize: 32, marginBottom: 6, lineHeight: 1.05 }}>{it.t}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>{it.d}</p>
                </div>
                <span style={{ fontSize: 24, color: 'var(--accent)' }}>+</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURE — LED light, dark inverted */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', borderBottom: '1.5px solid var(--ink)', background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="vp-photo" style={{ minHeight: 600, borderRight: '1.5px solid var(--paper)', backgroundImage: 'url("assets/feature-led-gradient.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        </div>
        <div style={{ padding: '72px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="vp-eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>{tr('05 / Valguslahendus','05 / Световое решение')}</div>
          <h2 className="vp-display" style={{ fontSize: 80, margin: 0, lineHeight: 0.92, color: 'var(--paper)' }}>
            {tr('Valgus,','Свет,')}<br />
            {tr('mis ei näita','который не показывает')}<br />
            {tr('ennast.','себя.')}
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.82, marginTop: 28, maxWidth: 440 }}>
            {tr('Lae varjuprofiilid kasutavad','Потолочные теневые профили используют')} <strong>{tr('peegeldatud LED-valgust','отражённый LED-свет')}</strong> — {tr('pehme ja ühtlane gradient seinale ilma nähtava plastdiffuuserita.','мягкий ровный градиент на стене без видимого пластикового диффузора.')}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'grid', gap: 14 }}>
            {[
            tr('Loob hubase atmosfääri','Создаёт уютную атмосферу'),
            tr('Rõhutab ruumi arhitektuuri','Подчёркивает архитектуру помещения'),
            tr('Suurendab visuaalselt ruumitunnet','Визуально увеличивает ощущение пространства'),
            tr('Sobib ideaalselt modernsesse kodusse','Идеально подходит для современного дома')].
            map((l) =>
            <li key={l} style={{ display: 'flex', gap: 14, alignItems: 'baseline', fontSize: 16, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono', fontSize: 13 }}>↳</span>
                {l}
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* MATERIAL SPECS — bold typography table */}
      <section style={{ padding: '80px 56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('06 / Materjal','06 / Материал')}</div>
            <h2 className="vp-display" style={{ fontSize: 80, margin: 0, lineHeight: 0.92 }}>{tr('Alumiinium.','Алюминий.')}<br />{tr('Ideaalne valik.','Идеальный выбор.')}</h2>
          </div>
          <div className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.1em', textAlign: 'right', maxWidth: 280 }}>
            {tr('6063-T5 alumiinium','Алюминий 6063-T5')}<br />{tr('EN 755-2 standard','Стандарт EN 755-2')}<br />{tr('Toodetud Eestis','Произведено в Эстонии')}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', borderTop: '1.5px solid var(--ink)', borderLeft: '1.5px solid var(--ink)' }}>
          {[
          { ic: '⚖', t: tr('Kerge, kuid tugev','Лёгкий, но прочный') },
          { ic: '≈', t: tr('Niiskuskindel','Влагостойкий') },
          { ic: '☀', t: tr('UV-kindel','УФ-стойкий') },
          { ic: '⊘', t: tr('Korrosioonivaba','Без коррозии') },
          { ic: '∞', t: tr('Pika elueaga','Долгий срок службы') },
          { ic: '↻', t: tr('Taaskasutatav','Перерабатываемый') }].
          map((p, i) =>
          <div key={p.t} style={{ padding: '40px 24px', borderRight: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)', background: i % 2 === 0 ? 'var(--paper)' : 'var(--paper-2)' }}>
              <div className="vp-display" style={{ fontSize: 64, lineHeight: 1, marginBottom: 18, color: 'var(--accent)' }}>{p.ic}</div>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{p.t}</div>
            </div>
          )}
        </div>
      </section>

      {/* RAL COLOR section with swatches */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ padding: '72px 56px', borderRight: '1.5px solid var(--ink)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('07 / Värvus','07 / Цвет')}</div>
          <h2 className="vp-display" style={{ fontSize: 64, margin: 0, lineHeight: 0.95 }}>{tr('Iga RAL toon.','Любой оттенок RAL.')}<br />{tr('Sinu interjöör.','Ваш интерьер.')}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', marginTop: 24, maxWidth: 400 }}>
            {tr('Pulbervärvimine vastavalt RAL toonidele — profiilid sobituvad ideaalselt interjööri üldise stiili ja värvilahendusega.','Порошковая окраска по RAL — профили идеально вписываются в стиль и цветовое решение интерьера.')}
          </p>
          <div className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)', marginTop: 32, letterSpacing: '0.08em' }}>
            {tr('Laos olev kaup · 1–3 päeva','Со склада · 1–3 дня')}<br />{tr('Eritellimus · 4–5 nädalat','Под заказ · 4–5 недель')}
          </div>
        </div>
        <div style={{ padding: '56px 48px', background: 'var(--paper-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
            <div className="vp-mono" style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.08em' }}>{tr('Populaarsemad toonid','Популярные оттенки')}</div>
            <div className="vp-mono" style={{ fontSize: 10, textTransform: 'none', color: 'var(--muted)', letterSpacing: '0.04em', opacity: 0.85 }}>{tr('Värvid kuvatud ekraanil ligikaudselt — tegelik RAL toon võib ekraani- ja seadme-kalibreerimise tõttu erineda.','Цвета на экране показаны приблизительно — реальный оттенок RAL может отличаться из-за калибровки экрана.')}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
            {[
            { ral: '9005', n: 'Sügav must', c: '#0a0a0a' },
            { ral: '9011', n: 'Grafiitmust', c: '#1c1c1c' },
            { ral: '7016', n: 'Antratsiit', c: '#373f43' },
            { ral: '7022', n: 'Umbra', c: '#534c43' },
            { ral: '7037', n: 'Tumehall', c: '#6f7376' },
            { ral: '9006', n: 'Hõbe', c: '#a4a4a4' },
            { ral: '7035', n: 'Helehall', c: '#cdd0cf' },
            { ral: '9001', n: 'Kreemvalge', c: '#efe6d3' },
            { ral: '1015', n: 'Helebeež', c: '#e6d2b0' },
            { ral: '1013', n: 'Pärlvalge', c: '#eae6da' },
            { ral: '9016', n: 'Liiklusvalge', c: '#f3f3f0' },
            { ral: '9010', n: 'Puhasvalge', c: '#fafaf2' }].
            map((s) =>
            <div key={s.ral} style={{ cursor: 'pointer' }}>
                <div style={{ aspectRatio: '1', background: s.c, border: '1.5px solid var(--ink)', marginBottom: 6 }} />
                <div className="vp-mono" style={{ fontSize: 9, color: 'var(--muted)' }}>RAL {s.ral}</div>
                <div style={{ fontSize: 11, fontWeight: 500 }}>{s.n}</div>
              </div>
            )}
          </div>
          <button className="vp-btn vp-btn--ghost" style={{ marginTop: 24 }}>{tr('Vaata kõiki RAL toone →','Смотреть все оттенки RAL →')}</button>
        </div>
      </section>

      {/* INSTALLATION — process steps */}
      <section style={{ padding: '80px 56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('08 / Paigaldus','08 / Монтаж')}</div>
            <h2 className="vp-display" style={{ fontSize: 80, margin: 0, lineHeight: 0.92 }}>{tr('Lihtne. Täpne.','Просто. Точно.')}</h2>
          </div>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', maxWidth: 340, textAlign: 'right' }}>
            {tr('Profiilide geomeetria võimaldab saavutada täpse lõpptulemuse — sirge joon, peidetud ebatäpsused, sobib kõikide põrandakatetega.','Геометрия профилей позволяет добиться точного результата — ровная линия, скрытые неровности, совместимо со всеми покрытиями пола.')}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--ink)', border: '1.5px solid var(--ink)' }}>
          {[
          { n: '01', t: tr('Mõõdistamine','Замеры'), d: tr('Mõõda vastavalt projekti joonisele jooksvad meetrid profiili, mida vajad.','Измерьте по проекту погонные метры профиля, которые нужны.') },
          { n: '02', t: tr('Vali profiil + toon','Профиль + цвет'), d: tr('Vali profiilitüüp ja sobiv toon — laos olev toode või RAL eritellimus.','Выберите тип профиля и оттенок — складской товар или RAL под заказ.') },
          { n: '03', t: tr('Tarne','Доставка'), d: tr('Laos: 1–3 päeva. Eritellimus: ~4 nädalat. Salongist või Venipakiga otse kliendi aadressile.','Со склада: 1–3 дня. Под заказ: ~4 недели. Самовывоз или Venipak на адрес клиента.') },
          { n: '04', t: tr('Paigaldus','Монтаж'), d: tr('Paigaldab tavaliselt ehitusettevõte või lae-ehitaja. Vajadusel juhendame paigaldajat.','Обычно монтирует строительная компания или монтажник потолков. При необходимости консультируем монтажника.') }].
          map((s) =>
          <div key={s.n} style={{ background: 'var(--paper)', padding: '32px 28px', minHeight: 240 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
                <span className="vp-display" style={{ fontSize: 48, lineHeight: 1, color: 'var(--accent)' }}>{s.n}</span>
                <span style={{ fontSize: 18, color: 'var(--muted)' }}>→</span>
              </div>
              <div className="vp-display" style={{ fontSize: 28, marginBottom: 10, lineHeight: 1.05 }}>{s.t}</div>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>{s.d}</p>
            </div>
          )}
        </div>
      </section>

      {/* VALUE BLOCK — replaces fake testimonial (T-02 fix 28.05) */}
      <section style={{ padding: '96px 56px', borderBottom: '1.5px solid var(--ink)', background: 'var(--paper-2)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 24, textAlign: 'center' }}>{tr('09 / Miks meie','09 / Почему мы')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
            <div style={{ padding: '40px 32px', borderRight: '1.5px solid var(--ink)' }}>
              <div className="vp-display" style={{ fontSize: 64, lineHeight: 1, marginBottom: 12, color: 'var(--accent)' }}>5+</div>
              <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{tr('aastat tootmist','лет производства')}</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>{tr('Eesti tehases — alumiiniumi pressimine, lõikamine, viimistlus.','На эстонском заводе — прессование алюминия, резка, отделка.')}</p>
            </div>
            <div style={{ padding: '40px 32px', borderRight: '1.5px solid var(--ink)' }}>
              <div className="vp-display" style={{ fontSize: 64, lineHeight: 1, marginBottom: 12, color: 'var(--accent)' }}>RAL</div>
              <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{tr('mistahes toon','любой оттенок')}</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>{tr('Pulbervärvimine eritellimusel — ~4–5 nädalat.','Порошковая окраска под заказ — ~4–5 недель.')}</p>
            </div>
            <div style={{ padding: '40px 32px' }}>
              <div className="vp-display" style={{ fontSize: 64, lineHeight: 1, marginBottom: 12, color: 'var(--accent)' }}>1:1</div>
              <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{tr('tehniline tugi','техподдержка')}</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>{tr('Arhitektidele ja ehitajatele — paigaldusjoonised, näidised, projektikonsultatsioon.','Для архитекторов и строителей — монтажные чертежи, образцы, проектная консультация.')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROMISE — what we offer */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ padding: '72px 56px', borderRight: '1.5px solid var(--ink)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('10 / Meie lubadus','10 / Наше обещание')}</div>
          <h2 className="vp-display" style={{ fontSize: 72, margin: 0, lineHeight: 0.92 }}>{tr('Loome interjööre','Создаём интерьеры')}<br />{tr('mitmeks põlvkonnaks.','на поколения.')}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', marginTop: 24, maxWidth: 440 }}>
            {tr('Kvaliteetne sisekujundus ühendab esteetika, funktsionaalsuse ja kestvuse. Pikaajaline kogemus + läbimõeldud lahendused = vastame ka kõige nõudlikumatele disainiideedele.','Качественный интерьер объединяет эстетику, функциональность и долговечность. Многолетний опыт + продуманные решения = отвечаем самым требовательным дизайн-идеям.')}
          </p>
        </div>
        <div style={{ padding: '48px 0' }}>
          {[
          { t: tr('Professionaalne nõustamine','Профессиональная консультация'), d: tr('Tasuta 1:1 konsultatsioon spetsialistiga.','Бесплатная 1:1 консультация со специалистом.') },
          { t: tr('Kvaliteetsed materjalid','Качественные материалы'), d: tr('Alumiinium 6063-T5, garantii 5 aastat.','Алюминий 6063-T5, гарантия 5 лет.') },
          { t: tr('Innovatiivsed lahendused','Инновационные решения'), d: tr('CAD-failid, paigaldusvideod, B2B tugi.','CAD-файлы, видео монтажа, B2B-поддержка.') },
          { t: tr('Kaasaegne minimalistlik disain','Современный минималистичный дизайн'), d: tr('Ajatu esteetika, mis ei lähe moest.','Вневременная эстетика, не выходящая из моды.') },
          { t: tr('Kõrge viimistluskvaliteet','Высокое качество отделки'), d: tr('Kontrollitud iga partii enne saadetist.','Каждая партия проверяется перед отправкой.') }].
          map((p, i) =>
          <div key={p.t} style={{ display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 18, padding: '18px 56px 18px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.12)', alignItems: 'center' }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✓</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 2 }}>{p.t}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>{p.d}</div>
              </div>
              <span style={{ color: 'var(--muted)', fontSize: 18 }}>→</span>
            </div>
          )}
        </div>
      </section>

      {/* FAQ teaser */}
      <section style={{ padding: '72px 56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('11 / Korduvad küsimused','11 / Частые вопросы')}</div>
            <h2 className="vp-display" style={{ fontSize: 48, margin: 0, lineHeight: 0.95 }}>{tr('Uurid','Знакомитесь')}<br />{tr('esmakordselt?','впервые?')}</h2>
            <button className="vp-btn vp-btn--ghost" style={{ marginTop: 24 }} onClick={() => setPage('faq')}>{tr('Kõik KKK-d →','Все вопросы →')}</button>
          </div>
          <div>
            {[
            { q: tr('Mille poolest erineb varjuprofiil tavalisest põrandaliistust?','Чем теневой профиль отличается от обычного плинтуса?'), a: tr('Põranda varjuprofiil on kas seina sisse süvistatud või väga minimaalne. Paljudel süvistatud põrandaprofiilidel on ka LED paigaldus võimalus.','Напольный теневой профиль или заглублён в стену, или максимально минималистичен. У многих заглублённых профилей есть возможность LED-подсветки.') },
            { q: tr('Kas saan tellida ka eritellimuse värvitooni?','Можно ли заказать оттенок под спецификации?'), a: tr('Jah, pakume kõiki RAL toone. Eritellimusi koondame üks kord kuus ning tarne on umbes 4–5 nädalat.','Да, предлагаем все оттенки RAL. Заказы собираем раз в месяц, поставка примерно 4–5 недель.') },
            { q: tr('Kas saan profiile ise paigaldada?','Можно ли установить профили самому?'), a: tr('Jah, nii lae- kui põrandaprofiile ei ole iseenesest keeruline paigaldada. Laeprofiilid asendavad ripplae ääre kandureid ning kui oled ripplae ehitusega kursis, siis erilist probleemi ei teki. Vajadusel pakume tuge juhendamisel nii isepaigaldajatele kui ehitajatele.','Да, ни потолочные, ни напольные профили сами по себе несложно установить. Потолочные заменяют опоры подвесного потолка по краю, и если знакомы с подвесными потолками — особых проблем не будет. При необходимости консультируем и DIY-монтажников, и строителей.') },
            { q: tr('Mis on minimaalne tellimuse kogus?','Минимальный объём заказа?'), a: tr('Meil on nii 2,5 m kui ka 2,6 m profiile. Soovitame tellida 10–15% varuga.','У нас профили длиной 2,5 м и 2,6 м. Рекомендуем заказывать с запасом 10–15%.') }].
            map((it, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={it.q} onClick={() => setOpenFaq(isOpen ? null : i)} style={{ padding: '20px 0', borderTop: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, marginBottom: isOpen ? 8 : 0, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 17, fontWeight: 600 }}>{it.q}</span>
                    <span style={{ fontSize: 22, lineHeight: 1, color: isOpen ? 'var(--ink)' : 'var(--muted)' }}>{isOpen ? '−' : '+'}</span>
                  </div>
                  {isOpen && <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0, maxWidth: 640 }}>{it.a}</p>}
                </div>);

            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '120px 56px', textAlign: 'center', background: 'var(--ink)', color: 'var(--paper)', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>{tr('Valmis alustama?','Готовы начать?')}</div>
        <h2 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 180px)', margin: 0, lineHeight: 0.88, color: 'var(--paper)' }}>
          {tr('Puhas, modernne,','Чистая, современная,')}<br />
          <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.6em' }}>{tr('ajatu','вневременная')}</span> {tr('viimistlus.','отделка.')}
        </h2>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 48, flexWrap: 'wrap' }}>
          <button className="vp-btn vp-btn--lg" style={{ background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)' }} onClick={() => setPage('catalog')}>{tr('Vaata kõiki tooteid →','Смотреть все товары →')}</button>
        </div>
        <p style={{ marginTop: 32, fontSize: 13, opacity: 0.6, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {tr('Tasuta tarne ülalt 200 € · Tagastusõigus 14 päeva · Garantii 5 aastat','Бесплатная доставка от 200 € · Возврат 14 дней · Гарантия 5 лет')}
        </p>
      </section>
    </div>);

}

window.AboutProductsPage = AboutProductsPage;