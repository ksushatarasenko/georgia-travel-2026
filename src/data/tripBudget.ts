/**
 * Trip budget for family 2+1 (Оксана, Марина, Кирилл).
 * Base currency: GEL. Amounts are approximate travel estimates.
 */

export type BudgetCategoryId =
  | 'hotel-simpatia'
  | 'food'
  | 'transport'
  | 'excursions'
  | 'shopping'
  | 'souvenirs'
  | 'reserve'

export type BudgetCurrency = 'GEL' | 'PLN' | 'UAH' | 'USD'

export interface BudgetCategoryMeta {
  id: BudgetCategoryId
  label: string
  icon: string
  accent: string
  bar: string
}

export interface TripBudgetLine {
  id: string
  categoryId: BudgetCategoryId
  title: string
  note?: string
  /** Amount in GEL */
  amountGel: number
  paid: boolean
}

/**
 * Approximate rates for offline converter (mid-2026).
 * Always shown as estimates — not live bank rates.
 *
 * Anchors: ≈1 USD = 2.63 GEL · ≈1 GEL = 1.44 PLN · ≈1 GEL = 17.1 UAH
 */
export const approximateRates = {
  asOfLabel: 'ориентировочно, лето 2026',
  disclaimer:
    'Курсы приблизительные. Реальный обмен в банке, обменнике или приложении может отличаться.',
  /** How many units of currency for 1 GEL */
  fromGel: {
    GEL: 1,
    PLN: 1.44,
    UAH: 17.1,
    USD: 0.38,
  } satisfies Record<BudgetCurrency, number>,
}

export const budgetCategories: readonly BudgetCategoryMeta[] = [
  {
    id: 'hotel-simpatia',
    label: 'Hotel Simpatia',
    icon: '🏨',
    accent: 'bg-violet-50 text-violet-800',
    bar: 'bg-violet-600',
  },
  {
    id: 'food',
    label: 'Еда',
    icon: '🍽',
    accent: 'bg-orange-50 text-orange-800',
    bar: 'bg-orange-500',
  },
  {
    id: 'transport',
    label: 'Транспорт',
    icon: '🚌',
    accent: 'bg-amber-50 text-amber-900',
    bar: 'bg-amber-500',
  },
  {
    id: 'excursions',
    label: 'Экскурсии',
    icon: '🎟',
    accent: 'bg-sky-50 text-sky-800',
    bar: 'bg-sky-600',
  },
  {
    id: 'shopping',
    label: 'Покупки',
    icon: '🛒',
    accent: 'bg-fuchsia-50 text-fuchsia-800',
    bar: 'bg-fuchsia-500',
  },
  {
    id: 'souvenirs',
    label: 'Сувениры',
    icon: '🎁',
    accent: 'bg-pink-50 text-pink-800',
    bar: 'bg-pink-500',
  },
  {
    id: 'reserve',
    label: 'Резерв',
    icon: '🛟',
    accent: 'bg-emerald-50 text-emerald-800',
    bar: 'bg-emerald-600',
  },
]

export const tripBudgetLines: readonly TripBudgetLine[] = [
  {
    id: 'hotel-simpatia',
    categoryId: 'hotel-simpatia',
    title: 'Hotel Simpatia · 6 ночей',
    note: 'Кобулети, ул. Тамар Мепе, 122 · завтрак включён',
    amountGel: 1152,
    paid: true,
  },
  {
    id: 'food-meals',
    categoryId: 'food',
    title: 'Обеды и ужины на семью',
    note: 'Ориентир на дни в Кобулети, Батуми и Кутаиси',
    amountGel: 900,
    paid: false,
  },
  {
    id: 'food-coffee',
    categoryId: 'food',
    title: 'Кофе, вода, перекусы',
    amountGel: 120,
    paid: false,
  },
  {
    id: 'transport-local',
    categoryId: 'transport',
    title: 'Маршрутки и Bolt по Аджарии',
    note: 'Батуми, Шекветили, городские поездки',
    amountGel: 180,
    paid: false,
  },
  {
    id: 'transport-kutaisi-kobuleti',
    categoryId: 'transport',
    title: 'Кутаиси ↔ Кобулети',
    note: 'Туда и обратно · семья 2+1',
    amountGel: 120,
    paid: false,
  },
  {
    id: 'transport-airport-bolts',
    categoryId: 'transport',
    title: 'Bolt в аэропорту Кутаиси',
    amountGel: 60,
    paid: false,
  },
  {
    id: 'exc-prometheus',
    categoryId: 'excursions',
    title: 'Пещера Прометея',
    note: 'Билеты + запас на лодку',
    amountGel: 160,
    paid: false,
  },
  {
    id: 'exc-martvili',
    categoryId: 'excursions',
    title: 'Каньон Мартвили',
    note: 'Билеты + лодочная прогулка',
    amountGel: 170,
    paid: false,
  },
  {
    id: 'exc-argo',
    categoryId: 'excursions',
    title: 'Канатная дорога «Арго»',
    note: 'Туда-обратно на семью',
    amountGel: 90,
    paid: false,
  },
  {
    id: 'exc-gomis',
    categoryId: 'excursions',
    title: 'Гомис-Мта',
    note: 'Экскурсия Travel Batumi · 2 взр. + ребёнок',
    amountGel: 395,
    paid: true,
  },
  {
    id: 'shopping-market',
    categoryId: 'shopping',
    title: 'Рынок и продукты',
    amountGel: 80,
    paid: false,
  },
  {
    id: 'souvenirs-family',
    categoryId: 'souvenirs',
    title: 'Сувениры и чурчхела',
    amountGel: 60,
    paid: false,
  },
  {
    id: 'reserve-airport-hotel',
    categoryId: 'reserve',
    title: 'Ночь у аэропорта Кутаиси',
    note: 'Europa Hotel · трансфер в аэропорт',
    amountGel: 200,
    paid: false,
  },
  {
    id: 'reserve-buffer',
    categoryId: 'reserve',
    title: 'Подушка на непредвиденное',
    note: 'Погода, такси, доп. билеты, мелочи',
    amountGel: 300,
    paid: false,
  },
]

export const currencyMeta: Record<
  BudgetCurrency,
  { label: string; symbol: string; flag: string }
> = {
  GEL: { label: 'Лари', symbol: '₾', flag: '🇬🇪' },
  PLN: { label: 'Злотые', symbol: 'zł', flag: '🇵🇱' },
  UAH: { label: 'Гривны', symbol: '₴', flag: '🇺🇦' },
  USD: { label: 'Доллары', symbol: '$', flag: '🇺🇸' },
}

export function gelTo(amountGel: number, currency: BudgetCurrency): number {
  return amountGel * approximateRates.fromGel[currency]
}

export function toGel(amount: number, currency: BudgetCurrency): number {
  const rate = approximateRates.fromGel[currency]
  return rate === 0 ? 0 : amount / rate
}

export function convertAmount(
  amount: number,
  from: BudgetCurrency,
  to: BudgetCurrency,
): number {
  return gelTo(toGel(amount, from), to)
}

export function formatMoney(amount: number, currency: BudgetCurrency): string {
  const rounded =
    currency === 'UAH' ? Math.round(amount) : Math.round(amount * 10) / 10
  const formatted = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: currency === 'UAH' ? 0 : 1,
    minimumFractionDigits: currency === 'UAH' ? 0 : amount % 1 === 0 ? 0 : 1,
  }).format(rounded)
  return `${formatted} ${currencyMeta[currency].symbol}`
}

export function sumLines(
  lines: readonly TripBudgetLine[],
  predicate?: (line: TripBudgetLine) => boolean,
): number {
  return lines
    .filter(predicate ?? (() => true))
    .reduce((sum, line) => sum + line.amountGel, 0)
}

export function sumByCategory(
  lines: readonly TripBudgetLine[],
): Record<BudgetCategoryId, number> {
  const result = Object.fromEntries(
    budgetCategories.map((category) => [category.id, 0]),
  ) as Record<BudgetCategoryId, number>

  for (const line of lines) {
    result[line.categoryId] += line.amountGel
  }
  return result
}
