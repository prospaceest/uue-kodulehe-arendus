/**
 * translate-ui.ts — lehesiseste tekstide tõlge soome ja rootsi keelde.
 *
 * Sisend: .tx-extract.json (codemod'i väljavõte — kõik eestikeelsed stringid,
 * mis läbivad tx()/useTx() funktsiooni).
 * Väljund: messages/{fi,sv}.json "auto" plokk, võtmeks lib/txKey.ts räsi.
 *
 * NB: see ei ole ainult tõlge. Turufaktid tuleb ka ASENDADA — eestikeelses
 * tekstis on 24% käibemaks, 200 € tasuta tarne piir ja "üle Eesti", soome
 * lehel peavad need olema 25,5%, 300 € ja Soome. Need reeglid on prompti sees.
 *
 *   npx tsx scripts/translate-ui.ts fi
 *   npx tsx scripts/translate-ui.ts sv --limit 25
 *   DRY_RUN=1 npx tsx scripts/translate-ui.ts fi --limit 5
 */
import Anthropic from '@anthropic-ai/sdk';
import fs from 'node:fs';
import path from 'node:path';
import { txKey } from '../lib/txKey';

const MODEL = process.env.TRANSLATE_MODEL ?? 'claude-opus-5';
const BATCH = 20;

type Lang = 'fi' | 'sv';

function loadApiKeyFromEnvFile(): void {
  if (process.env.ANTHROPIC_API_KEY) return;
  for (const file of ['.env.local', '.env']) {
    const p = path.join(process.cwd(), file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*ANTHROPIC_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) { process.env.ANTHROPIC_API_KEY = m[1].replace(/^["']|["']$/g, ''); return; }
    }
  }
}

const MARKET_RULES = {
  fi: `
TURUFAKTID — need EI ole tõlge, vaid asendus. Eesti leht räägib Eesti turust,
soome leht Soome turust:
  käibemaks 24%            -> ALV 25,5 %
  tasuta tarne 200 €       -> ilmainen toimitus 300 €
  tarne 25 €               -> toimitus 30 €
  "Eestis" / "üle Eesti"   -> "Suomeen" / "Suomessa"
  tarne 2–4 tööpäeva       -> toimitus noin 1 viikko
  info@prospace.ee         -> info@prospace.fi
  Venipak                  -> Venipak (jääb samaks)
  Tallinn / Vana-Kalamaja  -> jääb samaks (ladu ja näyttelytila on Tallinnas)
  PROSPACE OÜ              -> jääb samaks (müüja on Eesti ettevõte)`,
  sv: `
TURUFAKTID — need EI ole tõlge, vaid asendus:
  käibemaks 24%            -> moms 25,5 %
  tasuta tarne 200 €       -> fri frakt 300 €
  tarne 25 €               -> frakt 30 €
  "Eestis" / "üle Eesti"   -> "till Finland" / "i Finland"
  tarne 2–4 tööpäeva       -> leverans cirka 1 vecka
  info@prospace.ee         -> info@prospace.fi
  Venipak                  -> Venipak (jääb samaks)
  Tallinn / Vana-Kalamaja  -> jääb samaks
  PROSPACE OÜ              -> jääb samaks`,
} as const;

const GLOSSARY = {
  fi: `
varjuprofiil -> varjoprofiili | varjujoon -> varjolinja | laeprofiil -> kattoprofiili
põrandaprofiil -> lattiaprofiili | põrandaliist -> jalkalista | seinaprofiil -> seinäprofiili
LED-riba -> LED-nauha | hajuti -> diffuusori | kipsplaat -> kipsilevy
pahteldatav -> tasoitettava | töötlemata -> käsittelemätön | anodeeritud hõbe -> anodisoitu hopea (VÄRVI nimi)
jooksev meeter -> juoksumetri | eritellimus -> tilaustyö | tarne -> toimitus
tagastus -> palautus | garantii -> takuu | paigaldus -> asennus | korv -> kori
tellimus -> tilaus | pood -> kauppa | salong -> näyttelytila | KKK -> UKK
sisearhitekt -> sisustussuunnittelija | edasimüüja -> jälleenmyyjä`,
  sv: `
varjuprofiil -> skuggprofil | varjujoon -> skuggfog | laeprofiil -> takprofil
põrandaprofiil -> golvprofil | põrandaliist -> golvlist | seinaprofiil -> väggprofil
LED-riba -> LED-list | hajuti -> diffusor | kipsplaat -> gipsskiva
pahteldatav -> spacklingsbar | töötlemata -> obehandlad | anodeeritud hõbe -> anodiserat silver (FÄRGNAMN)
jooksev meeter -> löpmeter | eritellimus -> specialbeställning | tarne -> leverans
tagastus -> retur | garantii -> garanti | paigaldus -> montering | korv -> varukorg
tellimus -> beställning | pood -> butik | salong -> showroom | KKK -> Vanliga frågor
sisearhitekt -> inredningsarkitekt | edasimüüja -> återförsäljare`,
} as const;

function systemPrompt(lang: Lang): string {
  const name = lang === 'fi' ? 'soome' : 'rootsi (Soome rootsikeelsele lugejale)';
  return `Sa tõlgid alumiiniumist varjuprofiilide e-poe kasutajaliidese tekste eesti keelest ${name} keelde. Pood on varjoprofiilit.fi, müüja PROSPACE OÜ (Eesti), kaup saadetakse Eestist Soome.

REEGLID:
1. Faktid, mitte müügijutt. Keelatud "premium", "ainulaadne", "parim".
2. Pikkus sama või lühem — need on nupud, sildid ja lühilõigud, mis peavad paigutusse mahtuma.
3. Kõik numbrid, mõõdud, SKU-koodid (AST22, ASPL100, LHV10...), RAL-viited ja LED-spetsid jäävad muutumatuks — VÄLJA ARVATUD turufaktid allpool.
4. Kirjavahemärgid, nooled ja sümbolid jäävad täpselt alles: → ✓ ✕ ⚡ ★ ⌕ ☀ ☾ · — jm.
5. Platshoidjad jäävad muutumatuks: {count}, {len}, ${'${...}'} kujul olevad osad.
6. Kui string on suurtähtedes (nt "TASUTA TARNE"), jääb tõlge samuti suurtähtedes.
7. Ära lisa jutumärke ega punkti, kui originaalis neid pole.
8. Tühja stringi ega ainult sümbolist koosnevat stringi ei muudeta.
${MARKET_RULES[lang]}

TERMINISÕNASTIK:${GLOSSARY[lang]}

VÄLJUND: ainult JSON-massiiv, ilma koodiplokita:
[{"ref":1,"text":"tõlge"}]
Iga sisendi kohta täpselt üks objekt, "ref" muutumatult tagasi.`;
}

// ── Kontroll ───────────────────────────────────────────────────────────────
const SYMBOLS = ['→', '←', '✓', '✕', '⚡', '★', '⌕', '☀', '☾', '↑', '↓'];
const PLACEHOLDER = /\{(\w+)\}/g;

function validate(src: string, out: string, lang: Lang): string[] {
  const p: string[] = [];
  if (!out || !out.trim()) return ['tühi'];

  // platshoidjad
  const a = [...src.matchAll(PLACEHOLDER)].map((m) => m[1]).sort().join(',');
  const b = [...out.matchAll(PLACEHOLDER)].map((m) => m[1]).sort().join(',');
  if (a !== b) p.push(`platshoidjad ${a || '-'} vs ${b || '-'}`);

  for (const sym of SYMBOLS) {
    if (src.includes(sym) && !out.includes(sym)) p.push(`sümbol ${sym} kadus`);
  }

  // SKU-koodid peavad alles olema
  for (const sku of src.match(/\b(AST|ASP|ASPL|RST|LHV|MPA|MVP|MPV|AVP|DKP|ASL|LPA|ASK|KA)\d+[A-Z_0-9]*\b/g) ?? []) {
    if (!out.includes(sku)) p.push(`SKU ${sku} kadus`);
  }

  // Suurtähtede stiil (nt "TASUTA TARNE 200 €+" peab jääma suurtähtedes).
  // Lühikesed lühendid ("KMKR") ja kellaajad ("E–R 10:00–17:00") jäävad välja:
  // nende tõlge on õigustatult väiketähtedega ("Y-tunnus", "ma–pe 10:00").
  const letters = (src.match(/[A-Za-zÕÄÖÜÀ-ÿ]/g) ?? []).length;
  const isUpper = src === src.toUpperCase() && letters >= 8 && !/\d/.test(src);
  if (isUpper && out !== out.toUpperCase()) p.push('suurtähed kadusid');

  // Pikkus: lühikesed sildid võivad õigustatult kahekordistuda ("L–P kokkuleppel"
  // -> "Lör–sön enligt överenskommelse"), seepärast kontrollime alles pikemaid,
  // kus suur ülejääk tähendab, et mudel lisas sisu juurde.
  if (src.length >= 30 && out.length > src.length * 1.7) p.push(`liiga pikk (${out.length} vs ${src.length})`);

  // eestikeelsed jäägid
  const ET = lang === 'fi'
    ? ['Tarne', 'tarne', 'Tagastus', 'garantii', 'Vaata', 'Küsi', 'tooted', 'käibemaks', 'Eestis']
    : ['Tarne', 'tarne', 'Tagastus', 'garantii', 'Vaata', 'Küsi', 'tooted', 'käibemaks', 'Eestis'];
  const leaks = ET.filter((w) => out.includes(w));
  if (leaks.length) p.push(`ET jääk: ${leaks.join(',')}`);

  if (/\b24\s*%/.test(out)) p.push('24% alles');
  if (/\b200\s*€/.test(out) && !/\b200\s*€/.test(src.replace(/200\s*€/, ''))) {
    // 200 € tohib alles jääda ainult siis, kui originaalis oli mitu korda
    p.push('200 € alles (peaks olema 300 €)');
  }
  return p;
}

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

async function main() {
  const lang = process.argv[2] as Lang;
  if (lang !== 'fi' && lang !== 'sv') {
    console.error('Kasuta: translate-ui.ts <fi|sv> [--limit N] [--force]');
    process.exitCode = 1; return;
  }
  const force = process.argv.includes('--force');
  const limit = arg('limit') ? parseInt(arg('limit')!, 10) : Infinity;

  const extract = JSON.parse(fs.readFileSync('.tx-extract.json', 'utf8')) as Record<string, number>;
  const msgPath = `messages/${lang}.json`;
  const messages = JSON.parse(fs.readFileSync(msgPath, 'utf8')) as Record<string, unknown> & {
    auto?: Record<string, string>;
  };
  messages.auto ??= {};

  // Sümbolid ja numbrid tõlkimist ei vaja — kopeerime otse.
  const trivial = (s: string) => !/[A-Za-zÀ-ÿА-я]/.test(s);

  // Blogipostituste kehatekstid (8 tk, 5–13 tuhat tähemärki) jäetakse välja:
  // blogi on BLOG_ENABLED = false mõlemal turul, lehed on noindex ja
  // menüüst peidetud. Tõlgime need siis, kui blogi päriselt avaldatakse.
  const TOO_LONG = 1200;
  const skippedLong: string[] = [];

  let todo = Object.keys(extract).filter((s) => {
    if (trivial(s)) { messages.auto![txKey(s)] = s; return false; }
    if (s.length > TOO_LONG) { skippedLong.push(s.slice(0, 60)); return false; }
    return force || !messages.auto![txKey(s)];
  });
  todo = todo.slice(0, limit);

  if (skippedLong.length) console.log(`vahele jäetud pikad tekstid (blogi): ${skippedLong.length}`);
  console.log(`${lang.toUpperCase()}: ${todo.length} stringi (kokku ${Object.keys(extract).length}, juba tõlgitud ${Object.keys(messages.auto).length})`);
  if (!todo.length) { fs.writeFileSync(msgPath, JSON.stringify(messages, null, 2) + '\n'); return; }

  if (process.env.DRY_RUN) {
    console.log('--- prompt:', systemPrompt(lang).length, 'tähemärki');
    todo.slice(0, 5).forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
    return;
  }

  loadApiKeyFromEnvFile();
  if (!process.env.ANTHROPIC_API_KEY) { console.error('ANTHROPIC_API_KEY puudub'); process.exitCode = 1; return; }
  const client = new Anthropic();

  const failures: string[] = [];
  let done = 0;

  for (let i = 0; i < todo.length; i += BATCH) {
    const batch = todo.slice(i, i + BATCH);
    const user = batch.map((s, j) => `ref: ${j + 1}\n${s}`).join('\n\n---\n\n');

    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 8000,
      system: [{ type: 'text', text: systemPrompt(lang), cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: user }],
    });

    const raw = res.content.map((c) => (c.type === 'text' ? c.text : '')).join('').trim();
    let parsed: { ref?: number; text?: string }[];
    try {
      parsed = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, ''));
    } catch {
      failures.push(`partii ${i / BATCH + 1}: JSON ei parsi`);
      continue;
    }

    for (const out of parsed) {
      const src = out.ref && batch[out.ref - 1];
      if (!src) { failures.push(`vigane ref ${out.ref}`); continue; }
      const problems = validate(src, out.text ?? '', lang);
      if (problems.length) { failures.push(`"${src.slice(0, 50)}": ${problems.join('; ')}`); continue; }
      messages.auto![txKey(src)] = out.text!;
      done++;
    }

    fs.writeFileSync(msgPath, JSON.stringify(messages, null, 2) + '\n');
    console.log(`  ${Math.min(i + BATCH, todo.length)}/${todo.length} · salvestatud ${done}`);
  }

  console.log(`\nValmis: ${done} tõlgitud, ${failures.length} läbikukkunud`);
  for (const f of failures.slice(0, 30)) console.log('  ✗ ' + f);
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
