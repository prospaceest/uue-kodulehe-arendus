/* Blog post body content — articles 5-7 (PDF-derived rewrites) + flagship b0 */

/* ─────────────────────────────────────────────────────────
   POST 5 — Põrandaliistude stiilid (PDF 5)
   ───────────────────────────────────────────────────────── */
function PostBodyStiilid({setPage}){
  const H2 = window.PostBlogH2, H3 = window.PostBlogH3, P = window.PostBlogP, Lead = window.PostBlogLead;
  const UL = window.PostBlogUL;
  const FaqBlock = window.PostBlogFaq;
  const CTA = window.PostBlogCTA, VpProse = window.VpProse;
  return <VpProse>
    <Lead>Põrandaliist on ruumi viimase puudutuse element, mis pakub nii kaitsefunktsiooni kui ka dekoratiivset rolli. Õige liistu stiili valik suudab muuta kogu interjööri iseloomu.</Lead>
    <P>See artikkel tutvustab Eesti turul populaarseid põrandaliistude stiile, et aidata sul teha teadlik valik oma kodu, projekti või ärihoone jaoks.</P>

    <H2>Viis populaarsemat põrandaliistu stiili</H2>

    <H3>1. Traditsioonilised põrandaliistud</H3>
    <P>Traditsioonilised liistud on tihti rikkalike kujunduselementidega — kaarjate vormide, pärliridade ja dekoratiivsete uurete ja sisselõigetega. Need on parim valik ajaloolistele majadele või klassikalise interjööri stiilis kodudele.</P>
    <UL items={[
      'Valmistatakse tüüpiliselt puidust või MDF-ist',
      'Kõrgus tavaliselt 120–200 mm',
      'Värvitakse sageli valgeks või peitsitakse',
    ]}/>

    <H3>2. Moodsad minimalistlikud põrandaliistud</H3>
    <P>Kaasaegses interjööris töötavad kõige paremini liistud puhaste, sirgete joontega. Need on tavaliselt tasapinnalised või lihtsalt kammitletud servaga.</P>
    <UL items={[
      'Tavaliselt madalamad, 70–100 mm',
      'Saab värvida julgetes toonides või jätta valgeks',
      'Valmistatakse alumiiniumist, MDF-ist või liidikiviga puidust',
    ]}/>

    <H3>3. Beaded (pearliline) põrandaliistud</H3>
    <P>Beaded-tüüpi liistud sisaldavad väikest ümarat detaili — "pärli" — liistu ülaservas. See peen kaunistus lisab teksti, ilma et rikuks toa kompositsiooni.</P>
    <UL items={[
      'Sobivad nii klassikalistesse kui ka üleminekustiili interjööridesse',
      'Kõrgus tavaliselt umbes 120 mm',
      'Värvitakse või peitsitakse',
    ]}/>

    <H3>4. Bullnose (ümarduslane) põrandaliistud</H3>
    <P>Bullnose-stiil tähendab, et liistu ülaserv on täielikult ümar. See pehmendab seina ja põranda kohtumist ning vähendab teravat serva — eelis nii laste kui ka kõrge liiklusega ruumide jaoks.</P>
    <UL items={[
      'Tüüpiline kasutus maamajades ja rustikaalse stiili kodudes',
      'Kõrgus üldjuhul 100–150 mm',
      'Tüüpiliselt valgeks värvitud või naturaalne puit',
    ]}/>

    <H3>5. Chamfered (kammitletud) põrandaliistud</H3>
    <P>Chamfered-stiilil on ülaservas kerge nurka lõigatud detail. See on selge ja korrektne lahendus, mis sobib hästi nii kaasaegsesse kui ka üleminekustiili interjööri.</P>
    <UL items={[
      'Kõrgus tavaliselt 90–150 mm',
      'Värvitakse sageli neutraalsetes toonides',
      'Valmistatakse MDF-ist või puidust',
    ]}/>

    <H2>Mis on praegu moes?</H2>
    <P>Hetkel kaldub trend kahele suunale: lihtsuse ja paindlikkuse poole. Inimesed ja sisearhitektid eelistavad liistusid, mis sulanduvad tervikuga, on vastupidavad ja hooldamiseks lihtsad.</P>
    <UL items={[
      <><strong>Lamedad ja laiad liistud</strong> on kogumas populaarsust eriti kaasaegsetes kodudes</>,
      <><strong>Värvitud liistud,</strong> mis sobitub seinaga või moodustab teadliku kontrasti</>,
      <><strong>Säästvad materjalid</strong> ja keskkonnasõbralikud viimistlused</>,
      <><strong>Periood-stiili liistud</strong> ajalooliste korterite ja mõisamajade renoveerimisel</>,
    ]}/>

    <H2>Materjalid ja viimistlused</H2>
    <H3>Puit</H3>
    <P>Naturaalselt ilus ja vastupidav. Saab peitsida või värvida. Sobib klassikalisse ja rustikaalsesse stiili.</P>
    <H3>MDF</H3>
    <P>Soodne ja lihtne värvida. Sile pind, sobib hästi kaasaegsele interjöörile. Vähem vastupidav kui puit, kuid resistentne kõverumisele.</P>
    <H3>Alumiinium</H3>
    <P>Tipptasemel vastupidavus ja minimaalne hooldus. Tuleb juba pulbervärvituna, mis säästab paigaldusaega. Eriti puhas ja moodne ilme.</P>
    <H3>PVC ja vinüül</H3>
    <P>Niiskuskindel, ideaalne vannitubadesse ja kööki. Saadaval erinevates stiilides. Lihtne puhastada.</P>

    <H2>Põrandaliistude paigaldusnõuanded</H2>
    <UL items={[
      <><strong>1. Mõõda täpselt</strong> — mõõda kogu toa perimeeter ja lisa 10% varuks.</>,
      <><strong>2. Valmista pinnad ette</strong> — sein ja põrand peavad olema puhtad ja kuivad.</>,
      <><strong>3. Lõika täpselt</strong> — kasuta nurkade jaoks miitersaagi.</>,
      <><strong>4. Kinnita kindlalt</strong> — naelad, kruvid või liim sõltuvalt seina tüübist.</>,
      <><strong>5. Täida vahed ja kruviaugud</strong> — kasuta kohendusvahatust või kittpuhastusvahendit.</>,
      <><strong>6. Värvi pärast paigaldust</strong> — see kaitseb paigaldamise käigus võimalike kahjustuste eest.</>,
    ]}/>

    <H2>Kuidas põrandaliistud rikastavad interjööri</H2>
    <UL items={[
      <><strong>Visuaalne huvi</strong> — õige stiil ja värv lisavad ruumi sügavust ja teksti</>,
      <><strong>Ruumi defineerimine</strong> — liistud raamivad ruumi ja tõstavad esile arhitektuursed detailid</>,
      <><strong>Põrandakatte täiendamine</strong> — liistud võivad olla sarnased või vastandlikud põrandaga</>,
      <><strong>Kaablitehnika peitmine</strong> — kaablid saab joosta liistu taga</>,
    ]}/>

    <FaqBlock items={[
      {q:'Mis on Eesti turul kõige populaarsem põrandaliistu stiil?', a:'Kõige laiemalt kasutatakse kaasaegseid minimalistlikke liistusid (chamfered ja lamedad). Premium-projektides kasvab kiiresti peitliistude osakaal.'},
      {q:'Mis materjal on kõige vastupidavam?', a:'Alumiinium on kõige vastupidavam — ei kannata niiskuse, UV-valguse ega mehaaniliste löökide all.'},
      {q:'Kas saan kombineerida erinevaid liistustiile ühes kodus?', a:'Tehniliselt jah, kuid soovitame ühte stiili kogu eluruumi ulatuses. Kombinatsioon töötab, kui ruumid on selgelt eraldatud.'},
      {q:'Mis kõrgusega liist sobib paremini suuremasse tuppa?', a:'Suuremasse tuppa sobib kõrgem liist (120–200 mm). Madalama lae või väiksema ruumi puhul madalam liist (40–80 mm) või peitliist.'},
      {q:'Kas liistu peab värvima enne või pärast paigaldust?', a:'Soovitatav on viimistleda pärast paigaldust, et katta kruviaugud, vahed ja väikesed kahjustused.'},
      {q:'Kas alumiiniumist liistu saab värvida?', a:'Standardsed alumiiniumliistud on pulbervärvitud tehases. Soovitame tellida soovitud RAL-toonis liistud.'},
      {q:'Kas peitliist on samuti liigitatav põrandaliistuks?', a:'Peitliist on eriline alaliik — see on tehniliselt liist, kuid ulatub seina sisse, mitte sealt välja.'},
      {q:'Kui pikk on tavalise põrandaliistu eluiga?', a:'MDF-liist 8–15 aastat. Alumiinium 25+ aastat. Puit võib õige hoolduse korral kesta veelgi kauem.'},
    ]}/>

    <CTA setPage={setPage}/>
  </VpProse>;
}

/* ─────────────────────────────────────────────────────────
   POST 6 — Peitliistu 7 eelist (PDF 6)
   ───────────────────────────────────────────────────────── */
function PostBodyEelised({setPage}){
  const H2 = window.PostBlogH2, P = window.PostBlogP, Lead = window.PostBlogLead;
  const FaqBlock = window.PostBlogFaq;
  const CTA = window.PostBlogCTA, VpProse = window.VpProse;
  return <VpProse>
    <Lead>Kui rääkida puhastest ja kaasaegsetest interjööridest, on peitliist üks neist väikestest detailidest, millel on suur mõju.</Lead>
    <P>Erinevalt tavalisest põrandaliistust, mis ulatub ruumi sisse, paikneb peitliist seinaga ühel tasapinnal. Tulemuseks on katkematu üleminek, mis lisab nii koju kui ka ärihoonesse väärikust ja mõõdetud eleganssi. Esteetika on aga vaid üks osa loost — peitliistul on terve rida praktilisi eeliseid.</P>

    <H2>1. Sujuv, minimalistlik ilme</H2>
    <P>Peitliist toetab puhast ja minimalistlikku stiili, eemaldades traditsioonilise liistu massiivuse. See võimaldab seintel ja põrandatel loomulikult ja katkematult kohtuda. Tulemuseks on kompositsioon, kus tähelepanu jääb sellele, mis on tõeliselt oluline — arhitektuursetele ja dekoratiivsetele elementidele, mööblile, kunstile ja seinapindadele.</P>

    <H2>2. Suurem ruumitundlikkus</H2>
    <P>Sisearhitektuuris suudavad ka väikesed nüansid drastiliselt muuta ruumi tunnet. Peitliist loob illusiooni kõrgematest seintest ja ruumikamatest tubadest. See on eriti väärtuslik korterites või väikestes majades, kus iga sentimeeter ja iga visuaalne trikk loevad.</P>

    <H2>3. Kaitse ilma kompromissita</H2>
    <P>Kuigi peitliist näeb välja õrn, täidab ta jätkuvalt tavalise põrandaliistu funktsiooni — kaitseb seina alumist osa kraapide, löökide ja igapäevase kulumise eest. Olgu mõjutajaks mööbel, tolmuimeja või jalakäigu liiklus, peitliist pakub praktilist kaitset, ilma et see segaks disainivoogu.</P>

    <H2>4. Ajatu ja paindlik</H2>
    <P>Peitliistuga viimistletud kodu jääb ajakohaseks pikemaks ajaks. Selle puhas, lihtne kuju ei seo end ühegi konkreetse moe või stiiliga, vaid sobitub paindlikult muutuvate trendidega. Tahad sa muuta värvilahendust, vahetada mööblit või nihutada disainikeelt minimalismist tööstuslikku stiili — peitliist jääb ühtlasi sobivaks taustaks.</P>

    <H2>5. Sobib peidetud detailidega</H2>
    <P>Tahad vaja, et kaablid, valgustusribad või ventilatsioonielemendid jääksid silmavälja? Peitliist annab selleks ideaalse lahenduse. Selle konstruktsioon võimaldab integreerida peidetud uksi, sisseehitatud LED-ribasid või varjatud juhtmestikku. Tehnoloogia jääb peitu, kuid säilitab juurdepääsetavuse.</P>

    <H2>6. Lihtsam puhastamine ja hooldus</H2>
    <P>Ilma väljaulatuva ülaservata kaob ka koht, kus tolm muidu koguneda saab. Puhastus muutub lihtsamaks ja kiiremaks — tüüpilise tolmuimeja kitsa otsiku või lapikese liigutus üle vuugi on enamasti piisav. See on tundlik eelis allergiat põdevatele inimestele ja kommertsruumidele, kus puhtus on prioriteet.</P>

    <H2>7. Arhitektuurne väärtus</H2>
    <P>Peitliist on detail, mis viitab kõrgemale arhitektuursele kvaliteedile ja peensusele. See võib lisada kinnisvara tajutavat väärtust nii müügi- kui ka renoveerimisprojektis. Kui sa renoveerid eesmärgiga müüa või kui ehitad oma alaliseks koduks, on see investeering, mis tasub end ära nii esteetikas kui ka kinnisvara tunnetuses.</P>

    <H2>Kokkuvõte: investeering stiili ja funktsionaalsusesse</H2>
    <P>Need on vaid mõned paljudest põhjustest, miks peitliist on kasvanud kaasaegse siseviimistluse vaikimisi valikuks. Ta ei ainult tõsta ruumi visuaalset taset, vaid annab konkreetseid praktilisi eeliseid, mis muudavad selle nutikaks valikuks pikas perspektiivis.</P>

    <FaqBlock items={[
      {q:'Mis on peitliist?', a:'Peitliist on põrandaliistu lahendus, kus liist paikneb seinaga ühel tasapinnal, mitte ei ulatu seinast välja. See loob seina ja põranda vahele puhta vuugi.'},
      {q:'Kas peitliist sobib igasse kodusse?', a:'Peitliist sobib enamikku kaasaegsetesse kodudesse, eriti minimalistliku või puhta stiili interjööri. Ajaloolistes kodudes võib see vähem sobida.'},
      {q:'Kas peitliist on kallim kui tavaline põrandaliist?', a:'Jah, tavaliselt on materjali ja paigalduse kogukulu kõrgem. Pikas perspektiivis kompenseerib seda hooldusvabadus, eluiga ja kinnisvara väärtus.'},
      {q:'Kas peitliistu saab paigaldada olemasolevasse korterisse?', a:'Pinnale paigaldatav alumiiniumprofiil sobib olemasolevatesse ruumidesse hästi. Pahteldatav versioon vajab täisrenoveerimist.'},
      {q:'Kas peitliistu saab kombineerida LED-valgustusega?', a:'Jah, see on tegelikult üks selle kõige populaarsemaid kasutusi. Profiili sees on kanal LED-riba jaoks.'},
      {q:'Mis materjalist peitliist tüüpiliselt on?', a:'Kõige levinum on alumiinium (sulam 6063-T5), mis on tugev, kerge ja korrosioonikindel.'},
      {q:'Kas peitliist kogub tolmu vuugi sees?', a:'Mõnevõrra jah, kuid tunduvalt vähem kui tavaline põrandaliist. Puhastus on lihtne — tolmuimeja kitsa otsikuga kord paari kuu tagant.'},
      {q:'Kas peitliist tõstab kinnisvara väärtust?', a:'Peitliist annab arhitektuurset väärtust ja kaasaegset karakterit, mis võib aidata kinnisvara tajutavat kvaliteeditundlikkust tõsta.'},
    ]}/>

    <CTA setPage={setPage}/>
  </VpProse>;
}

/* ─────────────────────────────────────────────────────────
   POST 7 — Varjuvuugi tõus (PDF 7)
   ───────────────────────────────────────────────────────── */
function PostBodyStandard({setPage}){
  const H2 = window.PostBlogH2, P = window.PostBlogP, Lead = window.PostBlogLead;
  const UL = window.PostBlogUL;
  const FaqBlock = window.PostBlogFaq;
  const CTA = window.PostBlogCTA, VpProse = window.VpProse;
  return <VpProse>
    <Lead>Viimaste aastate jooksul on varjuvuuk muutunud kaasaegse sisearhitektuuri silmapaistvaks detailiks, haarates nii arhitektide kui ka disainerite tähelepanu.</Lead>
    <P>See minimalistlik element on ühtaegu funktsionaalne ja esteetiline uuendus, mis muudab ruumi tajumist ja kogemist.</P>

    <H2>Mis on varjuvuuk?</H2>
    <P>Sisuliselt on varjuvuuk teadlikult jäetud süvend kahe pinna vahel — näiteks seina ja põranda või ukse- ja aknaraamide ümber. See vuuk loob varju, mis lisab ruumile sügavust ja defineerib selle puhtaid jooni, mis on tihedalt seotud kaasaegse arhitektuuri keelega. Lihtne idee, suur mõju.</P>

    <H2>Visuaalne mõju ja esteetiline väärtus</H2>
    <P>Üks peamisi põhjuseid, miks varjuvuuk on populaarne, peitub selle võimes parandada ruumi üldist visuaalset taset. Eemaldades vajaduse traditsioonilise põrandaliistu, karniisi või arhitraavi järele, aitab varjuvuuk luua sujuva ja korrastatud ilme. Sellise minimalistliku lähenemise järele on kaasaegses disainis tugev nõudlus — sest tihti tähendab "vähem" tegelikult "rohkem".</P>
    <P>Kui traditsioonilised dekoratiivsed elemendid kaovad, tuleb esile arhitektuur ise — seinad, materjalid, ruumi proportsioonid. Tulemus on sidusam ja viimistletum esteetika, kus iga element on oma kohal.</P>

    <H2>Praktilised eelised</H2>
    <P>Lisaks väljanägemisele pakub varjuvuuk ka tegelikku funktsionaalsust. Vuuk võimaldab näiteks puidust põranda paisumist ja kahanemist materjali loomulike liikumiste käigus — mis hoiab ära pragude ja kõverumiste tekkimise aja jooksul.</P>
    <UL items={[
      <><strong>Peita pinna ebatasasuse</strong> (kõverad seinad, väikesed paigaldusvead)</>,
      <><strong>Lihtsustada värvimist</strong> (puudub teipimisvajadus, sein lõpeb selgelt servast)</>,
      <><strong>Vähendada tolmu kogumiskohti</strong> (pole väljaulatuvat ülaserva)</>,
    ]}/>
    <P>Need eelised teevad varjuvuugist atraktiivse valiku, kui otsida pikaajaliselt vastupidavat ja madalalt hooldatavat lahendust.</P>

    <H2>Arhitektide vaade</H2>
    <P>Arhitektidele on varjuvuuk eriline tööriist, mis aitab säilitada disaini terviklikkust. Traditsioonilised viimistlusdetailid — nagu karniisid ja paksud profiilid — võivad tihti tunduda hilisemate parandustena, mis lõhuvad disaini puhast eesmärki. Varjuvuuk on seevastu integreeritud projekti algusest peale, andes mõõdetud ja mõjusa võimaluse rõhutada ruumi proportsioone ja arhitektuurseid jooni.</P>
    <P>See on detail, mis koosneb pigem millegi puudumisest kui lisamisest — ja just see eemaldamise loogika annab talle tugevuse. Selle valib arhitekt, kes mõtleb disainile mitte juhusliku, vaid teadliku terviklikuna.</P>

    <H2>Mitmekülgsus erinevates ruumides</H2>
    <P>Varjuvuugi populaarsust toetab ka selle paindlikkus. Seda saab kasutada paljudes erinevates olukordades — eluruumides, kontorites, kommertsruumides ja avalikes hoonetes.</P>
    <UL items={[
      <><strong>Lae varjuvuuk</strong> — loob "hõljuva lae" efekti</>,
      <><strong>Põrandasokli varjuvuuk</strong> — asendab tavalist põrandaliistu</>,
      <><strong>Ukseraami ümbritsev varjuvuuk</strong> — loob raamita ukseava</>,
      <><strong>Seinapaneelide vahelised vuugid</strong> — eraldab materjale ja annab rütmi</>,
    ]}/>
    <P>Lihtsa kohandamise korral võib varjuvuuk täiendada peaaegu igat tüüpi kaasaegset disaini — minimalistlikust skandinaaviast tööstusliku eleganssini.</P>

    <H2>Kokkuvõte</H2>
    <P>Varjuvuuk on muutunud sisearhitektuuris märkimisväärseks detailiks, kuna see sobib täiuslikult kaasaegse soovi järele lihtsust, funktsionaalsust ja eleganssi. Tema võime tõsta nii ruumi esteetikat kui ka praktilisi omadusi muudab ta valikuks disaineritele, kes püüavad luua ajatuid ja mõjusaid interjööre.</P>

    <FaqBlock items={[
      {q:'Mis on varjuvuuk?', a:'Varjuvuuk on teadlikult jäetud süvend kahe pinna vahel — näiteks seina ja põranda, lae või ukseraami ümber. See loob varju, mis annab ruumile sügavust.'},
      {q:'Miks on varjuvuuk populaarsuse kasvanud?', a:'Selle põhjuseks on kaasaegne soov vähem dekoratiivsuse ja rohkem arhitektuurse selguse järele.'},
      {q:'Kus saab varjuvuuki kasutada?', a:'Kõige levinumalt põranda ja seina kohtumiskohas, aga ka lae ja seina kohtumiskohas, ukseraami ümber ning seinapaneelide vahel.'},
      {q:'Kas varjuvuuk on funktsionaalne või ainult esteetiline?', a:'Mõlemat. Esteetiliselt loob ta puhta ilme. Funktsionaalselt võimaldab ta materjali paisumist, lihtsustab värvimist ja aitab peita pinnamõõtmise ebatäpsusi.'},
      {q:'Kas varjuvuugi paigaldus on keeruline?', a:'Paigaldus eeldab täpsust ja sageli ka pahteldaja oskust. Uusarenduse käigus on parim aeg.'},
      {q:'Kas varjuvuuk sobib igasse stiili?', a:'Kõige paremini sobib kaasaegse, minimalistliku ja kommertsstiili juurde. Klassikalistes ja periood-stiilides võib konflikteeruda.'},
      {q:'Kas varjuvuuk on pikaajaline investeering?', a:'Jah. Õigesti paigaldatud varjuvuuk kestab aastakümneid. Selle minimalistlik stiil ei vana moe muutuste tõttu kiiresti.'},
      {q:'Kus enamasti kohtab varjuvuuki?', a:'Kaasaegsetes elamutes, kunstigaleriides, kõrgklassi kontorites, hotellides ja restoranides.'},
    ]}/>

    <CTA setPage={setPage}/>
  </VpProse>;
}

/* ─────────────────────────────────────────────────────────
   POST 0 (flagship) — Põhjalik juhend varjuprofiilidele
   Säilitatud kompaktne versioon olemasolevast md failist.
   ───────────────────────────────────────────────────────── */
function PostBodyVarjuprofiil({setPage}){
  const H2 = window.PostBlogH2, P = window.PostBlogP, Lead = window.PostBlogLead;
  const UL = window.PostBlogUL, Callout = window.PostBlogCallout;
  const Table = window.PostBlogTable, FaqBlock = window.PostBlogFaq;
  const CTA = window.PostBlogCTA, VpProse = window.VpProse;
  return <VpProse>
    <Lead>Kui sa renoveerid praegu korterit Tallinnas, Tartus või Pärnus ja sisearhitekt mainis sõna <strong>varjuprofiil</strong>, siis tõenäoliselt vaatasid ka tüüpilisi RAL-katalooge ja avastasid, et "valge" pole ainult üks toon.</Lead>
    <P>See artikkel on praktiline juhend ühest detailist, mis muudab korteri visuaalset standardit kogu ülejäänud aastakümneks. Varjuprofiil ei ole moeasi — see on konstruktiivne valik, mille tellija teeb enne pahteldajat.</P>

    <H2>Mis on varjuprofiil — 60 sekundi definitsioon</H2>
    <P>Varjuprofiil on alumiiniumist (või MDF-iga kombineeritud) sissepoole peitunud liist, mis paigaldatakse seina ja põranda kohtumisjoonele nii, et tavaline kõrge põrandaliist asendub 10–25 mm sügavuse varjuga. Tulemus: sein paistab "hõljuvat" põranda kohal — ujuva seina efekt.</P>

    <H2>Varjuprofiil vs traditsiooniline põrandaliist</H2>
    <Table headers={['Aspekt','Varjuprofiil','Tavaline põrandaliist']} rows={[
      ['Visuaal','Sirge joon, hõljuva seina efekt','Mahuga otsalt nähtav'],
      ['Tolm','Ei kogune ülaservale','Kogub ülaservale'],
      ['Mööbel','Flush vastu seina','10–15 mm vahega'],
      ['Värvimine','Sein profiili servani','Teipimine vajalik'],
      ['Vastupidavus','Alumiinium 25+ a','MDF 8–15 a'],
      ['Esmane hind','Suurem','Väiksem'],
      ['10 aasta vaade','Ühtegi remonti','1–2 ülevärvimist'],
      ['LED-integratsioon','Sisseehitatud kanaliga','Ei sobi'],
    ]}/>

    <H2>Neli tüüpi varjuprofiili</H2>
    <P><strong>1. Pahteldatav alumiiniumprofiil</strong> — klassikaline, profiil fikseeritakse enne kipsplaadi pahteldamist. Kõige puhtam joon, eluiga 25+ aastat.</P>
    <P><strong>2. Pinnale paigaldatav alumiiniumprofiil</strong> — sama esteetiline, paigaldatakse juba valmis seinale. Sobib renoveerimisele ilma seinu lammutamata.</P>
    <P><strong>3. Varjuprofiil LED-kanaliga</strong> — kanal sisseehitatud LED-ribale. Peegeldatud valgus suunatud üles vastu seina. Vajab eraldi 12V/24V toiteliini.</P>
    <P><strong>4. MDF-täitega kombineeritud profiil</strong> — alumiiniumi raam + värvitav MDF-täide. Veelgi peenem, sulab seinaga ühte. Veekindlus piiratud.</P>

    <H2>Eesti turu reaalsus</H2>
    <P><strong>Paneelmaja:</strong> seinad 3–8 mm kõverad. Pinnale paigaldataval profiilil tuleb seina lokaalselt pahteldada — lisatöö 1–2 tundi toa kohta.</P>
    <P><strong>Soome- ja Stalini-aegne tellis:</strong> sein niiske põranda lähedalt. Ainult alumiinium, mitte MDF-täitega.</P>
    <P><strong>Uusarendus 2020+:</strong> seinad sirged — pahteldatav profiil default. Otsustage projekteerimise faasis.</P>

    <H2>Paigaldus viies sammus</H2>
    <UL items={[
      <><strong>1. Lasermarkeerimine.</strong> Profiili kõrgus määratud põrandakatte paksusest + 3 mm tolerantsiga.</>,
      <><strong>2. Profiili lõikamine.</strong> Spetsiaalse alumiiniumiketta saega 45° nurkadel.</>,
      <><strong>3. Pahteldus</strong> (ainult tüüp 1). Pahtel viiakse profiili täpse servani.</>,
      <><strong>4. Värvimine.</strong> Sein värvitakse profiili servani. Profiili sisepind on tehasevärv.</>,
      <><strong>5. Põrandakatte paigaldus.</strong> Libistatakse profiili alla, vuuk 10/15/20 mm sügavuseks.</>,
    ]}/>

    <H2>Hind ja tasuvus</H2>
    <P>Varjuprofiil maksab 18–32 €/jm. Tavaline MDF-põrandaliist 6–12 €/jm. Materjali vahe ~150%, paigaldus +25%. <strong>Eluiga 3–4× pikem</strong>, ülevärvimise tsükkel langeb ära.</P>
    <Callout label="Tasuvuse loogika">
      10 aasta perspektiivis varjuprofiil ja tavaline põrandaliist on kulu poolest võrdsed. 25 aasta perspektiivis on varjuprofiil odavam.
    </Callout>

    <H2>Kolm levinud viga</H2>
    <P><strong>Viga 1:</strong> Varjuprofiili valib pärast värvimist. Otsus tuleb teha enne pahteldamist.</P>
    <P><strong>Viga 2:</strong> LED-kanaliga, kuid toiteliin unustatud. Elektriku skeem peab sisaldama varjuprofiilide toiteliini.</P>
    <P><strong>Viga 3:</strong> Tellib mustale seinale musta profiili "kontrasti pärast". Reegel: kontrast peab tulema seina ja profiili vahel, mitte profiili ja põranda vahel.</P>

    <H2>Millal varjuprofiil EI sobi</H2>
    <UL items={[
      'Suurema veekahju riskiga ruumid (sauna esik, vannitoa dušš)',
      'Renditav korter, omanik ei plaani 5+ aastat seista',
      'Periood- ja muinsuskaitsealune interjöör',
      'Müügiks ehitatud korterid alla 60 m² (hind ei toeta)',
    ]}/>

    <FaqBlock items={[
      {q:'Kas varjuprofiili saab paigaldada valmis korterisse?', a:'Jah, pinnale paigaldatav alumiiniumprofiil sobib täpselt. Pahteldamist ei vaja, paigaldus 1–2 tundi toa kohta.'},
      {q:'Kas varjuprofiili saab värvida üle seinaga sama tooniga?', a:'Alumiiniumprofiili sisepind on tehasevärv ja seda ei värvita üle. MDF-täitega versiooni saab värvida kohapeal.'},
      {q:'Kui kaua varjuprofiil vastu peab?', a:'Alumiinium 6063-T5 — 25+ aastat ilma hooldustöödeta. Pulbervärvi UV-kindlus 15+ aastat.'},
      {q:'Kas varjuprofiil sobib vannituppa?', a:'Alumiiniumist versioon sobib. LED-kanaliga ainult IP67-ribadega. MDF-täitega vannituppa ei sobi.'},
      {q:'Kui sügav peaks vuuk olema?', a:'Standardvalik 15 mm — universaalne. 10 mm minimalistlikum, 20–25 mm dramaatilisem ja sobib LED-kanaliga.'},
      {q:'Mille poolest "peitliist", "varjuliist" ja "varjuprofiil" erinevad?', a:'Tehniliselt sama toode, erinev nimetus. Meie kasutame "varjuprofiili" — see hõlmab ka lae- ja seinarakendusi.'},
    ]}/>

    <CTA setPage={setPage}/>
  </VpProse>;
}

window.PostBodyStiilid = PostBodyStiilid;
window.PostBodyEelised = PostBodyEelised;
window.PostBodyStandard = PostBodyStandard;
window.PostBodyVarjuprofiil = PostBodyVarjuprofiil;
