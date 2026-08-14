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

export const dataService = {
  getTripDays: (): readonly TripDay[] =>
    withAssetBase(tripDaysData) as TripDay[],
  getTripEvents: (): readonly TripEvent[] =>
    withAssetBase(tripEventsData) as TripEvent[],
  getRoutePlaces: (): readonly RoutePlaceCard[] =>
    buildRoutePlaceCatalog(dataService.getTripEvents() as TripEvent[]),

  getCollections: (): DataCollection[] => [
    {
      fileName: 'tripDays.json',
      label: 'Дни поездки',
      records: dataService.getTripDays(),
    },
    {
      fileName: 'tripEvents.json',
      label: 'События',
      records: dataService.getTripEvents(),
    },
  ],
}

if (import.meta.hot) {
  import.meta.hot.accept('../data/tripEvents.json', () => {
    import.meta.hot?.invalidate()
  })
  import.meta.hot.accept('../data/tripDays.json', () => {
    import.meta.hot?.invalidate()
  })
}
