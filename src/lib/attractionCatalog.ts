import type { AttractionCatalogEntry, TripEvent } from '../types/data'

/** Events that own a full reusable location page (single source of truth). */
export function isAttractionCatalogEvent(event: TripEvent): boolean {
  if (event.attractionDetails || event.eveningCityDetails) return true

  // Curated guide pages that are also "places to visit"
  return (
    event.id === 'event-day-03-sea' || event.id === 'event-day-03-promenade'
  )
}

export function toAttractionCatalogEntry(
  event: TripEvent,
): AttractionCatalogEntry {
  if (event.eveningCityDetails) {
    return {
      id: event.id,
      eventId: event.id,
      dayId: event.dayId,
      title: event.title,
      description: event.description,
      image: event.image,
      icon: event.icon,
      category: 'evening',
      categoryLabel: 'Вечерняя прогулка',
      duration: event.duration || undefined,
      price: event.price || undefined,
      href: `/trip/event/${event.id}`,
    }
  }

  if (event.id === 'event-day-03-sea' || event.id === 'event-day-03-promenade') {
    return {
      id: event.id,
      eventId: event.id,
      dayId: event.dayId,
      title: event.title,
      description: event.description,
      image: event.image,
      icon: event.icon,
      category: 'attraction',
      categoryLabel: event.id === 'event-day-03-sea' ? 'Пляж' : 'Набережная',
      duration: event.duration || undefined,
      price: event.price || undefined,
      href: `/trip/event/${event.id}`,
    }
  }

  return {
    id: event.id,
    eventId: event.id,
    dayId: event.dayId,
    title: event.title,
    description: event.description,
    image: event.image,
    icon: event.icon,
    category: 'attraction',
    categoryLabel: 'Достопримечательность',
    duration: event.duration || undefined,
    price: event.price || undefined,
    href: `/trip/event/${event.id}`,
  }
}

export function buildAttractionCatalog(
  events: readonly TripEvent[],
): AttractionCatalogEntry[] {
  return events
    .filter(isAttractionCatalogEvent)
    .map(toAttractionCatalogEntry)
}
