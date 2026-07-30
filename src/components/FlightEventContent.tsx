import {
  AlarmClock,
  Armchair,
  Backpack,
  BadgeCheck,
  CalendarDays,
  CarTaxiFront,
  Check,
  Coins,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  Luggage,
  PlaneLanding,
  PlaneTakeoff,
  Timer,
  Users,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import type { FlightEventDetails } from '../types/data'
import { LightboxImage, useLightbox } from './lightbox'

const checklistStorageKey =
  'georgia-travel-2026:flight-poznan:departure-checklist'
const packingStorageKey =
  'georgia-travel-2026:flight-poznan:packing-checklist'

interface FlightEventContentProps {
  details: FlightEventDetails
}

interface FlightSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function FlightSection({ icon, title, children }: FlightSectionProps) {
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

function formatFlightDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))
}

export function FlightEventContent({ details }: FlightEventContentProps) {
  const { openLightbox } = useLightbox()
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      try {
        const savedValue = localStorage.getItem(checklistStorageKey)
        return savedValue ? JSON.parse(savedValue) : {}
      } catch {
        return {}
      }
    },
  )
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>(
    () => {
      try {
        const savedValue = localStorage.getItem(packingStorageKey)
        return savedValue ? JSON.parse(savedValue) : {}
      } catch {
        return {}
      }
    },
  )

  useEffect(() => {
    localStorage.setItem(checklistStorageKey, JSON.stringify(checkedItems))
  }, [checkedItems])

  useEffect(() => {
    localStorage.setItem(packingStorageKey, JSON.stringify(packedItems))
  }, [packedItems])

  const completedItems = details.checklist.filter(
    (item) => checkedItems[item.id],
  ).length

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <FlightSection
          icon={<PlaneTakeoff size={22} aria-hidden="true" />}
          title="Общая информация"
        >
          <div className="rounded-[1.5rem] bg-[#f7f8f4] p-5 sm:p-7">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div>
                <p className="text-2xl font-semibold tracking-[-0.035em] text-stone-950 sm:text-3xl">
                  POZ
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  {details.route.origin}
                </p>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <span className="h-px w-6 bg-emerald-300 sm:w-12" />
                <PlaneTakeoff size={20} aria-hidden="true" />
                <span className="h-px w-6 bg-emerald-300 sm:w-12" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold tracking-[-0.035em] text-stone-950 sm:text-3xl">
                  KUT
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  {details.route.destination}
                </p>
              </div>
            </div>
          </div>

          <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: 'Дата',
                value: formatFlightDate(details.date),
                icon: <CalendarDays size={18} />,
              },
              {
                label: 'Вылет',
                value: details.departureTime,
                icon: <PlaneTakeoff size={18} />,
              },
              {
                label: 'Прилёт',
                value: details.arrivalTime,
                icon: <PlaneLanding size={18} />,
              },
              {
                label: 'В пути',
                value: details.duration,
                icon: <Timer size={18} />,
              },
              {
                label: 'Авиакомпания',
                value: details.airline,
                icon: <BadgeCheck size={18} />,
              },
              {
                label: 'Пассажиры',
                value: String(details.passengerCount),
                icon: <Users size={18} />,
              },
              {
                label: 'Места',
                value: details.seats.join(' · '),
                icon: <Armchair size={18} />,
              },
              {
                label: 'Регистрация',
                value: details.checkIn,
                icon: <BadgeCheck size={18} />,
              },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-stone-50 p-4">
                <span className="text-emerald-700" aria-hidden="true">
                  {item.icon}
                </span>
                <dt className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-stone-400">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-6 text-stone-900">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </FlightSection>
      </div>

      <FlightSection
        icon={<FileText size={22} aria-hidden="true" />}
        title="Документы"
      >
        <div className="space-y-3">
          {details.documents.map((document) => (
            <article
              key={document.id}
              className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                  {document.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold leading-6 text-stone-900">
                    {document.title}
                  </h3>
                  {!document.available && (
                    <p className="mt-1 text-xs text-stone-400">
                      Документ пока не добавлен
                    </p>
                  )}
                </div>
              </div>

              {document.available ? (
                <a
                  href={document.filePath}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900"
                >
                  Открыть
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-400"
                >
                  Открыть
                  <ExternalLink size={15} aria-hidden="true" />
                </button>
              )}
            </article>
          ))}
        </div>
      </FlightSection>

      <FlightSection
        icon={<Luggage size={22} aria-hidden="true" />}
        title="Ручная кладь"
      >
        <div className="flex min-h-52 flex-col items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-emerald-50 to-stone-50 p-6 text-center">
          {details.cabinBag.imageAvailable ? (
            <LightboxImage
              src={details.cabinBag.imagePath}
              alt="Схема ручной клади"
              className="mx-auto max-h-44"
              imgClassName="max-h-44 object-contain"
            />
          ) : (
            <span className="flex size-16 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
              <ImageIcon size={28} strokeWidth={1.6} aria-hidden="true" />
            </span>
          )}
          <p className="mt-5 text-sm font-medium text-stone-500">Размер</p>
          <p className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-stone-950">
            {details.cabinBag.dimensions}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-stone-500">
            {details.baggage.description}
          </p>
          <button
            type="button"
            disabled={!details.cabinBag.imageAvailable}
            onClick={() => {
              if (!details.cabinBag.imageAvailable) return
              openLightbox({
                images: [
                  {
                    src: details.cabinBag.imagePath,
                    alt: 'Схема ручной клади',
                  },
                ],
              })
            }}
            className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
              details.cabinBag.imageAvailable
                ? 'bg-emerald-800 text-white hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700'
                : 'cursor-not-allowed bg-stone-200 text-stone-400'
            }`}
          >
            Посмотреть схему
          </button>
          {!details.cabinBag.imageAvailable && (
            <p className="mt-3 text-xs text-stone-400">
              Будет заполнено позже.
            </p>
          )}
        </div>
      </FlightSection>

      <div className="lg:col-span-2">
        <FlightSection
          icon={<Backpack size={22} aria-hidden="true" />}
          title="Что взять с собой"
        >
          <div className="grid gap-5 lg:grid-cols-2">
            {details.packingLists.map((passenger) => {
              const packedCount = passenger.items.filter(
                (item) => packedItems[item.id],
              ).length

              return (
                <section
                  key={passenger.id}
                  className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="flex items-center gap-2 text-xl font-semibold tracking-[-0.025em] text-stone-950">
                      <span aria-hidden="true">{passenger.icon}</span>
                      {passenger.name}
                    </h3>
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-stone-500 shadow-sm">
                      {packedCount} из {passenger.items.length}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {passenger.items.map((item) => {
                      const isPacked = Boolean(packedItems[item.id])

                      return (
                        <label
                          key={item.id}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition ${
                            isPacked
                              ? 'border-emerald-200 bg-emerald-50/80'
                              : 'border-stone-200 bg-white hover:border-emerald-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isPacked}
                            onChange={(event) =>
                              setPackedItems((current) => ({
                                ...current,
                                [item.id]: event.target.checked,
                              }))
                            }
                            className="sr-only"
                          />
                          <span
                            className={`flex size-6 shrink-0 items-center justify-center rounded-lg border transition ${
                              isPacked
                                ? 'border-emerald-700 bg-emerald-700 text-white'
                                : 'border-stone-300 bg-white text-transparent'
                            }`}
                          >
                            <Check
                              size={15}
                              strokeWidth={2.5}
                              aria-hidden="true"
                            />
                          </span>
                          <span
                            className={`text-sm font-medium leading-6 ${
                              isPacked
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
                </section>
              )
            })}
          </div>

          <aside className="mt-6 rounded-[1.5rem] bg-stone-950 p-5 text-white sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300">
                  Ручная кладь
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                  {details.cabinBag.dimensions}
                </p>
              </div>
              <Luggage
                size={34}
                className="text-emerald-300"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </div>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {details.cabinBagReminders.map((reminder) => (
                <li
                  key={reminder}
                  className="flex gap-3 rounded-xl bg-white/10 p-3.5 text-sm leading-6 text-stone-200"
                >
                  <Check
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-300"
                    aria-hidden="true"
                  />
                  {reminder}
                </li>
              ))}
            </ul>
          </aside>
        </FlightSection>
      </div>

      <div className="lg:col-span-2">
        <FlightSection
          icon={<Check size={22} aria-hidden="true" />}
          title="Чек-лист перед выездом"
        >
          <div className="mb-5 flex items-center justify-between gap-4 rounded-2xl bg-emerald-50 px-4 py-3">
            <span className="text-sm font-medium text-emerald-900">
              Выполнено
            </span>
            <span className="text-sm font-semibold text-emerald-800">
              {completedItems} из {details.checklist.length}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {details.checklist.map((item) => {
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
                    className={`text-sm font-medium leading-6 ${
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
        </FlightSection>
      </div>

      <FlightSection
        icon={<CarTaxiFront size={22} aria-hidden="true" />}
        title="Дорога в аэропорт"
      >
        <div className="rounded-[1.5rem] bg-stone-950 p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
            Способ
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
            {details.airportTransfer.method}
          </p>
        </div>
        <dl className="mt-4 grid gap-3">
          {[
            {
              label: 'Время в пути',
              value: details.airportTransfer.duration,
              icon: <Timer size={17} />,
            },
            {
              label: 'Стоимость',
              value: details.airportTransfer.cost,
              icon: <Coins size={17} />,
            },
            {
              label: 'Время вызова',
              value: details.airportTransfer.callTime,
              icon: <AlarmClock size={17} />,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-2xl bg-stone-50 p-4"
            >
              <span className="mt-0.5 text-emerald-700" aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-stone-900">
                  {item.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </FlightSection>

      <FlightSection
        icon={<Lightbulb size={22} aria-hidden="true" />}
        title="Полезные советы"
      >
        <ul className="space-y-3">
          {details.usefulTips.map((tip) => (
            <li
              key={tip}
              className="flex gap-3 rounded-2xl bg-emerald-50/60 p-4 text-sm leading-6 text-stone-700"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-600" />
              {tip}
            </li>
          ))}
        </ul>
      </FlightSection>
    </div>
  )
}
