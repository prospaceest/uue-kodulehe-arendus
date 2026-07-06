/**
 * draft-post.ts — lokaalne blogipostituse mustandi generaator (Varjuprofiilid.ee)
 *
 * Kasutab Anthropic API-t (Claude Opus 4.8) + prompt caching'ut: suur püsiv
 * kontekst (BRAND_VOICE reeglid + kataloog + POSTS-formaat) cache'itakse, muutub
 * ainult postituse brief. Väljund vastab POSTS-objekti kujule failis
 * app/[locale]/uudised/[slug]/page.tsx — kopeeri genereeritud JSON sinna.
 *
 * NB: see on ARENDAJA tööriist, ei ole osa avalikust saidist.
 *
 * Käivitamine (next-app/ kaustast):
 *   export ANTHROPIC_API_KEY=sk-ant-...
 *   npx tsx scripts/draft-post.ts <slug> "<postituse teema / brief>"
 *
 * Kuiv proov ilma API-kutseta (kontrollib prompti kokkupanekut):
 *   DRY_RUN=1 npx tsx scripts/draft-post.ts test-slug "mingi teema"
 */
import Anthropic from '@anthropic-ai/sdk';
import fs from 'node:fs';
import path from 'node:path';

const MODEL = 'claude-opus-4-8';

// ── BRAND_VOICE ─────────────────────────────────────────────────────────────
// Peegeldab handoff/CLAUDE.md reegleid (ainus tõeallikas). Hoia see stabiilsena —
// iga muudatus tühistab prompt-cache'i (cache on prefiks-põhine).
const BRAND_VOICE = `Sa oled Varjuprofiilid.ee (PROSPACE OÜ, Tallinn) sisulooja. Kirjutad
eestikeelseid blogipostitusi alumiinium varjuprofiilide teemal. Toon: toimetuslik /
kataloogilik / Bauhaus — terav, faktipõhine, vaoshoitud. Mitte müügijutt.

RANGED KEELEREEGLID (järgi ALATI):
1. Toote nimetus on "varjuprofiil". Ära kasuta "shadow gap" MEIE terminina. Ingliskeelse
   vastena võib mainida ("inglise k. shadow gap profile") ainult harival/sõnastiku kujul,
   mitte pealkirjas ega müügitekstis.
2. Efekti kirjeldamiseks kasuta "varjujoon" / "varjuefekt".
3. Ära kasuta "subtiilne" — kasuta "peen" / "vaoshoitud".
4. Ära kasuta "premium" ega turundusliku puhumist — esita faktid.
5. Ära kirjuta "hõljuva mööbli efekt" (mööbel ei hõlju). "Hõljuva lae" / "hõljuva seina" on OK.
6. "Kipsplaadi alla", MITTE "kipsplaadi taha" — profiilid paigaldatakse kipsplaadi alla.
7. "anodeeritud hõbe" on VÄRVI NIMI (anodeeritud välimusega toon), mitte protsess.
8. SEO-sünonüümid, mida sobib tekstis kasutada: varjuprofiil (peamine), viimistlussiin,
   laesiin, peitliist, varjuliist. Vana domeeninimi oli Viimistlussiinid.ee — "viimistlussiin"
   ja "laesiin" toovad otsinguliiklust, kasuta neid loomulikult vähemalt korra.

FAKTID:
- LED-spetsid kategooriati: lagi "12 W/m · 234 LED/m · 3000K · 24V";
  põrand/sein "COB 16 W/m · 1350 lm/m · CRI 94 · 24V".
- Standardpikkused: lagi 2.5 m (AST35 = 3 m), põrand 2.6 m, LPA909/LPA126 = 3 m.
- Hinnad sisaldavad 24% käibemaksu (Eesti). Kui mainid hinda, on see KM-iga.
- Salong: Vana-Kalamaja 8, Tallinn. E-post info@prospace.ee.

VENE KEEL: tõlgi ET sisu loomulikku, professionaalsesse vene keelde (sisearhitektuuri /
ehituse register). See on MUSTAND — vajab inimtoimetaja ülevaatust. Ära tõlgi robotlikult.`;

// ── Väljundformaat (POSTS-objekti väljad) ───────────────────────────────────
const FORMAT_SPEC = `Väljasta AINULT JSON-objekt järgmiste väljadega (POSTS-kuju):
- slug: URL-sõbralik id (väiketähed, sidekriipsud; kasuta antud slug'i)
- titleEt / titleRu: pealkiri (ilma "| Varjuprofiilid.ee" sufiksita)
- catEt / catRu: kategooria/rubriik (nt "Juhend", "Võrdlus", "Inspiratsioon")
- read: lugemisaeg (nt "6 min")
- excerptEt / excerptRu: 1–2 lauset (lead / sissejuhatus, ~160 tähemärki)
- bodyEt / bodyRu: postituse sisu MARKDOWN-is

MARKDOWN on piiratud (blogi renderdaja toetab AINULT neid):
- "## Pealkiri" (h2), "### Alapealkiri" (h3)
- "**rasvane**", "*kaldkiri*"
- "- " täpploendid
Ära kasuta tabeleid, pilte, linke, koodiplokke ega muid markdown-elemente.

Sisu: 700–1100 sõna ET kohta. Struktuur: tugev lead → 3–6 sisuosa (h2) → lõpetav
soovitus/CTA (nt salongi külastus või kataloog). Viita päris toodetele (SKU + seoName)
allolevast kataloogist, kus asjakohane.`;

function buildCatalogContext(): string {
  const catalogPath = path.join(process.cwd(), 'content', 'catalog.json');
  const raw = JSON.parse(fs.readFileSync(catalogPath, 'utf8')) as {
    products: Array<{
      sku: string;
      seoName: string;
      collection: string;
      price: number;
      ledCompatible: boolean;
      hidden?: boolean;
      description: string;
    }>;
  };
  // Kompaktne, deterministlik nimekiri (cache-stabiilne). Peidetud tooted välja.
  const lines = raw.products
    .filter((p) => !p.hidden)
    .map(
      (p) =>
        `${p.sku} | ${p.seoName} | ${p.collection} | ${p.price.toFixed(2)}€ KM-iga | ${
          p.ledCompatible ? 'LED' : 'ilma LED'
        } | ${p.description.replace(/\s+/g, ' ').slice(0, 180)}`,
    );
  return `TOODETE KATALOOG (${lines.length} toodet, formaat: SKU | seoName | kategooria | hind | LED | lühikirjeldus):\n${lines.join(
    '\n',
  )}`;
}

const POST_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    slug: { type: 'string' },
    titleEt: { type: 'string' },
    titleRu: { type: 'string' },
    catEt: { type: 'string' },
    catRu: { type: 'string' },
    read: { type: 'string' },
    excerptEt: { type: 'string' },
    excerptRu: { type: 'string' },
    bodyEt: { type: 'string' },
    bodyRu: { type: 'string' },
  },
  required: [
    'slug',
    'titleEt',
    'titleRu',
    'catEt',
    'catRu',
    'read',
    'excerptEt',
    'excerptRu',
    'bodyEt',
    'bodyRu',
  ],
} as const;

async function main() {
  const slug = process.argv[2];
  const brief = process.argv.slice(3).join(' ').trim();
  if (!slug || !brief) {
    console.error(
      'Kasutus: npx tsx scripts/draft-post.ts <slug> "<teema / brief>"\n' +
        'Näide:   npx tsx scripts/draft-post.ts peitliist-vannituppa "Kas varjuprofiil sobib vannituppa? Materjalid, IP-klass, paigaldus."',
    );
    process.exit(1);
  }

  // Suur PÜSIV prefiks — cache'itakse. Järjekord: brand voice → format → kataloog.
  // cache_control viimasel süsteemiplokil katab kogu süsteemi (tööriistu pole).
  const systemBlocks: Anthropic.TextBlockParam[] = [
    { type: 'text', text: BRAND_VOICE },
    { type: 'text', text: FORMAT_SPEC },
    {
      type: 'text',
      text: buildCatalogContext(),
      cache_control: { type: 'ephemeral' },
    },
  ];

  // VARIEERUV osa — postituse brief. Ei cache'ita.
  const userMessage = `Kirjuta blogipostituse mustand.\n\nSlug: ${slug}\n\nTeema / brief:\n${brief}`;

  if (process.env.DRY_RUN) {
    const sysLen = systemBlocks.reduce((n, b) => n + b.text.length, 0);
    console.log('--- DRY RUN (API-t ei kutsuta) ---');
    console.log('Mudel:', MODEL);
    console.log('Süsteemi (cache-tav) tähemärke:', sysLen);
    console.log('Kataloogi-plokk cache_control:', 'ephemeral');
    console.log('\nUser message:\n', userMessage);
    return;
  }

  const client = new Anthropic(); // loeb ANTHROPIC_API_KEY keskkonnast

  process.stderr.write(`Genereerin mustandit (${MODEL})… `);
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 20000,
    thinking: { type: 'adaptive' },
    output_config: {
      effort: 'high',
      format: { type: 'json_schema', schema: POST_SCHEMA },
    },
    system: systemBlocks,
    messages: [{ role: 'user', content: userMessage }],
  });

  const message = await stream.finalMessage();
  process.stderr.write('valmis.\n');

  if (message.stop_reason === 'refusal') {
    console.error('Mudel keeldus päringust (stop_reason: refusal). Kohanda briefi.');
    process.exit(1);
  }

  const jsonText = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('');

  let post: Record<string, string>;
  try {
    post = JSON.parse(jsonText);
  } catch {
    console.error('JSON parsimine ebaõnnestus. Toores väljund:\n', jsonText);
    process.exit(1);
  }

  const outDir = path.join(process.cwd(), 'scripts', 'drafts');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${slug}.json`);
  fs.writeFileSync(outFile, JSON.stringify(post, null, 2) + '\n', 'utf8');

  const u = message.usage;
  console.log(`\n✅ Mustand salvestatud: ${path.relative(process.cwd(), outFile)}`);
  console.log(
    `Tokenid: sisend ${u.input_tokens} | cache-kirjutus ${u.cache_creation_input_tokens ?? 0} | cache-lugemine ${
      u.cache_read_input_tokens ?? 0
    } | väljund ${u.output_tokens}`,
  );
  if ((u.cache_read_input_tokens ?? 0) > 0) {
    console.log('   (cache tabas — korduvad päringud on odavamad ✓)');
  }
  console.log(
    '\nJärgmine samm: lisa POSTS-objekti failis app/[locale]/uudised/[slug]/page.tsx.\n' +
      'Täienda käsitsi: cover (pildi tee), yearEt/yearRu (nt "2026 · juuli"). RU-tekst vajab toimetamist.',
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
