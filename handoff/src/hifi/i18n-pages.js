// ============================================================
// i18n-pages — page-level long-form copy (ET canonical + RU draft)
// ============================================================
//
// This is a SIDECAR file alongside i18n-strings.js — it contains
// longer page-level paragraphs that don't fit a flat key:string dict.
//
// USAGE:
//   const c = window.__i18nPages[window.__locale];
//   c.home.hero.headline → "Profiilid, mis kaovad seinte sisse." (ET) or RU equivalent
//
// RU content is AI DRAFT — see handoff/BRAND_VOICE_RU.md for translator rules.
// To actually render RU on pages, the JSX files need to read from this object
// based on locale. That's a Claude Code task during Next.js migration.

window.__i18nPages = {

  // ===========================================================
  // ESTONIAN — canonical
  // ===========================================================
  et: {
    home: {
      hero: {
        headline: "Profiilid, mis kaovad seinte sisse.",
        sub: "Eesti alumiinium varjuprofiilide pood. LED-iga ja dekoratiivsed mudelid laele, seinale, põrandale. RAL-värvitud, saadaval otse laost.",
      },
      configurator: {
        headline: "Konfiguraator",
        desc: "Sisesta vajalik meetrite kogus ja vali profiili tüüp — arvutame välja vajaliku tükkide arvu.",
      },
      partners: {
        headline: "Usaldatud eesti arhitektide ja ehitajate poolt",
        sub: "Üle 200 projekti, üle 40 partneri. Iga päev tarnime profiile uutele tellimustele üle Eesti.",
      },
      blog: {
        title: "Juhendid & inspiratsioon",
        sub: "Kuidas valida õige profiil, kuidas paigaldada, millise LED-iga töötab. Praktilised juhendid arhitektidele, ehitajatele ja sisekujundajatele.",
      },
    },
    about: {
      title: "Toodetest",
      intro: "Alumiinium varjuprofiilid on meie peamine valdkond. Üle 10 aasta toodame ja müüme kvaliteetseid profiile, mis sobivad nii LED-valgustusega kui ilma. Allpool tutvustame, kuidas valida õige profiil ja kuidas neid kasutatakse.",
      whyAluminium: {
        title: "Miks alumiinium",
        body: "Alumiinium ei imenda niiskust, ei pundu, ei muuda värvi ajaga. Eluiga aastakümneid. Pulbervärv UV-kindel — RAL-toon säilib 15+ aastat. Kõik meie profiilid valmistatud sulamist 6063-T5 — sama, mida kasutatakse arhitektuurses ehituses.",
      },
      ralTitle: "Iga RAL toon. Sinu interjöör.",
      ralSub: "Pulbervärvimine vastavalt RAL toonidele — profiilid sobituvad ideaalselt interjööri üldise stiili ja värvilahendusega.",
      installation: {
        title: "Lihtne. Täpne.",
        sub: "Profiilide geomeetria võimaldab saavutada täpse lõpptulemuse — sirge joon, peidetud ebatäpsused, sobib kõikide põrandakatetega.",
      },
      testimonial: {
        quote: "Varjuprofiilid on saanud meie projektide standardlahenduseks. Klientide tagasiside on alati positiivne — ruum tundub valmis viisil, mida puidust liist ei suuda anda.",
        author: "Liisa M.",
        role: "Sisekujundaja, Tallinn",
      },
    },
    faq: {
      title: "Korduma kippuvad küsimused",
      sub: "Vastused tellimuse, paigalduse, RAL-värvide ja garantii kohta.",
      groups: [
        {
          title: "Tellimus ja tarne",
          items: [
            { q: "Kui kiiresti tarnitakse?", a: "Laos olev kaup tarnitakse 1–3 tööpäeva jooksul üle Eesti. RAL-eritellimus 4–5 nädalat. Tarne on tasuta üle 200 € tellimustele." },
            { q: "Kuhu tarnitakse?", a: "Üle kogu Eesti pakiautomaatidesse ja kullerina. Suuremad tellimused (üle 2,5 m profiilid) toimetatakse otse kohale." },
            { q: "Kas saab ka tulla salongi?", a: "Jah. Tehnika 14, Tallinn — E–R 10–17, L kokkuleppel. Tasuta projektikonsultatsioon näidistega." },
          ],
        },
        {
          title: "RAL värvid ja eritellimused",
          items: [
            { q: "Mis RAL-toonid on saadaval?", a: "Pulbervärvimine vastavalt RAL-paletti — saame teha mistahes RAL-tooni (~5 nädalat). Standardlaos: töötlemata, valge (RAL 9016), must (RAL 9005)." },
            { q: "Kas RAL-tellimust saab tagastada?", a: "RAL-eritellimusi ei tagastata, kuna värvitakse spetsiaalselt teie tellimuse jaoks. Standardlao tooteid saab tagastada 14 päeva jooksul." },
            { q: "Kas värv tundub ekraanil sama mis tegelikkuses?", a: "Pole täpne. Värv kuvatakse ekraanil ligikaudselt — kalibreerimise tõttu võib erineda. Soovitame tulla salongi näidiseid vaatama enne RAL-tellimust." },
          ],
        },
        {
          title: "Paigaldus",
          items: [
            { q: "Kas paigaldus on keeruline?", a: "Pahteldatav (peidetud) versioon nõuab pahteldaja kogemust ja paigaldatakse enne kipsplaadi viimistlust. Pinnale paigaldatava versiooni saab kogenud DIY-tegija ise paigaldada lasertasandiga." },
            { q: "Kuhu LED-riba läheb?", a: "Igale LED-profiilile sobib spetsiaalne LED-riba: lae jaoks 12 W/m, 234 LED/m, 3000K, 24V; põranda/seina jaoks COB 16 W/m, 1350 lm/m, CRI 94, 24V. LED-riba ja hajuti tellitakse eraldi." },
            { q: "Kas teil on paigaldusmeestele soovitusi?", a: "Jah. Meie salongis on nimekiri kogenud paigaldajatest, kellega oleme aastatega koostööd teinud. Helista või tule kohale." },
          ],
        },
        {
          title: "Garantii ja hooldus",
          items: [
            { q: "Kui pikk on garantii?", a: "5 aastat tootegarantii — pulbervärvile, alumiiniumkonstruktsioonile. LED-ribadele eraldi 2-aastane tootjagarantii." },
            { q: "Kas profiili tuleb hooldada?", a: "Ei. Pulbervärvitud alumiinium on hooldusvaba. Vajadusel pühkida niiske lapiga, agressiivseid pesuvahendeid mitte kasutada." },
          ],
        },
      ],
    },
    contact: {
      title: "Salong · Tallinn",
      sub: "Tule näidiseid vaatama. Tehnika 14, E–R 10–17.",
      sales: "Müük ja projektikonsultatsioon",
      tech: "Tehniline tugi paigaldajatele",
    },
    salon: {
      title: "Tule salongi näidiseid vaatama",
      body: "Profiilinäidised, RAL värvikaardid, LED-valgustuse demosüsteemid. Tasuta projektikonsultatsioon — vastame küsimustele, anname soovitusi, näitame lahendusi sinu ruumi jaoks.",
      hours: "E–R 10:00–17:00",
      address: "Tehnika 14, Tallinn",
    },
    b2b: {
      title: "B2B partneritele",
      intro: "Arhitektidele, sisekujundajatele, ehitajatele. Allahindlused, makseterminid, isiklik nõustamine.",
      benefits: [
        { title: "Partnerihinnad", body: "Kuni 25% allahindlus standardhindadest, sõltuvalt aastasest tellimusmahust." },
        { title: "Makseterminid", body: "30–60 päeva maksetähtaeg, sõltuvalt koostöö pikkusest." },
        { title: "Isiklik haldur", body: "Üks kontakt kogu projekti jaoks — kiired vastused, prioriteetne tarne." },
        { title: "Projektihinnad", body: "Suurte tellimuste jaoks (üle 500 m) eraldi projektihind." },
      ],
    },
    legal: {
      impressum: {
        title: "Impressum",
        body: "PROSPACE OÜ\nReg.nr 16821459\nKMKR EE102661499\nVana-Kalamaja 8–110, 10412 Tallinn\nE-mail: info@prospace.ee\nTel: +372 56 989 780",
      },
      privacy: {
        title: "Privaatsus",
        intro: "Kogume isikuandmeid (nimi, e-mail, telefon, aadress) tellimuste täitmiseks ja klienditeeninduseks. Andmeid ei jaga kolmandate osapooltega välja arvatud kullertarne (Itella, Omniva, DPD).",
      },
      cookies: {
        title: "Küpsised",
        intro: "Kasutame küpsiseid saidi funktsionaalsuse tagamiseks (ostukorv, keelevalik) ja anonüümseks analüütikaks (Plausible Analytics, ilma isikutuvastamiseta). Reklaami- või jälgimisküpsiseid ei kasuta.",
      },
      terms: {
        title: "Müügitingimused",
        intro: "Tellimuse esitamisega kinnitate tutvunud olemise müügitingimustega. RAL-eritellimusi ei tagastata. Standardlaotooteid saab tagastada 14 päeva jooksul algses pakendis.",
      },
    },
    inspiration: {
      title: "Inspiratsioon",
      sub: "Päris projektid, päris kliendid, päris tooted. Vaata kuidas varjuprofiile kasutatakse eluruumides, esindusruumides ja avalikes ruumides üle Eesti.",
    },
    notfound: {
      title: "Lehte ei leitud",
      body: "Sisestatud aadressi pole olemas. Võib-olla on otsitud sisu liigutatud või kustutatud.",
      cta: "Tagasi avalehele →",
    },
  },

  // ===========================================================
  // RUSSIAN — AI draft (needs professional review)
  // ===========================================================
  ru: {
    home: {
      hero: {
        headline: "Профили, которые исчезают в стене.",
        sub: "Эстонский магазин алюминиевых теневых профилей. LED-модели и декоративные — для потолка, стены, пола. Окраска RAL, доставка прямо со склада.",
      },
      configurator: {
        headline: "Конфигуратор",
        desc: "Введите нужную длину в метрах и выберите тип профиля — рассчитаем количество штук.",
      },
      partners: {
        headline: "Нам доверяют архитекторы и строители Эстонии",
        sub: "Более 200 проектов, более 40 партнёров. Каждый день отгружаем профили по новым заказам по всей Эстонии.",
      },
      blog: {
        title: "Гайды и вдохновение",
        sub: "Как выбрать правильный профиль, как монтировать, с какой LED-лентой работает. Практические руководства для архитекторов, строителей и дизайнеров интерьера.",
      },
    },
    about: {
      title: "О продукции",
      intro: "Алюминиевые теневые профили — наша главная специализация. Более 10 лет мы производим и продаём качественные профили, подходящие как для подсветки LED, так и без неё. Ниже — как выбрать правильный профиль и как они применяются.",
      whyAluminium: {
        title: "Почему алюминий",
        body: "Алюминий не впитывает влагу, не разбухает, не меняет цвет со временем. Срок службы — десятилетия. Порошковая окраска устойчива к УФ — оттенок RAL сохраняется 15+ лет. Все наши профили изготовлены из сплава 6063-T5 — того же, что используется в архитектурном строительстве.",
      },
      ralTitle: "Любой оттенок RAL. Ваш интерьер.",
      ralSub: "Порошковая окраска по RAL — профили идеально вписываются в общий стиль и цветовое решение интерьера.",
      installation: {
        title: "Просто. Точно.",
        sub: "Геометрия профилей позволяет достичь точного результата — ровная линия, скрытые неровности, совместимо со всеми напольными покрытиями.",
      },
      testimonial: {
        quote: "Теневые профили стали стандартным решением в наших проектах. Отзывы клиентов всегда положительные — помещение выглядит завершённым так, как деревянный плинтус никогда не даст.",
        author: "Лийза М.",
        role: "Дизайнер интерьера, Таллинн",
      },
    },
    faq: {
      title: "Часто задаваемые вопросы",
      sub: "Ответы про заказ, монтаж, оттенки RAL и гарантию.",
      groups: [
        {
          title: "Заказ и доставка",
          items: [
            { q: "Как быстро доставите?", a: "Товар со склада доставляется в течение 1–3 рабочих дней по всей Эстонии. RAL под заказ — 4–5 недель. Доставка бесплатна для заказов от 200 €." },
            { q: "Куда доставляете?", a: "По всей Эстонии — в пункты выдачи и курьером. Крупные заказы (профили длиннее 2,5 м) доставляются прямо на объект." },
            { q: "Можно прийти в салон?", a: "Да. Tehnika 14, Tallinn — пн–пт 10–17, сб по договорённости. Бесплатная проектная консультация с образцами." },
          ],
        },
        {
          title: "RAL и заказы под спецификации",
          items: [
            { q: "Какие оттенки RAL доступны?", a: "Порошковая окраска по RAL — любой оттенок (~5 недель). На складе всегда: без покрытия, белый (RAL 9016), чёрный (RAL 9005)." },
            { q: "Можно ли вернуть заказ RAL?", a: "Заказы RAL не подлежат возврату — окрашиваются специально под ваш заказ. Товары со стандартного склада можно вернуть в течение 14 дней." },
            { q: "Цвет на экране совпадает с реальным?", a: "Не точно. Цвет на экране отображается приблизительно — из-за калибровки может отличаться. Рекомендуем заехать в салон посмотреть образцы перед заказом RAL." },
          ],
        },
        {
          title: "Монтаж",
          items: [
            { q: "Монтаж сложный?", a: "Прошпаклёвываемая (скрытая) версия требует опыта шпаклёвщика и устанавливается до отделки гипсокартона. Версию с видимым монтажом опытный DIY-мастер может установить сам с лазерным уровнем." },
            { q: "Куда идёт LED-лента?", a: "Для каждого LED-профиля подходит своя LED-лента: для потолка 12 Вт/м, 234 LED/м, 3000K, 24В; для пола/стены COB 16 Вт/м, 1350 лм/м, CRI 94, 24В. LED-лента и диффузор заказываются отдельно." },
            { q: "У вас есть рекомендуемые монтажники?", a: "Да. В нашем салоне есть список опытных монтажников, с которыми мы сотрудничали годами. Звоните или приходите." },
          ],
        },
        {
          title: "Гарантия и уход",
          items: [
            { q: "Какой срок гарантии?", a: "5 лет гарантии на продукцию — на порошковую окраску, алюминиевую конструкцию. На LED-ленты — отдельная 2-летняя гарантия производителя." },
            { q: "Нужно ли ухаживать за профилем?", a: "Нет. Окрашенный алюминий не требует ухода. При необходимости — протрите влажной тряпкой, не используйте агрессивные моющие средства." },
          ],
        },
      ],
    },
    contact: {
      title: "Салон · Таллинн",
      sub: "Приходите посмотреть образцы. Tehnika 14, пн–пт 10–17.",
      sales: "Продажи и проектная консультация",
      tech: "Техподдержка для монтажников",
    },
    salon: {
      title: "Приходите в салон посмотреть образцы",
      body: "Образцы профилей, цветовые карты RAL, демо-системы LED-подсветки. Бесплатная проектная консультация — отвечаем на вопросы, даём рекомендации, показываем решения для вашего помещения.",
      hours: "Пн–Пт 10:00–17:00",
      address: "Tehnika 14, Tallinn",
    },
    b2b: {
      title: "B2B-партнёрам",
      intro: "Архитекторам, дизайнерам интерьера, строителям. Скидки, отсрочка платежа, личное сопровождение.",
      benefits: [
        { title: "Партнёрские цены", body: "Скидка до 25% от стандартных цен в зависимости от годового объёма заказов." },
        { title: "Отсрочка платежа", body: "Срок оплаты 30–60 дней в зависимости от длительности сотрудничества." },
        { title: "Личный менеджер", body: "Один контакт на весь проект — быстрые ответы, приоритетная доставка." },
        { title: "Проектные цены", body: "Для крупных заказов (от 500 м) — отдельные проектные цены." },
      ],
    },
    legal: {
      impressum: {
        title: "Реквизиты",
        body: "PROSPACE OÜ\nРег.№ 16821459\nИНН EE102661499\nVana-Kalamaja 8–110, 10412 Tallinn\nE-mail: info@prospace.ee\nТел: +372 56 989 780",
      },
      privacy: {
        title: "Политика конфиденциальности",
        intro: "Собираем персональные данные (имя, e-mail, телефон, адрес) для выполнения заказов и клиентского обслуживания. Данные не передаём третьим лицам, за исключением курьерской доставки (Itella, Omniva, DPD).",
      },
      cookies: {
        title: "Файлы cookie",
        intro: "Используем cookie для функциональности сайта (корзина, выбор языка) и анонимной аналитики (Plausible Analytics, без идентификации пользователей). Рекламные и трекинговые cookie не используются.",
      },
      terms: {
        title: "Условия продажи",
        intro: "Оформляя заказ, вы подтверждаете, что ознакомлены с условиями продажи. Заказы RAL не подлежат возврату. Товары со стандартного склада можно вернуть в течение 14 дней в оригинальной упаковке.",
      },
    },
    inspiration: {
      title: "Вдохновение",
      sub: "Реальные проекты, реальные клиенты, реальные товары. Посмотрите, как теневые профили применяются в жилых, представительских и общественных пространствах по всей Эстонии.",
    },
    notfound: {
      title: "Страница не найдена",
      body: "Введённый адрес не существует. Возможно, искомый контент был перемещён или удалён.",
      cta: "Вернуться на главную →",
    },
  }
};
