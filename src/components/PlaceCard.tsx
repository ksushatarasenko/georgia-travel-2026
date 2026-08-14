import {
  ArrowRight,
  Clock3,
  Coins,
  ExternalLink,
  Globe,
  Heart,
  Image as ImageIcon,
  MapPin,
  Phone,
  Star,
  Timer,
  Users,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type {
  Place,
  PlaceCardCategory,
  PlaceCardData,
  PlaceCategory,
} from '../types/data'
import { ImageGallery, LightboxImage } from './lightbox'

const favoritesStorageKey = 'georgia-travel-2026:place-favorites'

const placeCategoryLabels: Record<PlaceCategory, string> = {
  sight: 'Достопримечательность',
  beach: 'Пляж',
  cafe: 'Кафе',
  park: 'Парк',
  museum: 'Музей',
  nature: 'Природа',
  shop: 'Магазин',
  transport: 'Транспорт',
  other: 'Другое',
}

const placeCategoryStyles: Record<PlaceCategory, string> = {
  sight: 'bg-rose-50 text-rose-700',
  beach: 'bg-cyan-50 text-cyan-700',
  cafe: 'bg-orange-50 text-orange-700',
  park: 'bg-lime-50 text-lime-700',
  museum: 'bg-violet-50 text-violet-700',
  nature: 'bg-emerald-50 text-emerald-700',
  shop: 'bg-blue-50 text-blue-700',
  transport: 'bg-amber-50 text-amber-700',
  other: 'bg-stone-100 text-stone-700',
}

const cardCategoryLabels: Record<PlaceCardCategory, string> = {
  restaurant: 'Ресторан',
  cafe: 'Кафе',
  beach: 'Пляж',
  hotel: 'Отель',
  waterfall: 'Водопад',
  market: 'Рынок',
  attraction: 'Достопримечательность',
}

const cardCategoryStyles: Record<PlaceCardCategory, string> = {
  restaurant: 'bg-orange-50 text-orange-700',
  cafe: 'bg-amber-50 text-amber-700',
  beach: 'bg-cyan-50 text-cyan-700',
  hotel: 'bg-violet-50 text-violet-700',
  waterfall: 'bg-sky-50 text-sky-700',
  market: 'bg-lime-50 text-lime-700',
  attraction: 'bg-rose-50 text-rose-700',
}

type LegacyPlaceCardProps = {
  place: Place
  variant?: 'default' | 'compact'
  to?: string
  data?: never
}

type TripPlaceCardProps = {
  place?: never
  data: PlaceCardData
  variant?: 'trip'
  to?: never
}

export type PlaceCardProps = LegacyPlaceCardProps | TripPlaceCardProps

function loadFavorites(): Record<string, boolean> {
  try {
    const saved = localStorage.getItem(favoritesStorageKey)
    return saved ? (JSON.parse(saved) as Record<string, boolean>) : {}
  } catch {
    return {}
  }
}

function buildGoogleMapsUrl(data: PlaceCardData): string | null {
  if (data.googleMapsUrl) return data.googleMapsUrl
  if (data.gps) {
    return `https://www.google.com/maps/search/?api=1&query=${data.gps.latitude}%2C${data.gps.longitude}`
  }
  if (data.location) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`
  }
  return null
}

function buildOrganicMapsUrl(data: PlaceCardData): string | null {
  if (data.organicMapsUrl) return data.organicMapsUrl
  if (data.gps) {
    const { latitude, longitude } = data.gps
    return `https://omaps.app/map?v=1&ll=${latitude}%2C${longitude}&n=${encodeURIComponent(data.name)}`
  }
  return null
}

function ExternalActionLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
    >
      {children}
      <ExternalLink size={14} aria-hidden="true" />
    </a>
  )
}

function TripPlaceCard({ data }: { data: PlaceCardData }) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(loadFavorites)
  const isFavorite = Boolean(favorites[data.id])

  useEffect(() => {
    localStorage.setItem(favoritesStorageKey, JSON.stringify(favorites))
  }, [favorites])

  const averagePrice = data.averagePrice ?? data.averageCheck ?? null
  const walkingTime = data.walkingTime ?? data.driveTime ?? null
  const notes = data.notes ?? data.note ?? null
  const categoryLabel = data.categoryLabel ?? cardCategoryLabels[data.category]
  const googleMapsUrl = buildGoogleMapsUrl(data)
  const organicMapsUrl = buildOrganicMapsUrl(data)
  const phoneHref = data.phone
    ? `tel:${data.phone.replace(/[^\d+]/g, '')}`
    : null
  const galleryImages =
    data.gallery?.map((image) => ({
      src: image.src,
      alt: image.alt,
    })) ?? []

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-[0_12px_40px_rgba(28,43,34,0.06)]">
      {data.coverImage ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 sm:aspect-[21/10]">
          <LightboxImage
            src={data.coverImage}
            alt={data.name}
            className="size-full"
            imgClassName="size-full object-cover"
            images={
              galleryImages.length > 0
                ? [{ src: data.coverImage, alt: data.name }, ...galleryImages]
                : [{ src: data.coverImage, alt: data.name }]
            }
            index={0}
          />
        </div>
      ) : null}

      <div className="border-b border-stone-200 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          {data.rank ? (
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-2xl">
              {data.rank}
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${cardCategoryStyles[data.category]}`}
              >
                {categoryLabel}
              </span>
              {typeof data.rating === 'number' ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-800">
                  <Star
                    size={13}
                    className="fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                  {data.rating.toFixed(1)}
                </span>
              ) : null}
              {data.familyFriendly ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                  <Users size={13} aria-hidden="true" />
                  Для семьи
                </span>
              ) : null}
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-stone-950">
              {data.name}
            </h3>
            {data.subtitle ? (
              <p className="mt-2 text-sm leading-6 text-stone-500 sm:text-base">
                {data.subtitle}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            aria-pressed={isFavorite}
            aria-label={
              isFavorite
                ? `Убрать ${data.name} из избранного`
                : `Добавить ${data.name} в избранное`
            }
            onClick={() =>
              setFavorites((current) => ({
                ...current,
                [data.id]: !current[data.id],
              }))
            }
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-stone-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
          >
            <Heart
              size={18}
              className={isFavorite ? 'fill-rose-500 text-rose-500' : undefined}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <dl className="grid gap-3 sm:grid-cols-2">
          {data.location ? (
            <div className="rounded-[1.15rem] bg-stone-50 p-4">
              <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                <MapPin size={14} aria-hidden="true" />
                Адрес
              </dt>
              <dd className="mt-2 text-sm font-medium leading-6 text-stone-800">
                {data.location}
              </dd>
            </div>
          ) : null}
          {data.distance || walkingTime ? (
            <div className="rounded-[1.15rem] bg-stone-50 p-4">
              <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                <Timer size={14} aria-hidden="true" />
                Как добраться
              </dt>
              <dd className="mt-2 text-sm font-medium leading-6 text-stone-800">
                {[data.distance, walkingTime].filter(Boolean).join(' · ')}
              </dd>
            </div>
          ) : null}
          {data.openingHours ? (
            <div className="rounded-[1.15rem] bg-stone-50 p-4">
              <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                <Clock3 size={14} aria-hidden="true" />
                Часы работы
              </dt>
              <dd className="mt-2 text-sm font-medium leading-6 text-stone-800">
                {data.openingHours}
              </dd>
            </div>
          ) : null}
          {averagePrice ? (
            <div className="rounded-[1.15rem] bg-stone-50 p-4">
              <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                <Coins size={14} aria-hidden="true" />
                Средний чек
              </dt>
              <dd className="mt-2 text-sm font-medium leading-6 text-stone-800">
                {averagePrice}
              </dd>
            </div>
          ) : null}
        </dl>

        {data.recommendedDishes && data.recommendedDishes.length > 0 ? (
          <div className="mt-5">
            <p className="text-sm font-semibold text-stone-900">
              Рекомендуемые блюда
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.recommendedDishes.map((dish) => (
                <span
                  key={dish}
                  className="rounded-full bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 ring-1 ring-stone-200"
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {data.reasons && data.reasons.length > 0 ? (
          <>
            <p className="mt-5 text-sm font-semibold text-stone-900">
              Почему стоит выбрать
            </p>
            <ul className="mt-3 space-y-2">
              {data.reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex gap-2 text-sm leading-6 text-stone-600"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                  {reason}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {galleryImages.length > 0 ? (
          <div className="mt-5">
            <p className="text-sm font-semibold text-stone-900">Галерея</p>
            <ImageGallery
              images={galleryImages}
              className="mt-3 grid grid-cols-3 gap-2"
              getItemClassName={() =>
                'aspect-square overflow-hidden rounded-xl bg-stone-100'
              }
              getImgClassName={() => 'size-full object-cover'}
            />
          </div>
        ) : null}

        {data.travelTip ? (
          <p className="mt-5 rounded-[1.25rem] border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm leading-6 text-emerald-950">
            <span className="font-semibold">Совет: </span>
            {data.travelTip}
          </p>
        ) : null}

        {notes ? (
          <p className="mt-4 rounded-[1.25rem] bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
            {notes}
          </p>
        ) : null}

        <div className="mt-auto" />

        {(googleMapsUrl ||
          organicMapsUrl ||
          data.websiteUrl ||
          data.facebookUrl ||
          phoneHref) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {googleMapsUrl ? (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                <MapPin size={15} aria-hidden="true" />
                Открыть карту
              </a>
            ) : null}
            {organicMapsUrl ? (
              <ExternalActionLink href={organicMapsUrl}>
                <MapPin size={15} aria-hidden="true" />
                Карта Organic
              </ExternalActionLink>
            ) : null}
            {phoneHref && data.phone ? (
              <ExternalActionLink href={phoneHref}>
                <Phone size={15} aria-hidden="true" />
                Позвонить
              </ExternalActionLink>
            ) : null}
            {data.websiteUrl ? (
              <ExternalActionLink href={data.websiteUrl}>
                <Globe size={15} aria-hidden="true" />
                Сайт
              </ExternalActionLink>
            ) : null}
            {data.facebookUrl ? (
              <ExternalActionLink href={data.facebookUrl}>
                <Globe size={15} aria-hidden="true" />
                Фейсбук
              </ExternalActionLink>
            ) : null}
          </div>
        )}
      </div>
    </article>
  )
}

function LegacyPlaceCard({
  place,
  variant = 'default',
  to = '/places',
}: LegacyPlaceCardProps) {
  if (variant === 'compact') {
    return (
      <article className="overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white shadow-[0_8px_28px_rgba(28,43,34,0.06)]">
        <div className="flex min-h-36 flex-col sm:flex-row">
          <div className="relative min-h-36 bg-gradient-to-br from-emerald-50 via-[#f7f8f4] to-red-50 sm:w-40 sm:shrink-0">
            {place.image ? (
              <LightboxImage
                src={place.image}
                alt={place.name}
                className="size-full min-h-36"
                imgClassName="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <ImageIcon
                  size={28}
                  className="text-emerald-700"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>

          <Link
            to={to}
            className="group flex min-w-0 flex-1 flex-col p-5 transition hover:bg-emerald-50/35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
          >
            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${placeCategoryStyles[place.category]}`}
            >
              {placeCategoryLabels[place.category]}
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-stone-950">
              {place.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-500">
              {place.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
              Открыть
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-[0_10px_35px_rgba(28,43,34,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(28,43,34,0.12)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-emerald-50 via-[#f7f8f4] to-red-50">
        {place.image ? (
          <LightboxImage
            src={place.image}
            alt={place.name}
            className="size-full"
            imgClassName="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-2xl border border-white/80 bg-white/75 text-emerald-700 shadow-sm backdrop-blur">
              <ImageIcon size={28} strokeWidth={1.6} aria-hidden="true" />
            </span>
          </div>
        )}

        <span
          className={`pointer-events-none absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${placeCategoryStyles[place.category]}`}
        >
          {placeCategoryLabels[place.category]}
        </span>

        <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-stone-900 shadow-sm backdrop-blur">
          <Star
            size={14}
            className="fill-amber-400 text-amber-400"
            aria-hidden="true"
          />
          {place.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-2xl font-semibold tracking-[-0.035em] text-stone-950">
          {place.name}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-500">
          {place.description}
        </p>

        <dl className="mt-6 grid gap-3 border-y border-stone-100 py-5 text-sm">
          <div className="flex items-start gap-3">
            <Timer
              size={17}
              className="mt-0.5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />
            <dt className="sr-only">Рекомендуемое время</dt>
            <dd className="text-stone-600">{place.recommendedVisitTime}</dd>
          </div>
          <div className="flex items-start gap-3">
            <Coins
              size={17}
              className="mt-0.5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />
            <dt className="sr-only">Стоимость</dt>
            <dd className="text-stone-600">{place.price}</dd>
          </div>
          <div className="flex items-start gap-3">
            <Clock3
              size={17}
              className="mt-0.5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />
            <dt className="sr-only">Время работы</dt>
            <dd className="text-stone-600">{place.openingHours}</dd>
          </div>
          <div className="flex items-start gap-3">
            <MapPin
              size={17}
              className="mt-0.5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />
            <dt className="sr-only">GPS</dt>
            <dd className="font-mono text-xs leading-5 text-stone-500">
              {place.gps.latitude.toFixed(4)},{' '}
              {place.gps.longitude.toFixed(4)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          disabled
          className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-stone-100 px-5 py-3 text-sm font-semibold text-stone-400"
        >
          Подробнее
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

export function PlaceCard(props: PlaceCardProps) {
  if ('data' in props && props.data) {
    return <TripPlaceCard data={props.data} />
  }

  return (
    <LegacyPlaceCard
      place={props.place}
      variant={props.variant}
      to={props.to}
    />
  )
}
