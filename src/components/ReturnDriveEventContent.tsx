import {
  Camera,
  Clock3,
  Lightbulb,
  Store,
} from 'lucide-react'
import { useMemo, type ReactNode } from 'react'
import type { ReturnDriveEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'
import { LightboxImage } from './lightbox'

interface ReturnDriveEventContentProps {
  details: ReturnDriveEventDetails
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

export function ReturnDriveEventContent({
  details,
}: ReturnDriveEventContentProps) {
  const galleryImages = useMemo(
    () =>
      details.gallery.map((image) => ({
        src: image.src,
        alt: image.alt,
      })),
    [details.gallery],
  )

  const sceneryImages = useMemo(
    () =>
      details.scenery.map((item) => ({
        src: item.image,
        alt: item.title,
      })),
    [details.scenery],
  )

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {details.gallery.map((image, index) => (
            <figure
              key={image.id}
              className={`overflow-hidden rounded-[1.5rem] ${
                index === 0
                  ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
                  : ''
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
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<Clock3 size={22} aria-hidden="true" />}
          title="⏱️ Время в пути"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {details.tripFacts.map((fact) => (
              <article
                key={fact.id}
                className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  {fact.icon}
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                  {fact.label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-stone-900 sm:text-base">
                  {fact.value}
                </p>
              </article>
            ))}
          </div>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<Camera size={22} aria-hidden="true" />}
          title="🌄 Что увидите по дороге"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {details.scenery.map((item, index) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <LightboxImage
                    src={item.image}
                    alt={item.title}
                    images={sceneryImages}
                    index={index}
                    className="size-full"
                    imgClassName="size-full object-cover object-center transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                      {item.icon}
                    </span>
                    <h3 className="font-semibold text-stone-950">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<Store size={22} aria-hidden="true" />}
          title="🛑 Если хочется сделать остановку"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {details.stops.map((stop) => (
              <article
                key={stop.id}
                className="flex gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 sm:p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  {stop.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-stone-950">{stop.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-stone-600">
                    {stop.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          icon={<Lightbulb size={22} aria-hidden="true" />}
          title="💡 Полезный совет"
        >
          <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-emerald-900 sm:text-base">
              {details.tip.title}
            </p>
            <p className="mt-3 text-sm leading-7 text-emerald-900/80 sm:text-base">
              {details.tip.text}
            </p>
          </div>
        </Section>
      </div>

      <EventNavFooter action={details.nextAction} />
    </div>
  )
}
