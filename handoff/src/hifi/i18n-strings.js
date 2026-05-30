// ============================================================
// i18n-strings — UI string catalog for ET (canonical) and RU (draft).
// ============================================================
//
// RU translations are AI DRAFT — needs review by a professional EST→RU translator
// before launch. See handoff/BRAND_VOICE_RU.md for voice rules.
//
// Keys are flat, dotted by area (nav.shop, cart.empty, etc).
// Use via window.__i18n.t('nav.shop').

window.__i18nStrings = {

  // ============================================================
  // ESTONIAN — canonical source
  // ============================================================
  et: {
    // Locale switcher
    'locale.et': 'ET',
    'locale.ru': 'RU',
    'locale.switch.aria': 'Vali keel',

    // Top nav
    'nav.shop': 'Pood',
    'nav.about': 'Toodetest',
    'nav.inspiration': 'Inspiratsioon',
    'nav.blog': 'Uudised',
    'nav.salon': 'Salong',
    'nav.search': 'Otsi',
    'nav.cart': 'Korv',
    'nav.account': 'Konto',
    'nav.b2b': 'B2B',
    'nav.contact': 'Kontakt',
    'nav.faq': 'KKK',

    // Footer
    'footer.shop': 'Pood',
    'footer.help': 'Abi',
    'footer.company': 'Ettevõte',
    'footer.legal': 'Õigus',
    'footer.follow': 'Jälgi meid',
    'footer.newsletter': 'Uudiskiri',
    'footer.newsletter.placeholder': 'Sinu e-mail',
    'footer.newsletter.cta': 'Telli',
    'footer.rights': '© 2026 PROSPACE OÜ. Kõik õigused kaitstud.',

    // Hero / home
    'hero.collection': '★ Kollektsioon 026 — Kevad 2026',
    'hero.live': 'Live · {count} toodet laos',
    'hero.cta.primary': 'Avasta tooted →',
    'hero.stats.inStock': 'Toodet laos',
    'hero.stats.delivery': 'Tasuta tarne Eestis',
    'hero.stats.ral': 'RAL värvitoone',
    'hero.stats.return': 'Tagastusõigus',
    'hero.stats.days': 'p',

    // Marquee
    'marquee.delivery': 'TASUTA TARNE 200 €+',
    'marquee.return': '14 PÄEVA TAGASTUS (V.A. RAL)',
    'marquee.ral': 'RAL VÄRVITUD',

    // Sections (home)
    'home.collections.eyebrow': '02 / Kollektsioonid',
    'home.collections.title': 'Osta kategooria järgi',
    'home.collections.viewAll': 'Vaata kõiki →',
    'home.configurator.eyebrow': '03 / Tööriist',
    'home.configurator.title': 'Konfiguraator',
    'home.configurator.desc': 'Sisesta vajalik meetrite kogus ja vali profiili tüüp - arvutame välja vajaliku tükkide arvu.',
    'home.configurator.field.meters': 'Vajalik kogus (m)',
    'home.configurator.field.type': 'Profiili tüüp',
    'home.configurator.type.ceiling': 'Lae profiil · 2,5 m',
    'home.configurator.type.floor': 'Põranda profiil · 2,6 m',
    'home.configurator.pieces': 'profiili tükki',
    'home.configurator.totalLength': '= {len} m kogupikkus',
    'home.configurator.note': 'Profiile ei poolitata — kogus ümardatakse järgmise täistükini.',
    'home.configurator.cta.ceiling': 'Vaata laeprofiile →',
    'home.configurator.cta.floor': 'Vaata põrandaprofiile →',
    'home.bestsellers.eyebrow': '04 / Enimmüüdud',
    'home.bestsellers.title': 'Top 10',
    'home.inspiration.eyebrow': '05 / Päris projektid',
    'home.inspiration.title': 'Inspiratsioon',
    'home.social.eyebrow': '06 / Sotsiaalmeedia',
    'home.blog.eyebrow': '07 / Uudised',
    'home.blog.title': 'Juhendid & inspiratsioon',
    'home.partners.eyebrow': '08 / Kliendid ja koostööpartnerid',
    'home.partners.title': 'Usaldatud eesti arhitektide ja ehitajate poolt',

    // Catalog / product card
    'catalog.title': 'Pood',
    'catalog.filter.category': 'Kategooria',
    'catalog.filter.color': 'Värv',
    'catalog.filter.price': 'Hind',
    'catalog.filter.led': 'LED',
    'catalog.filter.led.with': 'LED-iga',
    'catalog.filter.led.without': 'Ilma LED',
    'catalog.filter.led.all': 'Kõik',
    'catalog.sort.label': 'Sorteeri',
    'catalog.sort.popular': 'Populaarsed',
    'catalog.sort.priceAsc': 'Hind ↑',
    'catalog.sort.priceDesc': 'Hind ↓',
    'catalog.sort.new': 'Uuemad',
    'catalog.results': '{count} toodet',
    'product.ribbon.inStock': 'LAOS',
    'product.ribbon.order': 'TELLI',
    'product.ribbon.new': 'UUS',
    'product.led.badge': '⚡ LED',
    'product.priceFrom': 'alates',
    'product.priceUnit': '€/jm',
    'product.priceVatIncluded': 'sisaldab 24% KM',

    // Product page
    'product.tab.specs': 'Tehnilised andmed',
    'product.tab.colors': 'Värvid',
    'product.tab.installation': 'Paigaldus',
    'product.tab.faq': 'KKK',
    'product.color.select': 'Vali värv',
    'product.color.ral': 'RAL värv (eritellimus)',
    'product.color.lead': 'Tarne 4–5 nädalat',
    'product.qty': 'Kogus (m)',
    'product.qty.pieces': 'tükki vaja',
    'product.cta.addToCart': 'Lisa korvi',
    'product.cta.askQuote': 'Küsi pakkumist',
    'product.related.title': 'Seotud tooted',

    // Cart / checkout
    'cart.title': 'Sinu korv',
    'cart.empty': 'Korv on tühi',
    'cart.empty.cta': 'Vaata tooteid →',
    'cart.subtotal': 'Vahesumma',
    'cart.shipping': 'Tarne',
    'cart.shipping.free': 'Tasuta',
    'cart.total': 'Kokku',
    'cart.vat': 'sisaldab 24% KM',
    'cart.promoCode': 'Sooduskood',
    'cart.promoCode.apply': 'Rakenda',
    'cart.cta.checkout': 'Jätka tellimusega →',

    'checkout.title': 'Tellimuse vormistamine',
    'checkout.contact': 'Kontaktandmed',
    'checkout.delivery': 'Tarne',
    'checkout.payment': 'Makseviis',
    'checkout.field.name': 'Nimi',
    'checkout.field.email': 'E-mail',
    'checkout.field.phone': 'Telefon',
    'checkout.field.address': 'Aadress',
    'checkout.field.city': 'Linn',
    'checkout.field.zip': 'Sihtnumber',
    'checkout.field.notes': 'Märkused',
    'checkout.cta.placeOrder': 'Esita tellimus →',

    // Forms / B2B / contact
    'contact.title': 'Võta ühendust',
    'contact.intro': 'Salongi külastus, RAL-tellimused, B2B partnerlus — vastame kõikidele.',
    'contact.form.subject': 'Teema',
    'contact.form.message': 'Sõnum',
    'contact.form.submit': 'Saada sõnum',
    'contact.form.success': 'Aitäh — vastame 24 tunni jooksul.',

    'b2b.title': 'B2B partneritele',
    'b2b.intro': 'Arhitektidele, sisekujundajatele, ehitajatele. Allahindlused, makseterminid, isiklik nõustamine.',
    'b2b.form.submit': 'Saada päring →',

    // FAQ / info / legal
    'faq.title': 'Korduma kippuvad küsimused',
    'info.installation': 'Paigaldusjuhend',
    'info.delivery': 'Tarne ja tagastus',
    'info.warranty': 'Garantii',
    'info.contact': 'Kontakt',
    'info.salon': 'Salong',
    'legal.impressum': 'Impressum',
    'legal.terms': 'Müügitingimused',
    'legal.privacy': 'Privaatsus',
    'legal.cookies': 'Küpsised',

    // Common buttons / links
    'btn.viewAll': 'Vaata kõiki →',
    'btn.readMore': 'Loe rohkem →',
    'btn.learnMore': 'Tutvu lähemalt →',
    'btn.discover': 'Avasta →',
    'btn.back': '← Tagasi',
    'btn.close': 'Sulge',
    'btn.cancel': 'Tühista',
    'btn.save': 'Salvesta',

    // Status / system
    'status.loading': 'Laadin…',
    'status.error': 'Ilmnes viga',
    'status.empty': 'Sisu pole',
    'status.notFound': 'Ei leitud',
    'search.placeholder': 'Otsi tooteid',
    'search.empty': 'Otsing ei andnud tulemusi',
    'search.tryAgain': 'Proovi teisi märksõnu või vaata kogu valikut.'
  },

  // ============================================================
  // RUSSIAN — AI DRAFT (needs professional review)
  // ============================================================
  ru: {
    // Locale switcher
    'locale.et': 'ET',
    'locale.ru': 'RU',
    'locale.switch.aria': 'Выбрать язык',

    // Top nav
    'nav.shop': 'Магазин',
    'nav.about': 'О продукции',
    'nav.inspiration': 'Вдохновение',
    'nav.blog': 'Журнал',
    'nav.salon': 'Салон',
    'nav.search': 'Поиск',
    'nav.cart': 'Корзина',
    'nav.account': 'Личный кабинет',
    'nav.b2b': 'B2B',
    'nav.contact': 'Контакты',
    'nav.faq': 'Вопросы',

    // Footer
    'footer.shop': 'Магазин',
    'footer.help': 'Помощь',
    'footer.company': 'Компания',
    'footer.legal': 'Документы',
    'footer.follow': 'Мы в соцсетях',
    'footer.newsletter': 'Рассылка',
    'footer.newsletter.placeholder': 'Ваш e-mail',
    'footer.newsletter.cta': 'Подписаться',
    'footer.rights': '© 2026 PROSPACE OÜ. Все права защищены.',

    // Hero / home
    'hero.collection': '★ Коллекция 026 — Весна 2026',
    'hero.live': 'Live · {count} товаров на складе',
    'hero.cta.primary': 'Открыть каталог →',
    'hero.stats.inStock': 'Товаров на складе',
    'hero.stats.delivery': 'Бесплатная доставка по Эстонии',
    'hero.stats.ral': 'Оттенков RAL',
    'hero.stats.return': 'Право возврата',
    'hero.stats.days': 'дн.',

    // Marquee
    'marquee.delivery': 'БЕСПЛАТНАЯ ДОСТАВКА ОТ 200 €',
    'marquee.return': 'ВОЗВРАТ В ТЕЧЕНИЕ 14 ДНЕЙ (КРОМЕ RAL)',
    'marquee.ral': 'ОКРАСКА RAL',

    // Sections (home)
    'home.collections.eyebrow': '02 / Коллекции',
    'home.collections.title': 'Покупки по категориям',
    'home.collections.viewAll': 'Смотреть все →',
    'home.configurator.eyebrow': '03 / Калькулятор',
    'home.configurator.title': 'Конфигуратор',
    'home.configurator.desc': 'Введите нужную длину в метрах и выберите тип профиля — рассчитаем количество штук.',
    'home.configurator.field.meters': 'Нужная длина (м)',
    'home.configurator.field.type': 'Тип профиля',
    'home.configurator.type.ceiling': 'Потолочный · 2,5 м',
    'home.configurator.type.floor': 'Напольный · 2,6 м',
    'home.configurator.pieces': 'штук профиля',
    'home.configurator.totalLength': '= {len} м общая длина',
    'home.configurator.note': 'Профили не режутся — количество округляется до целой штуки.',
    'home.configurator.cta.ceiling': 'Смотреть потолочные →',
    'home.configurator.cta.floor': 'Смотреть напольные →',
    'home.bestsellers.eyebrow': '04 / Хиты продаж',
    'home.bestsellers.title': 'Топ-10',
    'home.inspiration.eyebrow': '05 / Реальные проекты',
    'home.inspiration.title': 'Вдохновение',
    'home.social.eyebrow': '06 / Соцсети',
    'home.blog.eyebrow': '07 / Журнал',
    'home.blog.title': 'Гайды и вдохновение',
    'home.partners.eyebrow': '08 / Клиенты и партнёры',
    'home.partners.title': 'Нам доверяют архитекторы и строители Эстонии',

    // Catalog / product card
    'catalog.title': 'Магазин',
    'catalog.filter.category': 'Категория',
    'catalog.filter.color': 'Цвет',
    'catalog.filter.price': 'Цена',
    'catalog.filter.led': 'LED',
    'catalog.filter.led.with': 'С LED',
    'catalog.filter.led.without': 'Без LED',
    'catalog.filter.led.all': 'Все',
    'catalog.sort.label': 'Сортировка',
    'catalog.sort.popular': 'Популярные',
    'catalog.sort.priceAsc': 'Цена ↑',
    'catalog.sort.priceDesc': 'Цена ↓',
    'catalog.sort.new': 'Новинки',
    'catalog.results': '{count} товаров',
    'product.ribbon.inStock': 'НА СКЛАДЕ',
    'product.ribbon.order': 'ПОД ЗАКАЗ',
    'product.ribbon.new': 'НОВОЕ',
    'product.led.badge': '⚡ LED',
    'product.priceFrom': 'от',
    'product.priceUnit': '€/пог.м',
    'product.priceVatIncluded': 'с НДС 24%',

    // Product page
    'product.tab.specs': 'Технические данные',
    'product.tab.colors': 'Цвета',
    'product.tab.installation': 'Монтаж',
    'product.tab.faq': 'Вопросы',
    'product.color.select': 'Выберите цвет',
    'product.color.ral': 'Цвет RAL (под заказ)',
    'product.color.lead': 'Поставка 4–5 недель',
    'product.qty': 'Количество (м)',
    'product.qty.pieces': 'штук нужно',
    'product.cta.addToCart': 'В корзину',
    'product.cta.askQuote': 'Запросить предложение',
    'product.related.title': 'Похожие товары',

    // Cart / checkout
    'cart.title': 'Ваша корзина',
    'cart.empty': 'Корзина пуста',
    'cart.empty.cta': 'Смотреть товары →',
    'cart.subtotal': 'Промежуточный итог',
    'cart.shipping': 'Доставка',
    'cart.shipping.free': 'Бесплатно',
    'cart.total': 'Итого',
    'cart.vat': 'с НДС 24%',
    'cart.promoCode': 'Промокод',
    'cart.promoCode.apply': 'Применить',
    'cart.cta.checkout': 'Перейти к оформлению →',

    'checkout.title': 'Оформление заказа',
    'checkout.contact': 'Контактные данные',
    'checkout.delivery': 'Доставка',
    'checkout.payment': 'Способ оплаты',
    'checkout.field.name': 'Имя',
    'checkout.field.email': 'E-mail',
    'checkout.field.phone': 'Телефон',
    'checkout.field.address': 'Адрес',
    'checkout.field.city': 'Город',
    'checkout.field.zip': 'Индекс',
    'checkout.field.notes': 'Комментарий',
    'checkout.cta.placeOrder': 'Отправить заказ →',

    // Forms / B2B / contact
    'contact.title': 'Свяжитесь с нами',
    'contact.intro': 'Посещение салона, заказы RAL, B2B-сотрудничество — ответим на любой запрос.',
    'contact.form.subject': 'Тема',
    'contact.form.message': 'Сообщение',
    'contact.form.submit': 'Отправить',
    'contact.form.success': 'Спасибо — ответим в течение 24 часов.',

    'b2b.title': 'B2B-партнёрам',
    'b2b.intro': 'Архитекторам, дизайнерам интерьера, строителям. Скидки, отсрочка платежа, личное сопровождение.',
    'b2b.form.submit': 'Отправить заявку →',

    // FAQ / info / legal
    'faq.title': 'Часто задаваемые вопросы',
    'info.installation': 'Инструкция по монтажу',
    'info.delivery': 'Доставка и возврат',
    'info.warranty': 'Гарантия',
    'info.contact': 'Контакты',
    'info.salon': 'Салон',
    'legal.impressum': 'Реквизиты',
    'legal.terms': 'Условия продажи',
    'legal.privacy': 'Политика конфиденциальности',
    'legal.cookies': 'Файлы cookie',

    // Common buttons / links
    'btn.viewAll': 'Смотреть все →',
    'btn.readMore': 'Читать дальше →',
    'btn.learnMore': 'Подробнее →',
    'btn.discover': 'Открыть →',
    'btn.back': '← Назад',
    'btn.close': 'Закрыть',
    'btn.cancel': 'Отмена',
    'btn.save': 'Сохранить',

    // Status / system
    'status.loading': 'Загрузка…',
    'status.error': 'Произошла ошибка',
    'status.empty': 'Нет содержимого',
    'status.notFound': 'Не найдено',
    'search.placeholder': 'Поиск товаров',
    'search.empty': 'Ничего не найдено',
    'search.tryAgain': 'Попробуйте другие ключевые слова или посмотрите весь каталог.'
  }
};
