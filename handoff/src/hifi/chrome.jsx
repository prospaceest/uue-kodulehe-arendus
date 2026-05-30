/* Shared header / footer / logo for hi-fi */

// ============================================================
// i18n React helpers (used by Header/Footer; safe no-op when EST)
// ============================================================
function useLocale() {
  const [loc, setLoc] = React.useState((window.__locale) || 'et');
  React.useEffect(() => {
    const h = (e) => setLoc(e.detail.locale);
    window.addEventListener('vp-locale-change', h);
    return () => window.removeEventListener('vp-locale-change', h);
  }, []);
  return loc;
}
const t = (key, vars) => (window.__i18n ? window.__i18n.t(key, vars) : key);
window.useLocale = useLocale;
window.t = t;

const LogoMust = ({ className = 'vp-logo', light = false }) =>
<img
  className={className}
  src={light ? 'assets/prospace-valge.svg' : 'assets/prospace-must.svg'}
  alt="PROSPACE" />;



const LogoSprite = () => null;

const _LogoSpriteOld = () =>
<svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
    <defs>
      <symbol id="prospace-logo" viewBox="0 0 172 112">
        <path d="M48.31 44.54c3.01 0 5.77.69 8.24 2.09 2.48 1.36 4.42 3.31 5.82 5.82 1.4 2.52 2.09 5.37 2.09 8.52s-.69 6-2.09 8.52c-1.4 2.51-3.34 4.47-5.82 5.88-2.44 1.36-5.19 2.04-8.24 2.04-2.6 0-5-.53-7.15-1.61-1.27-.66-2.4-1.51-3.39-2.52v37.74h-6.12V46.43h6.12v16.07c.18 1.45.59 2.77 1.22 3.96 1.92 3.31 4.65 5.32 8.24 6.04 1.96.4 3.74.4 5.7 0 3.59-.72 6.32-2.73 8.24-6.04 1.4-2.45 1.69-4.55 1.69-7.69 0-3.15-.45-5.04-1.69-7.45-1.92-3.32-4.65-5.32-8.24-6.04-1.96-.4-3.74-.4-5.7 0-1.34.27-2.58.48-3.71.89l-2.49.89 3.54-6.45.25-.45.5-.06c.72-.09 1.46-.14 2.21-.14z" />
        <path d="M37.77 111.08H31.65V46.43h6.12v64.65zM156.2 44.54c2.86 0 5.46.65 7.78 1.98 2.35 1.32 4.21 3.16 5.57 5.5 1.41 2.36 2.14 5.04 2.22 8l.02.85-24.66 4.79c.74 1.76 1.87 3.17 3.39 4.26.35.23.7.46 1.05.65 1.79 1.11 3.9 1.69 6.38 1.69 1.77 0 3.36-.31 4.81-.9 1.48-.63 2.72-1.55 3.74-2.74l.75-.88 3.63 4.18-.55.65c-1.45 1.74-3.26 3.07-5.41 3.98-2.14.91-4.49 1.36-7.04 1.36-3.27 0-6.21-.69-8.8-2.09-2.58-1.43-4.61-3.41-6.05-5.92-1.44-2.52-2.16-5.36-2.16-8.48 0-3.12.67-5.94 2.03-8.46 1.4-2.51 3.32-4.47 5.76-5.87 2.44-1.41 5.2-2.1 8.25-2.1zm0 5.52c-1.96 0-3.69.46-5.22 1.37-1.49.87-2.67 2.09-3.55 3.71-.84 1.57-1.27 3.41-1.27 5.55v.07l19.31-3.75c-.52-1.89-1.51-3.45-2.97-4.7-1.69-1.49-3.76-2.25-6.27-2.25z" />
        <path d="M14.41 44.54c2.06 0 4.11.28 6.16.84 2.04.52 3.76 1.23 5.15 2.16l.76.51-2.76 5.07-.92-.63c-2.31-1.6-5.1-2.42-8.39-2.42-2.53 0-4.28.45-5.39 1.21-1.06.75-1.53 1.67-1.53 2.82 0 .92.28 1.57.78 2.05.65.58 1.45 1.03 2.44 1.34.8.22 1.84.46 3.13.7l1.38.25 1.21.25c2.45.47 4.44.94 5.96 1.42 1.63.51 3.03 1.4 4.19 2.64 1.26 1.35 1.83 3.16 1.83 5.31 0 3-1.29 5.42-3.78 7.18-2.43 1.7-5.72 2.49-9.77 2.49-2.56 0-5.03-.36-7.4-1.08l-.99-.4c-2.31-.76-4.19-1.72-5.59-2.91L0 72.93l2.84-4.97.91.72c1.16.92 2.66 1.7 4.5 2.33 1.82.58 3.71.87 5.69.87 2.71 0 4.52-.42 5.59-1.11 1.07-.71 1.56-1.63 1.56-2.86 0-.88-.27-1.44-.74-1.84l-.01-.01-.01-.01c-.6-.54-1.38-.95-2.37-1.23l-.02-.01-.01-.01c-1.06-.33-2.49-.65-4.32-.95l-.02-.01c-2.49-.47-4.51-.94-6.07-1.42l-.01-.01-.01-.01c-1.66-.55-3.1-1.47-4.29-2.75l-.01-.01-.01-.01c-1.25-1.39-1.82-3.26-1.82-5.47 0-2.87 1.22-5.24 3.57-7.04 2.36-1.8 5.55-2.63 9.46-2.63z" />
        <path d="M85.06 44.54c2.61 0 4.99.55 7.12 1.68 1.29.65 2.44 1.48 3.45 2.5v-3.95h6.1v32.41h-5.93v-4.05c-.99 1.05-2.14 1.92-3.44 2.6-2.16 1.17-4.6 1.74-7.29 1.74-3.01 0-5.77-.69-8.24-2.1-2.48-1.4-4.42-3.36-5.82-5.87-1.4-2.52-2.09-5.37-2.09-8.51 0-3.16.69-6.01 2.09-8.52 1.4-2.51 3.34-4.46 5.82-5.82 2.47-1.4 5.23-2.1 8.24-2.1zm.34 5.59c-2 0-3.77.46-5.34 1.37l-.01.01c-1.53.86-2.75 2.11-3.67 3.78-.87 1.64-1.32 3.53-1.32 5.7s.45 4.06 1.32 5.7l.18.31c.9 1.51 2.06 2.68 3.49 3.53 1.57.87 3.34 1.32 5.34 1.32s3.74-.45 5.27-1.32c1.56-.91 2.78-2.18 3.66-3.83l.01-.01c.9-1.65 1.37-3.54 1.37-5.7s-.47-4.06-1.37-5.7l-.01-.01c-.88-1.65-2.09-2.9-3.66-3.77l-.01-.01-.01-.01c-1.53-.9-3.26-1.36-5.27-1.36z" />
        <path d="M122.83 44.54c2.75 0 5.23.55 7.43 1.66l.42.21c2.06 1.08 3.7 2.62 4.92 4.62l.49.81-4.69 3.18-.56-.84c-.91-1.36-2.04-2.36-3.41-3.01l-.01-.01-.01-.01c-1.4-.7-2.92-1.05-4.58-1.05-2.04 0-3.85.46-5.46 1.37l-.01.01c-1.56.87-2.79 2.12-3.7 3.78-.87 1.65-1.32 3.54-1.32 5.7 0 2.21.45 4.12 1.32 5.77.92 1.61 2.16 2.86 3.72 3.77 1.61.87 3.42 1.32 5.46 1.32 1.67 0 3.2-.34 4.6-1 1.37-.65 2.51-1.65 3.41-3.01l.56-.84 4.69 3.18-.49.81c-1.3 2.13-3.08 3.76-5.32 4.88l-.01.01-.01.01c-2.23 1.07-4.71 1.6-7.43 1.6-3.16 0-6.02-.69-8.58-2.09l-.01-.01c-2.51-1.4-4.49-3.36-5.93-5.87l-.01-.01c-1.44-2.55-2.16-5.4-2.16-8.53 0-3.12.71-5.96 2.16-8.47 1.44-2.51 3.42-4.47 5.93-5.87l.01-.01c2.55-1.4 5.42-2.09 8.58-2.09z" />
        <path d="M48.31 0c3.01 0 5.77.69 8.24 2.1 2.48 1.36 4.42 3.31 5.82 5.82 1.4 2.52 2.09 5.37 2.09 8.52s-.69 6-2.09 8.52c-1.4 2.51-3.34 4.47-5.82 5.88-2.44 1.36-5.19 2.04-8.24 2.04-2.6 0-5-.53-7.15-1.61-1.27-.66-2.4-1.51-3.39-2.52v15.09H31.65v-18.23l5.77-10.52.38 3.07c.18 1.45.59 2.77 1.22 3.96 1.92 3.31 4.65 5.32 8.24 6.04 1.96.4 3.74.4 5.7 0 3.59-.72 6.32-2.73 8.24-6.04 1.4-2.45 1.69-4.55 1.69-7.69s-.45-5.04-1.69-7.45c-1.92-3.32-4.65-5.32-8.24-6.04-1.96-.4-3.74-.4-5.7 0-1.34.27-2.58.48-3.71.89l-2.49.89 3.54-6.45.25-.45.5-.06c.72-.09 1.46-.14 2.21-.14z" />
        <path d="M106.73 0c3.09 0 5.9.69 8.41 2.09 2.51 1.4 4.47 3.36 5.87 5.87l.26.48c1.27 2.4 1.9 5.07 1.9 8 0 3.13-.71 5.96-2.16 8.48-1.4 2.5-3.36 4.48-5.86 5.92l-.01.01c-2.51 1.4-5.32 2.09-8.41 2.09s-5.9-.69-8.41-2.09l-.01-.01c-2.51-1.44-4.49-3.42-5.93-5.92-1.44-2.52-2.16-5.35-2.16-8.48s.71-5.96 2.16-8.48c1.44-2.51 3.42-4.47 5.93-5.87C100.83.69 103.64 0 106.73 0zm0 5.59c-2 0-3.77.46-5.34 1.37l-.01.01c-1.53.86-2.75 2.12-3.67 3.78-.87 1.64-1.32 3.54-1.32 5.7s.45 4.06 1.32 5.7l.18.31c.9 1.51 2.06 2.68 3.49 3.53 1.57.87 3.34 1.32 5.34 1.32s3.76-.45 5.29-1.32c1.56-.91 2.78-2.17 3.66-3.83.88-1.65 1.33-3.55 1.33-5.71s-.45-4.05-1.33-5.7c-.88-1.65-2.09-2.9-3.65-3.77l-.01-.01-.01-.01c-1.53-.9-3.28-1.36-5.28-1.36z" />
        <path d="M88.15 6.05l-1.06-.06-.94-.06c-2.97 0-5.18.91-6.76 2.62-1.59 1.73-2.45 4.21-2.45 7.59v16.49h-6.11v-18.55l4.06-7.39c1.05-2.2 2.6-3.88 4.67-5.02l.01-.01C81.66.54 84.21 0 87.15 0h1V6.05z" />
      </symbol>
    </defs>
  </svg>;


const Header = ({ page, setPage, cartCount = 2 }) => {
  const locale = useLocale();
  const switchLocale = (next) => {
    if (window.__i18n) window.__i18n.set(next);
  };
  return (
  <header className="vp-header">
    <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
      <a href="#" onClick={(e) => {e.preventDefault();setPage('home');}} aria-label="PROSPACE" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <img src="assets/prospace-must.svg" alt="PROSPACE" style={{ height: 28, width: 'auto', display: 'block' }} className="vp-logo-img-dark" />
        <img src="assets/prospace-valge.svg" alt="PROSPACE" style={{ height: 28, width: 'auto', display: 'none' }} className="vp-logo-img-light" />
      </a>
      <nav className="vp-nav">
        {[['catalog', t('nav.shop')], ['about', t('nav.about')], ['inspiration', t('nav.inspiration')], ['blog', t('nav.blog')], ['contact', t('nav.salon')]].map(([id, label], i) =>
      <a key={i} href="#" onClick={(e) => {e.preventDefault();setPage(id);}}>{label}</a>
      )}
      </nav>
    </div>
    <div className="vp-nav-right">
      <span style={{ cursor: 'pointer' }} onClick={() => setPage('search')} aria-label={t('nav.search')}>⌕</span>
      <span role="group" aria-label={t('locale.switch.aria')} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.06em' }}>
        <button type="button" onClick={() => switchLocale('et')} aria-pressed={locale === 'et'} style={{ background: 'transparent', border: 'none', padding: '2px 4px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', color: 'inherit', opacity: locale === 'et' ? 1 : 0.45, fontWeight: locale === 'et' ? 600 : 400 }}>ET</button>
        <span style={{ opacity: 0.35 }}>|</span>
        <button type="button" onClick={() => switchLocale('ru')} aria-pressed={locale === 'ru'} style={{ background: 'transparent', border: 'none', padding: '2px 4px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', color: 'inherit', opacity: locale === 'ru' ? 1 : 0.45, fontWeight: locale === 'ru' ? 600 : 400 }}>RU</button>
      </span>
      <span style={{ cursor: 'pointer' }} onClick={() => setPage('login')}>{t('nav.account')}</span>
      <a href="#" onClick={(e) => {e.preventDefault();setPage('cart');}} className="cart-pill">
        <span>{t('nav.cart')}</span><span className="vp-mono" style={{ fontSize: 11 }}>{cartCount}</span>
      </a>
    </div>
  </header>);

};


const Marquee = () =>
<div className="vp-marquee">
    <span className="vp-marquee-track">
      {Array.from({ length: 2 }).map((_, i) =>
    <React.Fragment key={i}>
          {[tr('ALUMIINIUM VARJUPROFIILID OTSE LAOST','АЛЮМИНИЕВЫЕ ТЕНЕВЫЕ ПРОФИЛИ ПРЯМО СО СКЛАДА'), tr('TASUTA TARNE 200 €+','БЕСПЛАТНАЯ ДОСТАВКА ОТ 200 €'), tr('14 PÄEVA TAGASTUS (V.A. RAL)','ВОЗВРАТ 14 ДНЕЙ (КРОМЕ RAL)'), tr('RAL VÄRVITUD ALUMIINIUM','ОКРАШЕННЫЙ АЛЮМИНИЙ RAL'), tr('TEHNILINE TUGI ARHITEKTIDELE','ТЕХПОДДЕРЖКА ДЛЯ АРХИТЕКТОРОВ')].map((t, j) =>
      <React.Fragment key={j}>
              {t}<span className="vp-marquee-sep">◆</span>
            </React.Fragment>
      )}
        </React.Fragment>
    )}
    </span>
  </div>;


const Footer = ({ setPage }) => {
  useLocale(); // re-render on locale change
  const go = (id, params) => (e) => {e.preventDefault();if (setPage) setPage(id, params);};
  const S = window.__site || {};
  return (
    <footer className="vp-footer">
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 32, marginBottom: 48 }}>
      <div>
        <img src="assets/prospace-valge.svg" alt="PROSPACE" style={{ height: 34, width: 'auto', display: 'block', marginBottom: 18 }} />
        <p style={{ maxWidth: 280, fontSize: 14, lineHeight: 1.6, opacity: 0.7 }}>
          {tr('Alumiinium varjuprofiilide pood Eestis. Tehniline täpsus + arhitektuurne disain.', 'Магазин алюминиевых теневых профилей в Эстонии. Техническая точность + архитектурный дизайн.')}
        </p>
        <div style={{ marginTop: 16, fontSize: 13, lineHeight: 1.6, opacity: 0.75 }}>
          <a href={S.phoneUrl} style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>{S.phone}</a>
          <a href={S.emailUrl} style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>{S.email}</a>
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
          {[
            { l: 'IG', href: S.instagram },
            { l: 'FB', href: S.facebook }].
            map((s) =>
            <a key={s.l} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.l === 'IG' ? 'Instagram' : 'Facebook'} style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'inherit', textDecoration: 'none', transition: 'background .15s, border-color .15s' }} onMouseEnter={(e) => {e.currentTarget.style.background = 'rgba(255,255,255,0.1)';e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';}} onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';}}>{s.l}</a>
            )}
        </div>
      </div>
      {[
        { h: tr('Pood','Магазин'), items: [[tr('Kõik tooted','Все товары'), 'catalog'], [tr('Laeprofiilid','Потолочные профили'), 'category', { category: 'Laeprofiilid' }], [tr('Põrandaprofiilid','Напольные профили'), 'category', { category: 'Põrandaprofiilid' }], [tr('Põrandaliistud','Плинтусы'), 'category', { category: 'Põrandaliistud' }], [tr('Seina peiteprofiilid','Настенные скрытые профили'), 'category', { category: 'Seina peiteprofiilid' }], [tr('Lisatarvikud','Аксессуары'), 'category', { category: 'Lisatarvikud' }]] },
        { h: tr('Info','Информация'), items: [[tr('Mis on varjuprofiil?','Что такое теневой профиль?'), 'post', { id: 'b2' }], [tr('Toodetest','О продукции'), 'about'], [tr('Inspiratsioon','Вдохновение'), 'inspiration'], [tr('Uudised','Журнал'), 'blog'], [tr('Otsing','Поиск'), 'search']] },
        { h: tr('Tugi','Поддержка'), items: [[tr('Kontakt','Контакты'), 'contact'], [tr('Salong','Салон'), 'contact'], [tr('Tarne','Доставка'), 'shipping'], [tr('Garantii','Гарантия'), 'warranty'], [tr('KKK','Вопросы'), 'faq'], [tr('Tingimused','Условия'), 'legal']] },
        { h: tr('B2B / Konto','B2B / Кабинет'), items: [[tr('Partneriprogramm','Партнёрская программа'), 'b2b'], [tr('Logi sisse','Войти'), 'login'], [tr('Minu konto','Личный кабинет'), 'account'], [tr('Korv','Корзина'), 'cart']] }].
        map((g) =>
        <div key={g.h}>
          <div className="vp-eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>{g.h}</div>
          {g.items.map(([label, id, params]) =>
          <a key={label} href="#" onClick={go(id, params)} style={{ display: 'block', fontSize: 13, marginBottom: 8, opacity: 0.85, cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>{label}</a>
          )}
        </div>
        )}
    </div>
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>
      <span>© 2026 {S.legal} — {S.addressFull}</span>
      <span style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <a href="https://prospace.ee" target="_blank" rel="noopener" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px dotted rgba(255,255,255,0.4)' }}>prospace.ee</a>
        <a href="https://peitlenguksed.ee" target="_blank" rel="noopener" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px dotted rgba(255,255,255,0.4)' }}>peitlenguksed.ee</a>
        <span>varjuprofiilid.ee</span>
      </span>
    </div>
  </footer>);

};

window.LogoMust = LogoMust;
window.LogoSprite = LogoSprite;
window.Header = Header;
window.Marquee = Marquee;
window.Footer = Footer;