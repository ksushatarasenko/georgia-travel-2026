import tripDaysData from '../data/tripDays.json'
import tripEventsData from '../data/tripEvents.json'
import { withAssetBase } from '../lib/assetUrl'
import { buildRoutePlaceCatalog } from '../lib/routePlaces'
import type { RoutePlaceCard, TripDay, TripEvent } from '../types/data'

export interface DataCollection {
  fileName: string
  label: string
  records: readonly unknown[]
}

const tripDays = withAssetBase(tripDaysData) as TripDay[]
const tripEvents = withAssetBase(tripEventsData) as TripEvent[]
const routePlaces = buildRoutePlaceCatalog(tripEvents)

export const dataService = {
  getTripDays: (): readonly TripDay[] => tripDays,
  getTripEvents: (): readonly TripEvent[] => tripEvents,
  getRoutePlaces: (): readonly RoutePlaceCard[] => routePlaces,

  getCollections: (): DataCollection[] => [
    { fileName: 'tripDays.json', label: 'Дни поездки', records: tripDays },
    { fileName: 'tripEvents.json', label: 'События', records: tripEvents },
  ],
}
