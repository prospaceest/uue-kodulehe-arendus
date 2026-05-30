import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

type GalleryItem = { src: string; alt: string };
type UsageItem = { role: string; roleRu: string; m: string; where: string; whereRu: string; finish: string };
type LessonItem = { k: string; kRu: string; v: string; vRu: string };

type Project = {
  titleEt: string; titleRu: string;
  labelEt: string; labelRu: string;
  cover: string;
  profiles: string;
  meters: string;
  bodyEt: string; bodyRu: string;
  gallery: GalleryItem[];
  usage: Record<string, UsageItem>;
  lessons: LessonItem[];
};

const PROJECTS: Record<string, Project> = {
  'eduardi-maja': {
    titleEt: 'Üks maja, kolm SKU-d, üks pidev joon',
    titleRu: 'Один дом, три SKU, одна непрерывная линия',
    labelEt: 'Eramaja · Harjumaa · 2025',
    labelRu: 'Частный дом · Харьюмаа · 2025',
    cover: '/assets/projects/eduardi-maja/00-home-cover.png',
    profiles: 'AST22 · AST30 · AST50',
    meters: '184 jm',
    bodyEt: `Tellija ei tahtnud lage, mis "teeb avalduse". Pigem lahendust, mis hoiab kõik üleminekud kontrolli all — lae ja seina ühenduse, uksesillused, valgustuse ja garderoobide siseviimistluse. Lahenduseks valisime kolm sama perekonna profiili, mis töötavad koos ühe pideva mustana läbi maja.

AST50 jookseb kogu lae perimeetril ja peidab LED 2700K ribasid — tekitab pehme hõljuva lae efekti elutoas ja köögis. AST30 on uksesilluste ja sissepääsuesiku tasku, kuhu paigutasime samuti LED, et õhtul töötaks koridor vaid varjujoonena. AST22 tuleb sinna, kus jälg peab olema peaaegu nähtamatu — magamistoa siseuksed ja garderoobi laekontuur.

Kõige keerukam osa oli kolme erineva sügavusega profiili kohtumiskoht ühes nurgas. Lahendasime selle ühe 1:1 mock-up'iga enne paigaldust. Tulemus — kogu kombinatsioon näeb välja nagu üks tervik, mitte kolm eraldi detaili.`,
    bodyRu: `Заказчик не хотел потолка, который «делает заявление». Скорее — решение, которое держит под контролем все переходы: стык потолка и стены, оконные откосы, освещение и отделку гардероба изнутри. В качестве решения выбрали три профиля одного семейства, которые работают вместе как единая чёрная нить через весь дом.

AST50 идёт по всему периметру потолка и скрывает LED 2700K — создаёт мягкий эффект парящего потолка в гостиной и кухне. AST30 — карман для откосов дверей и прихожей, куда тоже установили LED, чтобы вечером коридор работал только как теневая линия. AST22 — там, где след должен быть практически невидимым: внутренние двери спальни и контур потолка гардероба.

Самым сложным оказалась точка встречи трёх профилей разной глубины в одном углу. Решили через макет 1:1 перед монтажом. Результат — вся комбинация выглядит как единое целое, а не три отдельные детали.`,
    gallery: [
      { src: '/assets/projects/eduardi-maja/01-elutuba-hero.jpg', alt: 'Eduardi maja elutuba — AST50 LED varjuprofiil lae perimeetril' },
      { src: '/assets/projects/eduardi-maja/02-koridor-led.jpg', alt: 'Eduardi maja koridor — AST50 LED perimeeter soojas 2700K toonis' },
      { src: '/assets/projects/eduardi-maja/03-led-perimeeter.jpg', alt: 'AST50 LED perimeeter, mustad puidust ribikardinad ja tammparkett' },
      { src: '/assets/projects/eduardi-maja/04-peituks-vari.jpg', alt: 'AST22 peituksega koridor — ribikardinate vari mängib pahteldatud seinal' },
      { src: '/assets/projects/eduardi-maja/05-magamistuba.jpg', alt: 'Eduardi maja peamagamistuba — AST50 LED varjuprofiil lae perimeetril' },
      { src: '/assets/projects/eduardi-maja/06-peituks-skaala.jpg', alt: 'AST22 peituks täispikkuses' },
      { src: '/assets/projects/eduardi-maja/07-kabinet.jpg', alt: 'Kabinet — AST50 LED soonprofiil aknapealse perimeetril' },
      { src: '/assets/projects/eduardi-maja/08-peituks-nurk.jpg', alt: 'AST30 peituste nurkühendus' },
      { src: '/assets/projects/eduardi-maja/09-peituks-maal.jpg', alt: 'AST22 peituks elutoa nurgas' },
      { src: '/assets/projects/eduardi-maja/10-peituks-taim.jpg', alt: 'AST22 peen peituks koos taimega' },
      { src: '/assets/projects/eduardi-maja/11-terrass-led.jpg', alt: 'Terrass — välimine AST50 LED varjuprofiil suure akna kohal' },
    ],
    usage: {
      AST22: {
        role: 'Peen üleminek', roleRu: 'Тонкий переход',
        m: '38 m',
        where: 'Magamistoa ja koridori uksesillused, garderoobi siseüleminekud',
        whereRu: 'Откосы дверей спальни и коридора, внутренние переходы гардероба',
        finish: 'RAL 9005 must matt',
      },
      AST30: {
        role: 'Uksesillus + LED tasku', roleRu: 'Дверной откос + LED-карман',
        m: '52 m',
        where: 'Elutoa ja köögi vahelised siseuksed, sissepääsuesik',
        whereRu: 'Внутренние двери между гостиной и кухней, прихожая',
        finish: 'RAL 9005 must matt',
      },
      AST50: {
        role: 'Lae perimeeter, LED kontuur', roleRu: 'Периметр потолка, LED-контур',
        m: '94 m',
        where: 'Elutuba, köök, peamine magamistuba — kogu lae perimeeter',
        whereRu: 'Гостиная, кухня, главная спальня — весь периметр потолка',
        finish: 'RAL 9005 must matt, LED 2700K',
      },
    },
    lessons: [
      {
        k: 'Mock-up enne paigaldust', kRu: 'Макет перед монтажом',
        v: 'Kolme erineva sügavusega profiili ühte nurka panemine ilma 1:1 prooviseina ehitamiseta on risk. Mock-up säästis paigaldusel terve päeva.',
        vRu: 'Собирать три профиля разной глубины в одном углу без пробного макета 1:1 — риск. Макет сэкономил целый день монтажа.',
      },
      {
        k: 'LED 2700K, mitte 3000K', kRu: 'LED 2700K, не 3000K',
        v: 'Soojem valgus annab pahteldatud peitesiinist tagasipeegelduse, mis tundub objektiivselt soojem ja pehmem. 3000K oleks tundunud kontorlik.',
        vRu: 'Более тёплый свет даёт отражение от штукатурки, которое воспринимается заметно теплее и мягче. 3000K казался бы офисным.',
      },
      {
        k: 'RAL 9005 must matt, mitte anodeeritud', kRu: 'RAL 9005 матовый чёрный, не анодированный',
        v: 'Anodeeritud pind tundus liiga tehniline. RAL 9005 pulber sulandub tamme ja klaasiga ilma külma metallise toonita.',
        vRu: 'Анодированная поверхность казалась слишком технической. RAL 9005 порошок вписывается в дуб и стекло без холодного металлического оттенка.',
      },
      {
        k: 'AST22 sinna, kus profiil ei tohi domineerida', kRu: 'AST22 туда, где профиль не должен доминировать',
        v: 'Magamistoa siseukse kohal töötab AST22 peaaegu nähtamatuna. Suurem profiil oleks rütmi murdnud.',
        vRu: 'Над внутренней дверью спальни AST22 работает почти незаметно. Более крупный профиль нарушил бы ритм.',
      },
    ],
  },

  'tallinna-korter': {
    titleEt: 'Valgus ja jooned ilma sisearhitektita',
    titleRu: 'Свет и линии без дизайнера интерьера',
    labelEt: 'Korter · Tallinn · 2025',
    labelRu: 'Квартира · Таллинн · 2025',
    cover: '/assets/projects/tallinna-korter/00-home-cover.png',
    profiles: 'AST22 · AST30 · AST50 · MPA015',
    meters: '144 jm',
    bodyEt: `Klient tuli meile planeeringuga, mille oli ise paberil joonistanud — ta teadis täpselt, kus tahab pehmemat ambient-valgust ja kus selget joonduse jälge. Sisearhitekti ta ei kasutanud. Meie roll oli SKU-valik: milline profiil läheb millise mõõdu ja milleks.

AST50 lahendab elualade — esik, köök, koridor — lae perimeetri ja köögi kohal langetatud LED-kasseti. AST30 ja AST22 tulevad vannituppa: AST30 lae ja plaatide piirile, AST22 ümber suure peegli, kuhu paigutasime 4000K LED-i niiske ruumi jaoks. MPA015 on alumiinium põrandaliist, mis jookseb läbi kogu korteri ja hoiab tammeparketi ning heledate seinte ühenduse ühe sirge joonega.

Paigaldas omanik ise — see oli korralik test sellele, kui hästi MPA015 click-paigaldusprofiil ja AST-seeria pahteldussiinid päris elus töötavad. Tulemus: kõik mõõdud läksid esimest korda paika. Pilte tulime ise tegema, kui kõik valmis sai.`,
    bodyRu: `Клиент пришёл с планировкой, нарисованной от руки на бумаге — он точно знал, где хочет мягкий ambient-свет, а где чёткий след линии. Дизайнера он не использовал. Наша роль — выбор SKU: какой профиль идёт какого размера и для чего.

AST50 решает периметр потолка в прихожей, кухне и коридоре, а также опускной LED-кассет над кухней. AST30 и AST22 идут в ванную: AST30 на границу потолка и плитки, AST22 вокруг большого зеркала, куда установили LED 4000K для влажного помещения. MPA015 — алюминиевый плинтус, который тянется через всю квартиру и держит соединение паркета со светлыми стенами единой прямой линией.

Монтировал сам хозяин — это был полноценный тест того, насколько хорошо click-профиль MPA015 и штукатурные каналы серии AST работают в реальных условиях. Результат: все размеры встали с первого раза. Мы приехали фотографировать, когда всё было готово.`,
    gallery: [
      { src: '/assets/projects/tallinna-korter/01-esik-hero.jpg', alt: 'Tallinna korteri esik — AST50 LED varjuprofiil lae perimeetril' },
      { src: '/assets/projects/tallinna-korter/02-kook-hoeljuv-lagi.jpg', alt: 'Köök — hõljuv lagi AST50 LED varjuprofiili perimeetriga' },
      { src: '/assets/projects/tallinna-korter/03-kook-frontaal.jpg', alt: 'Köök frontaalsest vaatest — AST50 LED varjuprofiil ümbritseb langetatud lae kassetti' },
      { src: '/assets/projects/tallinna-korter/04-koridor-uksed.jpg', alt: 'Koridor — AST50 LED varjuprofiil seina ja lae üleminekul' },
      { src: '/assets/projects/tallinna-korter/05-kook-perspektiiv.jpg', alt: 'Köögi pikiperspektiiv — AST50 LED perimeeter ja hõljuva lae kassett' },
      { src: '/assets/projects/tallinna-korter/06-vannituba-peegel.jpg', alt: 'Vannituba — AST22 LED varjuprofiil peegli ümber ja AST30 lae perimeetril' },
      { src: '/assets/projects/tallinna-korter/07-porandaliist-detail.jpg', alt: 'MPA015 alumiinium põrandaliisti detail' },
      { src: '/assets/projects/tallinna-korter/08-mpa015-nurk.jpg', alt: 'MPA015 põrandaliisti nurgaviimistlus' },
    ],
    usage: {
      AST22: {
        role: 'Vannitoa peegli LED-raam', roleRu: 'LED-рамка зеркала в ванной',
        m: '12 m',
        where: 'Vannituba — peegli perimeeter, tagantvalgus loob hõljumise efekti vastu hallmarmorit',
        whereRu: 'Ванная — периметр зеркала, задний свет создаёт эффект парения на фоне серого мрамора',
        finish: 'Anodeeritud hõbe, LED 4000K (IP44)',
      },
      AST30: {
        role: 'Vannitoa lae perimeeter', roleRu: 'Периметр потолка в ванной',
        m: '8 m',
        where: 'Vannituba — lae ja marmorplaatide piiril, peidab plaatide ülemise serva',
        whereRu: 'Ванная — на границе потолка и мраморной плитки, скрывает верхний край плитки',
        finish: 'Anodeeritud hõbe, LED 4000K',
      },
      AST50: {
        role: 'Lae perimeeter, hõljuv kassett', roleRu: 'Периметр потолка, подвесной кассет',
        m: '46 m',
        where: 'Esik, köök, koridor — kogu lae perimeeter ja köögi kohal langetatud kassett',
        whereRu: 'Прихожая, кухня, коридор — весь периметр потолка и опускной кассет над кухней',
        finish: 'Pulbervärv valge, LED 3000K',
      },
      MPA015: {
        role: 'Varjuvuugiga põrandaliist', roleRu: 'Плинтус с теневым швом',
        m: '78 m',
        where: 'Kogu korter — esik, köök, koridor, söögituba, vannituba',
        whereRu: 'Вся квартира — прихожая, кухня, коридор, столовая, ванная',
        finish: 'Anodeeritud alumiinium, mattvalge',
      },
    },
    lessons: [
      {
        k: 'Klient ise + paigaldaja-omanik = töötab', kRu: 'Клиент сам + монтаж хозяином = работает',
        v: 'Õige SKU-juhise ja mõõdistustabeli korral ei vaja varjuprofiilide korter sisearhitekti. Esimene täielik DIY-tasemel näide.',
        vRu: 'При правильных рекомендациях по SKU и таблице измерений квартира с теневыми профилями не требует дизайнера. Первый полный DIY-пример.',
      },
      {
        k: 'AST22 LED-peeglina vannitoas', kRu: 'AST22 как LED-зеркало в ванной',
        v: '22 mm sügavus on parasjagu nii palju, et peegli taga olev LED-riba ei paista, kuid annab piisava varju, et peegel "hõljuks". 4000K toob hallmarmori soone välja.',
        vRu: 'Глубина 22 мм — ровно столько, чтобы LED за зеркалом не было видно, но тени хватало, чтобы зеркало «парило». 4000K выявляет прожилки серого мрамора.',
      },
      {
        k: 'AST50 valges, mitte mustas', kRu: 'AST50 белый, не чёрный',
        v: 'Korter on heledate toonidega; klient otsustas teadlikult valge pulbervärvi kasuks. LED-soone vari teeb perimeetrist nähtava jaotuse, profiil ise jääb seina ja laega ühte tooni.',
        vRu: 'Квартира в светлых тонах; клиент сознательно выбрал белый порошок. Тень LED-канала делает периметр видимым, сам профиль сливается со стеной и потолком.',
      },
      {
        k: 'MPA015 niisketes ruumides', kRu: 'MPA015 в влажных помещениях',
        v: 'MPA015 on anodeeritud alumiinium — talub vannitoa niiskust ja koristusvahendeid ilma pinda kahjustamata. Sama liist kogu korteri ulatuses hoiab visuaalse järjepidevuse.',
        vRu: 'MPA015 — анодированный алюминий. Выдерживает влажность ванной и чистящие средства без повреждения поверхности. Один плинтус по всей квартире сохраняет визуальную целостность.',
      },
    ],
  },

  'viimsi-vannituba': {
    titleEt: 'Üks vann, kaks LED-joont, kolm stseeni',
    titleRu: 'Одна ванна, две LED-линии, три сцены',
    labelEt: 'Eramaja · Viimsi · 2026',
    labelRu: 'Частный дом · Виймси · 2026',
    cover: '/assets/projects/viimsi-vannituba/00-home-cover.png',
    profiles: 'AST30 · ASPL130',
    meters: '8 jm',
    bodyEt: `Omanik planeeris ruumi ise. Niši mõõdud — vabaltseisva vanni laius pluss segistite ulatus — määrasid varjuprofiilide pikkuse täpselt. Meie roll oli soovitada, milline profiil sobib põrandale (niiske, koristusvahendid) ja milline lakke (peidetud, sügavam tasku LED-ribale).

AST30 läheb laenišši — see annab 30 mm sügavuse tasku, kuhu LED 2700K riba kaob täielikult kuid valgustab beeži kivisilet seinal. ASPL130 on põrandaprofiil, anodeeritud alumiinium, niiskuskindel — mahub plaatide ja vanniraami vahele ja teeb maapinnale kerge halo, mis tekitab vannile hõljumise efekti.

Paigaldas omaniku valitud ehitusettevõte. Õhtul, kui keegi vannis ei käi, töötab ruum ainult kahe LED-joonega. Spott-valgustid lülitatakse sisse ainult pesemise ajaks. Omanik kasutab kõiki kolme stsenaariumi.`,
    bodyRu: `Хозяин планировал помещение самостоятельно. Размеры ниши — ширина отдельностоящей ванны плюс вылет смесителей — задали длину профилей точно. Наша роль — рекомендовать, какой профиль подходит для пола (влага, чистящие средства), а какой — для потолка (скрытый, более глубокий карман для LED-ленты).

AST30 идёт в потолочную нишу — даёт карман глубиной 30 мм, куда LED 2700K полностью прячется, но подсвечивает бежевую каменную плитку на стене. ASPL130 — напольный профиль, анодированный алюминий, влагостойкий: помещается между плиткой и рамой ванны и создаёт у основания лёгкое свечение, от которого ванна кажется парящей.

Монтировала строительная компания по выбору хозяина. Вечером, когда ванной не пользуются, помещение работает только с двумя LED-линиями. Точечные светильники включают только во время купания. Хозяин использует все три сценария.`,
    gallery: [
      { src: '/assets/projects/viimsi-vannituba/01-profiilitulled.jpg', alt: 'Ainult varjuprofiilide LED — AST30 ülemine ja ASPL130 alumine valgusjoon raamivad vabaltseisva vanni' },
      { src: '/assets/projects/viimsi-vannituba/02-koik-tuled.jpg', alt: 'Kõik tuled sees — AST30 ja ASPL130 LED varjuprofiilid plus spott-valgustid' },
      { src: '/assets/projects/viimsi-vannituba/03-tuled-vaal.jpg', alt: 'Tuled väljas — vabaltseisev vann hämaras' },
    ],
    usage: {
      AST30: {
        role: 'Laeniši LED-joon', roleRu: 'LED-линия в потолочной нише',
        m: '4 m',
        where: 'Vanniniši ülemine serv, langetatud lae taga — peidab LED ja annab pehme valguse kiviplaadile',
        whereRu: 'Верхний край ниши над ванной, за опускным потолком — скрывает LED и даёт мягкий свет на каменную плитку',
        finish: 'RAL 9005 must matt, LED 2700K',
      },
      ASPL130: {
        role: 'Põranda LED varjuprofiil', roleRu: 'Напольный LED-профиль',
        m: '4 m',
        where: 'Vannivanni jala all — pehme valguskoridor, mille peal vann näib hõljuvat',
        whereRu: 'Под опорой отдельностоящей ванны — мягкий световой коридор, от которого ванна кажется парящей',
        finish: 'Anodeeritud alumiinium, must, LED 2700K (IP65)',
      },
    },
    lessons: [
      {
        k: 'Kaks profiili, kolm stsenaariumi', kRu: 'Два профиля, три сценария',
        v: 'AST30 + ASPL130 koos = ambient-stseen; punktvalgustid eraldi. Omanik kasutab kõige sagedamini ainult profiilivalgust.',
        vRu: 'AST30 + ASPL130 вместе = ambient-сцена; точечные светильники отдельно. Хозяин чаще всего использует только свет профилей.',
      },
      {
        k: 'ASPL130 niiskes ruumis', kRu: 'ASPL130 в влажном помещении',
        v: 'ASPL130 anodeeritud alumiinium talub vannitoa niiskust ja veepritsmeid. LED-riba peab olema IP65.',
        vRu: 'Анодированный алюминий ASPL130 выдерживает влажность ванной и брызги. LED-лента должна быть IP65.',
      },
      {
        k: 'AST30 laeniššis, mitte seinataškus', kRu: 'AST30 в потолочной нише, не в стеновом кармане',
        v: 'Laenišši paigutatuna saab valgus pehme tagasipeegelduse kiviplaadilt — ei tekita ebavajalikku heledat joont näkku, kui vannis lebada.',
        vRu: 'В потолочной нише свет получает мягкое отражение от каменной плитки — не создаёт лишней яркой полосы в лицо, когда лежишь в ванне.',
      },
      {
        k: '2700K, mitte 3000K', kRu: '2700K, не 3000K',
        v: 'Sooja beeži kivipinnaga vannitoas töötab 2700K orgaaniliselt. 3000K oleks tundunud kontorlikum.',
        vRu: 'В ванной с тёплой бежевой каменной поверхностью 2700K работает органично. 3000K казался бы офисным.',
      },
    ],
  },

  'narva-büroo': {
    titleEt: 'Avatud kontor — üks pikk joon laest põrandani',
    titleRu: 'Открытый офис — одна длинная линия от потолка до пола',
    labelEt: 'Büroo · Narva · 2025',
    labelRu: 'Офис · Нарва · 2025',
    cover: '/assets/projects/projekt01.webp',
    profiles: 'AST22 · ASP102',
    meters: '320 jm',
    bodyEt: `Avatud planeeringuga kontor Narva tööstusalal vajas ühtset visuaalset rütmi kogu korrusel. Ärikorterites on lae ja seina ühenduse probleem erinev võrreldes koduga — siin on tähtis, et lahendus töötaks nii koosolekuruumides, avatud alal kui käikudes ühe pideva joonena.

AST22 laeprofiil jookseb kogu avaruumi perimeetril ning moodustab ühtse varjujoone, mis ei domineeri, kuid hoiab lae ja seina puhtalt lahus. ASP102 põrandaprofiil asendas kogu korrusel traditsioonilised põrandaliistud — madal, diskreeт ja ühildub nii plaatide kui parketiga.

320 jooksvat meetrit alumiiniumi, üks nädalavahetus paigaldust, nullkompromiss kvaliteedi osas.`,
    bodyRu: `Офис с открытой планировкой в промышленном районе Нарвы требовал единого визуального ритма по всему этажу. В коммерческих пространствах проблема соединения потолка и стены отличается от жилой: здесь важно, чтобы решение работало как единая линия — в переговорных, на открытой территории и в коридорах.

Потолочный профиль AST22 идёт по всему периметру пространства и формирует единую теневую линию, которая не доминирует, но чётко разделяет потолок и стену. Напольный профиль ASP102 заменил по всему этажу традиционные плинтусы — низкий, дискретный, совместимый как с плиткой, так и с паркетом.

320 погонных метров алюминия, один монтажный уикэнд, нулевых компромиссов по качеству.`,
    gallery: [],
    usage: {
      AST22: {
        role: 'Lae perimeeter', roleRu: 'Периметр потолка',
        m: '210 m',
        where: 'Avatud ala, koosolekuruumid, käigud — kogu korruse laeperimeeter',
        whereRu: 'Открытая зона, переговорные, коридоры — периметр потолка всего этажа',
        finish: 'Anodeeritud hõbe',
      },
      ASP102: {
        role: 'Põranda LED varjuprofiil', roleRu: 'Напольный LED-профиль',
        m: '110 m',
        where: 'Kogu korrus — asendab traditsioonilise põrandaliistu',
        whereRu: 'Весь этаж — замена традиционного плинтуса',
        finish: 'Anodeeritud hõbe, ilma LED-ta',
      },
    },
    lessons: [
      {
        k: 'Äripind = lühem paigaldusaken', kRu: 'Коммерческое пространство = более короткое окно монтажа',
        v: '320 jm paigaldati ühe nädalavahetuse jooksul, et kontor saaks esmaspäeval avada. Planeering ja mõõdistus peavad olema täpsed.',
        vRu: '320 пм смонтированы за один уикэнд, чтобы офис открылся в понедельник. Планирование и замеры должны быть точными.',
      },
      {
        k: 'Ühtne SKU-valik vähendab visuaalset müra', kRu: 'Единый выбор SKU снижает визуальный шум',
        v: 'Kahe SKU kasutamine (AST22 + ASP102) kogu korruse ulatuses loob sidususe, mida paljude erinevate profiilidega ei saavutaks.',
        vRu: 'Использование двух SKU (AST22 + ASP102) по всему этажу создаёт целостность, которой не достичь с множеством разных профилей.',
      },
    ],
  },

  'parnu-hotell': {
    titleEt: '42 tuba, üks süsteem, null kompromissi',
    titleRu: '42 номера, одна система, ноль компромиссов',
    labelEt: 'Hotell · Pärnu · 2025',
    labelRu: 'Гостиница · Пярну · 2025',
    cover: '/assets/projects/projekt02.webp',
    profiles: 'LHV10 · ASPL35',
    meters: '860 jm',
    bodyEt: `Pärnu hotell otsis lahendust, mis töötaks kõigis 42 toas ühtse visuaalse keelena, oleks kergesti paigaldatav ja ei nõuaks igas toas individuaalset kohandamist. Standardiseeritud süsteem hotellides on erinev väljakutse — ebakorrapärasus ruumide vahel tuleb varjata, hooldusele peab pääsema ligi ja LED-ühilduvus on kohustuslik.

LHV10 pahteldatav laeprofiil on valitud täpselt sellise kasutuse jaoks — see sulub kipsplaadi alla ilma nähtava saumata ja annab iga toa lakke pehme LED-perimeetri, mis töötab nii üldvalguse kui ka atmosfäärivalgusena. ASPL35 põrandaprofiil asendab tavalise hotelliliistuga tihtipeale kaasneva kulunud nurga probleemi.

860 jooksvat meetrit, 42 tuba, üks visuaalne rütm.`,
    bodyRu: `Гостиница в Пярну искала решение, которое работало бы во всех 42 номерах как единый визуальный язык, легко монтировалось и не требовало индивидуальной подгонки в каждом номере. Стандартизированная система в отелях — это особый вызов: неравномерность между помещениями нужно скрыть, обеспечить доступ для обслуживания, и совместимость с LED обязательна.

Штукатурный потолочный профиль LHV10 выбран именно для такого применения — он монтируется под гипсокартон без видимого стыка и даёт каждому номеру мягкий LED-периметр, работающий и как общее освещение, и как атмосферное. Напольный профиль ASPL35 устраняет проблему истёртых углов, типичных для обычных гостиничных плинтусов.

860 погонных метров, 42 номера, один визуальный ритм.`,
    gallery: [],
    usage: {
      LHV10: {
        role: 'Pahteldatav laeprofiil', roleRu: 'Штукатурный потолочный профиль',
        m: '580 m',
        where: 'Kõik 42 tuba — lae ja seina üleminek, LED 2700K perimeetrivalgustus',
        whereRu: 'Все 42 номера — переход потолка и стены, LED 2700K периметральное освещение',
        finish: 'Pahteldatav, LED 2700K',
      },
      ASPL35: {
        role: 'Põranda varjuprofiil', roleRu: 'Напольный теневой профиль',
        m: '280 m',
        where: 'Kõik 42 tuba — asendab tavalise põrandaliistu',
        whereRu: 'Все 42 номера — замена обычного плинтуса',
        finish: 'Valge pulbervärv',
      },
    },
    lessons: [
      {
        k: 'Standardiseerimine = vähem vigu', kRu: 'Стандартизация = меньше ошибок',
        v: 'Ühe SKU-paari kasutamine kõigis tubades tähendab, et varuosade logistika on lihtne ja igal paigaldajal on sama rutiin.',
        vRu: 'Использование одной пары SKU во всех номерах упрощает логистику запасных частей и даёт каждому монтажнику одну и ту же рутину.',
      },
      {
        k: 'LHV10 — hotelli standard', kRu: 'LHV10 — гостиничный стандарт',
        v: 'LHV10 pahteldatav pind sulandub seinaga täielikult ja peidab kõik ebakorrapärasused kipsplaadi töötlemisel.',
        vRu: 'Штукатурная поверхность LHV10 полностью сливается со стеной и скрывает все неровности при обработке гипсокартона.',
      },
    ],
  },
};

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS[slug];
  if (!p) return {};
  return { title: `${p.titleEt} | Inspiratsioon | Varjuprofiilid.ee` };
}

export async function generateStaticParams() {
  return Object.keys(PROJECTS).flatMap((slug) => [
    { locale: 'et', slug },
    { locale: 'ru', slug },
  ]);
}

export default async function InspirationProjectPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const ru = locale === 'ru';
  const p = PROJECTS[slug];
  if (!p) notFound();

  const pfx = ru ? '/ru' : '';
  const title = ru ? p.titleRu : p.titleEt;
  const label = ru ? p.labelRu : p.labelEt;
  const body = (ru ? p.bodyRu : p.bodyEt).split('\n\n');

  return (
    <div>
      {/* Breadcrumb + title */}
      <section style={{ padding: '48px 56px 24px', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ marginBottom: 10 }}>
          <Link href={pfx || '/'}>{ru ? 'Главная' : 'Avaleht'}</Link>
          {' / '}
          <Link href={`${pfx}/inspiratsioon`}>{ru ? 'Вдохновение' : 'Inspiratsioon'}</Link>
          {' / '}
          <span style={{ color: 'var(--ink)' }}>{label}</span>
        </div>
        <h1 className="vp-display" style={{ fontSize: 'clamp(48px, 7vw, 100px)', margin: 0, lineHeight: 0.92, maxWidth: '18ch' }}>
          &ldquo;{title}.&rdquo;
        </h1>
        <div className="vp-mono" style={{ fontSize: 12, marginTop: 16, color: 'var(--muted)', display: 'flex', gap: 24 }}>
          <span>{label}</span>
          <span>{p.profiles}</span>
          <span>{p.meters}</span>
        </div>
      </section>

      {/* Hero cover */}
      <div style={{ aspectRatio: '16/7', borderBottom: 'var(--border)', overflow: 'hidden', background: 'var(--paper-2)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.cover} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* Body + sidebar */}
      <section style={{ padding: '56px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 56, borderBottom: 'var(--border)', alignItems: 'start' }}>
        <article>
          {body.map((para, i) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 24 }}>{para}</p>
          ))}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: 'var(--border)', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href={`${pfx}/tooted`} className="vp-btn vp-btn--lg">{ru ? 'Открыть каталог →' : 'Vaata kataloogi →'}</Link>
            <Link href={`${pfx}/inspiratsioon`} className="vp-btn vp-btn--ghost">{ru ? '← Все проекты' : '← Kõik projektid'}</Link>
          </div>
        </article>

        {/* Profiles used sidebar */}
        <aside>
          <div className="vp-eyebrow" style={{ marginBottom: 14 }}>{ru ? 'Использованные профили' : 'Kasutatud profiilid'}</div>
          {Object.entries(p.usage).map(([sku, u]) => (
            <div key={sku} style={{ padding: '14px 0', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              <div className="vp-mono" style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{sku}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', marginBottom: 2 }}>{ru ? u.roleRu : u.role}</div>
              <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{u.m} · {u.finish}</div>
            </div>
          ))}
          <div style={{ marginTop: 24 }}>
            <div className="vp-eyebrow" style={{ marginBottom: 8 }}>{ru ? 'Всего' : 'Kokku'}</div>
            <div className="vp-display" style={{ fontSize: 48 }}>{p.meters}</div>
          </div>
        </aside>
      </section>

      {/* Gallery */}
      {p.gallery.length > 0 && (
        <section style={{ padding: '56px', borderBottom: 'var(--border)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 24 }}>{ru ? 'Фотографии проекта' : 'Projektifotod'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {p.gallery.map((img, i) => (
              <div key={i} style={{ aspectRatio: i === 0 ? '16/9' : '4/3', overflow: 'hidden', border: 'var(--border)', background: 'var(--paper-2)', gridColumn: i === 0 ? '1 / -1' : undefined, gridRow: i === 0 ? undefined : undefined }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Usage breakdown */}
      {Object.keys(p.usage).length > 0 && (
        <section style={{ padding: '56px', borderBottom: 'var(--border)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 24 }}>{ru ? 'Применение профилей' : 'Profiilide kasutus'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--ink)', border: 'var(--border)' }}>
            {Object.entries(p.usage).map(([sku, u]) => (
              <div key={sku} style={{ background: 'var(--paper)', padding: '32px 28px' }}>
                <div className="vp-mono" style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{sku}</div>
                <div className="vp-display" style={{ fontSize: 28, marginBottom: 8 }}>{ru ? u.roleRu : u.role}</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 8 }}>{ru ? u.whereRu : u.where}</div>
                <div className="vp-mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{u.m} · {u.finish}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lessons learned */}
      {p.lessons.length > 0 && (
        <section style={{ padding: '56px', borderBottom: 'var(--border)' }}>
          <div className="vp-eyebrow" style={{ marginBottom: 24 }}>{ru ? 'Что узнали' : 'Mida õppisime'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--ink)', border: 'var(--border)' }}>
            {p.lessons.map((l, i) => (
              <div key={i} style={{ background: 'var(--paper)', padding: '32px 28px' }}>
                <div className="vp-display" style={{ fontSize: 28, marginBottom: 10 }}>{ru ? l.kRu : l.k}</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{ru ? l.vRu : l.v}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '80px 56px', textAlign: 'center', background: 'var(--ink)', color: 'var(--paper)', borderBottom: 'var(--border)' }}>
        <div className="vp-eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>{ru ? 'Хотите похожий результат?' : 'Soovid sarnast tulemust?'}</div>
        <h2 className="vp-display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', margin: '0 0 32px', color: 'var(--paper)', lineHeight: 0.92 }}>
          {ru ? 'Nõustame tasuta.' : 'Nõustame tasuta.'}
        </h2>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={`${pfx}/tooted`} className="vp-btn vp-btn--lg" style={{ background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)' }}>
            {ru ? 'Смотреть каталог →' : 'Vaata kataloogi →'}
          </Link>
          <Link href={`${pfx}/kontakt`} className="vp-btn vp-btn--ghost vp-btn--lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'var(--paper)' }}>
            {ru ? 'Связаться →' : 'Võta ühendust →'}
          </Link>
        </div>
      </section>
    </div>
  );
}
