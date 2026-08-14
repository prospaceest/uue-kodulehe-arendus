// Soome ja rootsi turu lehe-metaandmed — title ja meta description.
//
// Miks eraldi fail: title ja description on otsingutulemuses kõige olulisemad
// tekstid ja neid tuleb toimetada ilma komponente puutumata. Siin on nad ühes
// kohas, nii et soome emakeelne ülevaataja saab kogu SEO-teksti korraga läbi
// käia. Eesti ja vene tekstid jäävad lehtede sisse — neid ei tohi liigutada,
// see leht on livis ja töötab.
//
// Kasutus lehes (üks rida, kõige lõppu return-objekti):
//   return { alternates: …, title: ru ? … : …, description: …, ...pageMetaOverride('/kkk', locale) };
// Objekti laiendus lõpus kirjutab title ja description üle AINULT siis, kui
// keel on fi või sv. Eesti ja vene väljund ei muutu.
//
// Märksõnavalik: soome poolel käivad läbi nii "varjoprofiili" kui "varjolista"
// ja põranda puhul "jalkalista" — need on Soome turul otsitavad sõnad ja
// mahuvad pealkirja ilma URL-i muutmata. Rootsi pool on sv-FI (Soome
// rootsikeelne lugeja), seepärast "leverans till Finland".

type Meta = { title: string; description: string };

const FI: Record<string, Meta> = {
  '/': {
    title: 'Varjoprofiilit.fi — alumiiniset varjoprofiilit ja LED-profiilit',
    description:
      'Alumiiniset varjoprofiilit ja LED-profiilit kattoon, lattiaan ja seinään. Varasto Tallinnassa, toimitus Suomeen noin viikossa. 98 tuotetta.',
  },
  '/tooted': {
    title: 'Kauppa — kaikki varjoprofiilit ja LED-profiilit',
    description:
      'Kaikki alumiiniset varjoprofiilit — katto-, lattia- ja seinäprofiilit sekä alumiinijalkalistat. Suodata kategorian, värin ja LED-kanavan mukaan.',
  },
  '/kkk': {
    title: 'Usein kysytyt kysymykset',
    description:
      'Usein kysytyt kysymykset varjoprofiilien asennuksesta, toimituksesta, hinnoista ja RAL-sävyjen tilaamisesta.',
  },
  '/tarne': {
    title: 'Toimitus ja palautus',
    description:
      'Toimitusehdot: ilmainen toimitus yli 300 €, Venipak noin viikossa Suomeen. Palautusoikeus 14 päivää. Lasku SEPA-tilisiirtona.',
  },
  '/garantii': {
    title: 'Takuu ja reklamaatiot',
    description:
      'Varjoprofiilien takuuehdot — 5 vuotta valmistusvirheitä vastaan. Näin teet reklamaation PROSPACE OÜ:lle.',
  },
  '/impressum': {
    title: 'Yritystiedot ja ehdot',
    description:
      'Myyntiehdot, tietosuojakäytäntö, evästeet ja yritystiedot. Myyjä PROSPACE OÜ, Viro — tavarat toimitetaan Virosta.',
  },
  '/kontakt': {
    title: 'Yhteystiedot — PROSPACE OÜ',
    description:
      'Ota yhteyttä: info@prospace.fi. Varjoprofiilien tekninen neuvonta, RAL-tilaukset ja jälleenmyyjäasiat.',
  },
  '/salong': {
    title: 'Näyttelytila Tallinnassa — Vana-Kalamaja 8–110',
    description:
      'PROSPACE-näyttelytila Tallinnassa: katso profiilien mallikappaleet ja saa neuvoja. Avoinna ma–pe 10–17.',
  },
  '/meist': {
    title: 'Varjoprofiilit modernissa sisustuksessa',
    description:
      'Miksi varjoprofiili: piilotettu liitos luo leijuvan katon tai seinän vaikutelman. Pelkistetty, arkkitehtonisesti yhtenäinen lopputulos. PROSPACE OÜ.',
  },
  '/professionaalidele': {
    title: 'Jälleenmyyjille ja ammattilaisille — B2B',
    description:
      'Etsimme jälleenmyyjiä Suomesta. Jälleenmyyjähinnat, maksuehdot ja tekninen tuki arkkitehdeille, sisustussuunnittelijoille ja asentajille.',
  },
  '/inspiratsioon': {
    title: 'Inspiraatio — todellisia varjoprofiiliprojekteja',
    description:
      'Todellisia projekteja PROSPACE-varjoprofiileilla — omakotitalot, asunnot, kylpyhuoneet, toimistot. Kuvat, profiililuettelo ja mitat.',
  },
  '/mis-on-varjuprofiil': {
    title: 'Mikä on varjoprofiili? Täydellinen opas',
    description:
      'Varjoprofiili on alumiiniprofiili, joka luo kahden pinnan väliin tarkoituksellisen varjolinjan. Termit, tyypit, LED- ja koristeprofiilit, asennus ja UKK.',
  },
  '/led-varjuprofiilid': {
    title: 'LED-varjoprofiilit — LED-profiilit kattoon ja lattiaan',
    description:
      'LED-varjoprofiilit — alumiiniprofiilit LED-nauhan asennukseen. Kattoon, lattiaan, seinään ja keskikattoon. Varasto Tallinnassa, toimitus Suomeen.',
  },
  '/varjuprofiilid': {
    title: 'Varjoprofiilit — koristeprofiilit kattoon, seinään, lattiaan',
    description:
      'Koristevarjoprofiilit ilman LEDiä — puhdas arkkitehtoninen varjolinja alumiinista. Kattoon, seinään ja lattiaan. Mikä tahansa RAL-sävy.',
  },
};

const SV: Record<string, Meta> = {
  '/': {
    title: 'Varjoprofiilit.fi — skuggprofiler och LED-profiler i aluminium',
    description:
      'Skuggprofiler och LED-profiler i aluminium för tak, golv och vägg. Lager i Tallinn, leverans till Finland på cirka en vecka.',
  },
  '/tooted': {
    title: 'Butik — alla skuggprofiler och LED-profiler',
    description:
      'Alla skuggprofiler i aluminium — tak-, golv- och väggprofiler samt aluminiumgolvlister. Filtrera efter kategori, färg och LED-kanal.',
  },
  '/kkk': {
    title: 'Vanliga frågor',
    description:
      'Vanliga frågor om montering, leverans, priser och beställning av RAL-nyanser för skuggprofiler.',
  },
  '/tarne': {
    title: 'Leverans och retur',
    description:
      'Leveransvillkor: fri frakt över 300 €, Venipak cirka en vecka till Finland. Returrätt 14 dagar. Faktura via SEPA.',
  },
  '/garantii': {
    title: 'Garanti och reklamationer',
    description:
      'Garantivillkor för skuggprofiler — 5 år mot fabrikationsfel. Så gör du en reklamation till PROSPACE OÜ.',
  },
  '/impressum': {
    title: 'Företagsuppgifter och villkor',
    description:
      'Försäljningsvillkor, integritetspolicy, cookies och företagsuppgifter. Säljare PROSPACE OÜ, Estland — varorna skickas från Estland.',
  },
  '/kontakt': {
    title: 'Kontakt — PROSPACE OÜ',
    description:
      'Kontakta oss: info@prospace.fi. Teknisk rådgivning om skuggprofiler, RAL-beställningar och återförsäljarfrågor.',
  },
  '/salong': {
    title: 'Showroom i Tallinn — Vana-Kalamaja 8–110',
    description:
      'PROSPACE showroom i Tallinn: se profilprover och få rådgivning. Öppet mån–fre 10–17.',
  },
  '/meist': {
    title: 'Skuggprofiler i modern inredning',
    description:
      'Varför skuggprofil: en dold fog skapar intryck av svävande tak eller vägg. Ett avskalat, arkitektoniskt enhetligt resultat. PROSPACE OÜ.',
  },
  '/professionaalidele': {
    title: 'För återförsäljare och yrkesfolk — B2B',
    description:
      'Vi söker återförsäljare i Finland. Återförsäljarpriser, betalningsvillkor och teknisk support för arkitekter, inredare och montörer.',
  },
  '/inspiratsioon': {
    title: 'Inspiration — verkliga projekt med skuggprofiler',
    description:
      'Verkliga projekt med PROSPACE skuggprofiler — villor, lägenheter, badrum, kontor. Bilder, profillista och mått.',
  },
  '/mis-on-varjuprofiil': {
    title: 'Vad är en skuggprofil? Komplett guide',
    description:
      'En skuggprofil är en aluminiumprofil som skapar en avsiktlig skuggfog mellan två ytor. Termer, typer, LED- och dekorprofiler, montering och FAQ.',
  },
  '/led-varjuprofiilid': {
    title: 'LED-skuggprofiler — LED-profiler för tak och golv',
    description:
      'LED-skuggprofiler — aluminiumprofiler för LED-list. För tak, golv, vägg och mitten av taket. Lager i Tallinn, leverans till Finland.',
  },
  '/varjuprofiilid': {
    title: 'Skuggprofiler — dekorprofiler för tak, vägg, golv',
    description:
      'Dekorativa skuggprofiler utan LED — en ren arkitektonisk skuggfog i aluminium. För tak, vägg och golv. Valfri RAL-nyans.',
  },
};

const TABLES: Record<string, Record<string, Meta>> = { fi: FI, sv: SV };

/**
 * Tagastab tühja objekti eesti ja vene keele puhul — nii jääb nende väljund
 * täpselt endiseks. Soome ja rootsi puhul tagastab title + description, mis
 * laiendusena return-objekti lõpus kirjutab eestikeelsed üle.
 */
export function pageMetaOverride(etPath: string, locale: string): Partial<Meta> {
  return TABLES[locale]?.[etPath] ?? {};
}
