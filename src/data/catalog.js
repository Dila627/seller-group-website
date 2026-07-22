import { brands } from "./brands.js";
import { catalogOptions, getCatalogOptionLabel } from "./catalogOptions.js";
import { products } from "./products.js";

export { brands, catalogOptions, getCatalogOptionLabel, products };

export const languages = [
  { code: "ru", label: "RU", name: "Русский" },
  { code: "az", label: "AZ", name: "Azərbaycanca" },
];

export const contacts = {
  phoneDisplay: "+994 51 888 50 10",
  phoneHref: "tel:+994518885010",
  whatsappHref: "https://wa.me/994518885010",
  telegramHref: "tg://resolve?phone=994518885010",
  max: "https://max.ru/sellergroupaz",
  maxHref: "https://max.ru/sellergroupaz",
  email: "sellergroupaz@gmail.com",
  emailHref: "mailto:sellergroupaz@gmail.com",
  address: "Dərnəgül, Baksol yolu",
  mapHref: "https://www.google.com/maps/search/?api=1&query=D%C9%99rn%C9%99g%C3%BCl%2C%20Baksol%20yolu%2C%20Baku",
};

export const assets = {
  logo: "assets/site/logo.svg",
  hero: "assets/hero-showcases/hero.png",
  og: "assets/site/seller-group-og.png",
};

export const siteCopy = {
  ru: {
    seo: {
      title: "Seller Group Azerbaijan",
      description:
        "Поставка строительных, ремонтных материалов и услуг по всему Азербайджану.",
      ogTitle: "Seller Group Azerbaijan",
      ogDescription:
        "Поставка строительных, ремонтных материалов и услуг по всему Азербайджану.",
      imageAlt: "Логотип Seller Group Azerbaijan",
    },
    header: {
      subtitle: "Строительные, ремонтные материалы и услуги",
      logoAlt: "Логотип Seller Group Azerbaijan",
      contact: "Связаться",
      menuOpen: "Открыть меню",
      menuClose: "Закрыть меню",
      language: "Язык сайта",
    },
    navigation: [
      { label: "Главная", href: "/" },
      { label: "О компании", href: "/#about" },
      { label: "Бренды", href: "/#brands" },
      { label: "Продукция", href: "/catalog" },
      { label: "Услуги", href: "/#services" },
    ],
    common: {
      home: "Главная",
      contactUs: "Связаться",
      viewBrand: "Перейти к товарам",
      moreDetails: "Подробнее",
      productCatalog: "Каталог продукции",
      noProducts:
        "Ассортимент этого производителя уточняется. Свяжитесь с нами для подбора материалов под ваш объект.",
      backToBrands: "К брендам",
      backToHome: "На главную",
    },
    hero: {
      eyebrow: "Импорт из России и Турции",
      title: "Поставка ремонтных,\nстроительных материалов\nи услуг\nпо всей стране",
      text:
        "Официальный поставщик строительных материалов, ремонтных решений и услуг для бизнеса и частных клиентов.",
      advantages: [
        "Официальные поставки",
        "Работаем по всему Азербайджану",
        "B2B и B2C",
        "Надежные бренды",
      ],
      imageAlt:
        "Премиальный шоурум Seller Group Azerbaijan с витриной строительных и отделочных материалов",
      showcaseLabel: "Витрина реальных товаров Seller Group Azerbaijan",
      showcaseTitle: "Премиальные бренды",
      shelfPrevious: "Предыдущие товары",
      shelfNext: "Следующие товары",
    },
    stats: {
      items: [
        { value: "6+", label: "официальных брендов" },
        { value: "2", label: "страны импорта" },
        { value: "24/7", label: "поддержка клиентов" },
        { value: "1000+", label: "реализованных поставок" },
      ],
    },
    about: {
      eyebrow: "О компании",
      title: "Профессиональная поставка материалов под задачи объекта",
      intro:
        "Seller Group Azerbaijan работает как официальный дистрибьютор и поставщик материалов, где важны надежная коммуникация, аккуратная комплектация и практичный подбор решений.",
      blocks: [
        {
          title: "Кто мы",
          text:
            "Компания, которая импортирует и поставляет строительные и отделочные материалы из России и Турции.",
        },
        {
          title: "Что поставляем",
          text:
            "Краски, защитные покрытия, изоляционные материалы, строительные смеси и сопутствующие решения для ремонта и строительства.",
        },
        {
          title: "Почему доверяют",
          text:
            "Мы работаем с объектами разного масштаба, консультируем перед покупкой и выстраиваем понятный процесс поставки.",
        },
        {
          title: "Миссия",
          text:
            "Помогать клиентам выбирать материалы, которые соответствуют условиям применения и задачам объекта.",
        },
      ],
    },
    audience: {
      eyebrow: "Для кого",
      title: "Материалы для профессионального и частного сегмента",
      items: [
        "Строительные компании",
        "Подрядчики",
        "Архитекторы",
        "Специалисты по ремонту",
        "Промышленные объекты",
        "Розничные клиенты",
      ],
    },
    services: {
      eyebrow: "Услуги",
      title: "Сопровождение поставки материалов под объект",
      intro:
        "Seller Group Azerbaijan помогает подобрать материалы, уточнить назначение и организовать поставку для частных и корпоративных клиентов.",
      highlights: [
        {
          title: "Ремонтные услуги",
          text:
            "Помимо поставки строительных и отделочных материалов, Seller Group Azerbaijan помогает подобрать квалифицированных специалистов для выполнения ремонтных и отделочных работ. Если у клиента нет своей бригады, мы организуем комплексное решение: материалы + специалисты.",
        },
        {
          title: "Доставка",
          text: "Доставка строительных материалов по Баку и регионам Азербайджана.",
        },
      ],
      items: [
        "Подбор материалов под объект",
        "Консультация перед покупкой",
        "Поставка материалов",
        "Работа с частными и корпоративными клиентами",
        "Помощь в выборе решений для ремонта и строительства",
      ],
    },
    brands: {
      eyebrow: "Бренды",
      title: "Производители, с которыми работает Seller Group Azerbaijan",
      intro:
        "Брендовые карточки ведут на отдельные страницы производителей с описанием направления, преимуществами и каталогом доступных продуктов.",
    },
    solutions: {
      eyebrow: "Решения",
      title: "Материалы и услуги под задачи объекта",
      intro:
        "Подбираем решения для защиты, ремонта, отделки и комплектации строительных объектов.",
      items: [
        {
          title: "Гидроизоляция",
          text: "Материалы для защиты поверхностей от влаги и протечек.",
        },
        {
          title: "Защита фасадов",
          text: "Покрытия для наружных работ и долговечной отделки.",
        },
        {
          title: "Внутренняя отделка",
          text: "Краски и материалы для аккуратного ремонта помещений.",
        },
        {
          title: "Ремонтные услуги",
          text: "Помощь в подборе специалистов и комплексном решении задач.",
        },
      ],
    },
    products: {
      eyebrow: "Продукция",
      title: "Популярные материалы",
      intro:
        "Ознакомьтесь с частью нашего ассортимента. Полный список продукции с фильтрами по брендам, категориям, назначению и типу товара доступен в каталоге.",
      cta: "Смотреть весь каталог",
    },
    catalog: {
      seoTitle: "Каталог продукции | Seller Group Azerbaijan",
      seoDescription:
        "Полный каталог строительных и отделочных материалов Seller Group Azerbaijan с фильтрами по брендам, категориям, назначению и типу товара.",
      title: "Каталог продукции",
      intro:
        "Используйте фильтры, чтобы быстро найти подходящий материал по бренду, категории, назначению и типу товара.",
      filtersTitle: "Фильтры",
      filtersButton: "Фильтры",
      closeFilters: "Закрыть фильтры",
      showProducts: "Показать товары",
      searchLabel: "Поиск",
      searchPlaceholder: "Название или бренд",
      clearSearch: "Очистить поиск",
      reset: "Сбросить",
      resetAll: "Сбросить всё",
      removeFilter: "Удалить фильтр",
      all: "Все",
      selectedFilters: "Выбранные фильтры",
      resultsPrefix: "Найдено товаров",
      resultsSuffix: "",
      noResults: "По выбранным параметрам товары не найдены.",
      labels: {
        brand: "Бренд",
        category: "Категория",
        purpose: "Назначение",
        type: "Тип товара",
        sort: "Сортировка",
      },
      card: {
        more: "Подробнее",
        fallbackDescription:
          "Характеристики и назначение можно уточнить у менеджера Seller Group Azerbaijan.",
      },
    },
    contact: {
      eyebrow: "Контакты",
      title: "Свяжитесь с Seller Group Azerbaijan",
      intro:
        "Напишите или позвоните, чтобы уточнить материал, бренд, наличие и условия поставки под ваш объект.",
      actionTitle: "Выберите удобный способ связи",
      labels: {
        phone: "Телефон",
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        max: "MAX",
        email: "Email",
        address: "Адрес",
      },
      actions: {
        call: "Позвонить",
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        email: "Email",
        max: "MAX",
      },
    },
    brandPage: {
      manufacturer: "Производитель",
      advantages: "Преимущества",
      catalog: "Каталог продукции",
    },
    productPage: {
      product: "Продукт",
      brand: "Бренд",
      category: "Категория",
      type: "Тип товара",
      purpose: "Назначение",
      surfaceTypes: "Подходящие поверхности",
      volume: "Варианты фасовки",
      description: "Описание",
      advantages: "Преимущества",
      characteristics: "Технические характеристики",
      applications: "Область применения",
      packaging: "Фасовка",
      colors: "Цвета",
      instructions: "Инструкции",
      gallery: "Галерея",
      consultationCta: "Получить консультацию",
      consultationMessagePrefix:
        "Здравствуйте! Хочу получить консультацию по товару:",
    },
    notFound: {
      title: "Страница не найдена",
      text: "Проверьте адрес или вернитесь на главную страницу Seller Group Azerbaijan.",
    },
    footer: {
      description:
        "Поставщик строительных и отделочных материалов из России и Турции.",
      contactTitle: "Свяжитесь с нами",
      workTitle: "График работы",
      workDays: "Понедельник — Суббота",
      workHours: "09:00–18:00",
      navigationTitle: "Навигация",
      socialTitle: "Мы в сети",
      brandTagline: "Официальный поставщик строительных и отделочных материалов",
      socialDescriptions: {
        whatsapp: "Написать в WhatsApp",
        telegram: "Написать в Telegram",
        max: "Написать в MAX",
        email: "Отправить письмо",
      },
      socialAria: {
        max: "Связаться с Seller Group Azerbaijan через MAX",
      },
      bottomRight: "Все права защищены.",
      rights: "Все права защищены.",
      nav: [
        { label: "Главная", href: "/" },
        { label: "О компании", href: "/#about" },
        { label: "Бренды", href: "/#brands" },
        { label: "Продукция", href: "/catalog" },
        { label: "Услуги", href: "/#services" },
        { label: "Контакты", href: "/#contacts" },
      ],
    },
  },
  az: {
    seo: {
      title: "Seller Group Azerbaijan — tikinti materialları və xidmətlər",
      description:
        "Seller Group Azerbaijan — tikinti və tamamlama materiallarının təchizatı, çatdırılma və təmir xidmətləri.",
      ogTitle: "Seller Group Azerbaijan",
      ogDescription: "Tikinti və tamamlama materialları, çatdırılma və təmir xidmətləri.",
      imageAlt: "Seller Group Azerbaijan loqosu",
    },
    header: {
      subtitle: "Tikinti, təmir materialları və xidmətlər",
      logoAlt: "Seller Group Azerbaijan loqosu",
      contact: "Əlaqə saxla",
      menuOpen: "Menyunu aç",
      menuClose: "Menyunu bağla",
      language: "Saytın dili",
    },
    navigation: [
      { label: "Əsas səhifə", href: "/" },
      { label: "Şirkət", href: "/#about" },
      { label: "Brendlər", href: "/#brands" },
      { label: "Məhsullar", href: "/catalog" },
      { label: "Xidmətlər", href: "/#services" },
    ],
    common: {
      home: "Əsas səhifə",
      contactUs: "Əlaqə saxla",
      viewBrand: "Məhsullara bax",
      moreDetails: "Ətraflı",
      productCatalog: "Məhsul kataloqu",
      noProducts:
        "Bu istehsalçının assortimenti dəqiqləşdirilir. Obyektiniz üçün material seçimi barədə bizimlə əlaqə saxlayın.",
      backToBrands: "Brendlərə qayıt",
      backToHome: "Əsas səhifəyə qayıt",
    },
    hero: {
      eyebrow: "Rusiya və Türkiyədən idxal",
      title: "Təmir,\ntikinti materialları\nvə xidmətlərin\nölkə üzrə təchizatı",
      text:
        "Biznes və fərdi müştərilər üçün tikinti materialları, təmir həlləri və xidmətlərin rəsmi təchizatçısı.",
      advantages: [
        "Rəsmi təchizat",
        "Bütün Azərbaycan üzrə işləyirik",
        "B2B və B2C",
        "Etibarlı brendlər",
      ],
      imageAlt:
        "Seller Group Azerbaijan tikinti və tamamlama materialları vitrini olan premium şourum",
      showcaseLabel: "Seller Group Azerbaijan real məhsul vitrini",
      showcaseTitle: "Premium brendlər",
      shelfPrevious: "Əvvəlki məhsullar",
      shelfNext: "Növbəti məhsullar",
    },
    stats: {
      items: [
        { value: "6+", label: "rəsmi brend" },
        { value: "2", label: "idxal ölkəsi" },
        { value: "24/7", label: "müştəri dəstəyi" },
        { value: "1000+", label: "reallaşdırılmış təchizat" },
      ],
    },
    about: {
      eyebrow: "Şirkət haqqında",
      title: "Obyekt tələbinə uyğun peşəkar material təchizatı",
      intro:
        "Seller Group Azerbaijan rəsmi distribyutor və təchizatçı kimi işləyir: etibarlı kommunikasiya, səliqəli komplektasiya və praktik material seçimi əsas prioritetdir.",
      blocks: [
        {
          title: "Biz kimik",
          text:
            "Rusiya və Türkiyədən tikinti və tamamlama materiallarını idxal edən və tədarük edən şirkətik.",
        },
        {
          title: "Nə tədarük edirik",
          text:
            "Boyalar, qoruyucu örtüklər, izolyasiya materialları, tikinti qarışıqları və təmir-tikinti üçün əlavə həllər.",
        },
        {
          title: "Niyə etibar edirlər",
          text:
            "Müxtəlif miqyaslı obyektlərlə işləyir, alışdan əvvəl məsləhət verir və aydın təchizat prosesi qururuq.",
        },
        {
          title: "Missiya",
          text:
            "Müştərilərə istifadə şəraitinə və obyekt tapşırığına uyğun material seçməkdə kömək etmək.",
        },
      ],
    },
    audience: {
      eyebrow: "Kimlər üçün",
      title: "Peşəkar və fərdi seqment üçün materiallar",
      items: [
        "Tikinti şirkətləri",
        "Podratçılar",
        "Memarlar",
        "Təmir mütəxəssisləri",
        "Sənaye obyektləri",
        "Fərdi müştərilər",
      ],
    },
    services: {
      eyebrow: "Xidmətlər",
      title: "Obyekt üçün material təchizatının müşayiəti",
      intro:
        "Seller Group Azerbaijan fərdi və korporativ müştərilər üçün material seçimi, təyinatın dəqiqləşdirilməsi və təchizat prosesində kömək edir.",
      highlights: [
        {
          title: "Təmir xidmətləri",
          text:
            "Seller Group Azerbaijan tikinti və təmir materiallarının təchizatı ilə yanaşı, peşəkar ustaların seçilməsində də kömək edir. Müştərinin ustası yoxdursa, material və xidmət birlikdə təqdim olunur.",
        },
        {
          title: "Çatdırılma",
          text: "Bakı və Azərbaycanın bölgələrinə tikinti materiallarının çatdırılması.",
        },
      ],
      items: [
        "Obyektə uyğun material seçimi",
        "Alışdan əvvəl məsləhət",
        "Materialların tədarükü",
        "Fərdi və korporativ müştərilərlə iş",
        "Təmir və tikinti üçün həll seçimində dəstək",
      ],
    },
    brands: {
      eyebrow: "Brendlər",
      title: "Seller Group Azerbaijan-un işlədiyi istehsalçılar",
      intro:
        "Brend kartları istehsalçı səhifələrinə aparır: istiqamət, üstünlüklər və mövcud məhsul kataloqu bir yerdədir.",
    },
    solutions: {
      eyebrow: "Həllər",
      title: "Obyekt tapşırıqlarına uyğun material və xidmətlər",
      intro:
        "Qoruma, təmir, tamamlama və tikinti obyektlərinin komplektasiyası üçün həllər seçirik.",
      items: [
        {
          title: "Hidroizolyasiya",
          text: "Səthlərin nəm və sızmalardan qorunması üçün materiallar.",
        },
        {
          title: "Fasad qoruması",
          text: "Xarici işlər və uzunömürlü tamamlama üçün örtüklər.",
        },
        {
          title: "Daxili tamamlama",
          text: "Məkanların səliqəli təmiri üçün boyalar və materiallar.",
        },
        {
          title: "Təmir xidmətləri",
          text: "Ustaların seçimi və kompleks həllin təşkili üzrə dəstək.",
        },
      ],
    },
    products: {
      eyebrow: "Məhsullar",
      title: "Seçilmiş məhsullar",
      intro:
        "Məhsullarımızın bir hissəsi ilə tanış olun. Brend, kateqoriya, istifadə sahəsi və məhsul növü üzrə filtrləri olan tam məhsul siyahısı kataloqda təqdim olunur.",
      cta: "Bütün kataloqa bax",
    },
    catalog: {
      seoTitle: "Məhsul kataloqu | Seller Group Azerbaijan",
      seoDescription:
        "Seller Group Azerbaijan tikinti və tamamlama materiallarının tam kataloqu: brend, kateqoriya, istifadə sahəsi və məhsul növü üzrə filtrlər.",
      title: "Məhsul kataloqu",
      intro:
        "Uyğun materialı brend, kateqoriya, istifadə sahəsi və məhsul növü üzrə tez tapmaq üçün filtrlərdən istifadə edin.",
      filtersTitle: "Filtrlər",
      filtersButton: "Filtrlər",
      closeFilters: "Filtrləri bağla",
      showProducts: "Məhsulları göstər",
      searchLabel: "Axtarış",
      searchPlaceholder: "Məhsul və ya brend",
      clearSearch: "Axtarışı təmizlə",
      reset: "Sıfırla",
      resetAll: "Hamısını sıfırla",
      removeFilter: "Filtri sil",
      all: "Hamısı",
      selectedFilters: "Seçilmiş filtrlər",
      resultsPrefix: "",
      resultsSuffix: "məhsul tapıldı",
      noResults: "Seçilmiş parametrlərə uyğun məhsul tapılmadı.",
      labels: {
        brand: "Brend",
        category: "Kateqoriya",
        purpose: "İstifadə sahəsi",
        type: "Məhsul növü",
        sort: "Sıralama",
      },
      card: {
        more: "Ətraflı",
        fallbackDescription:
          "Xüsusiyyətlər və təyinat barədə Seller Group Azerbaijan menecerindən məlumat ala bilərsiniz.",
      },
    },
    contact: {
      eyebrow: "",
      title: "Seller Group Azerbaijan ilə əlaqə saxlayın",
      intro:
        "Material, brend, mövcudluq və obyektiniz üçün təchizat şərtlərini dəqiqləşdirmək üçün yazın və ya zəng edin.",
      actionTitle: "Rahat əlaqə üsulunu seçin",
      labels: {
        phone: "Telefon",
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        max: "MAX",
        email: "Email",
        address: "Ünvan",
      },
      actions: {
        call: "Zəng et",
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        email: "Email",
        max: "MAX",
      },
    },
    brandPage: {
      manufacturer: "İstehsalçı",
      advantages: "Üstünlüklər",
      catalog: "Məhsul kataloqu",
    },
    productPage: {
      product: "Məhsul",
      brand: "Brend",
      category: "Kateqoriya",
      type: "Məhsul növü",
      purpose: "İstifadə sahəsi",
      surfaceTypes: "Uyğun səthlər",
      volume: "Qablaşdırma variantları",
      description: "Təsvir",
      advantages: "Üstünlüklər",
      characteristics: "Texniki göstəricilər",
      applications: "Tətbiq sahəsi",
      packaging: "Qablaşdırma",
      colors: "Rənglər",
      instructions: "Təlimatlar",
      gallery: "Qalereya",
      consultationCta: "Məsləhət almaq",
      consultationMessagePrefix:
        "Salam! Məhsul üzrə məsləhət almaq istəyirəm:",
    },
    notFound: {
      title: "Səhifə tapılmadı",
      text: "Ünvanı yoxlayın və ya Seller Group Azerbaijan-un əsas səhifəsinə qayıdın.",
    },
    footer: {
      description:
        "Rusiya və Türkiyədən tikinti və tamamlama materiallarının təchizatçısı.",
      contactTitle: "Bizimlə əlaqə saxlayın",
      workTitle: "İş qrafiki",
      workDays: "Bazar ertəsi — Şənbə",
      workHours: "09:00–18:00",
      navigationTitle: "Naviqasiya",
      socialTitle: "Biz şəbəkədə",
      brandTagline: "Təmir-tikinti materiallarının rəsmi təchizatçısı",
      socialDescriptions: {
        whatsapp: "WhatsApp-da yazın",
        telegram: "Telegram-da yazın",
        max: "MAX-da yazın",
        email: "E-poçt göndərin",
      },
      socialAria: {
        max: "Seller Group Azerbaijan ilə MAX vasitəsilə əlaqə saxlayın",
      },
      bottomRight: "Bütün hüquqlar qorunur.",
      rights: "Bütün hüquqlar qorunur.",
      nav: [
        { label: "Əsas səhifə", href: "/" },
        { label: "Şirkət", href: "/#about" },
        { label: "Brendlər", href: "/#brands" },
        { label: "Məhsullar", href: "/catalog" },
        { label: "Xidmətlər", href: "/#services" },
        { label: "Əlaqə", href: "/#contacts" },
      ],
    },
  },
};

export function getBrandById(id) {
  return brands.find((brand) => brand.id === id);
}

export function getProductById(idOrSlug) {
  return products.find((product) => product.id === idOrSlug || product.slug === idOrSlug);
}

export function getProductsByBrandId(brandId) {
  return products.filter((product) => product.brandId === brandId);
}

export function getLocalizedBrand(brand, language) {
  const name = brand[`name_${language}`] ?? brand.name ?? brand.displayName;

  return {
    id: brand.id,
    name,
    displayName: name,
    country: brand[`country_${language}`],
    category: brand[`category_${language}`],
    description: brand[`description_${language}`],
    advantages: brand[`advantages_${language}`],
  };
}

export function getLocalizedProduct(product, language) {
  const purposeLabels = (product.purposeKeys ?? []).map((purposeKey) =>
    getCatalogOptionLabel("purposes", purposeKey, language),
  );
  const surfaceTypes = (product.surfaces ?? []).map((surfaceKey) =>
    getCatalogOptionLabel("surfaces", surfaceKey, language),
  );

  return {
    title: product[`name_${language}`],
    shortDescription: product[`shortDescription_${language}`],
    description: product[`description_${language}`] ?? product[`shortDescription_${language}`],
    category: getCatalogOptionLabel("categories", product.category, language),
    type: getCatalogOptionLabel("productTypes", product.type, language),
    purpose: product[`purpose_${language}`] ?? purposeLabels.join(", "),
    purposeLabels,
    application: product[`application_${language}`],
    surfaceTypes,
    volumeOptions: product.volumeOptions ?? [],
    unit: product.unit ? getCatalogOptionLabel("units", product.unit, language) : "",
    sizeLabel: (product.volumeOptions ?? []).join(", "),
    advantages: product[`advantages_${language}`] ?? [],
    usage: product[`usage_${language}`] ?? product[`application_${language}`],
    characteristics: product[`characteristics_${language}`] ?? [],
    contactText: product[`contactText_${language}`] ?? product[`description_${language}`],
    packaging: product.volumeOptions ?? [],
  };
}
