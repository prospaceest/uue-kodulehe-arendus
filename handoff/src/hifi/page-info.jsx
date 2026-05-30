/* FAQ + Shipping + Warranty + Legal + Search + 404 */

function FaqPage({ setPage }) {
  useLocale(); // FaqPage locale
  const S = window.__site || {};
  const groups = [
  { h: tr('Tellimine','Заказ'), items: [
    [tr('Kuidas tellimuse vormistamine käib?','Как оформить заказ?'), tr(`Vali tooted → ostukorvi → vormista. Sisestad oma andmed ja valid tarne. Tellimus jõuab meie meili (${S.email}). 24 h jooksul vastame arve, makseinfo ja kinnitusega.`,`Выберите товары → в корзину → оформите заказ. Введите свои данные и выберите доставку. Заказ приходит на нашу почту (${S.email}). В течение 24 ч отвечаем со счётом, реквизитами и подтверждением.`)],
    [tr('Kas saan maksta kohe kaardiga?','Можно ли оплатить картой?'), tr('Hetkel pakume ainult SEPA ülekande maksmist. Saadame arve meiliga, sina maksad ülekandega — peale laekumist paneme kauba teele.','Сейчас принимаем только SEPA-переводы. Отправляем счёт по почте, вы оплачиваете переводом — после поступления отправляем товар.')],
    [tr('Mis on minimaalne tellimuse kogus?','Какой минимальный заказ?'), tr('Minimaalset kogust ei ole. Tellida saab alates 1 tükist.','Минимального заказа нет. Можно заказывать от 1 шт.')],
    [tr('Kas saan tellimust muuta peale saatmist?','Можно ли изменить заказ после отправки?'), tr('Jah — vasta meilile 24 h jooksul peale tellimust. Pärast laekumist või lähetamist muutmine on keerukam.','Да — ответьте на письмо в течение 24 ч. После оплаты или отгрузки изменения сложнее.')]]
  },
  { h: tr('Tarne','Доставка'), items: [
    [tr('Milline on tarne aeg?','Срок доставки?'), tr('Laokauba tarne otse salongist või Venipakiga 2–4 tööpäeva. RAL eritoonid 4–5 nädalat.','Складской товар — самовывоз из салона или Venipak 2–4 рабочих дня. RAL под заказ — 4–5 недель.')],
    [tr('Kui palju tarne maksab?','Сколько стоит доставка?'), tr('Venipak üle Eesti: 25 € + KM. Tellimused üle 200 € — tasuta. Salongist kättesaamine alati tasuta.','Venipak по Эстонии: 25 € + НДС. Заказы свыше 200 € — бесплатно. Самовывоз из салона — всегда бесплатно.')],
    [tr('Kas saadate ka Soome / Lätti?','Доставляете ли в Финляндию / Латвию?'), tr('Jah, saadame üle Baltikumi ja Skandinaavia. Tarne hind vastavalt asukohale.','Да, отправляем по всей Балтии и Скандинавии. Стоимость доставки зависит от региона.')],
    [tr('Mida teha, kui pakk on kahjustatud?','Что делать, если посылка повреждена?'), tr('Foto + e-mail 24 h jooksul. Saadame uue tasuta. Venipak vastutab transpordi eest.','Фото + e-mail в течение 24 ч. Отправим новый бесплатно. Venipak отвечает за перевозку.')]]
  },
  { h: tr('Tooted','Товары'), items: [
    [tr('Kas saan tooteid kohapeal näha?','Можно ли посмотреть товары на месте?'), tr('Jah, salongis Vana-Kalamaja 8, Tallinn. E–R 10–17. Palume kohtumine eelnevalt broneerida.','Да, в салоне Vana-Kalamaja 8, Tallinn. Пн–Пт 10–17. Пожалуйста, забронируйте визит заранее.')],
    [tr('Kas pakute paigaldusteenust?','Предлагаете ли услугу монтажа?'), tr('Ei, müüme vaid profiile. Vajadusel suhtleme paigaldajaga ning juhendame, kuidas paigaldus peaks toimuma.','Нет, продаём только профили. При необходимости связываемся с монтажником и консультируем, как должна проходить установка.')],
    [tr('Kas profiile saab eritellimusel värvida?','Можно ли заказать окраску в RAL?'), tr('Jah — kõik RAL toonid. Tarne 4–5 nädalat.','Да — любые оттенки RAL. Поставка 4–5 недель.')],
    [tr('Kuidas valida õige profiil?','Как выбрать правильный профиль?'), tr('Kui sa ei oska valida, siis helista, kirjuta või broneeri konsultatsioon meie spetsialistiga.','Если не знаете, что выбрать — позвоните, напишите или забронируйте консультацию с нашим специалистом.')]]
  },
  { h: tr('B2B / partnerlus','B2B / партнёрство'), items: [
    [tr('Kes saab partneriks?','Кто может стать партнёром?'), tr('Sisearhitektid, paigaldajad, edasimüüjad, ehitusettevõtted. Liitumine tasuta — täida ankeet.','Дизайнеры интерьера, монтажники, дистрибьюторы, строительные компании. Регистрация бесплатна — заполните анкету.')],
    [tr('Kuidas soodushind toimib?','Как работает партнёрская скидка?'), tr('Logid sisse oma partnerikontoga — soodusprotsent (5–35%) rakendub automaatselt kõikidele toodetele.','Войдите в свой партнёрский кабинет — скидка (5–35%) применяется автоматически ко всем товарам.')]]
  }];

  const [open, setOpen] = React.useState({});
  const totalCount = groups.reduce((s, g) => s + g.items.length, 0);
  return (
    <div className="vp-page">
      <Marquee />
      <section style={{ padding: '72px 56px 32px', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('Korduvad küsimused','Часто задаваемые вопросы')} · {totalCount} {tr('vastust','ответов')}</div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: 0, lineHeight: 0.9 }}>{tr('KKK.','Вопросы.')}</h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 680, marginTop: 18 }}>
          {tr('Vastused küsimustele, mis tulevad iga päev. Kui sinu küsimus puudub — kirjuta','Ответы на вопросы, которые приходят каждый день. Если вашего вопроса нет — напишите')} <a href={S.emailUrl} className="vp-mono" style={{color:'inherit', borderBottom:'1px solid currentColor'}}>{S.email}</a>.
        </p>
      </section>
      <section style={{ padding: '48px 56px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, borderBottom: '1.5px solid var(--ink)' }}>
        <aside style={{ position: 'sticky', top: 80, alignSelf: 'start' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('Teemad','Темы')}</div>
          {groups.map((g) =>
          <a key={g.h} href={`#g-${g.h}`} style={{ display: 'block', padding: '10px 0', fontSize: 14, fontWeight: 500, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>{g.h} <span style={{ color: 'var(--muted)', fontFamily: 'JetBrains Mono', fontSize: 11, marginLeft: 6 }}>{g.items.length}</span></a>
          )}
          <div style={{ marginTop: 32, padding: '18px 20px', border: '1.5px solid var(--ink)', background: 'var(--paper-2)' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 6 }}>{tr('Ei leia vastust?','Не нашли ответа?')}</div>
            <div style={{ fontSize: 13, marginBottom: 10, lineHeight: 1.55 }}>{tr('Kirjuta meile — vastame 24 h jooksul.','Напишите нам — ответим в течение 24 ч.')}</div>
            <button className="vp-btn vp-btn--block" onClick={() => setPage('contact')}>{tr('Kontakt →','Контакты →')}</button>
          </div>
        </aside>
        <div>
          {groups.map((g) =>
          <div key={g.h} id={`g-${g.h}`} style={{ marginBottom: 48 }}>
              <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 18px' }}>{g.h}</h2>
              {g.items.map(([q, a], i) => {
              const id = `${g.h}-${i}`;
              const isOpen = open[id];
              return (
                <div key={i} onClick={() => setOpen({ ...open, [id]: !isOpen })} style={{ borderBottom: '1px solid rgba(0,0,0,0.15)', padding: '20px 0', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                      <span style={{ fontSize: 17, fontWeight: 500 }}>{q}</span>
                      <span style={{ fontSize: 24, lineHeight: 1 }}>{isOpen ? '−' : '+'}</span>
                    </div>
                    {isOpen && <div style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', marginTop: 14, maxWidth: 720 }}>{a}</div>}
                  </div>);

            })}
            </div>
          )}
        </div>
      </section>
    </div>);

}

function ShippingPage({ setPage }) {
  useLocale(); // ShippingPage locale
  return (
    <div className="vp-page">
      <Marquee />
      <section style={{ padding: '72px 56px 32px', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('Klienditeenindus · Tarne ja maksmine','Сервис · Доставка и оплата')}</div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: 0, lineHeight: 0.9 }}>
          {tr('Tarne.','Доставка.')}<br />
          <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.5em', letterSpacing: '-0.02em' }}>{tr('kogu Eesti, 2–4 päevaga.','по всей Эстонии за 2–4 дня.')}</span>
        </h1>
      </section>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1.5px solid var(--ink)' }}>
        {[
        { n: '25 €', t: tr('Venipak üle Eesti','Venipak по Эстонии'), d: tr('+ KM 24%. Tarne 2–4 tööpäeva, kui kaup on laos.','+ НДС 24%. Доставка 2–4 рабочих дня при наличии на складе.') },
        { n: tr('Tasuta','Бесплатно'), t: tr('Tellimustelt 200 €+','От заказов 200 €+'), d: tr('Automaatselt — meie kanname tarnekulu.','Автоматически — мы покрываем стоимость доставки.') },
        { n: tr('Tasuta','Бесплатно'), t: tr('Salongist Tallinnas','Самовывоз в Таллинне'), d: tr('Vana-Kalamaja 8, E–R 10–17. Teavitame, kui valmis.','Vana-Kalamaja 8, Пн–Пт 10–17. Сообщим, когда готово.') }].
        map((b, i) =>
        <div key={i} style={{ padding: '48px 32px', borderRight: i < 2 ? '1.5px solid var(--ink)' : 'none', textAlign: 'center' }}>
            <div className="vp-display" style={{ fontSize: 80, lineHeight: 0.9, marginBottom: 12 }}>{b.n}</div>
            <div className="vp-display" style={{ fontSize: 28, marginBottom: 10 }}>{b.t}</div>
            <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>{b.d}</div>
          </div>
        )}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ padding: '56px 48px', borderRight: '1.5px solid var(--ink)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('01 / Tarne aeg','01 / Срок доставки')}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 18px' }}>{tr('Kui kiiresti','Как быстро')}<br />{tr('kohale jõuab?','дойдёт?')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '14px 24px', fontSize: 15, lineHeight: 1.55 }}>
            <span className="vp-mono" style={{ fontSize: 13, color: 'var(--muted)', alignSelf: 'baseline' }}>{tr('Laokaup','Со склада')}</span>
            <span data-comment-anchor="row-stock"><strong>2–4 tööpäeva</strong> · Must ja valge — enamasti laos. Saadame järgmisel tööpäeval peale arve täielikku laekumist.</span>
            <span className="vp-mono" style={{ fontSize: 13, color: 'var(--muted)', alignSelf: 'baseline' }}>{tr('RAL eritoon','RAL под заказ')}</span>
            <span><strong>4–5 nädalat</strong> · Pulbervärvitus eritellimusena — iga toon erinevalt.</span>
          </div>
          <div style={{ marginTop: 32, padding: '18px 22px', border: '1.5px solid var(--ink)', background: 'var(--paper-2)', fontSize: 14, lineHeight: 1.55 }}>
            <strong>{tr('Kuidas käib loendus?','Как считается срок?')}</strong> Ajaarv läheb käima alates arve 100% laekumisest meie kontole. Pakid lähevad järgmisel tööpäeval (E–R) Venipaki kätte.
          </div>
        </div>
        <div style={{ padding: '56px 48px', background: 'var(--paper-2)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('02 / Pakendamine','02 / Упаковка')}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 18px' }}>{tr('Korralikult','Надёжно')}<br />{tr('pakendatud.','упаковано.')}</h2>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)' }}>
            Pakendame profiilid korralikult nii, et need jõuaksid sinuni tervena. Lähetuse järel saadame e-postile Venipaki <strong>jälgimisnumbri</strong>, et tead, kus su pakk parasjagu on.
          </p>
        </div>
      </section>

      <section style={{ padding: '56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('03 / Maksmine','03 / Оплата')}</div>
        <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 22px' }}>{tr('SEPA ülekanne.','SEPA-перевод.')}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.65, maxWidth: 720, color: 'var(--ink-2)' }}>
          Me ei paku kodulehel automaatset kaardimakset. Selle asemel saadame sulle 24 h jooksul e-arve kõikide andmetega — tasud SEPA ülekandega. Profiilid lähetame välja alles siis, kui arve on <strong>100% makstud</strong>. Me ei tee ettemaksuarveid.
        </p>
        <div style={{ marginTop: 24, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button className="vp-btn vp-btn--lg" onClick={() => setPage('b2b')}>{tr('Liitu B2B partneriks →','Стать B2B-партнёром →')}</button>
          <button className="vp-btn vp-btn--ghost vp-btn--lg" onClick={() => setPage('contact')}>{tr('Küsi pakkumist','Запросить предложение')}</button>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ padding: '56px 48px', borderRight: '1.5px solid var(--ink)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('04 / Tagastus','04 / Возврат')}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 22px' }}>{tr('14 päeva.','14 дней.')}</h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            E-poest ostes kehtib 14-päevane tagastusõigus alates kauba kättesaamisest. Toode peab olema kasutamata,
            originaalpakendis. Tagastusveo eest tasub klient (v.a. defekti korral).
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--muted)', marginTop: 14 }}>
            Eritellimusel valmistatud (RAL värv, eritellimuse pikkus) toodetel tagastusõigus ei kehti.
          </p>
        </div>
        <div style={{ padding: '56px 48px' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('05 / Defektid','05 / Дефекты')}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 22px' }}>{tr('Pretensioonid.','Претензии.')}</h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            Avastasid kahjustuse? Foto + e-mail <a href={(window.__site||{}).emailUrl} className="vp-mono" style={{color:'inherit', borderBottom:'1px solid currentColor'}}>{(window.__site||{}).email}</a> 24 h jooksul.
            Vastame samal päeval, asendame defektsed tooted tasuta.
          </p>
        </div>
      </section>
    </div>);

}

function WarrantyPage({ setPage }) {
  useLocale(); // WarrantyPage locale
  return (
    <div className="vp-page">
      <Marquee />
      <section style={{ padding: '72px 56px 32px', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('Klienditeenindus · Garantii','Сервис · Гарантия')}</div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: 0, lineHeight: 0.9 }}>
          {tr('Garantii','Гарантия')}<br />
          <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.5em', letterSpacing: '-0.02em' }}>{tr('profiilile ja selle värvile.','на профиль и его покрытие.')}</span>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 720, marginTop: 22 }}>
          Müüme ainult alumiiniumprofiile ja katame garantiiga vaid seda, mille eest meie vastutame — profiili ennast ja selle värvi. LED-ribasid, toiteplokke ega muid elektroonika komponente me ei müü ega garanteeri.
        </p>
      </section>
      <section style={{ padding: '56px', borderBottom: '1.5px solid var(--ink)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('Mis kehtib','Что покрывает')}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 22px' }}>{tr('Garantii','Гарантия')}<br />{tr('katab.','покрывает.')}</h2>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15, lineHeight: 1.8, color: 'var(--ink-2)' }}>
            <li>{tr('Tootmisdefektid','Заводские дефекты')}</li>
            <li>{tr('Korrosioon ja oksüdeerumine normaaltingimustes','Коррозия и окисление в нормальных условиях')}</li>
            <li>{tr('Värvi tuhmumine sisetingimustes','Выцветание краски в помещениях')}</li>
          </ul>
        </div>
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('Mis ei kehti','Что не покрывает')}</div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 22px' }}>{tr('Garantii ei kata.','Гарантия не покрывает.')}</h2>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15, lineHeight: 1.8, color: 'var(--ink-2)' }}>
            <li>{tr('Vale paigaldus','Неправильный монтаж')}</li>
            <li>{tr('Mehaanilised vigastused peale paigaldust','Механические повреждения после монтажа')}</li>
            <li>{tr('Kemikaalide, lahustite kahjustused','Повреждения от химикатов и растворителей')}</li>
            <li>{tr('Loomulik kulumine','Естественный износ')}</li>
          </ul>
        </div>
      </section>
      <section style={{ padding: '56px', background: 'var(--paper-2)', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('Pretensiooni esitamine','Подача претензии')}</div>
        <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 22px' }}>{tr('3 sammu.','3 шага.')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
          { n: '01', t: tr('Foto + kirjeldus','Фото + описание'), d: tr(`Saada ${(window.__site||{}).email} — toode, ostu kuupäev, probleemi kirjeldus, fotod.`,`Отправьте на ${(window.__site||{}).email} — товар, дата покупки, описание проблемы, фото.`) },
          { n: '02', t: tr('Vastame 48 h jooksul','Отвечаем в течение 48 ч'), d: tr('Hindame: kas garantiijuhtum. Kui jah — anname asenduskorralduse.','Оцениваем гарантийный случай. Если да — выдаём заказ на замену.') },
          { n: '03', t: tr('Asendame või parandame','Заменяем или ремонтируем'), d: tr('Saadame uue toote tasuta. Vana toode hävitame või tagastame.','Отправляем новый товар бесплатно. Старый утилизируем или возвращаем.') }].
          map((s) =>
          <div key={s.n} style={{ padding: '24px 24px', border: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
              <div className="vp-mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 18 }}>{s.n}</div>
              <div className="vp-display" style={{ fontSize: 28, marginBottom: 8 }}>{s.t}</div>
              <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>{s.d}</div>
            </div>
          )}
        </div>
      </section>
    </div>);

}

function LegalPage({ setPage }) {
  useLocale(); // LegalPage locale
  const [section, setSection] = React.useState('terms');
  return (
    <div className="vp-page">
      <Marquee />
      <section style={{ padding: '56px 56px 24px', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('Juriidiline info · Värskendatud 01.05.2026','Юридическая информация · Обновлено 01.05.2026')}</div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: 0 }}>{tr('Tingimused.','Условия.')}</h1>
      </section>
      <section style={{ display: 'grid', gridTemplateColumns: '260px 1fr' }}>
        <aside style={{ borderRight: '1.5px solid var(--ink)', padding: '32px 0', position: 'sticky', top: 60, alignSelf: 'start' }}>
          {[
          ['terms', tr('Müügitingimused','Условия продажи')],
          ['privacy', tr('Privaatsuspoliitika','Политика конфиденциальности')],
          ['cookies', tr('Küpsised','Файлы cookie')],
          ['impressum', tr('Impressum','Реквизиты')]].
          map(([k, l]) =>
          <a key={k} onClick={() => setSection(k)} style={{ display: 'block', padding: '14px 32px', cursor: 'pointer', background: section === k ? 'var(--paper-2)' : 'transparent', borderLeft: section === k ? '3px solid var(--ink)' : '3px solid transparent', fontWeight: section === k ? 600 : 400, fontSize: 14 }}>{l}</a>
          )}
        </aside>
        <article style={{ padding: '48px 56px', maxWidth: 820, fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)' }}>
          {section === 'terms' &&
          <>
              <h2 className="vp-display" style={{ fontSize: 48, color: 'var(--ink)', margin: '0 0 18px' }}>{tr('Müügitingimused','Условия продажи')}</h2>
              <p>{tr('Käesolevad tingimused kehtivad veebipoes','Настоящие условия применяются к заказам в интернет-магазине')} <strong>varjuprofiilid.ee</strong>{tr(' tehtavate tellimuste suhtes. Müüjaks on PROSPACE OÜ (reg.nr ','. Продавец — PROSPACE OÜ (рег.№ ')}{(window.__site||{}).regNr}{tr(', KMKR ',', ИНН ')}{(window.__site||{}).kmkr}{tr('), aadress ','), адрес ')}{(window.__site||{}).addressFull}.</p>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{tr('1. Tellimuse esitamine','1. Размещение заказа')}</h3>
              <p>{tr('Tellimus loetakse esitatuks pärast kinnitust meili teel. Müüja jätab endale õiguse tellimusest keelduda 24 h jooksul, kui kaup pole laos või muul mõjuval põhjusel.','Заказ считается оформленным после подтверждения по электронной почте. Продавец оставляет за собой право отказать в заказе в течение 24 ч, если товара нет на складе или по другой уважительной причине.')}</p>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{tr('2. Hinnad ja maksmine','2. Цены и оплата')}</h3>
              <p>{tr('Kõik hinnad sisaldavad käibemaksu 24%. Tasumine SEPA ülekandega arve alusel. Kaup jääb müüja omandisse kuni täieliku tasumiseni.','Все цены включают НДС 24%. Оплата SEPA-переводом по счёту. Товар остаётся собственностью продавца до полной оплаты.')}</p>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{tr('3. Tarne','3. Доставка')}</h3>
              <p>{tr('Tarne Venipakiga 2–4 tööpäeva (laokaup). RAL eritoonid 4–5 nädalat. Tarnekulu 25 € + KM, üle 200 € tellimuste puhul tasuta.','Доставка Venipak 2–4 рабочих дня (со склада). RAL под заказ — 4–5 недель. Доставка 25 € + НДС, при заказе свыше 200 € — бесплатно.')}</p>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{tr('4. Tagastamine','4. Возврат')}</h3>
              <p>{tr('14-päevane tagastusõigus VÕS § 56 alusel. Ei kehti eritellimusel valmistatud toodetele.','Право возврата в течение 14 дней на основании VÕS § 56. Не распространяется на товары, изготовленные под заказ.')}</p>
            </>
          }
          {section === 'privacy' &&
          <>
              <h2 className="vp-display" style={{ fontSize: 48, color: 'var(--ink)', margin: '0 0 18px' }}>{tr('Privaatsuspoliitika','Политика конфиденциальности')}</h2>
              <p>{tr('PROSPACE OÜ kogub ja töötleb isikuandmeid kooskõlas isikuandmete kaitse üldmäärusega (GDPR). Andmete vastutav töötleja: PROSPACE OÜ.','PROSPACE OÜ собирает и обрабатывает персональные данные в соответствии с GDPR. Контролёр данных — PROSPACE OÜ.')}</p>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{tr('Mida kogume','Что собираем')}</h3>
              <p>{tr('Nimi, e-post, telefon, aadress — vajalik tellimuse täitmiseks. Maksete andmeid me ei talleta — ülekanne toimub otse pankade vahel.','Имя, e-mail, телефон, адрес — необходимы для выполнения заказа. Платёжные данные не храним — перевод проходит напрямую между банками.')}</p>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, color: 'var(--ink)', margin: '32px 0 12px' }}>{tr('Säilitamine','Хранение')}</h3>
              <p>{tr('Tellimuste andmeid säilitame 7 aastat (raamatupidamise nõue). Newsletter-andmed kuni tellimuse lõpetamiseni.','Данные заказов храним 7 лет (требование бухгалтерии). Данные рассылки — до отписки.')}</p>
            </>
          }
          {section === 'cookies' &&
          <>
              <h2 className="vp-display" style={{ fontSize: 48, color: 'var(--ink)', margin: '0 0 18px' }}>{tr('Küpsised','Файлы cookie')}</h2>
              <p>{tr('Kasutame küpsiseid, et veebileht toimiks (sessiooniküpsised) ja et mõista, kuidas inimesed lehte kasutavad (anonüümne statistika).','Используем cookie для работы сайта (сессионные cookie) и анонимной статистики использования.')}</p>
              <p>{tr('Turundusküpsiste kasutamiseks küsime sinu nõusolekut esimesel külastusel. Saad seda alati muuta lehe jalusest.','Для маркетинговых cookie запрашиваем согласие при первом визите. Изменить настройки можно в подвале сайта.')}</p>
            </>
          }
          {section === 'impressum' &&
          <>
              <h2 className="vp-display" style={{ fontSize: 48, color: 'var(--ink)', margin: '0 0 18px' }}>{tr('Impressum','Реквизиты')}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '10px 18px', fontSize: 14, color: 'var(--ink)' }}>
                <span className="vp-eyebrow">{tr('Ettevõte','Компания')}</span><span>{(window.__site||{}).legal}</span>
                <span className="vp-eyebrow">{tr('Reg.nr','Рег.№')}</span><span>{(window.__site||{}).regNr}</span>
                <span className="vp-eyebrow">{tr('KMKR','ИНН')}</span><span>{(window.__site||{}).kmkr}</span>
                <span className="vp-eyebrow">{tr('Aadress','Адрес')}</span><span>{(window.__site||{}).addressFull}</span>
                <span className="vp-eyebrow">{tr('E-post','E-mail')}</span><span><a href={(window.__site||{}).emailUrl} style={{color:'inherit'}}>{(window.__site||{}).email}</a></span>
                <span className="vp-eyebrow">{tr('Telefon','Телефон')}</span><span><a href={(window.__site||{}).phoneUrl} style={{color:'inherit'}}>{(window.__site||{}).phone}</a></span>
                <span className="vp-eyebrow">{tr('Domeenid','Домены')}</span><span>varjuprofiilid.ee · <a href="https://peitlenguksed.ee" target="_blank" rel="noopener" style={{color:'inherit'}}>peitlenguksed.ee</a> · <a href="https://prospace.ee" target="_blank" rel="noopener" style={{color:'inherit'}}>prospace.ee</a></span>
              </div>
            </>
          }
        </article>
      </section>
    </div>);

}

function SearchPage({ setPage }) {
  useLocale(); // SearchPage locale
  const [q, setQ] = React.useState('');
  const all = window.__catalogProducts || [];

  const results = React.useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.trim().toLowerCase();
    const seen = new Set();
    return all.filter((p) => {
      if (seen.has(p.sku)) return false;
      const haystack = [p.sku, p.name, p.collection, p.description].join(' ').toLowerCase();
      const match = haystack.includes(needle);
      if (match) seen.add(p.sku);
      return match;
    }).slice(0, 24);
  }, [q, all]);

  return (
    <div className="vp-page">
      <Marquee />
      <section style={{ padding: '56px 56px 32px', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('Otsing','Поиск')}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
          <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: 0, lineHeight: 0.95 }}>{q ? `"${q}"` : tr('Otsi tooteid.','Найти товары.')}</h1>
          <span className="vp-mono" style={{ fontSize: 14, color: 'var(--muted)' }}>{q ? `${results.length} ${tr('tulemust','результатов')}` : ''}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 24, maxWidth: 560 }}>
          <input className="vp-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={tr('Otsi: SKU, nimi, märksõna...','Поиск: SKU, название, ключевое слово...')} autoFocus />
          <button className="vp-btn" onClick={(e) => e.preventDefault()}>{tr('Otsi →','Найти →')}</button>
        </div>
      </section>
      <section style={{ padding: '40px 56px', borderBottom: '1.5px solid var(--ink)' }}>
        {!q.trim() ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--muted)', fontFamily: 'JetBrains Mono', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{tr('Sisesta otsingsõna ülalt','Введите поисковый запрос выше')}</div>
        ) : results.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--muted)' }}>
            <div className="vp-display" style={{ fontSize: 36, marginBottom: 10, color: 'var(--ink)' }}>{tr('Tulemusi ei leitud','Результатов не найдено')}</div>
            <p style={{ fontSize: 14 }}>{tr('Proovi teist sõna, näiteks SKU-d (AST50, ASP102) või märksõna ("LED", "põrand", "lae").','Попробуйте другое слово — например, SKU (AST50, ASP102) или ключевое слово (\'LED\', \'пол\', \'потолок\').')}</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {results.map((p) => (typeof ProductCard !== 'undefined' ? <ProductCard key={p.sku} p={p} setPage={setPage} /> : null))}
          </div>
        )}
      </section>
      <section style={{ padding: '48px 56px', background: 'var(--paper-2)', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{tr('Populaarsed otsingud','Популярные запросы')}</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['LED', 'lae', 'põrand', 'sein', 'must', 'AST22', 'ASP102', 'LHV10', 'RAL', 'pahteldatav'].map((t) =>
          <span key={t} className="vp-chip" style={{ cursor: 'pointer' }} onClick={() => setQ(t)}>{t}</span>
          )}
        </div>
      </section>
    </div>);

}

function NotFoundPage({ setPage }) {
  useLocale(); // NotFoundPage locale
  return (
    <div className="vp-page">
      <Marquee />
      <section style={{ minHeight: '72vh', display: 'grid', gridTemplateColumns: '1.2fr 1fr', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ padding: '72px 56px', borderRight: '1.5px solid var(--ink)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{tr('Viga 404 · Lehte ei leitud','Ошибка 404 · Страница не найдена')}</div>
          <h1 className="vp-display" style={{ fontSize: 'clamp(120px, 20vw, 320px)', margin: 0, lineHeight: 0.85 }}>404.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 480, marginTop: 24 }}>
            {tr('Seda lehte siin ei ela. Võib-olla viga aadressis, võib-olla viga meie poolt. Üks neist liikumistest viib su tagasi:','Этой страницы здесь нет. Возможно, ошибка в адресе, возможно — наша ошибка. Один из этих переходов вернёт вас:')}
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
            <button className="vp-btn vp-btn--lg" onClick={() => setPage('home')}>{tr('← Avalehele','← На главную')}</button>
            <button className="vp-btn vp-btn--ghost vp-btn--lg" onClick={() => setPage('catalog')}>{tr('Pood','Магазин')}</button>
            <button className="vp-btn vp-btn--ghost vp-btn--lg" onClick={() => setPage('contact')}>{tr('Kontakt','Контакты')}</button>
          </div>
        </div>
        <div className="vp-photo" style={{ position: 'relative' }}>
          <span className="label">{tr('404 · empty room','404 · пустая комната')}</span>
          <div style={{ position: 'absolute', bottom: 24, right: 24, fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{tr('tühi tuba · tühi leht','пустая комната · пустая страница')}</div>
        </div>
      </section>
    </div>);

}

window.FaqPage = FaqPage;
window.ShippingPage = ShippingPage;
window.WarrantyPage = WarrantyPage;
window.LegalPage = LegalPage;
window.SearchPage = SearchPage;
window.NotFoundPage = NotFoundPage;