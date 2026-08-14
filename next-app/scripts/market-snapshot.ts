/**
 * Eesti lehe regressioonikontroll tururefaktoreeringu ajaks.
 *
 * Soome turu tugi (lib/markets.ts, hostipõhine canonical/robots/sitemap,
 * neljakeelne tekstikiht) puudutab faile, mida eestikeelne leht samuti kasutab.
 * See skript annab tõestuse, mitte lootuse: võtab kõigilt sitemapi URL-idelt
 * SEO-väljad ja nähtava teksti räsi, ning võrdleb kaht seisu.
 *
 *   npx tsx scripts/market-snapshot.ts snapshot --base https://varjuprofiilid.ee --out .snapshots/ee-baas.json
 *   npx tsx scripts/market-snapshot.ts snapshot --base https://<preview>.vercel.app --out .snapshots/preview.json
 *   npx tsx scripts/market-snapshot.ts diff .snapshots/ee-baas.json .snapshots/preview.json
 *
 * Diff'i puhul on --base teadlikult välja arvestatud: preview jookseb teisel
 * hostil, seega absoluutsed URL-id normaliseeritakse enne võrdlust.
 */

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

type PageSnapshot = {
  path: string;
  status: number;
  title: string;
  canonical: string;
  hreflang: string[];      // "et=/tooted" kujul, hostist sõltumatu
  ogUrl: string;
  robots: string;
  h1: string;
  textHash: string;        // nähtava teksti räsi
  textChars: number;
  prices: string[];        // kõik "12,34 €" mustrid
};

type Snapshot = {
  base: string;
  takenAt: string;
  pages: PageSnapshot[];
};

const CONCURRENCY = 6;

// ---------------------------------------------------------------- helpers

function arg(name: string, fallback?: string): string {
  const i = process.argv.indexOf(`--${name}`);
  if (i !== -1 && process.argv[i + 1]) return process.argv[i + 1];
  if (fallback !== undefined) return fallback;
  throw new Error(`Puudub --${name}`);
}

async function fetchText(url: string, tries = 3): Promise<{ status: number; body: string }> {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'prospace-snapshot' } });
      return { status: res.status, body: await res.text() };
    } catch (err) {
      if (attempt === tries) throw err;
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
  throw new Error('unreachable');
}

/** Absoluutsest URL-ist ainult tee + query — nii saab kaht hosti võrrelda. */
function relative(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname + u.search;
  } catch {
    return url;
  }
}

function attr(tag: string, name: string): string {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'));
  return m ? m[1] : '';
}

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parsePage(path: string, status: number, html: string): PageSnapshot {
  const links = html.match(/<link\b[^>]*>/gi) ?? [];

  const canonical = links
    .filter((l) => /rel\s*=\s*"canonical"/i.test(l))
    .map((l) => relative(attr(l, 'href')))[0] ?? '';

  const hreflang = links
    .filter((l) => /rel\s*=\s*"alternate"/i.test(l) && /hreflang/i.test(l))
    .map((l) => `${attr(l, 'hreflang')}=${relative(attr(l, 'href'))}`)
    .sort();

  const metas = html.match(/<meta\b[^>]*>/gi) ?? [];
  const metaContent = (prop: string) =>
    metas
      .filter((m) => new RegExp(`(property|name)\\s*=\\s*"${prop}"`, 'i').test(m))
      .map((m) => attr(m, 'content'))[0] ?? '';

  const text = visibleText(html);

  return {
    path,
    status,
    title: (html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim(),
    canonical,
    hreflang,
    ogUrl: relative(metaContent('og:url')),
    robots: metaContent('robots'),
    h1: visibleText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? ''),
    textHash: createHash('sha1').update(text).digest('hex').slice(0, 16),
    textChars: text.length,
    prices: [...new Set(text.match(/\d+,\d{2}\s?€/g) ?? [])].sort(),
  };
}

/** URL-ide nimekiri elusa saidi sitemapidest — see on autoriteetne loend. */
async function collectPaths(base: string): Promise<string[]> {
  const paths = new Set<string>();
  for (const sm of ['/sitemap.xml', '/sitemap-ru.xml']) {
    const { status, body } = await fetchText(base + sm);
    if (status !== 200) {
      console.error(`! ${sm} vastas ${status} — jätan vahele`);
      continue;
    }
    for (const m of body.matchAll(/<loc>([^<]+)<\/loc>/g)) paths.add(relative(m[1]));
  }
  return [...paths].sort();
}

// ---------------------------------------------------------------- commands

async function snapshot() {
  const base = arg('base').replace(/\/$/, '');
  const out = arg('out', '.snapshots/snapshot.json');

  // Nimekirja võtame alati elusalt Eesti saidilt: preview'l võib sitemap juba
  // uue loogika järgi erineda ja siis ei võrdleks me enam sama asja.
  const listBase = arg('paths-from', 'https://varjuprofiilid.ee').replace(/\/$/, '');
  const paths = await collectPaths(listBase);
  console.log(`${paths.length} URL-i (nimekiri: ${listBase}), sihtmärk: ${base}`);

  const pages: PageSnapshot[] = [];
  let done = 0;
  const queue = [...paths];

  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      for (;;) {
        const path = queue.shift();
        if (!path) return;
        const { status, body } = await fetchText(base + path);
        pages.push(parsePage(path, status, body));
        done++;
        if (done % 25 === 0) console.log(`  ${done}/${paths.length}`);
      }
    }),
  );

  pages.sort((a, b) => a.path.localeCompare(b.path));
  const snap: Snapshot = { base, takenAt: new Date().toISOString(), pages };

  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, JSON.stringify(snap, null, 1));

  const bad = pages.filter((p) => p.status !== 200);
  console.log(`Salvestatud ${out} — ${pages.length} lehte, ${bad.length} mitte-200`);
  for (const p of bad) console.log(`  ${p.status} ${p.path}`);
}

async function diff() {
  const [, , , aPath, bPath] = process.argv;
  if (!aPath || !bPath) throw new Error('Kasuta: diff <baas.json> <uus.json>');

  const a: Snapshot = JSON.parse(await readFile(aPath, 'utf8'));
  const b: Snapshot = JSON.parse(await readFile(bPath, 'utf8'));

  const byPath = new Map(b.pages.map((p) => [p.path, p]));
  const fields: (keyof PageSnapshot)[] = [
    'status', 'title', 'canonical', 'hreflang', 'ogUrl', 'robots', 'h1', 'textHash', 'prices',
  ];

  let changed = 0;
  for (const before of a.pages) {
    const after = byPath.get(before.path);
    if (!after) {
      console.log(`KADUS   ${before.path}`);
      changed++;
      continue;
    }
    const diffs = fields.filter((f) => JSON.stringify(before[f]) !== JSON.stringify(after[f]));
    if (!diffs.length) continue;
    changed++;
    console.log(`MUUTUS  ${before.path}  [${diffs.join(', ')}]`);
    for (const f of diffs) {
      const x = JSON.stringify(before[f]);
      const y = JSON.stringify(after[f]);
      console.log(`        ${f}:`);
      console.log(`          enne: ${x.length > 160 ? x.slice(0, 160) + '…' : x}`);
      console.log(`          pärast: ${y.length > 160 ? y.slice(0, 160) + '…' : y}`);
    }
  }

  const newPaths = b.pages.filter((p) => !a.pages.some((x) => x.path === p.path));
  for (const p of newPaths) console.log(`LISANDUS ${p.path}`);

  console.log(
    changed || newPaths.length
      ? `\n${changed} muutunud / kadunud, ${newPaths.length} lisandunud lehte`
      : `\nMuutusi ei ole — ${a.pages.length} lehte identsed (textHash kaasa arvatud)`,
  );
  if (changed) process.exitCode = 1;
}

// Top-level await ei tööta tsx cjs-väljundis — mähime funktsiooni sisse.
async function main() {
  const cmd = process.argv[2];
  if (cmd === 'snapshot') await snapshot();
  else if (cmd === 'diff') await diff();
  else {
    console.log('Kasuta: market-snapshot.ts snapshot --base <url> [--out fail] | diff <a.json> <b.json>');
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
