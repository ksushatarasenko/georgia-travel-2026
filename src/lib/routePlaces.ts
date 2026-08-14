import type {
  RoutePlaceBadge,
  RoutePlaceCard,
  RoutePlaceCategory,
  RoutePlaceSource,
  TripEvent,
} from '../types/data'
import { routePlaceSources } from '../data/places'

export const ROUTE_PLACE_CATEGORIES: {
  value: RoutePlaceCategory
  label: string
  icon: string
}[] = [
  { value: 'attraction', label: 'Достопримечательности', icon: '🏛' },
  { value: 'beach', label: 'Пляжи', icon: '🏖' },
  { value: 'mountain', label: 'Горы', icon: '🌄' },
  { value: 'waterfall', label: 'Водопады', icon: '💦' },
  { value: 'cafe', label: 'Кафе', icon: '🍽' },
  { value: 'restaurant', label: 'Рестораны', icon: '🍷' },
  { value: 'shopping', label: 'Покупки', icon: '🛍' },
  { value: 'evening', label: 'Вечерние прогулки', icon: '🌅' },
  { value: 'transport', label: 'Транспорт', icon: '🚍' },
  { value: 'airport', label: 'Аэропорт', icon: '✈' },
]

export const ROUTE_PLACE_BADGE_LABELS: Record<RoutePlaceBadge, string> = {
  free: 'Бесплатно',
  family: 'Для семьи',
  'best-photo': 'Лучшие фото',
  sunset: 'Закат',
  swim: 'Купание',
  marshrutka: 'Маршрутка',
  bolt: 'Bolt',
  walk: 'Пешком',
}

const categoryMeta = Object.fromEntries(
  ROUTE_PLACE_CATEGORIES.map((item) => [item.value, item]),
) as Record<RoutePlaceCategory, (typeof ROUTE_PLACE_CATEGORIES)[number]>

function stripLeadingEmoji(title: string): string {
  return title
    .replace(/^[\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0F\s]+/u, '')
    .trim()
}

function sanitizePrice(raw?: string | null): string | undefined {
  if (!raw) return undefined
  const trimmed = raw.trim()
  if (!trimmed) return undefined
  if (/^будут?\s+обновлено$/i.test(trimmed) || /^todo\b/i.test(trimmed)) {
    return undefined
  }

  const parts = trimmed
    .split('·')
    .map((part) => part.trim())
    .filter((part) => part.length > 0 && !/TODO/i.test(part))

  if (parts.length === 0) return undefined
  return parts.join(' · ')
}

function priceFromAttraction(event: TripEvent): string | undefined {
  const tickets = event.attractionDetails?.ticketPrices
  if (!tickets?.length) return undefined
  const adult = tickets.find((item) => item.value)
  return adult?.value ? `вход ${adult.value}` : undefined
}

function ratingFromEvent(event: TripEvent): number | undefined {
  const cards = event.guideDetails?.placeCards ?? []
  for (const card of cards) {
    if (typeof card.rating === 'number') return card.rating
  }
  return undefined
}

function familyFromEvent(event: TripEvent): boolean {
  return (event.guideDetails?.placeCards ?? []).some(
    (card) => card.familyFriendly === true,
  )
}

function resolvePrice(event: TripEvent): string | undefined {
  return (
    sanitizePrice(event.price) ??
    priceFromAttraction(event) ??
    undefined
  )
}

function resolveBadges(
  source: RoutePlaceSource,
  event: TripEvent,
  price?: string,
): RoutePlaceBadge[] {
  const set = new Set<RoutePlaceBadge>(source.badges ?? [])

  if (familyFromEvent(event)) set.add('family')
  if (price && /бесплатн/i.test(price)) set.add('free')

  return Array.from(set)
}

export function resolveRoutePlace(
  source: RoutePlaceSource,
  event: TripEvent,
): RoutePlaceCard {
  const meta = categoryMeta[source.category]
  const price = resolvePrice(event)
  const rating = source.rating ?? ratingFromEvent(event)

  return {
    id: source.id,
    eventId: source.eventId,
    dayId: event.dayId,
    title: stripLeadingEmoji(event.title) || event.title,
    description: event.description,
    image: event.image,
    icon: event.icon,
    category: source.category,
    categoryLabel: meta.label,
    categoryIcon: meta.icon,
    duration: event.duration || undefined,
    price,
    rating,
    badges: resolveBadges(source, event, price),
    href: `/trip/event/${source.eventId}`,
  }
}

export function buildRoutePlaceCatalog(
  events: readonly TripEvent[],
  sources: readonly RoutePlaceSource[] = routePlaceSources,
): RoutePlaceCard[] {
  const byId = new Map(events.map((event) => [event.id, event]))

  return sources.flatMap((source) => {
    const event = byId.get(source.eventId)
    if (!event || event.isPlaceholder) {
      if (import.meta.env.DEV) {
        console.warn(
          `[places] пропуск «${source.id}»: событие ${source.eventId} не найдено`,
        )
      }
      return []
    }
    if (!event.image && !event.description) return []
    return [resolveRoutePlace(source, event)]
  })
}
