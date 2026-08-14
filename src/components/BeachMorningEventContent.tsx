import {
  Coffee,
  ExternalLink,
  Heart,
  Lightbulb,
  Luggage,
  MapPin,
  Waves,
} from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { BeachMorningEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'
import { LightboxImage } from './lightbox'
import { ScheduleCard } from './ScheduleCard'

const favoritesStorageKey = 'georgia-travel-2026:place-favorites'

interface BeachMorningEventContentProps {
  details: BeachMorningEventDetails
  favoriteId: string
}

interface SectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function Section({ icon, title, children }: SectionProps) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(28,43,34,0.06)] sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          {icon}
        </span>
        <h2 className="text-xl font-semibold tracking-[-0.025em] text-stone-950 sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
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

export function BeachMorningEventContent({
  details,
  favoriteId,
}: BeachMorningEventContentProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(favoritesStorageKey)
      return saved ? (JSON.parse(saved) as Record<string, boolean>) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(favoritesStorageKey, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = Boolean(favorites[favoriteId])

  const galleryImages = useMemo(
    () =>
      (details.gallery ?? []).map((image) => ({
        src: image.src,
        alt: image.alt,
      })),
    [details.gallery],
  )

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {details.timeline ? (
        <div className="lg:col-span-2">
          <ScheduleCard
            title={details.timeline.title}
            range={details.timeline.range}
            steps={details.timeline.steps}
          />
        </div>
      ) : null}

      <div className="lg:col-span-2">
        <p className="text-base leading-7 text-stone-500 sm:text-lg">
          {details.subtitle}
        </p>
        <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-700">
            Локация
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-stone-950">
            {details.location.hotelName}
          </h3>
          <p className="mt-1 text-sm leading-6 text-stone-600">
            {details.location.hotelAddress}
          </p>
          <p className="mt-3 text-sm font-medium text-stone-800">
            🌊 {details.location.beachName}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <ExternalActionLink href={details.location.googleMapsUrl}>
              <MapPin size={15} aria-hidden="true" />
              Карты Google
            </ExternalActionLink>
            <ExternalActionLink href={details.location.organicMapsUrl}>
              <MapPin size={15} aria-hidden="true" />
              Карта Organic
            </ExternalActionLink>
            <button
              type="button"
              aria-pressed={isFavorite}
              onClick={() =>
                setFavorites((current) => ({
                  ...current,
                  [favoriteId]: !current[favoriteId],
                }))
              }
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
            >
              <Heart
                size={15}
                className={
                  isFavorite ? 'fill-rose-500 text-rose-500' : undefined
                }
                aria-hidden="true"
              />
              {isFavorite ? 'В избранном' : 'В избранное'}
            </button>
          </div>
        </div>
      </div>

      {details.gallery && details.gallery.length > 0 ? (
        <div className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.gallery.map((image, index) => (
              <figure
                key={image.id}
                className={`overflow-hidden rounded-[1.5rem] ${
                  index === 0
                    ? 'aspect-[16/10] sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:min-h-[18rem]'
                    : 'aspect-[4/3]'
                }`}
              >
                <LightboxImage
                  src={image.src}
                  alt={image.alt}
                  images={galleryImages}
                  index={index}
                  className="size-full"
                  imgClassName="size-full object-cover object-center"
                />
              </figure>
            ))}
          </div>
        </div>
      ) : null}

      <div className="lg:col-span-2">
        <Section
          icon={<Coffee size={22} aria-hidden="true" />}
          title={details.breakfast.title}
        >
          <div className="space-y-3">
            {details.breakfast.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-7 text-stone-600 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.breakfast.items.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4"
              >
                <span className="text-2xl" aria-hidden="true">
                  {item.icon}
                </span>
                <p className="mt-3 text-sm font-semibold text-stone-900">
                  {item.title}
                </p>
                {item.note ? (
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    {item.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<Waves size={22} aria-hidden="true" />}
          title={details.beachOverview.title}
        >
          <div className="space-y-3">
            {details.beachOverview.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-7 text-stone-600 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.beachOverview.facts.map((fact) => (
              <article
                key={fact.id}
                className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4"
              >
                <span className="text-xl" aria-hidden="true">
                  {fact.icon}
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                  {fact.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-stone-900">
                  {fact.value}
                </p>
                {fact.note ? (
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    {fact.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </Section>
      </div>

      <div>
        <Section
          icon={<Luggage size={22} aria-hidden="true" />}
          title={details.whatToBring.title}
        >
          <ul className="space-y-3">
            {details.whatToBring.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4"
              >
                <span className="text-xl" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-sm font-semibold text-stone-900">
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div>
        <Section
          icon={<Luggage size={22} aria-hidden="true" />}
          title={details.whatToLeave.title}
        >
          <ul className="space-y-3">
            {details.whatToLeave.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4"
              >
                <span className="text-xl" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-sm font-semibold text-stone-900">
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<Lightbulb size={22} aria-hidden="true" />}
          title={details.dailyTip.title}
        >
          <p className="rounded-[1.25rem] border border-emerald-100 bg-emerald-50/70 p-5 text-sm leading-7 text-emerald-950 sm:text-base">
            {details.dailyTip.text}
          </p>
        </Section>
      </div>

      <EventNavFooter action={details.nextAction} />
    </div>
  )
}
