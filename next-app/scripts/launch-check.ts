/**
 * launch-check.ts — käivituskontroll Soome turule.
 *
 * Roomab läbi kõik soome- ja rootsikeelsed lehed ning otsib tõlkimata teksti.
 * Mõte on lihtne: enne kui markets.ts-is indexable: true, peab see skript
 * andma nulli. Muidu jõuab Google'isse pooleldi tõlgitud leht ja hiljem tuleb
 * neid URL-e indeksist välja roomata.
 *
 *   npx tsx scripts/launch-check.ts                      # kohalik server
 *   npx tsx scripts/launch-check.ts --base https://varjoprofiilit.fi
 *
 * Mida otsib:
 *   1. eesti tähti õ ja ü (soome ega rootsi tähestikus neid ei ole; ainus
 *      lubatud erand on ärinimi "PROSPACE OÜ")
 *   2. eestikeelseid tunnussõnu, mida soome/rootsi keeles ei esine
 *   3. kirillitsat (vene tekst ei kuulu Soome domeenile)
 *   4. mitte-200 vastuseid ja tühje lehti
 */
import { createHash } from 'node:crypto';

const BASE = (() => {
  const i = process.argv.indexOf('--base');
  return i !== -1 ? process.argv[i + 1].replace(/\/$/, '') : 'http://localhost:3000';
})();
const HOST = (() => {
  const i = process.argv.indexOf('--host');
  return i !== -1 ? process.argv[i + 1] : 'varjoprofiilit.fi';
})();

// Eestikeelsed tunnussõnad. Valitud nii, et need EI ole soome ega rootsi
// sõnad — "ja", "on", "ei" ja "kui" on mõlemas keeles olemas ja jäävad välja.
const ET_WORDS = [
  'kõik', 'või', 'ning', 'tooted', 'toode', 'hind', 'hinnad', 'tarne',
  'tagastus', 'garantii', 'paigaldus', 'pikkus', 'laius', 'kõrgus', 'värv',
  'värvid', 'varjuprofiil', 'põranda', 'laele', 'seinale', 'vaata', 'küsi',
  'meile', 'lisa korvi', 'saadaval', 'sisaldab',
  'käibemaks', 'Eestis', 'töötlemata', 'juhend', 'kirjeldus', 'küsimused',
];

// "PROSPACE OÜ" on ärinimi ja jääb igas keeles samaks.
const ALLOWED = ['OÜ'];

type Issue = { path: string; kind: string; detail: string };

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function collectPaths(): Promise<string[]> {
  const paths = new Set<string>();
  for (const sm of ['/sitemap-fi.xml', '/sitemap-sv.xml']) {
    const res = await fetch(BASE + sm, { headers: { 'x-forwarded-host': HOST } });
    if (!res.ok) { console.error(`! ${sm}: ${res.status}`); continue; }
    const xml = await res.text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      paths.add(new URL(m[1]).pathname);
    }
  }
  return [...paths].sort();
}

async function main() {
  const paths = await collectPaths();
  console.log(`${paths.length} soome/rootsi lehte, sihtmärk ${BASE} (Host: ${HOST})\n`);

  const issues: Issue[] = [];
  const seenHash = new Map<string, string>();
  let checked = 0;

  const queue = [...paths];
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      for (;;) {
        const path = queue.shift();
        if (!path) return;

        // redirect: 'manual' — kohalikku serverit testides läheks 'follow'
        // päris varjoprofiilit.fi domeenile (mis veel Vercelit ei osuta) ja
        // kukuks TLS-i taha. Ümbersuunamine ise on siin leid, mitte takistus.
        const res = await fetch(BASE + path, { headers: { 'x-forwarded-host': HOST }, redirect: 'manual' });
        checked++;
        if (checked % 25 === 0) console.log(`  ${checked}/${paths.length}`);

        if (res.status !== 200) {
          issues.push({ path, kind: 'mitte-200', detail: `${res.status} → ${res.headers.get('location') ?? '-'}` });
          continue;
        }
        const html = await res.text();

        let text = visibleText(html);
        if (text.length < 200) { issues.push({ path, kind: 'tühi leht', detail: `${text.length} tähemärki` }); continue; }

        for (const a of ALLOWED) text = text.split(a).join(' ');

        // 1. eesti tähed
        const etLetters = text.match(/[õÕüÜ]/g);
        if (etLetters) {
          const around = text.match(/.{0,35}[õÕüÜ].{0,35}/)?.[0] ?? '';
          issues.push({ path, kind: 'eesti täht', detail: `${etLetters.length}× · …${around}…` });
        }

        // 2. eestikeelsed sõnad — sõnapiiriga, muidu annab rootsi
        // "beställning" tabamuse sõnale "ning" ja soome "liitoskohtaan"
        // sõnale "kohta".
        const hits = ET_WORDS.filter((w) =>
          new RegExp(`(^|[^\\p{L}])${w}([^\\p{L}]|$)`, 'iu').test(text),
        );
        if (hits.length) {
          const sample = text.match(new RegExp(`.{0,45}(^|[^\\p{L}])${hits[0]}([^\\p{L}]|$).{0,45}`, 'iu'))?.[0] ?? '';
          issues.push({ path, kind: 'eesti sõna', detail: `${hits.slice(0, 6).join(', ')} · …${sample.trim()}…` });
        }

        // 3. kirillitsa
        const cyr = text.match(/[А-Яа-яЁё]{3,}/);
        if (cyr) issues.push({ path, kind: 'kirillitsa', detail: cyr[0] });

        // 4. identne sisu kahel lehel (tõlkimata dublikaat)
        const h = createHash('sha1').update(text).digest('hex').slice(0, 12);
        const prev = seenHash.get(h);
        if (prev) issues.push({ path, kind: 'identne sisu', detail: `sama mis ${prev}` });
        else seenHash.set(h, path);
      }
    }),
  );

  const byKind = new Map<string, Issue[]>();
  for (const i of issues) {
    if (!byKind.has(i.kind)) byKind.set(i.kind, []);
    byKind.get(i.kind)!.push(i);
  }

  console.log(`\n${'='.repeat(60)}`);
  if (!issues.length) {
    console.log(`PUHAS — ${paths.length} lehte, tõlkimata teksti ei leitud.`);
    return;
  }
  console.log(`${issues.length} leidu ${new Set(issues.map((i) => i.path)).size} lehel:\n`);
  for (const [kind, list] of byKind) {
    console.log(`── ${kind} (${list.length})`);
    for (const i of list.slice(0, 12)) console.log(`   ${i.path}\n      ${i.detail}`);
    if (list.length > 12) console.log(`   … ja veel ${list.length - 12}`);
  }
  process.exitCode = 1;
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
