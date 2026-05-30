/* Blog post body content — articles 1-4 (PDF-derived rewrites) */
/* Tüpograafiline wrapper + 4 esimese postituse JSX */

const blogProseStyle = {
  maxWidth: 760,
  margin: '0 auto',
  padding: '64px 56px 56px',
  fontSize: 17,
  lineHeight: 1.7,
  color: 'var(--ink)',
};

function VpProse({children}){
  return <div style={blogProseStyle} className="vp-prose">{children}</div>;
}

function H2({children, id}){
  return <h2 id={id} style={{fontFamily:'var(--font-display, "DM Serif Display", Georgia, serif)', fontSize:34, lineHeight:1.1, margin:'48px 0 14px', letterSpacing:'-0.01em'}}>{children}</h2>;
}
function H3({children}){
  return <h3 style={{fontFamily:'var(--font-display, "DM Serif Display", Georgia, serif)', fontSize:22, lineHeight:1.2, margin:'32px 0 10px'}}>{children}</h3>;
}
function P({children}){
  return <p style={{margin:'0 0 18px'}}>{children}</p>;
}
function Lead({children}){
  return <p style={{fontSize:20, lineHeight:1.55, margin:'0 0 28px', color:'var(--ink)'}}>{children}</p>;
}
function Mono({children}){
  return <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--muted)', marginBottom:10}}>{children}</div>;
}
function UL({items}){
  return <ul style={{margin:'0 0 22px', paddingLeft:22}}>
    {items.map((it,i)=>(<li key={i} style={{margin:'0 0 8px'}}>{it}</li>))}
  </ul>;
}
function Callout({children, label}){
  return <div style={{border:'1.5px solid var(--ink)', padding:'20px 22px', margin:'28px 0', background:'var(--paper-2)'}}>
    {label && <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--muted)', marginBottom:8}}>{label}</div>}
    <div style={{margin:0, fontSize:16, lineHeight:1.6}}>{children}</div>
  </div>;
}
function Table({headers, rows}){
  return <div style={{margin:'24px 0 28px', border:'1.5px solid var(--ink)', overflow:'auto'}}>
    <table style={{width:'100%', borderCollapse:'collapse', fontSize:14, lineHeight:1.45}}>
      <thead>
        <tr style={{background:'var(--ink)', color:'var(--paper)'}}>
          {headers.map((h,i)=>(<th key={i} style={{padding:'10px 14px', textAlign:'left', fontFamily:'JetBrains Mono, monospace', fontSize:11, textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:500, borderRight: i<headers.length-1 ? '1px solid rgba(255,255,255,0.18)' : 'none'}}>{h}</th>))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r,i)=>(
          <tr key={i} style={{borderTop: i>0 ? '1px solid rgba(0,0,0,0.12)' : 'none'}}>
            {r.map((c,j)=>(<td key={j} style={{padding:'10px 14px', borderRight: j<r.length-1 ? '1px solid rgba(0,0,0,0.08)' : 'none', verticalAlign:'top'}}>{c}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>;
}
function FaqBlock({items}){
  return <div style={{margin:'40px 0 0'}}>
    <Mono>Korduma kippuvad küsimused</Mono>
    <H2 id="faq">Korduma kippuvad küsimused</H2>
    {items.map((it,i)=>(
      <div key={i} style={{padding:'18px 0', borderTop:'1px solid rgba(0,0,0,0.15)'}}>
        <div style={{fontWeight:600, fontSize:16, marginBottom:6}}>{it.q}</div>
        <div style={{fontSize:15, lineHeight:1.6, color:'var(--ink-2)'}}>{it.a}</div>
      </div>
    ))}
  </div>;
}
function PostCTA({setPage}){
  return <div style={{margin:'48px 0 0', padding:'34px 32px', background:'var(--ink)', color:'var(--paper)'}}>
    <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', opacity:0.7, marginBottom:10}}>Järgmine samm</div>
    <div className="vp-display" style={{fontSize:36, lineHeight:1.05, margin:'0 0 14px'}}>Tule salongi näidiseid vaatama.</div>
    <p style={{fontSize:15, lineHeight:1.6, opacity:0.85, margin:'0 0 22px', maxWidth:520}}>
      Tehnika 14, Tallinn. Tasuta projektikonsultatsioon: näidised käes, lahendus vastavalt teie ruumile.
    </p>
    <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
      <button className="vp-btn" onClick={()=>setPage && setPage('contact')} style={{background:'var(--paper)', color:'var(--ink)', borderColor:'var(--paper)'}}>Broneeri visiit →</button>
      <button className="vp-btn" onClick={()=>setPage && setPage('catalog')} style={{background:'transparent', color:'var(--paper)', borderColor:'var(--paper)'}}>Sirvi kataloogi</button>
    </div>
  </div>;
}

window.VpProse = VpProse;
window.PostBlogH2 = H2; window.PostBlogH3 = H3; window.PostBlogP = P;
window.PostBlogLead = Lead; window.PostBlogMono = Mono;
window.PostBlogUL = UL; window.PostBlogCallout = Callout;
window.PostBlogTable = Table; window.PostBlogFaq = FaqBlock;
window.PostBlogCTA = PostCTA;

/* ─────────────────────────────────────────────────────────
   POST 1 — Varjuprofiilide tüübid (PDF 1)
   ───────────────────────────────────────────────────────── */
function PostBodyTuubid({setPage}){
  return <VpProse>
    <Lead>Varjuprofiilid on muutunud kaasaegse siseviimistluse iseloomulikuks detailiks. Need pakuvad minimalistlikku esteetikat, mis tugevdab nii ruumitunnetust kui ka valguse mängu igas tuasis.</Lead>
    <P>Olgu tegu kodu uuendamise või ärihoone projekteerimisega — õigeks tooteks osutub see varjuprofiili tüüp, mis vastab täpselt teie kasutusvajadusele. Allpool tutvustame kolme põhilist lahendust, mida Eesti turul kohtab kõige sagedamini.</P>

    <H2>1. Standardne varjuprofiil</H2>
    <P>Standardne varjuprofiil on elegantne ja peen lahendus, mis tekitab seina ja põranda vahele märkamatu vuugi. See loob illusiooni, nagu sein hõljuks põranda kohal. Profiil on enamasti valmistatud alumiiniumist, mis tagab vastupidavuse, niiskuskindluse ja minimaalse hoolduse vajaduse.</P>
    <P>Profiil on saadaval erinevates kõrgustes ja seda saab pulbervärvida ükskõik millises RAL-toonis, et see sobituks teie interjööriga. Standardne mudel sobib eriti hästi neile, kes otsivad puhast ja kaasaegset ilmet ilma lisafunktsioonideta.</P>
    <P><strong>Sobib kõige paremini:</strong></P>
    <UL items={[
      'Minimalistlikele elu- ja magamistubadele',
      'Kontoritele, kus on oluline puhas joon',
      'Koridoridele ja avalikele ruumidele',
    ]}/>

    <H2>2. Sisseehitatud LED-valgustusega varjuprofiil</H2>
    <P>Need, kes soovivad ruumile lisada miljööd ja meeleolu, leiavad LED-valgustusega varjuprofiilist suurepärase lahenduse. Sellistes mudelites on alumiiniumkonstruktsiooni sisse integreeritud kanal, kuhu paigaldatakse LED-riba. See suunab pehme kaudse valguse seina poole, rõhutab varjuvuuki ja loob soojaltkutsuva atmosfääri.</P>
    <P>Konstruktsiooni alus on jätkuvalt alumiiniumist, mis tagab pikaajalise tugevuse. Sisseehitatud läätsekaitse hajutab valgust ühtlaselt ja kaitseb LED-riba mehaaniliste mõjude eest. Saadaval on erinevad mudelid, mida saab pulbervärvida vastavalt projekti värvilahendusele.</P>
    <P><strong>Tüüpilised kasutusalad:</strong></P>
    <UL items={[
      'Koridorid ja trepiastmed (öövalgus)',
      'Magamistoad pehme öise valgustusega',
      'Hotellitoad ja restoraniinterjöörid',
      'Arhitektuurselt tähelepanu väärivad seinad',
    ]}/>

    <H2>3. MDF-täitega varjuprofiil</H2>
    <P>MDF-täitega varjuprofiil on hübriidlahendus, kus alumiiniumi täpsus ja sirgus ühenduvad puidu soojuse ja kohapeal viimistlemise võimalusega. Alumiiniumraam annab konstruktsioonile vastupidavuse, samas kui sisemine MDF-täidis võib olla seinaga ühte värvi värvitud, mis loob ühtse pinna.</P>
    <P>Selline kombinatsioon sobib kõige paremini neile, kes hindavad minimalismi puhtaid jooni, kuid soovivad sinna juurde lisada veidi puidu pehmust ja tekstuuri.</P>
    <Callout label="Märkused">
      Värvige täidis matt-tasemel viimistlusega, mis vastab seinavärvile. Vältige kasutamist kõrge niiskusega ruumides (vannitoad, saunaeesruumid). Sobib elutubadesse, magamistubadesse ja esindusaladele.
    </Callout>

    <H2>Paigaldusjuhised varjuprofiilidele</H2>
    <P>Korrektne paigaldus tagab puhta lõpptulemuse ja pika eluea. Allpool on viis põhisammu, mida iga paigaldaja peaks järgima.</P>
    <UL items={[
      <><strong>1. Ettevalmistus.</strong> Veenduge, et sein ja põrand on puhtad, kuivad ja tasaselt loodis.</>,
      <><strong>2. Mõõtmine.</strong> Kasutage lasertasandit, et märkida ühtlane joon kogu paigaldushöögusele.</>,
      <><strong>3. Lõikamine.</strong> Mõõtke profiilid täpselt vajalikule pikkusele, arvestades nurkasid.</>,
      <><strong>4. Kinnitamine.</strong> Fikseerige profiilid kruvide, naelade või liimiga.</>,
      <><strong>5. Viimistlus.</strong> Kui plaanite värvida, kasutage materjalile sobivat krunti.</>,
    ]}/>

    <H2>Miks valida varjuprofiil</H2>
    <P>Varjuprofiilide populaarsus pole juhus. Neil on mitu eelist, mis muudavad need kaasaegse siseviimistluse loomulikuks valikuks.</P>
    <UL items={[
      <><strong>Kaasaegne esteetika.</strong> Sirged, puhtad jooned, mis sobivad nii minimalistlikku kui ka rikkalikumasse interjööri.</>,
      <><strong>Lisavalgustuse võimalus.</strong> LED-integratsioon loob soojaltkutsuva pinnavalgustuse.</>,
      <><strong>Vastupidavus.</strong> Alumiiniumist konstruktsioon ei kannata niiskuse ega kulumise all.</>,
      <><strong>Kohandatavus.</strong> Mõõdud, värvid ja viimistlused on muudetavad vastavalt projektile.</>,
    ]}/>

    <FaqBlock items={[
      {q:'Millest varjuprofiilid valmistatakse?', a:'Enamus kvaliteetseid varjuprofiile on valmistatud ekstrudeeritud alumiiniumist (sulam 6063-T5), mis on vastupidav, kerge ja korrosioonikindel. MDF-täitega versioonides kasutatakse alumiiniumraami koos kohapeal viimistletava MDF-iga.'},
      {q:'Kas varjuprofiili saab värvida soovitud tooniga?', a:'Jah. Alumiiniumprofiilid pulbervärvitakse tehases ükskõik millises RAL-toonis. MDF-täitega versiooni täideosa saab kohapeal värvida, et see seinaga ühte sulaks.'},
      {q:'Kas LED-valgustusega varjuprofiil sobib igasse ruumi?', a:'Enamikku kuivadest ruumidest jah. Niiskemates ruumides tuleb kasutada IP-kaitseastmega LED-ribasid. Magamistuppa, koridori ja elutuppa on see ideaalne valik.'},
      {q:'Kas paigaldus on keeruline?', a:'Pinnale paigaldatava profiili saab kogenud DIY-tegija ise paigaldada lasertasandit ja korralikku saagi kasutades. Pahteldatav versioon eeldab pahteldaja kogemust.'},
      {q:'Mis on varjuprofiili eeldatav eluiga?', a:'Alumiiniumprofiili eluiga ületab 25 aastat ilma hoolduse vajaduseta. Pulbervärvi UV-kindlus tagab värvitooni säilimise 15+ aasta jooksul.'},
      {q:'Mille poolest erineb varjuprofiil tavalisest põrandaliistust?', a:'Tavaline põrandaliist on seinast välja ulatuv element. Varjuprofiil tõmbub seina sisse, jättes maha vuugi, mis loob varju ja kaasaegse minimalistliku ilme.'},
      {q:'Kas varjuprofiili saab paigaldada juba valmis seinale?', a:'Jah. Pinnale paigaldatav versioon on mõeldud just selleks. Pahteldatav versioon paigaldatakse enne pahteldamist ja sobib uusarendusele või täisrenoveerimisele.'},
      {q:'Kui sügav peaks varjuvuuk olema?', a:'Tüüpiline sügavus on 10–25 mm. Väiksem (10–15 mm) sobib madalama lae jaoks. Sügavam (20–25 mm) sobib LED-versioonidele.'},
    ]}/>

    <PostCTA setPage={setPage}/>
  </VpProse>;
}

/* ─────────────────────────────────────────────────────────
   POST 2 — Mis on varjuprofiil + 5 disainilahendust (PDF 2)
   ───────────────────────────────────────────────────────── */
function PostBodyInterjooris({setPage}){
  return <VpProse>
    <Lead>Varjuprofiil — tuntud ka peitliistu või varjuvuugi nime all — on elegantne ja minimalistlik lahendus, mis tõstab esile iga kaasaegse interjööri puhtaid jooni.</Lead>
    <P>Erinevalt tavalisest põrandaliistust ei ulatu varjuprofiil seinast välja, vaid asetseb seinaga ühel tasapinnal, jättes seina ja põranda vahele puhta vuugi. Tulemuseks on katkematu üleminek, mis loob terviku.</P>

    <H2>Varjuprofiili peamised eelised</H2>
    <UL items={[
      <><strong>Esteetiline mõju:</strong> vuuk varjab seina ja põranda kohtumiskoha, jättes ruumile katkematu ja minimalistliku ilme.</>,
      <><strong>Disaini paindlikkus:</strong> profiil on saadaval erinevates materjalides, mõõtudes ja viimistlustes.</>,
      <><strong>Valgustuse integratsioon:</strong> LED-riba saab peita profiili sisse — loomulik kaudvalgus.</>,
      <><strong>Ruumi kokkuhoid:</strong> mööbel saab paikneda otse vastu seina, ilma vahega.</>,
      <><strong>Lihtne puhastamine:</strong> sileda pinna tõttu ei kogune tolm liistu peale.</>,
      <><strong>Kaabliruum:</strong> paljud profiilid sisaldavad kanalit juhtmete ja kaablite peitmiseks.</>,
    ]}/>

    <H2>Lihtne paigaldus — ka tavakasutajale</H2>
    <P>Vastupidiselt levinud arvamusele ei ole varjuprofiili paigaldus keeruline ülesanne. Süsteemid on disainitud nii, et need oleksid kiired ja turvalised paigaldada — see muudab varjuprofiilid kättesaadavaks ka DIY-huvilistele.</P>
    <UL items={[
      <><strong>Lihtne kinnitamine</strong> põhitööriistadega (lasertasand, kruvid)</>,
      <><strong>Eelmärgistatud kinnituspunktid</strong> — lasertäpsed lõiked tagavad ühtlase paigutuse</>,
      <><strong>Paigaldusjuhendid</strong> — sammhaaval juhised aitavad jõuda professionaalse tulemuseni</>,
    ]}/>

    <H2>Viis võimalust varjuprofiili interjööris kasutada</H2>

    <H3>1. Hõljuva seina efekt</H3>
    <P>See klassikaline lahendus saavutatakse spetsiaalse anodeeritud alumiiniumprofiiliga, kus täidisosa puudub. Kui profiili täiendab kaudvalgustus, hakkab sein tõepoolest "hõljuma" põranda kohal. See on silmatorkav valik nii sisemiste pindade kui ka teatud välisarhitektuuriliste detailide jaoks.</P>

    <H3>2. Sujuv pind</H3>
    <P>Selleks, et varjuprofiil jääks peaaegu nähtamatuks, kasutatakse MDF-täitega versiooni, mille täidis värvitakse täpselt sama tooni kui sein. Kahe pinna vahel jääb minimaalne vuuk ning kogu sein paistab katkematu ja siledana põrandani välja.</P>
    <Callout label="Vihje">
      Kasutage MDF-täidisele pestava värvi viimistlust, kuna alumine osa võib aja jooksul saada löögi tolmuimejatöö või jalanõude tõttu.
    </Callout>

    <H3>3. Kontrastiv detail</H3>
    <P>Kui sa ei soovi profiili täiesti peita, võid valida täidise, mis seinatooniga kontrasteerub. Kontrast võib olla nii tugev (must sein, valge täide) kui ka õrn (kaks tooni erinevus). MDF-täidised saab värvida soovitud värvi või valida tehases viimistletud variandid (näiteks harjatud metall, puiduimitatsioon).</P>

    <H3>4. Varjujoon (peen vuuk)</H3>
    <P>Õhukese vahe jätmine seina ja täidise vahele loob peene varjujoone, mis raamib detaili rahulikult. See lähenemine annab ruumile definitsiooni, ilma et katkeks selle puhas vorm. Tavaliselt valitakse seinaga sama värvi MDF-täide ja vahe jääb 3–5 mm sügav.</P>

    <H3>5. Sisseehitatud LED-valgustus</H3>
    <P>LED-kanaliga varjuprofiilid pakuvad nii funktsionaalset kui ka dekoratiivset valgustust. LED-riba saab paigaldada profiili ülaossa, keskele või põhja — vastavalt sellele, kuidas valgust soovitakse suunata. Õige eredus ja värvitemperatuur võivad luua öövalguse koridorides, hõljuva põranda efekti elutoas või arhitektuurse rõhuasetuse trepi all.</P>

    <H2>Miks valida varjuprofiil</H2>
    <P>Varjuprofiil ei ole lihtsalt mööduv trend — see on kaasaegse interjööri standard, mis on tulnud, et jääda. Mida kvaliteetne lahendus pakub:</P>
    <UL items={[
      <><strong>Tipptasemel alumiiniumi konstruktsioon</strong> — vastupidav, kerge ja korrosioonikindel</>,
      <><strong>Kiire ja täpne paigaldus</strong> — minimaalsed tööriistad, täpne sobivus</>,
      <><strong>Värvitav viimistlus</strong> — saab kohandada iga interjööri värvilahendusele</>,
      <><strong>LED-valmidus</strong> — sisseehitatud kanal teeb valgustuse integreerimise lihtsaks</>,
      <><strong>Niiskuse- ja UV-kindlus</strong> — sobib nii kuivadesse kui ka niisketesse ruumidesse</>,
    ]}/>

    <FaqBlock items={[
      {q:'Mis vahe on varjuprofiilil ja tavalisel põrandaliistul?', a:'Tavaline põrandaliist ulatub seina pinnast välja ja katab seina ja põranda kohtumiskoha. Varjuprofiil peitub seina sisse, jättes vuugi, mis loob varju ja katkematu pinna efekti.'},
      {q:'Kas varjuprofiil sobib igasse ruumi?', a:'Enamikku ruumidesse — eriti hästi elutoad, magamistoad ja koridorid. Niiskemates ruumides tuleks valida alumiiniumist versioon, mitte MDF-täitega.'},
      {q:'Kas varjuprofiili saab paigaldada DIY-meetodil?', a:'Pinnale paigaldatava versiooni saab kogenud DIY-huviline ise paigaldada, kasutades lasertasandit ja kvaliteetset saagi. Pahteldatav versioon nõuab pahteldaja kogemust.'},
      {q:'Kas LED-iga varjuprofiil tarbib palju elektrit?', a:'Ei. Tüüpiline 24V LED-riba tarbib umbes 9,6 W/m. 5-meetrine koridori valgustus tähendab aastas umbes 10 € lisakulu.'},
      {q:'Mille värv on varjuprofiili sisepind?', a:'Standardvalik RAL 9016 (transpordivalge) või RAL 9005 (sügav must). Praktiliselt iga RAL-toon saadaval eritellimusel.'},
      {q:'Kas varjuprofiili saab integreerida kaablihaldusega?', a:'Jah. Paljude profiilide sees on kanal madalpinge-kaablite (CAT6, HDMI, valguskaabel) peitmiseks.'},
      {q:'Kas varjuprofiili saab kasutada koos põrandaküttega?', a:'Jah. Profiil ei kontakteeru kütteelemendiga otseselt. Põrandakatte termopaisumise dilatatsioonivuuk jääb profiili sisse peidetud.'},
      {q:'Kas täidise värvitooni saab hiljem muuta?', a:'Alumiiniumprofiili sisepinda tehasevärvi üle ei värvita. MDF-täidist saab värvida nii palju, kui soovid.'},
    ]}/>

    <PostCTA setPage={setPage}/>
  </VpProse>;
}

/* ─────────────────────────────────────────────────────────
   POST 3 — Varjuprofiilid: kaasaegse disaini juhend (PDF 3)
   ───────────────────────────────────────────────────────── */
function PostBodyVorrdlus({setPage}){
  return <VpProse>
    <Lead>Tavaline põrandaliist on tuttav igale kodule — kuid see ei sobi tihti kokku kaasaegse, minimalistliku disainikeelega. Vastuseks sellele kasvas välja varjuprofiil — peen disainilahendus, mis tekitab seina ja põranda vahele sissetõmmatud vuugi.</Lead>
    <P>Tulemuseks on illusioon, et sein hõljub põranda kohal, ja see annab interjöörile tugevalt kaasaegse karaktari. Allpool tutvustame kõike olulist, mis aitab otsustada, kas varjuprofiil sobib teie projektile.</P>

    <H2>Varjuprofiil vs traditsiooniline põrandaliist</H2>
    <Table headers={['Tunnus','Varjuprofiil','Traditsiooniline põrandaliist']} rows={[
      ['Esteetika','Minimalistlik, "hõljuva seina" efekt','Klassikaline, dekoratiivne'],
      ['Paigaldus','Keerukam, vajab planeerimist','Lihtne, peale värvimist'],
      ['Hooldus','Lihtne, pole tolmuhakkeserva','Ülaservale koguneb tolm'],
      ['Hind','Kõrgem materjali- ja paigalduskulu','Mõõdukalt madalam'],
      ['Vastupidavus','Eriti hea metallprofiili korral','Võib kraapuda, vajada värvimist'],
      ['Mööbli paigutus','Flush vastu seina','10–15 mm vahega seinast'],
    ]}/>

    <H2>Miks valida varjuprofiil</H2>
    <UL items={[
      <><strong>Tugev ja vastupidav.</strong> Eriti metallprofiili korral kaitseb see seina alumist osa kraapidest ja löökidest.</>,
      <><strong>Puhas ja kaasaegne ilme.</strong> Liistu massiivsus kaob, sein jätkub ühtlaselt põrandani.</>,
      <><strong>Suurem ruumitunne.</strong> Vuugi tekitatud sügavuse illusioon paneb ruumi näima ruumikamana.</>,
      <><strong>Värvimine on lihtsam.</strong> Puudub liistu ülaserv, ei pea teipima — sein värvitakse profiili servani.</>,
      <><strong>LED-integratsioon.</strong> Profiili sees on ideaalne ruum LED-riba peitmiseks.</>,
    ]}/>

    <H2>Varjuprofiilide tüübid</H2>

    <H3>Materjali ja konstruktsiooni järgi</H3>
    <P><strong>1. Metallprofiilid (pahteldatavad).</strong> See on professionaalne lahendus, mida kasutatakse uutes ehitistes ja täisrenoveerimistel. Profiil — tüüpiliselt ekstrudeeritud alumiinium — paigaldatakse seina karkassi enne kipsplaadi paigaldamist.</P>
    <P><strong>2. PVC- või vinüülribad.</strong> Metallprofiilidega sarnased, kuid valmistatud kõrge tihedusega plastikust. Soodsam ja niiskuskindel — sobib vannitubadesse ja piiratud eelarvega projektidesse.</P>
    <P><strong>3. Integreeritud MDF- või puitliist.</strong> Hübriidlahendus, mille puhul traditsiooniline MDF-põrandaliist on ülemisse serva freesitud "varjujoonega". Lihtne paigaldada olemasolevasse interjööri ilma seinte ümberehituseta.</P>

    <H3>Funktsionaalsuse järgi</H3>
    <UL items={[
      <><strong>Standardne varjuprofiil</strong> — fookus puhtal joonel ja "hõljuva seina" efektil</>,
      <><strong>Täidisega varjuprofiil</strong> — kaheosaline süsteem, kus täidist klipsitakse hiljem peale</>,
      <><strong>LED-iga varjuprofiil</strong> — sisseehitatud kanaliga, mis tekitab pehme kaudvalgustuse</>,
    ]}/>

    <H2>Kuidas varjuprofiil paigaldatakse</H2>
    <P>Varjuprofiili paigaldus eeldab täpsust ja ettevalmistust. See ei ole tüüpiline DIY-projekt, kui kogemus pahteldamisel puudub. Allpool on protsess viies põhietapis.</P>
    <UL items={[
      <><strong>1. Karkassi ettevalmistus.</strong> Seinakarkass loodis, varjuprofiili kõrgus märgitud lasertasandiga.</>,
      <><strong>2. Profiili paigaldus.</strong> Metall- või PVC-profiil lõigatakse, kruvitakse seina karkassile.</>,
      <><strong>3. Kipsplaadi paigaldus.</strong> Kipsplaadid asetuvad profiili ülemisele servale.</>,
      <><strong>4. Pahteldus.</strong> Pahtel viiakse profiili servani — kõige oskust nõudvam osa.</>,
      <><strong>5. Värvimine ja viimistlus.</strong> Sein värvitakse profiili servani.</>,
      <><strong>6. Põrandakatte paigaldus.</strong> Parkett või vinüül libistatakse profiili alla.</>,
    ]}/>

    <H2>Disainiideed</H2>

    <H3>Sisseehitatud LED-valgustus</H3>
    <P>Üks populaarseimaid kasutusi: LED-riba paigaldatakse profiili sisse, valgus suunatakse seina poole ülespoole. Tulemuseks on pehme, kaudne kuma seinapinnal, mis tugevdab "hõljuva seina" efekti. Hästi toimib see koridorides ja magamistubades (öövalgus) ning elutubades (õhtune atmosfäär).</P>

    <H3>Värvi- ja kontrastimäng</H3>
    <P>Varjuvuugi sisepind ei pea olema sama värvi kui sein. Tumedam toon — näiteks süsihall või must — tugevdab varju ja muudab joone defineeritumaks. Üks praktiline näide: kui ruumis on tumedad aknaraamid, võib varjuvuugi sisepinna värvida samasse tooniga.</P>

    <FaqBlock items={[
      {q:'Mis on varjuprofiili peamine eesmärk?', a:'Luua kaasaegne ja minimalistlik ilme, varjates seina ja põranda kohtumiskoha. Lisaks loob seinale "hõljuva" efekti.'},
      {q:'Kas varjuprofiili saab paigaldada juba valmis kodusse?', a:'Pahteldatava versiooni paigaldus olemasolevasse kodusse on keeruline. Pinnale paigaldatav alumiiniumprofiil sobib aga olemasolevatesse ruumidesse hästi.'},
      {q:'Kui palju varjuprofiil tüüpiliselt maksab?', a:'Tüüpilise alumiiniumprofiili hind on 18–32 €/jm, millele lisandub paigalduskulu.'},
      {q:'Kas varjuprofiil on DIY-projekt?', a:'Pahteldatav versioon nõuab pahteldaja kogemust. Pinnale paigaldatava versiooni võib kogenud DIY-tegija ise paigaldada.'},
      {q:'Mis materjalid on varjuprofiilil parimad?', a:'Anodeeritud või pulbervärvitud alumiinium — tugev, sirge ja korrosioonikindel.'},
      {q:'Kuidas parandada kahjustatud varjuvuuki?', a:'Kahjustunud osa lõigatakse välja, uus profiilitükk asendatakse ja piirkond pahteldatakse ja värvitakse uuesti.'},
      {q:'Kas varjuprofiil on hea valik?', a:'Jah, eriti kui soovid kaasaegset ja minimalistlikku interjööri. Paigaldus on keerukam, kuid esteetiline tulemus kompenseerib selle.'},
      {q:'Kus varjuprofiili tüüpiliselt kasutatakse?', a:'Galeriid, kvaliteetkodud, minimalistlikud kontorid ja kommertsruumid. Iga ruum, kus puhas ja kaasaegne ilme on prioriteet.'},
    ]}/>

    <PostCTA setPage={setPage}/>
  </VpProse>;
}

/* ─────────────────────────────────────────────────────────
   POST 4 — Varjuprofiilide täisjuhend / 4 kasutusala (PDF 4)
   ───────────────────────────────────────────────────────── */
function PostBodyKoguRuumis({setPage}){
  return <VpProse>
    <Lead>Sisearhitektuuris on detailid need, mis muudavad ruumi tunde. Varjuvuuk — väike teadlikult jäetud süvend, kus kaks pinda kohtuvad — on üks neist detailidest, mis suudab ruumi täiesti ümber kujundada.</Lead>
    <P>See annab ruumile puhta, moodsa ja viimistletud iseloomu, paneb seinad näima hõljuvana ja laed kõrgemana. Allpool selgitame, mis on varjuvuuk, milliseid tüüpe Eesti turul kohtab ja kuidas seda erinevates projektides kasutada saab.</P>

    <H2>Varjuprofiilide neli peamist kasutusala</H2>

    <H3>1. Lagi — "hõljuva lae" efekt</H3>
    <P>Lae ja seina kohtumiskohta tekitatud varjuvuuk loob mulje, nagu lagi oleks seinast lahti. Ruum tundub kõrgem ja avaram, kuna silm jälitab seina kuni vuugini. Selle detailiga kaob ka tavaline karniis, mille asemele tuleb selge ja kaasaegne joon.</P>

    <H3>2. Põrandasokkel — kõige levinum kasutus</H3>
    <P>Põrandasokli varjuvuuk — tuntud ka kui peitliist või "varjuline sokkel" — paigaldatakse seina ja põranda kohtumiskoha. Sein peatub veidi enne põranda algust, mis tekitab seinale "hõljuva" efekti. Tolmu kogumiseks pole ülaserva ja põrandat saab pesta servast servani.</P>

    <H3>3. Ukseraam — raamita ukseava</H3>
    <P>Sama põhimõtet saab rakendada ka ukseava ümber. Massiivsete puidust või MDF-ist ukseraamide asemel paigaldatakse õhuke metallprofiil. Kipsplaat finišeerib profiilini, jättes ümber ukse õhukese vuugi. Tulemuseks on raamita ukseava, kus uks tundub seinaga ühte sulandavat.</P>

    <H3>4. Seinapaneel — materjalide eraldaja</H3>
    <P>Varjuvuuk võib teenida ka funktsionaalset rolli — eraldada erinevaid seinamaterjale või paneele. Näiteks suurel seinal, kus kohtuvad puidust paneel ja sile värvitud sein, eristab vuuk materjalid puhtalt ja rütmiliselt.</P>

    <H2>Miks kasutada varjuvuuke</H2>
    <UL items={[
      <><strong>Minimalistlik selgus.</strong> Joon on puhas, üleminek selgus ja ornament puudub.</>,
      <><strong>Ruumitundlikkus.</strong> "Hõljuv" efekt paneb ruumi näima suuremana ja kergemana.</>,
      <><strong>Vigade peitmine.</strong> Vuuk varjab pinna ebatäpsusi — pragusid, mõõtmise erinevusi.</>,
      <><strong>Valgustuse integratsioon.</strong> Profiili sisse mahub LED-riba, mis muudab detaili valgustusallikaks.</>,
    ]}/>

    <H2>Parimad materjalid varjuprofiili jaoks</H2>
    <Table headers={['Materjal','Plussid','Miinused','Sobib parimal']} rows={[
      ['Alumiinium','Tugev, vastupidav, terav joon','Kõrgem hind','Lagi, ukseraamid, kõrge koormus'],
      ['PVC','Soodne, kerge, niiskuskindel','Vähem vastupidav','DIY, madala löögiriskiga kohad'],
      ['Puit','Värvitav, soe ilme','Niiskuse korral kooldub','Traditsioonilised interjöörid'],
      ['MDF','Odav, lihtne värvida','Ei talu vett','Kuivad ruumid, eelarvepiir'],
    ]}/>
    <P>Praktikast lähtuvalt annab <strong>alumiinium</strong> parima ja kõige professionaalsema tulemuse. See on tugev ja loob terava, sirge varjujoone, mis on varjuvuugi mõte.</P>

    <H2>Kuidas varjuvuuki tekitada</H2>
    <UL items={[
      <><strong>1. Planeerimine ja ettevalmistus.</strong> Karkassi struktuur peab olema sirge ja loodis.</>,
      <><strong>2. Profiili paigaldus.</strong> Lõigake saagiga sobivasse mõõtu, kinnitage karkassi külge kruvidega.</>,
      <><strong>3. Kipsplaadi paigaldus.</strong> Kipsplaat asetub profiili servale.</>,
      <><strong>4. Pahteldus.</strong> Pahteldusseguga kaetakse profiili kõrv. Töö nõuab oskust.</>,
      <><strong>5. Värvimine.</strong> Sein värvitakse profiili servani. Vuugi sisepinda saab värvida seina või kontrasttoonis.</>,
    ]}/>

    <H2>Disainilahendused</H2>
    <H3>LED-valgustuse integratsioon</H3>
    <P>LED-riba peidetakse profiili sisse, valgus suunatakse vastu seina või lage. Pehme kaudvalgus annab seinale kuma, mis tugevdab "hõljuva" efekti. Hotelli koridorides ja moodsates magamistubades klassikaline lahendus.</P>
    <H3>Arhitektuursed mustrid</H3>
    <P>Varjuvuuki saab kasutada ka suurte seinte segmenteerimiseks. Kui sein on liiga ühtlane, võib lisada horisontaalseid või vertikaalseid vuugid, mis loovad rütmi ja sügavust.</P>
    <H3>Mööbel ja kapid</H3>
    <P>Sama põhimõte töötab ka mööbli juures. Käepidemeteta kapid, kus avamiseks kasutatakse profiilis tehtud süvendit, jäävad puhtalt minimalistlikud.</P>

    <H2>Kuidas valida õige varjuprofiil</H2>
    <P><strong>1. Rakendus ja asukoht.</strong> Lagi vajab spetsiaalset profiili kipsplaadi serva viimistlemiseks. Sokkel vajab löögikindlust. Ukseraam vajab tugevat profiili, mis säilitab loodi. Seinapaneeli vahel — lihtsam profiil.</P>
    <P><strong>2. Materjal.</strong> Tipptasemelise tulemuse jaoks alumiinium. Niiskemates ruumides PVC või alumiinium, mitte MDF/puit.</P>
    <P><strong>3. Mõõdud ja sügavus.</strong> 10 mm — peen minimalistlik ilme. 20 mm — dramaatilisem ja sobib LED-i jaoks. Profiil peab vastama kipsplaadi paksusele.</P>

    <FaqBlock items={[
      {q:'Kas varjuvuuke on raske puhastada?', a:'Ei. Vuugi sisse võib koguneda veidi tolmu, kuid tolmuimeja kitsa otsiku abil saab selle hõlpsalt eemaldada.'},
      {q:'Kas varjuvuuk maksab rohkem kui traditsiooniline liist?', a:'Üldiselt jah. Materjalid (eriti alumiinium) on kallimad ja paigaldus on oskust nõudvam.'},
      {q:'Kas varjuvuuki saab kasutada igas ruumis?', a:'Jah, peaaegu igas ruumis. Vannitubades tuleks valida niiskuskindel profiil — alumiinium või PVC.'},
      {q:'Kas varjuvuuk töötab madala laega ruumis?', a:'Töötab, kuid vuugi sügavust tuleb kohandada. 2,5 m laega ruumis sobib 10–15 mm sügavus.'},
      {q:'Kas LED-i paigaldus toimub paigalduse ajal või hiljem?', a:'Mõlemad on võimalikud. Parem juba paigaldusajal koos elektriku vooluskeemiga.'},
      {q:'Kas varjuvuuki tasub paigaldada renoveerimise käigus?', a:'Kindlasti. Renoveerimine on parim aeg, kuna seinad on niikuinii viimistluseta.'},
      {q:'Kas saab kombineerida mitut varjuvuugi kasutusala?', a:'Jah ja see on sageli kõige tugevam disainivalik. Kombinatsioon põrandasoklist, lae varjuvuugist ja raamita ukseavast loob tervikliku arhitektuurse keele.'},
    ]}/>

    <PostCTA setPage={setPage}/>
  </VpProse>;
}

window.PostBodyTuubid = PostBodyTuubid;
window.PostBodyInterjooris = PostBodyInterjooris;
window.PostBodyVorrdlus = PostBodyVorrdlus;
window.PostBodyKoguRuumis = PostBodyKoguRuumis;
