export interface ShoppingItem {
  id: string
  /** Простой пункт — одна строка */
  label: string
  /** Расширенная карточка (раздел «Купить домой») */
  quantity?: string
  priceGel?: string
  pricePln?: string
  description?: string
  transportBadge?: string
  transportNote?: string
  /** Расширенная карточка (раздел «Попробовать») */
  taste?: string
  whyTry?: string
  tip?: string
  /** Подпись для tip: «Что попробовать» или «Совет» */
  tipLabel?: 'try' | 'advice'
}

export interface ShoppingGroup {
  id: string
  title: string
  icon: string
  /** Подпись отмеченного пункта */
  checkLabel: string
  /** Подсказка над списком */
  hint?: string
  items: ShoppingItem[]
}

export const tripShoppingStorageKey = 'georgia-travel-2026:trip-shopping'

/** Курс для справки: 1 ₾ = 1,45 PLN */
export const gelToPlnRate = 1.45

export const tripShoppingGroups: readonly ShoppingGroup[] = [
  {
    id: 'take-home',
    title: 'Обязательно купить домой',
    icon: '⭐',
    checkLabel: 'Куплено',
    hint: '✈️ Все продукты в этом списке — сухие и подходят для перевозки в личной вещи. Лучше покупать их в герметичной упаковке с названием продукта.',
    items: [
      {
        id: 'adjika',
        label: '🌶️ Сухая аджика',
        quantity: '400 г',
        priceGel: '12–20 ₾',
        pricePln: '17–29 zł',
        description:
          'Сухая острая грузинская смесь специй для мяса, картофеля, овощей, супов, маринадов и домашних соусов.',
        transportBadge: 'Можно перевозить в личной вещи',
        transportNote: 'Лучше купить в герметичной упаковке с названием продукта.',
      },
      {
        id: 'svan-salt',
        label: '🧂 Сванская соль',
        quantity: '400 г',
        priceGel: '8–15 ₾',
        pricePln: '12–22 zł',
        description:
          'Ароматная грузинская соль со смесью специй. Используется вместо обычной соли для мяса, рыбы, картофеля и овощей.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
      {
        id: 'utskho-suneli',
        label: '🌿 Уцхо-сунели',
        quantity: '100 г',
        priceGel: '4–8 ₾',
        pricePln: '6–12 zł',
        description:
          'Грузинская специя из голубого пажитника с мягким ореховым ароматом. Для аджики, соусов, лобио и мясных блюд.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
      {
        id: 'khmeli-suneli',
        label: '🌿 Хмели-сунели',
        quantity: '100 г',
        priceGel: '4–8 ₾',
        pricePln: '6–12 zł',
        description:
          'Популярная грузинская смесь сушёных трав и специй. Подходит для мяса, курицы, фасоли, супов и соусов.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
      {
        id: 'coriander',
        label: '🌰 Молотый кориандр',
        quantity: '100 г',
        priceGel: '3–6 ₾',
        pricePln: '4–9 zł',
        description:
          'Молотые семена кориандра с тёплым пряным ароматом. Для мяса, рыбы, овощей, аджики и соусов.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
      {
        id: 'saffron',
        label: '🌼 Имеретинский шафран',
        quantity: '30–50 г',
        priceGel: '5–10 ₾',
        pricePln: '7–15 zł',
        description:
          'Грузинская специя из сушёных бархатцев — это не настоящий шафран. Для соусов, птицы, супов и других блюд.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
      {
        id: 'pepper',
        label: '🌶️ Сухой острый перец',
        quantity: '100 г',
        priceGel: '4–8 ₾',
        pricePln: '6–12 zł',
        description:
          'Сушёный острый перец или хлопья чили. Для аджики, мяса, соусов и блюд, где нужна острота.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
      {
        id: 'tklapi',
        label: '🍒 Тклапи',
        quantity: '2–4 листа',
        priceGel: '3–6 ₾',
        pricePln: '4–9 zł',
        description:
          'Тонкие высушенные листы фруктового пюре. Для соусов, супов и как кисло-сладкая закуска.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
      {
        id: 'persimmon',
        label: '🍑 Сушёная хурма',
        quantity: '300–500 г',
        priceGel: '15–25 ₾',
        pricePln: '22–36 zł',
        description:
          'Сладкая сушёная хурма — удобный грузинский съедобный сувенир.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
      {
        id: 'fig',
        label: '🍑 Сушёный инжир',
        quantity: '300–500 г',
        priceGel: '8–15 ₾',
        pricePln: '12–22 zł',
        description:
          'Сладкий сушёный фрукт. Хорош для перекуса, каши, выпечки и десертов.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
      {
        id: 'walnuts',
        label: '🥜 Грецкие орехи',
        quantity: '300–500 г',
        priceGel: '10–20 ₾',
        pricePln: '15–29 zł',
        description:
          'Местные грецкие орехи — для перекуса, выпечки, салатов, соусов и грузинских блюд.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
      {
        id: 'hazelnuts',
        label: '🥜 Фундук',
        quantity: '300–500 г',
        priceGel: '10–20 ₾',
        pricePln: '15–29 zł',
        description:
          'Грузинский фундук. Подходит для перекуса, выпечки и десертов.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
      {
        id: 'churchkhela',
        label: '🍬 Чурчхела',
        quantity: '2–4 шт.',
        priceGel: '4–8 ₾/шт.',
        pricePln: '6–12 zł/шт.',
        description:
          'Традиционная сладость — орехи в высушенном виноградном соке.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
      {
        id: 'tea',
        label: '🍵 Грузинский чай',
        quantity: '100–200 г',
        priceGel: '5–12 ₾',
        pricePln: '7–17 zł',
        description:
          'Местный листовой чай. Особенно интересен аджарский чай.',
        transportBadge: 'Можно перевозить в личной вещи',
      },
    ],
  },
  {
    id: 'kobuleti-self',
    title: 'Для себя в Кобулети',
    icon: '🏖️',
    checkLabel: 'Сделано',
    items: [
      { id: 'swimsuit', label: '👙 Женский раздельный купальник' },
      { id: 'beach-shirt', label: '👚 Белая пляжная рубашка до колен' },
      { id: 'hat', label: '👒 Красивая женская шляпа' },
      { id: 'flipflops', label: '🩴 Женские пляжные шлёпанцы' },
      { id: 'water-shoes', label: '👟 Коралки / обувь для моря' },
      { id: 'son-swim', label: '🩳 Плавки сыну' },
      { id: 'towel', label: '🏖️ Пляжное полотенце' },
      { id: 'mask', label: '🤿 Маска для ныряния' },
      {
        id: 'tent',
        label: '⛺ Палатка для пляжа — только если действительно нужна',
      },
      { id: 'shovels', label: '🏖️ Лопатки / копалки' },
    ],
  },
  {
    id: 'must-try',
    title: 'Обязательно попробовать',
    icon: '🍽️',
    checkLabel: 'Попробовали',
    items: [
      {
        id: 'khachapuri',
        label: '🧀 Аджарский хачапури',
        description:
          'Лодочка из теста с сыром, в центре которой запечённое яйцо и сливочное масло.',
        taste:
          'Горячий, очень сырный, с мягким тестом; яйцо и масло делают его особенно насыщенным.',
        whyTry: 'Одно из главных блюд Аджарии.',
        tip: 'Смешайте яйцо, масло и сыр с кусочками теста — так его едят правильно.',
      },
      {
        id: 'khinkali',
        label: '🥟 Хинкали',
        description:
          'Большие грузинские мешочки из теста с начинкой — обычно мясо, лук и специи.',
        taste: 'Сочные, мясные, внутри много горячего бульона.',
        whyTry: 'Классика грузинской кухни.',
        tip: 'Классические мясные хинкали; ешьте руками, сначала аккуратно выпейте бульон.',
      },
      {
        id: 'badrijani',
        label: '🍆 Бадриджани',
        description:
          'Обжаренные или запечённые рулетики из баклажана с начинкой из орехов, чеснока и грузинских специй.',
        taste:
          'Мягкий баклажан, ореховая и чесночная начинка, слегка пряный вкус.',
        tip: 'Вариант с грецким орехом.',
      },
      {
        id: 'lobio',
        label: '🫘 Лобио',
        description:
          'Традиционное блюдо из красной фасоли с луком, зеленью, специями и иногда грецкими орехами.',
        taste: 'Густое, сытное, пряное, с выраженным вкусом фасоли и специй.',
        tip: 'Классический лобио — часто подают с кукурузными лепёшками.',
      },
      {
        id: 'adjapsandali',
        label: '🍆 Аджапсандали',
        description:
          'Овощное блюдо из баклажанов, помидоров, сладкого перца, лука и зелени.',
        taste:
          'Мягкое, ароматное, овощное, с лёгкой кислинкой от помидоров.',
        tip: 'Попробуйте холодный или тёплый вариант.',
      },
      {
        id: 'chkmeruli',
        label: '🍗 Чкмерули',
        description:
          'Жареная курица в густом соусе из молока или сливок, чеснока и специй.',
        taste: 'Очень нежная курица и насыщенный чесночный сливочный соус.',
        tip: 'Обязательно с хлебом или лепёшкой, чтобы собирать соус.',
      },
      {
        id: 'barabulka',
        label: '🐟 Барабулька',
        description:
          'Небольшая морская рыба с нежным мясом, которую в Грузии часто жарят целиком.',
        taste:
          'Нежный, слегка сладковатый вкус свежей морской рыбы.',
        whyTry:
          'Чёрное море — отличное место, чтобы попробовать свежую барабульку.',
        tip: 'Лучше брать свежеприготовленную на месте.',
        tipLabel: 'advice',
      },
      {
        id: 'kephal',
        label: '🐟 Кефаль',
        description:
          'Морская рыба Чёрного моря — часто жарят или готовят на гриле.',
        taste: 'Плотное, нежное мясо с характерным морским вкусом.',
        whyTry:
          'Местная свежая рыба гораздо интереснее замороженной из магазина.',
        tip: 'Выбирайте свежую рыбу и готовьте на месте.',
        tipLabel: 'advice',
      },
      {
        id: 'shrimp',
        label: '🦐 Свежие креветки',
        description:
          'Свежие морские креветки — жареные, на гриле или с чесноком.',
        taste: 'Сочные, слегка сладковатые, с выраженным морским вкусом.',
        whyTry:
          'В Кобулети стоит попробовать именно свежие местные морепродукты.',
        tip: 'Берите там, где видно свежесть продукта и большой оборот.',
        tipLabel: 'advice',
      },
      {
        id: 'green-fig',
        label: '🍈 Свежий зелёный инжир',
        description:
          'Спелый инжир с зелёной кожицей и мягкой сладкой мякотью внутри.',
        taste: 'Очень сладкий, сочный, мягкий, с лёгкими фруктовыми нотами.',
        whyTry:
          'В сезон можно попробовать свежий местный инжир прямо с рынка.',
        tip: 'Выбирайте мягкий, но не повреждённый плод.',
        tipLabel: 'advice',
      },
    ],
  },
  {
    id: 'duty-free',
    title: 'Duty Free — аэропорт Кутаиси',
    icon: '✈️',
    checkLabel: 'Проверено',
    items: [
      { id: 'df-wine', label: '🍷 Посмотреть грузинское вино в Duty Free' },
      { id: 'df-chacha', label: '🥃 Посмотреть чачу / бренди / коньяк' },
      { id: 'df-cigarettes', label: '🚬 Сравнить цены на сигареты' },
      {
        id: 'df-alcohol-tip',
        label: '🛍️ Алкоголь брать после контроля, если цена окажется выгодной',
      },
    ],
  },
]

export function isTakeHomeItem(item: ShoppingItem): boolean {
  return Boolean(item.description && item.quantity && item.priceGel)
}

export function isMustTryItem(item: ShoppingItem): boolean {
  return Boolean(item.description && item.taste)
}

/** @deprecated use isTakeHomeItem */
export function isDetailedShoppingItem(item: ShoppingItem): boolean {
  return isTakeHomeItem(item)
}

export function flattenShoppingItems(
  groups: readonly ShoppingGroup[] = tripShoppingGroups,
): ShoppingItem[] {
  return groups.flatMap((group) => group.items)
}
