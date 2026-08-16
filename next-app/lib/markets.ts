// Turud — üks tõeallikas kõigele, mis sõltub domeenist.
//
// varjuprofiilid.ee = Eesti turg (et + ru), varjoprofiilit.fi = Soome turg
// (fi + sv). Sama koodibaas, sama kataloog, aga käibemaks, tarne, e-post,
// brändinimi ja keelevalik tulevad siit — mitte komponendist.
//
// Poe domeen on mõlemal turul märksõnadomeen (varjuprofiilid.ee /
// varjoprofiilit.fi), e-post aga firmadomeenil (@prospace.ee / @prospace.fi) —
// sama muster, mis Eestis juba töötab.
//
// Reegel: kui väärtus sõltub turust, EI tohi see olla komponendis kõva ega
// lib/site.ts-is. site.ts jääb firmafaktide jaoks, mis on mõlemal turul
// identsed (PROSPACE OÜ reg.nr, KMKR, aadress, telefon).
//
// Käibemaksu kohta: kuvatav määr tuleb turust, aga LÕPLIK määr sõltub kauba
// sihtriigist ja ostja staatusest (EL-i sisene B2B kehtiva KM-numbriga = 0%,
// pöördmaksustamine). Turg annab vaikimisi kuvamise, kassa arvutab lõpliku.

export type MarketId = 'ee' | 'fi';

export type Market = {
  id: MarketId;
  /** Hostid, mis selle turu juurde kuuluvad (www ja apex mõlemad). */
  hosts: string[];
  /** Kanooniline päritolu — kõik absoluutsed URL-id ehitatakse siit. */
  origin: string;
  locales: readonly string[];
  defaultLocale: string;
  /** Poe nimi, mida kuvatakse (title'i lõpp, jalus). */
  storefront: string;
  /** Avalikult kuvatav e-post (jalus, kontaktileht, JSON-LD). */
  email: string;
  /**
   * Postkast, kuhu vormide teavitused PÄRISELT lähevad. Soome turul kuvatakse
   * info@prospace.fi, aga eraldi postkasti veel ei ole — kirjad tulevad Eesti
   * omasse. Kui Soome postkast kunagi tehakse, muuda ainult see rida.
   * NB: info@prospace.fi peab olema Elkdatas ümber suunatud info@prospace.ee
   * peale, muidu põrkab klient, kes kuvatud aadressile ise kirjutab.
   */
  inbox: string;
  /** Resendi saatja-aadressid; domeen peab olema Resendis kinnitatud. */
  mailFrom: { order: string; contact: string; b2b: string };
  /** Turu enda sotsiaalkanalid — Soomes on eraldi Instagrami konto. */
  social: { instagram: string; instagramHandle: string; facebook?: string };
  /** Jaluses viidatavad õdedomeenid. Soome jalus ei vii Eesti saitidele. */
  sisters: readonly string[];
  /** Kuvatav käibemaksumäär protsentides. */
  vatPercent: number;
  shipping: {
    carrier: string;
    /** Netohind eurodes (kuvatakse "+ KM" märkega, nagu seni). */
    price: number;
    /** Tasuta tarne piir tellimuse summast (KM-ga, sama loogika kui Eestis). */
    freeFrom: number;
  };
  /** Kas see turg on otsimootoritele avatud. */
  indexable: boolean;
};

export const MARKETS: Record<MarketId, Market> = {
  ee: {
    id: 'ee',
    hosts: ['varjuprofiilid.ee', 'www.varjuprofiilid.ee'],
    origin: 'https://varjuprofiilid.ee',
    locales: ['et', 'ru'],
    defaultLocale: 'et',
    storefront: 'Varjuprofiilid.ee',
    email: 'info@prospace.ee',
    inbox: 'info@prospace.ee',
    mailFrom: {
      order: 'tellimused@varjuprofiilid.ee',
      contact: 'kontakt@varjuprofiilid.ee',
      b2b: 'b2b@varjuprofiilid.ee',
    },
    social: {
      instagram: 'https://www.instagram.com/varjuprofiilid.ee/',
      instagramHandle: '@varjuprofiilid.ee',
      facebook: 'https://www.facebook.com/profile.php?id=61586852627963',
    },
    sisters: ['prospace.ee', 'peitlenguksed.ee'],
    vatPercent: 24,
    shipping: { carrier: 'Venipak', price: 25, freeFrom: 200 },
    indexable: true,
  },

  fi: {
    id: 'fi',
    // Kanooniline on apex, nagu Eestis: Google valis muidu ise www-variandi.
    hosts: ['varjoprofiilit.fi', 'www.varjoprofiilit.fi'],
    origin: 'https://varjoprofiilit.fi',
    locales: ['fi', 'sv'],
    defaultLocale: 'fi',
    storefront: 'Varjoprofiilit.fi',
    email: 'info@prospace.fi',
    inbox: 'info@prospace.ee',
    // Saatja jääb TEADLIKULT kinnitatud .ee domeenile. Need kirjad on
    // sisemised teavitused — need lähevad meile endale (to: market.email) ja
    // klient näeb ainult meie vastust oma postkastist. Saatja-domeeni ta ei
    // näe kunagi, seega teist Resendi domeeni (ja tasulist plaani) pole vaja.
    // Kui kunagi hakkame kliendile automaatkinnitust saatma, tuleb
    // varjoprofiilit.fi Resendis kinnitada ja see siin ümber panna.
    mailFrom: {
      order: 'tellimused@varjuprofiilid.ee',
      contact: 'kontakt@varjuprofiilid.ee',
      b2b: 'b2b@varjuprofiilid.ee',
    },
    social: {
      instagram: 'https://www.instagram.com/varjoprofiilit.fi/',
      instagramHandle: '@varjoprofiilit.fi',
      facebook: 'https://www.facebook.com/varjoprofiilit.fi',
    },
    // Tühi seni, kuni prospace.fi peal on päriselt midagi — surnud lingile
    // jalusest viitamine on halvem kui puuduv link.
    sisters: [],
    // 24%, MITTE Soome 25,5% — ja see on teadlik.
    //
    // EL-i kaugmüügi reegel: kuni piiriülene B2C-müük jääb alla 10 000 €
    // aastas (kogu EL peale kokku), rakendub MÜÜJA riigi määr ehk Eesti 24%.
    // Alles piirmäära ületamisel tuleb küsida sihtriigi määra (Soomes 25,5%)
    // ja deklareerida see OSS-erikorra kaudu.
    //
    // PROSPACE OÜ ei ole piiri ületanud (kinnitatud 16.08.2026), seega
    // Soome eraisik maksab 24%. Kui piir ületatakse või OSS-i registreerutakse:
    //   1. muuda see väärtus 25.5-ks
    //   2. jooksuta `npx tsx scripts/vat-rate.ts 25,5` — see parandab määra
    //      ka tõlgitud tekstides (messages/{fi,sv}.json + catalog kirjeldused,
    //      ~136 kohta), sest seal on protsent lauses sees
    vatPercent: 24,
    shipping: { carrier: 'Venipak', price: 30, freeFrom: 300 },
    // Avatud 16.08.2026: tõlked valmis (1103 stringi + 98 tootekirjeldust),
    // soomlased kinnitasid teksti, scripts/launch-check.ts andis "PUHAS".
    indexable: true,
  },
};

/** Vaikimisi turg: tundmatu host (localhost, *.vercel.app preview) = Eesti. */
export const DEFAULT_MARKET: MarketId = 'ee';

export const ALL_LOCALES = ['et', 'ru', 'fi', 'sv'] as const;

/**
 * Host -> turg. Port ja tõstutundlikkus maha; x-forwarded-host on Verceli
 * taga õigem kui host, seepärast annab kutsuja selle ise ette.
 */
export function marketFromHost(host: string | null | undefined): Market {
  const clean = (host ?? '').toLowerCase().split(':')[0].trim();
  for (const market of Object.values(MARKETS)) {
    if (market.hosts.includes(clean)) return market;
  }
  return MARKETS[DEFAULT_MARKET];
}

/** Keel -> turg. Kasutame seal, kus hosti pole käepärast (nt sitemapid). */
export function marketForLocale(locale: string): Market {
  for (const market of Object.values(MARKETS)) {
    if (market.locales.includes(locale)) return market;
  }
  return MARKETS[DEFAULT_MARKET];
}

/** Brutohind kuvamiseks: netohind × turu käibemaks. */
export function grossPrice(net: number, market: Market): number {
  return net * (1 + market.vatPercent / 100);
}

/**
 * catalog.json hoiab hinda Eesti 24% käibemaksuga. Netohinna saab ainult
 * sealt tagasi arvutades — see on invariant, mille peale kõik turud ehitavad.
 */
export function netFromEeGross(eeGross: number): number {
  return eeGross / (1 + MARKETS.ee.vatPercent / 100);
}

/** Kataloogihind antud turu jaoks. Eestis muutumatu, mujal ümber arvutatud. */
export function marketPrice(eeGross: number, market: Market): number {
  if (market.id === 'ee') return eeGross;
  return grossPrice(netFromEeGross(eeGross), market);
}

/** Open Graph og:locale kood keele järgi. */
export const OG_LOCALE: Record<string, string> = {
  et: 'et_EE', ru: 'ru_RU', fi: 'fi_FI', sv: 'sv_FI',
};

/** BCP-47 keelekood (JSON-LD inLanguage). */
export const BCP47: Record<string, string> = {
  et: 'et-EE', ru: 'ru-RU', fi: 'fi-FI', sv: 'sv-FI',
};
