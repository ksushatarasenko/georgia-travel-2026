import {
  Camera,
  Check,
  Lightbulb,
  ListChecks,
  MapPin,
} from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { GuideEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'
import { LightboxImage } from './lightbox'
import { PlaceCard } from './PlaceCard'
import { ScheduleCard } from './ScheduleCard'

interface GuideEventContentProps {
  details: GuideEventDetails
  storageKey?: string
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

export function GuideEventContent({
  details,
  storageKey,
}: GuideEventContentProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      if (!storageKey) return {}
      try {
        const saved = localStorage.getItem(storageKey)
        return saved ? JSON.parse(saved) : {}
      } catch {
        return {}
      }
    },
  )

  useEffect(() => {
    if (!storageKey) return
    localStorage.setItem(storageKey, JSON.stringify(checkedItems))
  }, [checkedItems, storageKey])

  const galleryImages = useMemo(
    () =>
      (details.gallery ?? []).map((image) => ({
        src: image.src,
        alt: image.alt,
      })),
    [details.gallery],
  )

  const placeImages = useMemo(
    () =>
      (details.places ?? [])
        .filter((place) => place.image)
        .map((place) => ({
          src: place.image as string,
          alt: place.title,
        })),
    [details.places],
  )

  const checklist = details.checklist ?? []
  const completedItems = checklist.filter((item) => checkedItems[item.id]).length
  const progress =
    checklist.length > 0
      ? Math.round((completedItems / checklist.length) * 100)
      : 0

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

      {details.intro && details.intro.length > 0 && (
        <div className="lg:col-span-2">
          <Section
            icon={<MapPin size={22} aria-hidden="true" />}
            title={details.introTitle ?? 'Коротко'}
          >
            <div className="space-y-3">
              {details.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-stone-600 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Section>
        </div>
      )}

      {details.gallery && details.gallery.length > 0 && (
        <div className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.gallery.map((image, index) => (
              <figure
                key={image.id}
                className={`overflow-hidden rounded-[1.5rem] ${
                  index === 0
                    ? 'aspect-[16/10] sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:min-h-[20rem]'
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
      )}

      {details.facts && details.facts.length > 0 && (
        <div className="lg:col-span-2">
          <Section
            icon={<ListChecks size={22} aria-hidden="true" />}
            title={details.factsTitle ?? 'Практическая информация'}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {details.facts.map((fact) => (
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
                  <p className="mt-2 text-sm font-semibold leading-6 text-stone-900">
                    {fact.value}
                  </p>
                  {fact.note && (
                    <p className="mt-2 text-sm leading-6 text-stone-500">
                      {fact.note}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </Section>
        </div>
      )}

      {details.steps && details.steps.length > 0 && (
        <div className="lg:col-span-2">
          <Section
            icon={<ListChecks size={22} aria-hidden="true" />}
            title={details.stepsTitle ?? 'Как это сделать'}
          >
            <ol className="space-y-3">
              {details.steps.map((step, index) => (
                <li
                  key={step.id}
                  className="flex gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 sm:gap-4 sm:p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    {step.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                      Шаг {index + 1}
                    </p>
                    <p className="mt-1 font-semibold text-stone-950">
                      {step.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-stone-600">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        </div>
      )}

      {details.places && details.places.length > 0 && (
        <div className="lg:col-span-2">
          <Section
            icon={<Camera size={22} aria-hidden="true" />}
            title={details.placesTitle ?? 'Что посмотреть'}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {details.places.map((place) => {
                const imageIndex = placeImages.findIndex(
                  (item) => item.src === place.image,
                )

                return (
                  <article
                    key={place.id}
                    className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50"
                  >
                    {place.image && imageIndex >= 0 && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <LightboxImage
                          src={place.image}
                          alt={place.title}
                          images={placeImages}
                          index={imageIndex}
                          className="size-full"
                          imgClassName="size-full object-cover object-center transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                          {place.icon}
                        </span>
                        <h3 className="font-semibold text-stone-950">
                          {place.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-stone-600">
                        {place.description}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </Section>
        </div>
      )}

      {details.placeCards && details.placeCards.length > 0 ? (
        <div className="lg:col-span-2">
          <Section
            icon={<MapPin size={22} aria-hidden="true" />}
            title={details.placeCardsTitle ?? 'Места'}
          >
            <div
              className={`grid gap-5 ${
                details.placeCards.length > 1 ? 'lg:grid-cols-2' : ''
              }`}
            >
              {details.placeCards.map((place) => (
                <PlaceCard key={place.id} data={place} />
              ))}
            </div>
          </Section>
        </div>
      ) : null}

      {details.packingItems && details.packingItems.length > 0 && (
        <div className="lg:col-span-2">
          <Section
            icon={<Check size={22} aria-hidden="true" />}
            title={details.packingTitle ?? 'Что взять с собой'}
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {details.packingItems.map((item) => (
                <article
                  key={item.id}
                  className="flex items-center gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    {item.icon}
                  </span>
                  <p className="text-sm font-semibold text-stone-900">
                    {item.title}
                  </p>
                </article>
              ))}
            </div>
          </Section>
        </div>
      )}

      {details.warnings && (
        <div className="lg:col-span-2">
          <article className="rounded-[1.75rem] border border-amber-100 bg-amber-50 p-5 sm:p-7">
            <p className="text-lg font-semibold text-amber-950">
              {details.warnings.title}
            </p>
            <ul className="mt-4 space-y-2">
              {details.warnings.lines.map((line) => (
                <li
                  key={line}
                  className="rounded-xl bg-white/70 px-3 py-2.5 text-sm leading-6 text-amber-900/85"
                >
                  {line}
                </li>
              ))}
            </ul>
          </article>
        </div>
      )}

      {details.tips && details.tips.length > 0 && (
        <div className="lg:col-span-2">
          <Section
            icon={<Lightbulb size={22} aria-hidden="true" />}
            title={details.tipsTitle ?? 'Полезные советы'}
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
      )}

      {details.didYouKnow && (
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
                  <p
                    key={paragraph}
                    className="text-sm leading-7 text-amber-950/80"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </Section>
        </div>
      )}

      {checklist.length > 0 && (
        <div className="lg:col-span-2">
          <Section
            icon={<Check size={22} aria-hidden="true" />}
            title="Чек-лист"
          >
            <div className="mb-5 rounded-2xl bg-emerald-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-emerald-900">
                  Выполнено
                </span>
                <span className="text-sm font-semibold text-emerald-800">
                  {completedItems} из {checklist.length}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-emerald-700 transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {checklist.map((item) => {
                const isChecked = Boolean(checkedItems[item.id])
                return (
                  <label
                    key={item.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                      isChecked
                        ? 'border-emerald-200 bg-emerald-50/70'
                        : 'border-stone-200 bg-stone-50 hover:border-emerald-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(event) =>
                        setCheckedItems((current) => ({
                          ...current,
                          [item.id]: event.target.checked,
                        }))
                      }
                      className="sr-only"
                    />
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-lg border transition ${
                        isChecked
                          ? 'border-emerald-700 bg-emerald-700 text-white'
                          : 'border-stone-300 bg-white text-transparent'
                      }`}
                    >
                      <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        isChecked
                          ? 'text-emerald-900 line-through decoration-emerald-400'
                          : 'text-stone-700'
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                )
              })}
            </div>
          </Section>
        </div>
      )}

      <EventNavFooter action={details.nextAction} />
    </div>
  )
}
