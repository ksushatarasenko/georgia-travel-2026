import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  FileText,
  Lightbulb,
  Luggage,
  MapPin,
  PlaneLanding,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { ArrivalEventDetails } from '../types/data'

const arrivalChecklistStorageKey =
  'georgia-travel-2026:kutaisi-arrival:checklist'

interface ArrivalEventContentProps {
  details: ArrivalEventDetails
}

interface ArrivalSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function ArrivalSection({ icon, title, children }: ArrivalSectionProps) {
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

function formatArrivalDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))
}

export function ArrivalEventContent({ details }: ArrivalEventContentProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      try {
        const savedValue = localStorage.getItem(arrivalChecklistStorageKey)
        return savedValue ? JSON.parse(savedValue) : {}
      } catch {
        return {}
      }
    },
  )

  useEffect(() => {
    localStorage.setItem(
      arrivalChecklistStorageKey,
      JSON.stringify(checkedItems),
    )
  }, [checkedItems])

  const completedItems = details.checklist.filter(
    (item) => checkedItems[item.id],
  ).length

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <ArrivalSection
          icon={<PlaneLanding size={22} aria-hidden="true" />}
          title="Основная информация"
        >
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: 'Дата',
                value: formatArrivalDate(details.date),
                icon: <CalendarDays size={19} />,
              },
              {
                label: 'Время прилета',
                value: details.arrivalTime,
                icon: <Clock3 size={19} />,
              },
              {
                label: 'Аэропорт',
                value: `Kutaisi (${details.airportCode})`,
                icon: <MapPin size={19} />,
              },
              {
                label: 'Страна',
                value: details.country,
                icon: <MapPin size={19} />,
              },
              {
                label: 'Авиакомпания',
                value: details.airline,
                icon: <BadgeCheck size={19} />,
              },
              {
                label: 'Багаж',
                value: details.baggage,
                icon: <Luggage size={19} />,
              },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-stone-50 p-5">
                <span className="text-emerald-700" aria-hidden="true">
                  {item.icon}
                </span>
                <dt className="mt-4 text-xs font-semibold uppercase tracking-[0.13em] text-stone-400">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-6 text-stone-900">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </ArrivalSection>
      </div>

      <div className="lg:col-span-2">
        <ArrivalSection
          icon={<MapPin size={22} aria-hidden="true" />}
          title="Первые шаги после посадки"
        >
          <div className="mx-auto max-w-xl">
            {details.steps.map((step, index) => (
              <div key={step.id}>
                <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:p-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                    {step.icon}
                  </span>
                  <p className="text-base font-semibold text-stone-900 sm:text-lg">
                    {step.title}
                  </p>
                </div>
                {index < details.steps.length - 1 && (
                  <div className="flex h-10 items-center pl-[1.35rem] text-emerald-500 sm:pl-[1.6rem]">
                    <ArrowDown size={19} aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ArrivalSection>
      </div>

      <div className="lg:col-span-2">
        <ArrivalSection
          icon={<Check size={22} aria-hidden="true" />}
          title="Чек-лист"
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
        </ArrivalSection>
      </div>

      <ArrivalSection
        icon={<FileText size={22} aria-hidden="true" />}
        title="Что понадобится"
      >
        <div className="space-y-3">
          {details.requiredDocuments.map((document) => (
            <article
              key={document.id}
              className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                  {document.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-stone-900">
                    {document.title}
                  </h3>
                  {!document.available && (
                    <p className="mt-1 text-xs text-stone-400">
                      Документ пока не добавлен
                    </p>
                  )}
                </div>
              </div>
              {document.available && document.filePath ? (
                <a
                  href={document.filePath}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white"
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
      </ArrivalSection>

      <ArrivalSection
        icon={<ArrowRight size={22} aria-hidden="true" />}
        title="Следующие действия"
      >
        <div className="space-y-3">
          {details.nextActions.map((action, index) => (
            <div key={action.id}>
              <Link
                to={`/trip/event/${action.eventId}`}
                className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  {action.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-stone-900">
                    {action.title}
                  </span>
                  <span className="mt-1 block text-sm leading-5 text-stone-500">
                    {action.description}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  className="shrink-0 text-stone-300 transition group-hover:translate-x-1 group-hover:text-emerald-700"
                  aria-hidden="true"
                />
              </Link>
              {index < details.nextActions.length - 1 && (
                <div className="flex h-7 items-center justify-center text-stone-300">
                  <ArrowDown size={16} aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>
      </ArrivalSection>

      <div className="lg:col-span-2">
        <ArrivalSection
          icon={<Lightbulb size={22} aria-hidden="true" />}
          title="Полезные советы"
        >
          <ul className="grid gap-3 sm:grid-cols-2">
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
        </ArrivalSection>
      </div>
    </div>
  )
}
