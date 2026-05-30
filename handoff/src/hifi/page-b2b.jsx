/* B2B partneriprogramm + Login + Account */

function B2BPage({ setPage }) {  useLocale(); // B2BPage locale
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <div className="vp-page">
      <Marquee />
      {/* HERO */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', borderBottom: '1.5px solid var(--ink)', minHeight: 600 }}>
        <div style={{ padding: '72px 56px', borderRight: '1.5px solid var(--ink)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="vp-eyebrow">{tr('Partneriprogramm · Sisearhitektidele · Paigaldajatele · Edasimüüjatele','Партнёрская программа · Дизайнерам · Монтажникам · Реселлерам')}</div>
          <div>
            <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: '24px 0 0', lineHeight: 0.9 }}>
              {tr('Tee koostööd','Сотрудничайте')}<br />
              <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.55em', letterSpacing: '-0.02em' }}>{tr('parima hinnaga.','по лучшей цене.')}</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 520, marginTop: 28 }}>
              {tr('Liitu PROSPACE partnerite võrgustikuga — saad','Присоединяйтесь к партнёрской сети PROSPACE — получите')} <strong>{tr('personaalse soodushinna','персональную скидку')}</strong>, {tr('kiired tarneajad ning tehnilise toe igal projektil.','быстрые сроки доставки и техподдержку на каждом проекте.')}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>
            <button className="vp-btn vp-btn--lg" onClick={() => document.getElementById('b2b-form')?.scrollIntoView()}>{tr('Liitu partneriks →','Стать партнёром →')}</button>
            <button className="vp-btn vp-btn--ghost vp-btn--lg" onClick={() => setPage('login')}>{tr('Logi sisse','Войти')}</button>
          </div>
        </div>
        <div className="vp-photo" style={{ backgroundImage: 'url("assets/b2b-vannituba.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}><span className="label">{tr('b2b · paigaldaja salongis','b2b · монтажник в салоне')}</span></div>
      </section>

      {/* Big numbers */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1.5px solid var(--ink)' }}>
        {[
        { n: '−25%', t: tr('Keskmine partnerisoodustus','Средняя скидка партнёра') },
        { n: '213', t: tr('Partnerit Eestis','Партнёров в Эстонии') },
        { n: '24 h', t: tr('Pakkumise vastus','Ответ на запрос') },
        { n: '∞', t: tr('Konsultatsioone aastas','Консультаций в год') }].
        map((b, i) =>
        <div key={i} style={{ padding: '48px 32px', borderRight: i < 3 ? '1.5px solid var(--ink)' : 'none', textAlign: 'center' }}>
            <div className="vp-display" style={{ fontSize: 80, lineHeight: 0.9, marginBottom: 10 }}>{b.n}</div>
            <div className="vp-eyebrow">{b.t}</div>
          </div>
        )}
      </section>

      {/* Benefits */}
      <section style={{ padding: '72px 56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('Mida partner saab','Что получает партнёр')}</div>
        <h2 className="vp-display" style={{ fontSize: 72, margin: '0 0 48px', lineHeight: 0.95, maxWidth: 920 }}>
          {tr('Konkreetsed eelised,','Конкретные преимущества,')}<br /><span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.7em' }}>{tr('mitte ainult lubadused.','не просто обещания.')}</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, border: '1.5px solid var(--ink)' }}>
          {[
          { n: '01', t: tr('Personaalne soodushind','Персональная скидка'), d: tr('Iga partner saab oma soodusprotsendi (5–35%), mis kehtib KÕIGILE toodetele automaatselt sisse logides. Käibe kasvades suureneb.','Каждый партнёр получает свой процент скидки (5–35%), который применяется ко ВСЕМ товарам автоматически при входе. С ростом оборота — увеличивается.') },
          { n: '02', t: tr('Võimalus saada näidiskomplekt','Комплект образцов'), d: tr('Näita kliendile käes, mitte ekraanil. Füüsilised proovid kõikidest seeriatest — profiilid, värvitoonid, viimistlused.','Покажите клиенту в руках, а не на экране. Физические образцы всех серий — профили, оттенки, отделки.') },
          { n: '03', t: tr('Pidev tehniline tugi','Постоянная техподдержка'), d: tr('Otseliin tehnoloogiga. Joonised, mõõdistus, projekti revisjon. E–R 10–17.','Прямая линия с технологом. Чертежи, замеры, ревизия проекта. Пн–Пт 10–17.') },
          { n: '04', t: tr('Prioriteet tarneaegades','Приоритет в доставке'), d: tr('Partnerite tellimused liiguvad lao järjekorrast ette.','Заказы партнёров обрабатываются вне очереди склада.') },
          { n: '05', t: tr('Kaasturundus','Совместный маркетинг'), d: tr('Kvaliteetsed projektid jõuavad meie inspiratsiooni — krediteerime, lingime, jagame sotsiaalmeedias.','Качественные проекты попадают в наше «Вдохновение» — указываем авторов, ссылаемся, делимся в соцсетях.') }].
          map((b, i, arr) =>
          <div key={b.n} style={{ padding: '36px 36px', borderRight: i % 2 === 0 ? '1.5px solid var(--ink)' : 'none', borderBottom: i < arr.length - (arr.length % 2 === 0 ? 2 : 1) ? '1.5px solid var(--ink)' : 'none', display: 'flex', gap: 24 }}>
              <div className="vp-display" style={{ fontSize: 64, lineHeight: 0.9, color: 'var(--accent)' }}>{b.n}</div>
              <div>
                <div className="vp-display" style={{ fontSize: 32, marginBottom: 8 }}>{b.t}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)' }}>{b.d}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '72px 56px', background: 'var(--paper-2)', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('Kuidas käib','Как это работает')}</div>
        <h2 className="vp-display" style={{ fontSize: 64, margin: '0 0 40px', lineHeight: 0.95 }}>{tr('Liitu 5 minutiga.','Регистрация за 5 минут.')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
          { n: '01', t: tr('Täida ankeet','Заполните анкету'), d: tr('5 min · ettevõtte andmed, valdkond, kontakt.','5 мин · данные компании, сфера, контакт.') },
          { n: '02', t: tr('Vaatame üle','Проверяем'), d: tr('24 h · kinnitame partnerstaatuse ja sinu soodusprotsendi.','24 ч · подтверждаем партнёрский статус и ваш процент скидки.') },
          { n: '03', t: tr('Saad konto','Получаете аккаунт'), d: tr('Logid sisse → soodushinnad on automaatselt aktiivsed.','Входите → скидки автоматически активны.') },
          { n: '04', t: tr('Tellid','Заказываете'), d: tr('Iga tellimus salvestub ajaloole, näed kõike "Minu kontos".','Каждый заказ сохраняется в истории, всё видно в «Моём кабинете».') }].
          map((s) =>
          <div key={s.n} style={{ padding: '24px 24px', border: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
              <div className="vp-mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 18 }}>{s.n}</div>
              <div className="vp-display" style={{ fontSize: 30, marginBottom: 8 }}>{s.t}</div>
              <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>{s.d}</div>
            </div>
          )}
        </div>
      </section>

      {/* Form */}
      <section id="b2b-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ padding: '72px 56px', borderRight: '1.5px solid var(--ink)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('Liitumine','Регистрация')}</div>
          <h2 className="vp-display" style={{ fontSize: 64, margin: '0 0 22px', lineHeight: 0.95 }}>{tr('Saada','Отправьте')}<br />{tr('ankeet.','анкету.')}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 380 }}>
            {tr('Vastame 24 h jooksul (E–R). Liitumine on tasuta, soodushindade aktiveerumine kohe peale kinnitust.','Ответим в течение 24 ч (Пн–Пт). Регистрация бесплатна, скидки активируются сразу после подтверждения.')}
          </p>
          <div style={{ marginTop: 32, padding: '18px 22px', border: '1.5px solid var(--ink)', background: 'var(--paper-2)' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 6 }}>{tr('Eelistad rääkida?','Предпочитаете поговорить?')}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6 }}>{tr('Helista','Звоните')} <strong><a href={window.__site.phoneUrl} style={{color:'inherit'}}>{window.__site.phone}</a></strong> {tr('või kirjuta','или пишите')} <a href={window.__site.emailUrl} className="vp-mono" style={{color:'inherit'}}>{window.__site.email}</a></div>
          </div>
        </div>
        <div style={{ padding: '56px 56px', background: 'var(--paper-2)' }}>
          {!submitted ?
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <input className="vp-input" placeholder={tr('Ettevõte *','Компания *')} />
              <input className="vp-input" placeholder={tr('Reg.nr *','Рег.№ *')} />
              <input className="vp-input" placeholder={tr('Kontaktisik *','Контактное лицо *')} />
              <input className="vp-input" placeholder={tr('Telefon *','Телефон *')} />
              <input className="vp-input" placeholder={tr('E-post *','E-mail *')} style={{ gridColumn: '1 / -1' }} />
              <select className="vp-input" style={{ gridColumn: '1 / -1' }}>
                <option>{tr('Tegevusvaldkond — vali...','Сфера деятельности — выберите...')}</option>
                <option>{tr('Sisearhitekt / disainer','Дизайнер интерьера')}</option>
                <option>{tr('Paigaldaja / ehitaja','Монтажник / строитель')}</option>
                <option>{tr('Edasimüüja','Реселлер')}</option>
                <option>{tr('Arhitektuuribüroo','Архитектурное бюро')}</option>
                <option>{tr('Muu','Другое')}</option>
              </select>
              <input className="vp-input" placeholder={tr('Kodulehe aadress (nt firma.ee)','Адрес сайта (напр. firma.ee)')} style={{ gridColumn: '1 / -1' }} />
              <textarea className="vp-input" rows={4} placeholder={tr('Lühitutvustus, käimasolevad projektid...','Краткое описание, текущие проекты...')} style={{ gridColumn: '1 / -1' }} />
              <label style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, fontSize: 13, alignItems: 'flex-start' }}>
                <input type="checkbox" defaultChecked />
                <span>{tr('Nõustun isikuandmete töötlemisega vastavalt privaatsuspoliitikale','Согласен с обработкой персональных данных по политике конфиденциальности')}</span>
              </label>
              <button onClick={() => setSubmitted(true)} className="vp-btn vp-btn--lg vp-btn--block" style={{ gridColumn: '1 / -1', marginTop: 8 }}>{tr('Saada ankeet →','Отправить анкету →')}</button>
            </div> :

          <div style={{ padding: '56px 32px', border: '1.5px solid var(--ink)', background: 'var(--paper)', textAlign: 'center' }}>
              <div className="vp-display" style={{ fontSize: 80, color: 'var(--accent)', lineHeight: 1, marginBottom: 18 }}>✓</div>
              <h3 className="vp-display" style={{ fontSize: 42, margin: '0 0 16px', lineHeight: 0.95 }}>{tr('Aitäh!','Спасибо!')}<br />{tr('Ankeet saadetud.','Анкета отправлена.')}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: 420, margin: '0 auto 26px' }}>
                {tr('Vastame 24 h jooksul (E–R). Saadame e-posti aadressile','Ответим в течение 24 ч (Пн–Пт). На e-mail')} <span className="vp-mono">{window.__site.email}</span> {tr('tellimuse kinnituse ja edasised sammud.','отправим подтверждение и дальнейшие шаги.')}
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="vp-btn" onClick={() => setPage('catalog')}>{tr('Sirvi tooteid →','Смотреть товары →')}</button>
                <button className="vp-btn vp-btn--ghost" onClick={() => setSubmitted(false)}>{tr('Saada veel ankeet','Отправить ещё анкету')}</button>
              </div>
            </div>
          }
        </div>
      </section>

      {/* Why work with us */}
      <section style={{ padding: '72px 56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('Miks meiega koostööd teha','Почему сотрудничать с нами')}</div>
        <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 32px', lineHeight: 0.95, maxWidth: 920 }}>{tr('Tooted, mis töötavad —','Товары, которые работают —')}<br />{tr('kliendid, kes jäävad rahule.','клиенты, которые довольны.')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
          { t: tr('Projektikogemus','Проектный опыт'), d: tr('Profiile on paigaldatud kümnetesse projektidesse — eluasemetest äripindadeni. Kvaliteet, mis kestab ja klientidele meeldib.','Профили установлены в десятках проектов — от жилья до коммерции. Качество, которое служит и нравится клиентам.') },
          { t: tr('Alati abiks nõuga','Всегда поможем советом'), d: tr('Oleme alati abiks nõuga, milliseid profiile kuhu paigaldada. Kiire tagasiside joonisest paigalduseni.','Поможем советом — какие профили куда ставить. Быстрая обратная связь от чертежа до монтажа.') },
          { t: tr('Oma salongi näidised','Образцы для вашего салона'), d: tr('Partnerina saad oma näidised. Näita klientidele füüsilist toodet, mitte ekraani.','Партнёрам — собственные образцы. Покажите клиентам физический товар, а не экран.') }].
          map((c, i) =>
          <div key={i} style={{ padding: '32px 28px', border: '1.5px solid var(--ink)' }}>
              <div className="vp-display" style={{ fontSize: 56, lineHeight: 0.9, color: 'var(--accent)', marginBottom: 18 }}>0{i + 1}</div>
              <div className="vp-display" style={{ fontSize: 28, lineHeight: 1.05, marginBottom: 12 }}>{c.t}</div>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)' }}>{c.d}</div>
            </div>
          )}
        </div>
      </section>
    </div>);

}

function LoginPage({ setPage }) {  useLocale(); // LoginPage locale
  const [mode, setMode] = React.useState('signin');
  return (
    <div className="vp-page">
      <Marquee />
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 760, borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ padding: '72px 56px', borderRight: '1.5px solid var(--ink)', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 560, width: '100%', margin: '0 auto' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{mode === 'signin' ? tr('Konto','Аккаунт') : tr('Registreeru','Регистрация')}</div>
          <h1 className="vp-display" style={{ fontSize: 96, margin: '0 0 32px', lineHeight: 0.95 }}>
            {mode === 'signin' ? <>{tr('Tere','С возвращением')}<br />{tr('tagasi.','.')}</> : <>{tr('Loo','Создайте')}<br />{tr('konto.','аккаунт.')}</>}
          </h1>
          <div style={{ display: 'flex', gap: 0, marginBottom: 28, border: '1.5px solid var(--ink)' }}>
            {[['signin', tr('Logi sisse','Войти')], ['signup', tr('Registreeru','Регистрация')]].map(([k, l], i) =>
            <button key={k} onClick={() => setMode(k)} style={{ flex: 1, padding: '12px 18px', border: 'none', borderRight: i === 0 ? '1.5px solid var(--ink)' : 'none', background: mode === k ? 'var(--ink)' : 'transparent', color: mode === k ? 'var(--paper)' : 'var(--ink)', fontFamily: 'Inter', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', cursor: 'pointer' }}>{l}</button>
            )}
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {mode === 'signup' && <input className="vp-input" placeholder={tr('Nimi','Имя')} />}
            <input className="vp-input" placeholder={tr('E-post','E-mail')} />
            <input className="vp-input" type="password" placeholder={tr('Salasõna','Пароль')} />
            {mode === 'signup' && <input className="vp-input" type="password" placeholder={tr('Korda salasõna','Повторите пароль')} />}
            {mode === 'signin' &&
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, alignItems: 'center' }}>
                <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}><input type="checkbox" /> {tr('Hoia mind sisse logituna','Запомнить меня')}</label>
                <a style={{ borderBottom: '1px solid var(--ink)', cursor: 'pointer' }}>{tr('Unustasid salasõna?','Забыли пароль?')}</a>
              </div>
            }
            <button className="vp-btn vp-btn--lg vp-btn--block" onClick={() => setPage('account')}>{mode === 'signin' ? tr('Logi sisse →','Войти →') : tr('Loo konto →','Создать аккаунт →')}</button>
          </div>
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(0,0,0,0.15)', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>
            <strong>{tr('B2B partner?','B2B-партнёр?')}</strong> {tr('Logi sisse oma partnerikontoga — soodushinnad kehtivad automaatselt. Pole veel partner?','Войдите в свой партнёрский аккаунт — скидки применяются автоматически. Ещё не партнёр?')} <a onClick={() => setPage('b2b')} style={{ cursor: 'pointer', borderBottom: '1px solid var(--ink)' }}>{tr('Liitu siin','Присоединяйтесь')}</a>.
          </div>
        </div>
        <div className="vp-photo" style={{ backgroundImage: 'url("assets/login-ambient.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}><span className="label">{tr('login · ambient interior','вход · интерьер')}</span></div>
      </section>
    </div>);

}

function AccountPage({ setPage }) {  useLocale(); // AccountPage locale
  const [tab, setTab] = React.useState('orders');
  const orders = [
  { nr: 'VP-2026-0184', d: '02.05.2026', t: tr('Kinnitatud','Подтверждён'), sum: '487,30 €', items: 3 },
  { nr: 'VP-2026-0142', d: '14.03.2026', t: tr('Tarnitud','Доставлен'), sum: '1 240,80 €', items: 8 },
  { nr: 'VP-2025-1108', d: '22.11.2025', t: tr('Tarnitud','Доставлен'), sum: '318,90 €', items: 2 },
  { nr: 'VP-2025-0987', d: '04.10.2025', t: tr('Tarnitud','Доставлен'), sum: '2 110,00 €', items: 14 }];

  return (
    <div className="vp-page">
      <Marquee />
      <section style={{ padding: '56px 56px 32px', borderBottom: '1.5px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('Minu konto · OÜ Profilex · ★ Partner −22%','Мой кабинет · OÜ Profilex · ★ Партнёр −22%')}</div>
          <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: 0, lineHeight: 0.95 }}>{tr('Tere, Margus.','Здравствуйте, Маргус.')}</h1>
        </div>
        <button className="vp-btn vp-btn--ghost" onClick={() => setPage('home')}>{tr('Logi välja →','Выйти →')}</button>
      </section>
      <section style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 600 }}>
        <aside style={{ borderRight: '1.5px solid var(--ink)', padding: '32px 0' }}>
          {[
          ['orders', tr('Tellimused','Заказы'), 14],
          ['saved', tr('Lemmikud','Избранное'), 8],
          ['addresses', tr('Aadressid','Адреса'), 3],
          ['invoices', tr('Arved','Счета'), 12],
          ['settings', tr('Konto seaded','Настройки'), null]].
          map(([k, l, n]) =>
          <a key={k} onClick={() => setTab(k)} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 32px', cursor: 'pointer', background: tab === k ? 'var(--paper-2)' : 'transparent', borderLeft: tab === k ? '3px solid var(--ink)' : '3px solid transparent', fontWeight: tab === k ? 600 : 400, fontSize: 14 }}>
              <span>{l}</span>
              {n !== null && <span className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{n}</span>}
            </a>
          )}
          <div style={{ padding: '32px', marginTop: 32, borderTop: '1.5px solid var(--ink)', fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{tr('Partneri soodustus','Скидка партнёра')}</div>
            <div className="vp-display" style={{ fontSize: 48, color: 'var(--accent)' }}>−22%</div>
            <div style={{ marginTop: 6 }}>{tr('Käive','Оборот')}: 18 240 € / 25 000 € {tr('järgmise tasemeni','до следующего уровня')}</div>
            <div style={{ marginTop: 10, height: 6, background: 'var(--paper-2)', borderRadius: 0, overflow: 'hidden' }}>
              <div style={{ width: '73%', height: '100%', background: 'var(--ink)' }} />
            </div>
          </div>
        </aside>
        <div style={{ padding: '40px 48px' }}>
          {tab === 'orders' &&
          <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
                <h2 className="vp-display" style={{ fontSize: 48, margin: 0 }}>{tr('Tellimused','Заказы')} (14)</h2>
                <input className="vp-input" placeholder={tr('Otsi tellimuse nr...','Поиск по № заказа...')} style={{ maxWidth: 260 }} />
              </div>
              <div style={{ border: '1.5px solid var(--ink)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr 1fr 100px', gap: 18, padding: '14px 22px', background: 'var(--ink)', color: 'var(--paper)', fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <span>{tr('Nr','№')}</span><span>{tr('Kuupäev','Дата')}</span><span>{tr('Tooteid','Товаров')}</span><span>{tr('Staatus','Статус')}</span><span style={{ textAlign: 'right' }}>{tr('Summa','Сумма')}</span>
                </div>
                {orders.map((o, i) =>
              <div key={o.nr} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr 1fr 100px', gap: 18, padding: '18px 22px', borderTop: i > 0 ? '1px solid rgba(0,0,0,0.1)' : 'none', alignItems: 'center', cursor: 'pointer' }}>
                    <span className="vp-mono" style={{ fontSize: 13, fontWeight: 600 }}>{o.nr}</span>
                    <span style={{ fontSize: 14 }}>{o.d}</span>
                    <span style={{ fontSize: 14 }}>{o.items} {tr('toodet','товаров')}</span>
                    <span><span className="vp-chip" style={{ padding: '4px 10px', fontSize: 10, background: o.t === 'Kinnitatud' ? 'var(--paper-2)' : 'transparent' }}>{o.t}</span></span>
                    <span style={{ textAlign: 'right', fontWeight: 600 }}>{o.sum}</span>
                  </div>
              )}
              </div>
            </>
          }
          {tab === 'saved' &&
          <>
              <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 24px' }}>{tr('Lemmikud','Избранное')} (8)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                {['LHV10', 'AST20', 'LPA909', 'RST25', 'LHV15', 'ASP611', 'AST22', 'AST30'].map((sku) =>
              <div key={sku} style={{ border: '1.5px solid var(--ink)', cursor: 'pointer' }}>
                    <div className="vp-photo" style={{ aspectRatio: '1', borderBottom: '1.5px solid var(--ink)' }}><span className="label">{sku.toLowerCase()}</span></div>
                    <div style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span className="vp-mono">{sku}</span><span>♥</span></div>
                  </div>
              )}
              </div>
            </>
          }
          {tab !== 'orders' && tab !== 'saved' &&
          <>
              <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 24px' }}>{{ addresses: tr('Aadressid','Адреса'), invoices: tr('Arved','Счета'), settings: tr('Konto seaded','Настройки') }[tab]}</h2>
              {tab === 'addresses' &&
            <>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 560, marginBottom: 24 }}>Salvestatud tarne- ja arveldusaadressid. Tellimuse vormistamisel saad valida.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                    {[
                { tag: 'Peamine kontor', addr: 'Tartu mnt 84a, 10112 Tallinn', kind: 'Arveldus + tarne', def: true },
                { tag: 'Ladu Pärnu', addr: 'Riia mnt 233, 80042 Pärnu', kind: 'Ainult tarne', def: false },
                { tag: 'Objekt — Rotermann', addr: 'Roseni 7, 10111 Tallinn', kind: 'Ajutine tarne', def: false }].
                map((a) =>
                <div key={a.tag} style={{ border: '1.5px solid var(--ink)', padding: '18px 20px', position: 'relative' }}>
                        {a.def && <span className="vp-chip" style={{ position: 'absolute', top: 12, right: 12, padding: '3px 9px', fontSize: 10, background: 'var(--ink)', color: 'var(--paper)' }}>Vaikimisi</span>}
                        <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{a.kind}</div>
                        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{a.tag}</div>
                        <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>{a.addr}</div>
                        <div style={{ display: 'flex', gap: 10, marginTop: 14, fontSize: 12 }}>
                          <a style={{ borderBottom: '1px solid var(--ink)', cursor: 'pointer' }}>Muuda</a>
                          <a style={{ borderBottom: '1px solid var(--muted)', cursor: 'pointer', color: 'var(--muted)' }}>Kustuta</a>
                        </div>
                      </div>
                )}
                    <button className="vp-btn vp-btn--ghost" style={{ minHeight: 120, fontSize: 14 }}>+ Lisa uus aadress</button>
                  </div>
                </>
            }
              {tab === 'invoices' &&
            <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, flexWrap: 'wrap', gap: 14 }}>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 480, margin: 0 }}>12 arvet · 8 tasutud, 3 ootel, 1 üle tähtaja. Lae alla PDF-id raamatupidamisse.</p>
                    <button className="vp-btn vp-btn--ghost" style={{ fontSize: 12 }}>Lae kõik PDF-id (ZIP) ↓</button>
                  </div>
                  <div style={{ border: '1.5px solid var(--ink)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '130px 110px 1fr 130px 100px 90px', gap: 14, padding: '12px 22px', background: 'var(--ink)', color: 'var(--paper)', fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      <span>Arve nr</span><span>Kuupäev</span><span>Kirjeldus</span><span>Staatus</span><span style={{ textAlign: 'right' }}>Summa</span><span style={{ textAlign: 'right' }}>PDF</span>
                    </div>
                    {[
                { nr: 'A-2026-0143', d: '02.05.2026', desc: 'Tellimus #VP-2143 · 28 m profiili', t: 'Tasutud', sum: '1 248 €' },
                { nr: 'A-2026-0138', d: '24.04.2026', desc: 'Tellimus #VP-2138 · 12 m + paigaldus', t: 'Tasutud', sum: '687 €' },
                { nr: 'A-2026-0131', d: '18.04.2026', desc: 'Tellimus #VP-2131 · 56 m peitesiin', t: 'Ootel · 14p', sum: '2 480 €' },
                { nr: 'A-2026-0124', d: '05.04.2026', desc: 'Tellimus #VP-2124 · RAL eritoon 9005', t: 'Üle tähtaja', sum: '412 €' }].
                map((inv, i) =>
                <div key={inv.nr} style={{ display: 'grid', gridTemplateColumns: '130px 110px 1fr 130px 100px 90px', gap: 14, padding: '14px 22px', borderTop: '1px solid rgba(0,0,0,0.1)', alignItems: 'center', fontSize: 13 }}>
                        <span className="vp-mono" style={{ fontWeight: 600 }}>{inv.nr}</span>
                        <span>{inv.d}</span>
                        <span style={{ color: 'var(--ink-2)' }}>{inv.desc}</span>
                        <span><span className="vp-chip" style={{ padding: '3px 9px', fontSize: 10, background: inv.t === 'Tasutud' ? 'var(--paper-2)' : inv.t.startsWith('Üle') ? '#f4d4d0' : 'transparent' }}>{inv.t}</span></span>
                        <span style={{ textAlign: 'right', fontWeight: 600 }}>{inv.sum}</span>
                        <a style={{ textAlign: 'right', cursor: 'pointer', borderBottom: '1px solid var(--ink)', fontSize: 11, fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>PDF ↓</a>
                      </div>
                )}
                  </div>
                </>
            }
              {tab === 'settings' &&
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32 }}>
                  <div style={{ border: '1.5px solid var(--ink)', padding: '28px 32px' }}>
                    <div className="vp-eyebrow" style={{ marginBottom: 14 }}>Ettevõtte info</div>
                    <div style={{ display: 'grid', gap: 12 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <label style={{ fontSize: 12 }}>Ettevõte<input className="vp-input" defaultValue="OÜ Profilex" style={{ marginTop: 4 }} /></label>
                        <label style={{ fontSize: 12 }}>Reg.nr<input className="vp-input" defaultValue="14872310" style={{ marginTop: 4 }} /></label>
                      </div>
                      <label style={{ fontSize: 12 }}>KMKR<input className="vp-input" defaultValue="EE102468135" style={{ marginTop: 4 }} /></label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <label style={{ fontSize: 12 }}>Kontaktisik<input className="vp-input" defaultValue="Margus Tamm" style={{ marginTop: 4 }} /></label>
                        <label style={{ fontSize: 12 }}>Telefon<input className="vp-input" defaultValue="+372 56 412 008" style={{ marginTop: 4 }} /></label>
                      </div>
                      <label style={{ fontSize: 12 }}>E-post<input className="vp-input" defaultValue="margus@profilex.ee" style={{ marginTop: 4 }} /></label>
                    </div>
                    <button className="vp-btn" style={{ marginTop: 20 }}>Salvesta muudatused →</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div style={{ border: '1.5px solid var(--ink)', padding: '22px 24px' }}>
                      <div className="vp-eyebrow" style={{ marginBottom: 10 }}>Teavitused</div>
                      {[
                  ['Tellimuse staatus', true],
                  ['Arve tähtaja meeldetuletused', true],
                  ['Uudiskiri (1× kuus)', false],
                  ['Partnerite kampaaniad', true]].
                  map(([l, v]) =>
                  <label key={l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid rgba(0,0,0,0.08)', fontSize: 13, cursor: 'pointer' }}>
                          <span>{l}</span>
                          <input type="checkbox" defaultChecked={v} />
                        </label>
                  )}
                    </div>
                    <div style={{ border: '1.5px solid var(--ink)', padding: '22px 24px', background: 'var(--paper-2)' }}>
                      <div className="vp-eyebrow" style={{ marginBottom: 10 }}>Salasõna</div>
                      <p style={{ fontSize: 12, color: 'var(--ink-2)', margin: '0 0 14px', lineHeight: 1.55 }}>Viimati muudetud 14.02.2026 · 87 päeva tagasi.</p>
                      <button className="vp-btn vp-btn--ghost" style={{ fontSize: 12 }}>Muuda salasõna →</button>
                    </div>
                  </div>
                </div>
            }
            </>
          }
        </div>
      </section>
    </div>);

}

window.B2BPage = B2BPage;
window.LoginPage = LoginPage;
window.AccountPage = AccountPage;