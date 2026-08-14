import type { RoutePlaceSource } from '../types/data'

/**
 * Central travel-guide index for «Места маршрута».
 *
 * Only references existing trip-event pages — title, description, photo,
 * duration and price are resolved from tripEvents (no content duplication).
 */
export const routePlaceSources: readonly RoutePlaceSource[] = [
  // 🏛 Достопримечательности
  {
    id: 'prometheus',
    eventId: 'event-day-02-prometheus',
    category: 'attraction',
    badges: ['family', 'best-photo'],
  },
  {
    id: 'argo',
    eventId: 'event-day-05-argo',
    category: 'attraction',
    badges: ['family', 'best-photo'],
  },
  {
    id: 'old-town',
    eventId: 'event-day-05-old-town',
    category: 'attraction',
    badges: ['free', 'family', 'walk'],
  },
  {
    id: 'boulevard',
    eventId: 'event-day-05-boulevard',
    category: 'attraction',
    badges: ['free', 'family', 'walk', 'best-photo'],
  },
  {
    id: 'fountains',
    eventId: 'event-day-05-fountains',
    category: 'attraction',
    badges: ['free', 'family', 'best-photo'],
  },
  {
    id: 'winery',
    eventId: 'event-day-07-winery',
    category: 'attraction',
    badges: ['family'],
  },

  // 🏖 Пляжи
  {
    id: 'kobuleti-first-sea',
    eventId: 'event-day-03-sea',
    category: 'beach',
    badges: ['free', 'family', 'swim'],
  },
  {
    id: 'kobuleti-morning-beach',
    eventId: 'event-day-04-beach-morning',
    category: 'beach',
    badges: ['free', 'family', 'swim'],
  },
  {
    id: 'kobuleti-morning-sea',
    eventId: 'event-day-06-morning-sea',
    category: 'beach',
    badges: ['free', 'family', 'swim'],
  },
  {
    id: 'magnetic-beach',
    eventId: 'event-day-06-beach',
    category: 'beach',
    badges: ['free', 'family', 'swim', 'best-photo'],
  },
  {
    id: 'kobuleti-evening-sea',
    eventId: 'event-day-07-evening-sea',
    category: 'beach',
    badges: ['free', 'family', 'swim', 'sunset'],
  },
  {
    id: 'last-swim',
    eventId: 'event-day-09-swim',
    category: 'beach',
    badges: ['free', 'family', 'swim'],
  },

  // 🌄 Горы
  {
    id: 'gomis-mta',
    eventId: 'event-day-08-summit',
    category: 'mountain',
    badges: ['family', 'best-photo'],
  },
  {
    id: 'gomis-viewpoints',
    eventId: 'event-day-08-viewpoints',
    category: 'mountain',
    badges: ['free', 'family', 'best-photo'],
  },

  // 💦 Водопады
  {
    id: 'martvili',
    eventId: 'event-day-02-martvili',
    category: 'waterfall',
    badges: ['family', 'best-photo'],
  },

  // 🍽 Кафе
  {
    id: 'batumi-coffee',
    eventId: 'event-day-05-coffee',
    category: 'cafe',
    badges: ['family', 'walk'],
  },
  {
    id: 'mountain-stop',
    eventId: 'event-day-08-stop',
    category: 'cafe',
    badges: ['family'],
  },
  {
    id: 'promenade-coffee',
    eventId: 'event-day-09-coffee',
    category: 'cafe',
    badges: ['family', 'walk'],
  },

  // 🍷 Рестораны
  {
    id: 'seafood-lunch',
    eventId: 'event-day-04-seafood-lunch',
    category: 'restaurant',
    badges: ['family'],
  },
  {
    id: 'dinner-sea',
    eventId: 'event-day-04-dinner',
    category: 'restaurant',
    badges: ['family', 'walk'],
  },
  {
    id: 'batumi-lunch',
    eventId: 'event-day-05-lunch',
    category: 'restaurant',
    badges: ['family'],
    rating: 4.5,
  },
  {
    id: 'kobuleti-lunch-lexi',
    eventId: 'event-day-06-lunch',
    category: 'restaurant',
    badges: ['family'],
    rating: 4.8,
  },
  {
    id: 'kobuleti-dinner',
    eventId: 'event-day-06-dinner',
    category: 'restaurant',
    badges: ['family'],
    rating: 4.4,
  },
  {
    id: 'adjara-lunch',
    eventId: 'event-day-07-lunch',
    category: 'restaurant',
    badges: ['family'],
    rating: 4.8,
  },
  {
    id: 'adjara-dinner',
    eventId: 'event-day-07-dinner',
    category: 'restaurant',
    badges: ['family'],
    rating: 4.4,
  },
  {
    id: 'farewell-lunch',
    eventId: 'event-day-09-lunch',
    category: 'restaurant',
    badges: ['family'],
    rating: 4.8,
  },
  {
    id: 'first-dinner',
    eventId: 'event-day-01-dinner',
    category: 'restaurant',
    badges: ['family'],
  },

  // 🛍 Покупки
  {
    id: 'batumi-shopping',
    eventId: 'event-day-05-free-time',
    category: 'shopping',
    badges: ['family', 'walk'],
  },
  {
    id: 'kobuleti-market',
    eventId: 'event-day-07-market',
    category: 'shopping',
    badges: ['family', 'walk'],
  },
  {
    id: 'souvenirs',
    eventId: 'event-day-09-souvenirs',
    category: 'shopping',
    badges: ['family', 'walk'],
  },

  // 🌅 Вечерние прогулки
  {
    id: 'evening-kutaisi',
    eventId: 'event-day-02-free-time',
    category: 'evening',
    badges: ['free', 'family', 'walk'],
  },
  {
    id: 'kobuleti-promenade',
    eventId: 'event-day-03-promenade',
    category: 'evening',
    badges: ['free', 'family', 'walk'],
  },
  {
    id: 'kobuleti-sunset',
    eventId: 'event-day-03-sunset',
    category: 'evening',
    badges: ['free', 'family', 'sunset', 'best-photo'],
  },
  {
    id: 'evening-beach',
    eventId: 'event-day-04-evening-beach',
    category: 'evening',
    badges: ['free', 'family', 'sunset', 'swim'],
  },
  {
    id: 'evening-walk',
    eventId: 'event-day-04-evening-walk',
    category: 'evening',
    badges: ['free', 'family', 'walk'],
  },
  {
    id: 'shekvetili-sunset',
    eventId: 'event-day-06-sunset',
    category: 'evening',
    badges: ['free', 'family', 'sunset', 'best-photo'],
  },

  // 🚍 Транспорт
  {
    id: 'bolt-kutaisi',
    eventId: 'event-day-01-bolt',
    category: 'transport',
    badges: ['bolt', 'family'],
  },
  {
    id: 'marshrutka-kobuleti',
    eventId: 'event-day-03-marshrutka',
    category: 'transport',
    badges: ['marshrutka', 'family'],
  },
  {
    id: 'transfer-batumi',
    eventId: 'event-day-05-transfer-batumi',
    category: 'transport',
    badges: ['marshrutka', 'bolt', 'family'],
  },
  {
    id: 'transfer-shekvetili',
    eventId: 'event-day-06-transfer',
    category: 'transport',
    badges: ['marshrutka', 'bolt', 'family'],
  },
  {
    id: 'transfer-kutaisi',
    eventId: 'event-day-09-transfer',
    category: 'transport',
    badges: ['marshrutka', 'bolt', 'family'],
  },

  // ✈ Аэропорт
  {
    id: 'kutaisi-airport',
    eventId: 'event-day-01-arrival',
    category: 'airport',
    badges: ['family'],
  },
  {
    id: 'airport-hotel',
    eventId: 'event-day-09-hotel',
    category: 'airport',
    badges: ['family', 'bolt'],
  },
]
