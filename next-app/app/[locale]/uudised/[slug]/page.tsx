import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { site } from '@/lib/site';
import JsonLd from '@/components/seo/JsonLd';

// Estonian month labels (from POSTS `yearEt`, e.g. "2026 · mai") → ISO month,
// so BlogPosting can carry an approximate datePublished.
const ET_MONTHS: Record<string, string> = {
  jaan: '01', veebr: '02', märts: '03', apr: '04', mai: '05', juuni: '06',
  juuli: '07', aug: '08', sept: '09', okt: '10', nov: '11', dets: '12',
};

function isoDateFromYearEt(yearEt: string): string | undefined {
  const [year, month] = yearEt.split('·').map((s) => s.trim().toLowerCase());
  if (!year) return undefined;
  const mm = month ? ET_MONTHS[month] : undefined;
  return mm ? `${year}-${mm}-01` : `${year}-01-01`;
}

// ── Markdown renderer ─────────────────────────────────────────────────────────
// Converts a subset of markdown (h2, h3, bold, italic, bullets) to JSX strings.
// Used server-side so we return React-renderable nodes, not dangerouslySetInnerHTML.

function renderInline(text: string): React.ReactNode {
  // Handle **bold** and *italic*
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    if (p.startsWith('*') && p.endsWith('*')) {
      return <em key={i}>{p.slice(1, -1)}</em>;
    }
    return p;
  });
}

function MarkdownBody({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);
  const nodes: React.ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length) {
      nodes.push(
        <ul key={nodes.length} style={{ paddingLeft: 20, margin: '0 0 24px', display: 'grid', gap: 8 }}>
          {listItems.map((li, j) => (
            <li key={j} style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)' }}>{renderInline(li)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('## ')) {
      flushList();
      nodes.push(
        <h2 key={nodes.length} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px, 3vw, 40px)', margin: '40px 0 16px', lineHeight: 1 }}>
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      nodes.push(
        <h3 key={nodes.length} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(22px, 2.5vw, 30px)', margin: '28px 0 12px', lineHeight: 1 }}>
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith('# ')) {
      // Skip h1 — already shown as page title
    } else if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
      flushList();
      nodes.push(
        <p key={nodes.length} style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted)', fontStyle: 'italic', margin: '0 0 24px' }}>
          {trimmed.slice(1, -1)}
        </p>
      );
    } else if (trimmed.split('\n').every(l => l.startsWith('- '))) {
      flushList();
      const items = trimmed.split('\n').map(l => l.slice(2).trim());
      nodes.push(
        <ul key={nodes.length} style={{ paddingLeft: 20, margin: '0 0 24px', display: 'grid', gap: 8 }}>
          {items.map((li, j) => (
            <li key={j} style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)' }}>{renderInline(li)}</li>
          ))}
        </ul>
      );
    } else if (trimmed.split('\n').every(l => /^\d+\.\s/.test(l))) {
      flushList();
      const items = trimmed.split('\n').map(l => l.replace(/^\d+\.\s/, '').trim());
      nodes.push(
        <ol key={nodes.length} style={{ paddingLeft: 20, margin: '0 0 24px', display: 'grid', gap: 8 }}>
          {items.map((li, j) => (
            <li key={j} style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)' }}>{renderInline(li)}</li>
          ))}
        </ol>
      );
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.slice(2).includes('**')) {
      // Standalone bold = question/emphasis block
      flushList();
      nodes.push(
        <p key={nodes.length} style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink)', fontWeight: 600, margin: '0 0 8px' }}>
          {trimmed.slice(2, -2)}
        </p>
      );
    } else if (trimmed.includes('|') && trimmed.includes('---')) {
      // Skip markdown tables
    } else {
      flushList();
      nodes.push(
        <p key={nodes.length} style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-2)', margin: '0 0 24px' }}>
          {renderInline(trimmed.replace(/\n/g, ' '))}
        </p>
      );
    }
  }
  flushList();
  return <>{nodes}</>;
}

// ── Blog post data ────────────────────────────────────────────────────────────

const POSTS: Record<string, {
  titleEt: string; titleRu: string;
  catEt: string;  catRu: string;
  yearEt: string; yearRu: string;
  read: string;
  cover: string;
  excerptEt: string; excerptRu: string;
  bodyEt: string;  bodyRu: string;
}> = {
  'varjuprofiil-pohjalik-juhend': {
    titleEt: `Põrandaliist, mida sa ei märka: täisjuhend varjuprofiilide valikule (2026)`,
    titleRu: `Плинтус, который не замечают: полный гид по выбору теневых профилей (2026)`,
    catEt: 'Juhend', catRu: 'Гид',
    yearEt: '2026 · mai', yearRu: '2026 · май',
    read: '10 min',
    cover: '/assets/projects/projekt01.webp',
    excerptEt: `Mis on varjuprofiil, kuidas see asendab põrandaliistu ja millised tüübid sobivad Eesti korterisse?`,
    excerptRu: `Что такое теневой профиль, как он заменяет плинтус и какие типы подходят для эстонской квартиры?`,
    bodyEt: `*Lugemisaeg ~10 min · Juhend · Toimetanud PROSPACE salongi tehnoloog*

Kui sa renoveerid praegu korterit Tallinnas, Tartus või Pärnus ja sisearhitekt mainis sõna **varjuprofiil**, siis tõenäoliselt vaatasid ka tüüpilisi RAL-katalooge ja avastasid, et "valge" pole ainult üks toon. Tegelikult on teil korraga otsustamisel kaks asja: milline põrandaliist ja milline visuaalne rütm seina ja põranda vahel jääb.

See artikkel on praktiline juhend ühest detailist, mis muudab korteri visuaalset standardit kogu ülejäänud aastakümneks. Varjuprofiil ei ole moeasi. See on **konstruktiivne valik**, mille tellija teeb enne pahteldajat — ja siis enam tagasi ei keera.

## Mis on varjuprofiil — 60 sekundi definitsioon

Varjuprofiil on **alumiiniumist (või MDF-iga kombineeritud) sissepoole peitunud liist**, mis paigaldatakse seina ja põranda kohtumisjoonele nii, et sein ei jätku enam tavalise põrandaliistuga, vaid jätab ca 10–25 mm sügavuse varju, mis joonistab seina ja põranda vahele puhta horisontaaljoone.

Tulemus: sein paistab "hõljuvat" põranda kohal. Sisearhitektide žargoonis — *ujuva seina efekt*. Tehniliselt — **varjuvuuk**. Inglise keeles tuntud kui *shadow gap skirting* või *recessed skirting*.

Erinevus tavalisest põrandaliistust on lihtne:

- **Tavaline põrandaliist** istub seina **peal** ja ulatub 10–15 mm ruumi sisse.
- **Varjuprofiil** istub seina **sees**, jättes maha vuugi, mis loob varju.

Ülejäänud artikkel on detailides.

## Varjuprofiil vs traditsiooniline põrandaliist

Lühike võrdlus, mida tellijatele salongis näitame:

| Aspekt | Varjuprofiil (peitliist) | Tavaline põrandaliist |
|---|---|---|
| Visuaal | Sirge joon, ujuva seina efekt | Liistu mahuga otsalt nähtav |
| Tolm | Ei kogune ülaservale | Kogub ülaservale (allergikutele oluline) |
| Mööbli paigutus | Mööbel istub seinale flush | Mööbel ja sein 10–15 mm vahega |
| Värvimine | Sein värvitakse profiili servani — teipi pole vaja | Teipida tuleb, ülaserv on alati nähtav |
| Vastupidavus | Alumiinium ei mõlgu, ei rebene, ei lähe niiskusest paiste | MDF/puit võivad veekahju puhul paisuda |
| Esmane investeering | Suurem (materjal + täpsem paigaldus) | Väiksem |
| Kümne aasta vaade | Ühtegi remonti ei vaja | Üks-kaks ülevärvimist tüüpiliselt |
| Sobib aega | Sobib uue rajamise ja täisrenoveerimisega | Sobib ka väikerenoveerimisega |
| LED-i integratsioon | Sisseehitatud kanaliga olemas | Ei sobi |

**Olulisem järeldus võrdlustabelist** kui hind: varjuprofiil otsustatakse **enne pahteldamist**. Tavaline põrandaliist otsustatakse pärast värvimist. See viib kaks vestlust eri ajahetkedele — ja seega tuleb varjuprofiili teema tõsta lauale juba projektiarutelu esimeses pooles.

## Neli tüüpi varjuprofiili — milline kuhu sobib

Kõik varjuprofiilid ei tee sama tööd. Eestis on praktikas turul neli põhitüüpi.

### 1. Pahteldatav alumiiniumprofiil (plaster-in)

Klassikaline, kõige puhtam lahendus. Profiil fikseeritakse seinale **enne kipsplaadi pahteldamist**. Pahteldaja töötab profiili servani, nii et tulemus on ühtlane sein, mis lõpeb sirgelt vuuga. Joon on lasertäpne, sest profiil ise on lasertäpne.

- **Plussid:** kõige puhtam joon, vastupidavus 25+ aastat, parim hind/tulemus-suhe pikas vaates
- **Miinused:** vajab planeerimist, sobib uusarendusele ja täisrenoveerimisele
- **Soovitatav:** elutuba, magamistuba, koridor, hotellikoridor

### 2. Pinnale paigaldatav alumiiniumprofiil

Sama esteetiline tulemus, kuid paigaldatakse **juba pahteldatud ja värvitud** seinale liimi või kruvidega. Joon on natuke pehmem (jääb ca 1–2 mm väiksem vuugiga sügavus), kuid renoveerimisel olemasoleva korteri jaoks ainus mõistlik valik.

- **Plussid:** sobib renoveerimisele ilma seinu lammutamata, paigaldus 1–2 tunni jooksul ühe toa kohta
- **Miinused:** veidi vähem dramaatiline efekt kui pahteldataval
- **Soovitatav:** olemasoleva korteri täiendus, kus pahteldajat sisse ei toodud

### 3. Varjuprofiil LED-kanaliga

Sama põhilahendus, kuid profiili sees on kanal LED-ribale. Tulemus on **peegeldatud valgus** — LED on suunatud üles vastu seina, vaade põranda poolt valgusallikat ei näe, kuid sein helendab pehmelt.

- **Plussid:** öövalgus koridorides, dramaatiline efekt elutoas, asendab täielikult plinthuse + seinapealse LED-profiili
- **Miinused:** vajab eraldi 12V/24V toiteliini, profiili sügavus 25+ mm
- **Soovitatav:** koridor, trepiastme alumine joon, hotellituba, vannitoa "kuivem nurk"

### 4. MDF-täitega kombineeritud profiil

Alumiiniumist raam + MDF-iga täidetud keskosa, mille saab värvida sama tooniga kui sein. Visuaalselt **veelgi peenem** kui puhtalt alumiinium, sest täiteosa kaob tasapinnaliselt seinaga ühte. Pakub kompromissi, kui klient tahab "peaaegu nähtamatut" liistu.

- **Plussid:** kompaktne profiil, värvib seinatooniga ühte, soojem materjalitunnetus
- **Miinused:** veekindlus piiratud — köök, vannituba on välistatud
- **Soovitatav:** elutuba, magamistuba, kontori esindusala

## Eesti turu reaalsus — paneelmaja, betoonsein, kõverus

Selles peatükis räägime asju, mida UK ja Hiina katalooge lugedes ei leia. Eesti korterite tegelikkus ei ole arhitekti renderdus.

**Paneelmaja:** seinad on tihti **3–8 mm kõverad** ühe seina ulatuses. Lasertasandile asetatud profiil näitab seda kohe. Lahendus: pinnale paigaldataval profiilil tuleb seina lokaalselt välja pahteldada ühe joone ulatuses 5 cm laiuselt. Lisatöö 1–2 tundi toa kohta, kuid tulemus on lõplik.

**Soome- ja Stalini-aegne tellis:** sein on tihti **niiske põranda lähedalt** (ka heas korras majades). Soovitame *ainult* alumiiniumi, mitte MDF-iga kombineeritud profiili. Niiskus alumiiniumi ei söö.

**Uusarendus, 2020+:** seinad sirged, lagi rajatud — pahteldatav profiil on default-valik. Otsustage projekteerimise faasis, mitte hiljem.

**Renoveerimine:** kui põrandakatet ei vaheta, on varjuprofiil paigaldatav ka eelmisele põrandale, kuid vuugi sügavus muutub väiksemaks. Tavaliselt soovitame seda projektidesse, kus uus parkett või vinüül paigaldatakse korraga.

## Paigaldus viies sammus

Lühidalt, mis järjekorras asjad juhtuvad. Pikem versioon meie paigaldusjuhendis.

1. **Lasermarkeerimine.** Profiili kõrgus on määratud lähtudes põrandakatte paksusest + 3 mm tolerantsiga. Joon kantakse kogu toa perimeetril.
2. **Profiili lõikamine ja paigaldus.** Profiil lõigatakse spetsiaalse alumiiniumiketta saega 45° nurkadel. Kruvitakse seina (puidust roovile) või liimitakse betoonseina.
3. **Pahteldus (ainult tüüp 1 puhul).** Pahtel viiakse profiili täpse servani. Pahteldajalt küsige eelnevalt referentse — see ei ole tavaline põrandaliistu paigaldus.
4. **Värvimine.** Sein värvitakse profiili servani. Profiili sisepind on tehasevärv (RAL), seda ei värvita.
5. **Põrandakatte paigaldus.** Põrandakate libistatakse profiili alla, vuuk jääb täpselt 10/15/20 mm sügavuseks.

Üks päev paigaldust toa kohta, kui paigaldaja teab, mida teeb. Kaks päeva, kui ta seda esimest korda teeb. Sellepärast eelistame paigaldajaid, kes on PROSPACE'is läbinud meie varjuprofiilide juhise. Nimekiri on lehel.

## Värv ja viimistlus

Standardvalik on **RAL 9016 (transpordivalge)** — vastab kõige paremini tavalisele seinavärvile. Praktikas peaaegu 70% projektidest kasutab seda.

Teine populaarne valik on **RAL 9005 (sügav must)**, mida sisearhitektid kombineerivad valge seinaga, et joon oleks veel dramaatilisem. *Tehniline märkus:* "must" RAL-is on tegelikult 4–5 erinevat tooni. RAL 9005 on neist sügavaim, peaaegu ilma sinise/halli vihjeta. Kui näete katalogis "musta" lihtsalt, küsige RAL-koodi.

Eritellimusel pulbervärvime mistahes RAL-tooni — 213 standardvärvi ja praktiliselt iga eritellimus on võimalik. Tarneaeg eritellimusele 2–3 nädalat.

## Hind ja tasuvus

Aus number. Varjuprofiil maksab Eesti turul ca **18–32 €/jm** olenevalt tüübist (LED-kanaliga rohkem). Tavaline MDF-põrandaliist on **6–12 €/jm**. Hinna vahe materjali eest ~150%, kuid:

- Paigaldus on **kallim** ~25% (vajab täpsemat tööd)
- Eluiga on **3–4× pikem**, ülevärvimise tsükkel langeb ära
- Eluasemete järelturul tõstab varjuprofiilide olemasolu tajutavat kvaliteeditasandit, mida hindavad ka **välismaiselt taustaga ostjad** (väga oluline Tallinna kesklinna ja Tartu kesklinna projektides, kus rahvusvaheline ostjate osakaal kasvab)

Tasuvuse loogika: 10 aasta perspektiivis varjuprofiil ja tavaline põrandaliist on **kulu poolest võrdsed**. 25 aasta perspektiivis on varjuprofiil **odavam**.

## Kolm levinud viga, mida tellija teeb

Need on tegelikud vead, mida oleme salongis kolme aasta jooksul näinud.

**Viga 1: Valib varjuprofiili pärast värvimist.**
Tellija värvib seinad, kutsub paigaldaja, paigaldaja küsib "kus profiili joon läheb." Profiili joon läheb seal, kuhu ta ehituslikult mahub — ja kahjuks see jääb tihti 10 mm seinapinnast välja. Lahendus: varjuprofiil otsustatakse **enne pahteldamist**, vähemalt enne värvimist.

**Viga 2: Valib LED-kanaliga, kuid unustab toiteliini.**
LED-kanaliga profiil on hea idee, kuid see vajab 12V/24V toidet, mis tähendab juhtmevedu seinast välja. Kui elektrikuga ei räägitud paigaldusplaani, tuleb hiljem välispealne juhe — mis tapab kogu efekti. Lahendus: elektriku skeem peab sisaldama varjuprofiilide toiteliini.

**Viga 3: Tellib mustale seinale musta profiili "kontrasti pärast."**
Mõni juhtum: jah, väga ilus. Enamuses: must-must muutub müraks ja varjujoon kaob. Reegel: kontrast peab tulema **seina ja profiili vahel**, mitte profiili ja põranda vahel. Tüüpiline võitja kombinatsioon: hele sein + RAL 9005 must profiil + tume parkett.

## Millal varjuprofiil EI sobi

Aus piir. Mõnel juhul on tavaline põrandaliist endiselt parem.

- **Suuremad veekahju riskiga ruumid** (vannituba duši lähedal, sauna esik) — kasutage alumiiniumi LED-ita versiooni või jätke traditsiooniline lahendus.
- **Renditav korter, kus omanik ei plaani 5+ aastat seista** — investeering ei jõua tagasi tulla.
- **Periood- ja muinsuskaitsealune interjöör** — varjuprofiil rikub stiili. Klassikalised liistud on siin õige valik.
- **Kiired müügiks ehitatud korterid (alla 60 m²)** — turu hind ei toeta lisahinda. Kui te ehk arendaja, kõnelgem otse.

Ülejäänud juhtudel — elamu kvaliteetne renoveerimine, uusarendus, kontor, hotell, restoran — varjuprofiil on parem valik.

## Mis järgmiseks

Kui jõudsite siiani, on teil põhjalik pilt sellest, mida varjuprofiil teeb, miks see maksab rohkem ja millal see tasub. Järgmine konkreetne samm on **näha materjali käes** — RAL-toonid eristuvad kataloogist täpselt nii palju, kui me ütleme.

**[CTA]**

> **Salong:** Tallinn, Tehnika 14. Avatud E–R 10–18, L 11–16.
> **Tasuta projektikonsultatsioon:** üks tund, varjuprofiili näidised, lihtne kalkulatsioon teie korteri jaoks.
> **Broneeri:** [varjuprofiilid.ee/broneerime](#) · või helista +372 5XXX XXXX

---

## 5) FAQ (otse postituse lõppu, eraldi blokina)

**Kas varjuprofiili saab paigaldada juba valmis korterisse?**
Jah, pinnale paigaldatav alumiiniumprofiil sobib täpselt selleks. Pahteldamist pole vaja, paigaldus ühe toa kohta ca 1–2 tundi. Vuugi sügavus jääb 10–15 mm.

**Kas varjuprofiili saab värvida üle seinaga sama tooniga?**
Alumiiniumprofiili sisepind on tehasevärv ja seda ei värvita üle. MDF-täitega versiooni saab värvida kohapeal — see ongi mõte: täiteosa sulab seinaga ühte ja jääb nähtavaks ainult vuugi vari.

**Kui kaua varjuprofiil vastu peab?**
Alumiinium 6063-T5 sulamist toodetud profiili eluiga on 25+ aastat ilma hooldustöödeta. Pulbervärvi UV-kindlus on 15+ aastat. Praktikas — kogu korteri eluea, ülevärvimist ei vaja.

**Kas varjuprofiil sobib vannituppa?**
Alumiiniumist versioon sobib (korrosioonikindel). LED-kanaliga ainult IP67-ribadega ja kuiva tsooni piiri arvestades. MDF-täitega versioon vannituppa **ei sobi**.

**Kui sügav peaks vuuk olema?**
Standardvalik 15 mm — universaalne. 10 mm on minimalistlikum, sobib madalama lae jaoks. 20–25 mm on dramaatilisem, sobib LED-kanaliga ja kõrgemate lagedega ruumidesse (alates 2,7 m).

**Kas LED-valgustusega varjuprofiil tarbib palju elektrit?**
Ei. 24V LED-riba 9,6 W/m, koridoris 5 m = 48 W. Tunni kulu ~0,01 kWh, ehk aastas ~10 €, kui 8 h päevas. Vähem kui üks põrandalamp.

**Mille poolest "peitliist", "varjuliist" ja "varjuprofiil" erinevad?**
Tehniliselt sama toode, erinev nimetus. *Peitliist* on tõlkeline (recessed skirting). *Varjuliist* on rahvalik. *Varjuprofiil* on tööstuslik, tehniliselt täpsem termin. Meie kasutame "varjuprofiili", sest see hõlmab ka lae- ja seinarakendusi.

**Kas paigaldama peab spetsialist?**
Pahteldatava versiooni puhul jah — pahteldaja peab teadma, kuidas profiili servani töötada. Pinnale paigaldatava versiooni puhul saab kogenud DIY-tegija ka ise hakkama. Lasertasand ja täpne saag on miinimumvarustus.

**Kas varjuprofiil aitab kõvera seina puhul?**
Osaliselt. Profiil ise on sirge ja näitab kõveruse väga selgelt välja. Kõvera seina puhul tuleb seina lokaalselt välja pahteldada ühe joone ulatuses. Tavalise põrandaliistuga see töö ära jääb — see on aus erinevus.

**Mis on varjuprofiili miinimum tellimusmaht?**
Standardprofiilil — alates ühest jooksevmeetrist, 2 m ja 2,5 m pikkused tükid laos. Eritellimusel (mittetavaline RAL) — alates 50 jm, tarneaeg 2–3 nädalat.

---

## 6) Schema FAQ JSON-LD (lisa \\\`<head>\\\` sisse)

\\\`\\\`\\\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kas varjuprofiili saab paigaldada juba valmis korterisse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jah, pinnale paigaldatav alumiiniumprofiil sobib täpselt selleks. Pahteldamist pole vaja, paigaldus ühe toa kohta ca 1–2 tundi. Vuugi sügavus jääb 10–15 mm."
      }
    },
    {
      "@type": "Question",
      "name": "Kas varjuprofiili saab värvida üle seinaga sama tooniga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alumiiniumprofiili sisepind on tehasevärv ja seda ei värvita üle. MDF-täitega versiooni saab värvida kohapeal — täiteosa sulab seinaga ühte ja nähtavaks jääb ainult vuugi vari."
      }
    },
    {
      "@type": "Question",
      "name": "Kui kaua varjuprofiil vastu peab?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alumiinium 6063-T5 profiili eluiga on 25+ aastat ilma hooldustöödeta. Pulbervärvi UV-kindlus on 15+ aastat. Praktikas kogu korteri eluea, ülevärvimist ei vaja."
      }
    },
    {
      "@type": "Question",
      "name": "Kas varjuprofiil sobib vannituppa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alumiiniumist versioon sobib, kuna materjal on korrosioonikindel. LED-kanaliga ainult IP67-ribadega ja kuiva tsooni piiri arvestades. MDF-täitega versioon vannituppa ei sobi."
      }
    },
    {
      "@type": "Question",
      "name": "Kui sügav peaks vuuk olema?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standardvalik 15 mm on universaalne. 10 mm on minimalistlikum, sobib madala lae jaoks. 20–25 mm on dramaatilisem, sobib LED-kanaliga ja kõrgemate lagedega ruumidesse alates 2,7 m."
      }
    },
    {
      "@type": "Question",
      "name": "Kas LED-valgustusega varjuprofiil tarbib palju elektrit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ei. 24V LED-riba 9,6 W/m, koridoris 5 m = 48 W. Aastas ca 10 €, kui valgustus põleb 8 tundi päevas. Vähem kui üks põrandalamp."
      }
    },
    {
      "@type": "Question",
      "name": "Mille poolest peitliist, varjuliist ja varjuprofiil erinevad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tehniliselt sama toode, erinev nimetus. Peitliist on tõlkeline termin, varjuliist on rahvalik, varjuprofiil on tehniliselt täpsem ja hõlmab ka lae- ja seinarakendusi."
      }
    },
    {
      "@type": "Question",
      "name": "Kas paigaldama peab spetsialist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pahteldatava versiooni puhul jah — pahteldaja peab teadma, kuidas profiili servani töötada. Pinnale paigaldatava versiooni puhul saab kogenud DIY-tegija ka ise hakkama, lasertasand ja täpne saag on miinimumvarustus."
      }
    },
    {
      "@type": "Question",
      "name": "Kas varjuprofiil aitab kõvera seina puhul?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Osaliselt. Profiil on sirge ja näitab kõveruse selgelt välja. Kõvera seina puhul tuleb seina lokaalselt välja pahteldada ühe joone ulatuses. Tavalise põrandaliistuga see töö ära jääb."
      }
    },
    {
      "@type": "Question",
      "name": "Mis on varjuprofiili miinimum tellimusmaht?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standardprofiilil alates ühest jooksevmeetrist, 2 m ja 2,5 m pikkused tükid on laos. Eritellimusel mittetavalise RAL värvi puhul alates 50 jm, tarneaeg 2–3 nädalat."
      }
    }
  ]
}
</script>
\\\`\\\`\\\`

---

## 7) Sisemiste linkide ja meta soovitused (boonus)

**URL slug:** \\\`/blogi/varjuprofiil-pohjalik-juhend-2026/\\\`

**Soovitavad sisemised lingid postituse sees:**
- "alumiinium 6063-T5" → tooteleht
- "RAL 9016", "RAL 9005" → kataloog filtriga
- "LED-kanaliga" → vastav kategooria
- "tasuta projektikonsultatsioon" → broneerimine
- "paigaldusjuhend" → blogi/paigaldus
- "PROSPACE salong" → kontakt

**Soovitatav hero pilt** (alt-tekst): \\\`Varjuprofiil põrandaliistu asemel — ujuva seina efekt elutoas, RAL 9016 valge sein ja tume parkett\\\`

**Sõnade arv:** põhitekst ~2 100 sõna, FAQ-iga koos ~2 450 sõna — sihtpiirkonnas.

**E-E-A-T signaal:** lisada lõppu autori kast — *Mait Kütt, PROSPACE tehnoloog, 8 aastat varjuprofiilide paigaldusega* + LinkedIn-link.`,
    bodyRu: `Если вы сейчас ремонтируете квартиру в Таллинне, Тарту или Пярну, и дизайнер интерьера упомянул слово теневой профиль, то, скорее всего, вы уже посмотрели типовые каталоги RAL и обнаружили, что «белый» — это не один оттенок.

    Эта статья — практическое руководство по одной детали, меняющей визуальный стандарт квартиры на всё следующее десятилетие. Теневой профиль — не модный аксессуар, а конструктивный выбор, который заказчик делает до шпаклёвщика.

## Что такое теневой профиль — определение за 60 секунд

    Теневой профиль — это алюминиевый (или в сочетании с MDF) утопленный плинтус, который устанавливается на стыке стены и пола так, что обычный высокий плинтус заменяется тенью глубиной 10–25 мм. Результат: стена кажется «парящей» над полом — эффект плавающей стены.

## Теневой профиль vs обычный плинтус

## Четыре типа теневого профиля

    1. Прошпаклёвываемый алюминиевый профиль — классика, профиль фиксируется до шпаклёвки гипсокартона. Самая чистая линия, срок службы 25+ лет.

    2. Алюминиевый профиль с видимым монтажом — та же эстетика, ставится на уже готовую стену. Подходит для реновации без сноса стен.

    3. Теневой профиль с LED-каналом — встроенный канал для LED-ленты. Отражённый свет направлен вверх к стене. Требует отдельной линии 12В/24В.

    4. Комбинированный профиль с MDF-заполнением — алюминиевая рамка + окрашиваемое MDF-заполнение. Ещё деликатнее, сливается со стеной. Влагостойкость ограничена.

## Реалии эстонского рынка

    Панельный дом: стены кривые на 3–8 мм. У профиля с видимым монтажом стену придётся локально шпаклевать — дополнительная работа 1–2 часа на комнату.

    Финский и сталинский кирпич: стена влажная у пола. Только алюминий, не с MDF-заполнением.

    Новостройка 2020+: стены ровные — прошпаклёвываемый профиль по умолчанию. Решайте на стадии проектирования.

## Монтаж в пять шагов

## Цена и окупаемость

    Теневой профиль стоит 18–32 €/пог.м. Обычный MDF-плинтус — 6–12 €/пог.м. Разница в материалах ~150%, монтаж +25%. Срок службы в 3–4 раза дольше, цикл перекраски отпадает.

      В перспективе 10 лет теневой профиль и обычный плинтус равны по затратам. В перспективе 25 лет теневой профиль дешевле.

## Три распространённые ошибки

    Ошибка 1: Выбирают теневой профиль после покраски. Решение нужно принять до шпаклёвки.

    Ошибка 2: С LED-каналом, но забыли линию питания. Схема электрика должна включать линию питания для теневых профилей.

    Ошибка 3: Заказывают чёрный профиль на чёрную стену «ради контраста». Правило: контраст должен быть между стеной и профилем, а не между профилем и полом.

## Когда теневой профиль НЕ подходит

    - Помещения с высоким риском водного ущерба (предбанник сауны, душ в ванной)
- Съёмная квартира — собственник не планирует жить 5+ лет
- Эпохальные и охраняемые интерьеры
- Квартиры для продажи площадью менее 60 м² (цена не оправдается)

## Часто задаваемые вопросы

**Можно ли установить теневой профиль в готовую квартиру?**
Да, алюминиевый профиль с видимым монтажом подходит идеально. Шпаклёвка не нужна, монтаж 1–2 часа на комнату.

**Можно ли перекрасить теневой профиль в тон стены?**
Внутренняя поверхность алюминиевого профиля — заводская окраска, её не перекрашивают. Версию с MDF-заполнением можно красить на месте.

**Какой срок службы у теневого профиля?**
Алюминий 6063-T5 — 25+ лет без обслуживания. УФ-стойкость порошковой краски — 15+ лет.

**Теневой профиль подходит для ванной?**
Алюминиевая версия — подходит. С LED-каналом — только с лентами IP67. Версия с MDF-заполнением для ванной не подходит.

**Какой глубины должен быть шов?**
Стандартный выбор — 15 мм, универсален. 10 мм — более минималистично, 20–25 мм — драматичнее и подходит для LED-канала.

**Чем «скрытый плинтус», «теневой плинтус» и «теневой профиль» отличаются?**
Технически один и тот же продукт, разные названия. Мы используем «теневой профиль» — включает также потолочные и настенные применения.

window.PostBodyStiilidRu = PostBodyStiilidRu;
window.PostBodyEelisedRu = PostBodyEelisedRu;
window.PostBodyStandardRu = PostBodyStandardRu;`,
  },
  'varjuprofiili-tuubid': {
    titleEt: `Varjuprofiilide erinevad tüübid: juhend kaasaegseks siseviimistluseks`,
    titleRu: `Разные типы теневых профилей: гид по современной отделке`,
    catEt: 'Tüübivalik', catRu: 'Типы',
    yearEt: '2026 · apr', yearRu: '2026 · апр',
    read: '7 min',
    cover: '/assets/projects/projekt02.webp',
    excerptEt: `Standardne, LED-iga ja MDF-täitega varjuprofiil — kolm peamist lahendust.`,
    excerptRu: `Стандартный, с LED и с MDF-заполнением — три основных решения.`,
    bodyEt: `Varjuprofiilid on muutunud kaasaegse siseviimistluse iseloomulikuks detailiks. Need pakuvad minimalistlikku esteetikat, mis tugevdab nii ruumitunnetust kui ka valguse mängu igas tuasis. Olgu tegu kodu uuendamise või ärihoone projekteerimisega — õigeks tooteks osutub see varjuprofiili tüüp, mis vastab täpselt teie kasutusvajadusele. Allpool tutvustame kolme põhilist lahendust, mida Eesti turul kohtab kõige sagedamini.

## 1. Standardne varjuprofiil

Standardne varjuprofiil on elegantne ja peen lahendus, mis tekitab seina ja põranda vahele märkamatu vuugi. See loob illusiooni, nagu sein hõljuks põranda kohal. Profiil on enamasti valmistatud alumiiniumist, mis tagab vastupidavuse, niiskuskindluse ja minimaalse hoolduse vajaduse.

Profiil on saadaval erinevates kõrgustes ja seda saab pulbervärvida ükskõik millises RAL-toonis, et see sobituks teie interjööriga. Standardne mudel sobib eriti hästi neile, kes otsivad puhast ja kaasaegset ilmet ilma lisafunktsioonideta — see on tasakaalukas vaikne valik, mida ei pea esile tõstma.

**Sobib kõige paremini:**
- Minimalistlikele elu- ja magamistubadele
- Kontoritele, kus on oluline puhas joon
- Koridoridele ja avalikele ruumidele

## 2. Sisseehitatud LED-valgustusega varjuprofiil

Need, kes soovivad ruumile lisada miljööd ja meeleolu, leiavad LED-valgustusega varjuprofiilist suurepärase lahenduse. Sellistes mudelites on alumiiniumkonstruktsiooni sisse integreeritud kanal, kuhu paigaldatakse LED-riba. See suunab pehme kaudse valguse seina poole, rõhutab varjuvuuki ja loob soojaltkutsuva atmosfääri.

Konstruktsiooni alus on jätkuvalt alumiiniumist, mis tagab pikaajalise tugevuse. Sisseehitatud läätsekaitse hajutab valgust ühtlaselt ja kaitseb LED-riba mehaaniliste mõjude eest. Saadaval on erinevad mudelid, mida saab pulbervärvida vastavalt projekti värvilahendusele.

**Tüüpilised kasutusalad:**
- Koridorid ja trepiastmed (öövalgus)
- Magamistoad pehme öise valgustusega
- Hotellitoad ja restoraniinterjöörid
- Arhitektuurselt tähelepanu väärivad seinad

## 3. MDF-täitega varjuprofiil

MDF-täitega varjuprofiil on hübriidlahendus, kus alumiiniumi täpsus ja sirgus ühenduvad puidu soojuse ja kohapeal viimistlemise võimalusega. Alumiiniumraam annab konstruktsioonile vastupidavuse, samas kui sisemine MDF-täidis võib olla seinaga ühte värvi värvitud, mis loob ühtse pinna.

Selline kombinatsioon sobib kõige paremini neile, kes hindavad minimalismi puhtaid jooni, kuid soovivad sinna juurde lisada veidi puidu pehmust ja tekstuuri. Tooteid on saadaval erinevates mõõtudes ning täidiseosa saab kohandada vastavalt kliendi soovile.

**Märkused:**
- Värvige täidis matt-tasemel viimistlusega, mis vastab seinavärvile
- Vältige kasutamist kõrge niiskusega ruumides (vannitoad, saunaeesruumid)
- Sobib elutubadesse, magamistubadesse ja esindusaladele

## Paigaldusjuhised varjuprofiilidele

Korrektne paigaldus tagab puhta lõpptulemuse ja pika eluea. Allpool on viis põhisammu, mida iga paigaldaja peaks järgima.

1. **Ettevalmistus.** Veenduge, et sein ja põrand on puhtad, kuivad ja tasaselt loodis.
2. **Mõõtmine.** Kasutage lasertasandit, et märkida ühtlane joon kogu paigaldushöögusele.
3. **Lõikamine.** Mõõtke profiilid täpselt vajalikule pikkusele, arvestades nurkasid ja painutusi.
4. **Kinnitamine.** Fikseerige profiilid seinale kruvide, naelade või liimiga — sõltuvalt aluse tüübist. Kontrollige iga lõigu loodisust.
5. **Viimistlus.** Kui plaanite profiili värvida või täiendavalt viimistleda, kasutage materjalile sobivat krunti enne pinnakihi pealekandmist.

## Miks valida varjuprofiil

Varjuprofiilide populaarsus pole juhus. Neil on mitu eelist, mis muudavad need kaasaegse siseviimistluse loomulikuks valikuks.

- **Kaasaegne esteetika.** Sirged, puhtad jooned, mis sobivad nii minimalistlikku kui ka rikkalikumasse interjööri.
- **Lisavalgustuse võimalus.** LED-integratsioon loob soojaltkutsuva pinnavalgustuse.
- **Vastupidavus.** Alumiiniumist konstruktsioon ei kannata niiskuse ega kulumise all.
- **Kohandatavus.** Mõõdud, värvid ja viimistlused on muudetavad vastavalt projektile.

**[CTA]**

> Soovid näha varjuprofiile käes ja võrrelda neid omavahel?
> Tule Tehnika 14 salongi Tallinnas, broneeri tasuta konsultatsioon või saada päring oma projekti kohta. Aitame leida lahenduse, mis sobib täpselt teie ruumile.

---

## KKK

**Millest varjuprofiilid valmistatakse?**
Enamus kvaliteetseid varjuprofiile on valmistatud ekstrudeeritud alumiiniumist (sulam 6063-T5), mis on vastupidav, kerge ja korrosioonikindel. MDF-täitega versioonides kasutatakse alumiiniumraami koos kohapeal viimistletava MDF-iga.

**Kas varjuprofiili saab värvida soovitud tooniga?**
Jah. Alumiiniumprofiilid pulbervärvitakse tehases ükskõik millises RAL-toonis. MDF-täitega versiooni täideosa saab kohapeal värvida, et see seinaga ühte sulaks.

**Kas LED-valgustusega varjuprofiil sobib igasse ruumi?**
LED-valgustusega versioon sobib enamikku kuivadest ruumidest. Niiskemates ruumides (vannitoad) tuleb kasutada IP-kaitseastmega LED-ribasid. Magamistuppa, koridori ja elutuppa on see ideaalne valik.

**Kas paigaldus on keeruline?**
Mitte tingimata. Pinnale paigaldatava profiili saab kogenud DIY-tegija ise paigaldada, kui kasutab lasertasandit ja korralikku saagi. Pahteldatava profiili paigaldus eeldab pahteldaja kogemust ja toimub ehituse varases etapis.

**Mis on varjuprofiili eeldatav eluiga?**
Alumiiniumprofiili eluiga ületab 25 aastat ilma hoolduse vajaduseta. Pulbervärvi UV-kindlus tagab värvitooni säilimise 15+ aasta jooksul. LED-riba eluiga sõltub kvaliteedist, kuid 24V tooted kestavad tüüpiliselt 8–12 aastat.

**Mille poolest erineb varjuprofiil tavalisest põrandaliistust?**
Tavaline põrandaliist on seinast välja ulatuv element, mis katab seina ja põranda kohtumiskoha. Varjuprofiil tõmbub seina sisse, jättes maha vuugi, mis loob varju ja kaasaegse minimalistliku ilme.

**Kas varjuprofiili saab paigaldada juba valmis seinale?**
Jah. Pinnale paigaldatav versioon on mõeldud just selleks. Pahteldatav versioon paigaldatakse enne pahteldamist ja sobib seega uusarendusele või täisrenoveerimisele.

**Kui sügav peaks varjuvuuk olema?**
Tüüpiline sügavus on 10–25 mm. Väiksem (10–15 mm) sobib madalama lae jaoks ja tagasihoidlikuma efekti. Sügavam (20–25 mm) sobib LED-versioonidele ja kõrgemate lagedega ruumidesse.

---`,
    bodyRu: `Теневые профили стали характерной деталью современной интерьерной отделки. Они обеспечивают минималистичную эстетику, которая усиливает и ощущение пространства, и игру света в каждом помещении.

    Идёт ли речь об обновлении дома или проектировании коммерческого здания — правильный выбор зависит от типа профиля, отвечающего конкретной задаче. Ниже представляем три основных решения, которые чаще всего встречаются на эстонском рынке.

## 1. Стандартный теневой профиль

    Стандартный теневой профиль — элегантное и сдержанное решение, создающее между стеной и полом почти незаметный шов. Возникает иллюзия, словно стена парит над полом. Профиль обычно изготовлен из алюминия, что обеспечивает прочность, влагостойкость и минимум ухода.

    Доступны разные высоты; профиль можно окрасить порошковой краской в любой оттенок RAL, чтобы он вписался в интерьер. Стандартная модель особенно подходит тем, кто ищет чистый и современный вид без дополнительных функций.

    Лучше всего подходит для:

    - Минималистичных гостиных и спален
- Офисов, где важна чистая линия
- Коридоров и общественных пространств

## 2. Теневой профиль со встроенной LED-подсветкой

    Тем, кто хочет добавить помещению атмосферу и настроение, LED-теневой профиль предложит отличное решение. В таких моделях в алюминиевую конструкцию интегрирован канал, куда устанавливается LED-лента. Она направляет мягкий косвенный свет в сторону стены, подчёркивает теневой шов и создаёт тёплую приглашающую атмосферу.

    Основа — по-прежнему алюминий, что обеспечивает долгосрочную прочность. Встроенный диффузор равномерно рассеивает свет и защищает LED-ленту от механических воздействий. Доступны разные модели с порошковой окраской под цветовое решение проекта.

    Типичные применения:

    - Коридоры и лестничные пролёты (ночное освещение)
- Спальни с мягкой ночной подсветкой
- Гостиничные номера и ресторанные интерьеры
- Архитектурно значимые стены

## 3. Теневой профиль с MDF-заполнением

    Гибридное решение, где точность и прямолинейность алюминия сочетаются с теплотой дерева и возможностью отделки на месте. Алюминиевая рамка даёт прочность, а внутреннее MDF-заполнение можно окрасить точно в тон стены — получается единая поверхность.

    Такое сочетание подходит тем, кто ценит чистые минималистичные линии, но хочет добавить немного мягкости и текстуры дерева.

      Окрашивайте заполнение матовой отделкой в тон стены. Избегайте применения в помещениях с высокой влажностью (ванные, предбанники саун). Подходит для гостиных, спален и представительских зон.

## Руководство по монтажу теневых профилей

    Правильный монтаж обеспечивает чистый результат и долгий срок службы. Ниже — пять основных шагов, которые должен соблюдать каждый монтажник.

## Почему выбирают теневой профиль

    Популярность теневых профилей не случайна. У них есть несколько преимуществ, которые делают их естественным выбором современной отделки.

## Часто задаваемые вопросы

**Из чего изготавливают теневые профили?**
Большинство качественных теневых профилей — из экструдированного алюминия (сплав 6063-T5): прочный, лёгкий и коррозионностойкий. В версиях с MDF-заполнением используется алюминиевая рамка с MDF под отделку на месте.

**Можно ли окрасить профиль в нужный оттенок?**
Да. Алюминиевые профили окрашиваются порошковой краской на заводе в любой оттенок RAL. MDF-заполнение можно окрасить на месте, чтобы оно слилось со стеной.

**LED-профиль подходит для любого помещения?**
Для большинства сухих помещений — да. Во влажных нужно использовать LED-ленты с IP-защитой. Для спален, коридоров и гостиных это идеальный выбор.

**Монтаж сложный?**
Версию с видимым монтажом опытный DIY-мастер установит сам с лазерным уровнем и качественной пилой. Прошпаклёвываемая версия требует опыта шпаклёвщика.

**Какой срок службы у теневого профиля?**
Срок службы алюминиевого профиля превышает 25 лет без ухода. УФ-стойкость порошковой краски сохраняет оттенок 15+ лет.

**Чем теневой профиль отличается от обычного плинтуса?**
Обычный плинтус выступает из стены. Теневой профиль уходит вглубь стены, оставляя шов, создающий тень и современный минималистичный вид.

**Можно ли установить теневой профиль на готовую стену?**
Да. Версия с видимым монтажом предназначена именно для этого. Прошпаклёвываемая ставится до шпаклёвки и подходит для новостроек и капитальной реновации.

**Какой глубины должен быть теневой шов?**
Типичная глубина — 10–25 мм. Меньше (10–15 мм) для низких потолков. Больше (20–25 мм) — для LED-версий.

/* ─────────────────────────────────────────────────────────
   POST 2 RU — Что такое теневой профиль + 5 дизайн-решений
   ───────────────────────────────────────────────────────── */`,
  },
  'peitliist-interjooris': {
    titleEt: `Mis on varjuprofiil ja kuidas seda interjööris kasutada?`,
    titleRu: `Что такое теневой профиль и как использовать в интерьере?`,
    catEt: 'Disain', catRu: 'Дизайн',
    yearEt: '2026 · märts', yearRu: '2026 · март',
    read: '7 min',
    cover: '/assets/projects/projekt03.webp',
    excerptEt: `Definitsioon, peamised eelised ja viis loovat võimalust varjuprofiili interjööris kasutada.`,
    excerptRu: `Определение, главные преимущества и пять творческих способов применения.`,
    bodyEt: `Varjuprofiil — tuntud ka nimetuse all peitliist või varjuvuuk — on elegantne ja minimalistlik lahendus, mis tõstab esile iga kaasaegse interjööri puhtaid jooni. Eriti hästi sobib see ruumidesse, kus soovitakse vähem ornamenti ja rohkem arhitektuurset selgust. Erinevalt tavalisest põrandaliistust ei ulatu varjuprofiil seinast välja, vaid asetseb seinaga ühel tasapinnal, jättes seina ja põranda vahele puhta vuugi. Tulemuseks on katkematu üleminek, mis loob terviku.

## Varjuprofiili peamised eelised

Varjuprofiilil on rida selgeid eeliseid, mis muudavad selle paljude sisearhitektide eelistatud valikuks.

- **Esteetiline mõju:** vuuk varjab seina ja põranda kohtumiskoha, jättes ruumile katkematu ja minimalistliku ilme.
- **Disaini paindlikkus:** profiil on saadaval erinevates materjalides, mõõtudes ja viimistlustes.
- **Valgustuse integratsioon:** LED-riba saab peita profiili sisse, mis võimaldab loomulikku kaudvalgust.
- **Ruumi kokkuhoid:** mööbel saab paikneda otse vastu seina, ilma vahega.
- **Lihtne puhastamine:** sileda pinna tõttu ei kogune tolm liistu peale.
- **Kaabliruum:** paljud profiilid sisaldavad kanalit, kuhu saab peita juhtmeid ja kaableid.

## Lihtne paigaldus — ka tavakasutajale

Vastupidiselt levinud arvamusele ei ole varjuprofiili paigaldus keeruline ülesanne. Süsteemid on disainitud nii, et need oleksid kiired ja turvalised paigaldada — see muudab varjuprofiilid kättesaadavaks ka DIY-huvilistele.

- **Lihtne kinnitamine:** põhitööriistadeks on lasertasand ja kruvid.
- **Eelmärgistatud kinnituspunktid:** lasertäpsed lõiked tagavad ühtlase paigutuse.
- **Paigaldusjuhendid:** sammhaaval juhised aitavad jõuda professionaalse tulemuseni.

## Viis võimalust varjuprofiili interjööris kasutada

Õige varjuprofiil avab disainis terve maailma võimalusi. Allpool viis loovat lähenemist, mida kohtab kõige sagedamini.

### 1. Ujuva seina efekt

See klassikaline lahendus saavutatakse spetsiaalse anodeeritud alumiiniumprofiiliga, kus täidisosa puudub. Kui profiili täiendab kaudvalgustus, hakkab sein tõepoolest "hõljuma" põranda kohal. See on silmatorkav valik nii sisemiste pindade kui ka teatud välisarhitektuuriliste detailide jaoks.

### 2. Sujuv pind

Selleks, et varjuprofiil jääks peaaegu nähtamatuks, kasutatakse MDF-täitega versiooni, mille täidis värvitakse täpselt sama tooni kui sein. Kahe pinna vahel jääb minimaalne vuuk ning kogu sein paistab katkematu ja siledana põrandani välja.

**Vihje:** kasutage MDF-täidisele pestava värvi viimistlust, kuna alumine osa võib aja jooksul saada löögi tolmuimejatöö või jalanõude tõttu.

### 3. Kontrastiv detail

Kui sa ei soovi profiili täiesti peita, võid valida täidise, mis seinatooniga kontrasteerub. Kontrast võib olla nii tugev (must sein, valge täide) kui ka õrn (kaks tooni erinevus). MDF-täidised saab värvida soovitud värvi või valida tehases viimistletud variandid (näiteks harjatud metall, puiduimitatsioon).

### 4. Varjujoon (peen vuuk)

Õhukese vahe jätmine seina ja täidise vahele loob peene varjujoone, mis raamib detaili rahulikult. See lähenemine annab ruumile definitsiooni, ilma et katkeks selle puhas vorm. Tavaliselt valitakse seinaga sama värvi MDF-täide ja vahe jääb 3–5 mm sügav.

### 5. Sisseehitatud LED-valgustus

LED-kanaliga varjuprofiilid pakuvad nii funktsionaalset kui ka dekoratiivset valgustust. LED-riba saab paigaldada profiili ülaossa, keskele või põhja — vastavalt sellele, kuidas valgust soovitakse suunata. Õige eredus ja värvitemperatuur võivad luua öövalguse koridorides, hõljuva põranda efekti elutoas või arhitektuurse rõhuasetuse trepi all.

## Miks valida varjuprofiil

Varjuprofiil ei ole lihtsalt mööduv trend — see on kaasaegse interjööri standard, mis on tulnud, et jääda. Ükskõik, kas soovid peent eleganssi või julget arhitektuurset detaili, varjuprofiil pakub paindlikku ja vastupidavat lahendust.

**Mis muudab kvaliteetsed varjuprofiilid eristuvaks:**

- **Tipptasemel alumiiniumi konstruktsioon** — vastupidav, kerge ja korrosioonikindel.
- **Kiire ja täpne paigaldus** — minimaalsed tööriistad ja täpne sobivus.
- **Värvitav viimistlus** — saab kohandada iga interjööri värvilahendusele.
- **LED-valmidus** — sisseehitatud kanal teeb valgustuse integreerimise lihtsaks.
- **Niiskuse- ja UV-kindlus** — sobib nii kuivadesse kui ka niisketesse ruumidesse.

**[CTA]**

> Soovid teada, milline varjuprofiili lahendus sobib teie ruumi?
> Külasta meie salongi Tehnika 14, Tallinnas või saada päring — meie spetsialistid aitavad valida õige profiili ja lahenduse.

---

## KKK

**Mis vahe on varjuprofiilil ja tavalisel põrandaliistul?**
Tavaline põrandaliist ulatub seina pinnast välja ning katab seina ja põranda kohtumiskoha. Varjuprofiil aga peitub seina sisse, jättes seina ja põranda vahele vuugi, mis loob varju ja katkematu pinna efekti.

**Kas varjuprofiil sobib igasse ruumi?**
Varjuprofiil sobib enamikku ruumidesse — eriti hästi kuivadesse elualadesse nagu elutuba, magamistuba ja koridor. Niiskemates ruumides (vannituba, köök) tuleks valida ainult alumiiniumist versioon, mitte MDF-täitega.

**Kas varjuprofiili saab paigaldada DIY-meetodil?**
Jah, pinnale paigaldatava versiooni saab kogenud DIY-huviline ise paigaldada, kasutades lasertasandit ja kvaliteetset saagi. Pahteldatav versioon nõuab pahteldaja kogemust ja paigaldatakse ehituse varases etapis.

**Kas LED-iga varjuprofiil tarbib palju elektrit?**
Ei. Tüüpiline 24V LED-riba tarbib umbes 9,6 W/m. Näiteks 5-meetrine koridori valgustus annab tunnis 0,05 kWh, mis aastas tähendab tüüpilise kasutuse korral umbes 10 € lisakulu.

**Mille värv on varjuprofiili sisepind?**
Standardvalik on RAL 9016 (transpordivalge), mis sobib enamiku seinavärvidega. Saadaval on ka RAL 9005 (sügav must) ja praktiliselt iga RAL-toon eritellimusel. Pulbervärv tagab UV-kindluse aastateks.

**Kas varjuprofiili saab integreerida kaablihalduseks?**
Jah. Paljude varjuprofiilide sees on kanal, kuhu saab peita madalpinge-kaableid (CAT6, HDMI, valguskaabel). See aitab säilitada puhast välimust ilma seinasiseseid kaableid lisamata.

**Kas varjuprofiili saab kasutada koos põrandaküttega?**
Jah. Varjuprofiil ei kontakteeru kütteelemendiga otseselt. Põrandakatte termopaisumise dilatatsioonivuuk jääb profiili sisse peidetud, mis tagab korrektse paigaldamise.

**Kas täidise värvitooni saab hiljem muuta?**
Alumiiniumprofiili sisepinda tehasevärvi ei värvita üle. Küll aga saab MDF-täidist värvida nii palju, kui soovid — see on selle tüübi üks põhilisi eeliseid.

---`,
    bodyRu: `Теневой профиль — известный также как скрытый плинтус или теневой шов — элегантное и минималистичное решение, подчёркивающее чистые линии любого современного интерьера.

    В отличие от обычного плинтуса, теневой профиль не выступает из стены, а находится в одной плоскости со стеной, оставляя между стеной и полом чистый шов. Получается непрерывный переход, создающий целостность.

## Главные преимущества теневого профиля

## Простой монтаж — даже для обычного пользователя

    Вопреки распространённому мнению, монтаж теневого профиля — не такая уж сложная задача. Системы спроектированы для быстрой и надёжной установки — теневые профили доступны и DIY-энтузиастам.

## Пять способов использовать теневой профиль в интерьере

### 1. Эффект парящей стены

    Это классическое решение достигается специальным анодированным алюминиевым профилем без заполнения. Если профиль дополнить косвенной подсветкой, стена действительно начинает «парить» над полом. Эффектный выбор и для внутренних поверхностей, и для определённых деталей наружной архитектуры.

### 2. Гладкая поверхность

    Чтобы теневой профиль остался почти незаметным, используется версия с MDF-заполнением, окрашенным точно в тон стены. Между двумя поверхностями остаётся минимальный шов, и вся стена смотрится непрерывной и ровной до самого пола.

      Используйте моющуюся отделку для MDF-заполнения — нижняя часть может со временем получить удары от пылесоса или обуви.

### 3. Контрастная деталь

    Если не хотите полностью скрывать профиль, можно выбрать заполнение, контрастирующее с тоном стены. Контраст может быть как сильным (чёрная стена, белое заполнение), так и мягким (на пару оттенков отличия). MDF-заполнения можно окрасить в нужный цвет или выбрать заводскую отделку (например, шлифованный металл, имитация дерева).

### 4. Теневая линия (тонкий шов)

    Оставление тонкого зазора между стеной и заполнением создаёт деликатную теневую линию, которая спокойно обрамляет деталь. Этот подход добавляет помещению определённость, не нарушая чистой формы. Обычно выбирают MDF-заполнение в тон стены, а зазор оставляют 3–5 мм глубины.

### 5. Встроенная LED-подсветка

    LED-теневые профили дают и функциональное, и декоративное освещение. LED-ленту можно установить вверху, в центре или внизу профиля — в зависимости от того, куда направлять свет. Правильная яркость и цветовая температура создадут ночное освещение в коридорах, эффект парящего пола в гостиной или архитектурный акцент под лестницей.

## Почему выбирают теневой профиль

    Теневой профиль — не просто проходящий тренд. Это стандарт современного интерьера, пришедший надолго. Что предлагает качественное решение:

## Часто задаваемые вопросы

**В чём отличие теневого профиля от обычного плинтуса?**
Обычный плинтус выступает из стены и закрывает место соединения стены и пола. Теневой профиль уходит в стену, оставляя шов, создающий тень и эффект непрерывной поверхности.

**Подходит ли теневой профиль для любого помещения?**
Для большинства — особенно для гостиных, спален и коридоров. Во влажных помещениях стоит выбирать алюминиевую версию, не с MDF-заполнением.

**Можно ли установить теневой профиль DIY-методом?**
Версию с видимым монтажом опытный DIY-энтузиаст установит сам, используя лазерный уровень и качественную пилу. Прошпаклёвываемая требует опыта шпаклёвщика.

**LED-теневой профиль потребляет много электричества?**
Нет. Типичная 24В LED-лента потребляет около 9,6 Вт/м. Подсветка 5-метрового коридора — это около 10 € в год.

**Какого цвета внутренняя поверхность теневого профиля?**
Стандартный выбор — RAL 9016 (транспортный белый) или RAL 9005 (глубокий чёрный). Практически любой оттенок RAL — под заказ.

**Можно ли интегрировать теневой профиль с прокладкой кабелей?**
Да. Многие профили имеют внутренний канал для скрытой прокладки слаботочных кабелей (CAT6, HDMI, оптоволокно).

**Совместим ли теневой профиль с тёплым полом?**
Да. Профиль не контактирует с нагревательным элементом напрямую. Деформационный зазор напольного покрытия скрывается внутри профиля.

**Можно ли позже изменить цвет заполнения?**
Заводскую окраску алюминиевого профиля поверх не перекрашивают. MDF-заполнение можно перекрашивать сколько угодно.

/* ─────────────────────────────────────────────────────────
   POST 3 RU — Теневые профили: гид по современному дизайну
   ───────────────────────────────────────────────────────── */`,
  },
  'varjuprofiil-vs-porandaliist': {
    titleEt: `Varjuprofiil vs. põrandaliist: kumb valida?`,
    titleRu: `Теневой профиль vs. плинтус: что выбрать?`,
    catEt: 'Võrdlus', catRu: 'Сравнение',
    yearEt: '2026 · märts', yearRu: '2026 · март',
    read: '5 min',
    cover: '/assets/projects/projekt01.webp',
    excerptEt: `Võrdleme mõlemat lahendust hinna, paigalduse ja välimuse poolest.`,
    excerptRu: `Сравниваем оба решения по цене, монтажу и внешнему виду.`,
    bodyEt: `Tavaline põrandaliist on tuttav igale kodule — kuid see ei sobi tihti kokku kaasaegse, minimalistliku disainikeele eesmärkidega. Suuremõõdulised puidust või MDF-ist liistud võivad rikkuda just selle puhtuse, mille nimel siseviimistlus on hoolikalt välja valitud. Vastuseks sellele kasvas välja varjuprofiil — peen disainilahendus, mis tekitab seina ja põranda vahele sissetõmmatud vuugi. Tulemuseks on illusioon, et sein hõljub põranda kohal, ja see annab interjöörile tugevalt kaasaegse karaktari.

Allpool tutvustame kõike olulist, mis aitab otsustada, kas varjuprofiil sobib teie projektile — võrdlus tavalise põrandaliistuga, peamised tüübid, paigaldussammud ja disainivõimalused.

## Varjuprofiil vs traditsiooniline põrandaliist

Allpool tabelist näeb kahe lahenduse põhilisi erinevusi.

| Tunnus | Varjuprofiil | Traditsiooniline põrandaliist |
|---|---|---|
| Esteetika | Minimalistlik, moodne, "hõljuva seina" efekt | Klassikaline, dekoratiivne, traditsiooniline viimistlus |
| Paigaldus | Keerukam, vajab planeerimist ja pahteldamist | Lihtne, paigaldatakse pärast värvimist |
| Hooldus | Lihtne — tolmuimejaga puhastada, pole tolmuhakkeserva | Ülaservale koguneb tolm, vajab regulaarset pühkimist |
| Hind | Kõrgem materjali- ja paigalduskulu tõttu | Mõõdukalt madalam materjali ja paigalduse osas |
| Vastupidavus | Eriti hea metallprofiili korral | Võib kraapuda, kahjustuda ja vajada värvimist |
| Mööbli paigutus | Mööbel istub flush vastu seina | Mööbel jääb 10–15 mm seinast eemal |

## Miks valida varjuprofiil

Varjuprofiil ei paku ainult esteetilist väärtust — see toob mitmeid praktilisi eeliseid, mida tavaline põrandaliist ei suuda. Peamised neist:

- **Tugev ja vastupidav.** Eriti metallprofiili korral kaitseb see seina alumist osa kraapidest ja löökidest, mida tekitavad tolmuimejad ja mööbel.
- **Puhas ja kaasaegne ilme.** Liistu massiivsus kaob, sein jätkub ühtlaselt põrandani ning ruum saab minimalistliku ja kaasaegse karakteri.
- **Suurem ruumitunne.** Vuugi tekitatud sügavuse illusioon paneb ruumi näima ruumikamana — eriti väiksemates tubades on see eelis märgatav.
- **Värvimine on lihtsam.** Kuna puudub liistu ülaserv, ei pea värvimisel teipima — kogu sein värvitakse profiili servani.
- **LED-integratsioon.** Profiili sees on ideaalne ruum LED-riba peitmiseks, mis lisab pehme kaudvalguse.

## Varjuprofiilide tüübid

Iga varjuprofiil ei ole sama. Sõltuvalt materjalist, paigaldusmeetodist ja funktsionaalsusest leiab Eesti turul mitut tüüpi lahendusi.

### Materjali ja konstruktsiooni järgi

**1. Metallprofiilid (pahteldatavad)**

See on professionaalne lahendus, mida kasutatakse uutes ehitistes ja täisrenoveerimistel. Profiil — tüüpiliselt ekstrudeeritud alumiinium — paigaldatakse seina karkassi enne kipsplaadi paigaldamist. Kipsplaadid asetuvad profiili servani ja pahteldaja viimistleb pinna täpsuseni.

- **Plussid:** kõige puhtam joon, vastupidav, kaitseb seina alumist osa kõige paremini.
- **Miinused:** vajab ettevalmistust ja paigaldamist ehituse varases etapis.
- **Sobib:** uusarendused, kõrge kvaliteediga renoveerimised.

**2. PVC- või vinüülribad**

Metallprofiilidega sarnased, kuid valmistatud kõrge tihedusega plastikust. Need toimivad pahteldatava ribana ja tekitavad sama tüüpi vuugi.

- **Plussid:** soodsam kui alumiinium, niiskuskindel, lihtne kohapeal lõigata.
- **Miinused:** vähem tugev ja löökidele vastupidav kui metall.
- **Sobib:** piiratud eelarvega projektid, niiskemad ruumid (vannitoad).

**3. Integreeritud MDF- või puitliist**

Hübriidlahendus, mille puhul traditsiooniline MDF-põrandaliist on ülemisse serva freesitud "varjujoonega". See paigaldatakse otse valmis seinapinnale.

- **Plussid:** lihtne paigaldada olemasolevasse interjööri ilma seinte ümberehituseta.
- **Miinused:** efekt on tagasihoidlikum — liist endiselt veidi ulatub seinast välja.
- **Sobib:** renoveerimised, kus ei taheta seina tehtud muudatusi.

### Funktsionaalsuse järgi

- **Standardne varjuprofiil** — fookus puhtal joonel ja "hõljuva seina" efektil.
- **Täidisega varjuprofiil** — kaheosaline süsteem, kus alusprofiil pahteldatakse seina ja eraldi täidis klipsitakse hiljem peale (võimaldab mängida värvi ja materjaliga).
- **LED-iga varjuprofiil** — sisseehitatud kanaliga LED-ribade jaoks, mis tekitavad pehme kaudvalgustuse.

## Kuidas varjuprofiil paigaldatakse

Varjuprofiili paigaldus eeldab täpsust ja ettevalmistust. See ei ole tüüpiline DIY-projekt, kui kogemus pahteldamisel puudub. Allpool on protsess viies põhietapis.

1. **Karkassi ja paigalduspinna ettevalmistus.** Seinakarkass tuleb olla loodis ja sirge. Varjuprofiili kõrgus märgitakse kogu ruumi perimeetril lasertasandit kasutades.
2. **Profiili paigaldus.** Metall- või PVC-profiil lõigatakse vastava saega õigesse mõõtu ja kruvitakse kindlalt seina karkassile.
3. **Kipsplaadi paigaldus.** Kipsplaadid asetuvad profiili ülemisele servale. See määrab vuugi kõrguse.
4. **Pahteldus.** Pahtel viiakse täpselt profiili servani, et tekitada sirge ja terav joon. See on töö kõige oskust nõudvam osa.
5. **Värvimine ja viimistlus.** Sein värvitakse profiili servani. Vuugi sisepinda võib värvida seinaga sama tooniga, põrandaga sama tooniga või kontrasttoonis (näiteks must).
6. **Põrandakatte paigaldus.** Lõpuks paigaldatakse parkett, plaat või vinüül, mis libistatakse profiili alla. Tulemus on katkematu üleminek.

## Disainiideed: kuidas varjuprofiili täiel võimsusel kasutada

Varjuprofiil pole ainult tehniline lahendus — see on ka loominguline tööriist. Allpool kaks lähenemist, mis muudavad standardvuugi disainikeskmeks.

### Sisseehitatud LED-valgustus

Üks populaarseimaid kasutusi: LED-riba paigaldatakse profiili sisse, valgus suunatakse seina poole ülespoole. Tulemuseks on pehme, kaudne kuma seinapinnal, mis tugevdab "hõljuva seina" efekti. Hästi toimib see koridorides ja magamistubades (öövalgus) ning elutubades (õhtune atmosfäär).

Selleks tuleb valida piisavalt sügav profiil, mis varjab LED-riba otsesest vaatest, ja kvaliteetne 24V LED-süsteem.

### Värvi- ja kontrastimäng

Varjuvuugi sisepind ei pea olema sama värvi kui sein. Tumedam toon — näiteks süsihall või must — tugevdab varju ja muudab joone defineeritumaks. Üks praktiline näide: kui ruumis on tumedad aknaraamid, võib varjuvuugi sisepinna värvida samasse tooniga, mis seob detailid visuaalselt kokku.

**[CTA]**

> Tahad näha varjuprofiili reaalsete näidete põhjal?
> Tule Tehnika 14 salongi Tallinnas. Aitame valida õige tüübi, materjali ja viimistluse vastavalt teie projektile. Tasuta projektikonsultatsioon.

---

## KKK

**Mis on varjuprofiili peamine eesmärk?**
Varjuprofiili peaeesmärk on luua kaasaegne ja minimalistlik ilme, varjates seina ja põranda kohtumiskoha. Lisaks loob see seinale "hõljuva" efekti ja annab ruumile sügavuse ning ruumitunnetuse tunde.

**Kas varjuprofiili saab paigaldada juba valmis kodusse?**
Pahteldatava versiooni paigaldus olemasolevasse kodusse on keeruline ja kulukas — see eeldaks kipsplaadi alumise osa väljalõikamist ja seina uuesti viimistlemist. Pinnale paigaldatav alumiiniumprofiil sobib aga olemasolevatesse ruumidesse hästi.

**Kui palju varjuprofiil tüüpiliselt maksab?**
Varjuprofiil on kallim kui tavaline põrandaliist. Hinda mõjutavad valitud materjal (alumiinium, PVC, MDF) ja paigalduse keerukus. Tüüpiline alumiiniumprofiili hind on 18–32 €/jm, lisaks paigaldus.

**Kas varjuprofiil on DIY-projekt?**
Pahteldatava profiili paigaldus pole soovitatav DIY-projektina, kui pahteldamise kogemus puudub. Pinnale paigaldatava versiooni võib kogenud DIY-tegija paigaldada lasertasandiga ja täpse saagiga.

**Mis materjalid on varjuprofiilil parimad?**
Profiili enda jaoks on anodeeritud või pulbervärvitud alumiinium kõige parem valik — see on tugev, sirge ja korrosioonikindel. Sisemise vuugi pinnaks jääb tavaliselt värvitud kipsplaat.

**Kuidas parandada kahjustatud varjuvuuki?**
Kui profiil on saanud löögi või pahtli serv on kahjustunud, tuleb tavaliselt kahjustunud osa välja lõigata, uus profiilitükk asendada ning piirkond uuesti pahteldada ja värvida. See on töö, mida soovitatakse usaldada kogenud tegijale.

**Kas varjuprofiil on hea valik?**
Jah, eriti kui soovid kaasaegset ja minimalistlikku interjööri. Tuleb arvestada, et paigaldus on keerukam ja kulukam kui tavalise põrandaliistu puhul, kuid esteetiline tulemus ja eluiga kompenseerivad selle.

**Kus varjuprofiili tüüpiliselt kasutatakse?**
Varjuprofiili kohtab kaasaegsetes hoonetes — galeriides, kvaliteetkodudes, minimalistlikes kontorites ja kommertsruumides. Kasutuskohaks on iga ruum, kus kaasaegne ja puhas ilme on prioriteet.

**Kas vuuk kogub tolmu?**
Jah, nagu iga süvend kodus. Hea uudis on see, et puhastamine on lihtne — kasutage tolmuimeja kitsast otsikut, et tolm vuugist eemaldada. Tavaliselt piisab kord paari kuu tagant.

---`,
    bodyRu: `Обычный плинтус знаком каждому дому — но он часто не сочетается с современным минималистичным дизайн-кодом. В ответ на это вырос теневой профиль — деликатное дизайн-решение, создающее между стеной и полом утопленный шов.

    В результате возникает иллюзия, что стена парит над полом, и интерьер приобретает выраженный современный характер. Ниже — всё важное, что поможет решить, подходит ли теневой профиль вашему проекту.

## Теневой профиль против обычного плинтуса

## Почему выбирают теневой профиль

## Типы теневых профилей

### По материалу и конструкции

    1. Металлические профили (прошпаклёвываемые). Профессиональное решение для новостроек и капитальной реновации. Профиль — обычно экструдированный алюминий — устанавливается в каркас стены до монтажа гипсокартона.

    2. ПВХ или виниловые ленты. Похожи на металлические, но из плотного пластика. Дешевле и влагостойко — подходят для ванных и проектов с ограниченным бюджетом.

    3. Интегрированный MDF- или деревянный плинтус. Гибридное решение, где традиционный плинтус из MDF имеет фрезерованную верхнюю «теневую линию». Просто устанавливается в существующий интерьер без перестройки стен.

### По функционалу

## Как монтируется теневой профиль

    Монтаж теневого профиля требует точности и подготовки. Это не типичный DIY-проект, если нет опыта шпаклёвки. Ниже — процесс в шести основных этапах.

## Дизайн-идеи

### Встроенная LED-подсветка

    Одно из самых популярных применений: LED-лента ставится в профиль, свет направляется вверх к стене. Получается мягкое косвенное свечение стены, усиливающее эффект парящей стены. Хорошо работает в коридорах и спальнях (ночной свет), а также в гостиных (вечерняя атмосфера).

### Игра цвета и контраста

    Внутренняя поверхность теневого шва необязательно должна быть в тон стены. Более тёмный оттенок — например, антрацит или чёрный — усиливает тень и делает линию выраженной. Один практический пример: если в комнате тёмные оконные рамы, стоит окрасить внутреннюю поверхность шва в тот же оттенок.

## Часто задаваемые вопросы

**В чём главная задача теневого профиля?**
Создать современный и минималистичный вид, скрыв место соединения стены и пола. Кроме того, создаёт эффект «парящей» стены.

**Можно ли установить теневой профиль в уже готовый дом?**
Установка прошпаклёвываемой версии в готовом доме сложна. Алюминиевый профиль с видимым монтажом, однако, хорошо подходит к существующим помещениям.

**Сколько обычно стоит теневой профиль?**
Типичный алюминиевый профиль — 18–32 €/пог.м, плюс стоимость монтажа.

**Теневой профиль — это DIY-проект?**
Прошпаклёвываемая версия требует опыта шпаклёвщика. Версию с видимым монтажом опытный DIY-мастер может установить сам.

**Какой материал лучше всего для теневого профиля?**
Анодированный или окрашенный порошковой краской алюминий — прочный, ровный и коррозионностойкий.

**Как исправить повреждённый теневой шов?**
Повреждённый участок вырезается, новый кусок профиля заменяется, область шпаклюется и красится заново.

**Теневой профиль — хороший выбор?**
Да, особенно если хочется современный и минималистичный интерьер. Монтаж сложнее, но эстетический результат это компенсирует.

**Где обычно применяют теневой профиль?**
Галереи, качественное жильё, минималистичные офисы и коммерческие пространства. Везде, где чистый и современный вид — приоритет.

/* ─────────────────────────────────────────────────────────
   POST 4 RU — Полный гид: 4 применения теневых профилей
   ───────────────────────────────────────────────────────── */`,
  },
  'varjuvuuk-kogu-ruumis': {
    titleEt: `Varjuvuuk kogu ruumis: lagi, sein, põrand ühes kontseptsioonis`,
    titleRu: `Теневой шов по всему помещению: потолок, стена, пол в единой концепции`,
    catEt: 'Inspiratsioon', catRu: 'Вдохновение',
    yearEt: '2026 · veebr', yearRu: '2026 · фев',
    read: '8 min',
    cover: '/assets/projects/projekt02.webp',
    excerptEt: `Kuidas saavutada ühtne, puhas joonte süsteem kogu toas.`,
    excerptRu: `Как добиться единой чистой системы линий во всей комнате.`,
    bodyEt: `Sisearhitektuuris on detailid need, mis muudavad ruumi tunde. Varjuvuuk — väike teadlikult jäetud süvend, kus kaks pinda kohtuvad — on üks neist detailidest, mis suudab ruumi täiesti ümber kujundada. See annab ruumile puhta, moodsa ja viimistletud iseloomu, paneb seinad näima hõljuvana ja laed kõrgemana. Kes soovib minimalistlikku ilmet, peaks varjuvuugi võimalustega tutvuma.

See juhend selgitab, mis on varjuvuuk, milliseid tüüpe Eesti turul kohtab ja kuidas seda erinevates projektides kasutada saab.

## Varjuprofiilide neli peamist kasutusala

Varjuvuuki saab kasutada paljudes kohtades, kus kohtuvad kaks pinda. Iga rakendus vajab oma profiilitüüpi, mis tagab puhta tulemuse.

### 1. Lagi — "hõljuva lae" efekt

Lae ja seina kohtumiskohta tekitatud varjuvuuk loob mulje, nagu lagi oleks seinast lahti. Ruum tundub kõrgem ja avaram, kuna silm jälitab seina kuni vuugini. Selle detailiga kaob ka tavaline karniis, mille asemele tuleb selge ja kaasaegne joon.

### 2. Põrandasokkel — kõige levinum kasutus

Põrandasokli varjuvuuk — tuntud ka kui peitliist või "varjuline sokkel" — paigaldatakse seina ja põranda kohtumiskoha. Sein peatub veidi enne põranda algust, mis tekitab seinale "hõljuva" efekti. See on suurepärane alternatiiv tavalisele põrandaliistule, eriti minimalistliku interjööri puhul. Tolmu kogumiseks pole ülaserva ja põrandat saab pesta servast servani.

### 3. Ukseraam — raamita ukseava

Sama põhimõtet saab rakendada ka ukseava ümber. Massiivsete puidust või MDF-ist ukseraamide asemel paigaldatakse õhuke metallprofiil. Kipsplaat finišeerib profiilini, jättes ümber ukse õhukese vuugi. Tulemuseks on raamita ukseava, kus uks tundub seinaga ühte sulandavat. See on kõige tugevam minimalismi signaal kogu siseviimistluses.

### 4. Seinapaneel — materjalide eraldaja

Varjuvuuk võib teenida ka funktsionaalset rolli — eraldada erinevaid seinamaterjale või paneele. Näiteks suurel seinal, kus kohtuvad puidust paneel ja sile värvitud sein, eristab vuuk materjalid puhtalt ja rütmiliselt. See on viis luua arhitektuurselt sügav seinapind ilma keerukate üleminekuteta.

## Miks kasutada varjuvuuke

Varjuvuuk pole pelgalt esteetiline detail — sellel on kindel funktsionaalne ja kompositsiooniline väärtus.

- **Minimalistlik selgus.** Joon on puhas, üleminek selgus ja ornament puudub. Kaasaegsete ja kommertsprojektide jaoks asendamatu.
- **Ruumitundlikkus.** "Hõljuv" efekt — olgu siis seinal või laes — paneb ruumi näima suuremana ja kergemana.
- **Vigade peitmine.** Vuuk varjab oskuslikult väikseid mustreid pinnast — pragusid, tasapinna ebatäpsust või materjalide mõõtmise erinevusi.
- **Valgustuse integratsioon.** Profiili sisse mahub LED-riba, mis muudab arhitektuurse detail valgustusallikaks.

## Parimad materjalid varjuprofiili jaoks

Profiili materjal mõjutab nii välimust, paigaldust kui ka eluiga. Allpool kõige levinumad valikud kõrvuti.

| Materjal | Plussid | Miinused | Sobib kõige paremini |
|---|---|---|---|
| **Alumiinium** | Tugev, vastupidav, loob terava joone | Kõrgem hind, raskem lõigata | Lagi, ukseraamid, kõrge koormusega kohad |
| **PVC** | Soodne, kerge, lihtne paigaldada | Vähem vastupidav, võib näida odav | DIY-projektid, madala löögiriskiga kohad |
| **Puit** | Värvitav või peitsitav, soe ilme | Niiskuse korral võib koolduda, joon vähem terav | Traditsioonilised või üleminekustiili interjöörid |
| **MDF** | Odav, lihtne värvida | Vähem vastupidav, ei talu vett | Kuivad ruumid, eelarvepiiranguga projektid |

Praktikast lähtuvalt annab **alumiinium** parima ja kõige professionaalsema tulemuse. See on tugev ja loob terava, sirge varjujoone, mis on varjuvuugi mõte.

## Kuidas varjuvuuki tekitada

Varjuvuugi paigaldus nõuab täpsust ja hoolikat planeerimist. See ei ole lihtsalt vahe — see on profileeritud lahendus, mis tagab vuugi ühtluse ja terava serva. Allpool põhisammud.

**1. Planeerimine ja ettevalmistus.** Karkassi struktuur peab olema sirge ja loodis. Iga viga selles etapis on lõpptulemuses märgatav. Mõõtke detailselt, et profiili hulk vastaks tegelikule vajadusele.

**2. Profiili paigaldus.** Lõigake profiil saagiga sobivasse mõõtu — kasutage materjalile vastavat saetera (metall, PVC, puit). Kinnitage profiil karkassi külge kruvidega, kontrollides pidevalt loodi.

**3. Kipsplaadi paigaldus.** Kipsplaat asetub profiili servale, mis tähistab vuugi kõrgust. Servad peavad olema profiili ribiga kindlas kontaktis.

**4. Pahteldus.** Profiili perfooritud kõrv kaetakse pahteldusseguga. See töö nõuab oskust, kuna kõik veapunktid jäävad lõplikult nähtavaks.

**5. Värvimine ja viimistlus.** Krunditud sein värvitakse profiili servani. Vuugi sisepinna värvitooni saab valida — sageli kasutatakse musta, mis tugevdab varju, või seinaga sama tooniga, mis loob peenema efekti.

## Disainilahendused: kuidas varjuvuuki täiel võimsusel kasutada

Varjuvuugi paigutamine ei lõppe selle paigaldusega. Mõned loomingulisemad lähenemised teevad sellest tõelise disainivahendi.

### LED-valgustuse integratsioon

Üks meeldejäävamaid kasutusi: LED-riba peidetakse profiili sisse, valgus suunatakse vastu seina või lae. Pehme kaudvalgus annab seinale kuma, mis tugevdab "hõljuva" efekti. See töötab nii ülemise sokliviisi (lae lähedal) kui ka põrandasokli puhul. Hotelli koridorides ja moodsates magamistubades on see klassikaline lahendus.

### Arhitektuursed mustrid

Varjuvuuki saab kasutada ka suurte seinte segmenteerimiseks. Kui sein on liiga ühtlane, võib lisada horisontaalseid või vertikaalseid vuugid, mis loovad rütmi ja sügavust. See on populaarne lahendus magamistubades voodi taga, elutubades või suurtes esindusalades.

### Mööbel ja kapid

Sama põhimõte töötab ka mööbli juures. Käepidemeteta kapid, kus avamiseks kasutatakse profiilis tehtud süvendit, jäävad puhtalt minimalistlikud. Riiulid, mis paigaldatakse seina sisse ja jätavad ümber õhukese varjujoone, paistavad hõljuvat. See on tüüpiline detail kõrgklassi köökides ja sisemisi laevades.

## Kuidas valida õige varjuprofiil

Õige varjuprofiili valikul tasub mõelda läbi kolm peamist tegurit.

**1. Rakendus ja asukoht**

- **Lagi:** vajab spetsiaalset profiili, mis viimistleb kipsplaadi serva loovalt vastu lae karkassi.
- **Sokkel:** põranda lähedal asetsev profiil vajab löögikindlust, mida pakub eelkõige alumiinium.
- **Ukseraam:** raamita ukseava vajab tugevat profiili, mis säilitab loodi kogu pikkuse ulatuses.
- **Seinapaneel:** lihtne profiil, mille sügavust valib disain.

**2. Materjal vastab vajadusele**

Eelnev tabel aitab teha materjalivaliku. Tipptasemelise tulemuse jaoks soovitame esmajoones alumiiniumi. Niiskemates ruumides — PVC või alumiinium, mitte MDF/puit.

**3. Mõõdud ja sügavus**

- **Vuugi laius:** 10 mm tekitab peene minimalistliku ilme; 20 mm on dramaatilisem ja sobib LED-i jaoks.
- **Kipsplaadi paksus:** profiil peab vastama kipsplaadi paksusele (näiteks 12,5 mm). Vale mõõt tähendab, et viimistlus ei jää tasaseks.

Lisaks jälgi viimistluse soovi — kas profiil peaks olema värvitav, pulbervärvitud või anodeeritud (tehas tee ise valib värvilise mooduli).

**[CTA]**

> Tahad näha varjuprofiile käes ja arutada oma projekti?
> Tehnika 14, Tallinn. Tasuta projektikonsultatsioon, kus aitame valida õige tüübi, materjali ja paigaldusplaani.

---

## KKK

**Kas varjuvuuke on raske puhastada?**
Ei. Vuugi sisse võib koguneda veidi tolmu, kuid tolmuimeja kitsa otsiku abil saab selle hõlpsalt eemaldada. Põrandasokli vuugi puhul piisab tavaliselt kiirest pesust.

**Kas varjuvuuk maksab rohkem kui traditsiooniline liist?**
Üldiselt jah. Materjalid (eriti alumiinium) on kallimad ja paigaldus on oskust nõudvam, mis tõstab tööjõukulu. Paljud aga peavad puhast, kaasaegset ilmet selle investeeringu väärtuseks.

**Kas varjuvuuki saab kasutada igas ruumis?**
Jah, peaaegu igas ruumis: elutoad, magamistoad, köögid, koridorid. Vannitubades tuleks valida niiskuskindel profiil — alumiinium või PVC, mitte MDF/puit.

**Kas varjuvuuk töötab madala laega ruumis?**
Töötab, kuid vuugi sügavust tuleb kohandada. 2,5 m laega ruumis sobib 10–15 mm sügavus. Sügavam vuuk võib madala lae korral tunduda liialdusena.

**Kas LED-i paigaldus toimub paigalduse ajal või hiljem?**
Mõlemad on võimalikud. Sisseehitatud kanaliga profiili korral on parem LED-süsteem juba paigaldusajal sisse paigutada, koos elektriku vooluskeemiga.

**Kas varjuvuuki tasub paigaldada renoveerimise käigus?**
Kindlasti. Renoveerimine on parim aeg, kuna seinad on niikuinii viimistluseta. Pahteldatav profiil tuleb paigaldada enne lõplikku pahteldamist, pinnale paigaldatav versioon sobib ka renoveerimise lõppfaasi.

**Kas saab kombineerida mitut varjuvuugi kasutusala?**
Jah ja see on tegelikult sageli kõige tugevam disainivalik. Kombinatsioon põrandasoklist, lae varjuvuugist ja raamita ukseavast loob tervikliku arhitektuurse keele.

---`,
    bodyRu: `В интерьерной архитектуре именно детали меняют ощущение пространства. Теневой шов — маленькая сознательно оставленная впадина в месте встречи двух плоскостей — одна из тех деталей, которая способна полностью переосмыслить помещение.

    Он придаёт помещению чистый, современный и завершённый характер, заставляет стены казаться парящими, а потолки — выше. Ниже объясняем, что такое теневой шов, какие типы встречаются на эстонском рынке и как использовать его в разных проектах.

## Четыре главных применения теневых профилей

### 1. Потолок — эффект «парящего потолка»

    Теневой шов в стыке потолка и стены создаёт впечатление, будто потолок оторван от стены. Помещение кажется выше и просторнее, поскольку взгляд скользит по стене до самого шва. Эта деталь убирает обычный карниз — на его место приходит чистая и современная линия.

### 2. Напольный плинтус — самое распространённое применение

    Теневой шов в линии пола — известный также как скрытый плинтус или «теневой плинтус» — устанавливается в стык стены и пола. Стена останавливается чуть раньше начала пола, создавая для стены «парящий» эффект. Нет верхнего края для сбора пыли, и пол моется от края до края.

### 3. Дверной проём — рама без рамы

    Тот же принцип применяется и вокруг дверного проёма. Вместо массивных деревянных или MDF-наличников ставится тонкий металлический профиль. Гипсокартон финишируется до профиля, оставляя вокруг двери тонкий шов. Получается дверной проём без рамы, в котором дверь словно сливается со стеной.

### 4. Стеновая панель — разделитель материалов

    Теневой шов может выполнять и функциональную роль — разделять разные стеновые материалы или панели. Например, на большой стене, где встречаются деревянная панель и ровная окрашенная стена, шов чисто и ритмично различает материалы.

## Зачем использовать теневые швы

## Лучшие материалы для теневого профиля

    На практике лучший и самый профессиональный результат даёт алюминий. Он прочный и создаёт чёткую ровную теневую линию — в этом и суть теневого шва.

## Как создать теневой шов

## Дизайн-решения

### Интеграция LED-подсветки

    LED-лента прячется в профиль, свет направлен на стену или потолок. Мягкий косвенный свет придаёт стене свечение, усиливая «парящий» эффект. В коридорах отелей и современных спальнях — классическое решение.

### Архитектурные паттерны

    Теневой шов можно использовать и для сегментации крупных стен. Если стена слишком однородна, можно добавить горизонтальные или вертикальные швы, создающие ритм и глубину.

### Мебель и шкафы

    Тот же принцип работает и в мебели. Шкафы без ручек, где для открывания используется углубление в профиле, остаются чисто минималистичными.

## Как выбрать правильный теневой профиль

    1. Применение и расположение. Для потолка нужен специальный профиль под кромку гипсокартона. Для плинтуса — устойчивость к ударам. Для дверной рамы — прочный профиль, держащий уровень. Между стеновыми панелями — более простой профиль.

    2. Материал. Для высшего результата — алюминий. В сырых помещениях — ПВХ или алюминий, не MDF/дерево.

    3. Размеры и глубина. 10 мм — тонкий минималистичный вид. 20 мм — более драматично и подходит для LED. Профиль должен соответствовать толщине гипсокартона.

## Часто задаваемые вопросы

**Теневые швы трудно чистить?**
Нет. В шов может попасть немного пыли, но узкой насадкой пылесоса её легко удалить.

**Теневой шов стоит дороже обычного плинтуса?**
В целом да. Материалы (особенно алюминий) дороже, монтаж требует больше навыков.

**Можно ли использовать теневой шов в любом помещении?**
Да, почти в любом. В ванных стоит выбирать влагостойкий профиль — алюминий или ПВХ.

**Работает ли теневой шов в помещении с низким потолком?**
Работает, но глубину шва нужно адаптировать. В помещении с потолком 2,5 м подходит 10–15 мм глубины.

**LED-монтаж — во время установки или позже?**
Оба варианта возможны. Лучше во время монтажа, вместе с прокладкой электрики.

**Стоит ли ставить теневой шов при реновации?**
Однозначно. Реновация — лучшее время, поскольку стены и так без отделки.

**Можно ли комбинировать несколько применений теневого шва?**
Да, и это часто самое сильное дизайн-решение. Сочетание напольного плинтуса, потолочного теневого шва и дверного проёма без рамы создаёт целостный архитектурный язык.

window.PostBodyTuubidRu = PostBodyTuubidRu;
window.PostBodyInterjoorisRu = PostBodyInterjoorisRu;
window.PostBodyVorrdlusRu = PostBodyVorrdlusRu;`,
  },
  'varjuvuuk-eesti-standard': {
    titleEt: `Varjuvuugi tõus kaasaegses sisearhitektuuris`,
    titleRu: `Подъём теневого шва в современной интерьерной архитектуре`,
    catEt: 'Tehniline', catRu: 'Технический',
    yearEt: '2026 · jaan', yearRu: '2026 · янв',
    read: '6 min',
    cover: '/assets/projects/projekt03.webp',
    excerptEt: `Miks on varjuvuuk muutunud arhitektide eelistatud detailiks.`,
    excerptRu: `Почему теневой шов стал любимой деталью архитекторов.`,
    bodyEt: `Viimaste aastate jooksul on **varjuvuuk** muutunud kaasaegse sisearhitektuuri silmapaistvaks detailiks, haarates nii arhitektide kui ka disainerite tähelepanu. See minimalistlik element on ühtaegu funktsionaalne ja esteetiline uuendus, mis muudab ruumi tajumist ja kogemist.

## Mis on varjuvuuk?

Sisuliselt on varjuvuuk teadlikult jäetud süvend kahe pinna vahel — näiteks seina ja põranda või ukse- ja aknaraamide ümber. See vuuk loob varju, mis lisab ruumile sügavust ja defineerib selle puhtaid jooni, mis on tihedalt seotud kaasaegse arhitektuuri keelega. Lihtne idee, suur mõju.

## Visuaalne mõju ja esteetiline väärtus

Üks peamisi põhjuseid, miks varjuvuuk on populaarne, peitub selle võimes parandada ruumi üldist visuaalset taset. Eemaldades vajaduse traditsioonilise põrandaliistu, karniisi või arhitraavi järele, aitab varjuvuuk luua sujuva ja korrastatud ilme. Sellise minimalistliku lähenemise järele on kaasaegses disainis tugev nõudlus — sest tihti tähendab "vähem" tegelikult "rohkem".

Kui traditsioonilised dekoratiivsed elemendid kaovad, tuleb esile arhitektuur ise — seinad, materjalid, ruumi proportsioonid. Tulemus on sidusam ja viimistletum esteetika, kus iga element on oma kohal.

## Praktilised eelised

Lisaks väljanägemisele pakub varjuvuuk ka tegelikku funktsionaalsust. Vuuk võimaldab näiteks puidust põranda paisumist ja kahanemist materjali loomulike liikumiste käigus — mis hoiab ära pragude ja kõverumiste tekkimise aja jooksul. See teeb varjuvuugist atraktiivse valiku neile, kes hindavad pikaajalist vastupidavust ja madalat hoolduskulu.

Lisaks aitavad varjuvuugid:
- **Peita pinna ebatasasuse** (kõverad seinad, väikesed paigaldusvead)
- **Lihtsustada värvimist** (puudub teipimisvajadus, sein lõpeb selgelt servast)
- **Vähendada tolmu kogumiskohti** (pole väljaulatuvat ülaserva)

Need eelised teevad varjuvuugist atraktiivse valiku, kui otsida pikaajaliselt vastupidavat ja madalalt hooldatavat lahendust.

## Arhitektide vaade — miks varjuvuuk istub paljudesse projektidesse

Arhitektidele on varjuvuuk eriline tööriist, mis aitab säilitada disaini terviklikkust. Traditsioonilised viimistlusdetailid — nagu karniisid ja paksud profiilid — võivad tihti tunduda hilisemate parandustena, mis lõhuvad disaini puhast eesmärki. Varjuvuuk on seevastu integreeritud projekti algusest peale, andes mõõdetud ja mõjusa võimaluse rõhutada ruumi proportsioone ja arhitektuurseid jooni.

See on detail, mis koosneb pigem millegi puudumisest kui lisamisest — ja just see eemaldamise loogika annab talle tugevuse. Selle valib arhitekt, kes mõtleb disainile mitte juhusliku, vaid teadliku terviklikuna.

## Mitmekülgsus erinevates ruumides

Varjuvuugi populaarsust toetab ka selle paindlikkus. Seda saab kasutada paljudes erinevates olukordades — eluruumides, kontorites, kommertsruumides ja avalikes hoonetes. Kui rääkida konkreetsest paigutusest, on populaarseimad lahendused:

- **Lae varjuvuuk** — loob "hõljuva lae" efekti
- **Põrandasokli varjuvuuk** — asendab tavalist põrandaliistu
- **Ukseraami ümbritsev varjuvuuk** — loob raamita ukseava
- **Seinapaneelide vahelised vuugid** — eraldab materjale ja annab rütmi

See võimaldab kohandada lahendusi vastavalt stiilile ja eelistustele — minimalistlikust skandinaaviast tööstusliku eleganssini. Lihtsa kohandamise korral võib varjuvuuk täiendada peaaegu igat tüüpi kaasaegset disaini.

## Kokkuvõte

Varjuvuuk on muutunud sisearhitektuuris märkimisväärseks detailiks, kuna see sobib täiuslikult kaasaegse soovi järele lihtsust, funktsionaalsust ja eleganssi. Tema võime tõsta nii ruumi esteetikat kui ka praktilisi omadusi muudab ta valikuks disaineritele, kes püüavad luua ajatuid ja mõjusaid interjööre. Tõenäoliselt jätkub selle populaarsuse kasv just sellepärast, et varjuvuuk ei räägi konkreetse aja moest — see räägib ruumi enda olemusest.

**[CTA]**

> Tahad lähemalt teada, kuidas varjuvuuki sinu projektis kasutada saab?
> Tehnika 14, Tallinn. Tasuta projektikonsultatsioon, näidised käes ja konkreetne lahenduse soovitus sinu ruumi jaoks.

---

## KKK

**Mis on varjuvuuk?**
Varjuvuuk on teadlikult jäetud süvend kahe pinna vahel — näiteks seina ja põranda, lae või ukseraami ümber. See vuuk loob varju, mis annab ruumile sügavust ja toob esile arhitektuurseid jooni.

**Miks on varjuvuuk populaarsuse kasvanud?**
Selle põhjuseks on kaasaegne soov vähem dekoratiivsuse ja rohkem arhitektuurse selguse järele. Varjuvuuk asendab massiivseid detaile (karniis, põrandaliist, ukseraami profiil) lihtsa joonega, mis aitab esile tõsta ruumi enda väärtust.

**Kus saab varjuvuuki kasutada?**
Kõige levinumalt põranda ja seina kohtumiskohas (peitliist), aga ka lae ja seina kohtumiskohas (lae varjuvuuk), ukseraami ümber (raamita uksed) ning seinapaneelide vahel. Igal rakendusel on oma profiil.

**Kas varjuvuuk on funktsionaalne või ainult esteetiline?**
Mõlemat. Esteetiliselt loob ta puhta, minimalistliku ilme. Funktsionaalselt võimaldab ta materjali (näiteks puidu) paisumist ja kahanemist, lihtsustab värvimist ning aitab peita väiksemaid pinnamõõtmise ebatäpsusi.

**Kas varjuvuugi paigaldus on keeruline?**
Paigaldus eeldab täpsust ja sageli ka pahteldaja oskust. Uusarenduse või täisrenoveerimise käigus on parim aeg varjuvuugi paigaldamiseks. Pinnale paigaldatav versioon on mõnevõrra lihtsam ja sobib olemasolevatesse ruumidesse.

**Kas varjuvuuk sobib igasse stiili?**
Kõige paremini sobib see kaasaegsete, minimalistlike ja kommertsstiilide juurde. Klassikalistes ja periood-stiilides võib see konflikteeruda algse disainikeelega — siis sobib traditsiooniline põrandaliist paremini.

**Kas varjuvuuk on pikaajaline investeering?**
Jah. Õigesti paigaldatud varjuvuuk (eriti alumiiniumprofiiliga) kestab aastakümneid ilma märgatava kulumiseta. Lisaks ei vana selle minimalistlik stiil moe muutuste tõttu kiiresti.

**Kus enamasti kohtab varjuvuuki?**
Kaasaegsetes elamutes, kunstigaleriides, kõrgklassi kontorites, hotellides ja restoranides. Iga ruum, kus eesmärk on tõsta arhitektuurset väljendust ja minimalistlikku karakterit.

---`,
    bodyRu: `В последние годы теневой шов стал заметной деталью современной интерьерной архитектуры, привлекая внимание и архитекторов, и дизайнеров.

    Этот минималистичный элемент — одновременно функциональная и эстетическая инновация, меняющая восприятие и переживание пространства.

## Что такое теневой шов?

    По сути, теневой шов — это сознательно оставленное углубление между двумя поверхностями: например, стеной и полом, или вокруг дверных и оконных рам. Этот шов создаёт тень, добавляющую помещению глубину и определяющую его чистые линии, тесно связанные с языком современной архитектуры. Простая идея, большой эффект.

## Визуальное воздействие и эстетическая ценность

    Одна из главных причин популярности теневого шва — в его способности улучшать общий визуальный уровень помещения. Убирая необходимость в традиционном плинтусе, карнизе или наличнике, теневой шов помогает создать плавный и упорядоченный вид. На такой минималистичный подход в современном дизайне большой спрос — ведь часто «меньше» означает «больше».

    Когда традиционные декоративные элементы исчезают, на передний план выходит сама архитектура — стены, материалы, пропорции пространства. Получается более цельная и завершённая эстетика, где каждый элемент на своём месте.

## Практические преимущества

    Кроме внешнего вида, теневой шов даёт реальную функциональность. Шов, например, позволяет деревянному полу расширяться и сжиматься в ходе естественных движений материала — что предотвращает появление трещин и коробления со временем.

    Эти преимущества делают теневой шов привлекательным выбором при поиске долговечного и не требующего ухода решения.

## Взгляд архитекторов

    Для архитекторов теневой шов — особый инструмент, помогающий сохранить целостность дизайна. Традиционные отделочные детали — карнизы, толстые профили — часто кажутся поздними дополнениями, нарушающими чистую цель дизайна. Теневой шов, напротив, интегрирован в проект с самого начала, давая взвешенную и эффектную возможность подчеркнуть пропорции помещения и архитектурные линии.

    Это деталь, состоящая скорее из отсутствия чего-то, чем из добавления — и именно эта логика убирания даёт ей силу. Её выбирает архитектор, мыслящий не случайно, а как сознательное целое.

## Универсальность в разных помещениях

    Популярность теневого шва поддерживает и его гибкость. Его можно применять во многих ситуациях — в жилых помещениях, офисах, коммерческих пространствах и общественных зданиях.

    При простой адаптации теневой шов может дополнить почти любой современный дизайн — от минималистичного скандинавского до индустриальной элегантности.

## Итог

    Теневой шов стал значимой деталью в интерьерной архитектуре, поскольку он идеально подходит для современного желания простоты, функциональности и элегантности. Его способность повышать и эстетику помещения, и его практические свойства делает его выбором для дизайнеров, стремящихся создавать вневременные и впечатляющие интерьеры.

## Часто задаваемые вопросы

**Что такое теневой шов?**
Теневой шов — сознательно оставленное углубление между двумя поверхностями: например, стеной и полом, потолком или вокруг дверного проёма. Создаёт тень, придающую помещению глубину.

**Почему теневой шов стал популярным?**
Причина — современное желание меньше декоративности и больше архитектурной ясности.

**Где можно использовать теневой шов?**
Чаще всего на стыке пола и стены, но также на стыке потолка и стены, вокруг дверного проёма и между стеновыми панелями.

**Теневой шов функциональный или только эстетический?**
И то, и другое. Эстетически создаёт чистый вид. Функционально позволяет материалу расширяться, упрощает покраску и помогает скрыть неточности замеров поверхности.

**Монтаж теневого шва сложный?**
Монтаж требует точности и часто опыта шпаклёвщика. Лучшее время — во время строительства.

**Подходит ли теневой шов к любому стилю?**
Лучше всего подходит к современному, минималистичному и коммерческому стилям. В классике и эпохальных стилях может конфликтовать.

**Теневой шов — долгосрочная инвестиция?**
Да. Правильно установленный шов прослужит десятилетия. Его минималистичный стиль не устаревает быстро из-за смены моды.

**Где чаще всего встречается теневой шов?**
В современных жилых домах, художественных галереях, офисах премиум-класса, отелях и ресторанах.

/* ─────────────────────────────────────────────────────────
   POST 8 RU — Полный гид по теневым профилям (flagship)
   ───────────────────────────────────────────────────────── */`,
  },
  'porandaliistu-stiilid-2026': {
    titleEt: `Põrandaliistu stiilid 2026: 5 trendi, mis kujundavad siseviimistlust`,
    titleRu: `Стили плинтусов 2026: 5 трендов отделки`,
    catEt: 'Trend', catRu: 'Тренды',
    yearEt: '2025 · dets', yearRu: '2025 · дек',
    read: '5 min',
    cover: '/assets/projects/projekt01.webp',
    excerptEt: `Milliseid põrandaliistu stiile eelistavad Eesti sisearhitektid 2026. aastal.`,
    excerptRu: `Какие стили плинтусов предпочитают эстонские дизайнеры в 2026 году.`,
    bodyEt: `Põrandaliist on ruumi viimase puudutuse element, mis pakub nii kaitsefunktsiooni kui ka dekoratiivset rolli. Õige liistu stiili valik suudab muuta kogu interjööri iseloomu, lisades sellele karakterit või toetades olemasolevat disainikeelt. See artikkel tutvustab Eesti turul populaarseid põrandaliistude stiile, et aidata sul teha teadlik valik oma kodu, projekti või ärihoone jaoks.

## Viis populaarsemat põrandaliistu stiili

Põrandaliistu valimisel on oluline mõelda läbi, milline stiil sobib ruumi disainikeelega. Allpool on viis kõige levinumat lähenemist.

### 1. Traditsioonilised põrandaliistud

Traditsioonilised liistud on tihti rikkalike kujunduselementidega — kaarjate vormide, pärliridade ja dekoratiivsete uurete ja sisselõigetega. Need on parim valik ajaloolistele majadele või klassikalise interjööri stiilis kodudele, kuna nad lisavad ruumile eleganssi ja meisterlikkust.

- Valmistatakse tüüpiliselt puidust või MDF-ist
- Kõrgus tavaliselt 120–200 mm või kõrgemgi
- Värvitakse sageli valgeks või peitsitakse, et tuua esile puidumustrit

### 2. Moodsad minimalistlikud põrandaliistud

Kaasaegses interjööris töötavad kõige paremini liistud puhaste, sirgete joontega. Need on tavaliselt tasapinnalised või lihtsalt kammitletud servaga, mis annab elegantse ja märkamatu lõpetuse.

- Tavaliselt madalamad, 70–100 mm
- Saab värvida julgetes toonides või jätta valgeks
- Valmistatakse sageli alumiiniumist, MDF-ist või liidikiviga puidust

Eesti turul on alumiiniumist tehtud kaasaegseid lahendusi mitmesuguseid — kitsad mini-versioonid, lamedad liistud 40–100 mm kõrgusega ja täiesti peidetud lahendused (varjuprofiilid).

### 3. Beaded (pearliline) põrandaliistud

Beaded-tüüpi liistud sisaldavad väikest ümarat detaili — "pärli" — liistu ülaservas. See peen kaunistus lisab teksti, ilma et rikuks toa kompositsiooni.

- Sobivad nii klassikalistesse kui ka üleminekustiili interjööridesse
- Kõrgus tavaliselt umbes 120 mm
- Värvitakse või peitsitakse

### 4. Bullnose (ümarduslane) põrandaliistud

Bullnose-stiil tähendab, et liistu ülaserv on täielikult ümar. See pehmendab seina ja põranda kohtumist ning vähendab teravat serva — eelist nii laste kui ka kõrge liiklusega ruumide jaoks.

- Tüüpiline kasutus maamajades ja rustikaalse stiili kodudes
- Kõrgus üldjuhul 100–150 mm
- Tüüpiliselt valgeks värvitud või naturaalse puidu viimistlusega

### 5. Chamfered (kammitletud) põrandaliistud

Chamfered-stiilil on ülaservas kerge nurka lõigatud detail. See on selge ja korrektne lahendus, mis sobib hästi nii kaasaegsesse kui ka üleminekustiili interjööri.

- Kõrgus tavaliselt 90–150 mm
- Värvitakse sageli neutraalsetes toonides
- Valmistatakse MDF-ist või puidust

## Mis on praegu moes?

Hetkel kaldub trend kahele suunale: lihtsuse ja paindlikkuse poole. Inimesed ja sisearhitektid eelistavad liistusid, mis sulanduvad tervikuga, on vastupidavad ja hooldamiseks lihtsad.

- **Lamedad ja laiad liistud** on kogumas populaarsust eriti kaasaegsetes kodudes. Need teevad julget visuaalset avaldust ilma keerukate detailideta.
- **Värvitud liistud,** mille toon kas sobitub seinaga või moodustab teadliku kontrasti, lisavad ruumile kaasaegse karakteri.
- **Säästvad materjalid ja keskkonnasõbralikud viimistlused** on muutumas valikukriteeriumiks.
- **Periood-stiili liistud** on samuti tugev valik nendes projektides, kus aja autentsus on prioriteet — mõisamajade taastamine, ajalooliste korterite renoveerimine.

## Materjalid ja viimistlused

Materjali ja viimistluse valik on stiili kõrval sama oluline. Allpool kõige levinumad valikud.

### Puit
- Naturaalselt ilus ja vastupidav
- Saab peitsida või värvida
- Sobib klassikalisse ja rustikaalsesse stiili

### MDF (keskmise tihedusega kiudplaat)
- Soodne ja lihtne värvida
- Sile pind, sobib hästi kaasaegsele interjöörile
- Vähem vastupidav kui puit, kuid resistentne kõverumisele

### Alumiinium
- Tipptasemel vastupidavus ja minimaalne hooldus
- Tuleb juba pulbervärvituna, mis säästab paigaldusaega
- Eriti puhas ja moodne ilme, sobib projektidele, kus detailide täpsus on oluline

### PVC ja vinüül
- Niiskuskindel, ideaalne vannitubadesse ja kööki
- Saadaval erinevates stiilides
- Lihtne puhastada

### Viimistlused
- **Värvitud:** kõige levinum, võimaldab valida soovitud värvitooni
- **Peitsitud:** rõhutab puidumustrit
- **Lakitud:** kaitsev läikiv pind

## Põrandaliistude paigaldusnõuanded

Korralik paigaldus tagab nii kvaliteetse välimuse kui ka pika eluea. Mõõtmise ja paigaldamise nõuanded:

1. **Mõõda täpselt** — mõõda kogu toa perimeeter ja lisa 10% varuks.
2. **Valmista pinnad ette** — sein ja põrand peavad olema puhtad ja kuivad.
3. **Lõika täpselt** — kasuta nurkade jaoks miitersaagi, et nurgad oleksid puhtad.
4. **Kinnita kindlalt** — naelad, kruvid või liim sobivad sõltuvalt seina tüübist.
5. **Täida vahed ja kruviaugud** — kasuta kohendusvahatust või kittpuhastusvahendit.
6. **Värvi või viimistle pärast paigaldust** — see kaitseb paigaldamise käigus võimalike kahjustuste eest.

Ebatasaste pindade puhul (kõverad seinad, ebavõrdsed põrandad) tuleb mõnikord kasutada painduvaid liistusid või lisatöödeldud äärisliista, et saavutada puhas tulemus.

## Kuidas põrandaliistud rikastavad interjööri

Põrandaliistud ei ole pelgalt seina kaitseks. Nad mängivad ruumi disainis tähtsat rolli mitmel viisil.

- **Visuaalne huvi** — õige stiil ja värv lisavad ruumi sügavust ja teksti.
- **Ruumi defineerimine** — liistud raamivad ruumi ja tõstavad esile arhitektuursed detailid.
- **Põrandakatte täiendamine** — liistud võivad olla värvilt sarnased või vastandlikud põrandaga.
- **Kaablitehnika peitmine** — kaablid saab joosta liistu taga, mis hoiab ruumi puhtana.

Liistu valikul tuleb arvestada kogu kodu disainikeelega, samuti uste, akende ja mööbli stiilidega — see tagab tervikliku tulemuse.

## Kokkuvõte

Õige põrandaliistu valimine on lihtne, kuid mõjus viis interjööri rikastada. Olgu sinu maitse traditsiooniline või minimalistlik — sobiv stiil on alati olemas. Pööra tähelepanu materjalile, viimistlusele ja paigalduse kvaliteedile, et liist ei oleks ainult ilus, vaid ka pikaajaliselt vastupidav.

**[CTA]**

> Soovid näha põrandaliistude stiile käes ja võrrelda neid omavahel?
> Külasta Tehnika 14 salongi Tallinnas või võta meiega ühendust — aitame sind sobiva stiili, materjali ja paigaldusplaani valimisel.

---

## KKK

**Mis on Eesti turul kõige populaarsem põrandaliistu stiil?**
Kõige laiemalt kasutatakse kaasaegseid minimalistlikke liistusid (chamfered ja lamedad). Premium-projektides kasvab kiiresti peitliistude osakaal, eriti uutes elamutes ja kommertsruumides.

**Mis materjal on kõige vastupidavam?**
Alumiinium on kõige vastupidavam materjal — see ei kannata niiskuse, UV-valguse ega mehaaniliste löökide all. Massiivpuit on samuti tugev, kuid vajab regulaarset hooldust.

**Kas saan kombineerida erinevaid liistustiile ühes kodus?**
Tehniliselt jah, kuid tervikliku tulemuse jaoks soovitame siiski ühte stiili kogu eluruumi ulatuses. Kombinatsioon töötab, kui ruumid on selgelt eraldatud (näiteks vannituba, köök).

**Mis kõrgusega liist sobib paremini suuremasse tuppa?**
Suuremasse tuppa sobib kõrgem liist (120–200 mm), kuna see annab ruumile mastaabitundlikkuse. Madalama lae korral või väiksemas ruumis on parem valida madalam liist (40–80 mm) või peitliist.

**Kas liistu peab maalima enne või pärast paigaldust?**
Soovitatav on viimistleda pärast paigaldust, et katta kruviaugud, vahed ja paigalduse käigus tekkinud väikesed kahjustused. Värvitavate liistude puhul on tüüpiline lahendus paigaldus → täitmine → värvimine.

**Kas alumiiniumist liistu saab värvida?**
Standardsed alumiiniumist liistud on pulbervärvitud tehases. Värvi muutmine on tehniliselt võimalik, kuid soovitame asemel tellida soovitud RAL-toonis liistud — see tagab parima ja pikaealisema viimistluse.

**Kas peitliist on samuti liigitatav põrandaliistuks?**
Peitliist (varjuprofiil) on eriline alaliik — see on tehniliselt liist, kuid ulatub seina sisse, mitte sealt välja. Visuaalselt loob see hoopis teistsuguse efekti kui klassikalised liistud.

**Kui pikk on tavalise põrandaliistu eluiga?**
Sõltub materjalist. MDF-liist on tüüpiliselt 8–15 aastat (sõltuvalt kasutuskoormusest ja värvi seisukorrast). Alumiinium kestab 25+ aastat. Puit võib õige hoolduse korral kesta veelgi kauem.

---`,
    bodyRu: `Плинтус — это финальный штрих интерьера, выполняющий и защитную, и декоративную роль. Правильный выбор стиля плинтуса способен изменить характер всего интерьера.

    Эта статья представляет популярные на эстонском рынке стили плинтусов, чтобы помочь сделать осознанный выбор для дома, проекта или коммерческого здания.

## Пять самых популярных стилей плинтуса

### 1. Традиционные плинтусы

    Традиционные плинтусы часто богато декорированы — изогнутые формы, бусинчатые ряды, декоративные канавки и насечки. Лучший выбор для исторических домов или интерьеров в классическом стиле.

    - Обычно из дерева или MDF
- Высота как правило 120–200 мм
- Часто окрашиваются в белый или тонируются

### 2. Современные минималистичные плинтусы

    В современном интерьере лучше всего работают плинтусы с чистыми прямыми линиями. Обычно плоские или с простой фаской.

    - Обычно ниже — 70–100 мм
- Можно окрасить в смелые тона или оставить белыми
- Изготавливаются из алюминия, MDF или массива

### 3. Beaded (с бусиной) плинтусы

    Beaded-тип содержит небольшую округлую деталь — «бусину» — у верхнего края плинтуса. Эта тонкая деталь добавляет текстуру, не нарушая композицию.

    - Подходят и для классики, и для переходных стилей
- Высота обычно около 120 мм
- Окрашиваются или тонируются

### 4. Bullnose (с округлением) плинтусы

    Стиль bullnose означает полностью округлый верхний край. Это смягчает место встречи стены и пола и убирает острый угол — преимущество для семей с детьми и пространств с интенсивным движением.

    - Типично для загородных домов и рустика
- Высота 100–150 мм
- Обычно в белом цвете или из натурального дерева

### 5. Chamfered (с фаской) плинтусы

    Chamfered имеет лёгкий срез у верхнего края. Чёткое и корректное решение, подходящее и для современного, и для переходного интерьера.

    - Высота обычно 90–150 мм
- Часто в нейтральных тонах
- Из MDF или дерева

## Что сейчас в моде?

    Текущий тренд идёт в двух направлениях: простота и гибкость. Люди и дизайнеры интерьера предпочитают плинтусы, которые сливаются с целым, прочные и просты в уходе.

## Материалы и отделки

### Дерево

    Натурально красивое и прочное. Можно тонировать или окрашивать. Подходит для классики и рустика.

### MDF

    Доступный и легко красится. Ровная поверхность, подходит к современному интерьеру. Менее прочный, чем дерево, но устойчив к короблению.

### Алюминий

    Высшая прочность и минимум ухода. Поставляется уже окрашенным порошковой краской — экономит время монтажа. Особенно чистый и современный вид.

### ПВХ и винил

    Влагостойкий, идеален для ванных и кухонь. Доступны разные стили. Прост в уборке.

## Советы по монтажу плинтусов

## Как плинтусы обогащают интерьер

## Часто задаваемые вопросы

**Какой стиль плинтуса самый популярный на эстонском рынке?**
Шире всего применяются современные минималистичные (chamfered и плоские). В премиум-проектах быстро растёт доля скрытых плинтусов (теневых профилей).

**Какой материал самый долговечный?**
Алюминий — он не страдает от влаги, УФ-света и механических ударов.

**Можно ли комбинировать разные стили плинтуса в одном доме?**
Технически да, но рекомендуем один стиль на всё жилое пространство. Сочетание работает, если помещения чётко разделены.

**Какая высота плинтуса подходит для большего помещения?**
Для больших помещений — более высокий плинтус (120–200 мм). Для низких потолков или небольших помещений — ниже (40–80 мм) или скрытый плинтус.

**Окрашивать плинтус до или после монтажа?**
Рекомендуется отделка после монтажа — это покроет отверстия от шурупов, зазоры и мелкие повреждения.

**Можно ли красить алюминиевый плинтус?**
Стандартные алюминиевые плинтусы окрашиваются порошковой краской на заводе. Рекомендуем заказывать плинтус в нужном оттенке RAL.

**Скрытый плинтус — это тоже плинтус?**
Скрытый плинтус — особый подтип. Технически это плинтус, но он уходит в стену, а не выступает из неё.

**Каков срок службы обычного плинтуса?**
MDF — 8–15 лет. Алюминий — 25+ лет. Дерево при правильном уходе может прослужить ещё дольше.

/* ─────────────────────────────────────────────────────────
   POST 6 RU — 7 преимуществ скрытого плинтуса
   ───────────────────────────────────────────────────────── */`,
  },
  'peitliist-eelised-7-pohjust': {
    titleEt: `7 põhjust, miks kasutada peitliistu tavalise põrandaliistu asemel`,
    titleRu: `7 причин использовать скрытый плинтус вместо обычного`,
    catEt: 'Juhend', catRu: 'Гид',
    yearEt: '2025 · nov', yearRu: '2025 · ноя',
    read: '4 min',
    cover: '/assets/projects/projekt02.webp',
    excerptEt: `Argumendid, miks varjuprofiil on parem lahendus kui traditsiooniline põrandaliist.`,
    excerptRu: `Аргументы в пользу теневого профиля по сравнению с традиционным плинтусом.`,
    bodyEt: `Kui rääkida puhastest ja kaasaegsetest interjööridest, on **peitliist** üks neist väikestest detailidest, millel on suur mõju. Erinevalt tavalisest põrandaliistust, mis ulatub ruumi sisse, paikneb peitliist seinaga ühel tasapinnal. Tulemuseks on katkematu üleminek, mis lisab nii koju kui ka ärihoonesse väärikust ja mõõdetud eleganssi. Esteetika on aga vaid üks osa loost — peitliistul on terve rida praktilisi eeliseid, mida on kasulik teada enne valiku tegemist.

## Millised on peitliistu peamised eelised?

### 1. Sujuv, minimalistlik ilme

Peitliist toetab puhast ja minimalistlikku stiili, eemaldades traditsioonilise liistu massiivuse. See võimaldab seintel ja põrandatel loomulikult ja katkematult kohtuda. Tulemuseks on kompositsioon, kus tähelepanu jääb sellele, mis on tõeliselt oluline — arhitektuursetele ja dekoratiivsetele elementidele, mööblile, kunstile ja seinapindadele. Kõrgklassi ja korrastatud stiili otsivad omanikud, sisearhitektid ja arhitektid leiavad selles lahenduses täpselt seda, mida vaja.

### 2. Suurem ruumitundlikkus

Sisearhitektuuris suudavad ka väikesed nüansid drastiliselt muuta ruumi tunnet. Peitliist loob illusiooni kõrgematest seintest ja ruumikamatest tubadest. See on eriti väärtuslik korterites või väikestes majades, kus iga sentimeeter ja iga visuaalne trikk loevad. "Hõljuva seina" efekt annab ruumile sügavust ja õhku — kasu, mille ulatust ei pruugi enne kogemist mõista.

### 3. Kaitse ilma kompromissita

Kuigi peitliist näeb välja õrn, täidab ta jätkuvalt tavalise põrandaliistu funktsiooni — kaitseb seina alumist osa kraapide, löökide ja igapäevase kulumise eest. Olgu mõjutajaks mööbel, tolmuimeja või jalakäigu liiklus, peitliist pakub praktilist kaitset, ilma et see segaks disainivoogu. Eriti tugev on alumiiniumist peitliist, mis kannab kõvasid lööke, ilma et kuju või värv kannataks.

### 4. Ajatu ja paindlik

Peitliistuga viimistletud kodu jääb ajakohaseks pikemaks ajaks. Selle puhas, lihtne kuju ei seo end ühegi konkreetse moe või stiiliga, vaid sobitub paindlikult muutuvate trendidega. Tahad sa muuta värvilahendust, vahetada mööblit või nihutada disainikeelt minimalismist tööstuslikku stiili — peitliist jääb ühtlasi sobivaks taustaks. See on detail, mis ei vajata aastate pärast väljavahetamist ainult sellepärast, et tundub "vananenud".

### 5. Sobib peidetud detailidega

Tahad vaja, et kaablid, valgustusribad või ventilatsioonielemendid jääksid silmavälja? Peitliist annab selleks ideaalse lahenduse. Selle konstruktsioon võimaldab integreerida peidetud uksi, sisseehitatud LED-ribasid või varjatud juhtmestikku. Tehnoloogia jääb peitu, kuid säilitab juurdepääsetavuse — see on lahendus, mis ühendab esteetika ja funktsionaalsuse.

### 6. Lihtsam puhastamine ja hooldus

Ilma väljaulatuva ülaservata kaob ka koht, kus tolm muidu koguneda saab. Puhastus muutub lihtsamaks ja kiiremaks — tüüpilise tolmuimeja kitsa otsiku või lapikese liigutus üle vuugi on enamasti piisav. See on tundlik eelis allergiat põdevatele inimestele ja kommertsruumidele, kus puhtus on prioriteet (kontorid, kliinikud, hotellid).

### 7. Arhitektuurne väärtus

Lõpetuseks tasub mainida, et peitliist on detail, mis viitab kõrgemale arhitektuursele kvaliteedile ja peensusele. See võib lisada kinnisvara tajutavat väärtust nii müügi- kui ka renoveerimisprojektis. Kui sa renoveerid eesmärgiga müüa või kui ehitad oma alaliseks koduks, on see investeering, mis tasub end ära nii esteetikas kui ka kinnisvara tunnetuses.

## Kokkuvõte: investeering stiili ja funktsionaalsusesse

Need on vaid mõned paljudest põhjustest, miks peitliist on kasvanud kaasaegse siseviimistluse vaikimisi valikuks. Ta ei ainult tõsta ruumi visuaalset taset, vaid annab konkreetseid praktilisi eeliseid, mis muudavad selle nutikaks valikuks pikas perspektiivis. Olgu tegu eluruumi või kommertsruumi projektiga — selle detaili omaks võtmine võib muuta kogu ruumi tunnet ja kvaliteeti.

**[CTA]**

> Soovid näha peitliistu valikute mitmekesisust ja sobivust enda projektile?
> Külasta Tehnika 14 salongi Tallinnas või võta meiega ühendust — pakume tasuta projektikonsultatsiooni ja praktilist nõu.

---

## KKK

**Mis on peitliist?**
Peitliist on põrandaliistu lahendus, kus liist paikneb seinaga ühel tasapinnal, mitte ei ulatu seinast välja. See loob seina ja põranda vahele puhta vuugi ning annab interjöörile minimalistliku, kaasaegse ilme.

**Kas peitliist sobib igasse kodusse?**
Peitliist sobib enamikku kaasaegsetesse kodudesse, eriti minimalistliku või puhta stiili interjööri. Ajaloolistes kodudes, kus traditsiooniline detailirikkus on prioriteet, võib see vähem sobida.

**Kas peitliist on kallim kui tavaline põrandaliist?**
Jah, tavaliselt on materjali ja paigalduse kogukulu kõrgem. Pikas perspektiivis kompenseerib seda hooldusvabadus, eluiga ja kinnisvara väärtus.

**Kas peitliistu saab paigaldada ka olemasolevasse korterisse?**
Olemasolevasse seinakonstruktsiooni paigaldades on parimaks valikuks pinnale paigaldatav alumiiniumprofiil — see ei vaja seina lahti murdmist. Pahteldatav versioon vajab täisrenoveerimist.

**Kas peitliistu saab kombineerida LED-valgustusega?**
Jah, see on tegelikult üks selle kõige populaarsemaid kasutusi. Profiili sees on kanal LED-riba jaoks, mis loob pehme kaudse valgustuse.

**Mis materjalist peitliist tüüpiliselt on?**
Kõige levinum on alumiinium (eriti sulam 6063-T5), mis on tugev, kerge ja korrosioonikindel. Mõnel juhul kasutatakse alumiiniumi koos MDF-täidisega, mis võimaldab kohapeal seinaga ühte tooni värvida.

**Kas peitliist kogub tolmu vuugi sees?**
Mõnevõrra jah, kuid tunduvalt vähem kui tavaline põrandaliist (mille ülaservale tolm muidu koguneb). Puhastus on lihtne — tolmuimeja kitsa otsikuga kord paari kuu tagant.

**Kas peitliist tõstab kinnisvara väärtust?**
Peitliist annab arhitektuurset väärtust ja kaasaegset karakterit, mis võib aidata kinnisvara tajutavat kvaliteeditundlikkust tõsta. Konkreetne mõju müügihinnale sõltub piirkonnast ja teistest renoveerimise teguritest.

---`,
    bodyRu: `Когда речь идёт о чистых и современных интерьерах, скрытый плинтус — одна из тех маленьких деталей, которые имеют большое значение.

    В отличие от обычного плинтуса, выступающего внутрь помещения, скрытый плинтус расположен в одной плоскости со стеной. Получается непрерывный переход, добавляющий и дому, и коммерческому зданию достоинство и сдержанную элегантность. Эстетика — лишь часть истории. У скрытого плинтуса целый ряд практических преимуществ.

## 1. Плавный минималистичный вид

    Скрытый плинтус поддерживает чистый минималистичный стиль, убирая массивность традиционного плинтуса. Это позволяет стенам и полу естественно и непрерывно встречаться. Получается композиция, в которой внимание остаётся на действительно важном — архитектурных и декоративных элементах, мебели, искусстве, поверхностях стен.

## 2. Большее ощущение пространства

    В интерьерной архитектуре даже маленькие нюансы способны драматично изменить ощущение помещения. Скрытый плинтус создаёт иллюзию более высоких стен и более просторных комнат. Это особенно ценно в квартирах или маленьких домах, где каждый сантиметр и каждый визуальный трюк имеет значение.

## 3. Защита без компромисса

    Хотя скрытый плинтус выглядит хрупким, он по-прежнему выполняет функцию обычного плинтуса — защищает нижнюю часть стены от царапин, ударов и повседневного износа. Будь то мебель, пылесос или движение людей, скрытый плинтус обеспечивает практическую защиту, не нарушая дизайнерский поток.

## 4. Вне времени и гибкий

    Дом, отделанный скрытым плинтусом, остаётся актуальным дольше. Его чистая простая форма не связана с конкретной модой или стилем, а гибко адаптируется к меняющимся трендам. Хотите ли вы поменять цветовое решение, заменить мебель или сдвинуть дизайн-код от минимализма к индустриальному — скрытый плинтус остаётся подходящим фоном.

## 5. Подходит для скрытых деталей

    Нужно, чтобы кабели, световые ленты или вентиляционные элементы оставались вне поля зрения? Скрытый плинтус предлагает идеальное решение. Его конструкция позволяет интегрировать скрытые двери, встроенные LED-ленты или скрытую проводку. Технология остаётся скрытой, но сохраняется доступность.

## 6. Простой уход и чистка

    Без выступающего верхнего края исчезает и место, где обычно собирается пыль. Уборка становится проще и быстрее — обычно достаточно узкой насадки пылесоса или влажной тряпки по шву. Это чувствительное преимущество для аллергиков и коммерческих пространств, где чистота — приоритет.

## 7. Архитектурная ценность

    Скрытый плинтус — деталь, указывающая на более высокое архитектурное качество и проработанность. Это может добавить воспринимаемую стоимость недвижимости как при продаже, так и при реновации. Реновируете ли вы для продажи или строите для постоянного жилья — это инвестиция, окупающаяся и в эстетике, и в ощущении недвижимости.

## Итог: инвестиция в стиль и функциональность

    Это лишь некоторые из многих причин, по которым скрытый плинтус стал предпочтительным выбором современной отделки интерьера. Он не только повышает визуальный уровень помещения, но и даёт конкретные практические преимущества, что делает его умным выбором в долгосрочной перспективе.

## Часто задаваемые вопросы

**Что такое скрытый плинтус?**
Скрытый плинтус — это решение, в котором плинтус расположен в одной плоскости со стеной, а не выступает из неё. Это создаёт чистый шов между стеной и полом.

**Скрытый плинтус подходит для любого дома?**
Подходит для большинства современных домов, особенно для интерьеров в минималистичном или чистом стиле. В исторических домах может подходить меньше.

**Скрытый плинтус дороже обычного?**
Да, обычно общая стоимость материалов и монтажа выше. В долгосрочной перспективе это компенсируется отсутствием ухода, сроком службы и стоимостью недвижимости.

**Можно ли установить скрытый плинтус в существующую квартиру?**
Алюминиевый профиль с видимым монтажом хорошо подходит к существующим помещениям. Прошпаклёвываемая версия требует капитальной реновации.

**Можно ли совместить скрытый плинтус с LED-подсветкой?**
Да, это одно из самых популярных применений. Внутри профиля — канал для LED-ленты.

**Из какого материала обычно скрытый плинтус?**
Чаще всего — алюминий (сплав 6063-T5): прочный, лёгкий, коррозионностойкий.

**Скрытый плинтус собирает пыль в шве?**
Немного да, но значительно меньше, чем обычный плинтус. Уборка проста — узкой насадкой пылесоса раз в пару месяцев.

**Скрытый плинтус повышает стоимость недвижимости?**
Скрытый плинтус добавляет архитектурную ценность и современный характер, что помогает повысить воспринимаемое качество недвижимости.

/* ─────────────────────────────────────────────────────────
   POST 7 RU — Подъём теневого шва
   ───────────────────────────────────────────────────────── */`,
  },
};

// Add any remaining slugs as stubs
const PLACEHOLDER_SLUGS: string[] = [];
PLACEHOLDER_SLUGS.forEach((slug) => {
  if (!POSTS[slug]) {
    POSTS[slug] = {
      titleEt: slug.replace(/-/g, ' '), titleRu: slug.replace(/-/g, ' '),
      catEt: 'Artiklid', catRu: 'Статьи',
      yearEt: '2025', yearRu: '2025',
      read: '5 min', cover: '/assets/projects/projekt01.webp',
      excerptEt: '', excerptRu: '',
      bodyEt: 'Artikli sisu tulekul.', bodyRu: 'Содержание статьи скоро.',
    };
  }
});

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const p = POSTS[slug];
  if (!p) return {};
  const ru = locale === 'ru';
  return {
    // NB: the intermediate uudised/layout.tsx title blocks the root template,
    // so the brand suffix must be added manually here.
    title: `${ru ? p.titleRu : p.titleEt} | Varjuprofiilid.ee`,
    description: ru ? p.excerptRu : p.excerptEt,
    alternates: {
      canonical: ru ? `${site.url}/ru/uudised/${slug}` : `${site.url}/uudised/${slug}`,
      languages: {
        et: `${site.url}/uudised/${slug}`,
        ru: `${site.url}/ru/uudised/${slug}`,
      },
    },
    openGraph: {
      title: ru ? p.titleRu : p.titleEt,
      description: ru ? p.excerptRu : p.excerptEt,
      type: 'article',
      images: [{ url: p.cover }],
      locale: ru ? 'ru_RU' : 'et_EE',
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(POSTS).flatMap((slug) => [
    { locale: 'et', slug },
    { locale: 'ru', slug },
  ]);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const ru = locale === 'ru';
  const p = POSTS[slug];
  if (!p) notFound();

  const pfx = ru ? '/ru' : '';
  const title = ru ? p.titleRu : p.titleEt;
  const body = ru ? p.bodyRu : p.bodyEt;
  const cat = ru ? p.catRu : p.catEt;

  const relatedSlugs = Object.keys(POSTS).filter((s) => s !== slug).slice(0, 3);

  // BlogPosting structured data. Date parsed from the Estonian label (yearEt)
  // regardless of locale, since the publish date is the same in both.
  const canonical = ru ? `${site.url}/ru/uudised/${slug}` : `${site.url}/uudised/${slug}`;
  const cover = p.cover.startsWith('http') ? p.cover : `${site.url}${p.cover}`;
  const datePublished = isoDateFromYearEt(p.yearEt);
  const blogSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: ru ? p.excerptRu : p.excerptEt,
    image: cover,
    author: { '@type': 'Organization', name: site.legal, url: site.url },
    publisher: {
      '@type': 'Organization',
      name: site.legal,
      logo: { '@type': 'ImageObject', url: `${site.url}/assets/logo-must.svg` },
    },
    mainEntityOfPage: canonical,
    inLanguage: ru ? 'ru-RU' : 'et-EE',
  };
  if (datePublished) blogSchema.datePublished = datePublished;

  return (
    <div>
      <JsonLd data={blogSchema} />
      {/* Breadcrumb + title */}
      <section style={{ padding: '72px 56px 48px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          <Link href={pfx || '/'}>{ru ? 'Главная' : 'Avaleht'}</Link>
          {' / '}
          <Link href={`${pfx}/uudised`}>{ru ? 'Журнал' : 'Uudised'}</Link>
          {' / '}
          <span style={{ color: 'var(--ink)' }}>{cat}</span>
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', margin: 0, lineHeight: 0.95, maxWidth: '20ch' }}>
          {title}
        </h1>
        <div className="vp-mono" style={{ fontSize: 12, marginTop: 16, color: 'var(--muted)', display: 'flex', gap: 24 }}>
          <span>{cat}</span>
          <span>{ru ? p.yearRu : p.yearEt}</span>
          <span>{p.read} {ru ? 'чтения' : 'lugemine'}</span>
        </div>
      </section>

      {/* Cover */}
      <div style={{ aspectRatio: '16/7', borderBottom: 'var(--border)', overflow: 'hidden', background: 'var(--paper-2)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.cover} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* Article body + sidebar */}
      <section style={{ padding: '56px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, borderBottom: 'var(--border)', alignItems: 'start' }}>
        <article>
          <MarkdownBody text={body} />
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: 'var(--border)', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href={`${pfx}/tooted`} className="vp-btn vp-btn--lg">{ru ? 'Открыть каталог →' : 'Vaata kataloogi →'}</Link>
            <Link href={`${pfx}/kontakt`} className="vp-btn vp-btn--ghost">{ru ? 'Бесплатная консультация' : 'Tasuta nõustamine'}</Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: 24 }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Другие статьи' : 'Teised artiklid'}</div>
          {relatedSlugs.map((s) => {
            const rel = POSTS[s];
            return (
              <Link key={s} href={`${pfx}/uudised/${s}`} style={{ display: 'block', padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.1)', textDecoration: 'none', color: 'inherit' }}>
                <div className="vp-mono" style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 4 }}>{ru ? rel.catRu : rel.catEt}</div>
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{ru ? rel.titleRu : rel.titleEt}</div>
              </Link>
            );
          })}
          <div style={{ marginTop: 32, padding: '20px', border: 'var(--border)', background: 'var(--paper-2)' }}>
            <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{ru ? 'Нужна консультация?' : 'Küsimusi?'}</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)', margin: '0 0 14px' }}>
              {ru ? 'Помогаем с выбором профилей бесплатно.' : 'Aitame profiilide valikul tasuta.'}
            </p>
            <Link href={`${pfx}/kontakt`} className="vp-btn" style={{ display: 'inline-block' }}>
              {ru ? 'Написать →' : 'Võta ühendust →'}
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
