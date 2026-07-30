import {
  ArrowRight,
  Clock3,
  Coins,
  Image as ImageIcon,
  MapPin,
  Star,
  Timer,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Place, PlaceCategory } from '../types/data'
import { LightboxImage } from './lightbox'

const categoryLabels: Record<PlaceCategory, string> = {
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

const categoryStyles: Record<PlaceCategory, string> = {
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

interface PlaceCardProps {
  place: Place
  variant?: 'default' | 'compact'
  to?: string
}

export function PlaceCard({
  place,
  variant = 'default',
  to = '/places',
}: PlaceCardProps) {
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
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[place.category]}`}
            >
              {categoryLabels[place.category]}
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
          className={`pointer-events-none absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${categoryStyles[place.category]}`}
        >
          {categoryLabels[place.category]}
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
