export interface TripChecklistItem {
  id: string
  label: string
  /** Short assistant tip under the checkbox label */
  note?: string
}

export interface TripChecklistGroup {
  id: string
  title: string
  items: TripChecklistItem[]
}

export interface TripChecklistTab {
  id: string
  title: string
  shortTitle: string
  icon: string
  /** When this list matters on the trip */
  when: string
  /** Assistant intro for the tab */
  intro: string
  tip: string
  groups: TripChecklistGroup[]
}

/**
 * Personalized offline checklist for:
 * Познань → Кутаиси → Кобулети → Кутаиси → Познань
 * (семья: Оксана, Марина, Кирилл)
 */
export const tripChecklistTabs: readonly TripChecklistTab[] = [
  {
    id: 'before-poznan',
    title: 'Перед выездом из Познани',
    shortTitle: 'Познань',
    icon: '✈️',
    when: 'Утро вылета · 25 августа',
    intro:
      'Последний час дома и дорога в аэропорт Познани. Если пункт отмечен — можно не держать его в голове.',
    tip: 'Посадочные талоны скачайте заранее и откройте офлайн — в аэропорту связь может подвести.',
    groups: [
      {
        id: 'docs',
        title: 'Документы',
        items: [
          {
            id: 'poz-passports',
            label: 'Паспорта Оксаны, Марины и Кирилла',
            note: 'Проверьте сроки действия ещё раз.',
          },
          {
            id: 'poz-boarding',
            label: 'Посадочные талоны скачаны и доступны офлайн',
          },
          {
            id: 'poz-insurance',
            label: 'Страховка сохранена в телефоне / распечатана',
          },
          {
            id: 'poz-booking',
            label: 'Подтверждение авиабилета под рукой',
          },
          {
            id: 'poz-child-docs',
            label: 'Документы ребёнка (если нужны отдельно)',
          },
        ],
      },
      {
        id: 'money-tech',
        title: 'Деньги и техника',
        items: [
          {
            id: 'poz-cards',
            label: 'Банковские карты с собой',
            note: 'Сообщите банку о поездке в Грузию, если ещё не сделали.',
          },
          {
            id: 'poz-cash',
            label: 'Немного наличных на экстренный случай',
          },
          {
            id: 'poz-phones',
            label: 'Телефоны заряжены на 100%',
          },
          {
            id: 'poz-powerbank',
            label: 'Пауэрбанк заряжен',
          },
          {
            id: 'poz-chargers',
            label: 'Зарядки и кабели в ручной клади',
          },
        ],
      },
      {
        id: 'leave-home',
        title: 'Выход из дома',
        items: [
          {
            id: 'poz-bolt',
            label: 'Трансфер / Bolt в аэропорт Познани заказан',
            note: 'Заложите запас времени на пробки.',
          },
          {
            id: 'poz-cabin-size',
            label: 'Ручная кладь проверена по размеру',
            note: 'Ориентир Wizz: 40 × 30 × 20 см.',
          },
          {
            id: 'poz-app-offline',
            label: 'Приложение Georgia Travel открывается офлайн',
          },
          {
            id: 'poz-home',
            label: 'Дом закрыт: окна, вода, техника',
          },
          {
            id: 'poz-keys',
            label: 'Ключи от дома у того, кто остаётся / в надёжном месте',
          },
        ],
      },
    ],
  },

  {
    id: 'packing',
    title: 'Что взять с собой',
    shortTitle: 'Вещи',
    icon: '🎒',
    when: 'Сборы дома · до вылета',
    intro:
      'Список под эту поездку: море в Кобулети, Батуми, магнитный пляж и день в горах Гомис-Мта.',
    tip: 'Горный день прохладнее моря — лёгкая кофта пригодится даже в конце августа.',
    groups: [
      {
        id: 'family-common',
        title: 'Общее для семьи',
        items: [
          {
            id: 'pack-docs-folder',
            label: 'Папка с документами в ручной клади',
          },
          {
            id: 'pack-chargers',
            label: 'Зарядки, кабели, пауэрбанк',
          },
          {
            id: 'pack-adapter',
            label: 'Переходник / зарядка EU (в Грузии розетки как в Европе)',
          },
          {
            id: 'pack-spf',
            label: 'Крем SPF 50 (до 100 мл в ручную кладь)',
          },
          {
            id: 'pack-hats',
            label: 'Головные уборы от солнца',
          },
          {
            id: 'pack-sunglasses',
            label: 'Солнцезащитные очки',
          },
          {
            id: 'pack-sandals',
            label: 'Шлёпанцы / сандалии для пляжа',
          },
          {
            id: 'pack-shoes-pebble',
            label: 'Обувь для галечного пляжа (сланцы / аквашузы)',
            note: 'В Кобулети берег галечный — босиком бывает неудобно.',
          },
          {
            id: 'pack-sneakers',
            label: 'Удобная обувь для прогулок и гор',
          },
          {
            id: 'pack-jacket',
            label: 'Лёгкая кофта / ветровка на Гомис-Мта',
          },
          {
            id: 'pack-daypack',
            label: 'Небольшой рюкзак на дневные выезды',
          },
          {
            id: 'pack-water',
            label: 'Бутылка для воды',
          },
          {
            id: 'pack-snacks',
            label: 'Перекус для Кирилла в самолёт и маршрутки',
          },
          {
            id: 'pack-maps',
            label: 'Organic Maps скачан офлайн (Кутаиси, Кобулети, Батуми)',
          },
          {
            id: 'pack-bolt',
            label: 'Приложение Bolt установлено и готово к работе',
          },
          {
            id: 'pack-meds',
            label: 'Аптечка собрана (см. вкладку «Аптечка»)',
          },
        ],
      },
      {
        id: 'kirill',
        title: 'Кирилл',
        items: [
          { id: 'kirill-underwear', label: 'Трусы — 5 шт' },
          { id: 'kirill-socks', label: 'Носки — 2 пары' },
          { id: 'kirill-swimwear', label: 'Плавки' },
          { id: 'kirill-tshirts', label: 'Футболки — 4 шт' },
          { id: 'kirill-shorts', label: 'Шорты — 3 шт' },
          { id: 'kirill-trousers', label: 'Штаны — 1 шт' },
          { id: 'kirill-sweater', label: 'Кофта' },
          { id: 'kirill-toothbrush', label: 'Зубная щётка' },
          { id: 'kirill-toy', label: 'Любимая игрушка / планшет с мультиками офлайн' },
        ],
      },
      {
        id: 'oksana',
        title: 'Оксана',
        items: [
          { id: 'oksana-underwear', label: 'Трусы — 3 шт' },
          { id: 'oksana-swimwear', label: 'Купальник' },
          { id: 'oksana-socks', label: 'Носки — 1 пара' },
          { id: 'oksana-pareo', label: 'Парео' },
          { id: 'oksana-trousers', label: 'Штаны — 2 шт' },
          { id: 'oksana-cycling-shorts', label: 'Велосипедки — 2 шт' },
          { id: 'oksana-tshirts', label: 'Футболки — 3 шт' },
          { id: 'oksana-toothbrush', label: 'Зубная щётка' },
        ],
      },
      {
        id: 'marina',
        title: 'Марина',
        items: [
          { id: 'marina-underwear', label: 'Бельё на все дни поездки' },
          { id: 'marina-swimwear', label: 'Купальник' },
          { id: 'marina-clothes-day', label: 'Одежда на море и город (футболки, шорты / юбки)' },
          { id: 'marina-clothes-evening', label: '1–2 комплекта для ужина / вечера' },
          { id: 'marina-shoes', label: 'Удобная обувь + пляжная' },
          { id: 'marina-hygiene', label: 'Гигиена и зубная щётка' },
          { id: 'marina-tech', label: 'Телефон, зарядка, наушники' },
        ],
      },
    ],
  },

  {
    id: 'medkit',
    title: 'Аптечка',
    shortTitle: 'Аптечка',
    icon: '💊',
    when: 'Сборы · держать в ручной клади',
    intro:
      'Семейная аптечка под море, жару, еду и горный день. Берите только то, что вам подходит.',
    tip: 'Флуцинар — только при наличии назначения врача. Остальное кладите в один зип-пакет сверху в рюкзаке.',
    groups: [
      {
        id: 'meds',
        title: 'Лекарства',
        items: [
          { id: 'med-pancreatin', label: 'Панкреатин' },
          { id: 'med-dih', label: 'DIH Maxi' },
          { id: 'med-nospa', label: 'Но-шпа / Дротаверин' },
          { id: 'med-paracetamol', label: 'Парацетамол' },
          { id: 'med-ibuprofen', label: 'Ибупрофен' },
          { id: 'med-charcoal', label: 'Активированный уголь' },
          { id: 'med-diarrhea', label: 'Средство от поноса' },
          { id: 'med-rehydron', label: 'Регидрон' },
          { id: 'med-antihistamine', label: 'Антигистаминное' },
          {
            id: 'med-flucinar',
            label: 'Флуцинар (при наличии назначения врача)',
          },
        ],
      },
      {
        id: 'care',
        title: 'Уход и первая помощь',
        items: [
          { id: 'med-plaster', label: 'Пластырь' },
          { id: 'med-bandage', label: 'Бинт' },
          { id: 'med-antiseptic', label: 'Антисептик' },
          { id: 'med-mosquito', label: 'Средство от комаров' },
          { id: 'med-after-bite', label: 'Средство после укусов' },
        ],
      },
    ],
  },

  {
    id: 'buy-before',
    title: 'Купить перед поездкой',
    shortTitle: 'Купить',
    icon: '🛒',
    when: 'За 1–3 дня до вылета',
    intro:
      'То, что удобнее купить дома в Познани, а не искать в аэропорту или в первый вечер в Кутаиси.',
    tip: 'В Грузии многое есть, но привычные лекарства и SPF лучше взять с собой.',
    groups: [
      {
        id: 'buy-must',
        title: 'Обязательно проверить',
        items: [
          {
            id: 'buy-spf',
            label: 'Крем SPF 50 (если закончился)',
          },
          {
            id: 'buy-mosquito',
            label: 'Средство от комаров (если нет в аптечке)',
          },
          {
            id: 'buy-meds-refill',
            label: 'Докупить лекарства из вкладки «Аптечка»',
          },
          {
            id: 'buy-zip',
            label: 'Зип-пакеты для жидкостей в ручной клади',
          },
          {
            id: 'buy-travel-size',
            label: 'Тревел-размер шампуня / геля (до 100 мл)',
          },
          {
            id: 'buy-snacks',
            label: 'Перекусы для Кирилла в дорогу',
          },
          {
            id: 'buy-powerbank',
            label: 'Пауэрбанк (если своего нет или слабый)',
          },
          {
            id: 'buy-swim-shoes',
            label: 'Аквашузы / сланцы для гальки',
          },
        ],
      },
      {
        id: 'buy-optional',
        title: 'По желанию',
        items: [
          {
            id: 'buy-cash-pln',
            label: 'Небольшая сумма наличных на дорогу до аэропорта',
          },
          {
            id: 'buy-sim-note',
            label: 'Запас лари не обязателен — SIM Magti и обмен на месте',
            note: 'В Кутаиси в первый день есть банкомат и Magti.',
          },
          {
            id: 'buy-book',
            label: 'Книга / наушники для самолёта и маршрутки',
          },
          {
            id: 'buy-wet-wipes',
            label: 'Влажные салфетки и мини-антисептик',
          },
        ],
      },
    ],
  },

  {
    id: 'leave-simpatia',
    title: 'Перед выездом из Hotel Simpatia',
    shortTitle: 'Simpatia',
    icon: '🏨',
    when: '2 сентября · выселение до 12:00',
    intro:
      'Прощальный день у моря: сдали номер, забрали багаж и едете маршруткой в Кутаиси к отелю у аэропорта.',
    tip: 'Лучше пройтись по комнатам с телефоном-фонариком — зарядки часто остаются в розетках.',
    groups: [
      {
        id: 'simpatia-docs',
        title: 'Документы и деньги',
        items: [
          {
            id: 'sim-passports',
            label: 'Паспорта и бронь/посадочные на вылет',
          },
          {
            id: 'sim-cash',
            label: 'Наличные лари на маршрутку и ужин',
            note: 'Ориентир: маршрутка Кобулети → Кутаиси примерно 15–25 ₾ с человека.',
          },
          {
            id: 'sim-hotel-next',
            label: 'Адрес Europa Hotel Kutaisi сохранён офлайн',
          },
          {
            id: 'sim-phone-hotel',
            label: 'Телефон отеля у аэропорта записан',
            note: '+995 596 966 966',
          },
        ],
      },
      {
        id: 'simpatia-room',
        title: 'Номер и багаж',
        items: [
          {
            id: 'sim-chargers',
            label: 'Зарядки, адаптеры, пауэрбанк собраны',
          },
          {
            id: 'sim-meds',
            label: 'Лекарства и документы ребёнка в ручной клади',
          },
          {
            id: 'sim-safe',
            label: 'Сейф, ванная и балкон пустые',
          },
          {
            id: 'sim-wet',
            label: 'Мокрые купальники в герметичном пакете',
          },
          {
            id: 'sim-souvenirs',
            label: 'Сувениры упакованы, стекло — в багаж',
          },
          {
            id: 'sim-key',
            label: 'Ключ / карта номера сданы на ресепшен',
          },
          {
            id: 'sim-luggage',
            label: 'Багаж забран с ресепшена перед маршруткой',
          },
          {
            id: 'sim-bill',
            label: 'Счёт проверен (мини-бар / доплаты)',
          },
        ],
      },
    ],
  },

  {
    id: 'before-kutaisi-flight',
    title: 'Перед вылетом из Кутаиси',
    shortTitle: 'Вылет',
    icon: '🛫',
    when: 'Утро 3 сентября · аэропорт Кутаиси',
    intro:
      'Последний отрезок: отель у аэропорта → регистрация → Познань. Спокойно и без гонки.',
    tip: 'Трансфер от Europa Hotel бесплатный — подтвердите время накануне вечером.',
    groups: [
      {
        id: 'kut-morning',
        title: 'Утро в отеле',
        items: [
          {
            id: 'kut-transfer',
            label: 'Время трансфера в аэропорт подтверждено',
          },
          {
            id: 'kut-alarm',
            label: 'Будильник с запасом на сборы',
          },
          {
            id: 'kut-checkout',
            label: 'Выселение из отеля у аэропорта оформлено',
          },
          {
            id: 'kut-breakfast',
            label: 'Лёгкий завтрак / вода перед выездом',
          },
        ],
      },
      {
        id: 'kut-docs-bags',
        title: 'Документы и багаж',
        items: [
          {
            id: 'kut-passports',
            label: 'Паспорта всех троих под рукой',
          },
          {
            id: 'kut-boarding',
            label: 'Посадочные талоны на рейс в Познань',
          },
          {
            id: 'kut-liquids',
            label: 'Жидкости в ручной клади — в зип-пакете до 100 мл',
          },
          {
            id: 'kut-weight',
            label: 'Вес багажа проверен (сувениры сверху)',
          },
          {
            id: 'kut-chargers',
            label: 'Зарядки в ручной клади, не в сдаваемом чемодане',
          },
          {
            id: 'kut-forbidden',
            label: 'Нет запрещённых предметов в ручной клади',
          },
        ],
      },
      {
        id: 'kut-airport',
        title: 'В аэропорту',
        items: [
          {
            id: 'kut-early',
            label: 'Прибытие в аэропорт с запасом 2–3 часа',
          },
          {
            id: 'kut-checkin',
            label: 'Регистрация и сдача багажа пройдены',
          },
          {
            id: 'kut-security',
            label: 'Досмотр пройден, выход на рейс известен',
          },
          {
            id: 'kut-phones',
            label: 'Телефоны заряжены до посадки',
          },
          {
            id: 'kut-child',
            label: 'Перекус и вода для Кирилла после досмотра',
          },
          {
            id: 'kut-lari',
            label: 'Остаток лари потрачен или оставлен на память',
            note: 'Крупные суммы лучше не везти без нужды.',
          },
        ],
      },
    ],
  },
]

export const tripChecklistStorageKey = 'georgia-travel-2026:trip-checklist'

export function flattenChecklistItems(
  tabs: readonly TripChecklistTab[] = tripChecklistTabs,
): TripChecklistItem[] {
  return tabs.flatMap((tab) => tab.groups.flatMap((group) => group.items))
}
