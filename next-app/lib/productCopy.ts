// Tootekirjelduse struktureerimine loetavaks tekstiks.
//
// catalog.json hoiab kirjeldust ühe 600–900-tähemärgilise lõiguna. Ekraanil oli
// see üks katkematu tekstiplokk, mille lõpuosa on igal tootel sama vormel:
// "Standardpikkus 2,5 m. Värvid: … Soovitatud LED-riba: … Hind on 1 m …".
// Need laused on faktid, mitte proosa — nad kuuluvad loetellu, ei lõiku.
//
// Siin ei kirjutata teksti ümber ega jäeta midagi välja: iga lause jõuab
// DOM-i (SEO), lihtsalt õigesse kohta. Tekstiandmed jäävad catalog.json-i
// ainsaks tõeallikaks, see moodul on ainult esitusloogika.

export type CopyFact = { label: string; value: string };

export type ProductCopy = {
  lead: string;          // avalause — mis toode on
  body: string[];        // sisulised lõigud (1–2 lauset lõigu kohta)
  facts: CopyFact[];     // "Pikkus 2,5 m", "Värvid: …" jne
  notes: string[];       // "NB! …" hoiatused — omaette märkusena
  priceNote: string;     // "Hind on 1 m värvitud profiili kohta…" — hinna juurde
};

type Rule = {
  re: RegExp;            // millise lause see haarab
  label: string;         // faktisildi tekst
  strip?: RegExp;        // eemaldatav sissejuhatus (label kordaks seda)
};

// Sildid on lühikesed ja monospace-suurtähtedes — pikk silt lööks veeru katki.
const RULES_ET: Rule[] = [
  { re: /^Standardpikkus\s/i,          label: 'Pikkus',    strip: /^Standardpikkus\s+/i },
  { re: /^Pikkus\s/i,                  label: 'Pikkus',    strip: /^Pikkus\s+/i },
  { re: /^(Tarnitakse|Saadaval) standardpikkuses\s/i, label: 'Pikkus', strip: /^\S+\s+standardpikkuses\s+/i },
  { re: /^Materjal\s/i,                label: 'Materjal',  strip: /^Materjal\s+/i },
  { re: /^Värvid\s*:/i,                label: 'Värvid',    strip: /^Värvid\s*:\s*/i },
  { re: /^Värvus\s*:/i,                label: 'Värvid',    strip: /^Värvus\s*:\s*/i },
  { re: /^Saadaval värvides\s*:/i,     label: 'Värvid',    strip: /^Saadaval värvides\s*:\s*/i },
  { re: /^Värvuspalett hõlmab\s/i,     label: 'Värvid',    strip: /^Värvuspalett hõlmab\s+/i },
  { re: /^RAL-(eri)?tellimusel\s/i,    label: 'RAL',       strip: /^RAL-(eri)?tellimusel\s+(saadaval\s+)?/i },
  { re: /^Soovitatud LED-riba\s*:/i,   label: 'LED-riba',  strip: /^Soovitatud LED-riba\s*:\s*/i },
  { re: /^LED-riba ja hajuti\s/i,      label: 'LED-riba',  strip: /^LED-riba ja hajuti\s+/i },
  { re: /^LED-funktsiooni ei ole/i,    label: 'LED',       strip: /^LED-funktsiooni\s+/i },
];

const RULES_RU: Rule[] = [
  { re: /^Стандартная длина\s/i,        label: 'Длина',     strip: /^Стандартная длина\s+/i },
  { re: /^Длина\s/i,                    label: 'Длина',     strip: /^Длина\s+/i },
  { re: /^Поставляется в стандартной длине\s/i, label: 'Длина', strip: /^Поставляется в стандартной длине\s+/i },
  { re: /^Материал\s/i,                 label: 'Материал',  strip: /^Материал\s+—?\s*/i },
  { re: /^Цвета\s*:/i,                  label: 'Цвета',     strip: /^Цвета\s*:\s*/i },
  { re: /^Цвет\s*:/i,                   label: 'Цвета',     strip: /^Цвет\s*:\s*/i },
  { re: /^Рекомендуемая LED-лента\s*:/i, label: 'LED-лента', strip: /^Рекомендуемая LED-лента\s*:\s*/i },
  // Ilma stripita: "заказываются" on mitmuses ja vajab mõlemat alust, muidu
  // jääks faktireale rippuv "заказываются отдельно".
  { re: /^LED-лента и диффузор\s/i,     label: 'LED-лента' },
  { re: /^LED-функции нет/i,            label: 'LED',       strip: /^LED-функции\s+/i },
];

// Faktiread kuvatakse alati samas järjekorras, sõltumata sellest kus lause
// kirjelduses seisis — mõõt enne materjali, tehnika lõppu.
const LABEL_ORDER_ET = ['Pikkus', 'Materjal', 'Värvid', 'RAL', 'LED-riba', 'LED'];
const LABEL_ORDER_RU = ['Длина', 'Материал', 'Цвета', 'LED-лента', 'LED'];

const PRICE_RE_ET = /^Hind (on|kehtib)\s/i;
const PRICE_RE_RU = /^Цена за\s/i;

// "Standardpikkus 2,5 m, materjal alumiinium." → kaks eraldi fakti.
const MATERIAL_TAIL_ET = /,\s*materjal\s+/i;
const MATERIAL_TAIL_RU = /,\s*материал\s+—?\s*/i;

function sentences(text: string): string[] {
  // Lause lõpp = punkt/hüüumärk + tühik + suurtäht või number. Ilma
  // järgnevuskontrollita läheks "2,5 m." või "CRI 94, 24V." katki.
  // Erandid: "NB!" ei lõpeta lauset (muidu jääks sellest omaette tühi lõik) ja
  // lühendid "см. ASP238" / "vt. AST12" ei alusta uut lauset.
  return text
    // NB: \b ei tööta kirillitsaga (\w on ASCII-põhine), seepärast ilma selleta.
    .split(/(?<=[.!])(?<!(?:NB!|см\.|vt\.|nt\.|jm\.|ca\.))\s+(?=[A-ZÕÄÖÜŠŽА-ЯЁ0-9⚡])/u)
    .map((s) => s.trim())
    .filter(Boolean);
}

function tidy(value: string): string {
  // Faktiväärtus ei vaja lõpupunkti ega suurt algustähte lause keskelt.
  return value.replace(/\s*[.;]\s*$/, '').trim();
}

export function splitDescription(text: string, ru: boolean): ProductCopy {
  const empty: ProductCopy = { lead: '', body: [], facts: [], notes: [], priceNote: '' };
  if (!text || !text.trim()) return empty;

  const rules = ru ? RULES_RU : RULES_ET;
  const priceRe = ru ? PRICE_RE_RU : PRICE_RE_ET;
  const materialTail = ru ? MATERIAL_TAIL_RU : MATERIAL_TAIL_ET;
  const materialLabel = ru ? 'Материал' : 'Materjal';

  const all = sentences(text);
  const lead = all[0] ?? '';
  const rest = all.slice(1);

  const narrative: string[] = [];
  const facts: CopyFact[] = [];
  const notes: string[] = [];
  let priceNote = '';

  const addFact = (label: string, value: string) => {
    const v = tidy(value);
    if (!v) return;
    // Sama sildiga laused liidetakse ühte ritta (nt soovitatud LED-riba +
    // "tellitakse eraldi"), muidu tekiks kaks identse sildiga rida.
    const existing = facts.find((f) => f.label === label);
    if (existing) {
      if (!existing.value.includes(v)) existing.value += ` · ${v}`;
      return;
    }
    facts.push({ label, value: v });
  };

  for (const s of rest) {
    if (priceRe.test(s)) {
      priceNote = priceNote ? `${priceNote} ${s}` : s;
      continue;
    }

    if (/^NB!/.test(s)) {
      notes.push(s.replace(/^NB!\s*/, ''));
      continue;
    }

    const rule = rules.find((r) => r.re.test(s));
    if (!rule) {
      narrative.push(s);
      continue;
    }

    let value = rule.strip ? s.replace(rule.strip, '') : s;

    // Pikkuse lause kannab tihti materjali kaasa — tõsta see omaette faktiks.
    if ((rule.label === 'Pikkus' || rule.label === 'Длина') && materialTail.test(value)) {
      const [len, mat] = value.split(materialTail);
      value = len;
      addFact(materialLabel, mat);
    }

    // "COB 16 W/m, 1350 lm/m, CRI 94, 24V — COB annab ühtlase joone ilma
    // täppideta" — number on fakt, mõttekriipsu järgne selgitus on proosa.
    // Ainult LED-ridadel: seal on "spets — selgitus" muster süstemaatiline ja
    // just need read venivad pärast liitmist üle kahe rea.
    if (rule.label.startsWith('LED') && value.length > 70) {
      const cut = value.indexOf(' — ');
      if (cut > 15) {
        const tail = tidy(value.slice(cut + 3));
        value = value.slice(0, cut);
        if (tail) narrative.push(`${tail.charAt(0).toUpperCase()}${tail.slice(1)}.`);
      }
    }

    addFact(rule.label, value);
  }

  // Kaks lauset lõigu kohta: üks lause lõigus killustab, neli lauset on jälle
  // sein. Ülejääv üksik lause jääb omaette lõiguks.
  const body: string[] = [];
  for (let i = 0; i < narrative.length; i += 2) {
    body.push(narrative.slice(i, i + 2).join(' '));
  }

  const order = ru ? LABEL_ORDER_RU : LABEL_ORDER_ET;
  const rank = (f: CopyFact) => {
    const i = order.indexOf(f.label);
    return i === -1 ? order.length : i;
  };
  facts.sort((a, b) => rank(a) - rank(b));

  return { lead, body, facts, notes, priceNote };
}
