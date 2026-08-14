import {
  Camera,
  Lightbulb,
  MapPin,
  Route,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'
import { useMemo, type ReactNode } from 'react'
import type { EveningCityEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'
import { LightboxImage } from './lightbox'

interface EveningCityEventContentProps {
  details: EveningCityEventDetails
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

export function EveningCityEventContent({
  details,
}: EveningCityEventContentProps) {
  const placeImages = useMemo(
    () =>
      details.bestPlaces.map((place) => ({
        src: place.image,
        alt: place.title,
      })),
    [details.bestPlaces],
  )

  const galleryImages = useMemo(
    () =>
      details.gallery.map((image) => ({
        src: image.src,
        alt: image.alt,
      })),
    [details.gallery],
  )

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <Section
          icon={<Sparkles size={22} aria-hidden="true" />}
          title="✨ Почему стоит выйти вечером"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.whyEvening.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  {item.icon}
                </span>
                <p className="mt-4 text-sm font-semibold leading-6 text-stone-900 sm:text-base">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<MapPin size={22} aria-hidden="true" />}
          title="🎯 Что можно сделать"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.activities.map((item) => (
              <article
                key={item.id}
                className="flex items-center gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 sm:p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  {item.icon}
                </span>
                <p className="text-sm font-semibold text-stone-900 sm:text-base">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<Route size={22} aria-hidden="true" />}
          title="🗺️ Рекомендуемый маршрут"
        >
          <p className="mb-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
            Примерное время прогулки: {details.routeDuration}
          </p>
          <div className="mx-auto max-w-2xl">
            {details.route.map((stop, index) => (
              <div
                key={stop.id}
                className="relative grid grid-cols-[3rem_1fr] gap-3 pb-4 last:pb-0 sm:grid-cols-[3.5rem_1fr]"
              >
                {index < details.route.length - 1 && (
                  <span className="absolute bottom-0 left-6 top-12 w-px bg-emerald-200 sm:left-7" />
                )}
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-emerald-700 text-xl text-white shadow-[0_8px_20px_rgba(21,128,61,0.2)] sm:size-14">
                  {stop.icon}
                </span>
                <article className="rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-4 sm:px-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                    Точка {index + 1}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-stone-950 sm:text-lg">
                    {stop.title}
                  </h3>
                  {stop.note && (
                    <p className="mt-1 text-sm leading-6 text-stone-500">
                      {stop.note}
                    </p>
                  )}
                </article>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<Camera size={22} aria-hidden="true" />}
          title="📍 Лучшие места вечером"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {details.bestPlaces.map((place, index) => (
              <article
                key={place.id}
                className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <LightboxImage
                    src={place.image}
                    alt={place.title}
                    images={placeImages}
                    index={index}
                    className="size-full"
                    imgClassName="size-full object-cover object-center transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                      {place.icon}
                    </span>
                    <h3 className="font-semibold text-stone-950">{place.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {place.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<UtensilsCrossed size={22} aria-hidden="true" />}
          title="🍽️ Что попробовать на ужин"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.dinnerIdeas.map((item) => (
              <article
                key={item.id}
                className="flex items-center gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  {item.icon}
                </span>
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
              </article>
            ))}
          </div>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<Lightbulb size={22} aria-hidden="true" />}
          title="💡 Полезные советы"
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {details.tips.map((tip) => (
              <li
                key={tip.id}
                className="rounded-[1.25rem] border border-stone-200 bg-emerald-50/60 p-5 text-sm font-medium leading-6 text-stone-800"
              >
                {tip.text}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<Lightbulb size={22} aria-hidden="true" />}
          title={details.didYouKnow.title}
        >
          <article className="rounded-[1.5rem] border border-amber-100 bg-amber-50 p-5 sm:p-6">
            <p className="text-lg font-semibold tracking-[-0.02em] text-amber-950">
              {details.didYouKnow.storyTitle}
            </p>
            <div className="mt-4 space-y-3">
              {details.didYouKnow.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-amber-950/80">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<Camera size={22} aria-hidden="true" />}
          title="📷 Галерея"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.gallery.map((image, index) => (
              <figure
                key={image.id}
                className={`overflow-hidden rounded-[1.5rem] ${
                  index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                } ${
                  index === 0
                    ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]'
                    : 'aspect-[4/3]'
                }`}
              >
                <LightboxImage
                  src={image.src}
                  alt={image.alt}
                  images={galleryImages}
                  index={index}
                  className="size-full"
                  imgClassName="size-full object-cover object-center transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </figure>
            ))}
          </div>
        </Section>
      </div>

      <EventNavFooter action={details.nextAction} />
    </div>
  )
}
