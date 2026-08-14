/**
 * translate-catalog.ts — tootetekstide tõlge soome ja rootsi keelde.
 *
 * 98 toodet × (nimi, seoName, kirjeldus) × 2 keelt ≈ 180 000 tähemärki. Käsitsi
 * kirjutamine ei ole realistlik, masintõlge ilma reegliteta annab prahi. See
 * skript teeb kolmandat: annab mudelile brändihääle, terminisõnastiku ja
 * KOHUSTUSLIKUD faktilausete sissejuhatused, ning kontrollib iga vastuse
 * masinaga üle enne salvestamist.
 *
 * NB: ARENDAJA tööriist. Soome tekst tuleb enne avaldamist emakeelsel üle
 * vaadata — see skript teeb hea mustandi, mitte emakeelse teksti.
 *
 *   npx tsx scripts/translate-catalog.ts fi              # kõik puuduvad
 *   npx tsx scripts/translate-catalog.ts sv --limit 3    # pilootpartii
 *   npx tsx scripts/translate-catalog.ts fi --sku AST22,ASPL100 --force
 *   DRY_RUN=1 npx tsx scripts/translate-catalog.ts fi --limit 2
 */
import Anthropic from '@anthropic-ai/sdk';
import fs from 'node:fs';
import path from 'node:path';

// Mudel on ülekirjutatav: TRANSLATE_MODEL=claude-sonnet-5 on odavam suure partii
// jaoks, opus annab parema kõla. Kontroll (validate) püüab vead mõlemal juhul.
const MODEL = process.env.TRANSLATE_MODEL ?? 'claude-opus-5';
const BATCH = 4;            // toodet ühes päringus — hoiab kvaliteedi ja kontrolli
const CATALOG = path.join(process.cwd(), 'content/catalog.json');

function loadApiKeyFromEnvFile(): void {
  if (process.env.ANTHROPIC_API_KEY) return;
  for (const file of ['.env.local', '.env']) {
    const p = path.join(process.cwd(), file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*ANTHROPIC_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) {
        process.env.ANTHROPIC_API_KEY = m[1].replace(/^["']|["']$/g, '');
        return;
      }
    }
  }
}

type Lang = 'fi' | 'sv';

type Product = {
  sku: string; name: string; seoName: string; description: string;
  collection: string; specs: { k: string; v: string }[];
  nameFi?: string; seoNameFi?: string; descriptionFi?: string;
  nameSv?: string; seoNameSv?: string; descriptionSv?: string;
};

// ── Keelereeglid ───────────────────────────────────────────────────────────
// Faktilausete sissejuhatused peavad klappima lib/productCopy.ts RULES_FI /
// RULES_SV tabelitega. Kui neid muudad, muuda mõlemas kohas.
const LANG = {
  fi: {
    label: 'soome (Suomi)',
    vat: 'ALV 25,5 %',
    glossary: `
varjuprofiil            -> varjoprofiili  (mitmuses varjoprofiilit)
varjujoon / varjuefekt  -> varjolinja / varjovaikutelma
LED varjuprofiil        -> LED-varjoprofiili
laeprofiil              -> kattoprofiili
põrandaprofiil          -> lattiaprofiili
põrandaliist            -> jalkalista
seinaprofiil            -> seinäprofiili
peiteprofiil            -> piiloprofiili
kipsplaadi alla         -> kipsilevyn alle   (MITTE "taakse")
pahteldatav serv        -> tasoitettava reuna
hajuti                  -> diffuusori
LED-riba                -> LED-nauha
töötlemata (pind)       -> käsittelemätön
anodeeritud hõbe        -> anodisoitu hopea  (see on VÄRVI NIMI, mitte protsess)
must / valge            -> musta / valkoinen
jooksev meeter          -> juoksumetri
eritellimus             -> tilaustyö
tarne                   -> toimitus`,
    factSentences: `
"Standardpikkus 2,5 m."                  -> "Vakiopituus 2,5 m."
"Standardpikkus 2,5 m, materjal alumiinium." -> "Vakiopituus 2,5 m, materiaali alumiini."
"Materjal alumiinium."                   -> "Materiaali alumiini."
"Värvid: X, Y; RAL-tellimusel mistahes toon." -> "Värit: X, Y; RAL-tilauksesta mikä tahansa sävy."
"RAL-tellimusel saadaval mistahes toon (~5 nädalat)." -> "RAL-tilauksesta mikä tahansa sävy (~5 viikkoa)."
"Soovitatud LED-riba: ..."               -> "Suositeltu LED-nauha: ..."
"LED-riba ja hajuti tellitakse eraldi."  -> "LED-nauha ja diffuusori tilataan erikseen."
"LED-funktsiooni ei ole — ..."           -> "LED-toimintoa ei ole — ..."
"Hind on 1 m värvitud profiili kohta, sisaldab 24% käibemaksu." -> "Hinta on 1 m maalattua profiilia, sisältää ALV 25,5 %."
"NB! ..."                                -> "NB! ..."`,
  },
  sv: {
    label: 'rootsi (Soome rootsikeelsele lugejale, sv-FI)',
    vat: 'moms 25,5 %',
    glossary: `
varjuprofiil            -> skuggprofil  (mitmuses skuggprofiler)
varjujoon / varjuefekt  -> skuggfog / skuggverkan
LED varjuprofiil        -> LED-skuggprofil
laeprofiil              -> takprofil
põrandaprofiil          -> golvprofil
põrandaliist            -> golvlist
seinaprofiil            -> vaggprofil -> KIRJUTA "väggprofil"
peiteprofiil            -> dold profil
kipsplaadi alla         -> under gipsskivan
pahteldatav serv        -> spacklingsbar kant
hajuti                  -> diffusor
LED-riba                -> LED-list
töötlemata (pind)       -> obehandlad
anodeeritud hõbe        -> anodiserat silver  (VÄRVI NIMI, mitte protsess)
must / valge            -> svart / vit
jooksev meeter          -> löpmeter
eritellimus             -> specialbeställning
tarne                   -> leverans`,
    factSentences: `
"Standardpikkus 2,5 m."                  -> "Standardlängd 2,5 m."
"Standardpikkus 2,5 m, materjal alumiinium." -> "Standardlängd 2,5 m, material aluminium."
"Materjal alumiinium."                   -> "Material aluminium."
"Värvid: X, Y; RAL-tellimusel mistahes toon." -> "Färger: X, Y; RAL-beställning: valfri nyans."
"RAL-tellimusel saadaval mistahes toon (~5 nädalat)." -> "RAL-beställning: valfri nyans (~5 veckor)."
"Soovitatud LED-riba: ..."               -> "Rekommenderad LED-list: ..."
"LED-riba ja hajuti tellitakse eraldi."  -> "LED-list och diffusor beställs separat."
"LED-funktsiooni ei ole — ..."           -> "LED-funktion saknas — ..."
"Hind on 1 m värvitud profiili kohta, sisaldab 24% käibemaksu." -> "Priset gäller 1 m målad profil, inkl. moms 25,5 %."
"NB! ..."                                -> "NB! ..."`,
  },
} as const;

function systemPrompt(lang: Lang): string {
  const L = LANG[lang];
  return `Sa tõlgid alumiiniumist varjuprofiilide e-poe tootetekste eesti keelest ${L.label} keelde. Tellija on PROSPACE OÜ (Eesti), kaup saadetakse Eestist Soome.

BRÄNDIHÄÄL — järgi rangelt:
1. Faktid, mitte müügijutt. Keelatud on "premium", "ainulaadne", "parim", "revolutsiooniline" ja nende vasted.
2. Ära leiuta midagi juurde. Kui eesti tekstis pole mingit fakti, ei tohi see tõlkes tekkida.
3. Kõik numbrid, mõõdud, ühikud, SKU-koodid, RAL-viited ja LED-spetsid jäävad TÄPSELT samaks (12 W/m, 234 LED/m, 3000K, 24V, COB 16 W/m, 1350 lm/m, CRI 94, 2,5 m, 2,6 m, 3 m).
4. Komakoht jääb komaks: 2,5 m — mitte 2.5 m.
5. Käibemaks: eesti tekstis on 24%, tõlkes on ${L.vat} (Soome määr). See on ainus koht, kus arv muutub.
6. "anodeeritud hõbe" on VÄRVI nimi, mis jäljendab anodeeritud välimust — ära kirjuta, nagu oleks toode anodeeritud.
7. Profiilid paigaldatakse kipsplaadi ALLA, mitte taha.
8. Ära kirjuta, et mööbel "hõljub". Hõljuv lagi ja hõljuv sein on lubatud.
9. Sama pikkus nagu originaal (±15%). Sama lausete arv ja sama järjekord.

TERMINISÕNASTIK:${L.glossary}

KOHUSTUSLIKUD LAUSEVORMID — kirjelduse lõpus olevad faktilaused peavad algama TÄPSELT nende sõnadega, sest sait tõstab need lausest loeteluks:${L.factSentences}

VÄLJUND: ainult JSON-massiiv, ilma koodiplokita, kujul
[{"ref":1,"sku":"...","name":"...","seoName":"...","description":"..."}]
"ref" on sisendi järjekorranumber muutumatult tagasi — iga sisendi kohta täpselt üks objekt, samas järjekorras.
"name" on tootenimi (enamasti sama SKU-kood — ära tõlgi koode), "seoName" on lühike kategooriakirjeldus (nt "Põranda LED varjuprofiil"), "description" on kogu kirjeldus.`;
}

// ref on järjekorranumber, MITTE SKU: kataloogis on LHV10 kaks korda (põranda-
// ja laeversioon eri kirjeldustega), nii et SKU järgi sidumine annaks mõlemale
// sama tõlke ja teine jääks kontrollis läbi kukkuma.
function userPrompt(items: Product[]): string {
  return items
    .map(
      (p, i) => `ref: ${i + 1}
SKU: ${p.sku}
kategooria: ${p.collection}
name: ${p.name}
seoName: ${p.seoName}
description: ${p.description}`,
    )
    .join('\n\n---\n\n');
}

// ── Kontroll ───────────────────────────────────────────────────────────────
// Iga tõlge peab läbima need kontrollid, muidu jääb salvestamata.
const NUM_RE = /\d+(?:[.,]\d+)?/g;

function numbers(s: string): string[] {
  return (s.match(NUM_RE) ?? []).map((n) => n.replace('.', ','));
}

function validate(src: Product, out: { name: string; seoName: string; description: string }, lang: Lang): string[] {
  const problems: string[] = [];
  const d = out.description ?? '';

  if (!d.trim()) problems.push('kirjeldus tühi');
  if (!out.seoName?.trim()) problems.push('seoName tühi');

  const ratio = d.length / src.description.length;
  if (ratio < 0.7 || ratio > 1.45) problems.push(`pikkus ${Math.round(ratio * 100)}% originaalist`);

  // Numbrid: eesti 24 -> soome 25,5 on lubatud erand, ülejäänud peavad klappima.
  const srcNums = numbers(src.description).filter((n) => n !== '24');
  const outNums = new Set(numbers(d));
  const lost = srcNums.filter((n) => !outNums.has(n));
  if (lost.length) problems.push(`kadunud numbrid: ${[...new Set(lost)].join(', ')}`);

  if (/\b24\s*%/.test(d)) problems.push('sisaldab veel 24% käibemaksu');

  // SKU peab alles olema, kui originaalis oli.
  if (src.description.includes(src.sku) && !d.includes(src.sku)) problems.push('SKU kadus kirjeldusest');

  // Eestikeelsed jäägid — kõige tõenäolisemad läbikukkumised.
  const etLeftovers = ['profiili sisse', 'kipsplaadi', 'Standardpikkus', 'Värvid:', 'Soovitatud', 'käibemaksu', 'nädalat', 'töötlemata'];
  const found = etLeftovers.filter((w) => d.includes(w));
  if (found.length) problems.push(`eestikeelsed jäägid: ${found.join(', ')}`);

  // Kohustuslikud vormid: kui originaalis oli vastav lause, peab tõlkes olema
  // täpne sissejuhatus, muidu ei tuvasta kirjelduse parser faktilauset.
  const required: [RegExp, RegExp, string][] = lang === 'fi'
    ? [
        [/^Standardpikkus\s/m, /Vakiopituus\s/, 'Vakiopituus'],
        [/^Värvid\s*:/m, /Värit\s*:/, 'Värit:'],
        [/^Soovitatud LED-riba\s*:/m, /Suositeltu LED-nauha\s*:/, 'Suositeltu LED-nauha:'],
        [/^Hind (on|kehtib)\s/m, /Hinta (on|koskee)\s/, 'Hinta on'],
      ]
    : [
        [/^Standardpikkus\s/m, /Standardlängd\s/, 'Standardlängd'],
        [/^Värvid\s*:/m, /Färger\s*:/, 'Färger:'],
        [/^Soovitatud LED-riba\s*:/m, /Rekommenderad LED-list\s*:/, 'Rekommenderad LED-list:'],
        [/^Hind (on|kehtib)\s/m, /Priset (gäller|är)\s/, 'Priset gäller'],
      ];

  for (const [srcRe, outRe, name] of required) {
    // Lauseid otsime lausealgustest, mitte terve teksti algusest.
    const hasInSrc = src.description.split(/(?<=[.!])\s+/).some((s) => srcRe.test(s));
    if (hasInSrc && !outRe.test(d)) problems.push(`puudub kohustuslik vorm "${name}"`);
  }

  return problems;
}

// ── Peavoog ────────────────────────────────────────────────────────────────

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

async function main() {
  const lang = process.argv[2] as Lang;
  if (lang !== 'fi' && lang !== 'sv') {
    console.error('Kasuta: translate-catalog.ts <fi|sv> [--limit N] [--sku A,B] [--force]');
    process.exitCode = 1;
    return;
  }

  const force = process.argv.includes('--force');
  const limit = arg('limit') ? parseInt(arg('limit')!, 10) : Infinity;
  const skuFilter = arg('sku')?.split(',').map((s) => s.trim().toUpperCase());

  const data = JSON.parse(fs.readFileSync(CATALOG, 'utf8')) as { products: Product[] };
  const descField = lang === 'fi' ? 'descriptionFi' : 'descriptionSv';

  let todo = data.products.filter((p) => force || !p[descField]?.trim());
  if (skuFilter) todo = todo.filter((p) => skuFilter.includes(p.sku.toUpperCase()));
  todo = todo.slice(0, limit);

  console.log(`${lang.toUpperCase()}: ${todo.length} toodet tõlkimiseks (kokku ${data.products.length})`);
  if (!todo.length) return;

  if (process.env.DRY_RUN) {
    console.log('--- DRY_RUN: süsteemiprompti pikkus:', systemPrompt(lang).length, 'tähemärki');
    console.log(userPrompt(todo.slice(0, 2)).slice(0, 800));
    return;
  }

  loadApiKeyFromEnvFile();
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY puudub (.env.local)');
    process.exitCode = 1;
    return;
  }
  const client = new Anthropic();

  const failures: string[] = [];
  let done = 0;

  for (let i = 0; i < todo.length; i += BATCH) {
    const batch = todo.slice(i, i + BATCH);

    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 8000,
      // Süsteemiprompt on iga partii juures sama -> cache'itakse.
      system: [{ type: 'text', text: systemPrompt(lang), cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: userPrompt(batch) }],
    });

    const raw = res.content.map((c) => (c.type === 'text' ? c.text : '')).join('').trim();
    const json = raw.replace(/^```(?:json)?\s*|\s*```$/g, '');

    let parsed: { ref?: number; sku: string; name: string; seoName: string; description: string }[];
    try {
      parsed = JSON.parse(json);
    } catch {
      failures.push(`${batch.map((p) => p.sku).join(',')}: JSON ei parsi`);
      continue;
    }

    if (parsed.length !== batch.length) {
      failures.push(`${batch.map((p) => p.sku).join(',')}: vastuses ${parsed.length}/${batch.length} objekti`);
    }

    for (const out of parsed) {
      // ref-i järgi, SKU on ainult kontrolliks.
      const src = out.ref && batch[out.ref - 1] ? batch[out.ref - 1] : undefined;
      if (!src) {
        failures.push(`${out.sku ?? '?'}: vigane ref ${out.ref}`);
        continue;
      }
      if (out.sku && out.sku.toUpperCase() !== src.sku.toUpperCase()) {
        failures.push(`ref ${out.ref}: SKU ei klapi (${out.sku} vs ${src.sku})`);
        continue;
      }
      const problems = validate(src, out, lang);
      if (problems.length) {
        failures.push(`${src.sku}: ${problems.join('; ')}`);
        continue;
      }
      if (lang === 'fi') {
        src.nameFi = out.name;
        src.seoNameFi = out.seoName;
        src.descriptionFi = out.description;
      } else {
        src.nameSv = out.name;
        src.seoNameSv = out.seoName;
        src.descriptionSv = out.description;
      }
      done++;
    }

    // Salvestame partii kaupa — pooleli jäänud jooks ei kaota tehtud tööd.
    fs.writeFileSync(CATALOG, JSON.stringify(data, null, 1) + '\n');
    console.log(`  ${Math.min(i + BATCH, todo.length)}/${todo.length} · salvestatud ${done}`);
  }

  console.log(`\nValmis: ${done} tõlgitud, ${failures.length} läbikukkunud`);
  for (const f of failures) console.log('  ✗ ' + f);
  if (failures.length) console.log('\nKordamiseks: --sku ' + failures.map((f) => f.split(':')[0]).join(','));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
