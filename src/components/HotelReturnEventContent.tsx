import {
  BadgeCheck,
  Check,
  Lightbulb,
  Sparkles,
  Sunrise,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import type { HotelReturnEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'

const hotelReturnChecklistStorageKey =
  'georgia-travel-2026:hotel-return:checklist'

interface HotelReturnEventContentProps {
  details: HotelReturnEventDetails
}

interface HotelReturnSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function HotelReturnSection({
  icon,
  title,
  children,
}: HotelReturnSectionProps) {
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

export function HotelReturnEventContent({
  details,
}: HotelReturnEventContentProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      try {
        const savedValue = localStorage.getItem(hotelReturnChecklistStorageKey)
        return savedValue ? JSON.parse(savedValue) : {}
      } catch {
        return {}
      }
    },
  )

  useEffect(() => {
    localStorage.setItem(
      hotelReturnChecklistStorageKey,
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
        <section className="overflow-hidden rounded-[1.75rem] bg-emerald-900 p-6 text-white shadow-[0_18px_50px_rgba(20,83,45,0.2)] sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-100">
              <BadgeCheck size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-200">
                Итоги первого дня
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                Сегодня вы
              </h2>
            </div>
          </div>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.dayHighlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-2 rounded-2xl bg-white/10 p-3.5 text-sm"
              >
                <Check
                  size={17}
                  className="shrink-0 text-emerald-200"
                  aria-hidden="true"
                />
                {highlight}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="lg:col-span-2">
        <HotelReturnSection
          icon={<Check size={22} aria-hidden="true" />}
          title="Подготовка ко второму дню"
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
        </HotelReturnSection>
      </div>

      <div className="lg:col-span-2">
        <HotelReturnSection
          icon={<Lightbulb size={22} aria-hidden="true" />}
          title="Полезные советы"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {details.tips.map((tip) => (
              <article
                key={tip.id}
                className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {tip.icon}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-stone-950">
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {tip.description}
                </p>
              </article>
            ))}
          </div>
        </HotelReturnSection>
      </div>

      <div className="lg:col-span-2">
        <HotelReturnSection
          icon={<Sparkles size={22} aria-hidden="true" />}
          title="Сегодняшняя статистика"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {details.stats.map((stat) => (
              <article
                key={stat.id}
                className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {stat.icon}
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.13em] text-stone-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-stone-900">
                  {stat.value}
                </p>
              </article>
            ))}
          </div>
        </HotelReturnSection>
      </div>

      <div className="lg:col-span-2">
        <section className="overflow-hidden rounded-[1.75rem] bg-stone-950 p-6 text-white shadow-[0_18px_50px_rgba(28,25,23,0.18)] sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-200">
              <Sunrise size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-amber-200">
                Завтра вас ждёт
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                🌄 {details.tomorrowPreview.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">
                {details.tomorrowPreview.description}
              </p>
            </div>
          </div>
        </section>
      </div>

      <EventNavFooter action={details.nextAction} />
    </div>
  )
}
