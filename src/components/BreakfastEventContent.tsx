import {
  Check,
  CircleDollarSign,
  Coffee,
  Lightbulb,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import type { BreakfastEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'
import { ScheduleCard } from './ScheduleCard'

const breakfastChecklistStorageKey =
  'georgia-travel-2026:breakfast:checklist'

interface BreakfastEventContentProps {
  details: BreakfastEventDetails
  storageKey?: string
}

interface BreakfastSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function BreakfastSection({ icon, title, children }: BreakfastSectionProps) {
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

export function BreakfastEventContent({
  details,
  storageKey = breakfastChecklistStorageKey,
}: BreakfastEventContentProps) {
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
        <section className="rounded-[1.75rem] border border-stone-200/80 bg-stone-50 p-6 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-[-0.045em] text-stone-950 sm:text-5xl">
            <span aria-hidden="true">🍳 </span>
            {details.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600 sm:text-lg">
            {details.description}
          </p>
        </section>
      </div>

      <div className="lg:col-span-2">
        <ScheduleCard
          title="Расписание утра"
          steps={details.schedule.map((item) => ({
            id: item.id,
            time: item.value,
            label: item.label,
          }))}
        />
      </div>

      <div className="lg:col-span-2">
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-emerald-100 bg-emerald-50/70 p-6">
            <h2 className="text-lg font-semibold text-emerald-950">
              {details.hotelBreakfast.includedTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-emerald-900/80">
              {details.hotelBreakfast.includedText}
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6">
            <h2 className="text-lg font-semibold text-stone-950">
              {details.hotelBreakfast.notIncludedTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {details.hotelBreakfast.notIncludedText}
            </p>
          </article>
        </div>
      </div>

      <div className="lg:col-span-2">
        <BreakfastSection
          icon={<Coffee size={22} aria-hidden="true" />}
          title="Что лучше съесть утром"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {details.foodIdeas.map((item) => (
              <article
                key={item.id}
                className="flex items-center gap-4 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {item.icon}
                </span>
                <h3 className="font-semibold text-stone-900">{item.title}</h3>
              </article>
            ))}
          </div>
        </BreakfastSection>
      </div>

      <div className="lg:col-span-2">
        <BreakfastSection
          icon={<CircleDollarSign size={22} aria-hidden="true" />}
          title="Пример стоимости"
        >
          <div className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50">
            {details.priceExamples.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-stone-200 px-4 py-3.5 text-sm last:border-b-0"
              >
                <span className="font-medium text-stone-700">{item.label}</span>
                <span className="font-semibold text-emerald-800">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </BreakfastSection>
      </div>

      <div className="lg:col-span-2">
        <BreakfastSection
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
        </BreakfastSection>
      </div>

      <div className="lg:col-span-2">
        <BreakfastSection
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
        </BreakfastSection>
      </div>

      <EventNavFooter action={details.nextAction} />
    </div>
  )
}
