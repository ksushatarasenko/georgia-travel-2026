import {
  ArrowLeft,
  Clock3,
  Coins,
  Image as ImageIcon,
  Lightbulb,
  MapPin,
  NotebookPen,
  Timer,
} from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrivalEventContent } from '../components/ArrivalEventContent'
import { AttractionEventContent } from '../components/AttractionEventContent'
import { AtmEventContent } from '../components/AtmEventContent'
import { BeachMorningEventContent } from '../components/BeachMorningEventContent'
import { BoltEventContent } from '../components/BoltEventContent'
import { BreakfastEventContent } from '../components/BreakfastEventContent'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { DinnerEventContent } from '../components/DinnerEventContent'
import { EveningCityEventContent } from '../components/EveningCityEventContent'
import { GuideEventContent } from '../components/GuideEventContent'
import { LunchEventContent } from '../components/LunchEventContent'
import { FlightEventContent } from '../components/FlightEventContent'
import { HotelCheckInEventContent } from '../components/HotelCheckInEventContent'
import { HotelReturnEventContent } from '../components/HotelReturnEventContent'
import { LightboxImage } from '../components/lightbox'
import { LinkedEntityCard } from '../components/LinkedEntityCard'
import { MorningEventContent } from '../components/MorningEventContent'
import { PlaceCard } from '../components/PlaceCard'
import { ReturnDriveEventContent } from '../components/ReturnDriveEventContent'
import { SeafoodLunchEventContent } from '../components/SeafoodLunchEventContent'
import { SimEventContent } from '../components/SimEventContent'
import { StoreEventContent } from '../components/StoreEventContent'
import { WalkEventContent } from '../components/WalkEventContent'
import { dataService } from '../services/dataService'
import type {
  Document as TravelDocument,
  Transport,
  TripEvent,
  TripEventCategory,
} from '../types/data'
import { TripEventPlaceholderPage } from './TripEventPlaceholderPage'

const tripDays = dataService.getTripDays()
const tripEvents = dataService.getTripEvents()
const places = dataService.getPlaces()
const restaurants = dataService.getRestaurants()
const transportItems = dataService.getTransport()
const documents = dataService.getDocuments()
const tips = dataService.getTips()

const categoryLabels: Record<TripEventCategory, string> = {
  flight: 'Перелёт',
  arrival: 'Прибытие',
  transport: 'Транспорт',
  accommodation: 'Жильё',
  food: 'Питание',
  walk: 'Прогулка',
  activity: 'Активность',
  document: 'Документы',
  other: 'Другое',
}

const transportTypeLabels: Record<Transport['type'], string> = {
  flight: 'Самолёт',
  train: 'Поезд',
  bus: 'Автобус',
  car: 'Автомобиль',
  other: 'Другое',
}

const documentStatusLabels: Record<TravelDocument['status'], string> = {
  missing: 'Не готов',
  ready: 'Готов',
  checked: 'Проверен',
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${date}T12:00:00`))
}

function formatFullDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))
}

function isAttractionEvent(event: TripEvent) {
  return Boolean(
    event.flightDetails ||
      event.arrivalDetails ||
      event.atmDetails ||
      event.simDetails ||
      event.boltDetails,
  )
}

interface AttractionPhotoProps {
  src: string | null
  alt: string
}

function AttractionPhoto({ src, alt }: AttractionPhotoProps) {
  const [imageFailed, setImageFailed] = useState(false)

  if (!src || imageFailed) {
    return (
      <div className="flex h-56 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-emerald-50 via-[#f7f8f4] to-red-50 sm:h-72">
        <span className="flex size-16 items-center justify-center rounded-2xl border border-white bg-white/80 text-emerald-700 shadow-sm">
          <ImageIcon size={28} strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem]">
      <LightboxImage
        src={src}
        alt={alt}
        className="block w-full"
        imgClassName="h-56 w-full object-cover sm:h-72"
        onImageError={() => setImageFailed(true)}
      />
    </div>
  )
}

export function TripEventPage() {
  const { eventId } = useParams()
  const [searchParams] = useSearchParams()
  const fromSights = searchParams.get('from') === 'sights'
  const event = tripEvents.find((item) => item.id === eventId)
  const day = event
    ? tripDays.find((item) => item.id === event.dayId)
    : undefined

  if (!event || !day) {
    return <Navigate to="/trip" replace />
  }

  if (event.isPlaceholder) {
    return <TripEventPlaceholderPage day={day} event={event} />
  }

  const linkedPlace = event.references.placeId
    ? places.find((place) => place.id === event.references.placeId)
    : undefined
  const linkedTransport = event.references.transportId
    ? transportItems.find(
        (transport) => transport.id === event.references.transportId,
      )
    : undefined
  const nearbyRestaurants = event.references.nearbyRestaurantIds
    .map((restaurantId) =>
      restaurants.find((restaurant) => restaurant.id === restaurantId),
    )
    .filter((restaurant) => restaurant !== undefined)
  const linkedDocuments = event.references.documentIds
    .map((documentId) =>
      documents.find((document) => document.id === documentId),
    )
    .filter((document) => document !== undefined)
  const linkedTips = event.references.tipIds
    .map((tipId) => tips.find((tip) => tip.id === tipId))
    .filter((tip) => tip !== undefined)

  const showAttractionPhoto = isAttractionEvent(event)
  const usesSimplePageHeader = Boolean(
    event.hotelCheckInDetails ||
      event.storeDetails ||
      event.walkDetails ||
      event.dinnerDetails ||
      event.lunchDetails ||
      event.returnDriveDetails ||
      event.eveningCityDetails ||
      event.guideDetails ||
      event.hotelReturnDetails ||
      event.attractionDetails ||
      event.beachMorningDetails ||
      event.seafoodLunchDetails,
  )
  const hideOuterHeader = Boolean(
    event.breakfastDetails ||
      event.morningDetails ||
      event.beachMorningDetails ||
      event.seafoodLunchDetails,
  )

  const breadcrumbItems = fromSights
    ? [
        { label: 'Главная', to: '/' },
        { label: 'Достопримечательности', to: '/sights' },
        { label: event.title },
      ]
    : [
        { label: 'Главная', to: '/' },
        { label: 'Мое путешествие', to: '/trip' },
        { label: formatDate(day.date), to: `/trip/${day.id}` },
        { label: event.title },
      ]

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-5 py-6 sm:px-8 sm:py-10 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs items={breadcrumbItems} />

        <article className="mt-8 overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(28,43,34,0.09)] sm:mt-10 sm:rounded-[2.5rem] sm:p-10 lg:p-12">
          {usesSimplePageHeader && (
            <header className="mb-8 border-b border-stone-200 pb-8">
              <h1 className="text-3xl font-semibold tracking-[-0.045em] text-stone-950 sm:text-4xl">
                <span className="mr-2" aria-hidden="true">
                  {event.icon}
                </span>
                {event.title}
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-stone-500 sm:text-lg">
                {event.description}
              </p>
            </header>
          )}

          {!hideOuterHeader && !usesSimplePageHeader && (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                <span aria-hidden="true">{event.icon} </span>
                {categoryLabels[event.category]}
                {' · '}
                {event.arrivalDetails
                  ? formatFullDate(day.date)
                  : formatDate(day.date)}
                {event.time && event.time !== '—' ? ` · ${event.time}` : ''}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-stone-950 sm:text-6xl">
                {(event.atmDetails ||
                  event.simDetails ||
                  event.boltDetails) && (
                  <span className="mr-3" aria-hidden="true">
                    {event.icon}
                  </span>
                )}
                {event.title}
              </h1>
              {(event.atmDetails ||
                event.simDetails ||
                event.boltDetails) && (
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 sm:text-base">
                  {event.atmDetails?.airport ??
                    event.simDetails?.airport ??
                    event.boltDetails?.airport}
                </p>
              )}
              <p className="mt-5 max-w-3xl text-base leading-8 text-stone-500 sm:text-lg">
                {event.description}
              </p>

              {event.arrivalDetails && (
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                    {event.arrivalDetails.airline}
                  </span>
                  <span className="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-600">
                    {event.arrivalDetails.airport} (
                    {event.arrivalDetails.airportCode})
                  </span>
                </div>
              )}

              {showAttractionPhoto && (
                <div className="mt-8">
                  <AttractionPhoto
                    key={event.image ?? event.id}
                    src={event.image}
                    alt={event.title}
                  />
                </div>
              )}
            </>
          )}

          {event.flightDetails ? (
            <FlightEventContent details={event.flightDetails} />
          ) : event.arrivalDetails ? (
            <ArrivalEventContent details={event.arrivalDetails} />
          ) : event.atmDetails ? (
            <AtmEventContent details={event.atmDetails} />
          ) : event.simDetails ? (
            <SimEventContent details={event.simDetails} />
          ) : event.boltDetails ? (
            <BoltEventContent details={event.boltDetails} />
          ) : event.hotelCheckInDetails ? (
            <HotelCheckInEventContent details={event.hotelCheckInDetails} />
          ) : event.storeDetails ? (
            <StoreEventContent details={event.storeDetails} />
          ) : event.walkDetails ? (
            <WalkEventContent details={event.walkDetails} />
          ) : event.dinnerDetails ? (
            <DinnerEventContent details={event.dinnerDetails} />
          ) : event.lunchDetails ? (
            <LunchEventContent details={event.lunchDetails} />
          ) : event.returnDriveDetails ? (
            <ReturnDriveEventContent details={event.returnDriveDetails} />
          ) : event.eveningCityDetails ? (
            <EveningCityEventContent details={event.eveningCityDetails} />
          ) : event.guideDetails ? (
            <GuideEventContent
              details={event.guideDetails}
              storageKey={`georgia-travel-2026:guide:${event.id}:checklist`}
            />
          ) : event.hotelReturnDetails ? (
            <HotelReturnEventContent details={event.hotelReturnDetails} />
          ) : event.morningDetails ? (
            <MorningEventContent details={event.morningDetails} />
          ) : event.beachMorningDetails ? (
            <BeachMorningEventContent
              details={event.beachMorningDetails}
              favoriteId={event.id}
            />
          ) : event.seafoodLunchDetails ? (
            <SeafoodLunchEventContent details={event.seafoodLunchDetails} />
          ) : event.breakfastDetails ? (
            <BreakfastEventContent
              details={event.breakfastDetails}
              storageKey={`georgia-travel-2026:breakfast:${event.id}:checklist`}
            />
          ) : event.attractionDetails ? (
            <AttractionEventContent
              details={event.attractionDetails}
              storageKey={`georgia-travel-2026:attraction:${event.id}:checklist`}
            />
          ) : (
            <>
              <dl className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl bg-[#f7f8f4] p-5">
                  <Clock3
                    size={20}
                    className="text-emerald-700"
                    aria-hidden="true"
                  />
                  <dt className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                    Время
                  </dt>
                  <dd className="mt-1 font-semibold text-stone-900">
                    {event.time}
                  </dd>
                </div>
                <div className="rounded-2xl bg-[#f7f8f4] p-5">
                  <Timer
                    size={20}
                    className="text-emerald-700"
                    aria-hidden="true"
                  />
                  <dt className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                    Продолжительность
                  </dt>
                  <dd className="mt-1 font-semibold text-stone-900">
                    {event.duration}
                  </dd>
                </div>
                <div className="rounded-2xl bg-[#f7f8f4] p-5">
                  <Coins
                    size={20}
                    className="text-emerald-700"
                    aria-hidden="true"
                  />
                  <dt className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                    Стоимость
                  </dt>
                  <dd className="mt-1 font-semibold text-stone-900">
                    {event.price}
                  </dd>
                </div>
                <div className="rounded-2xl bg-[#f7f8f4] p-5">
                  <MapPin
                    size={20}
                    className="text-emerald-700"
                    aria-hidden="true"
                  />
                  <dt className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                    GPS
                  </dt>
                  <dd className="mt-1 font-mono text-xs font-semibold leading-6 text-stone-900">
                    {event.gps
                      ? `${event.gps.latitude.toFixed(4)}, ${event.gps.longitude.toFixed(4)}`
                      : 'Не указаны'}
                  </dd>
                </div>
              </dl>

              {(linkedPlace ||
                linkedTransport ||
                nearbyRestaurants.length > 0 ||
                linkedDocuments.length > 0) && (
                <div className="mt-12 space-y-10 border-t border-stone-200 pt-10">
                  {linkedPlace && (
                    <section>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
                        📍 Место
                      </p>
                      <div className="mt-4 max-w-2xl">
                        <PlaceCard
                          place={linkedPlace}
                          variant="compact"
                          to="/places"
                        />
                      </div>
                    </section>
                  )}

                  {linkedTransport && (
                    <section>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
                        🚌 Транспорт
                      </p>
                      <div className="mt-4 max-w-md">
                        <LinkedEntityCard
                          to="/transport"
                          icon="🚌"
                          eyebrow="Транспорт"
                          title={linkedTransport.title}
                          description={`${linkedTransport.departure} → ${linkedTransport.arrival}`}
                          meta={transportTypeLabels[linkedTransport.type]}
                        />
                      </div>
                    </section>
                  )}

                  {nearbyRestaurants.length > 0 && (
                    <section>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
                        🍽 Рядом
                      </p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {nearbyRestaurants.map((restaurant) => (
                          <LinkedEntityCard
                            key={restaurant.id}
                            to="/sights"
                            icon="🍽️"
                            eyebrow="Ресторан"
                            title={restaurant.name}
                            description={`${restaurant.cuisine} · ${restaurant.address}`}
                            meta={`Уровень ${restaurant.priceLevel}`}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {linkedDocuments.length > 0 && (
                    <section>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
                        📄 Полезные документы
                      </p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {linkedDocuments.map((document) => (
                          <LinkedEntityCard
                            key={document.id}
                            to="/documents"
                            icon="📄"
                            eyebrow="Документ"
                            title={document.title}
                            description={`Владелец: ${document.holder}`}
                            meta={documentStatusLabels[document.status]}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}

              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                <section className="rounded-[1.75rem] border border-emerald-100 bg-emerald-50/60 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                      <Lightbulb size={20} aria-hidden="true" />
                    </span>
                    <h2 className="text-xl font-semibold tracking-[-0.025em] text-stone-950">
                      Полезные советы
                    </h2>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-stone-600">
                    {linkedTips.length > 0
                      ? linkedTips.map((tip) => (
                          <li key={tip.id} className="flex gap-3">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                            <span>
                              <strong className="block font-semibold text-stone-800">
                                {tip.title}
                              </strong>
                              <span className="mt-1 block">{tip.content}</span>
                            </span>
                          </li>
                        ))
                      : event.tips.map((tip) => (
                          <li key={tip} className="flex gap-3">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                            {tip}
                          </li>
                        ))}
                  </ul>
                </section>

                <section className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-white text-stone-700 shadow-sm">
                      <NotebookPen size={20} aria-hidden="true" />
                    </span>
                    <h2 className="text-xl font-semibold tracking-[-0.025em] text-stone-950">
                      Заметки
                    </h2>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-stone-600">
                    {event.notes}
                  </p>
                </section>
              </div>
            </>
          )}

          <Link
            to={`/trip/${day.id}`}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(22,101,52,0.2)] transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Вернуться к плану дня
          </Link>
        </article>
      </div>
    </main>
  )
}
