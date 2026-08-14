import beachesData from '../data/beaches.json'
import budgetData from '../data/budget.json'
import daysData from '../data/days.json'
import documentsData from '../data/documents.json'
import placesData from '../data/places.json'
import restaurantsData from '../data/restaurants.json'
import tipsData from '../data/tips.json'
import transportData from '../data/transport.json'
import tripData from '../data/trip.json'
import tripDaysData from '../data/tripDays.json'
import tripEventsData from '../data/tripEvents.json'
import { buildAttractionCatalog } from '../lib/attractionCatalog'
import { buildRoutePlaceCatalog } from '../lib/routePlaces'
import type {
  Beach,
  BudgetItem,
  Day,
  Document,
  Place,
  Restaurant,
  Tip,
  Transport,
  Trip,
  TripDay,
  TripEvent,
  AttractionCatalogEntry,
  RoutePlaceCard,
} from '../types/data'

export interface DataCollection {
  fileName: string
  label: string
  records: readonly unknown[]
}

const trips = tripData as Trip[]
const days = daysData as Day[]
const places = placesData as Place[]
const transport = transportData as Transport[]
const restaurants = restaurantsData as Restaurant[]
const beaches = beachesData as Beach[]
const documents = documentsData as Document[]
const budget = budgetData as BudgetItem[]
const tips = tipsData as Tip[]
const tripDays = tripDaysData as TripDay[]
const tripEvents = tripEventsData as TripEvent[]
const attractionCatalog = buildAttractionCatalog(tripEvents)
const routePlaces = buildRoutePlaceCatalog(tripEvents)

export const dataService = {
  getTrips: (): readonly Trip[] => trips,
  getDays: (): readonly Day[] => days,
  getPlaces: (): readonly Place[] => places,
  getTransport: (): readonly Transport[] => transport,
  getRestaurants: (): readonly Restaurant[] => restaurants,
  getBeaches: (): readonly Beach[] => beaches,
  getDocuments: (): readonly Document[] => documents,
  getBudget: (): readonly BudgetItem[] => budget,
  getTips: (): readonly Tip[] => tips,
  getTripDays: (): readonly TripDay[] => tripDays,
  getTripEvents: (): readonly TripEvent[] => tripEvents,
  /** Auto-built from trip events that own a full location page. */
  getAttractionCatalog: (): readonly AttractionCatalogEntry[] =>
    attractionCatalog,
  /** Central «Места маршрута» guide — index in places.ts, content from events. */
  getRoutePlaces: (): readonly RoutePlaceCard[] => routePlaces,

  getCollections: (): DataCollection[] => [
    { fileName: 'trip.json', label: 'Trip', records: trips },
    { fileName: 'days.json', label: 'Day', records: days },
    { fileName: 'places.json', label: 'Place', records: places },
    {
      fileName: 'transport.json',
      label: 'Transport',
      records: transport,
    },
    {
      fileName: 'restaurants.json',
      label: 'Restaurant',
      records: restaurants,
    },
    { fileName: 'beaches.json', label: 'Beach', records: beaches },
    {
      fileName: 'documents.json',
      label: 'Document',
      records: documents,
    },
    { fileName: 'budget.json', label: 'BudgetItem', records: budget },
    { fileName: 'tips.json', label: 'Tip', records: tips },
    { fileName: 'tripDays.json', label: 'TripDay', records: tripDays },
    {
      fileName: 'tripEvents.json',
      label: 'TripEvent',
      records: tripEvents,
    },
  ],
}
