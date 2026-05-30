/* Blog list + single article */

const POSTS = [
  {id:'b0', t:tr('Põrandaliist, mida sa ei märka: täisjuhend varjuprofiilide valikule (2026)','Плинтус, который не замечают: полный гид по выбору теневых профилей (2026)'), cat:tr('Juhend','Гид'), y:tr('2026 · mai','2026 · май'), read:'10 min', cover:'blog · varjuprofiil · hero', feat:true, slug:'varjuprofiil-pohjalik-juhend', excerpt:'Mis on varjuprofiil, kuidas see asendab põrandaliistu ja millised tüübid sobivad Eesti korterisse? Tüübid, hinnad, paigaldus ja kolm levinud viga.'},
  {id:'b1', t:tr('Varjuprofiilide erinevad tüübid: juhend kaasaegseks siseviimistluseks','Разные типы теневых профилей: гид по современной отделке'), cat:tr('Tüübivalik','Типы'), y:tr('2026 · apr','2026 · апр'), read:'7 min', cover:'blog · 3 tüüpi', slug:'varjuprofiilide-tuubid', excerpt:'Standardne, LED-iga ja MDF-täitega varjuprofiil — kolm peamist lahendust, paigaldusnõuanded ja kasutusalad.'},
  {id:'b2', t:tr('Mis on varjuprofiil ja kuidas seda interjööris kasutada?','Что такое теневой профиль и как использовать в интерьере?'), cat:tr('Disain','Дизайн'), y:tr('2026 · märts','2026 · март'), read:'7 min', cover:'blog · 5 viisi', slug:'mis-on-varjuprofiil', excerpt:'Definitsioon, peamised eelised, lihtne paigaldus ja viis loovat võimalust varjuprofiili interjööris kasutada.'},
  {id:'b3', t:tr('Varjuprofiilid: kaasaegse disaini juhend','Теневые профили: гид по современному дизайну'), cat:tr('Juhend','Гид'), y:tr('2026 · veebr','2026 · фев'), read:'9 min', cover:'blog · vs · võrdlus', slug:'varjuprofiil-kaasaegne-disain', excerpt:'Võrdlus tavalise põrandaliistuga, peamised tüübid, paigaldussammud ja disainiideed. Täielik teejuht.'},
  {id:'b4', t:tr('Varjuprofiilide täisjuhend: kõik kasutusalad ja valikukriteeriumid','Полный гид по теневым профилям: применения и критерии выбора'), cat:tr('Arhitektuur','Архитектура'), y:tr('2026 · jaan','2026 · янв'), read:'9 min', cover:'blog · 4 kasutusala', slug:'varjuprofiilide-kasutusalad', excerpt:'Lagi, sokkel, ukseraam ja seinapaneel — neli kasutusala. Materjalid, paigaldussammud ja kuidas valida õige profiil.'},
  {id:'b5', t:tr('Põrandaliistude stiilid: ülevaade ja praktiline valikujuhend','Стили плинтусов: обзор и практический гид'), cat:tr('Stiilijuhend','Стили'), y:tr('2025 · dets','2025 · дек'), read:'8 min', cover:'blog · 5 stiili', slug:'porandaliistude-stiilid', excerpt:'Klassikaline, minimalistlik, beaded, bullnose, chamfered. Materjalid, viimistlused ja paigaldusnõuanded.'},
  {id:'b6', t:tr('Peitliistu eelised: 7 põhjust, miks see on moodsa kodu valik','Преимущества скрытого плинтуса: 7 причин выбрать его'), cat:tr('Eelised','Преимущества'), y:tr('2025 · nov','2025 · ноя'), read:'6 min', cover:'blog · 7 eelist', slug:'peitliistu-eelised', excerpt:'Sujuv ilme, ruumitundlikkus, kaitse, ajatu disain, peidetud detaile, lihtne hooldus ja arhitektuurne väärtus.'},
  {id:'b7', t:tr('Varjuvuugi tõus kaasaegses sisearhitektuuris','Подъём теневого шва в современной интерьерной архитектуре'), cat:tr('Trendid','Тренды'), y:tr('2025 · okt','2025 · окт'), read:'6 min', cover:'blog · tõus · trend', slug:'varjuvuugi-tous', excerpt:'Miks on varjuvuuk muutunud arhitektide eelistatud detailiks. Esteetika, funktsionaalsus, mitmekülgsus.'},
];

const POST_BODY = {
  b0: () => typeof PostBodyVarjuprofiil !== 'undefined' ? PostBodyVarjuprofiil : null,
  b1: () => typeof PostBodyTuubid !== 'undefined' ? PostBodyTuubid : null,
  b2: () => typeof PostBodyInterjooris !== 'undefined' ? PostBodyInterjooris : null,
  b3: () => typeof PostBodyVorrdlus !== 'undefined' ? PostBodyVorrdlus : null,
  b4: () => typeof PostBodyKoguRuumis !== 'undefined' ? PostBodyKoguRuumis : null,
  b5: () => typeof PostBodyStiilid !== 'undefined' ? PostBodyStiilid : null,
  b6: () => typeof PostBodyEelised !== 'undefined' ? PostBodyEelised : null,
  b7: () => typeof PostBodyStandard !== 'undefined' ? PostBodyStandard : null,
};

// Russian versions — used when window.__locale === 'ru'
const POST_BODY_RU = {
  b0: () => typeof PostBodyVarjuprofiilRu !== 'undefined' ? PostBodyVarjuprofiilRu : null,
  b1: () => typeof PostBodyTuubidRu !== 'undefined' ? PostBodyTuubidRu : null,
  b2: () => typeof PostBodyInterjoorisRu !== 'undefined' ? PostBodyInterjoorisRu : null,
  b3: () => typeof PostBodyVorrdlusRu !== 'undefined' ? PostBodyVorrdlusRu : null,
  b4: () => typeof PostBodyKoguRuumisRu !== 'undefined' ? PostBodyKoguRuumisRu : null,
  b5: () => typeof PostBodyStiilidRu !== 'undefined' ? PostBodyStiilidRu : null,
  b6: () => typeof PostBodyEelisedRu !== 'undefined' ? PostBodyEelisedRu : null,
  b7: () => typeof PostBodyStandardRu !== 'undefined' ? PostBodyStandardRu : null,
};

function BlogPage({setPage}) {
  useLocale(); // BlogPage locale
  const [activeCat, setActiveCat] = React.useState('Kõik');
  const cats = Array.from(new Set(POSTS.map(p=>p.cat)));
  const feat = POSTS.find(p=>p.feat);
  const filtered = activeCat==='Kõik' ? POSTS : POSTS.filter(p=>p.cat===activeCat);
  const rest = filtered.filter(p=>!p.feat || activeCat!=='Kõik');
  return (
    <div className="vp-page">
      <Marquee/>
      <section style={{padding:'56px 56px 32px', borderBottom:'1.5px solid var(--ink)'}}>
        <div className="vp-eyebrow" style={{marginBottom:10}}>{tr('Uudised','Журнал')} · {POSTS.length} {tr('artiklit','статей')}</div>
        <h1 className="vp-display" style={{fontSize:'clamp(72px, 11vw, 168px)', margin:0, lineHeight:0.9}}>{tr('Uudised.','Журнал.')}</h1>
        <p style={{fontSize:17, lineHeight:1.55, color:'var(--ink-2)', maxWidth:680, marginTop:18}}>
          {tr('Juhendid, võrdlused ja praktilised nõuanded. Iga artikkel — testitud meie salongis, kontrollitud paigaldajate poolt.','Гайды, сравнения и практические советы. Каждая статья проверена в нашем салоне и опробована монтажниками.')}
        </p>
      </section>
      <section style={{padding:'24px 56px', borderBottom:'1.5px solid var(--ink)', display:'flex', gap:10, flexWrap:'wrap'}}>
        <span onClick={()=>setActiveCat('Kõik')} className={'vp-chip'+(activeCat==='Kõik'?' vp-chip--active':'')} style={{cursor:'pointer'}}>{tr('Kõik','Все')}</span>
        {cats.map(c=>(
          <span key={c} onClick={()=>setActiveCat(c)} className={'vp-chip'+(activeCat===c?' vp-chip--active':'')} style={{cursor:'pointer'}}>{c}</span>
        ))}
        <input className="vp-input" placeholder={tr('Otsi artiklit...','Поиск статьи...')} style={{marginLeft:'auto', maxWidth:240}}/>
      </section>

      {/* Featured */}
      <section style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', borderBottom:'1.5px solid var(--ink)', minHeight:520}}>
        <a onClick={()=>setPage('post', {id:feat.id})} style={{cursor:'pointer', display:'block'}}>
          <div className="vp-photo" style={{height:'100%', minHeight:520}}><span className="label">{feat.cover}</span></div>
        </a>
        <div style={{padding:'56px 48px', borderLeft:'1.5px solid var(--ink)', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <div>
            <div className="vp-eyebrow" style={{marginBottom:14}}>★ Esiletõstetud · {feat.cat} · {feat.y}</div>
            <h2 className="vp-display" style={{fontSize:64, lineHeight:0.95, margin:'0 0 22px'}}>{feat.t}</h2>
            <p style={{fontSize:16, lineHeight:1.65, color:'var(--ink-2)', maxWidth:520}}>
              {feat.excerpt}
            </p>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:32}}>
            <span className="vp-mono" style={{fontSize:11, color:'var(--muted)'}}>{feat.read} lugemine</span>
            <button className="vp-btn" onClick={()=>setPage('post', {id:feat.id})}>Loe artiklit →</button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{padding:'48px 56px', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24, borderBottom:'1.5px solid var(--ink)'}}>
        {rest.map(p=>(
          <a key={p.id} onClick={()=>setPage('post', {id:p.id})} style={{cursor:'pointer', display:'flex', flexDirection:'column', gap:14}}>
            <div className="vp-photo" style={{aspectRatio:'4/3', border:'1.5px solid var(--ink)'}}><span className="label">{p.cover}</span></div>
            <div className="vp-eyebrow">{p.cat} · {p.y} · {p.read}</div>
            <div className="vp-display" style={{fontSize:30, lineHeight:1, margin:0}}>{p.t}</div>
            {p.excerpt && <div style={{fontSize:14, lineHeight:1.55, color:'var(--ink-2)'}}>{p.excerpt}</div>}
            <div style={{fontSize:12, color:'var(--ink-2)', borderBottom:'1.5px solid var(--ink)', alignSelf:'flex-start', paddingBottom:2, fontFamily:'JetBrains Mono', textTransform:'uppercase'}}>Loe →</div>
          </a>
        ))}
      </section>

      {/* Newsletter */}
      <section style={{padding:'72px 56px', background:'var(--ink)', color:'var(--paper)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center'}}>
        <div>
          <div style={{fontFamily:'JetBrains Mono', fontSize:11, textTransform:'uppercase', opacity:0.6, marginBottom:10}}>Newsletter</div>
          <h2 className="vp-display" style={{fontSize:64, margin:0, lineHeight:0.95}}>Üks meil kuus.<br/>Null spämmi.</h2>
        </div>
        <div>
          <p style={{fontSize:15, lineHeight:1.6, opacity:0.85, marginBottom:18, maxWidth:440}}>
            Uued projektid, hooaja värvilahendused, sooduspakkumised. Tasuta. Lahkud millal tahad.
          </p>
          <div style={{display:'flex', gap:8}}>
            <input className="vp-input" placeholder="su@meil.ee" style={{background:'transparent', border:'1.5px solid var(--paper)', color:'var(--paper)'}}/>
            <button className="vp-btn" style={{background:'var(--paper)', color:'var(--ink)', borderColor:'var(--paper)'}}>Liitu →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function PostPage({setPage, params={}}) {
  // Subscribe to locale changes so RU body is rendered after ET|RU toggle
  const [, setLocaleTick] = React.useState(window.__locale || 'et');
  React.useEffect(() => {
    const h = (e) => setLocaleTick(e.detail.locale);
    window.addEventListener('vp-locale-change', h);
    return () => window.removeEventListener('vp-locale-change', h);
  }, []);
  const post = POSTS.find(p=>p.id===params.id) || POSTS[0];
  return (
    <div className="vp-page">
      <Marquee/>
      <section style={{padding:'24px 56px', borderBottom:'1.5px solid var(--ink)', fontFamily:'JetBrains Mono', fontSize:12, textTransform:'uppercase', letterSpacing:'0.06em'}}>
        <a onClick={()=>setPage('blog')} style={{cursor:'pointer', color:'var(--muted)'}}>← Uudised</a>
        <span style={{margin:'0 12px', color:'var(--muted)'}}>/</span>
        <span>{post.cat}</span>
      </section>
      <section style={{padding:'72px 56px 40px', borderBottom:'1.5px solid var(--ink)', maxWidth:920, margin:'0 auto'}}>
        <div className="vp-eyebrow" style={{marginBottom:18}}>{post.cat} · {post.y} · {post.read} lugemine</div>
        <h1 className="vp-display" style={{fontSize:'clamp(56px, 8vw, 120px)', margin:0, lineHeight:0.95}}>{post.t}</h1>
        <div style={{display:'flex', gap:18, alignItems:'center', marginTop:32, paddingTop:24, borderTop:'1px solid rgba(0,0,0,0.15)'}}>
          <div style={{width:48, height:48, borderRadius:'50%', background:'var(--paper-2)', border:'1.5px solid var(--ink)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono', fontSize:13, fontWeight:600}}>MK</div>
          <div>
            <div style={{fontWeight:600, fontSize:14}}>Toimetus</div>
            <div style={{fontSize:12, color:'var(--ink-2)'}}>Varjuprofiilid.ee · PROSPACE</div>
          </div>
          <div style={{marginLeft:'auto', display:'flex', gap:10}}>
            <span className="vp-chip">Salvesta</span>
            <span className="vp-chip">Jaga →</span>
          </div>
        </div>
      </section>
      <div className="vp-photo" style={{aspectRatio:'21/9', borderBottom:'1.5px solid var(--ink)'}}><span className="label">{post.cover} · hero</span></div>
      {(() => {
        const isRu = (typeof window !== 'undefined' && window.__locale === 'ru');
        const lookup = (isRu ? POST_BODY_RU[post.id] : null) || POST_BODY[post.id];
        const Body = lookup ? lookup() : null;
        return Body ? <Body setPage={setPage}/> : <div style={{padding:'56px', textAlign:'center', color:'var(--muted)', fontFamily:'JetBrains Mono', fontSize:12, textTransform:'uppercase'}}>Artikli sisu tuleb peagi.</div>;
      })()}
      <section style={{padding:'56px', background:'var(--paper-2)', borderTop:'1.5px solid var(--ink)', borderBottom:'1.5px solid var(--ink)'}}>
        <div className="vp-eyebrow" style={{marginBottom:14}}>Loe ka</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16}}>
          {POSTS.filter(p=>p.id!==post.id).slice(0,3).map(p=>(
            <a key={p.id} onClick={()=>setPage('post',{id:p.id})} style={{cursor:'pointer', display:'flex', flexDirection:'column', gap:10}}>
              <div className="vp-photo" style={{aspectRatio:'4/3', border:'1.5px solid var(--ink)'}}><span className="label">{p.cover}</span></div>
              <div className="vp-eyebrow">{p.cat} · {p.read}</div>
              <div className="vp-display" style={{fontSize:24, lineHeight:1, margin:0}}>{p.t}</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

window.BlogPage = BlogPage;
window.PostPage = PostPage;
window.__blogPosts = POSTS;
