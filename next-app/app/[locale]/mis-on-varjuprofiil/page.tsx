import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Mis on varjuprofiil? Täielik juhend',
    description: 'Varjuprofiil (ingl shadow gap profile) on alumiiniumprofiil, mis loob kahe pinna vahele tahtliku varjujoone. Sõnastik, tüübid, LED vs dekoratiivne, paigaldusnõuanded ja KKK.',
  };
}

const FAQ = [
  {
    q: 'Mis on varjuprofiil?',
    a: 'Varjuprofiil on alumiiniumist arhitektuurne profiil, mis paigaldatakse kahe pinna ühenduskohta nii, et tekitab tahtliku, ühtlase varjujoone. Inglise keeles tuntakse seda kui shadow gap profile.',
  },
  {
    q: 'Mille poolest erineb LED varjuprofiil dekoratiivsest varjuprofiilist?',
    a: 'LED varjuprofiil on disainitud LED-riba paigalduseks ning sisaldab soont valgustusele ja võimalust hajutile. Dekoratiivne varjuprofiil on puhtalt arhitektuurne detail — see loob varjujoone, kuid valgust sellesse ei integreerita. Mõlemad on varjuprofiilid, vahe on funktsionaalsuses.',
  },
  {
    q: 'Kas varjuprofiil on sama, mis LED profiil?',
    a: 'Ei. Varjuprofiil on ülemmõiste arhitektuursele detailile, mis loob varjujoone. LED profiil on üks varjuprofiili kasutusviis — kui profiili soonde paigaldatakse LED-riba. Kõik LED profiilid on varjuprofiilid, kuid kõik varjuprofiilid ei ole LED profiilid.',
  },
  {
    q: 'Kuhu varjuprofiile paigaldatakse?',
    a: 'Lae ja seina ühenduskohta (lae varjuprofiilid), seina ja põranda ühenduskohta (põranda varjuprofiilid), seinasiseste pindade üleminekutesse (seina peiteprofiilid) ning lae keskele dekoratiivseks elemendiks (kesklae varjuprofiilid).',
  },
  {
    q: 'Milliseid LED-ribasid kasutada laeprofiilide ja põrandaprofiilide jaoks?',
    a: 'Lae LED varjuprofiilidele: 12 W/m · 234 LED/m · 3000K · 24V. Põranda (ja seina) LED varjuprofiilidele: COB 16 W/m · 1350 lm/m · CRI 94 · 24V. COB-tehnoloogia annab ühtlase joone, kõrge heledus ja CRI 94 on kriitilised — põranda pind peegeldab valgust.',
  },
  {
    q: 'Millisest materjalist on varjuprofiil tehtud?',
    a: 'Alumiiniumsulam 6063-T5, mis on UV-kindel, niiskuskindel ja korrosioonivaba. Pinnaviimistlus võib olla anodeeritud, pulbervärvitud (mistahes RAL toonis) või looduslik.',
  },
  {
    q: 'Kui kaua varjuprofiil kestab?',
    a: 'Õigesti paigaldatud alumiinium varjuprofiili eluiga on vähemalt 25 aastat. See ei painu, ei murdu ega muuda kuju nagu plast. Anodeeritud või pulbervärvitud viimistlus säilib niikaua.',
  },
  {
    q: 'Kas varjuprofiile saab värvida?',
    a: 'Jah. Standardvalik sisaldab anodeeritud (naturaalne metall), musta ja valget viimistlust. Tellimisel saame pulbervärvida mistahes RAL-toonis. Valmistoodet ei tohi kodus uuesti värvida, kuna see rikub korrosioonikaitse.',
  },
  {
    q: 'Kas varjuprofiilid sobivad ka olemasolevasse interjööri?',
    a: 'Varjuprofiilid paigaldatakse tavaliselt ehituse või renoveerimise käigus, kuna nad asetsevad kipsplaadi sisse. Olemasolevasse interjööri lisamine on võimalik, kuid nõuab pinna avamist. Konkreetse projekti jaoks soovitame tasuta konsultatsiooni.',
  },
  {
    q: 'Milline on varjujoone suurus — kuidas valida sügavus?',
    a: 'Profiili number tähistab tavaliselt sügavust millimeetrites: AST5 = 5mm, AST10 = 10mm, AST20 = 20mm. Väike varjujoon (5–10mm) on subtiilsem, sobib väiksematesse ruumidesse. Suurem varjujoon (20–35mm) on dramaatilisem, sobib avaramatesse ruumidesse ja kõrgematesse lagedesse.',
  },
];

export default async function MisOnVarjuprofiilPage() {
  const locale = await getLocale();
  const ru = locale === 'ru';
  const pfx = ru ? '/ru' : '';

  // FAQPage structured data — same Q&A the page renders below.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div>
      <JsonLd data={faqSchema} />
      {/* Hero */}
      <section style={{ padding: '72px 56px 48px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
          <Link href={pfx || '/'}>{ru ? 'Главная' : 'Avaleht'}</Link>
          {' / '}
          <span style={{ color: 'var(--ink)' }}>{ru ? 'Что такое теневой профиль' : 'Mis on varjuprofiil'}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-end' }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
              {ru ? 'Словарь · Определение · ~8 мин чтения' : 'Sõnastik · Definitsioon · Lugemisaeg ~8 min'}
            </div>
            <h1 className="vp-display" style={{ fontSize: 'clamp(56px, 8vw, 112px)', margin: 0, lineHeight: 0.9 }}>
              {ru ? 'Что такое' : 'Mis on'}<br />
              <span style={{ fontFamily: "'Inter', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.55em', letterSpacing: '-0.02em' }}>
                {ru ? 'теневой профиль?' : 'varjuprofiil?'}
              </span>
            </h1>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>
              {ru
                ? 'Теневой профиль — это алюминиевый профиль, который монтируется в месте соединения двух поверхностей так, чтобы создать намеренную, равномерную теневую линию. По-английски известен как shadow gap profile.'
                : 'Varjuprofiil on alumiiniumprofiil, mis paigaldatakse kahe pinna ühenduskohta nii, et tekib tahtlik, ühtlane varjujoon. Inglise keeles tuntakse seda kui shadow gap profile.'}
            </p>
            <div style={{ display: 'flex', gap: 32, marginTop: 24, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <div><div style={{ color: 'var(--muted)', marginBottom: 4 }}>{ru ? 'Термин' : 'Termin'}</div><div>varjuprofiil</div></div>
              <div><div style={{ color: 'var(--muted)', marginBottom: 4 }}>EN</div><div>shadow gap profile</div></div>
              <div><div style={{ color: 'var(--muted)', marginBottom: 4 }}>{ru ? 'Материал' : 'Materjal'}</div><div>Alu 6063-T5</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of contents */}
      <section style={{ padding: '32px 56px', borderBottom: 'var(--border)', background: 'var(--paper-2)' }}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {[
            ['#definitsioon', ru ? '01 / Определение' : '01 / Definitsioon'],
            ['#paitolu', ru ? '02 / Происхождение' : '02 / Päritolu'],
            ['#tyybid', ru ? '03 / Типы' : '03 / Tüübid'],
            ['#led', ru ? '04 / LED vs деко' : '04 / LED vs deko'],
            ['#kasutusalad', ru ? '05 / Применение' : '05 / Kasutusalad'],
            ['#eelised', ru ? '06 / Преимущества' : '06 / Eelised'],
            ['#valik', ru ? '07 / Как выбрать' : '07 / Valikuabi'],
            ['#paigaldus', ru ? '08 / Монтаж' : '08 / Paigaldus'],
            ['#kkk', ru ? '09 / Вопросы' : '09 / KKK'],
            ['#sonastik', ru ? '10 / Словарь' : '10 / Sõnastik'],
          ].map(([href, label]) => (
            <a key={href} href={href} style={{ color: 'var(--ink-2)', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: 2 }}>{label}</a>
          ))}
        </div>
      </section>

      {/* 01 Definitsioon */}
      <section id="definitsioon" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)' }}>
        <div style={{ padding: '64px 56px', borderRight: 'var(--border)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '01 / Определение' : '01 / Definitsioon'}</div>
          <h2 className="vp-display" style={{ fontSize: 72, margin: '0 0 24px', lineHeight: 0.92 }}>
            {ru ? 'Что значит варjuprofiil.' : 'Mida tähendab varjuprofiil.'}
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 24 }}>
            {ru
              ? 'Теневой профиль — это алюминиевый архитектурный профиль, который монтируется в месте соединения двух поверхностей (например, потолка и стены, стены и пола или двух слоёв стены) таким образом, что создаёт намеренную, равномерную теневую линию.'
              : 'Varjuprofiil on alumiiniumist arhitektuurne profiil, mis paigaldatakse kahe pinna — näiteks lae ja seina, seina ja põranda, või kahe seinakihi — ühenduskohta nii, et tekitab tahtliku, ühtlase varjujoone. Selle asemel, et kaks pinda lihtsalt kohtuksid, jätab varjuprofiil nende vahele kontrollitud lõhe, mis muutub disaini-elemendiks.'}
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            {ru
              ? 'Независимо от того, устанавливается ли в профиль LED-лента или нет, его основная функция одна: создать контролируемую разделительную линию с тенью, которая делает помещение визуально чище, ровнее и архитектурно целостнее.'
              : 'Hoolimata sellest, kas profiili soonde paigaldatakse LED-riba või mitte, on selle põhifunktsioon sama: luua kontrollitud varjuga eraldusjoon, mis muudab ruumi visuaalselt puhtamaks, sirgemaks ja arhitektuurselt terviklikumaks.'}
          </p>
        </div>
        <div style={{ padding: '64px 56px', background: 'var(--paper-2)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 18 }}>{ru ? 'Словарная запись' : 'Sõnastiku-kanne'}</div>
          <div style={{ border: 'var(--border)', padding: '28px 28px', background: 'var(--paper)', marginBottom: 24 }}>
            <div className="vp-display" style={{ fontSize: 32, marginBottom: 8 }}>Varjuprofiil</div>
            <div style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)' }}>
              {ru
                ? '(сущ.) – алюминиевый профиль для отделки соединения двух поверхностей намеренной теневой линией; архитектурная деталь в современном интерьере.'
                : '(n.) – alumiiniumprofiil kahe pinna ühenduskoha viimistlemiseks tahtliku varjujoonega; arhitektuurne detail kaasaegses interjööris.'}
            </div>
            <div style={{ marginTop: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--muted)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <span>EN · shadow gap profile</span>
              <span>DE · Schattenfugenprofil</span>
            </div>
          </div>
          <blockquote style={{ margin: 0, paddingLeft: 20, borderLeft: '3px solid var(--accent)', fontStyle: 'italic', fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            {ru ? '«Варjuprofiil — не плинтус. Плинтус закрывает — теневой профиль разделяет.»' : '"Varjuprofiil pole liist. Liist katab — varjuprofiil eraldab."'}
          </blockquote>
        </div>
      </section>

      {/* 02 Päritolu */}
      <section id="paitolu" style={{ padding: '64px 56px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '02 / Происхождение' : '02 / Päritolu'}</div>
            <h2 className="vp-display" style={{ fontSize: 64, margin: 0, lineHeight: 0.92 }}>
              {ru ? 'Откуда слово varjuprofiil.' : 'Kust tuleb sõna varjuprofiil.'}
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              {ru
                ? 'Корни термина уходят в модернистскую архитектуру начала XX века — Мис ван дер Роэ, Ле Корбюзье и школа Баухауса: сокращение конструктивных деталей и выражение переходов между поверхностями через свет и тень.'
                : 'Termini juured ulatuvad modernistlikku arhitektuuri 20. sajandi algusest — Mies van der Rohe, Le Corbusier ja Bauhausi koolkond: ehitusdetailide vähendamine ja puhaste pindade vaheliste üleminekute väljendamine valguse ja varju kaudu.'}
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              {ru
                ? 'По-английски говорят shadow gap или reveal — намеренный зазор, создающий тень там, где традиционное строительство использовало бы накладную планку. По-немецки — Schattenfuge (буквально «теневой шов»). На эстонском языке естественный перевод — varjuprofiil — алюминиевый профиль, создающий эту теневую линию.'
                : 'Inglise keeles räägitakse shadow gap\'ist või reveal\'ist — tahtlikust lõhest, mis loob varju seal, kus traditsiooniline ehitus kasutaks katteliistu. Saksa keeles on termin Schattenfuge (sõna-sõnalt "varju-vuuk"). Eesti keeles on loomulik tõlge varjuprofiil — alumiiniumprofiil, mis selle varjujoone tekitab.'}
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              {ru
                ? 'Термин varjuprofiil в качестве строительного термина используется в Эстонии как минимум 10–15 лет, однако активно закрепляется в профессиональном языке именно сейчас — с ростом интереса к минималистским интерьерам.'
                : 'Sõna varjuprofiil on ehitusterminina kasutusel olnud Eestis vähemalt 10–15 aastat, kuid kinnistub professionaalses keeles just praegu — seoses kasvava huviga minimalistlike interjööride vastu.'}
            </p>
          </div>
        </div>
      </section>

      {/* 03 Tüüpide kaart */}
      <section id="tyybid" style={{ padding: '64px 56px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '03 / Карта типов' : '03 / Tüüpide kaart'}</div>
        <h2 className="vp-display" style={{ fontSize: 64, margin: '0 0 32px', lineHeight: 0.92 }}>
          {ru ? 'Карта типов варjuprofiilid.' : 'Varjuprofiilide tüüpide kaart.'}
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: 720, marginBottom: 40 }}>
          {ru
            ? 'Теневые профили классифицируются по двум осям: место монтажа (потолок, стена, пол, центральный потолок) и LED-готовность. Тёмный фон — с LED, светлый — без.'
            : 'Varjuprofiile saab klassifitseerida kahel teljel: paigaldusasukoht (lagi, sein, põrand, kesklagi) ja LED-valmidus. Tumedad taustad — LED-iga, heledad — ilma.'}
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: 'var(--border)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>{ru ? 'Место' : 'Asukoht'}</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: 'var(--border)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'var(--ink)', color: '#fff' }}>⚡ LED-{ru ? 'готовые' : 'valmidusega'}</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: 'var(--border)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>{ru ? 'Декоративные (без LED)' : 'Dekoratiivsed (ilma LED)'}</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  loc: ru ? 'Потолок' : 'Lagi',
                  led: 'LHV10, RST14, AST201, AST50, AST35, AST30, AST22, AST14_12, RST25, AST12, RST22, RST40',
                  deco: 'AST20, AST10, AST8, AST5',
                },
                {
                  loc: ru ? 'Центральный потолок' : 'Kesklagi',
                  led: 'RST14, RST25, RST22, RST40, RST1020',
                  deco: '—',
                },
                {
                  loc: ru ? 'Стена (скрытые)' : 'Sein (peiteprofiilid)',
                  led: 'ASP610, ASPL100, ASPL60, ASPL35, ASP410, ASP106, LPA909',
                  deco: 'LPA909',
                },
                {
                  loc: ru ? 'Пол' : 'Põrand',
                  led: 'ASP102, LHV10, ASPL100, ASPL60, ASPL35, ASP905, ASP904, ASP238, ASPL130, ASP106, ASPL120',
                  deco: 'ASP112, ASP116, ASP117, ASP168',
                },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>{row.loc}</td>
                  <td style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.03)', color: 'var(--ink)' }}>{row.led}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--ink-2)' }}>{row.deco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', marginTop: 14 }}>
          {ru ? 'Некоторые модели (LHV10, ASPL100, ASPL60, ASPL35, ASP106) подходят для нескольких мест и отображаются в нескольких строках.' : 'Mõned mudelid (LHV10, ASPL100, ASPL60, ASPL35, ASP106) sobivad mitme asukoha jaoks ja kuvatakse seetõttu mitmes reas.'}
        </p>
      </section>

      {/* 04 LED vs dekoratiivne */}
      <section id="led" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border)' }}>
        {/* LED */}
        <div style={{ padding: '64px 56px', borderRight: 'var(--border)', background: 'var(--ink)', color: 'var(--paper)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14, color: 'rgba(255,255,255,0.6)' }}>{ru ? '04A / С LED' : '04A / LED varjuprofiil'}</div>
          <h2 className="vp-display" style={{ fontSize: 56, margin: '0 0 24px', lineHeight: 0.92, color: 'var(--paper)' }}>
            {ru ? 'LED варjuprofiil.' : 'LED varjuprofiil.'}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,0.75)', marginBottom: 24 }}>
            {ru ? 'Тж. LED-профиль для потолка, LED-профиль для пола, LED-профиль скрытого монтажа.' : 'Tuntakse ka kui LED laeprofiil, LED põrandaprofiil, LED süvisprofiil.'}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gap: 10 }}>
            {(ru ? [
              'Интегрированный канал под LED-ленту',
              'Защёлкивающийся диффузор для мягкого света',
              'Создаёт теневую линию и освещение',
              'Подходит под кухонную столешницу, за изголовьем, по периметру потолка',
              'Требует питания и проводки',
            ] : [
              'Integreeritud soon LED-ribale',
              'Klõpsuv hajuti pehme valguse jaoks',
              'Loob nii varjujoone kui valgustuse',
              'Sobib köögitööpinna alla, voodi taha, lae perimeetrisse',
              'Vajab juurde voolutoidet ja juhtmestikku',
            ]).map((item) => (
              <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'baseline', fontSize: 15, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 10 }}>
                <span style={{ color: '#F4B400', fontFamily: 'JetBrains Mono' }}>⚡</span>{item}
              </li>
            ))}
          </ul>
          <div className="vp-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {ru ? 'Примеры:' : 'Näited:'} AST201, AST50, ASPL100, ASPL60, LHV10
          </div>
        </div>

        {/* Dekoratiivne */}
        <div style={{ padding: '64px 56px' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '04B / Без LED (декоративный)' : '04B / Dekoratiivne varjuprofiil'}</div>
          <h2 className="vp-display" style={{ fontSize: 56, margin: '0 0 24px', lineHeight: 0.92 }}>
            {ru ? 'Без LED.' : 'Ilma LED-ita.'}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: 24 }}>
            {ru ? 'Чисто архитектурный. Также называется shadow gap.' : 'Puhtalt arhitektuurne — ilma LED-ita. Nimetatakse ka shadow gap\'iks.'}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gap: 10 }}>
            {(ru ? [
              'Намеренная теневая линия без подсветки',
              'Ниже цена, чем LED-вариант',
              'Проще монтаж (не нужно электричество)',
              'Подходит туда, где освещение не нужно',
              'Создаёт чисто визуальный эффект',
            ] : [
              'Tahtlik varjujoon ilma valgustuseta',
              'Madalam hind kui LED-versioonil',
              'Lihtsam paigaldus (ei vaja elektrit)',
              'Sobib kohtadesse, kus valgustus pole vajalik',
              'Loob puhtalt visuaalse efekti',
            ]).map((item) => (
              <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'baseline', fontSize: 15, borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: 10 }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono' }}>→</span>{item}
              </li>
            ))}
          </ul>
          <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {ru ? 'Примеры:' : 'Näited:'} AST5, AST8, AST10, AST20, LPA909
          </div>
        </div>
      </section>

      {/* 05 Kasutusalad */}
      <section id="kasutusalad" style={{ padding: '64px 56px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '05 / Применение' : '05 / Kasutusalad'}</div>
        <h2 className="vp-display" style={{ fontSize: 64, margin: '0 0 40px', lineHeight: 0.92 }}>
          {ru ? 'Куда монтируются варjuprofiilid.' : 'Kuhu varjuprofiile paigaldatakse.'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--ink)', border: 'var(--border)' }}>
          {[
            {
              n: '01',
              t: ru ? 'Потолок' : 'Lakke',
              sub: ru ? 'Потолочные · LED потолочные' : 'Lae varjuprofiilid · Lae LED varjuprofiilid',
              d: ru ? 'Монтируется в место соединения потолка и стены. Создаёт эффект «парящего потолка» и скрывает угловые планки. В LED-варианте — мягкая периметральная подсветка.' : 'Paigaldatakse lae ja seina ühenduskohta. Loob "hõljuva lae" efekti ja peidab traditsioonilise nurgaliistu vajaduse. LED-versioonis pakub pehmet perimeetrivalgustust.',
              skus: 'LHV10 · AST201 · AST50 · AST35 · AST30 · AST22 · AST14_12 · AST20 · AST10 · AST8 · AST5',
            },
            {
              n: '02',
              t: ru ? 'Пол' : 'Põrandasse',
              sub: ru ? 'Напольные · LED напольные' : 'Põranda varjuprofiilid · Põranda LED varjuprofiilid',
              d: ru ? 'Монтируется в место соединения стены и пола — заменяет традиционный плинтус. В LED-варианте — мягкая скрытая подсветка по периметру пола.' : 'Paigaldatakse seina ja põranda ühenduskohta — asendab traditsioonilise põrandaliistu. LED-versioonis valgustab põranda perimeetri pehme peitevalgustusega.',
              skus: 'ASPL100 · ASPL60 · ASPL35 · ASP102 · ASP905 · ASP904 · ASPL130 · ASP112 · ASP116 · ASP117 · ASP168',
            },
            {
              n: '03',
              t: ru ? 'Стена' : 'Seinale',
              sub: ru ? 'Настенные скрытые профили' : 'Seina varjuprofiilid · Seina peiteprofiilid',
              d: ru ? 'Монтируется во внутренние переходы стен — например, между двумя слоями стены, вокруг окна или двери, или как декоративная вертикальная линия. В LED-варианте создаёт ambient-подсветку.' : 'Paigaldatakse seinasiseste pindade üleminekutesse — näiteks kahe seinakihi vahele, akna või ukse raami ümber. LED-versioonis loob ambient-valguse.',
              skus: 'ASP610 · ASPL100 · ASPL60 · ASPL35 · ASP410 · ASP106 · LPA909',
            },
            {
              n: '04',
              t: ru ? 'Центральный потолок' : 'Kesklakke',
              sub: ru ? 'LED профили для центрального потолка' : 'Kesklae LED varjuprofiilid',
              d: ru ? 'Монтируется в центр потолка как декоративный элемент — отдельной полосой, кольцом или другой формой. Создаёт графическую световую линию, визуально определяющую пространство.' : 'Paigaldatakse lae keskele dekoratiivseks elemendiks — eraldi reaga, ringina, või muu kujundina. Loob graafilise valguse-joone, mis defineerib ruumi visuaalselt.',
              skus: 'RST14 · RST25 · RST22 · RST40 · RST1020',
            },
          ].map((item) => (
            <div key={item.n} style={{ background: 'var(--paper)', padding: '36px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="vp-display" style={{ fontSize: 48, lineHeight: 1, color: 'var(--accent)' }}>{item.n}</span>
              </div>
              <div className="vp-display" style={{ fontSize: 32, marginBottom: 6 }}>{item.t}</div>
              <div className="vp-mono" style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.sub}</div>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: '0 0 14px' }}>{item.d}</p>
              <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{item.skus}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 06 Eelised */}
      <section id="eelised" style={{ padding: '64px 56px', borderBottom: 'var(--border)', background: 'var(--paper-2)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '06 / Преимущества' : '06 / Eelised'}</div>
        <h2 className="vp-display" style={{ fontSize: 64, margin: '0 0 40px', lineHeight: 0.92 }}>
          {ru ? 'Почему выбирают варjuprofiil.' : 'Miks valida varjuprofiil.'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--ink)', border: 'var(--border)' }}>
          {[
            { n: '01', tEt: 'Arhitektuurne puhtus', tRu: 'Архитектурная чистота', dEt: 'Sirged jooned, peidetud üleminekud. Asendab traditsioonilised katteliisud kaasaegse minimalistliku detailiga.', dRu: 'Прямые линии, скрытые переходы. Заменяет традиционные накладные планки современной минималистичной деталью.' },
            { n: '02', tEt: 'Pikem eluiga', tRu: 'Долгий срок службы', dEt: 'Alumiinium 6063-T5 on UV-, niiskus- ja korrosioonikindel. Eluiga 25+ aastat.', dRu: 'Алюминий 6063-T5 устойчив к УФ, влаге и коррозии. Срок службы 25+ лет.' },
            { n: '03', tEt: 'Peidab ehitusvead', tRu: 'Скрывает дефекты', dEt: 'Varjuprofiil maskeerib pisikesed ebatasasused kipsplaatide ühenduskohtades.', dRu: 'Маскирует небольшие неровности на стыках гипсокартона.' },
            { n: '04', tEt: 'Mitmekülgne', tRu: 'Универсальный', dEt: 'Sobib eluruumidesse, kontoritesse, hotellidesse, restoranidesse — igal pool, kus disaini-kvaliteet on oluline.', dRu: 'Подходит для жилья, офисов, отелей, ресторанов — везде, где важно качество дизайна.' },
            { n: '05', tEt: 'Valikuline valgustus', tRu: 'Опциональное освещение', dEt: 'Sama profiili saab kasutada kas valgustusega või ilma — disainikeel on järjepidev.', dRu: 'Один и тот же профиль можно использовать со светом или без — дизайн-язык остаётся последовательным.' },
            { n: '06', tEt: 'Iga RAL-toon', tRu: 'Любой цвет RAL', dEt: 'Pulbervärvitud mistahes RAL-toonis vastavalt interjööri värvilahendusele.', dRu: 'Порошковая окраска в любой оттенок RAL под цветовое решение интерьера.' },
            { n: '07', tEt: 'Kasvatab kinnisvara väärtust', tRu: 'Повышает стоимость', dEt: 'Premium-detailid on tunnetatav kvaliteedimarker. Varjuprofiilidega viimistletud interjöörid müüvad kiiremini.', dRu: 'Премиум-детали — ощутимый маркер качества. Интерьеры с теневыми профилями продаются быстрее.' },
            { n: '08', tEt: 'Ajatu disain', tRu: 'Вневременной дизайн', dEt: 'Modernistlik vormikeel, mis pole moe-küsimus. Püsib relevantsena nii täna kui 20 aasta pärast.', dRu: 'Модернистский формальный язык, не зависящий от моды. Актуален сегодня и через 20 лет.' },
          ].map((b, i) => (
            <div key={b.n} style={{ background: 'var(--paper)', padding: '28px 24px' }}>
              <div className="vp-display" style={{ fontSize: 40, lineHeight: 1, color: 'var(--accent)', marginBottom: 10 }}>{b.n}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{ru ? b.tRu : b.tEt}</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>{ru ? b.dRu : b.dEt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 07 Valikuabi */}
      <section id="valik" style={{ padding: '64px 56px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '07 / Как выбрать' : '07 / Valikuabi'}</div>
            <h2 className="vp-display" style={{ fontSize: 64, margin: 0, lineHeight: 0.92 }}>
              {ru ? 'Как выбрать правильный профиль.' : 'Kuidas valida õige varjuprofiil.'}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', marginTop: 20 }}>
              {ru ? 'Выбор сводится к трём вопросам. Ответив на них, вы значительно сужаете выбор.' : 'Õige varjuprofiili valimine taandub kolmele küsimusele. Kui vastad nendele, saad valiku oluliselt kitsamaks.'}
            </p>
          </div>
          <div>
            {[
              {
                n: '01',
                qEt: 'Küsimus 1 — Kuhu paigaldad?',
                qRu: 'Вопрос 1 — Куда монтируешь?',
                aEt: 'Lagi, sein, põrand või kesklagi? See määrab esimese kategooria. Iga asukoht on valikus eraldi tootegrupina.',
                aRu: 'Потолок, стена, пол или центральный потолок? Это определяет первую категорию. Каждое место — отдельная группа товаров.',
              },
              {
                n: '02',
                qEt: 'Küsimus 2 — Kas vajad LED-valgustust?',
                qRu: 'Вопрос 2 — Нужно ли LED-освещение?',
                aEt: 'Kui jah → vali LED-valmidusega mudel (lakke: AST201, AST50, RST22; põrandasse: ASPL100, ASPL60). Kui ei → vali dekoratiivne (lakke: AST5, AST8, AST10, AST20).',
                aRu: 'Если да → выбирай LED-готовую модель (потолок: AST201, AST50, RST22; пол: ASPL100, ASPL60). Если нет → декоративную (потолок: AST5, AST8, AST10, AST20).',
              },
              {
                n: '03',
                qEt: 'Küsimus 3 — Millise sügavusega varjujoont soovid?',
                qRu: 'Вопрос 3 — Какую глубину теневой линии хочешь?',
                aEt: 'Profiili number tähistab tavaliselt sügavust mm-tes: AST5 = 5mm, AST10 = 10mm, AST22 = 22mm. Väike (5–10mm) on subtiilsem; suurem (20–35mm) on dramaatilisem.',
                aRu: 'Номер профиля обычно указывает глубину в мм: AST5 = 5мм, AST10 = 10мм, AST22 = 22мм. Маленький (5–10мм) — субтильнее; больший (20–35мм) — эффектнее.',
              },
              {
                n: '04',
                qEt: 'Küsimus 4 (kui LED) — Milline LED-riba?',
                qRu: 'Вопрос 4 (если LED) — Какая лента?',
                aEt: 'Laeprofiilile: 12 W/m · 234 LED/m · 3000K · 24V. Põranda/seina profiilile: COB 16 W/m · 1350 lm/m · CRI 94 · 24V. Alati 24V ja CRI ≥ 90.',
                aRu: 'Для потолочного: 12 Вт/м · 234 LED/м · 3000K · 24V. Для напольного/настенного: COB 16 Вт/м · 1350 лм/м · CRI 94 · 24V. Всегда 24V и CRI ≥ 90.',
              },
            ].map((q, i) => (
              <div key={q.n} style={{ padding: '20px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16 }}>
                  <span className="vp-display" style={{ fontSize: 36, lineHeight: 1, color: 'var(--accent)' }}>{q.n}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{ru ? q.qRu : q.qEt}</div>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{ru ? q.aRu : q.aEt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 Paigaldus */}
      <section id="paigaldus" style={{ padding: '64px 56px', borderBottom: 'var(--border)', background: 'var(--paper-2)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '08 / Краткий обзор монтажа' : '08 / Lühike paigaldusülevaade'}</div>
        <h2 className="vp-display" style={{ fontSize: 64, margin: '0 0 40px', lineHeight: 0.92 }}>
          {ru ? 'Монтаж.' : 'Paigaldus.'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: 'var(--ink)', border: 'var(--border)' }}>
          {[
            { n: '1', tEt: 'Mõõdistamine', tRu: 'Замеры', dEt: 'Mõõda ühenduskoha pikkus täpselt. Standard-pikkused on 2,5 m ja 2,6 m.', dRu: 'Замерь длину стыка точно. Стандартные длины — 2,5 м и 2,6 м.' },
            { n: '2', tEt: 'Ettevalmistus', tRu: 'Подготовка', dEt: 'Pind peab olema sirge ja puhas. LED-versiooni puhul valmista juhtmestik ette enne kipsplaadi sulgemist.', dRu: 'Поверхность должна быть ровной и чистой. Для LED подготовь проводку до зашивки.' },
            { n: '3', tEt: 'Paigaldus', tRu: 'Монтаж', dEt: 'Profiil kinnitatakse kruvide või liimiga, sõltuvalt mudelist. Kipsplaadid lõigatakse profiili kinnitusserva järgi.', dRu: 'Профиль крепится шурупами или клеем — зависит от модели. Гипсокартон режется по крепёжному краю.' },
            { n: '4', tEt: 'Pahteldamine', tRu: 'Шпаклёвка', dEt: 'Profiili äär pahteldatakse kipsplaadiga ühte tasapinda. Varjuprofiili nähtav serv jääb pahtli alt välja.', dRu: 'Край профиля шпаклюется заподлицо с гипсокартоном. Видимый край теневого профиля остаётся открытым.' },
            { n: '5', tEt: 'LED-riba (vajaduse korral)', tRu: 'LED-лента (если нужна)', dEt: 'LED-riba kleebitakse profiili soonde, ühendatakse trafoga, kaetakse klõpsuva hajutiga.', dRu: 'LED-лента вклеивается в канал профиля, подключается к блоку питания, закрывается защёлкивающимся диффузором.' },
          ].map((s) => (
            <div key={s.n} style={{ background: 'var(--paper)', padding: '28px 20px' }}>
              <div className="vp-display" style={{ fontSize: 40, color: 'var(--accent)', marginBottom: 10 }}>{s.n}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{ru ? s.tRu : s.tEt}</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>{ru ? s.dRu : s.dEt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 09 KKK */}
      <section id="kkk" style={{ padding: '64px 56px', borderBottom: 'var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64 }}>
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '09 / Часто задаваемые вопросы' : '09 / Korduma kippuvad küsimused'}</div>
            <h2 className="vp-display" style={{ fontSize: 56, margin: 0, lineHeight: 0.95 }}>
              {ru ? 'Вопросы и ответы.' : 'KKK.'}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', marginTop: 20 }}>
              {ru ? '10 самых частых вопросов о теневых профилях.' : '10 kõige sagedasemat küsimust varjuprofiilide kohta.'}
            </p>
          </div>
          <div>
            {FAQ.map((item, i) => (
              <div key={i} style={{ padding: '18px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.1)' }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{item.q}</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Sõnastik */}
      <section id="sonastik" style={{ padding: '64px 56px', borderBottom: 'var(--border)', background: 'var(--paper-2)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? '10 / Словарь' : '10 / Sõnastik'}</div>
        <h2 className="vp-display" style={{ fontSize: 64, margin: '0 0 40px', lineHeight: 0.92 }}>
          {ru ? 'Словарь терминов.' : 'Varjuprofiili sõnastik.'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--ink)', border: 'var(--border)' }}>
          {[
            { term: 'Varjuprofiil', en: 'EN · shadow gap', dEt: 'Ülemmõiste — alumiiniumprofiil, mis loob tahtliku varjujoone. Kasutusel nii LED-iga kui ilma.', dRu: 'Общий термин — алюминиевый профиль, создающий намеренную теневую линию. Используется со светом и без.' },
            { term: 'Viimistlussiin', en: 'ka: laesiin, varjuliist', dEt: 'Varjuprofiili rahvapärased sünonüümid. Viimistlussiin ja laesiin viitavad samale alumiiniumprofiilile — meie kasutame täpsemat terminit varjuprofiil.', dRu: 'Народные синонимы теневого профиля. Отделочная шина и потолочная шина — тот же алюминиевый профиль; мы используем более точный термин.' },
            { term: 'LED varjuprofiil', en: 'EN · LED profile', dEt: 'Varjuprofiili alaliik, mille soonde paigaldatakse LED-riba. Sünonüümid: LED laeprofiil, LED põrandaprofiil.', dRu: 'Подвид теневого профиля, в канал которого монтируется LED-лента. Синонимы: LED для потолка, LED для пола.' },
            { term: 'Süvisprofiil', en: 'EN · recessed profile', dEt: 'Profiil, mis paigaldatakse pinnaga ühte tasapinda (kipsplaadi sisse). Tihti LED-iga, kuid mitte alati.', dRu: 'Профиль, монтируемый заподлицо с поверхностью (в гипсокартон). Часто с LED, но не всегда.' },
            { term: 'Seina peiteprofiil', en: 'shadow line profile', dEt: 'Seina varjuprofiil seinasiseste pindade üleminekute peitmiseks. Sageli ASP610, ASPL100, ASPL60.', dRu: 'Настенный теневой профиль для скрытия переходов внутри стен. Чаще всего ASP610, ASPL100, ASPL60.' },
            { term: 'Hajuti', en: 'EN · diffuser', dEt: 'Klõpsuv plastriba LED varjuprofiili peal, mis pehmendab valgust ja peidab üksikud LED-täpid.', dRu: 'Защёлкивающаяся пластиковая полоса поверх LED-профиля — смягчает свет и скрывает отдельные диоды.' },
            { term: 'COB-LED', en: 'Chip on Board', dEt: 'LED-riba tüüp, kus dioodid on sulatatud ühtlaseks valgusjooneks. Soovitatud põranda- ja seina LED profiilide jaoks (COB 16 W/m, CRI 94, 24V).', dRu: 'Тип LED-ленты, где диоды сплавлены в равномерную световую линию. Рекомендуется для напольных и настенных (COB 16 Вт/м, CRI 94, 24V).' },
            { term: 'Anodeerimine', en: 'EN · anodizing', dEt: 'Alumiiniumi pinna elektrolüütiline töötlus, mis tekitab kaitsva oksiidikihi. Säilitab metallilise välimuse.', dRu: 'Электролитическая обработка поверхности алюминия, создающая защитный оксидный слой. Сохраняет металлический вид.' },
            { term: 'Pulbervärvimine', en: 'EN · powder coating', dEt: 'Värvi pealekandmise tehnika, kus pulber elektrostaatiliselt pinnale kantakse ja kuumas ahjus sulatatakse.', dRu: 'Технология нанесения краски: порошок наносится электростатически и спекается в горячей печи. Прочное покрытие.' },
            { term: 'RAL-toon', en: 'RAL colour system', dEt: 'Standardne värvikood-süsteem. Iga varjuprofiili saab tellida mistahes RAL-toonis (nt RAL 9005 — sügav must).', dRu: 'Стандартная система цветовых кодов. Любой теневой профиль можно заказать в любом оттенке RAL (напр. RAL 9005 — глубокий чёрный).' },
          ].map((g) => (
            <div key={g.term} style={{ background: 'var(--paper)', padding: '24px 22px' }}>
              <div className="vp-display" style={{ fontSize: 22, marginBottom: 4 }}>{g.term}</div>
              <div className="vp-mono" style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{g.en}</div>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{ru ? g.dRu : g.dEt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '96px 56px', textAlign: 'center', background: 'var(--ink)', color: 'var(--paper)', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
          {ru ? 'Знаешь, что такое теневой профиль. Время выбирать.' : 'Tead mis on varjuprofiil. Aeg valida.'}
        </div>
        <h2 className="vp-display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: '0 0 40px', lineHeight: 0.9, color: 'var(--paper)' }}>
          {ru ? 'Смотреть все профили.' : 'Vaata kõiki tooteid.'}
        </h2>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          <Link href={`${pfx}/tooted`} className="vp-btn vp-btn--lg" style={{ background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)' }}>
            {ru ? 'Смотреть все товары →' : 'Vaata kõiki tooteid →'}
          </Link>
          <Link href={`${pfx}/kontakt`} className="vp-btn vp-btn--ghost vp-btn--lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'var(--paper)' }}>
            {ru ? 'Бесплатная консультация' : 'Tasuta konsultatsioon'}
          </Link>
        </div>
        <p className="vp-mono" style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {ru ? 'Обновлено: май 2026 · Varjuprofiilid.ee · Словарь' : 'Viimati uuendatud: mai 2026 · Varjuprofiilid.ee · Sõnastik'}
        </p>
      </section>
    </div>
  );
}
