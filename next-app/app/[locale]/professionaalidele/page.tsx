'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { site } from '@/lib/site';

export default function B2BPage() {
  const locale = useLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ company: '', regNr: '', contact: '', phone: '', email: '', role: '', website: '', description: '', consent: false });

  const up = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [f]: e.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* HERO */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', borderBottom: 'var(--border)', minHeight: 600 }}>
        <div style={{ padding: '72px 56px', borderRight: 'var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="vp-eyebrow">
            {ru ? 'Партнёрская программа · Дизайнерам · Монтажникам · Реселлерам' : 'Partneriprogramm · Sisearhitektidele · Paigaldajatele · Edasimüüjatele'}
          </div>
          <div>
            <h1 className="vp-display" style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: '24px 0 0', lineHeight: 0.9 }}>
              {ru ? 'Сотрудничайте' : 'Tee koostööd'}<br />
              <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.55em', letterSpacing: '-0.02em' }}>
                {ru ? 'по лучшей цене.' : 'parima hinnaga.'}
              </span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 520, marginTop: 28 }}>
              {ru ? 'Присоединяйтесь к партнёрской сети PROSPACE — получите ' : 'Liitu PROSPACE partnerite võrgustikuga — saad '}
              <strong>{ru ? 'персональную скидку' : 'personaalse soodushinna'}</strong>
              {ru ? ', быстрые сроки доставки и техподдержку на каждом проекте.' : ', kiired tarneajad ning tehnilise toe igal projektil.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>
            <a href="#b2b-form" className="vp-btn vp-btn--lg">{ru ? 'Стать партнёром →' : 'Liitu partneriks →'}</a>
            <Link href={`${pfx}/konto/login`} className="vp-btn vp-btn--ghost vp-btn--lg">{ru ? 'Войти' : 'Logi sisse'}</Link>
          </div>
        </div>
        <div className="vp-photo" style={{ backgroundImage: 'url("/assets/b2b-vannituba.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <span className="label">{ru ? 'b2b · монтажник в салоне' : 'b2b · paigaldaja salongis'}</span>
        </div>
      </section>

      {/* BIG NUMBERS */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: 'var(--border)' }}>
        {[
          { n: '−25%', tEt: 'Keskmine partnerisoodustus',  tRu: 'Средняя скидка партнёра' },
          { n: '213',  tEt: 'Partnerit Eestis',            tRu: 'Партнёров в Эстонии' },
          { n: '24 h', tEt: 'Pakkumise vastus',            tRu: 'Ответ на запрос' },
          { n: '∞',    tEt: 'Konsultatsioone aastas',      tRu: 'Консультаций в год' },
        ].map((b, i) => (
          <div key={i} style={{ padding: '48px 32px', borderRight: i < 3 ? 'var(--border)' : 'none', textAlign: 'center' }}>
            <div className="vp-display" style={{ fontSize: 80, lineHeight: 0.9, marginBottom: 10 }}>{b.n}</div>
            <div className="vp-eyebrow">{ru ? b.tRu : b.tEt}</div>
          </div>
        ))}
      </section>

      {/* BENEFITS */}
      <section style={{ padding: '72px 56px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Что получает партнёр' : 'Mida partner saab'}</div>
        <h2 className="vp-display" style={{ fontSize: 72, margin: '0 0 48px', lineHeight: 0.95, maxWidth: 920 }}>
          {ru ? 'Конкретные преимущества,' : 'Konkreetsed eelised,'}<br />
          <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.7em' }}>
            {ru ? 'не просто обещания.' : 'mitte ainult lubadused.'}
          </span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, border: 'var(--border)' }}>
          {[
            { n: '01', tEt: 'Personaalne soodushind',      tRu: 'Персональная скидка',         dEt: 'Iga partner saab oma soodusprotsendi (5–35%), mis kehtib KÕIGILE toodetele automaatselt sisse logides. Käibe kasvades suureneb.', dRu: 'Каждый партнёр получает свой процент скидки (5–35%), который применяется ко ВСЕМ товарам автоматически при входе. С ростом оборота — увеличивается.' },
            { n: '02', tEt: 'Võimalus saada näidiskomplekt', tRu: 'Комплект образцов',           dEt: 'Näita kliendile käes, mitte ekraanil. Füüsilised proovid kõikidest seeriatest — profiilid, värvitoonid, viimistlused.', dRu: 'Покажите клиенту в руках, а не на экране. Физические образцы всех серий — профили, оттенки, отделки.' },
            { n: '03', tEt: 'Pidev tehniline tugi',         tRu: 'Постоянная техподдержка',     dEt: 'Otseliin tehnoloogiga. Joonised, mõõdistus, projekti revisjon. E–R 10–17.', dRu: 'Прямая линия с технологом. Чертежи, замеры, ревизия проекта. Пн–Пт 10–17.' },
            { n: '04', tEt: 'Prioriteet tarneaegades',      tRu: 'Приоритет в доставке',        dEt: 'Partnerite tellimused liiguvad lao järjekorrast ette.', dRu: 'Заказы партнёров обрабатываются вне очереди склада.' },
            { n: '05', tEt: 'Kaasturundus',                 tRu: 'Совместный маркетинг',        dEt: 'Kvaliteetsed projektid jõuavad meie inspiratsiooni — krediteerime, lingime, jagame sotsiaalmeedias.', dRu: 'Качественные проекты попадают в наше «Вдохновение» — указываем авторов, ссылаемся, делимся в соцсетях.' },
          ].map((b, i, arr) => (
            <div key={b.n} style={{ padding: '36px', borderRight: i % 2 === 0 ? 'var(--border)' : 'none', borderBottom: i < arr.length - 1 ? 'var(--border)' : 'none', display: 'flex', gap: 24 }}>
              <div className="vp-display" style={{ fontSize: 64, lineHeight: 0.9, color: 'var(--accent)', flexShrink: 0 }}>{b.n}</div>
              <div>
                <div className="vp-display" style={{ fontSize: 32, marginBottom: 8 }}>{ru ? b.tRu : b.tEt}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)' }}>{ru ? b.dRu : b.dEt}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '72px 56px', background: 'var(--paper-2)', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Как это работает' : 'Kuidas käib'}</div>
        <h2 className="vp-display" style={{ fontSize: 64, margin: '0 0 40px', lineHeight: 0.95 }}>
          {ru ? 'Регистрация за 5 минут.' : 'Liitu 5 minutiga.'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
            { n: '01', tEt: 'Täida ankeet',   tRu: 'Заполните анкету', dEt: '5 min · ettevõtte andmed, valdkond, kontakt.',             dRu: '5 мин · данные компании, сфера, контакт.' },
            { n: '02', tEt: 'Vaatame üle',    tRu: 'Проверяем',        dEt: '24 h · kinnitame partnerstaatuse ja sinu soodusprotsendi.', dRu: '24 ч · подтверждаем партнёрский статус и ваш процент скидки.' },
            { n: '03', tEt: 'Saad konto',     tRu: 'Получаете аккаунт', dEt: 'Logid sisse → soodushinnad on automaatselt aktiivsed.',   dRu: 'Входите → скидки автоматически активны.' },
            { n: '04', tEt: 'Tellid',         tRu: 'Заказываете',      dEt: 'Iga tellimus salvestub ajaloole, näed kõike "Minu kontos".', dRu: 'Каждый заказ сохраняется в истории, всё видно в «Моём кабинете».' },
          ].map((s) => (
            <div key={s.n} style={{ padding: '24px', border: 'var(--border)', background: 'var(--paper)' }}>
              <div className="vp-mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 18 }}>{s.n}</div>
              <div className="vp-display" style={{ fontSize: 30, marginBottom: 8 }}>{ru ? s.tRu : s.tEt}</div>
              <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>{ru ? s.dRu : s.dEt}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section id="b2b-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', borderBottom: 'var(--border)' }}>
        <div style={{ padding: '72px 56px', borderRight: 'var(--border)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>{ru ? 'Регистрация' : 'Liitumine'}</div>
          <h2 className="vp-display" style={{ fontSize: 64, margin: '0 0 22px', lineHeight: 0.95 }}>
            {ru ? 'Отправьте' : 'Saada'}<br />{ru ? 'анкету.' : 'ankeet.'}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 380 }}>
            {ru
              ? 'Ответим в течение 24 ч (Пн–Пт). Регистрация бесплатна, скидки активируются сразу после подтверждения.'
              : 'Vastame 24 h jooksul (E–R). Liitumine on tasuta, soodushindade aktiveerumine kohe peale kinnitust.'}
          </p>
          <div style={{ marginTop: 32, padding: '18px 22px', border: 'var(--border)', background: 'var(--paper-2)' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 6 }}>{ru ? 'Предпочитаете поговорить?' : 'Eelistad rääkida?'}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6 }}>
              {ru ? 'Звоните ' : 'Helista '}<strong><a href={site.phoneUrl} style={{ color: 'inherit' }}>{site.phone}</a></strong>
              {ru ? ' или пишите ' : ' või kirjuta '}<a href={site.emailUrl} className="vp-mono" style={{ color: 'inherit' }}>{site.email}</a>
            </div>
          </div>
        </div>

        <div style={{ padding: '56px', background: 'var(--paper-2)' }}>
          {submitted ? (
            <div style={{ padding: '56px 32px', border: 'var(--border)', background: 'var(--paper)', textAlign: 'center' }}>
              <div className="vp-display" style={{ fontSize: 80, color: 'var(--accent)', lineHeight: 1, marginBottom: 18 }}>✓</div>
              <h3 className="vp-display" style={{ fontSize: 42, margin: '0 0 16px', lineHeight: 0.95 }}>
                {ru ? 'Спасибо!' : 'Aitäh!'}<br />{ru ? 'Анкета отправлена.' : 'Ankeet saadetud.'}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: 420, margin: '0 auto 26px' }}>
                {ru ? 'Ответим в течение 24 ч (Пн–Пт).' : 'Vastame 24 h jooksul (E–R).'}
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href={`${pfx}/tooted`} className="vp-btn">{ru ? 'Смотреть товары →' : 'Sirvi tooteid →'}</Link>
                <button className="vp-btn vp-btn--ghost" onClick={() => setSubmitted(false)}>{ru ? 'Отправить ещё анкету' : 'Saada veel ankeet'}</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <input className="vp-input" placeholder={`${ru ? 'Компания' : 'Ettevõte'} *`} required value={form.company} onChange={up('company')} />
              <input className="vp-input" placeholder={`${ru ? 'Рег.№' : 'Reg.nr'} *`} value={form.regNr} onChange={up('regNr')} />
              <input className="vp-input" placeholder={`${ru ? 'Контактное лицо' : 'Kontaktisik'} *`} required value={form.contact} onChange={up('contact')} />
              <input className="vp-input" placeholder={`${ru ? 'Телефон' : 'Telefon'} *`} required value={form.phone} onChange={up('phone')} />
              <input className="vp-input" type="email" placeholder="E-mail *" required style={{ gridColumn: '1 / -1' }} value={form.email} onChange={up('email')} />
              <select className="vp-input" style={{ gridColumn: '1 / -1', cursor: 'pointer' }} value={form.role} onChange={up('role')}>
                <option value="">{ru ? 'Сфера деятельности — выберите...' : 'Tegevusvaldkond — vali...'}</option>
                <option>{ru ? 'Дизайнер интерьера' : 'Sisearhitekt / disainer'}</option>
                <option>{ru ? 'Монтажник / строитель' : 'Paigaldaja / ehitaja'}</option>
                <option>{ru ? 'Реселлер' : 'Edasimüüja'}</option>
                <option>{ru ? 'Архитектурное бюро' : 'Arhitektuuribüroo'}</option>
                <option>{ru ? 'Другое' : 'Muu'}</option>
              </select>
              <input className="vp-input" placeholder={ru ? 'Адрес сайта (напр. firma.ee)' : 'Kodulehe aadress (nt firma.ee)'} style={{ gridColumn: '1 / -1' }} value={form.website} onChange={up('website')} />
              <textarea className="vp-input" rows={4} placeholder={ru ? 'Краткое описание, текущие проекты...' : 'Lühitutvustus, käimasolevad projektid...'} style={{ gridColumn: '1 / -1' }} value={form.description} onChange={up('description')} />
              <label style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, fontSize: 13, alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="checkbox" required checked={form.consent} onChange={up('consent')} style={{ marginTop: 2 }} />
                <span>{ru ? 'Согласен с обработкой персональных данных по политике конфиденциальности' : 'Nõustun isikuandmete töötlemisega vastavalt privaatsuspoliitikale'}</span>
              </label>
              <button type="submit" className="vp-btn vp-btn--lg vp-btn--block" style={{ gridColumn: '1 / -1', marginTop: 8 }} disabled={loading}>
                {loading ? (ru ? 'Отправка…' : 'Saadan…') : (ru ? 'Отправить анкету →' : 'Saada ankeet →')}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding: '72px 56px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Почему сотрудничать с нами' : 'Miks meiega koostööd teha'}</div>
        <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 32px', lineHeight: 0.95, maxWidth: 920 }}>
          {ru ? 'Товары, которые работают —' : 'Tooted, mis töötavad —'}<br />
          {ru ? 'клиенты, которые довольны.' : 'kliendid, kes jäävad rahule.'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { tEt: 'Projektikogemus',         tRu: 'Проектный опыт',          dEt: 'Profiile on paigaldatud kümnetesse projektidesse — eluasemetest äripindadeni. Kvaliteet, mis kestab ja klientidele meeldib.', dRu: 'Профили установлены в десятках проектов — от жилья до коммерции. Качество, которое служит и нравится клиентам.' },
            { tEt: 'Alati abiks nõuga',       tRu: 'Всегда поможем советом',  dEt: 'Oleme alati abiks nõuga, milliseid profiile kuhu paigaldada. Kiire tagasiside joonisest paigalduseni.', dRu: 'Поможем советом — какие профили куда ставить. Быстрая обратная связь от чертежа до монтажа.' },
            { tEt: 'Oma salongi näidised',    tRu: 'Образцы для вашего салона', dEt: 'Partnerina saad oma näidised. Näita klientidele füüsilist toodet, mitte ekraani.', dRu: 'Партнёрам — собственные образцы. Покажите клиентам физический товар, а не экран.' },
          ].map((c, i) => (
            <div key={i} style={{ padding: '32px 28px', border: 'var(--border)' }}>
              <div className="vp-display" style={{ fontSize: 56, lineHeight: 0.9, color: 'var(--accent)', marginBottom: 18 }}>0{i + 1}</div>
              <div className="vp-display" style={{ fontSize: 28, lineHeight: 1.05, marginBottom: 12 }}>{ru ? c.tRu : c.tEt}</div>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)' }}>{ru ? c.dRu : c.dEt}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
