/**
 * vat-rate.ts — muudab Soome turu käibemaksumäära KÕIKJAL korraga.
 *
 * Miks eraldi skript: määr ei ole ainult number lib/markets.ts-is. Ta on ka
 * ~136 tõlgitud lause sees ("Hinta on 1 m maalattua profiilia, sisältää
 * ALV 24 %", "inkl. moms 24 %"). Kui muuta ainult konstanti, näitab leht
 * ühte protsenti ja tekst teist — täpselt see viga oli enne 16.08.2026.
 *
 * Millal seda vaja on: kui PROSPACE OÜ piiriülene B2C-müük ületab 10 000 €
 * aastas või registreeritakse OSS-erikorda, tuleb Soome eraisikult küsida
 * Soome määra (praegu 25,5%) Eesti oma asemel.
 *
 *   npx tsx scripts/vat-rate.ts 25,5      # Soome määrale
 *   npx tsx scripts/vat-rate.ts 24        # tagasi Eesti määrale
 *   DRY_RUN=1 npx tsx scripts/vat-rate.ts 25,5
 */
import fs from 'node:fs';
import path from 'node:path';

const MARKETS = path.join(process.cwd(), 'lib/markets.ts');
const CATALOG = path.join(process.cwd(), 'content/catalog.json');
const MESSAGES = ['messages/fi.json', 'messages/sv.json'];

const raw = process.argv[2];
if (!raw) {
  console.error('Kasuta: vat-rate.ts <määr>   nt 25,5 või 24');
  process.exit(1);
}
const next = raw.replace(',', '.');
const nextNum = Number(next);
if (!Number.isFinite(nextNum) || nextNum <= 0 || nextNum > 30) {
  console.error(`Kahtlane määr: ${raw}`);
  process.exit(1);
}

// Praegune Soome määr loetakse markets.ts-ist — nii ei pea seda käsurealt
// kordama ega saa kogemata valet vana väärtust otsida.
const marketsSrc = fs.readFileSync(MARKETS, 'utf8');
const fiBlock = marketsSrc.slice(marketsSrc.indexOf('  fi: {'));
const cur = fiBlock.match(/vatPercent:\s*([\d.]+)/)?.[1];
if (!cur) {
  console.error('lib/markets.ts-ist ei leitud fi.vatPercent väärtust');
  process.exit(1);
}
if (cur === next) {
  console.log(`Soome määr on juba ${raw} % — midagi teha pole.`);
  process.exit(0);
}

const human = (n: string) => n.replace('.', ',');
// "24 %", "24%", "24,0 %" — kõik variandid, aga AINULT protsendimärgiga,
// et mitte puutuda mõõte ega hindu.
const pattern = new RegExp(`${human(cur).replace(',', '[.,]')}\\s*%`, 'g');
const replacement = `${human(next)} %`;

let touched = 0;
const dry = Boolean(process.env.DRY_RUN);

function fixString(s: string): string {
  const out = s.replace(pattern, replacement);
  if (out !== s) touched++;
  return out;
}

for (const file of MESSAGES) {
  const p = path.join(process.cwd(), file);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const walk = (o: Record<string, unknown>) => {
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === 'string') o[k] = fixString(v);
      else if (v && typeof v === 'object') walk(v as Record<string, unknown>);
    }
  };
  walk(data);
  if (!dry) fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

const catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
for (const p of catalog.products) {
  for (const field of ['descriptionFi', 'descriptionSv', 'seoNameFi', 'seoNameSv']) {
    if (typeof p[field] === 'string') p[field] = fixString(p[field]);
  }
}
if (!dry) fs.writeFileSync(CATALOG, JSON.stringify(catalog, null, 1) + '\n');

if (!dry) {
  fs.writeFileSync(
    MARKETS,
    marketsSrc.replace(
      /(\n  fi: \{[\s\S]*?)vatPercent:\s*[\d.]+/,
      `$1vatPercent: ${next}`,
    ),
  );
}

console.log(
  `${dry ? '[DRY_RUN] ' : ''}Soome käibemaks ${human(cur)} % → ${human(next)} %` +
    ` · ${touched} teksti parandatud · lib/markets.ts uuendatud`,
);
console.log('Järgmiseks: npm run build ja kontrolli hinda tootelehel.');
