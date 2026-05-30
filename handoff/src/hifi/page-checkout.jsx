/* Checkout (vormistamine) + Order confirmation */

function CheckoutPage({setPage}) {  useLocale(); // CheckoutPage locale
  const [type, setType] = React.useState('eraisik'); // eraisik | ettevote
  const [delivery, setDelivery] = React.useState('venipak'); // venipak | salong
  const items = [
    {sku:'LHV10', name:'Lae LED peitesiin', color:'Must', length:'2500 mm', qty:10, price:13.50},
    {sku:'AST20', name:'LED nurkprofiil', color:'Hõbe', length:'2500 mm', qty:6, price:13.50},
    {sku:'ASP611', name:'Põrandaliist', color:'Valge', length:'2500 mm', qty:14, price:15.03},
  ];
  const subtotal = items.reduce((s,i)=>s + i.price*i.qty, 0);
  const overThreshold = subtotal >= 200;
  const shipping = delivery==='salong' ? 0 : (overThreshold ? 0 : 25);
  const vat = ((subtotal + shipping) * 0.24 / 1.24);
  const total = subtotal + shipping;

  const fieldStyle = {display:'grid', gap:6};
  const labelStyle = {fontSize:11, fontFamily:'JetBrains Mono', textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--muted)'};

  return (
    <div className="vp-page">
      <Marquee/>
      {/* Steps strip */}
      <section style={{padding:'48px 56px 24px', borderBottom:'1.5px solid var(--ink)'}}>
        <div style={{display:'flex', gap:18, alignItems:'center', flexWrap:'wrap', marginBottom:18, fontFamily:'JetBrains Mono', fontSize:12, textTransform:'uppercase', letterSpacing:'0.06em'}}>
          <a onClick={()=>setPage('cart')} style={{cursor:'pointer', color:'var(--muted)'}}>{tr('1. Korv ✓','1. Корзина ✓')}</a>
          <span style={{color:'var(--muted)'}}>→</span>
          <span style={{borderBottom:'1.5px solid var(--ink)', paddingBottom:2}}>{tr('2. Andmed','2. Данные')}</span>
          <span style={{color:'var(--muted)'}}>→</span>
          <span style={{color:'var(--muted)'}}>{tr('3. Saadetud','3. Отправлено')}</span>
        </div>
        <h1 className="vp-display" style={{fontSize:'clamp(56px, 8vw, 120px)', margin:0}}>{tr('Tellimuse andmed','Данные заказа')}</h1>
        <p style={{fontSize:15, lineHeight:1.55, color:'var(--ink-2)', maxWidth:640, marginTop:18}}>
          {tr('Täida andmed ja saada tellimus. Vastame','Заполните данные и отправьте заказ. Ответим')} <strong>{tr('24 tunni jooksul','в течение 24 ч')}</strong> {tr('arve, makseinfo ning kinnitusega — meiliaadressile','счётом, реквизитами и подтверждением — на адрес')} <span className="vp-mono">{window.__site.email}</span>.
        </p>
      </section>

      <section style={{display:'grid', gridTemplateColumns:'1.7fr 1fr', borderBottom:'1.5px solid var(--ink)'}}>
        <div style={{borderRight:'1.5px solid var(--ink)'}}>
          {/* 1. Kontakt */}
          <div style={{padding:'40px 48px', borderBottom:'1.5px solid var(--ink)'}}>
            <div className="vp-eyebrow" style={{marginBottom:8}}>{tr('01 · Kellele saadame','01 · Кому отправляем')}</div>
            <div style={{display:'flex', gap:0, marginBottom:24, border:'1.5px solid var(--ink)'}}>
              {[['eraisik',tr('Eraisik','Частное лицо')],['ettevote',tr('Ettevõte','Компания')]].map(([k,l],i)=>(
                <button key={k} onClick={()=>setType(k)} style={{flex:1, padding:'14px 18px', border:'none', borderRight:i===0?'1.5px solid var(--ink)':'none', background: type===k?'var(--ink)':'transparent', color: type===k?'var(--paper)':'var(--ink)', fontFamily:'Inter', fontWeight:600, fontSize:13, textTransform:'uppercase', letterSpacing:'0.04em', cursor:'pointer'}}>{l}</button>
              ))}
            </div>

            {type==='ettevote' && (
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14}}>
                <div style={fieldStyle}><span style={labelStyle}>{tr('Ettevõtte nimi *','Название компании *')}</span><input className="vp-input" placeholder={tr('OÜ Näide','OÜ Пример')}/></div>
                <div style={fieldStyle}><span style={labelStyle}>{tr('Reg.nr *','Рег.№ *')}</span><input className="vp-input" placeholder="12345678"/></div>
                <div style={fieldStyle}><span style={labelStyle}>{tr('KMKR nr','ИНН')}</span><input className="vp-input" placeholder="EE123456789"/></div>
                <div style={fieldStyle}><span style={labelStyle}>{tr('Kontaktisik *','Контактное лицо *')}</span><input className="vp-input" placeholder={tr('Mari Maasikas','Иван Иванов')}/></div>
              </div>
            )}
            {type==='eraisik' && (
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14}}>
                <div style={fieldStyle}><span style={labelStyle}>{tr('Eesnimi *','Имя *')}</span><input className="vp-input" placeholder={tr('Mari','Иван')}/></div>
                <div style={fieldStyle}><span style={labelStyle}>{tr('Perekonnanimi *','Фамилия *')}</span><input className="vp-input" placeholder={tr('Maasikas','Иванов')}/></div>
              </div>
            )}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
              <div style={fieldStyle}><span style={labelStyle}>{tr('E-post *','E-mail *')}</span><input className="vp-input" type="email" placeholder={tr('mari@näide.ee','ivan@primer.ee')}/></div>
              <div style={fieldStyle}><span style={labelStyle}>{tr('Telefon *','Телефон *')}</span><input className="vp-input" placeholder={tr('+372 5xxx xxxx','+372 5xxx xxxx')}/></div>
            </div>
          </div>

          {/* 2. Tarne */}
          <div style={{padding:'40px 48px', borderBottom:'1.5px solid var(--ink)'}}>
            <div className="vp-eyebrow" style={{marginBottom:14}}>{tr('02 · Tarneviis','02 · Способ доставки')}</div>
            <div style={{display:'grid', gap:10}}>
              {[
                {k:'venipak', t:tr('Venipak — üle Eesti','Venipak — по Эстонии'), d:tr('Tarne 2–4 tööpäeva (laokaup). RAL eritoonid 4–5 nädalat.','Доставка 2–4 рабочих дня (со склада). RAL под заказ — 4–5 недель.'), p: overThreshold ? tr('Tasuta','Бесплатно') : tr('25,00 € + KM','25,00 € + НДС')},
                {k:'salong', t:tr('Tulen ise salongist','Заберу сам из салона'), d:tr('Vana-Kalamaja 8–110, Tallinn · E–R 10–17. Teavitame kui kaup on valmis.','Vana-Kalamaja 8–110, Tallinn · Пн–Пт 10–17. Сообщим, когда товар готов.'), p:tr('Tasuta','Бесплатно')},
              ].map(o=>(
                <label key={o.k} style={{display:'grid', gridTemplateColumns:'24px 1fr auto', gap:14, padding:'18px 20px', border:'1.5px solid var(--ink)', cursor:'pointer', background: delivery===o.k?'var(--paper-2)':'transparent', alignItems:'center'}}>
                  <span style={{width:18, height:18, borderRadius:'50%', border:'1.5px solid var(--ink)', display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
                    {delivery===o.k && <span style={{width:8, height:8, borderRadius:'50%', background:'var(--ink)'}}/>}
                  </span>
                  <span>
                    <input type="radio" name="d" checked={delivery===o.k} onChange={()=>setDelivery(o.k)} style={{position:'absolute', opacity:0, pointerEvents:'none'}}/>
                    <div style={{fontWeight:600, fontSize:15, marginBottom:2}}>{o.t}</div>
                    <div style={{fontSize:12, color:'var(--ink-2)'}}>{o.d}</div>
                  </span>
                  <span className="vp-mono" style={{fontSize:13, fontWeight:600}}>{o.p}</span>
                </label>
              ))}
            </div>
            {delivery==='venipak' && (
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:18}}>
                <div style={{...fieldStyle, gridColumn:'1 / -1'}}><span style={labelStyle}>{tr('Tarne aadress *','Адрес доставки *')}</span><input className="vp-input" placeholder={tr('Tänav 12–34','Улица 12–34')}/></div>
                <div style={fieldStyle}><span style={labelStyle}>{tr('Linn / asula *','Город / посёлок *')}</span><input className="vp-input" placeholder={tr('Tallinn','Tallinn')}/></div>
                <div style={fieldStyle}><span style={labelStyle}>{tr('Postiindeks *','Индекс *')}</span><input className="vp-input" placeholder={tr('10412','10412')}/></div>
              </div>
            )}
          </div>

          {/* 3. Märkused */}
          <div style={{padding:'40px 48px'}}>
            <div className="vp-eyebrow" style={{marginBottom:14}}>{tr('03 · Märkused (vabatahtlik)','03 · Комментарий (необязательно)')}</div>
            <textarea className="vp-input" rows={4} placeholder={tr('Soovid, mõõdud, eelistatud tarne aeg vms...','Пожелания, размеры, удобное время доставки и т.п...')}/>
            <label style={{display:'flex', alignItems:'flex-start', gap:10, marginTop:18, fontSize:13, color:'var(--ink-2)', cursor:'pointer'}}>
              <input type="checkbox" defaultChecked style={{marginTop:3}}/>
              <span>{tr('Olen tutvunud','Ознакомлен с')} <span style={{borderBottom:'1px solid var(--ink)'}}>{tr('müügitingimuste','условиями продажи')}</span> {tr('ja','и')} <span style={{borderBottom:'1px solid var(--ink)'}}>{tr('privaatsuspoliitikaga','политикой конфиденциальности')}</span>.</span>
            </label>
            <label style={{display:'flex', alignItems:'flex-start', gap:10, marginTop:10, fontSize:13, color:'var(--ink-2)', cursor:'pointer'}}>
              <input type="checkbox" style={{marginTop:3}}/>
              <span>{tr('Soovin saada uudiseid ja inspiratsiooni (max 1×/kuus).','Хочу получать новости и вдохновение (макс. 1×/месяц).')}</span>
            </label>
          </div>
        </div>

        {/* Order summary */}
        <aside style={{padding:'40px 40px', background:'var(--paper-2)', position:'sticky', top:60, alignSelf:'start'}}>
          <h2 className="vp-display" style={{fontSize:42, margin:'0 0 22px'}}>{tr('Tellimus','Заказ')}</h2>
          <div style={{display:'flex', flexDirection:'column', gap:14, marginBottom:18}}>
            {items.map(it=>(
              <div key={it.sku} style={{display:'grid', gridTemplateColumns:'48px 1fr auto', gap:12, alignItems:'center'}}>
                <div className="vp-photo" style={{aspectRatio:'1', border:'1.5px solid var(--ink)'}}><span className="label" style={{fontSize:8, padding:'2px 5px'}}>{it.sku.toLowerCase()}</span></div>
                <div>
                  <div style={{fontSize:13, fontWeight:600, lineHeight:1.2}}>{it.name}</div>
                  <div style={{fontSize:11, color:'var(--ink-2)'}}>{it.color} · {it.length} · {it.qty} {tr('tk','шт')}</div>
                </div>
                <div className="vp-mono" style={{fontSize:13, fontWeight:600}}>{(it.qty*it.price).toFixed(2).replace('.',',')}&nbsp;€</div>
              </div>
            ))}
          </div>
          <hr className="vp-divider-thin"/>
          <div style={{display:'flex', flexDirection:'column', gap:8, fontSize:13, margin:'14px 0'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><span>{tr('Vahesumma','Промежуточный итог')}</span><span>{subtotal.toFixed(2).replace('.',',')} €</span></div>
            <div style={{display:'flex', justifyContent:'space-between'}}><span>{tr('Tarne','Доставка')} · {delivery==='salong'?tr('Salong','Салон'):'Venipak'}</span><span>{shipping===0?tr('Tasuta','Бесплатно'):shipping.toFixed(2).replace('.',',')+' €'}</span></div>
            <div style={{display:'flex', justifyContent:'space-between', color:'var(--muted)', fontSize:11}}><span>{tr('sh. käibemaks 24%','в т.ч. НДС 24%')}</span><span>{vat.toFixed(2).replace('.',',')} €</span></div>
          </div>
          <hr className="vp-divider" style={{margin:'16px 0'}}/>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:22}}>
            <span className="vp-eyebrow">{tr('Kokku','Итого')}</span>
            <span className="vp-display" style={{fontSize:48}}>{total.toFixed(2).replace('.',',')}&nbsp;€</span>
          </div>
          <button className="vp-btn vp-btn--lg vp-btn--block" onClick={()=>setPage('order-confirmed')}>{tr('Saada tellimus →','Отправить заказ →')}</button>

          <div style={{marginTop:18, padding:'14px 16px', border:'1.5px solid var(--ink)', background:'var(--paper)'}}>
            <div className="vp-eyebrow" style={{marginBottom:8}}>{tr('Kuidas tasumine käib','Как происходит оплата')}</div>
            <ol style={{margin:0, paddingLeft:18, fontSize:12, lineHeight:1.6, color:'var(--ink-2)'}}>
              <li>{tr('Saadad tellimuse — see jõuab meie meili.','Отправляете заказ — он приходит к нам на почту.')}</li>
              <li>{tr('Vastame','Отвечаем')} <strong>{tr('24 h jooksul','в течение 24 ч')}</strong> {tr('arve + makseinfoga.','счётом и реквизитами.')}</li>
              <li>{tr('Saame ülekande → paneme kauba teele.','Получаем перевод → отправляем товар.')}</li>
            </ol>
          </div>
          <div style={{display:'flex', gap:10, fontSize:11, fontFamily:'JetBrains Mono', textTransform:'uppercase', color:'var(--muted)', marginTop:14, justifyContent:'center'}}>
            <span>{tr('✓ Krüpteeritud','✓ Шифрование')}</span><span>{tr('✓ GDPR','✓ GDPR')}</span><span>{tr('✓ Eesti','✓ Эстония')}</span>
          </div>
        </aside>
      </section>
    </div>
  );
}

function OrderConfirmedPage({setPage}) {  useLocale(); // OrderConfirmedPage locale
  const orderNr = 'VP-2026-' + String(Math.floor(Math.random()*9000)+1000);
  return (
    <div className="vp-page">
      <Marquee/>
      <section style={{padding:'48px 56px 24px', borderBottom:'1.5px solid var(--ink)'}}>
        <div style={{display:'flex', gap:18, alignItems:'center', flexWrap:'wrap', marginBottom:18, fontFamily:'JetBrains Mono', fontSize:12, textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--muted)'}}>
          <span>{tr('1. Korv ✓','1. Корзина ✓')}</span><span>→</span><span>{tr('2. Andmed ✓','2. Данные ✓')}</span><span>→</span><span style={{color:'var(--ink)', borderBottom:'1.5px solid var(--ink)', paddingBottom:2}}>{tr('3. Saadetud','3. Отправлено')}</span>
        </div>
      </section>
      <section style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', borderBottom:'1.5px solid var(--ink)', minHeight:560}}>
        <div style={{padding:'72px 56px', borderRight:'1.5px solid var(--ink)', display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <div className="vp-eyebrow" style={{marginBottom:10}}>{tr('Tellimus saadetud','Заказ отправлен')}</div>
          <h1 className="vp-display" style={{fontSize:'clamp(72px, 11vw, 168px)', margin:'0 0 24px', lineHeight:0.9}}>{tr('Aitäh!','Спасибо!')}<br/><span style={{fontFamily:"'Inter', serif", fontStyle:'italic', fontWeight:300, fontSize:'0.4em', letterSpacing:'-0.02em'}}>{tr('vastame 24 h jooksul.','ответим в течение 24 ч.')}</span></h1>
          <div style={{display:'inline-flex', gap:18, alignItems:'center', padding:'14px 20px', border:'1.5px solid var(--ink)', alignSelf:'flex-start', background:'var(--paper-2)'}}>
            <span className="vp-eyebrow">{tr('Tellimuse nr','№ заказа')}</span>
            <span className="vp-mono" style={{fontSize:20, fontWeight:600}}>{orderNr}</span>
          </div>
          <p style={{fontSize:16, lineHeight:1.6, color:'var(--ink-2)', maxWidth:560, marginTop:32}}>
            {tr('Saatsime kinnituse e-posti aadressile.','Отправили подтверждение на ваш e-mail.')} <strong>{tr('24 tunni jooksul','В течение 24 ч')}</strong> {tr('(E–R 10–17) saad meilile arve ja makseinfo. Kui kaup on laos, jõuab Venipakiga 2–4 tööpäevaga.','(Пн–Пт 10–17) получите по почте счёт и реквизиты. Если товар на складе, доставка Venipak 2–4 рабочих дня.')}
          </p>
          <div style={{display:'flex', gap:14, marginTop:32, flexWrap:'wrap'}}>
            <button className="vp-btn vp-btn--lg" onClick={()=>setPage('home')}>{tr('← Avalehele','← На главную')}</button>
            <button className="vp-btn vp-btn--ghost vp-btn--lg" onClick={()=>setPage('catalog')}>{tr('Jätka ostlemist','Продолжить покупки')}</button>
          </div>
        </div>
        <div style={{padding:'48px 48px', background:'var(--paper-2)', display:'flex', flexDirection:'column', gap:24}}>
          <div className="vp-eyebrow">{tr('Mis edasi','Что дальше')}</div>
          {[
            {n:'01', t:tr('Saad meili 24 h jooksul','Получите письмо в течение 24 ч'), d:tr('Arve, makseinfo (SEPA ülekanne) ja täpne tarne aeg.','Счёт, реквизиты (SEPA-перевод) и точный срок доставки.')},
            {n:'02', t:tr('Tasud arve','Оплачиваете счёт'), d:tr('Ülekanne PROSPACE OÜ kontole. Pärast laekumist paneme kauba teele.','Перевод на счёт PROSPACE OÜ. После поступления отправляем товар.')},
            {n:'03', t:tr('Saad jälgimisnumbri','Получаете трек-номер'), d:tr('Saadame sulle jälgimisnumbri. Venipak helistab enne kauba kätte toimetamist.','Отправляем трек-номер. Venipak звонит перед доставкой.')},
            {n:'04', t:tr('Kohal','На месте'), d:tr('Kuller toimetab kauba sinuni või saad kätte salongist, kui oled nii valinud.','Курьер доставляет товар или забираете в салоне, если выбрали.')},
          ].map(s=>(
            <div key={s.n} style={{display:'grid', gridTemplateColumns:'48px 1fr', gap:14}}>
              <div className="vp-display" style={{fontSize:40, color:'var(--muted)'}}>{s.n}</div>
              <div>
                <div style={{fontWeight:600, fontSize:16, marginBottom:4}}>{s.t}</div>
                <div style={{fontSize:13, lineHeight:1.5, color:'var(--ink-2)'}}>{s.d}</div>
              </div>
            </div>
          ))}
          <div style={{marginTop:'auto', paddingTop:18, borderTop:'1px solid rgba(0,0,0,0.15)', fontSize:13, lineHeight:1.6}}>
            <strong>{tr('Küsimusi?','Вопросы?')}</strong> {tr('Kirjuta','Напишите')} <a href={window.__site.emailUrl} className="vp-mono" style={{color:'inherit'}}>{window.__site.email}</a> {tr('või helista','или позвоните')} <a href={window.__site.phoneUrl} className="vp-mono" style={{color:'inherit'}}>{window.__site.phone}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

window.CheckoutPage = CheckoutPage;
window.OrderConfirmedPage = OrderConfirmedPage;
