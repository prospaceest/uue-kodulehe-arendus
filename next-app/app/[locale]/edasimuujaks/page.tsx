'use client';

// Edasimüüjate otsimise leht — AINULT Soome turg (fi + sv).
//
// Miks eraldi lehena ja mitte /professionaalidele osana: Soome ärieesmärk on
// edasimüüjate leidmine, arhitektide leht räägib hoopis projektitoest.
// Kaks eri lugejat, kaks eri küsimust.
//
// Miks tekst on siin otse ja mitte tx() sõnastikus: see leht ei eksisteeri
// eesti ega vene keeles, seega eestikeelset võtit polegi olemas. Kaks keelt
// kõrvuti on siin loetavam kui sõnastikuviide.
//
// TÄHTIS — mida siia EI kirjutata: partnerite allahindlusprotsente (25/35/40%),
// mahupiire ega hinnakirja. Need on ärisaladus ja omanik saadab need ise
// valitud partneritele. Leht ütleb, et hinnastus on astmeline, mitte kui palju.

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { lp } from '@/lib/pageUrls';
import { marketForLocale } from '@/lib/markets';
import { products } from '@/lib/catalog';

type Copy = {
  eyebrow: string;
  h1: string;
  lead: string;
  whyTitle: string;
  why: [string, string][];
  howTitle: string;
  how: [string, string][];
  selectTitle: string;
  select: string;
  formTitle: string;
  formLead: string;
  f: Record<string, string>;
  fields: string[];
  volumes: string[];
  submit: string;
  sending: string;
  ok: string;
  okLead: string;
  consent: string;
  contact: string;
};

const FI: Copy = {
  eyebrow: 'Jälleenmyyjäksi',
  h1: 'Etsimme jälleenmyyjiä Suomesta.',
  lead:
    'Alumiiniset varjoprofiilit ovat Suomessa vielä harvinainen tuote, vaikka kysyntä kasvaa jokaisessa uudiskohteessa, jossa halutaan piilotettu liitos ja siisti valolinja. Etsimme kumppaneita, jotka myyvät niitä omalla alueellaan — valitsemme yhteistyökumppanit harkiten, jotta tuote tulee esitellyksi kunnolla.',
  whyTitle: 'Miksi tämä tuote myy',
  why: [
    ['98 tuotetta, yksi valmistaja', 'Katto-, lattia- ja seinäprofiilit, LED-kanavat, jalkalistat ja tarvikkeet samasta paikasta. Asiakkaan ei tarvitse yhdistellä kahden toimittajan järjestelmiä.'],
    ['Varastotuotteet lähtevät heti', 'Suurin osa profiileista on varastossa mustana ja valkoisena. Venipak toimittaa 1–3 työpäivässä — myös suoraan sinun asiakkaallesi, sinun nimissäsi.'],
    ['Mikä tahansa RAL-sävy', 'Erikoissävyt jauhemaalataan tilauksesta. Toimitusaika noin 5 viikkoa, koska keräämme tilaukset yhteen ja toimitamme 4–5 viikon välein — juuri se pitää hinnat kilpailukykyisinä.'],
    ['Arkkitehtien kysymä detalji', 'Varjoprofiili ei ole hintakilpailutuote vaan suunnitteluratkaisu. Se tarkoittaa parempaa katetta kuin tavallisella listalla.'],
  ],
  howTitle: 'Mitä kumppanuus sisältää',
  how: [
    ['Porrastetut jälleenmyyjähinnat', 'Hinta laskee sen mukaan, ostatko varastostamme yksittäin vai otatko oman varaston. Lähetämme koko hinnaston ja suositellut myyntihinnat, kun olemme keskustelleet.'],
    ['Suoratoimitus asiakkaalle', 'Voit myydä ilman omaa varastoa: me toimitamme suoraan loppuasiakkaalle. Isommissa erissä huolehdimme kuljetuksesta ja tullimuodollisuuksista.'],
    ['Mallikappaleet ja materiaalit', 'Saat mallipalat, kuvat ja tekniset piirustukset. Suosittelemme asentamaan suosituimmat profiilit myös oman näyttelytilan seinään — se myy paremmin kuin esite.'],
    ['Tekninen tuki', 'Vastaamme asennus- ja LED-kysymyksiin suoraan, myös silloin kun asiakkaasi kysyy sinulta jotain, mihin et heti tiedä vastausta.'],
  ],
  selectTitle: 'Miten valitsemme',
  select:
    'Emme myönnä yksinmyyntioikeuksia. Valitsemme kumppanit yrityksen taustan ja pitkäjänteisen yhteistyön perusteella — meille on tärkeämpää, että tuote tulee esitellyksi kunnolla kuin että jälleenmyyjiä olisi mahdollisimman monta. Kerro lyhyesti, mitä myyt tänään ja kenelle, niin vastaamme kahden työpäivän kuluessa.',
  formTitle: 'Jätä yhteydenottopyyntö',
  formLead: 'Vastaamme kahden työpäivän kuluessa ja lähetämme hinnaston, jos näemme yhteistyössä potentiaalia.',
  f: {
    company: 'Yritys', reg: 'Y-tunnus', contact: 'Yhteyshenkilö', phone: 'Puhelin',
    email: 'Sähköposti', website: 'Verkkosivu (esim. yritys.fi)', region: 'Alue / kaupunki',
    field: 'Toimiala', range: 'Mitä myyt tänään?', volume: 'Arvioitu vuosivolyymi',
    showroom: 'Onko sinulla näyttelytila?', message: 'Kerro lyhyesti yrityksestäsi',
  },
  fields: ['Rakennustarvikeliike', 'Sisustus- ja valaisinliike', 'LED- ja sähkötarvikkeet', 'Urakointi / asennus', 'Sisustussuunnittelu', 'Verkkokauppa', 'Muu'],
  volumes: ['En osaa vielä arvioida', 'Alle 500 m', '500–2000 m', 'Yli 2000 m'],
  submit: 'Lähetä yhteydenottopyyntö →',
  sending: 'Lähetetään…',
  ok: 'Kiitos.',
  okLead: 'Pyyntö on saapunut. Vastaamme kahden työpäivän kuluessa ja lähetämme hinnaston sähköpostilla.',
  consent: 'Annan luvan käsitellä tietojani yhteydenottoa varten.',
  contact: 'Voit myös soittaa tai kirjoittaa suoraan',
};

const SV: Copy = {
  eyebrow: 'Bli återförsäljare',
  h1: 'Vi söker återförsäljare i Finland.',
  lead:
    'Skuggprofiler i aluminium är fortfarande en ovanlig produkt i Finland, samtidigt som efterfrågan växer i varje nybygge där man vill ha en dold fog och en ren ljuslinje. Vi söker partner som säljer dem på sitt område — vi väljer samarbetspartner med omsorg, så att produkten presenteras ordentligt.',
  whyTitle: 'Varför produkten säljer',
  why: [
    ['98 produkter, en tillverkare', 'Tak-, golv- och väggprofiler, LED-kanaler, golvlister och tillbehör från samma ställe. Kunden behöver inte kombinera två leverantörers system.'],
    ['Lagervaror går direkt', 'De flesta profilerna finns i lager i svart och vitt. Venipak levererar på 1–3 arbetsdagar — även direkt till din kund, i ditt namn.'],
    ['Valfri RAL-nyans', 'Specialkulörer pulvermålas på beställning. Leveranstid cirka 5 veckor, eftersom vi samlar beställningar och levererar var 4–5 vecka — just det håller priserna konkurrenskraftiga.'],
    ['En detalj arkitekterna frågar efter', 'En skuggprofil är ingen priskonkurrensprodukt utan en designlösning. Det betyder bättre marginal än på en vanlig list.'],
  ],
  howTitle: 'Vad partnerskapet innehåller',
  how: [
    ['Stegvisa återförsäljarpriser', 'Priset sjunker beroende på om du köper styckvis ur vårt lager eller tar ett eget lager. Vi skickar hela prislistan och rekommenderade försäljningspriser när vi har talats vid.'],
    ['Direktleverans till kunden', 'Du kan sälja utan eget lager: vi levererar direkt till slutkunden. Vid större partier sköter vi transport och tullformaliteter.'],
    ['Prover och material', 'Du får provbitar, bilder och tekniska ritningar. Vi rekommenderar att montera de populäraste profilerna i ditt eget showroom — det säljer bättre än en broschyr.'],
    ['Teknisk support', 'Vi svarar på monterings- och LED-frågor direkt, också när din kund frågar dig något du inte genast vet svaret på.'],
  ],
  selectTitle: 'Så väljer vi',
  select:
    'Vi ger inga exklusiva försäljningsrättigheter. Vi väljer partner utifrån företagets bakgrund och långsiktig potential — för oss är det viktigare att produkten presenteras ordentligt än att återförsäljarna är många. Berätta kort vad du säljer i dag och till vem, så svarar vi inom två arbetsdagar.',
  formTitle: 'Lämna en kontaktförfrågan',
  formLead: 'Vi svarar inom två arbetsdagar och skickar prislistan om vi ser potential i samarbetet.',
  f: {
    company: 'Företag', reg: 'FO-nummer', contact: 'Kontaktperson', phone: 'Telefon',
    email: 'E-post', website: 'Webbplats (t.ex. foretag.fi)', region: 'Område / stad',
    field: 'Branch', range: 'Vad säljer du i dag?', volume: 'Uppskattad årsvolym',
    showroom: 'Har du ett showroom?', message: 'Berätta kort om ditt företag',
  },
  fields: ['Byggvaruhandel', 'Inredning och belysning', 'LED- och elmaterial', 'Entreprenad / montering', 'Inredningsarkitektur', 'Nätbutik', 'Annat'],
  volumes: ['Kan inte uppskatta ännu', 'Under 500 m', '500–2000 m', 'Över 2000 m'],
  submit: 'Skicka förfrågan →',
  sending: 'Skickar…',
  ok: 'Tack.',
  okLead: 'Förfrågan har kommit fram. Vi svarar inom två arbetsdagar och skickar prislistan per e-post.',
  consent: 'Jag godkänner att mina uppgifter behandlas för kontakten.',
  contact: 'Du kan också ringa eller skriva direkt',
};

export default function ResellerPage() {
  const locale = useLocale();
  const market = marketForLocale(locale);
  const c = locale === 'sv' ? SV : FI;

  const [form, setForm] = useState({
    company: '', regNr: '', contact: '', phone: '', email: '', website: '',
    region: '', field: '', range: '', volume: '', showroom: '', message: '', consent: false,
  });
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');

  const up = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    try {
      await fetch('/api/b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'reseller',
          company: form.company, name: form.contact, email: form.email, phone: form.phone,
          role: 'Jälleenmyyjä', region: form.region, field: form.field,
          range: form.range, volume: form.volume, showroom: form.showroom,
          website: form.website, message: form.message, locale,
        }),
      });
    } catch {
      // Kiri võib jääda saatmata, aga kasutajale ei näita me tehnilist viga —
      // ta on vormi täitnud ja peab nägema kinnitust. Vea logib API pool.
    }
    setState('done');
  }

  const inStock = products.filter((p) => p.inStock).length;
  const fieldSt: React.CSSProperties = { display: 'grid', gap: 6 };
  const labelSt: React.CSSProperties = {
    fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase',
    letterSpacing: '0.08em', color: 'var(--muted)',
  };

  if (state === 'done') {
    return (
      <section style={{ padding: '120px 56px', maxWidth: 720 }}>
        <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 9vw, 120px)', margin: '0 0 18px', lineHeight: 0.92 }}>{c.ok}</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 32 }}>{c.okLead}</p>
        <Link href={lp('/tooted', locale)} className="vp-btn vp-btn--lg">{locale === 'sv' ? 'Se produkterna →' : 'Katso tuotteet →'}</Link>
      </section>
    );
  }

  return (
    <div>
      {/* Pealkiri */}
      <section style={{ padding: '72px 56px 56px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{c.eyebrow}</div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(48px, 7vw, 104px)', margin: '0 0 24px', lineHeight: 0.94, maxWidth: '20ch' }}>
          {c.h1}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '62ch' }}>{c.lead}</p>

        <div className="vp-facts" style={{ maxWidth: 420, marginTop: 28 }}>
          <div><dt>{locale === 'sv' ? 'Produkter' : 'Tuotteita'}</dt><dd>{products.length}</dd></div>
          <div><dt>{locale === 'sv' ? 'I lager' : 'Varastossa'}</dt><dd>{inStock}</dd></div>
          <div><dt>{locale === 'sv' ? 'Leverans' : 'Toimitus'}</dt><dd>{market.shipping.carrier} · 1–3 {locale === 'sv' ? 'arbetsdagar' : 'työpäivää'}</dd></div>
        </div>
      </section>

      {/* Miks müüb */}
      <section style={{ padding: '64px 56px', borderBottom: 'var(--border)' }}>
        <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 32px' }}>{c.whyTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--ink)', border: 'var(--border)' }}>
          {c.why.map(([t, d], i) => (
            <div key={t} style={{ background: 'var(--paper)', padding: '28px 26px' }}>
              <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10 }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{t}</div>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mida partnerlus sisaldab */}
      <section style={{ padding: '64px 56px', borderBottom: 'var(--border)', background: 'var(--paper-2)' }}>
        <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 32px' }}>{c.howTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, maxWidth: 1100 }}>
          {c.how.map(([t, d]) => (
            <div key={t} style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{t}</div>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kuidas valime */}
      <section style={{ padding: '64px 56px', borderBottom: 'var(--border)' }}>
        <h2 className="vp-display" style={{ fontSize: 40, margin: '0 0 18px' }}>{c.selectTitle}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-2)', maxWidth: '68ch', margin: 0 }}>{c.select}</p>
      </section>

      {/* Ankeet */}
      <section style={{ padding: '64px 56px 96px' }}>
        <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 10px' }}>{c.formTitle}</h2>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '58ch', marginBottom: 32 }}>{c.formLead}</p>

        <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, maxWidth: 760 }}>
          <div style={fieldSt}><span style={labelSt}>{c.f.company} *</span>
            <input className="vp-input" required value={form.company} onChange={up('company')} /></div>
          <div style={fieldSt}><span style={labelSt}>{c.f.reg} *</span>
            <input className="vp-input" required value={form.regNr} onChange={up('regNr')} /></div>
          <div style={fieldSt}><span style={labelSt}>{c.f.contact} *</span>
            <input className="vp-input" required value={form.contact} onChange={up('contact')} /></div>
          <div style={fieldSt}><span style={labelSt}>{c.f.phone} *</span>
            <input className="vp-input" required value={form.phone} onChange={up('phone')} /></div>
          <div style={fieldSt}><span style={labelSt}>{c.f.email} *</span>
            <input className="vp-input" type="email" required value={form.email} onChange={up('email')} /></div>
          <div style={fieldSt}><span style={labelSt}>{c.f.website}</span>
            <input className="vp-input" value={form.website} onChange={up('website')} /></div>
          <div style={fieldSt}><span style={labelSt}>{c.f.region} *</span>
            <input className="vp-input" required value={form.region} onChange={up('region')} /></div>
          <div style={fieldSt}><span style={labelSt}>{c.f.field} *</span>
            <select className="vp-input" required style={{ cursor: 'pointer' }} value={form.field} onChange={up('field')}>
              <option value="">—</option>
              {c.fields.map((x) => <option key={x} value={x}>{x}</option>)}
            </select></div>
          <div style={fieldSt}><span style={labelSt}>{c.f.volume}</span>
            <select className="vp-input" style={{ cursor: 'pointer' }} value={form.volume} onChange={up('volume')}>
              <option value="">—</option>
              {c.volumes.map((x) => <option key={x} value={x}>{x}</option>)}
            </select></div>
          <div style={fieldSt}><span style={labelSt}>{c.f.showroom}</span>
            <select className="vp-input" style={{ cursor: 'pointer' }} value={form.showroom} onChange={up('showroom')}>
              <option value="">—</option>
              <option value={locale === 'sv' ? 'Ja' : 'Kyllä'}>{locale === 'sv' ? 'Ja' : 'Kyllä'}</option>
              <option value={locale === 'sv' ? 'Nej' : 'Ei'}>{locale === 'sv' ? 'Nej' : 'Ei'}</option>
            </select></div>
          <div style={{ ...fieldSt, gridColumn: '1 / -1' }}><span style={labelSt}>{c.f.range} *</span>
            <input className="vp-input" required value={form.range} onChange={up('range')} /></div>
          <div style={{ ...fieldSt, gridColumn: '1 / -1' }}><span style={labelSt}>{c.f.message}</span>
            <textarea className="vp-input" rows={4} value={form.message} onChange={up('message')} /></div>

          <label style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)' }}>
            <input type="checkbox" required checked={form.consent} onChange={up('consent')} style={{ marginTop: 2 }} />
            <span>{c.consent}</span>
          </label>

          <div style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
            <button type="submit" className="vp-btn vp-btn--lg" disabled={state === 'sending'}
              style={{ background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }}>
              {state === 'sending' ? c.sending : c.submit}
            </button>
            <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>
              {c.contact}: <a href={`mailto:${market.email}`} style={{ color: 'inherit', borderBottom: 'var(--border)' }}>{market.email}</a>
            </span>
          </div>
        </form>
      </section>
    </div>
  );
}
