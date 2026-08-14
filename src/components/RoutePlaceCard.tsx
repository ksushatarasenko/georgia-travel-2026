import {
  ArrowRight,
  Clock3,
  Coins,
  Image as ImageIcon,
  Star,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { RoutePlaceBadge, RoutePlaceCard } from '../types/data'
import {
  ROUTE_PLACE_BADGE_LABELS,
} from '../lib/routePlaces'

const categoryStyles: Record<RoutePlaceCard['category'], string> = {
  attraction: 'bg-rose-50 text-rose-700',
  beach: 'bg-cyan-50 text-cyan-800',
  mountain: 'bg-sky-50 text-sky-800',
  waterfall: 'bg-teal-50 text-teal-800',
  cafe: 'bg-orange-50 text-orange-800',
  restaurant: 'bg-amber-50 text-amber-900',
  shopping: 'bg-fuchsia-50 text-fuchsia-800',
  evening: 'bg-violet-50 text-violet-800',
  transport: 'bg-yellow-50 text-yellow-900',
  airport: 'bg-slate-100 text-slate-800',
}

const badgeStyles: Record<RoutePlaceBadge, string> = {
  free: 'bg-emerald-50 text-emerald-800',
  family: 'bg-lime-50 text-lime-800',
  'best-photo': 'bg-pink-50 text-pink-800',
  sunset: 'bg-orange-50 text-orange-800',
  swim: 'bg-cyan-50 text-cyan-800',
  marshrutka: 'bg-amber-50 text-amber-900',
  bolt: 'bg-green-50 text-green-800',
  walk: 'bg-stone-100 text-stone-700',
}

interface RoutePlaceCardProps {
  place: RoutePlaceCard
}

export function RoutePlaceCardView({ place }: RoutePlaceCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-[0_10px_35px_rgba(28,43,34,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(28,43,34,0.12)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-emerald-50 via-[#f7f8f4] to-rose-50">
        {place.image ? (
          <img
            src={place.image}
            alt={place.title}
            className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-2xl border border-white/80 bg-white/75 text-2xl shadow-sm backdrop-blur">
              {place.icon || (
                <ImageIcon size={28} strokeWidth={1.6} aria-hidden="true" />
              )}
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${categoryStyles[place.category]}`}
          >
            <span className="mr-1" aria-hidden="true">
              {place.categoryIcon}
            </span>
            {place.categoryLabel}
          </span>

          {typeof place.rating === 'number' ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-stone-800 shadow-sm">
              <Star
                size={13}
                className="fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              {place.rating.toFixed(1)}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-xl font-semibold tracking-[-0.035em] text-stone-950 sm:text-2xl">
          <span className="mr-2" aria-hidden="true">
            {place.icon}
          </span>
          {place.title}
        </h2>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-500">
          {place.description}
        </p>

        {(place.duration || place.price) && (
          <dl className="mt-5 grid gap-2 text-sm text-stone-600">
            {place.duration ? (
              <div className="flex items-start gap-2">
                <Clock3
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-700"
                  aria-hidden="true"
                />
                <dd>{place.duration}</dd>
              </div>
            ) : null}
            {place.price ? (
              <div className="flex items-start gap-2">
                <Coins
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-700"
                  aria-hidden="true"
                />
                <dd>{place.price}</dd>
              </div>
            ) : null}
          </dl>
        )}

        {place.badges.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {place.badges.map((badge) => (
              <li
                key={badge}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeStyles[badge]}`}
              >
                {ROUTE_PLACE_BADGE_LABELS[badge]}
              </li>
            ))}
          </ul>
        ) : null}

        <Link
          to={`${place.href}?from=sights`}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          Открыть
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
