/* Inspiratsioon — projektide galerii + üksiku projekti vaade
   ─────────────────────────────────────────────────────────────
   SEO (vt. Pre-production audit · S-02, S-04, S-07):
   - document.title + meta description injekteeritakse useEffect-iga
   - JSON-LD: Article + BreadcrumbList + ItemList (kasutatud tooted)
   - H1 sisaldab võtmesõnu (varjuprofiil + toote SKU-d)
   - alt-tekstid on kirjeldavad, mitte ainult SKU
   - sisemine linkimine viib `urlPath`-i järgi otse tootelehele
*/



const _PROJ_RU = {
  'eduardi-maja': {
    lede: 'Дом, где теневой профиль — не деталь, а ритм всего пространства. AST50 рисует периметр, AST30 держит чистыми проёмы дверей, AST22 появляется там, где след должен быть почти незаметен.',
    author: 'Дизайнер интерьера — уточняется',
    photo: 'Фотограф — уточняется',
    install: 'Монтажник — уточняется',
    totalM: '184 пог.м',
    finish: 'RAL 9005 матовый',
    coverAlt: 'Дом Эдуарда — спальня с тёплым периметром LED-профиля AST50 на стыке потолка и стены, встроенный гардероб и детский мольберт',
    story: {
      h: 'Один дом, три SKU, одна непрерывная линия.',
      p: [
        'Заказчик не хотел потолок, который «заявляет о себе». Скорее — решение, которое держит под контролем все переходы: стык потолка и стены, проёмы дверей, освещение и внутреннюю отделку гардеробов. В качестве ответа выбрали три профиля одной серии, работающих вместе как одна непрерывная чёрная линия через весь дом.',
        '**AST50** идёт по всему периметру потолка и прячет LED-ленту 2700K — создаёт мягкий эффект «парящего потолка» в гостиной и на кухне. **AST30** служит карманом для проёмов дверей и прихожей, куда тоже поставили LED — чтобы вечером коридор работал только теневой линией. **AST22** появляется там, где след должен быть почти незаметным — внутренние двери спальни и контур потолка гардероба.',
        'Самой сложной частью был стык трёх профилей разной глубины в одном углу. Решили с помощью макета 1:1 ещё до монтажа. Результат — вся комбинация выглядит как одно целое, а не три отдельных детали.'
      ]
    },
    usage: {
      AST22: { role: 'Тонкий переход', where: 'Проёмы внутренних дверей спальни и коридора, внутренние стыки гардероба', finish: 'Порошковая окраска RAL 9005 (чёрный матовый)' },
      AST30: { role: 'Дверной проём + карман для LED', where: 'Внутренние двери между гостиной и кухней, входная прихожая', finish: 'Порошковая окраска RAL 9005 (чёрный матовый)' },
      AST50: { role: 'Периметр потолка, LED-контур', where: 'Гостиная, кухня, главная спальня — весь периметр потолка', finish: 'Порошковая окраска RAL 9005 (чёрный матовый), LED 2700K' }
    },
    lessons: [
      { k: 'Макет до монтажа', v: 'Соединение трёх профилей разной глубины (AST22 · 22 мм, AST30 · 30 мм, AST50 · 50 мм) в одном углу без построения тестовой стены 1:1 — риск. Макет сэкономил на монтаже целый день.' },
      { k: 'LED 2700K, а не 3000K', v: 'Более тёплый свет даёт отражение от прошпаклёванного профиля, которое объективно ощущается теплее и мягче. 3000K выглядели бы «офисно».' },
      { k: 'RAL 9005 чёрный матовый, а не анодированный', v: 'Анодированная поверхность ощущалась слишком технически. Порошковая RAL 9005 сливается с дубом и стеклом без холодного металлического оттенка.' },
      { k: 'AST22 туда, где профиль не должен доминировать', v: 'Над дверью спальни AST22 работает почти незаметно. Более широкий профиль сломал бы ритм.' }
    ]
  },
  'tallinna-korter': {
    lede: 'Квартира, планировку которой клиент сделал сам и установил собственник. Мягкий LED-периметр ведёт из прихожей через кухню в ванную; алюминиевый плинтус MPA015 держит чистой линию пол-стена по всей квартире. Доказательство, что композиция теневых профилей не требует дизайнера — правильный выбор SKU выводит результат на уровень.',
    author: 'Клиент сам (планировка)',
    photo: 'Varjuprofiilid.ee',
    install: 'Собственник сам',
    totalM: '144 пог.м',
    finish: 'Смесь: белый порошок + анодирование',
    coverAlt: 'Таллиннская квартира — кухня с парящим потолком из LED-профиля AST50, дубовый паркет, матово-бежевая кухонная мебель и три подвесных светильника над обеденным столом',
    story: {
      h: 'Квартира, решающая свет и линии без дизайнера интерьера.',
      p: [
        'Клиент пришёл к нам с планировкой, которую сам нарисовал на бумаге — он точно знал, где хочет более мягкий ambient-свет и где чёткий след выравнивания. Дизайнера интерьера он не использовал. Наша роль была в выборе SKU: какой профиль идёт на какой размер и для чего.',
        '**AST50** решает жилые зоны — прихожую, кухню, коридор — периметр потолка и опущенную LED-кассету над кухней. **AST30** и **AST22** идут в ванную: AST30 на стык потолка и плитки, AST22 вокруг большого зеркала, куда поставили 4000K LED для влажного помещения. **MPA015** — алюминиевый плинтус, который проходит через всю квартиру и держит соединение дубового паркета и светлых стен одной прямой линией.',
        'Монтаж сделал сам собственник — это был серьёзный тест того, насколько хорошо клик-система MPA015 и шпаклёвочные профили серии AST работают в реальной жизни. Результат: все размеры легли с первого раза. Фотографии приехали делать мы сами, когда всё было готово.'
      ]
    },
    usage: {
      AST22: { role: 'LED-рамка зеркала в ванной', where: 'Ванная — периметр зеркала, где подсветка сзади создаёт эффект парения на сером мраморе', finish: 'Анодированное серебро (цвет), LED 4000K (IP44 для влажных помещений)' },
      AST30: { role: 'Периметр потолка ванной', where: 'Ванная — на стыке потолка и мраморной плитки, прячет верхнюю кромку плитки', finish: 'Анодированное серебро (цвет), LED 4000K' },
      AST50: { role: 'Периметр потолка, парящая кассета', where: 'Прихожая, кухня, коридор — весь периметр потолка и опущенная кассета над кухней', finish: 'Порошковая окраска белый, LED 3000K' },
      MPA015: { role: 'Плинтус с теневым швом', where: 'Вся квартира — прихожая, кухня, коридор, столовая, ванная', finish: 'Анодированный алюминий, матово-белая окраска' }
    },
    lessons: [
      { k: 'Клиент сам + собственник-монтажник = работает', v: 'При наличии правильного руководства по SKU и таблицы замеров квартире с теневыми профилями дизайнер не нужен. Этот проект — первый полный «DIY-уровень» — рекомендуем его собственникам квартир как образец.' },
      { k: 'AST22 как LED-зеркало в ванной', v: 'Глубина AST22 (22 мм) — ровно столько, чтобы LED-лента за зеркалом не была видна, но даёт достаточно тени, чтобы зеркало «парило» над стеной. 4000K выводит фактуру серого мрамора.' },
      { k: 'AST50 в белом, а не чёрном', v: 'Квартира в светлых тонах; клиент осознанно выбрал белую порошковую окраску. Тень в LED-канавке создаёт читаемое членение периметра, сам профиль остаётся в одном тоне со стеной и потолком.' },
      { k: 'MPA015 во влажных помещениях', v: 'MPA015 — анодированный алюминий — выдерживает влажность ванной и моющие средства без повреждения поверхности. Один плинтус по всей квартире держит визуальную целостность.' }
    ]
  },
  'viimsi-vannituba': {
    lede: 'Узкая ниша ванной, отдельно стоящая каменная ванна и два LED-теневых профиля — ASPL130 на полу, AST30 за верхним краем потолочной ниши — колонной рисуют вокруг ванны мягкий световой коридор. Точечные светильники включают только когда кто-то моется. В остальное время помещение работает только двумя скрытыми LED-линиями.',
    author: 'Клиент сам (планировка)',
    photo: 'Varjuprofiilid.ee',
    install: 'Строительная фирма по выбору собственника',
    totalM: '8 пог.м',
    finish: 'RAL 9005 матовый',
    coverAlt: 'Ванная в Виймси — отдельно стоящая белая каменная ванна в тёмной нише, чёрные смесители на бежевой каменной плитке и тёплая линия LED-профиля AST30 у края потолка',
    story: {
      h: 'Одна ванна, две LED-линии, три сценария.',
      p: [
        'Заказчик решил всё сам — выбрал ванну, плитку и положение освещения. Наша задача была подобрать профили под две скрытые LED-линии и LED-ленту для влажного помещения.',
        '**ASPL130** идёт по полу под каменной ванной и даёт мягкий свет на пол. **AST30** размещён за верхним краем потолочной ниши и подсвечивает потолок. Вместе они создают вокруг ванны световой коридор, который полностью отключим — а тогда работают только точечные светильники в потолке.',
        'Самым интересным результатом стало то, насколько различные настроения можно создать одной и той же ванной: только LED-профили = вечерний ритуал; только точечные = практичная утренняя освещённость; всё вместе = полностью освещённое для уборки. Заказчик использует все три сценария.'
      ]
    },
    usage: {
      AST30: { role: 'Подсветка потолочной ниши', where: 'За верхним краем потолочной ниши над ванной — рассеянный свет на потолок', finish: 'Порошковая окраска RAL 9005, LED 2700K (IP44)' },
      ASPL130: { role: 'Напольная LED-линия', where: 'Пол под отдельно стоящей ванной — мягкий свет на каменную плитку', finish: 'Порошковая окраска RAL 9005, LED 2700K (IP65)' }
    },
    lessons: [
      { k: 'Две LED-линии, не одна', v: 'Один источник света в нише создал бы плоский, обычный эффект. Две независимые линии (потолок + пол) дают объём и позволяют переключать настроение.' },
      { k: 'IP-степень имеет значение', v: 'ASPL130 на полу под ванной требует IP65 — в случае разбрызгивания воды лента должна выдерживать. AST30 на потолке IP44 достаточно — там только пар.' },
      { k: 'Точечные светильники как дополнение, а не основа', v: 'Если ванная разработана для LED-теневых профилей, точечные светильники включают только для уборки и утреннего макияжа. Вечером они кажутся «офисными».' },
      { k: 'Каменная плитка отражает свет', v: 'Бежевая каменная плитка работает как естественный отражатель — 2700K LED даёт тёплый янтарный отблеск на всех вертикальных поверхностях. Холодный свет (4000K) выглядел бы стерильно.' }
    ]
  }
};

function _projRu(proj){ return (window.__locale === 'ru' ? _PROJ_RU[proj.id] : null) || {}; }
function _projField(proj, key){ const r = _projRu(proj); return (r[key] != null && r[key] !== '') ? r[key] : proj[key]; }
function _projStoryH(proj){ const r = _projRu(proj); return (r.story && r.story.h) || (proj.story && proj.story.h); }
function _projStoryP(proj){ const r = _projRu(proj); return (r.story && r.story.p) || (proj.story && proj.story.p) || []; }
function _projUsage(proj, sku){ const r = _projRu(proj); const ru = r.usage && r.usage[sku]; const et = proj.usage && proj.usage[sku] || {}; return ru ? { role: ru.role || et.role, where: ru.where || et.where, finish: ru.finish || et.finish, m: et.m } : et; }
function _projLessons(proj){ const r = _projRu(proj); return (r.lessons) || proj.lessons || []; }

function _trCat(c){ return (window.__locale==='ru' ? ({Eramaja:'Дом',Korter:'Квартира',Büroo:'Офис','Avalik ruum':'Общественное'})[c] : null) || c; }
function _trLoc(l){ return (window.__locale==='ru' ? ({Harjumaa:'Харьюмаа',Tallinn:'Таллинн',Viimsi:'Виймси',Tartu:'Тарту',Pärnu:'Пярну',Vannituba:'Ванная'})[l] : null) || l; }
function _trProjT(t){ return (window.__locale==='ru' ? ({'Eduardi maja':'Дом Эдуарда','Tallinna korter':'Таллиннская квартира','Viimsi vannituba':'Ванная в Виймси'})[t] : null) || t; }

const PROJECTS = [
  {
    id: 'eduardi-maja',
    slug: 'eduardi-maja',
    t: 'Eduardi maja',
    cat: 'Eramaja',
    y: 2025,
    area: '286 m²',
    loc: 'Harjumaa',
    lede:
      'Eramu, kus varjuprofiil ei ole detail, vaid kogu ruumi rütm. AST50 joonistab perimeetri, AST30 hoiab uksesilluseid puhtana, AST22 tuleb mängu sealt, kus jälg peab olema peaaegu nähtamatu.',
    profiles: ['AST22', 'AST30', 'AST50'],
    cover: 'assets/projects/eduardi-maja/00-cover.png',
    coverAlt:
      'Eduardi maja magamistuba — AST50 LED varjuprofiili soe perimeeter lae ja seina üleminekul, sisseehitatud garderoob ja lapse maal molbertil',
    coverPosition: 'center center',
    gallery: [
      { src: 'assets/projects/eduardi-maja/02-koridor-led.jpg', alt: 'Eduardi maja siseaed — pahteldatud sein ja lae perimeetri LED varjuprofiil AST50 soojas 2700K toonis' },
      { src: 'assets/projects/eduardi-maja/03-led-perimeeter.jpg', alt: 'Eduardi maja koridor — AST50 LED perimeeter, mustad puidust ribikardinad ja tammparkett' },
      { src: 'assets/projects/eduardi-maja/04-peituks-vari.jpg', alt: 'AST22 peituksega koridor — ribikardinate vari mängib pahteldatud seinal, peen must joon kuvab ukse kontuuri' },
      { src: 'assets/projects/eduardi-maja/05-magamistuba.jpg', alt: 'Eduardi maja peamagamistuba — AST50 LED varjuprofiil lae perimeetril, sisseehitatud garderoob' },
      { src: 'assets/projects/eduardi-maja/06-peituks-skaala.jpg', alt: 'AST22 peituks — täismeeter Eduard ise näitab täispikkuses peitukse mõõtu pahteldatud seinas' },
      { src: 'assets/projects/eduardi-maja/07-kabinet.jpg', alt: 'Eduardi maja kabinet — AST50 LED soonprofiil aknapealse perimeetril, soe akcent töönurgale' },
      { src: 'assets/projects/eduardi-maja/08-peituks-nurk.jpg', alt: 'AST30 peituste nurkühendus — kaks peitust kohtuvad pahteldatud seinanurgas' },
      { src: 'assets/projects/eduardi-maja/09-peituks-maal.jpg', alt: 'AST22 peituks elutoa nurgas — Eduardi enda maal molbertil pahteldatud sooja seinatooni vastas' },
      { src: 'assets/projects/eduardi-maja/10-peituks-taim.jpg', alt: 'AST22 peen peituks koos taimega — peaaegu nähtamatu joon pahteldatud seinas, must lüliti ja link aktsentideks' },
      { src: 'assets/projects/eduardi-maja/11-terrass-led.jpg', alt: 'Eduardi maja terrass — välimine AST50 LED varjuprofiil suure akna kohal, oliivipuu esiplaanil' },
    ],
    span: 2,
    author: 'Sisearhitekt täpsustatakse',
    photo: 'Fotograaf täpsustatakse',
    install: 'Paigaldaja täpsustatakse',
    usage: {
      AST22: {
        role: 'Peen üleminek',
        m: '38 m',
        where: 'Magamistoa ja koridori uksesillused, garderoobi siseüleminekud',
        finish: 'Pulbervärv RAL 9005 (must matt)',
      },
      AST30: {
        role: 'Uksesillus + LED tasku',
        m: '52 m',
        where: 'Elutoa ja köögi vahelised siseuksed, sissepääsuesik',
        finish: 'Pulbervärv RAL 9005 (must matt)',
      },
      AST50: {
        role: 'Lae perimeeter, LED kontuur',
        m: '94 m',
        where: 'Elutuba, köök, peamine magamistuba — kogu lae perimeeter',
        finish: 'Pulbervärv RAL 9005 (must matt), LED 2700K',
      },
    },
    totalM: '184 jm',
    finish: 'RAL 9005 matt',
    story: {
      h: 'Üks maja, kolm SKU-d, üks pidev joon.',
      p: [
        'Tellija ei tahtnud lage, mis “teeb avalduse”. Pigem lahendust, mis hoiab kõik üleminekud kontrolli all — lae ja seina ühenduse, uksesillused, valgustuse ja garderoobide siseviimistluse. Lahenduseks valisime kolm sama perekonna profiili, mis töötavad koos ühe pideva mustana läbi maja.',
        '**AST50** jookseb kogu lae perimeetril ja peidab LED 2700K ribasid — tekitab pehme “hõljuva lae” efekti elutoas ja köögis. **AST30** on uksesilluste ja sissepääsuesiku tasku, kuhu paigutasime samuti LED, et õhtul töötaks koridor vaid varjujoonena. **AST22** tuleb sinna, kus jälg peab olema peaaegu nähtamatu — magamistoa siseuksed ja garderoobi laekontuur.',
        'Kõige keerukam osa oli kolme erineva sügavusega profiili kohtumiskoht ühes nurgas. Lahendasime selle ühe 1:1 mock-up’iga enne paigaldust. Tulemus — kogu kombinatsioon näeb välja nagu üks tervik, mitte kolm eraldi detaili.',
      ],
    },
    lessons: [
      { k: 'Mock-up enne paigaldust', v: 'Kolme erineva sügavusega profiili (AST22 · 22 mm, AST30 · 30 mm, AST50 · 50 mm) ühte nurka panemine ilma 1:1 prooviseina ehitamiseta on risk. Mock-up säästis paigaldusel terve päeva.' },
      { k: 'LED 2700K, mitte 3000K', v: 'Soojem valgus annab pahteldatud peitesiinist tagasipeegelduse, mis tundub objektiivselt soojem ja pehmem. 3000K oleks tundunud kontorlik.' },
      { k: 'RAL 9005 must matt, mitte anodeeritud', v: 'Anodeeritud pind tundus liiga tehniline. RAL 9005 pulber sulandub tamme ja klaasiga ilma külma metallise toonita.' },
      { k: 'AST22 sinna, kus profiil ei tohi domineerida', v: 'Magamistoa siseukse kohal töötab AST22 peaaegu nähtamatuna. Suurem profiil oleks rütmi murdnud.' },
    ],
    detail: [
      { src: 'assets/projects/eduardi-maja/04-peituks-vari.jpg', alt: 'AST22 peituks pahteldatud seinas — mustade ribikardinate vari joonistab triibumustri uksele' },
      { src: 'assets/projects/eduardi-maja/08-peituks-nurk.jpg', alt: 'AST30 peituste nurkühendus — kaks peitust kohtuvad pahteldatud seinanurgas mustade käepidemete ja lülititega' },
    ],
    heroSecondary: [
      { src: 'assets/projects/eduardi-maja/03-led-perimeeter.jpg', alt: 'Eduardi maja koridor — AST50 LED varjuprofiil pikal lae perimeetril, mustad ribikardinad' },
      { src: 'assets/projects/eduardi-maja/05-magamistuba.jpg', alt: 'Eduardi maja peamagamistuba — AST50 LED varjuprofiil lae perimeetril, sisseehitatud garderoob' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     Projekt #2 — Tallinna korter
     Klient planeeris ise, paigaldas omanik. Fotod meie tehtud.
     LED varjuprofiilid lae perimeetril + peegli taga,
     põrandaliist MPA015 kogu korteri ulatuses.
     ───────────────────────────────────────────────────────────── */
  {
    id: 'tallinna-korter',
    slug: 'tallinna-korter',
    t: 'Tallinna korter',
    cat: 'Korter',
    y: 2025,
    area: '64 m²',
    loc: 'Tallinn',
    lede:
      'Korter, mille klient planeeris ise ja paigaldas omanik. Pehme LED-perimeeter veab esikust kööki ja vannituppa, alumiinium põrandaliist MPA015 hoiab seina-põranda piiri puhtana läbi kogu korteri. Tõestus, et varjuprofiilide kompositsioon ei nõua sisearhitekti — õige SKU-valik teeb tulemuse tasemele.',
    profiles: ['AST22', 'AST30', 'AST50', 'MPA015'],
    cover: 'assets/projects/tallinna-korter/00-cover.png',
    coverAlt:
      'Tallinna korter — köök hõljuva AST50 LED varjuprofiili lae perimeetriga, tammeparkett, mattbeež köögimööbel ja kolm rippvalgustit söögilaua kohal',
    coverPosition: 'center center',
    gallery: [
      { src: 'assets/projects/tallinna-korter/02-kook-hoeljuv-lagi.jpg', alt: 'Tallinna korteri köök — hõljuv lagi AST50 LED varjuprofiili perimeetriga, tammepuidust tööpind ja kolm rippvalgustit' },
      { src: 'assets/projects/tallinna-korter/03-kook-frontaal.jpg', alt: 'Köök frontaalsest vaatest — AST50 LED varjuprofiil ümbritseb langetatud lae kassetti, mattbeež kapifront' },
      { src: 'assets/projects/tallinna-korter/04-koridor-uksed.jpg', alt: 'Tallinna korteri koridor — AST50 LED varjuprofiil seina ja lae üleminekul, tammparkett, kolm tammeust ja ovaalne LED-peegel' },
      { src: 'assets/projects/tallinna-korter/05-kook-perspektiiv.jpg', alt: 'Köögi pikiperspektiiv — AST50 LED perimeeter ja hõljuva lae kassett, mattbeež köögimööbel ja söögilaud' },
      { src: 'assets/projects/tallinna-korter/06-vannituba-peegel.jpg', alt: 'Vannituba hall marmorplaatidega — AST22 LED varjuprofiil peegli ümber ja lae perimeetril, valamu tammeukse vastas' },
      { src: 'assets/projects/tallinna-korter/07-porandaliist-detail.jpg', alt: 'MPA015 alumiinium põrandaliisti detail — sirge joon halli seina ja tammeparketi vahel, kollane taimekandja terrakottapotiga' },
      { src: 'assets/projects/tallinna-korter/08-mpa015-nurk.jpg', alt: 'MPA015 põrandaliisti nurgaviimistlus — alumiinium liist tammeparketi ja heleda seina kohtumiskohas' },
    ],
    span: 2,
    author: 'Klient ise (planeering)',
    photo: 'Varjuprofiilid.ee',
    install: 'Omanik ise',
    usage: {
      AST22: {
        role: 'Vannitoa peegli LED-raam',
        m: '12 m',
        where: 'Vannituba — peegli perimeeter, kus tagantvalgus loob hõljumise efekti vastu hallmarmorit',
        finish: 'Anodeeritud hõbe, LED 4000K (niiske ruumi IP44)',
      },
      AST30: {
        role: 'Vannitoa lae perimeeter',
        m: '8 m',
        where: 'Vannituba — lae ja marmorplaatide piiril, peidab plaatide ülemise serva',
        finish: 'Anodeeritud hõbe, LED 4000K',
      },
      AST50: {
        role: 'Lae perimeeter, hõljuv kassett',
        m: '46 m',
        where: 'Esik, köök, koridor — kogu lae perimeeter ja köögi kohal langetatud kassett',
        finish: 'Pulbervärv valge, LED 3000K',
      },
      MPA015: {
        role: 'Varjuvuugiga põrandaliist',
        m: '78 m',
        where: 'Kogu korter — esik, köök, koridor, söögituba, vannituba',
        finish: 'Anodeeritud alumiinium, mattvalge värv',
      },
    },
    totalM: '144 jm',
    finish: 'Sega: valge pulber + anodeering',
    story: {
      h: 'Korter, mis lahendab valguse ja jooned ilma sisearhitektita.',
      p: [
        'Klient tuli meile planeeringuga, mille oli ise paberil joonistanud — ta teadis täpselt, kus tahab pehmemat ambient-valgust ja kus selget joonduse jälge. Sisearhitekti ta ei kasutanud. Meie roll oli SKU-valik: milline profiil läheb millise mõõdu ja milleks.',
        '**AST50** lahendab elualade — esik, köök, koridor — lae perimeetri ja köögi kohal langetatud LED-kasseti. **AST30** ja **AST22** tulevad vannituppa: AST30 lae ja plaatide piirile, AST22 ümber suure peegli, kuhu paigutasime 4000K LED-i niiske ruumi jaoks. **MPA015** on alumiinium põrandaliist, mis jookseb läbi kogu korteri ja hoiab tammeparketi ning heledate seinte ühenduse ühe sirge joonega.',
        'Paigaldas omanik ise — see oli korralik test sellele, kui hästi MPA015 click-paigaldusprofiil ja AST-seeria pahteldussiinid päris elus töötavad. Tulemus: kõik mõõdud läksid esimest korda paika. Pilte tulime ise tegema, kui kõik valmis sai.',
      ],
    },
    lessons: [
      { k: 'Klient ise + paigaldaja-omanik = töötab', v: 'Õige SKU-juhise ja mõõdistustabeli korral ei vaja varjuprofiilide korter sisearhitekti. See projekt on esimene täielik “DIY-tasemel” näide — soovitame seda korterite omanikele referentsiks.' },
      { k: 'AST22 LED-peeglina vannitoas', v: 'AST22 22 mm sügavus on parasjagu nii palju, et peegli taga olev LED-riba ei paista, kuid annab piisava varju, et peegel “hõljuks” seina pinnal. 4000K toob hallmarmori soone välja.' },
      { k: 'AST50 valges, mitte mustas', v: 'Korter on heledate toonidega; klient otsustas teadlikult valge pulbervärvi kasuks. LED-soone vari teeb perimeetrist nähtava jaotuse, profiil ise jääb seina ja laega ühte tooni.' },
      { k: 'MPA015 niisketes ruumides', v: 'MPA015 on anodeeritud alumiinium — talub vannitoa niiskust ja koristusvahendeid ilma pinda kahjustamata. Sama liist kogu korteri ulatuses hoiab visuaalse järjepidevuse.' },
    ],
    detail: [
      { src: 'assets/projects/tallinna-korter/06-vannituba-peegel.jpg', alt: 'Vannituba — AST22 LED varjuprofiil ovaalse peegli raamis ja AST30 lae perimeetril hallide marmorplaatide kohal' },
      { src: 'assets/projects/tallinna-korter/08-mpa015-nurk.jpg', alt: 'MPA015 alumiinium põrandaliisti detail — sirge joon parketi ja seina kohtumiskohas tammepuidust uksepiida lähedal' },
    ],
    heroSecondary: [
      { src: 'assets/projects/tallinna-korter/02-kook-hoeljuv-lagi.jpg', alt: 'Tallinna korteri köök — AST50 LED varjuprofiili hõljuv lagi köögisaare kohal' },
      { src: 'assets/projects/tallinna-korter/04-koridor-uksed.jpg', alt: 'Tallinna korteri koridor — AST50 LED perimeeter ja ovaalne LED-peegel sissepääsu lähedal' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     Projekt #3 — Viimsi vannituba
     Klient planeeris ise, paigaldas omaniku valitud ehitusettevõte.
     ASPL130 põranda LED varjuprofiil + AST30 lae LED varjuprofiil
     loovad terve seinale kahepoolse valgusraami vabaltseisvale vannile.
     Fotod: meie.
     Interaktiivne valguslüliti — 3 stseeni: väljas / profiilid / kõik.
     ───────────────────────────────────────────────────────────── */
  {
    id: 'viimsi-vannituba',
    slug: 'viimsi-vannituba',
    t: 'Viimsi vannituba',
    cat: 'Eramaja',
    y: 2026,
    area: 'Vannituba',
    loc: 'Viimsi',
    lede:
      'Kitsas vannitoa nišš, vabaltseisev kivivann ja kaks LED varjuprofiili — ASPL130 põrandal, AST30 laeniši ülemise serva taga — joonistavad sambana vanni ümber pehme valguskoridori. Punktvalgusteid kasutatakse ainult siis, kui keegi ennast peseb. Muul ajal töötab ruum ainult kahe peidetud LED-joonega.',
    profiles: ['AST30', 'ASPL130'],
    cover: 'assets/projects/viimsi-vannituba/00-cover.png',
    coverAlt:
      'Viimsi vannituba — vabaltseisev valge kivivann hämaras niššis, mustad segistid beežidel kiviplaatidel ja AST30 LED varjuprofiili soe joon laeserval',
    coverPosition: 'center center',
    gallery: [
      { src: 'assets/projects/viimsi-vannituba/01-profiilitulled.jpg', alt: 'Viimsi vannituba ainult varjuprofiilide LED-iga — AST30 ülemine ja ASPL130 alumine valgusjoon raamivad vabaltseisva kivivanni' },
      { src: 'assets/projects/viimsi-vannituba/02-koik-tuled.jpg', alt: 'Viimsi vannituba kõik tuled sees — AST30 ja ASPL130 LED varjuprofiilid plus laes olevad mustad spott-valgustid' },
      { src: 'assets/projects/viimsi-vannituba/03-tuled-vaal.jpg', alt: 'Viimsi vannituba tuled väljas — vabaltseisev kivivann hämaras, mustad segistid ja beež kivisile, õhtuvalgus koridorist' },
    ],
    span: 2,
    author: 'Omanik ise (planeering)',
    photo: 'Varjuprofiilid.ee',
    install: 'Omaniku valitud ehitusettevõte',
    usage: {
      AST30: {
        role: 'Laeniši LED-joon',
        m: '4 m',
        where: 'Vanniniši ülemine serv, langetatud lae taga — peidab LED-i ja annab pehme valguse beežile kiviplaadile',
        finish: 'Pulbervärv RAL 9005 (must matt), LED 2700K',
      },
      ASPL130: {
        role: 'Põranda LED varjuprofiil',
        m: '4 m',
        where: 'Vannivanni jala all, plaatide ja seina kohtumiskohas — pehme valguskoridor mille peal vann näib hõljuvat',
        finish: 'Anodeeritud alumiinium, must, LED 2700K',
      },
    },
    totalM: '8 jm',
    finish: 'Must matt + anodeering',
    story: {
      h: 'Üks vann, kaks LED-joont, kolm valgusstsenaariumi.',
      p: [
        'Omanik planeeris ruumi ise. Niši mõõdud — vabaltseisva vanni laius pluss segistite ulatus — määrasid varjuprofiilide pikkuse täpselt. Meie roll oli soovitada, milline profiil sobib põrandale (niiske, koristusvahendid) ja milline lakke (peidetud, sügavam tasku LED-ribale).',
        '**AST30** läheb laenišši — see annab 30 mm sügavuse tasku, kuhu LED 2700K riba kaob täielikult kuid valgustab beeži kivisilet seinal. **ASPL130** on põrandaprofiil, anodeeritud alumiinium, niiskuskindel — mahub plaatide ja vanniraami vahele ja teeb maapinnale kerge halo, mis tekitab vannile hõljumise efekti.',
        'Paigaldas omaniku valitud ehitusettevõte. Õhtul, kui keegi vannis ei käi, töötab ruum ainult kahe LED-joonega — peseb kompaktselt teleruumide eelses koridoris õhtuvalgust. Spott-valgustid lülitatakse sisse ainult pesemise ajaks.',
      ],
    },
    lessons: [
      { k: 'Kaks profiili, kolm stsenaariumi', v: 'Ühe lüliti taga on kogu “ambient”-stseen (AST30 + ASPL130 koos), teise lüliti taga on punktvalgustid. Nii saab valida kas ainult atmosfäär, ainult ülevalgus või mõlemad. Kõige sagedamini kasutab omanik ainult profiilivalgust.' },
      { k: 'ASPL130 niiskes ruumis', v: 'ASPL130 on anodeeritud alumiinium — talub vannitoa niiskust, koristusvahendeid ja vahetut veepritsmete kontakti ilma korrosioonita. LED-riba peab olema IP65, et veepiisad ei jõuaks dioodideni.' },
      { k: 'AST30 lae- mitte seinatasku', v: 'AST30 alguses oleks võinud minna ka seinatasku, kuid laenišši paigutatuna saab valgus pehme tagasipeegelduse beežilt kiviplaadilt — ei tekita ebavajalikku heledat joont näkku, kui vannis lebada.' },
      { k: '2700K, mitte 3000K', v: 'Vannitoas, kus pind on soe beež kivi, töötab 2700K orgaaniliselt. 3000K oleks tundunud kontorlikum ja võtnuks ära ruumi õhtune sõbralikkus.' },
    ],
    detail: [
      { src: 'assets/projects/viimsi-vannituba/01-profiilitulled.jpg', alt: 'AST30 + ASPL130 koos töötamas — vannist saab valguskast' },
      { src: 'assets/projects/viimsi-vannituba/02-koik-tuled.jpg', alt: 'AST30 + ASPL130 + spott-valgustid — täielik pesustsenaarium' },
    ],
    heroSecondary: [
      { src: 'assets/projects/viimsi-vannituba/02-koik-tuled.jpg', alt: 'Viimsi vannituba kõik tuled sees — kahe LED varjuprofiili koridor ja laes olevad spotid' },
      { src: 'assets/projects/viimsi-vannituba/03-tuled-vaal.jpg', alt: 'Viimsi vannituba tuled väljas — hämar vann ainult koridori õhtuvalgusest' },
    ],
    // ⚡ Spetsiaalne väli — käivitab interaktiivse valguslüliti hero’s
    interactiveLighting: {
      scenes: [
        {
          key: 'off',
          label: 'Tuled väljas',
          desc: 'Õhtune koridor, vannituba puhkab',
          src: 'assets/projects/viimsi-vannituba/03-tuled-vaal.jpg',
          alt: 'Viimsi vannituba — kõik tuled väljas, vann hämaras ootab',
          glow: 'rgba(255, 200, 140, 0.0)',
        },
        {
          key: 'profiles',
          label: 'Ainult varjuprofiilid',
          desc: 'AST30 + ASPL130 töötavad — pehme ambient',
          src: 'assets/projects/viimsi-vannituba/01-profiilitulled.jpg',
          alt: 'Viimsi vannituba — ainult AST30 ja ASPL130 LED varjuprofiilid sees',
          glow: 'rgba(255, 200, 140, 0.45)',
        },
        {
          key: 'all',
          label: 'Kõik tuled',
          desc: 'Profiilid + spott-valgustid — pesustsenaarium',
          src: 'assets/projects/viimsi-vannituba/02-koik-tuled.jpg',
          alt: 'Viimsi vannituba — kõik tuled sees, AST30, ASPL130 ja spott-valgustid',
          glow: 'rgba(255, 215, 165, 0.7)',
        },
      ],
      default: 'profiles',
    },
  },
];

// ── väike helper: head'i meta + schema injekteerimine ──────────
function useDocumentSeo({ title, description, canonical, schemas = [], titleRu, descriptionRu }) {
  // Re-run when locale changes
  const [locale, setLocale] = React.useState(window.__locale || 'et');
  React.useEffect(() => {
    const h = (e) => setLocale(e.detail.locale);
    window.addEventListener('vp-locale-change', h);
    return () => window.removeEventListener('vp-locale-change', h);
  }, []);

  React.useEffect(() => {
    const useRu = locale === 'ru';
    const t = (useRu && titleRu) ? titleRu : title;
    const d = (useRu && descriptionRu) ? descriptionRu : description;
    if (t) document.title = t;
    document.documentElement.setAttribute('lang', useRu ? 'ru' : 'et');

    const setMeta = (sel, attr, value) => {
      let el = document.head.querySelector(sel);
      if (!el) {
        el = document.createElement('meta');
        const [k, v] = sel.replace(/[\[\]"]/g, '').split('=');
        el.setAttribute(k, v);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
      return el;
    };

    const created = [];
    if (d) {
      setMeta('meta[name="description"]', 'content', d);
      setMeta('meta[property="og:description"]', 'content', d);
      setMeta('meta[name="twitter:description"]', 'content', d);
    }
    if (t) {
      setMeta('meta[property="og:title"]', 'content', t);
      setMeta('meta[name="twitter:title"]', 'content', t);
    }
    if (canonical) {
      const useRu = locale === 'ru';
      const finalCanonical = useRu && canonical.startsWith('https://varjuprofiilid.ee/') && !canonical.includes('/ru/')
        ? canonical.replace('https://varjuprofiilid.ee/', 'https://varjuprofiilid.ee/ru/')
        : canonical;
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', finalCanonical);
      setMeta('meta[property="og:url"]', 'content', finalCanonical);
      setMeta('meta[property="og:locale"]', 'content', useRu ? 'ru_RU' : 'et_EE');
    }

    schemas.forEach((obj, i) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.seoInjected = 'project';
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
      created.push(s);
    });

    return () => {
      created.forEach((el) => el.remove());
    };
  }, [title, description, canonical, locale, titleRu, descriptionRu, JSON.stringify(schemas)]);
}

// ── helper: toote leidmine catalog-data'st SKU järgi ──────────
function lookupProduct(sku) {
  const list =
    (typeof window !== 'undefined' &&
      (window.__catalogProducts || window.CATALOG)) ||
    [];
  return list.find((p) => p.sku === sku) || null;
}

function InspirationPage({ setPage }) {
  useLocale(); // InspirationPage locale
  useDocumentSeo({
    title: 'Inspiratsioon — varjuprofiilid päris kodudes ja objektidel | Varjuprofiilid.ee',
    titleRu: 'Вдохновение — теневые профили в реальных домах и на объектах | Varjuprofiilid.ee',
    description:
      'Vaata, kuidas Eesti sisearhitektid ja paigaldajad on varjuprofiile kasutanud. Iga projekt – kasutatud tooted, mõõdud, viimistlus ja õppetunnid.',
    descriptionRu: 'Посмотрите, как эстонские дизайнеры интерьера и монтажники используют теневые профили. Каждый проект — использованные товары, размеры, отделка и уроки монтажа.',
    canonical: 'https://varjuprofiilid.ee/inspiratsioon/',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Inspiratsioon — projektid varjuprofiilidega',
        url: 'https://varjuprofiilid.ee/inspiratsioon/',
        inLanguage: 'et',
        isPartOf: { '@type': 'WebSite', name: 'Varjuprofiilid.ee', url: 'https://varjuprofiilid.ee' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Avaleht', item: 'https://varjuprofiilid.ee/' },
          { '@type': 'ListItem', position: 2, name: 'Inspiratsioon', item: 'https://varjuprofiilid.ee/inspiratsioon/' },
        ],
      },
    ],
  });

  const count = PROJECTS.length;

  return (
    <div className="vp-page">
      <Marquee />

      {/* breadcrumb */}
      <nav
        aria-label="Teekond"
        style={{
          padding: '18px 56px',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}
      >
        <a onClick={() => setPage('home')} style={{ cursor: 'pointer', color: 'var(--muted)' }}>
          {tr('Avaleht','Главная')}
        </a>
        <span style={{ margin: '0 10px', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>{tr('Inspiratsioon','Вдохновение')}</span>
      </nav>

      <section style={{ padding: '72px 56px 40px', borderBottom: '1.5px solid var(--ink)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
              {tr('Inspiratsioon','Вдохновение')} · {count} {count === 1 ? tr('projekt','проект') : tr('projekti','проектов')} · 2025–2026
            </div>
            <h1
              className="vp-display"
              style={{ fontSize: 'clamp(72px, 11vw, 168px)', margin: 0, lineHeight: 0.9 }}
            >
              {tr('Varjuprofiilid,','Теневые профили,')}
              <br />
              {tr('kasutuses','в работе')}{' '}
              <span
                style={{
                  fontFamily: "'Inter', serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: '0.5em',
                  letterSpacing: '-0.02em',
                }}
              >
                {tr('päris kodudes.','в реальных домах.')}
              </span>
            </h1>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 380 }}>
            {tr('Iga projekt: kasutatud profiilide nimekiri, mõõdud, viimistlus ja paigalduse õppetunnid. Vaata, kuidas konkreetne SKU ruumis välja näeb enne, kui see sinu projekti tellid.','Каждый проект: список профилей, размеры, отделка и уроки монтажа. Посмотрите, как конкретный SKU выглядит в помещении, прежде чем заказывать.')}
          </p>
        </div>
      </section>

      {/* tühi filter-riba — jätsin alles, et SEO ja UX struktuur püsiks */}
      <section
        style={{
          padding: '20px 56px',
          borderBottom: '1.5px solid var(--ink)',
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <span className="vp-chip vp-chip--active">{tr('Kõik','Все')} ({count})</span>
        <span className="vp-chip" style={{ opacity: 0.6 }}>{tr('Eramaja','Дом')} ({PROJECTS.filter(p=>p.cat==='Eramaja').length})</span>
        <span className="vp-chip" style={{ opacity: 0.6 }}>{tr('Korter','Квартира')} ({PROJECTS.filter(p=>p.cat==='Korter').length})</span>
        <span className="vp-chip" style={{ opacity: 0.5 }}>{tr('Büroo','Офис')} (0)</span>
        <span className="vp-chip" style={{ opacity: 0.5 }}>{tr('Avalik ruum','Общественное')} (0)</span>
        <span
          className="vp-mono"
          style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)' }}
        >
          {tr('Uued projektid lisanduvad','Скоро новые проекты')}
        </span>
      </section>

      {/* projektide grid */}
      <section
        style={{
          padding: '40px 56px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
          borderBottom: '1.5px solid var(--ink)',
        }}
      >
        {PROJECTS.map((p) => (
          <a
            key={p.id}
            onClick={() => setPage('project', { id: p.id })}
            aria-label={`${tr('Vaata projekti','Смотреть проект')}: ${_trProjT(p.t)}`}
            style={{
              cursor: 'pointer',
              gridColumn: p.span ? `span ${p.span}` : 'span 2',
              display: 'flex',
              flexDirection: 'column',
              border: '1.5px solid var(--ink)',
            }}
          >
            <div
              style={{
                aspectRatio: p.span ? '2/1' : '4/5',
                borderBottom: '1.5px solid var(--ink)',
                overflow: 'hidden',
                background: 'var(--paper-2)',
              }}
            >
              <img
                src={p.cover}
                alt={p.coverAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.coverPosition || 'center', display: 'block' }}
              />
            </div>
            <div
              style={{
                padding: '18px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 14,
              }}
            >
              <div>
                <div className="vp-eyebrow" style={{ marginBottom: 6 }}>
                  {_trCat(p.cat)} · {_trLoc(p.loc)} · {p.y}
                </div>
                <div className="vp-display" style={{ fontSize: 30, lineHeight: 1 }}>
                  {_trProjT(p.t)}
                </div>
                <div
                  className="vp-mono"
                  style={{ fontSize: 11, color: 'var(--muted)', marginTop: 10 }}
                >
                  {p.profiles.join(' · ')}
                </div>
              </div>
              <span
                className="vp-mono"
                style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}
              >
                {p.area}
              </span>
            </div>
          </a>
        ))}

        {/* placeholder ühele lisanduvale */}
        {[1].map((i) => (
          <div
            key={`placeholder-${i}`}
            style={{
              gridColumn: 'span 2',
              border: '1.5px dashed rgba(0,0,0,0.25)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 320,
              background: 'var(--paper-2)',
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                textAlign: 'center',
                padding: 24,
              }}
            >
              {tr('Projekt lisandub','Проект скоро')}
            </div>
            <div style={{ padding: '14px 16px', borderTop: '1px dashed rgba(0,0,0,0.2)' }}>
              <div
                className="vp-mono"
                style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}
              >
                #{String(i + 1).padStart(2, '0')} · {tr('Reserveeritud','Зарезервировано')}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA — sisearhitektidele */}
      <section
        style={{
          padding: '72px 56px',
          background: 'var(--paper-2)',
          borderBottom: '1.5px solid var(--ink)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
            {tr('Oled sisearhitekt või paigaldaja?','Вы дизайнер или монтажник?')}
          </div>
          <h2
            className="vp-display"
            style={{ fontSize: 72, margin: '0 0 18px', lineHeight: 0.95 }}
          >
            {tr('Saada oma','Пришлите свой')}
            <br />
            {tr('projekt meile.','проект нам.')}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 520 }}>
            {tr('Avaldame kvaliteetsed projektid — krediteerime sisearhitekti, fotograafi ja paigaldaja. Vastutasuks tagasilinke, sotsiaalmeedia kuvasid ja partneri staatuse.','Публикуем качественные проекты — указываем дизайнера, фотографа и монтажника. В обмен — обратные ссылки, показ в соцсетях и партнёрский статус.')}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button className="vp-btn vp-btn--lg" onClick={() => setPage('contact')}>
            {tr('Saada projekt →','Прислать проект →')}
          </button>
          <button className="vp-btn vp-btn--ghost vp-btn--lg" onClick={() => setPage('b2b')}>
            {tr('Liitu partneriks','Стать партнёром')}
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Interaktiivne valgusstseen — kasutaja saab lülitada tuled
   sisse/välja. Eeldab proj.interactiveLighting väljal stseene.
   ───────────────────────────────────────────────────────────── */
function LightSceneWidget({ scenes, defaultKey, profiles = [] }) {
  const [active, setActive] = React.useState(defaultKey || scenes[0].key);
  const [auto, setAuto] = React.useState(false);
  const idx = Math.max(0, scenes.findIndex((s) => s.key === active));

  // Auto-cycle through scenes when auto=true
  React.useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      setActive((cur) => {
        const i = scenes.findIndex((s) => s.key === cur);
        return scenes[(i + 1) % scenes.length].key;
      });
    }, 2200);
    return () => clearInterval(t);
  }, [auto, scenes]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.05fr 1fr',
        borderBottom: '1.5px solid var(--ink)',
        background: 'var(--ink)',
      }}
    >
      {/* Stseen — virnastatud fotokihtidega ristlangus */}
      <div
        style={{
          position: 'relative',
          background: '#0a0908',
          overflow: 'hidden',
          minHeight: 620,
          borderRight: '1.5px solid var(--ink)',
        }}
      >
        {scenes.map((s, i) => (
          <img
            key={s.key}
            src={s.src}
            alt={s.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 42%',
              opacity: s.key === active ? 1 : 0,
              transition: 'opacity 700ms cubic-bezier(.4,0,.2,1)',
              willChange: 'opacity',
            }}
          />
        ))}

        {/* Stseeni nimesilt vasakus üla — monospaceline kraadiklaas */}
        <div
          style={{
            position: 'absolute',
            top: 18,
            left: 18,
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            background: 'rgba(8,7,6,0.78)',
            border: '1px solid rgba(245,242,236,0.18)',
            padding: '8px 12px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(245,242,236,0.86)',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background:
                active === 'off' ? 'rgba(245,242,236,0.25)' : 'rgb(255,196,128)',
              boxShadow:
                active === 'off'
                  ? 'none'
                  : '0 0 8px rgba(255,196,128,0.9), 0 0 16px rgba(255,196,128,0.6)',
              transition: 'all 500ms',
            }}
          />
          {String(idx + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')} ·{' '}
          {scenes[idx].label}
        </div>

        {/* Profiilide märgendid — joonistame nooled konkreetsele kihile */}
        <ProfileBadges active={active} />
      </div>

      {/* Juhtpaneel — paremal */}
      <div
        style={{
          padding: '40px 40px 36px',
          background: 'var(--ink)',
          color: 'var(--paper)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div>
          <div
            className="vp-eyebrow"
            style={{ color: 'rgba(245,242,236,0.55)', marginBottom: 10 }}
          >
            Vali stseen · Interaktiivne
          </div>
          <h3
            className="vp-display"
            style={{ fontSize: 38, margin: 0, lineHeight: 1, color: 'var(--paper)' }}
          >
            Lülita tuled
            <br />
            <span
              style={{
                fontFamily: "'Inter', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '0.7em',
                color: 'rgba(245,242,236,0.75)',
              }}
            >
              sisse ja välja.
            </span>
          </h3>
          <p
            style={{
              marginTop: 14,
              fontSize: 14,
              lineHeight: 1.6,
              color: 'rgba(245,242,236,0.7)',
              maxWidth: 380,
            }}
          >
            Sama vannituba, sama kaader — kolm valguskonfiguratsiooni. Vaata, kuidas{' '}
            {profiles.join(' ja ')} muudavad ruumi tooni ilma ühegi täiendava valgustita.
          </p>
        </div>

        {/* Lülitite virn — vasakul tuluke, paremal nimi */}
        <div
          role="radiogroup"
          aria-label="Valguslülitid"
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(245,242,236,0.18)',
          }}
        >
          {scenes.map((s, i) => {
            const isOn = s.key === active;
            return (
              <button
                key={s.key}
                role="radio"
                aria-checked={isOn}
                onClick={() => {
                  setActive(s.key);
                  setAuto(false);
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '52px 1fr auto',
                  gap: 16,
                  alignItems: 'center',
                  padding: '18px 18px',
                  background: isOn ? 'rgba(255,196,128,0.08)' : 'transparent',
                  border: 'none',
                  borderTop: i > 0 ? '1px solid rgba(245,242,236,0.13)' : 'none',
                  color: 'var(--paper)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  transition: 'background 250ms',
                }}
                onMouseEnter={(e) =>
                  !isOn && (e.currentTarget.style.background = 'rgba(245,242,236,0.04)')
                }
                onMouseLeave={(e) =>
                  !isOn && (e.currentTarget.style.background = 'transparent')
                }
              >
                {/* Reaalse seina-lüliti meenutusena: klõpsuv toggle */}
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-flex',
                    width: 44,
                    height: 26,
                    borderRadius: 999,
                    background: isOn ? 'rgba(255,196,128,0.95)' : 'rgba(245,242,236,0.14)',
                    padding: 3,
                    boxShadow: isOn
                      ? '0 0 18px rgba(255,196,128,0.55), inset 0 0 0 1px rgba(255,196,128,1)'
                      : 'inset 0 0 0 1px rgba(245,242,236,0.18)',
                    transition: 'all 300ms cubic-bezier(.4,0,.2,1)',
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: isOn ? '#0a0908' : 'rgba(245,242,236,0.85)',
                      transform: isOn ? 'translateX(18px)' : 'translateX(0)',
                      transition: 'transform 280ms cubic-bezier(.4,0,.2,1)',
                    }}
                  />
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      letterSpacing: '-0.005em',
                      color: isOn ? 'var(--paper)' : 'rgba(245,242,236,0.85)',
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'rgba(245,242,236,0.55)',
                      marginTop: 3,
                      lineHeight: 1.4,
                    }}
                  >
                    {s.desc}
                  </div>
                </div>
                <span
                  className="vp-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    color: isOn ? 'rgb(255,196,128)' : 'rgba(245,242,236,0.35)',
                  }}
                >
                  {String(i).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 14,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setAuto((v) => !v)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(245,242,236,0.25)',
              color: 'var(--paper)',
              padding: '10px 16px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: auto ? 'rgb(255,196,128)' : 'rgba(245,242,236,0.4)',
                boxShadow: auto ? '0 0 8px rgba(255,196,128,0.8)' : 'none',
              }}
            />
            {auto ? 'Peata' : 'Mängi automaatselt'}
          </button>
          <span
            className="vp-mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.08em',
              color: 'rgba(245,242,236,0.45)',
            }}
          >
            Tühjenduspüsil 2,2 s
          </span>
        </div>
      </div>
    </div>
  );
}

// Profiili-märgendid — nooled, mis viitavad LED-joontele
function ProfileBadges({ active }) {
  // Näita ainult kui mõni profiili LED põleb
  const show = active !== 'off';
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: show ? 1 : 0,
        transition: 'opacity 600ms 200ms',
      }}
    >
      {/* AST30 — laeniši joon, märk paremale */}
      <div
        style={{
          position: 'absolute',
          left: '52%',
          top: '23%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: 'rgba(8,7,6,0.85)',
            border: '1px solid rgba(255,196,128,0.55)',
            color: 'rgb(255,215,170)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            letterSpacing: '0.08em',
            padding: '4px 8px',
          }}
        >
          AST30 · lagi
        </span>
        <span
          style={{
            width: 1,
            height: 22,
            background: 'linear-gradient(to bottom, rgba(255,196,128,0.8), transparent)',
          }}
        />
      </div>
      {/* ASPL130 — põranda joon, märk altpoolt */}
      <div
        style={{
          position: 'absolute',
          left: '52%',
          bottom: '24%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span
          style={{
            width: 1,
            height: 22,
            background: 'linear-gradient(to top, rgba(255,196,128,0.8), transparent)',
          }}
        />
        <span
          style={{
            display: 'inline-block',
            background: 'rgba(8,7,6,0.85)',
            border: '1px solid rgba(255,196,128,0.55)',
            color: 'rgb(255,215,170)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            letterSpacing: '0.08em',
            padding: '4px 8px',
          }}
        >
          ASPL130 · põrand
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Üksiku projekti vaade
   ───────────────────────────────────────────────────────────── */
function ProjectPage({ setPage, params = {} }) {
  useLocale(); // ProjectPage locale
  const proj = PROJECTS.find((p) => p.id === params.id) || PROJECTS[0];

  // Kasutatud tooted — võetud catalog-data'st (urlPath, seoName)
  const usedProducts = proj.profiles
    .map((sku) => {
      const p = lookupProduct(sku);
      return p
        ? {
            sku: p.sku,
            name: p.seoName ? `${p.sku} – ${p.seoName}` : p.sku,
            urlPath: p.urlPath,
            slug: p.slug,
          }
        : { sku, name: `${sku} – Lae LED varjuprofiil`, urlPath: `/led-varjuprofiilid/lae/${sku.toLowerCase()}/`, slug: sku.toLowerCase() };
    });

  // Rollipõhised mõõdud — projekti enda andmetest
  const productUsage = proj.usage || {};

  const objLabel = proj.cat.toLowerCase();
  const seoTitle = `${proj.t} — varjuprofiilid ${proj.profiles.join(', ')} ${objLabel}is | Varjuprofiilid.ee`;
  const seoDesc = `${proj.t} (${proj.area}, ${proj.loc}) — vaata, kuidas ${proj.profiles.join(', ')} varjuprofiilid ${objLabel}is kombineerituna lahenduvad. Mõõdud, viimistlus ja õppetunnid.`;
  const _ruT = _projField(proj, 't') || proj.t;
  const _ruLoc = (window.__locale === 'ru' ? ({Harjumaa:'Харьюмаа',Tallinn:'Таллинн',Viimsi:'Виймси'})[proj.loc] : null) || proj.loc;
  const seoTitleRu = `${_ruT} — теневые профили ${proj.profiles.join(', ')} | Varjuprofiilid.ee`;
  const seoDescRu = `${_ruT} (${proj.area}, ${_ruLoc}) — посмотрите, как ${proj.profiles.join(', ')} теневые профили работают в комбинации. Размеры, отделка и уроки.`;
  const canonical = `https://varjuprofiilid.ee/inspiratsioon/${proj.slug}/`;

  useDocumentSeo({
    title: seoTitle,
    titleRu: seoTitleRu,
    description: seoDesc,
    descriptionRu: seoDescRu,
    canonical,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${proj.t} — varjuprofiilid ${proj.profiles.join(', ')} ${objLabel}is`,
        description: seoDesc,
        author: { '@type': 'Organization', name: 'Varjuprofiilid.ee' },
        publisher: {
          '@type': 'Organization',
          name: 'Varjuprofiilid.ee',
          logo: {
            '@type': 'ImageObject',
            url: 'https://varjuprofiilid.ee/assets/prospace-must.svg',
          },
        },
        datePublished: '2026-05-28',
        dateModified: '2026-05-28',
        inLanguage: 'et',
        image: `https://varjuprofiilid.ee/${proj.cover}`,
        mainEntityOfPage: canonical,
        about: proj.profiles.map((sku) => ({
          '@type': 'Product',
          sku,
          name: `${sku} — Lae LED varjuprofiil`,
          url: `https://varjuprofiilid.ee${lookupProduct(sku)?.urlPath || `/led-varjuprofiilid/lae/${sku.toLowerCase()}/`}`,
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Avaleht', item: 'https://varjuprofiilid.ee/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Inspiratsioon',
            item: 'https://varjuprofiilid.ee/inspiratsioon/',
          },
          { '@type': 'ListItem', position: 3, name: proj.t, item: canonical },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Kasutatud tooted — ${proj.t}`,
        itemListElement: usedProducts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `https://varjuprofiilid.ee${p.urlPath}`,
          name: p.name,
        })),
      },
    ],
  });

  return (
    <div className="vp-page">
      <Marquee />

      {/* Breadcrumb */}
      <nav
        aria-label="Teekond"
        style={{
          padding: '18px 56px',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}
      >
        <a onClick={() => setPage('home')} style={{ cursor: 'pointer', color: 'var(--muted)' }}>
          {tr('Avaleht','Главная')}
        </a>
        <span style={{ margin: '0 10px', opacity: 0.5 }}>/</span>
        <a
          onClick={() => setPage('inspiration')}
          style={{ cursor: 'pointer', color: 'var(--muted)' }}
        >
          {tr('Inspiratsioon','Вдохновение')}
        </a>
        <span style={{ margin: '0 10px', opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--ink)' }}>{_trProjT(proj.t)}</span>
      </nav>

      {/* HERO header */}
      <section
        style={{
          padding: '56px 56px 40px',
          borderBottom: '1.5px solid var(--ink)',
        }}
      >
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
          {_trCat(proj.cat)} · {_trLoc(proj.loc)} · {proj.y} · {proj.area}
        </div>
        <h1
          className="vp-display"
          style={{ fontSize: 'clamp(64px, 9vw, 144px)', margin: 0, lineHeight: 0.9 }}
        >
          {_trProjT(proj.t)}
          <br />
          <span
            style={{
              fontFamily: "'Inter', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '0.42em',
              letterSpacing: '-0.02em',
              color: 'var(--ink-2)',
            }}
          >
            {tr('varjuprofiilid','теневые профили')} {proj.profiles.join(', ')} {tr('kombinatsioonis.','в комбинации.')}
          </span>
        </h1>
        <p
          style={{
            marginTop: 28,
            fontSize: 18,
            lineHeight: 1.6,
            color: 'var(--ink-2)',
            maxWidth: 780,
          }}
        >
          {_projField(proj, 'lede')}
        </p>

        <div
          style={{
            display: 'flex',
            gap: 32,
            marginTop: 36,
            flexWrap: 'wrap',
            fontSize: 14,
            color: 'var(--ink-2)',
          }}
        >
          <div>
            <span className="vp-eyebrow" style={{ display: 'block', marginBottom: 4 }}>
              {tr('Sisearhitekt','Дизайнер')}
            </span>
            {_projField(proj, 'author')}
          </div>
          <div>
            <span className="vp-eyebrow" style={{ display: 'block', marginBottom: 4 }}>
              {tr('Foto','Фото')}
            </span>
            {_projField(proj, 'photo')}
          </div>
          <div>
            <span className="vp-eyebrow" style={{ display: 'block', marginBottom: 4 }}>
              {tr('Paigaldus','Монтаж')}
            </span>
            {_projField(proj, 'install')}
          </div>
          <div>
            <span className="vp-eyebrow" style={{ display: 'block', marginBottom: 4 }}>
              {tr('Profiilid','Профили')}
            </span>
            {proj.profiles.join(' · ')}
          </div>
        </div>
      </section>

      {/* Hero — kui projektil on interaktiivne valgusstseen, asenda mosaiik widgetiga */}
      {proj.interactiveLighting ? (
        <LightSceneWidget
          scenes={proj.interactiveLighting.scenes}
          defaultKey={proj.interactiveLighting.default}
          profiles={proj.profiles}
        />
      ) : (
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
          gap: 0,
          borderBottom: '1.5px solid var(--ink)',
          aspectRatio: '21/11',
          background: 'var(--paper-2)',
        }}
      >
        <figure
          style={{
            gridRow: 'span 2',
            margin: 0,
            overflow: 'hidden',
            borderRight: '1.5px solid var(--ink)',
            position: 'relative',
          }}
        >
          <img
            src={proj.cover}
            alt={_projField(proj, 'coverAlt')}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: proj.coverPosition || 'center', display: 'block' }}
          />
        </figure>
        <figure style={{ margin: 0, overflow: 'hidden', borderBottom: '1.5px solid var(--ink)' }}>
          <img
            src={proj.heroSecondary?.[0]?.src || proj.gallery[0]?.src}
            alt={proj.heroSecondary?.[0]?.alt || proj.gallery[0]?.alt || proj.coverAlt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
        </figure>
        <figure style={{ margin: 0, overflow: 'hidden' }}>
          <img
            src={proj.heroSecondary?.[1]?.src || proj.gallery[1]?.src}
            alt={proj.heroSecondary?.[1]?.alt || proj.gallery[1]?.alt || proj.coverAlt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
        </figure>
      </section>
      )}

      {/* Lugu + kasutatud tooted */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          borderBottom: '1.5px solid var(--ink)',
        }}
      >
        <article style={{ padding: '56px 48px', borderRight: '1.5px solid var(--ink)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
            {tr('Lugu','История')}
          </div>
          <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 22px', lineHeight: 1 }}>
            {_projStoryH(proj) || tr('Üks projekt, mitu SKU-d, üks pidev joon.','Один проект, несколько SKU, одна непрерывная линия.')}
          </h2>
          {(_projStoryP(proj)).map((paragraph, idx) => (
            <p
              key={idx}
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: 'var(--ink-2)',
                marginBottom: idx === (_projStoryP(proj).length - 1) ? 0 : 18,
              }}
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          ))}

          {/* Kasutuste matriks */}
          <div
            style={{
              marginTop: 32,
              border: '1.5px solid var(--ink)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                padding: '12px 18px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {tr('Kuidas profiile kasutati','Как использовались профили')}
            </div>
            {proj.profiles.map((sku, i) => {
              const u = _projUsage(proj, sku);
              return (
                <div
                  key={sku}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '90px 1fr auto',
                    gap: 16,
                    padding: '16px 18px',
                    borderTop: i > 0 ? '1px solid rgba(0,0,0,0.12)' : 'none',
                    alignItems: 'baseline',
                  }}
                >
                  <div
                    className="vp-mono"
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {sku}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{u.role}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                      {u.where}
                    </div>
                    <div
                      className="vp-mono"
                      style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}
                    >
                      {u.finish}
                    </div>
                  </div>
                  <div
                    className="vp-mono"
                    style={{ fontSize: 13, whiteSpace: 'nowrap', color: 'var(--ink)' }}
                  >
                    {u.m}
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        {/* Sidebar: kasutatud tooted (lingid) */}
        <aside style={{ padding: '48px 40px', background: 'var(--paper-2)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
            {tr('Kasutatud tooted','Использованные товары')}
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: 'var(--ink-2)',
              margin: '0 0 22px',
            }}
          >
            {tr('Kolm sama perekonna LED-varjuprofiili lae-paigalduseks. Klõpsa, et avada toote leht hinnaga, RAL värvivalikuga ja paigaldusjuhendiga.','Три LED-профиля одной серии для потолочного монтажа. Нажмите, чтобы открыть страницу товара с ценой, палитрой RAL и инструкцией по монтажу.')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {usedProducts.map((p) => (
              <a
                key={p.sku}
                onClick={() => setPage('product', { slug: p.slug })}
aria-label={`${tr('Ava toode','Открыть товар')}: ${p.name}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '56px 1fr auto',
                  gap: 16,
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(0,0,0,0.15)',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <div
                  className="vp-photo"
                  style={{ aspectRatio: '1', border: '1.5px solid var(--ink)' }}
                >
                  <span className="label" style={{ fontSize: 8, padding: '2px 5px' }}>
                    {p.sku.toLowerCase()}
                  </span>
                </div>
                <div>
                  <div
                    className="vp-mono"
                    style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}
                  >
                    {p.sku}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>
                    {tr('Lae LED varjuprofiil','Потолочный LED-профиль')}
                  </div>
                </div>
                <span style={{ fontSize: 18 }}>→</span>
              </a>
            ))}
          </div>

          <button
            className="vp-btn vp-btn--block"
            style={{ marginTop: 24 }}
            onClick={() => setPage('catalog')}
          >
            {tr('Vaata kõiki varjuprofiile →','Смотреть все профили →')}
          </button>

          <div
            style={{
              marginTop: 24,
              padding: '16px 18px',
              border: '1px dashed rgba(0,0,0,0.25)',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--ink-2)',
            }}
          >
            <div
              className="vp-mono"
              style={{
                fontSize: 10,
                letterSpacing: '0.08em',
                color: 'var(--muted)',
                marginBottom: 6,
              }}
            >
              {tr('Vajad sarnast lahendust?','Нужно похожее решение?')}
            </div>
            {tr('Tasuta projektikonsultatsioon meie salongis — Tehnika 14, Tallinn. Toome näidised lauale ja arvutame mõõdud koos sinuga.','Бесплатная проектная консультация в нашем салоне — Tehnika 14, Tallinn. Принесём образцы и рассчитаем размеры вместе с вами.')}
          </div>
        </aside>
      </section>

      {/* Detailid */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1.5px solid var(--ink)',
        }}
      >
        <figure
          style={{
            margin: 0,
            borderRight: '1.5px solid var(--ink)',
            aspectRatio: '4/5',
            overflow: 'hidden',
            background: 'var(--paper-2)',
          }}
        >
          <img
            src={proj.detail?.[0]?.src}
            alt={proj.detail?.[0]?.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
        </figure>
        <figure
          style={{
            margin: 0,
            aspectRatio: '4/5',
            overflow: 'hidden',
            background: 'var(--paper-2)',
          }}
        >
          <img
            src={proj.detail?.[1]?.src}
            alt={proj.detail?.[1]?.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
        </figure>
      </section>

      {/* Õppetunnid */}
      <section
        style={{
          padding: '64px 56px',
          borderBottom: '1.5px solid var(--ink)',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: 56,
        }}
      >
        <div>
          <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
            {tr('Õppetunnid','Уроки')}
          </div>
          <h2 className="vp-display" style={{ fontSize: 56, margin: 0, lineHeight: 0.95 }}>
            {tr('Mis töötas, mida tasub teisiti teha.','Что сработало, что стоит сделать иначе.')}
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            fontSize: 15,
            lineHeight: 1.6,
            color: 'var(--ink-2)',
          }}
        >
          {(_projLessons(proj)).map((it, i) => (
            <div key={i}>
              <div
                className="vp-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  marginBottom: 8,
                  paddingBottom: 6,
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
              >
                {String(i + 1).padStart(2, '0')} · {it.k}
              </div>
              {it.v}
            </div>
          ))}
        </div>
      </section>

      {/* Spetsifikatsioon ülevaade */}
      <section
        style={{
          padding: '48px 56px',
          borderBottom: '1.5px solid var(--ink)',
          background: 'var(--paper-2)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 32,
        }}
      >
        {[
          [tr('Asukoht','Место'), _trLoc(proj.loc)],
          [tr('Pind','Площадь'), proj.area],
          [tr('Profiile kokku','Профилей всего'), _projField(proj, 'totalM') || '—'],
          [tr('Viimistlus','Отделка'), _projField(proj, 'finish') || '—'],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="vp-eyebrow" style={{ marginBottom: 8 }}>
              {k}
            </div>
            <div className="vp-display" style={{ fontSize: 40, lineHeight: 1 }}>
              {v}
            </div>
          </div>
        ))}
      </section>

      {/* Galerii — kóik fotod portree-formaadis */}
      <section style={{ padding: '64px 56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 28,
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div>
            <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
              {tr('Galerii','Галерея')}
            </div>
            <h2 className="vp-display" style={{ fontSize: 56, margin: 0, lineHeight: 0.95 }}>
              {proj.gallery.length} {tr('kaadrit majast.','кадров из дома.')}
            </h2>
          </div>
          <p
            className="vp-mono"
            style={{ fontSize: 11, color: 'var(--muted)', maxWidth: 320, lineHeight: 1.5 }}
          >
            {tr('Fotod tehtud objektil paigalduse lõpus. Profiilid:','Фото сделаны на объекте после монтажа. Профили:')} {proj.profiles.join(' · ')}, {tr('viimistlus','отделка')} {_projField(proj, 'finish') || '—'}.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
          }}
        >
          {proj.gallery.map((g, i) => (
            <figure
              key={g.src}
              style={{
                margin: 0,
                aspectRatio: '3/4',
                overflow: 'hidden',
                border: '1.5px solid var(--ink)',
                background: 'var(--paper-2)',
                position: 'relative',
              }}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <figcaption
                className="vp-mono"
                style={{
                  position: 'absolute',
                  left: 8,
                  bottom: 8,
                  fontSize: 9,
                  padding: '4px 7px',
                  background: 'rgba(10,10,10,0.78)',
                  color: 'var(--paper)',
                  letterSpacing: '0.06em',
                }}
              >
                {String(i + 1).padStart(2, '0')} / {String(proj.gallery.length).padStart(2, '0')}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '64px 56px',
          background: 'var(--ink)',
          color: 'var(--paper)',
          borderBottom: '1.5px solid var(--ink)',
        }}
      >
        <div className="vp-eyebrow" style={{ marginBottom: 12, color: 'rgba(245,242,236,0.6)' }}>
          {tr('Tellija plaanib sarnast','Заказчик планирует похожее')}
        </div>
        <h2
          className="vp-display"
          style={{ fontSize: 64, margin: '0 0 18px', lineHeight: 0.95, color: 'var(--paper)' }}
        >
          {tr('Tee oma varjuprofiilide plaan koos meiega.','Спроектируйте теневые профили вместе с нами.')}
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: 'rgba(245,242,236,0.78)',
            maxWidth: 620,
            margin: '0 0 28px',
          }}
        >
          {tr('Saada projektijoonised või planeering meile — vastame 1 tööpäeva jooksul mõõdistuse, SKU-soovituste ja eelarvega.','Пришлите чертежи или планировку — ответим в течение 1 рабочего дня размерами, рекомендациями по SKU и сметой.')}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            className="vp-btn vp-btn--lg"
            style={{ background: 'var(--paper)', color: 'var(--ink)' }}
            onClick={() => setPage('contact')}
          >
            {tr('Küsi nõu →','Спросить совета →')}
          </button>
          <button
            className="vp-btn vp-btn--ghost vp-btn--lg"
            style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}
            onClick={() => setPage('catalog')}
          >
            {tr('Vaata kõiki tooteid','Смотреть все товары')}
          </button>
        </div>
      </section>

      {/* Järgmised projektid */}
      <section style={{ padding: '64px 56px', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 14 }}>
          {tr('Veel inspiratsiooni','Ещё вдохновения')}
        </div>
        <h2 className="vp-display" style={{ fontSize: 48, margin: '0 0 24px' }}>
          {tr('Järgmised projektid lisanduvad peagi.','Следующие проекты появятся скоро.')}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
          }}
        >
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                border: '1.5px dashed rgba(0,0,0,0.25)',
                background: 'var(--paper-2)',
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                {tr('Reserveeritud','Зарезервировано')}
              </div>
            </div>
          ))}
          <a
            onClick={() => setPage('inspiration')}
            style={{
              border: '1.5px solid var(--ink)',
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              minHeight: 280,
            }}
          >
            <div className="vp-eyebrow">{tr('Kõik projektid','Все проекты')}</div>
            <div>
              <div
                className="vp-display"
                style={{ fontSize: 36, lineHeight: 1, marginBottom: 8 }}
              >
                {tr('Tagasi inspiratsiooni','К вдохновению')}
              </div>
              <span
                className="vp-mono"
                style={{ fontSize: 12, color: 'var(--muted)' }}
              >
                {tr('Vaata kõiki →','Смотреть все →')}
              </span>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}

window.InspirationPage = InspirationPage;
window.ProjectPage = ProjectPage;
