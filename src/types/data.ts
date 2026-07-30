export interface Trip {
  id: string
  title: string
  startDate: string
  endDate: string
  origin: string
  destination: string
  travelers: string[]
  status: 'draft' | 'planned' | 'completed'
}

export interface Day {
  id: string
  tripId: string
  date: string
  title: string
  summary: string
  placeIds: string[]
  transportIds: string[]
}

export interface TripDay {
  id: string
  date: string
  title: string
  description: string
  icon: string
  eventIds: string[]
}

export type TripEventCategory =
  | 'flight'
  | 'arrival'
  | 'transport'
  | 'accommodation'
  | 'food'
  | 'walk'
  | 'activity'
  | 'document'
  | 'other'

export interface TripEventReferences {
  placeId: string | null
  transportId: string | null
  nearbyRestaurantIds: string[]
  documentIds: string[]
  tipIds: string[]
}

export interface FlightDocumentAttachment {
  id: string
  title: string
  icon: string
  filePath: string
  available: boolean
}

export interface FlightChecklistItem {
  id: string
  label: string
}

export interface PassengerPackingList {
  id: string
  name: string
  icon: string
  items: FlightChecklistItem[]
}

export interface FlightEventDetails {
  date: string
  route: {
    origin: string
    destination: string
  }
  departureTime: string
  arrivalTime: string
  duration: string
  airline: string
  passengerCount: number
  seats: string[]
  baggage: {
    description: string
    dimensions: string
  }
  checkIn: string
  documents: FlightDocumentAttachment[]
  cabinBag: {
    dimensions: string
    imagePath: string
    imageAvailable: boolean
  }
  packingLists: PassengerPackingList[]
  cabinBagReminders: string[]
  checklist: FlightChecklistItem[]
  airportTransfer: {
    method: string
    duration: string
    cost: string
    callTime: string
  }
  usefulTips: string[]
}

export interface ArrivalRequiredDocument {
  id: string
  title: string
  icon: string
  filePath: string | null
  available: boolean
}

export interface ArrivalEventDetails {
  date: string
  arrivalTime: string
  airline: string
  airport: string
  airportCode: string
  country: string
  baggage: string
  steps: {
    id: string
    title: string
    icon: string
  }[]
  checklist: FlightChecklistItem[]
  requiredDocuments: ArrivalRequiredDocument[]
  nextActions: {
    id: string
    title: string
    icon: string
    description: string
    eventId: string
  }[]
  usefulTips: string[]
}

export interface AtmEventDetails {
  airport: string
  banks: {
    id: string
    name: string
    icon: string
    location: string
    hours: string
  }[]
  supportedCards: {
    id: string
    name: string
    icon: string
    status: string
  }[]
  cardNote: string
  recommendedAmount: string
  recommendedUses: string[]
  amountNote: string
  dccAdvice: {
    warning: string
    choices: string[]
    explanation: string
  }
  checklist: FlightChecklistItem[]
  nextAction: {
    title: string
    icon: string
    description: string
    eventId: string
  }
  usefulTips: string[]
}

export interface SimEventDetails {
  airport: string
  benefits: {
    id: string
    icon: string
    title: string
  }[]
  purchasePoint: {
    title: string
    icon: string
    details: string[]
  }
  recommendedPlan: {
    title: string
    includes: string[]
    note: string
  }
  requirements: {
    id: string
    icon: string
    title: string
  }[]
  englishPhrases: {
    original: string
    translation: string
  }[]
  checklist: FlightChecklistItem[]
  nextAction: {
    title: string
    icon: string
    description: string
    eventId: string
  }
  usefulTips: string[]
}

export interface BoltEventDetails {
  airport: string
  prerequisites: {
    id: string
    icon: string
    title: string
  }[]
  orderSteps: string[]
  vehicleChecks: string[]
  englishPhrases: {
    original: string
    translation: string
  }[]
  checklist: FlightChecklistItem[]
  nextAction: {
    title: string
    icon: string
    description: string
    eventId: string
  }
  usefulTips: string[]
}

export interface HotelCheckInEventDetails {
  subtitle: string
  bookingInfo: {
    id: string
    icon: string
    label: string
    value: string
  }[]
  receptionDocuments: {
    id: string
    icon: string
    title: string
    note?: string
  }[]
  checkInSteps: string[]
  englishPhrases: {
    original: string
    translation: string
  }[]
  checklist: FlightChecklistItem[]
  nextAction: {
    title: string
    icon: string
    description: string
    eventId: string
  }
  usefulTips: string[]
}

export interface StoreEventDetails {
  supermarkets: {
    id: string
    rank: string
    name: string
    subtitle: string
    description: string[]
    products: string[]
    advantages: string[]
  }[]
  shoppingGuide: {
    title: string
    introduction: string
    steps: string[]
    paymentMethods: string[]
  }
  usefulToKnow: {
    id: string
    icon: string
    title: string
    description: string
  }[]
  priceGuide: {
    title: string
    items: {
      product: string
      price: string
    }[]
    sampleBasket: {
      item: string
      price: string
    }[]
    sampleTotal: string
  }
  checklist: FlightChecklistItem[]
  nextAction: {
    title: string
    icon: string
    eventId: string
  }
  usefulTips: string[]
}

export interface WalkEventDetails {
  overview: {
    id: string
    icon: string
    label: string
    value: string
  }[]
  routeStops: {
    id: string
    name: string
    transferLabel: string
    distance: string
    walkingTime: string
    durationLabel?: string
    duration?: string
    highlights?: string[]
    tip?: string
    conclusion?: string
  }[]
  dinnerIdeas: {
    id: string
    icon: string
    title: string
  }[]
  summary: {
    highlights: string[]
    stats: {
      icon: string
      label: string
      value: string
    }[]
  }
  nextAction: {
    title: string
    icon: string
    description: string
    eventId: string
  }
  usefulTips: string[]
}

export interface DinnerEventDetails {
  restaurants: {
    id: string
    rank: string
    name: string
    subtitle: string
    location: string
    walkingTime: string
    reasons: string[]
    averageCheck: string
  }[]
  firstOrderDishes: {
    id: string
    icon: string
    title: string
    price: string
    description: string
    howToEat?: string
    note?: string
    flavors?: string[]
  }[]
  tips: {
    id: string
    icon: string
    title: string
    description: string
  }[]
  sampleOrder: {
    title: string
    items: string[]
    total: string
  }
  checklist: FlightChecklistItem[]
  nextAction: {
    title: string
    icon: string
    description: string
    eventId: string
  }
}

/** Daytime meal stop on a trip day (e.g. after Martvili Canyon). */
export interface LunchEventDetails {
  whyHere: {
    title: string
    paragraphs: string[]
  }
  restaurants: {
    id: string
    rank: string
    name: string
    subtitle: string
    location: string
    driveTime: string
    reasons: string[]
    averageCheck: string
    note?: string
  }[]
  dishes: {
    id: string
    icon: string
    title: string
  }[]
  averageCheck: {
    perPerson: string
    family: string
    note?: string
  }
  duration: {
    value: string
    note?: string
  }
  tips: {
    id: string
    text: string
  }[]
  nextAction: {
    title: string
    icon: string
    description: string
    eventId: string
    buttonLabel: string
  }
}

/** Scenic drive / return transfer between trip points. */
export interface ReturnDriveEventDetails {
  gallery: {
    id: string
    src: string
    alt: string
  }[]
  tripFacts: {
    id: string
    icon: string
    label: string
    value: string
  }[]
  scenery: {
    id: string
    icon: string
    title: string
    description: string
    image: string
  }[]
  stops: {
    id: string
    icon: string
    title: string
    description: string
  }[]
  tip: {
    title: string
    text: string
  }
  nextAction: {
    title: string
    icon: string
    description: string
    eventId: string
    buttonLabel: string
  }
}

/** Closing evening stroll in a city (e.g. evening Kutaisi). */
export interface EveningCityEventDetails {
  whyEvening: {
    id: string
    icon: string
    title: string
  }[]
  activities: {
    id: string
    icon: string
    title: string
  }[]
  routeDuration: string
  route: {
    id: string
    icon: string
    title: string
    note?: string
  }[]
  bestPlaces: {
    id: string
    icon: string
    title: string
    description: string
    image: string
  }[]
  dinnerIdeas: {
    id: string
    icon: string
    title: string
  }[]
  tips: {
    id: string
    text: string
  }[]
  didYouKnow: {
    icon: string
    title: string
    storyTitle: string
    paragraphs: string[]
  }
  gallery: {
    id: string
    src: string
    alt: string
  }[]
  nextAction: {
    title: string
    icon: string
    description: string
    /** Absolute app path, e.g. `/trip/trip-day-03`. */
    to: string
    buttonLabel: string
  }
}

/** Flexible practical guide page used across trip days (station, ride, beach…). */
export interface GuideEventDetails {
  introTitle?: string
  intro?: string[]
  gallery?: {
    id: string
    src: string
    alt: string
  }[]
  factsTitle?: string
  facts?: {
    id: string
    icon: string
    label: string
    value: string
    note?: string
  }[]
  stepsTitle?: string
  steps?: {
    id: string
    icon: string
    title: string
    text: string
  }[]
  placesTitle?: string
  places?: {
    id: string
    icon: string
    title: string
    description: string
    image?: string
  }[]
  packingTitle?: string
  packingItems?: {
    id: string
    icon: string
    title: string
  }[]
  warnings?: {
    title: string
    lines: string[]
  }
  tips: {
    id: string
    text: string
  }[]
  didYouKnow?: {
    icon: string
    title: string
    storyTitle: string
    paragraphs: string[]
  }
  checklist?: FlightChecklistItem[]
  nextAction: {
    title: string
    icon: string
    description: string
    eventId?: string
    /** Optional absolute path when linking to a day page instead of an event. */
    to?: string
    buttonLabel: string
  }
}

export interface HotelReturnEventDetails {
  dayHighlights: string[]
  checklist: FlightChecklistItem[]
  tips: {
    id: string
    icon: string
    title: string
    description: string
  }[]
  stats: {
    id: string
    icon: string
    label: string
    value: string
  }[]
  tomorrowPreview: {
    title: string
    description: string
  }
  nextAction: {
    title: string
    icon: string
    description: string
    eventId: string
    buttonLabel: string
  }
}

export interface MorningEventDetails {
  morningPlan: {
    id: string
    time: string
    title: string
    description?: string
    checklist?: string[]
  }[]
  packingItems: {
    id: string
    icon: string
    title: string
  }[]
  dayForecast: {
    id: string
    icon: string
    title: string
    description: string
  }[]
  checklist: FlightChecklistItem[]
  usefulTips: string[]
  nextAction: {
    title: string
    icon: string
    description: string
    eventId: string
  }
}

export interface BreakfastEventDetails {
  title: string
  description: string
  schedule: {
    id: string
    icon: string
    label: string
    value: string
  }[]
  hotelBreakfast: {
    includedTitle: string
    includedText: string
    notIncludedTitle: string
    notIncludedText: string
  }
  foodIdeas: {
    id: string
    icon: string
    title: string
  }[]
  priceExamples: {
    id: string
    label: string
    price: string
  }[]
  checklist: FlightChecklistItem[]
  usefulTips: string[]
  nextAction: {
    title: string
    icon: string
    description: string
    eventId: string
    buttonLabel: string
  }
}

export interface AttractionVisitStep {
  id: string
  icon: string
  text: string
}

export interface AttractionEventDetails {
  /** Practical on-site visit steps — required for paid / ticketed attractions. */
  visitFlow: AttractionVisitStep[]
  gallery: {
    id: string
    src: string
    alt: string
  }[]
  quickFacts: {
    id: string
    icon: string
    label: string
    value: string
  }[]
  location: {
    address: string
    coordinates: string
    mapsUrl: string
  }
  transportTip: {
    title: string
    lines: string[]
  }
  transportOptions: {
    id: string
    icon: string
    title: string
    badge?: string
    description: string
    infoBlocks: {
      label: string
      value?: string
      note?: string
      options?: {
        title: string
        value: string
      }[]
    }[]
    includes?: string[]
    bookingPlaces?: string[]
    pros: string[]
    cons: string[]
  }[]
  ticketPrices: {
    id: string
    icon: string
    label: string
    value?: string
    note?: string
    description?: string
    duration?: string
    details?: string[]
    pricedRows?: {
      label: string
      value: string
      note?: string
    }[]
    warning?: {
      title: string
      text: string
    }
  }[]
  ticketWarning?: {
    title: string
    lines: string[]
  }
  ticketIncludes?: {
    title: string
    items: string[]
    note?: string
  }
  ticketTip?: {
    title: string
    text: string
  }
  openingHours: {
    id: string
    icon: string
    label: string
    value: string
    note?: string
    details?: string[]
  }[]
  openingHoursInfo: {
    title: string
    lines: string[]
  }
  openingHoursWarning: {
    title: string
    lines: string[]
  }
  highlights: {
    id: string
    title: string
    image: string
  }[]
  didYouKnow: {
    icon: string
    title: string
    storyTitle: string
    paragraphs: string[]
    highlight?: string
  }
  packingChecklist: FlightChecklistItem[]
  usefulTips: {
    id: string
    title: string
  }[]
  infrastructure: {
    id: string
    icon: string
    title: string
    status: string
    statusTone: 'ok' | 'partial'
    description: string[]
  }[]
  nextAction: {
    title: string
    icon: string
    description: string
    eventId: string
    buttonLabel: string
  }
}

export interface TripEvent {
  id: string
  dayId: string
  isPlaceholder?: boolean
  isTimeConfirmed?: boolean
  title: string
  category: TripEventCategory
  icon: string
  time: string
  duration: string
  description: string
  image: string | null
  price: string
  gps: {
    latitude: number
    longitude: number
  } | null
  tips: string[]
  notes: string
  references: TripEventReferences
  flightDetails?: FlightEventDetails
  arrivalDetails?: ArrivalEventDetails
  atmDetails?: AtmEventDetails
  simDetails?: SimEventDetails
  boltDetails?: BoltEventDetails
  hotelCheckInDetails?: HotelCheckInEventDetails
  storeDetails?: StoreEventDetails
  walkDetails?: WalkEventDetails
  dinnerDetails?: DinnerEventDetails
  lunchDetails?: LunchEventDetails
  returnDriveDetails?: ReturnDriveEventDetails
  eveningCityDetails?: EveningCityEventDetails
  guideDetails?: GuideEventDetails
  hotelReturnDetails?: HotelReturnEventDetails
  morningDetails?: MorningEventDetails
  breakfastDetails?: BreakfastEventDetails
  attractionDetails?: AttractionEventDetails
}

export type PlaceCategory =
  | 'sight'
  | 'beach'
  | 'cafe'
  | 'park'
  | 'museum'
  | 'nature'
  | 'shop'
  | 'transport'
  | 'other'

/**
 * Catalog card for the «Достопримечательности» section.
 * Detail content always lives on the linked trip event page (single source of truth).
 */
export type AttractionCatalogCategory = 'attraction' | 'evening'

export interface AttractionCatalogEntry {
  id: string
  eventId: string
  dayId: string
  title: string
  description: string
  image: string | null
  icon: string
  category: AttractionCatalogCategory
  categoryLabel: string
  duration?: string
  price?: string
  /** Always `/trip/event/:eventId` — same page as the trip timeline. */
  href: string
}

export interface Place {
  id: string
  name: string
  category: PlaceCategory
  description: string
  image: string | null
  rating: number
  recommendedVisitTime: string
  price: string
  openingHours: string
  gps: {
    latitude: number
    longitude: number
  }
  address: string
  notes: string
}

export interface Transport {
  id: string
  tripId: string
  type: 'flight' | 'train' | 'bus' | 'car' | 'other'
  title: string
  departure: string
  arrival: string
  departureTime: string
  arrivalTime: string
  notes: string
}

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  description: string
  address: string
  priceLevel: 1 | 2 | 3
}

export interface Beach {
  id: string
  name: string
  description: string
  address: string
  facilities: string[]
}

export interface Document {
  id: string
  title: string
  type: string
  holder: string
  status: 'missing' | 'ready' | 'checked'
  notes: string
}

export interface BudgetItem {
  id: string
  category: string
  title: string
  amount: number
  currency: string
  paid: boolean
}

export interface Tip {
  id: string
  category: string
  title: string
  content: string
}
