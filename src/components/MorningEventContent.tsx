import {
  Check,
  Lightbulb,
  Luggage,
  Sunrise,
  ThermometerSun,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import type { MorningEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'

const morningChecklistStorageKey =
  'georgia-travel-2026:day-02-morning:checklist'

interface MorningEventContentProps {
  details: MorningEventDetails
}

interface MorningSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function MorningSection({ icon, title, children }: MorningSectionProps) {
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

export function MorningEventContent({ details }: MorningEventContentProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      try {
        const savedValue = localStorage.getItem(morningChecklistStorageKey)
        return savedValue ? JSON.parse(savedValue) : {}
      } catch {
        return {}
      }
    },
  )

  useEffect(() => {
    localStorage.setItem(
      morningChecklistStorageKey,
      JSON.stringify(checkedItems),
    )
  }, [checkedItems])

  const completedItems = details.checklist.filter(
    (item) => checkedItems[item.id],
  ).length
  const progress =
    details.checklist.length > 0
      ? Math.round((completedItems / details.checklist.length) * 100)
      : 0

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <MorningSection
          icon={<Sunrise size={22} aria-hidden="true" />}
          title="План утра"
        >
          <div className="mx-auto max-w-2xl">
            {details.morningPlan.map((step, index) => (
              <div
                key={step.id}
                className="relative grid grid-cols-[3rem_1fr] gap-3 pb-5 last:pb-0 sm:grid-cols-[3.5rem_1fr] sm:gap-4"
              >
                {index < details.morningPlan.length - 1 && (
                  <span className="absolute bottom-0 left-6 top-12 w-px bg-emerald-200 sm:left-7" />
                )}
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(21,128,61,0.2)] sm:size-14">
                  {index + 1}
                </span>

                <article className="min-w-0 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
                  <p className="text-sm font-semibold text-emerald-800">
                    {step.time}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-stone-950">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {step.description}
                    </p>
                  )}
                  {step.checklist && (
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {step.checklist.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm text-stone-600 shadow-sm"
                        >
                          <Check
                            size={16}
                            className="shrink-0 text-emerald-700"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </div>
            ))}
          </div>
        </MorningSection>
      </div>

      <div className="lg:col-span-2">
        <MorningSection
          icon={<Luggage size={22} aria-hidden="true" />}
          title="Что взять с собой"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {details.packingItems.map((item) => (
              <article
                key={item.id}
                className="flex items-center gap-4 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {item.icon}
                </span>
                <h3 className="font-semibold leading-6 text-stone-900">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </MorningSection>
      </div>

      <div className="lg:col-span-2">
        <MorningSection
          icon={<ThermometerSun size={22} aria-hidden="true" />}
          title="Прогноз дня"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {details.dayForecast.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {item.icon}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-stone-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </MorningSection>
      </div>

      <div className="lg:col-span-2">
        <MorningSection
          icon={<Check size={22} aria-hidden="true" />}
          title="Чек-лист"
        >
          <div className="mb-5 rounded-2xl bg-emerald-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-emerald-900">
                Выполнено
              </span>
              <span className="text-sm font-semibold text-emerald-800">
                {completedItems} из {details.checklist.length}
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
        </MorningSection>
      </div>

      <div className="lg:col-span-2">
        <MorningSection
          icon={<Lightbulb size={22} aria-hidden="true" />}
          title="Полезные советы"
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {details.usefulTips.map((tip) => (
              <li
                key={tip}
                className="flex gap-3 rounded-2xl bg-emerald-50/60 p-4 text-sm leading-6 text-stone-700"
              >
                <span className="mt-0.5 shrink-0" aria-hidden="true">
                  💡
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </MorningSection>
      </div>

      <EventNavFooter action={details.nextAction} />
    </div>
  )
}
