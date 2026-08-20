export type TripDocumentCategoryId =
  | 'tickets'
  | 'accommodation'
  | 'insurance'
  | 'ids'
  | 'other'

export interface TripDocumentCategory {
  id: TripDocumentCategoryId
  title: string
  icon: string
}

export interface TripDocument {
  id: string
  title: string
  description: string
  icon: string
  url: string
  categoryId: TripDocumentCategoryId
  /** false — ссылка есть, но документ ещё не готов к просмотру */
  available?: boolean
}

export const tripDocumentCategories: TripDocumentCategory[] = [
  { id: 'tickets', title: 'Билеты и бронирования', icon: '✈️' },
  { id: 'accommodation', title: 'Бронь жилья', icon: '🏨' },
  { id: 'insurance', title: 'Страховка', icon: '🛡️' },
  { id: 'ids', title: 'Документы и копии', icon: '🪪' },
  { id: 'other', title: 'Другие документы', icon: '📋' },
]

/** Единый реестр документов поездки — используется в «День отлёта» и разделе «Документы». */
export const tripDocuments: TripDocument[] = [
  {
    id: 'flight-booking',
    categoryId: 'tickets',
    title: 'Подтверждение бронирования',
    description: 'Самолёт · Wizz Air · Poznań → Kutaisi',
    icon: '🧾',
    url: '/documents/flight/booking.pdf',
    available: false,
  },
  {
    id: 'boarding-pass-oksana',
    categoryId: 'tickets',
    title: 'Посадочный талон — Оксана',
    description: 'Wizz Air · 25 августа 2026',
    icon: '🎫',
    url: 'https://1drv.ms/b/c/53bd6a3ee8a255fe/IQTu6__TofI2QKB25DFb_U0QATay58UfUxqXbejNbzuJfz4',
    available: true,
  },
  {
    id: 'boarding-pass-marina',
    categoryId: 'tickets',
    title: 'Посадочный талон — Марина',
    description: 'Wizz Air · 25 августа 2026',
    icon: '🎫',
    url: 'https://1drv.ms/b/c/53bd6a3ee8a255fe/IQSFLL19uNRfRZQlTL1xZ93SAcRIuJOUlKX3_jYs78tTVDU',
    available: true,
  },
  {
    id: 'boarding-pass-kyrylo',
    categoryId: 'tickets',
    title: 'Посадочный талон — Кирилл',
    description: 'Wizz Air · 25 августа 2026',
    icon: '🎫',
    url: 'https://1drv.ms/b/c/53bd6a3ee8a255fe/IQSw4H-mThRzQZo8ggfpCQ6TATvkUwGOYJhnTrBdblefJT8',
    available: true,
  },
  {
    id: 'hotel-kutaisi',
    categoryId: 'accommodation',
    title: 'Бронь жилья — Кутаиси',
    description: 'Отель / апартаменты',
    icon: '🏨',
    url: 'https://example.com/georgia-travel/hotel-kutaisi',
    available: true,
  },
  {
    id: 'hotel-kobuleti',
    categoryId: 'accommodation',
    title: 'Бронь жилья — Кобулети',
    description: 'Hotel Simpatia',
    icon: '🏨',
    url: 'https://example.com/georgia-travel/hotel-kobuleti',
    available: true,
  },
  {
    id: 'flight-insurance',
    categoryId: 'insurance',
    title: 'Страховка',
    description: 'Медицинская страховка на поездку',
    icon: '🛡️',
    url: 'https://1drv.ms/b/c/53bd6a3ee8a255fe/IQSNIoSxM3MnQID-_miPw5FRAaWhi-CD-elBrDXn61neTng',
    available: false,
  },
  {
    id: 'passport-oksana',
    categoryId: 'ids',
    title: 'Паспорт — Оксана',
    description: 'Копия / скан',
    icon: '📘',
    url: 'https://1drv.ms/b/c/53bd6a3ee8a255fe/IQSGBL0JsSmyTq5gzovXj0JtAfAM6HRFmrvTgMbu-KEnI8g',
    available: false,
  },
  {
    id: 'passport-marina',
    categoryId: 'ids',
    title: 'Паспорт — Марина',
    description: 'Копия / скан',
    icon: '📘',
    url: 'https://1drv.ms/b/c/53bd6a3ee8a255fe/IQT1OLhGe3BCQo8YF-5Px5jcAVVLPwkdpGJSgwMOb62H5Y8',
    available: false,
  },
  {
    id: 'passport-kyrylo',
    categoryId: 'ids',
    title: 'Паспорт — Кирилл',
    description: 'Копия / скан',
    icon: '📘',
    url: 'https://1drv.ms/b/c/53bd6a3ee8a255fe/IQSVYRa5EiDCTanIXVmczcbRAQQw8OwLMzFM4QpX08vJsHA',
    available: false,
  },
  {
    id: 'cukr-oksana',
    categoryId: 'ids',
    title: 'Карта CUKR — Оксана',
    description: 'Копия / скан',
    icon: '💳',
    url: 'https://1drv.ms/b/c/53bd6a3ee8a255fe/IQR9Av-ZNZDiQY20e38l1iFGASWXno7NB3ktTI7NL44kAV0',
    available: false,
  },
  {
    id: 'cukr-marina',
    categoryId: 'ids',
    title: 'Карта CUKR — Марина',
    description: 'Копия / скан',
    icon: '💳',
    url: 'https://1drv.ms/b/c/53bd6a3ee8a255fe/IQR0xPak4GxVS5P5U6Cv716hAfMVUd7oieQXGqZHa5klNxk',
    available: false,
  },
  {
    id: 'cukr-kyrylo',
    categoryId: 'ids',
    title: 'Карта CUKR — Кирилл',
    description: 'Копия / скан',
    icon: '💳',
    url: 'https://1drv.ms/b/c/53bd6a3ee8a255fe/IQQzFpbxofp3So6RtPG5ycmqAe7iKFv6mV5d9Bmg29su6Y8',
    available: false,
  },
  {
    id: 'trip-notes',
    categoryId: 'other',
    title: 'Другие документы поездки',
    description: 'Заметки, ваучеры, прочее',
    icon: '📋',
    url: 'https://example.com/georgia-travel/other-documents',
    available: true,
  },
]

const tripDocumentsById = new Map(
  tripDocuments.map((document) => [document.id, document]),
)

export function getTripDocumentById(id: string): TripDocument | undefined {
  return tripDocumentsById.get(id)
}

export function getTripDocumentsByIds(ids: readonly string[]): TripDocument[] {
  return ids
    .map((id) => tripDocumentsById.get(id))
    .filter((document): document is TripDocument => Boolean(document))
}

export function getTripDocumentsByCategory(
  categoryId: TripDocumentCategoryId,
): TripDocument[] {
  return tripDocuments.filter((document) => document.categoryId === categoryId)
}

/** Документы, привязанные к событию «Вылет из Познани». */
export const flightDepartureDocumentIds = [
  'flight-booking',
  'boarding-pass-oksana',
  'boarding-pass-marina',
  'boarding-pass-kyrylo',
  'passport-oksana',
  'passport-marina',
  'passport-kyrylo',
  'cukr-oksana',
  'cukr-marina',
  'cukr-kyrylo',
  'flight-insurance',
] as const
