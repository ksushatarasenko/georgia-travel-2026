import {
  ArrowRight,
  Building2,
  Check,
  Clock3,
  ExternalLink,
  Lightbulb,
  MapPin,
  Mountain,
  Route,
  Ticket,
} from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { AttractionEventDetails } from '../types/data'
import { LightboxImage } from './lightbox'

interface AttractionEventContentProps {
  details: AttractionEventDetails
  storageKey: string
}

interface AttractionSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function AttractionSection({
  icon,
  title,
  children,
}: AttractionSectionProps) {
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

export function AttractionEventContent({
  details,
  storageKey,
}: AttractionEventContentProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      try {
        const savedValue = localStorage.getItem(storageKey)
        return savedValue ? JSON.parse(savedValue) : {}
      } catch {
        return {}
      }
    },
  )

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checkedItems))
  }, [checkedItems, storageKey])

  const completedItems = details.packingChecklist.filter(
    (item) => checkedItems[item.id],
  ).length
  const progress =
    details.packingChecklist.length > 0
      ? Math.round((completedItems / details.packingChecklist.length) * 100)
      : 0

  const mainGallery = useMemo(
    () =>
      details.gallery.map((image) => ({
        src: image.src,
        alt: image.alt,
      })),
    [details.gallery],
  )

  const highlightGallery = useMemo(
    () =>
      details.highlights.map((item) => ({
        src: item.image,
        alt: item.title,
      })),
    [details.highlights],
  )

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <AttractionSection
          icon={<Ticket size={22} aria-hidden="true" />}
          title="🎫 Как проходит посещение"
        >
          <ol className="space-y-3">
            {details.visitFlow.map((step, index) => (
              <li
                key={step.id}
                className="flex gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 sm:gap-4 sm:p-5"
              >
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                    Шаг {index + 1}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-stone-700 sm:text-base sm:leading-7">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </AttractionSection>
      </div>

      <div className="lg:col-span-2">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {details.gallery.map((image, index) => (
            <figure
              key={image.id}
              className={`overflow-hidden rounded-[1.5rem] ${
                index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
              } ${index === 0 ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[28rem]' : 'aspect-[4/3]'}`}
            >
              <LightboxImage
                src={image.src}
                alt={image.alt}
                images={mainGallery}
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
        <AttractionSection
          icon={<Mountain size={22} aria-hidden="true" />}
          title="Краткая информация"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {details.quickFacts.map((fact) => (
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
              </article>
            ))}
          </div>
        </AttractionSection>
      </div>

      <div className="lg:col-span-2">
        <AttractionSection
          icon={<MapPin size={22} aria-hidden="true" />}
          title="Где находится"
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                📍 Адрес
              </p>
              <p className="mt-3 font-semibold leading-6 text-stone-900">
                {details.location.address}
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                📌 Координаты
              </p>
              <p className="mt-3 font-mono text-sm font-semibold text-stone-900">
                {details.location.coordinates}
              </p>
            </article>
            <a
              href={details.location.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[1.5rem] bg-emerald-900 p-5 text-sm font-semibold text-white transition hover:bg-emerald-950"
            >
              🗺️ Открыть в Google Maps
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </AttractionSection>
      </div>

      <div className="lg:col-span-2">
        <AttractionSection
          icon={<Route size={22} aria-hidden="true" />}
          title="Как добраться"
        >
          <div className="mb-5 rounded-2xl bg-emerald-50 p-4 sm:p-5">
            <p className="text-sm font-semibold text-emerald-900">
              {details.transportTip.title}
            </p>
            <div className="mt-3 space-y-2">
              {details.transportTip.lines.map((line) => (
                <p
                  key={line}
                  className="text-sm leading-6 text-emerald-900/80"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {details.transportOptions.map((option) => (
              <article
                key={option.id}
                className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50"
              >
                <div className="border-b border-stone-200 bg-white p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                      {option.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-stone-950">
                          {option.title}
                        </h3>
                        {option.badge && (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                            {option.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-stone-600">
                    {option.description}
                  </p>
                </div>

                <div className="flex flex-col gap-5 p-5 sm:p-6">
                  <div
                    className={`grid gap-3 ${
                      option.id === 'bolt'
                        ? 'sm:grid-cols-2 lg:grid-cols-4'
                        : 'sm:grid-cols-2'
                    }`}
                  >
                    {option.infoBlocks.map((block) => (
                      <div
                        key={block.label}
                        className={`rounded-2xl bg-white p-4 shadow-sm ${
                          block.options && block.options.length > 0
                            ? 'sm:col-span-2'
                            : ''
                        }`}
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                          {block.label}
                        </p>
                        {block.options && block.options.length > 0 ? (
                          <div className="mt-3 space-y-3">
                            {block.options.map((priceOption, index) => (
                              <div key={priceOption.title}>
                                {index > 0 && (
                                  <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                                    или
                                  </p>
                                )}
                                <div className="rounded-xl bg-stone-50 px-3 py-3">
                                  <p className="text-sm font-medium text-stone-600">
                                    {priceOption.title}
                                  </p>
                                  <p className="mt-1 text-sm font-semibold text-stone-900">
                                    {priceOption.value}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          block.value && (
                            <p className="mt-2 text-sm font-semibold text-stone-900">
                              {block.value}
                            </p>
                          )
                        )}
                        {block.note && (
                          <p className="mt-2 text-xs leading-5 text-stone-500">
                            {block.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {option.includes && option.includes.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Что входит
                      </p>
                      <ul className="mt-3 space-y-2">
                        {option.includes.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm leading-6 text-stone-600"
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {option.bookingPlaces && option.bookingPlaces.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Где можно забронировать
                      </p>
                      <ul className="mt-3 space-y-2">
                        {option.bookingPlaces.map((place) => (
                          <li
                            key={place}
                            className="rounded-xl bg-white px-3 py-2.5 text-sm text-stone-700 shadow-sm"
                          >
                            {place}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-emerald-50 p-4">
                      <p className="text-sm font-semibold text-emerald-900">
                        Плюсы
                      </p>
                      <ul className="mt-3 space-y-2">
                        {option.pros.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm leading-6 text-emerald-900/80"
                          >
                            <span aria-hidden="true">✅</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-red-50 p-4">
                      <p className="text-sm font-semibold text-red-900">
                        Минусы
                      </p>
                      <ul className="mt-3 space-y-2">
                        {option.cons.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm leading-6 text-red-900/80"
                          >
                            <span aria-hidden="true">❌</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </AttractionSection>
      </div>

      <div className="lg:col-span-2">
        <AttractionSection
          icon={<Ticket size={22} aria-hidden="true" />}
          title="Стоимость посещения"
        >
          <div className="grid gap-4 sm:grid-cols-2 sm:items-stretch">
            {details.ticketPrices.map((ticket) => (
              <article
                key={ticket.id}
                className="flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    {ticket.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                      {ticket.label}
                    </p>
                    {ticket.value && (
                      <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-emerald-700 sm:text-3xl">
                        {ticket.value}
                      </p>
                    )}
                    {ticket.note && (
                      <p className="mt-1 text-sm text-stone-500">{ticket.note}</p>
                    )}
                  </div>
                </div>

                {ticket.description && (
                  <p className="mt-4 text-sm leading-6 text-stone-600">
                    {ticket.description}
                  </p>
                )}

                {ticket.duration && (
                  <p className="mt-3 rounded-xl bg-white px-3 py-2.5 text-sm text-stone-700 shadow-sm">
                    <span className="font-semibold text-stone-900">
                      Продолжительность:
                    </span>{' '}
                    {ticket.duration}
                  </p>
                )}

                {ticket.pricedRows && ticket.pricedRows.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {ticket.pricedRows.map((row) => (
                      <div
                        key={row.label}
                        className="rounded-xl bg-white px-3 py-3 shadow-sm"
                      >
                        <p className="text-sm font-medium text-stone-600">
                          {row.label}
                        </p>
                        {row.note && (
                          <p className="mt-1 text-xs text-stone-500">{row.note}</p>
                        )}
                        <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-emerald-700">
                          {row.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {ticket.details && ticket.details.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {ticket.details.map((detail) => (
                      <li
                        key={detail}
                        className="rounded-xl bg-white px-3 py-2.5 text-sm leading-6 text-stone-700 shadow-sm"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}

                {ticket.warning && (
                  <div className="mt-auto pt-4">
                    <div className="rounded-2xl bg-amber-50 p-4">
                      <p className="text-sm font-semibold text-amber-900">
                        {ticket.warning.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-amber-900/80">
                        {ticket.warning.text}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>

          {details.ticketWarning && (
            <article className="mt-4 rounded-[1.5rem] border border-amber-100 bg-amber-50 p-5 sm:p-6">
              <p className="text-sm font-semibold text-amber-900">
                {details.ticketWarning.title}
              </p>
              <ul className="mt-4 space-y-2">
                {details.ticketWarning.lines.map((line) => (
                  <li
                    key={line}
                    className="rounded-xl bg-white/70 px-3 py-2.5 text-sm leading-6 text-amber-900/80"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          )}

          {details.ticketIncludes && (
            <article className="mt-4 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 sm:p-6">
              <p className="text-sm font-semibold text-stone-900">
                {details.ticketIncludes.title}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {details.ticketIncludes.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl bg-white px-3 py-2.5 text-sm leading-6 text-stone-700 shadow-sm"
                  >
                    ✅ {item}
                  </li>
                ))}
              </ul>
              {details.ticketIncludes.note && (
                <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
                  🚣 {details.ticketIncludes.note}
                </p>
              )}
            </article>
          )}

          {details.ticketTip && (
            <article className="mt-4 rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-5 sm:p-6">
              <p className="text-sm font-semibold text-emerald-900">
                {details.ticketTip.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-emerald-900/80">
                {details.ticketTip.text}
              </p>
            </article>
          )}
        </AttractionSection>
      </div>

      <div className="lg:col-span-2">
        <AttractionSection
          icon={<Clock3 size={22} aria-hidden="true" />}
          title="Режим работы"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {details.openingHours.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-stone-900">
                      {item.value}
                    </p>
                    {item.note && (
                      <p className="mt-2 text-sm leading-6 text-stone-500">
                        {item.note}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-5 sm:p-6">
              <p className="text-sm font-semibold text-emerald-900">
                {details.openingHoursInfo.title}
              </p>
              <ul className="mt-4 space-y-2">
                {details.openingHoursInfo.lines.map((line) => (
                  <li
                    key={line}
                    className="rounded-xl bg-white/70 px-3 py-2.5 text-sm leading-6 text-emerald-900/80"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[1.5rem] border border-amber-100 bg-amber-50 p-5 sm:p-6">
              <p className="text-sm font-semibold text-amber-900">
                {details.openingHoursWarning.title}
              </p>
              <ul className="mt-4 space-y-2">
                {details.openingHoursWarning.lines.map((line) => (
                  <li
                    key={line}
                    className="rounded-xl bg-white/70 px-3 py-2.5 text-sm leading-6 text-amber-900/80"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </AttractionSection>
      </div>

      <div className="lg:col-span-2">
        <AttractionSection
          icon={<Mountain size={22} aria-hidden="true" />}
          title="Что вас ждёт"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {details.highlights.map((item, index) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <LightboxImage
                    src={item.image}
                    alt={item.title}
                    images={highlightGallery}
                    index={index}
                    className="size-full"
                    imgClassName="size-full object-cover object-center transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="p-4 font-semibold text-stone-900">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </AttractionSection>
      </div>

      <div className="lg:col-span-2">
        <AttractionSection
          icon={
            <span className="text-xl" aria-hidden="true">
              {details.didYouKnow.icon}
            </span>
          }
          title={details.didYouKnow.title}
        >
          <article className="rounded-[1.5rem] border border-amber-100 bg-gradient-to-br from-amber-50 via-orange-50/70 to-stone-50 p-5 sm:p-7">
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-stone-950 sm:text-xl">
              {details.didYouKnow.storyTitle}
            </h3>
            <div className="mt-4 space-y-3">
              {details.didYouKnow.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-stone-700 sm:text-[0.95rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {details.didYouKnow.highlight && (
              <div className="mt-5 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-amber-100">
                <p className="text-sm font-medium leading-6 text-amber-950">
                  ✨ {details.didYouKnow.highlight}
                </p>
              </div>
            )}
          </article>
        </AttractionSection>
      </div>

      <div className="lg:col-span-2">
        <AttractionSection
          icon={<Check size={22} aria-hidden="true" />}
          title="Что взять с собой"
        >
          <div className="mb-5 rounded-2xl bg-emerald-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-emerald-900">
                Выполнено
              </span>
              <span className="text-sm font-semibold text-emerald-800">
                {completedItems} из {details.packingChecklist.length}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-100">
              <div
                className="h-full rounded-full bg-emerald-700 transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.packingChecklist.map((item) => {
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
        </AttractionSection>
      </div>

      <div className="lg:col-span-2">
        <AttractionSection
          icon={<Lightbulb size={22} aria-hidden="true" />}
          title="Полезные советы"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {details.usefulTips.map((tip) => (
              <article
                key={tip.id}
                className="rounded-[1.5rem] border border-stone-200 bg-emerald-50/60 p-5"
              >
                <p className="text-sm font-semibold leading-6 text-stone-800">
                  {tip.title}
                </p>
              </article>
            ))}
          </div>
        </AttractionSection>
      </div>

      <div className="lg:col-span-2">
        <AttractionSection
          icon={<Building2 size={22} aria-hidden="true" />}
          title="Инфраструктура"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
            {details.infrastructure.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-stone-900">{item.title}</h3>
                    <p
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                        item.statusTone === 'ok'
                          ? 'bg-emerald-50 text-emerald-800 ring-emerald-200'
                          : 'bg-amber-50 text-amber-900 ring-amber-200'
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-1 flex-col gap-2">
                  {item.description.map((line) => (
                    <p
                      key={line}
                      className="text-sm leading-6 text-stone-600"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </AttractionSection>
      </div>

      <div className="lg:col-span-2">
        <AttractionSection
          icon={<Mountain size={22} aria-hidden="true" />}
          title="Следующий шаг"
        >
          <Link
            to={`/trip/event/${details.nextAction.eventId}`}
            className="group flex items-center gap-4 rounded-[1.5rem] bg-emerald-900 p-5 text-white shadow-[0_15px_40px_rgba(20,83,45,0.18)] transition hover:-translate-y-0.5 hover:bg-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:p-7"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              {details.nextAction.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xl font-semibold">
                {details.nextAction.title}
              </span>
              <span className="mt-1 block text-sm leading-6 text-emerald-100/80">
                {details.nextAction.description}
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
              {details.nextAction.buttonLabel}
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </AttractionSection>
      </div>
    </div>
  )
}
