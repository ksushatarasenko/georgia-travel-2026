import {
  ArrowDown,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  Lightbulb,
  Luggage,
  MapPin,
  PlaneLanding,
  Smartphone,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
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

      {details.simPurchase && (
        <div className="lg:col-span-2">
          <ArrivalSection
            icon={<Smartphone size={22} aria-hidden="true" />}
            title={`Купить SIM-карту — ${details.simPurchase.operator}`}
          >
            <p className="text-sm leading-6 text-stone-600">
              {details.simPurchase.where}
            </p>
            <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium leading-6 text-emerald-950">
              Скажите: «{details.simPurchase.askFor}»
            </p>

            <div className="mt-5 rounded-[1.5rem] bg-stone-950 p-5 text-white sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                Что просить
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                {details.simPurchase.recommended.title}
              </h3>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    label: 'Интернет',
                    value: details.simPurchase.recommended.data,
                  },
                  {
                    label: 'Звонки',
                    value: details.simPurchase.recommended.calls,
                  },
                  {
                    label: 'Цена',
                    value: details.simPurchase.recommended.price,
                  },
                  {
                    label: 'Срок',
                    value: details.simPurchase.recommended.validity,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white/10 p-4"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-6 text-stone-300">
                {details.simPurchase.recommended.note}
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {details.simPurchase.alternatives.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
                >
                  <h4 className="font-semibold text-stone-950">{item.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-950">
              {details.simPurchase.avoid}
            </p>

            <h3 className="mt-7 text-base font-semibold text-stone-950">
              Как купить
            </h3>
            <ol className="mt-3 space-y-2">
              {details.simPurchase.steps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-stone-700"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <h3 className="mt-7 text-base font-semibold text-stone-950">
              Фразы на стойке
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {details.simPurchase.phrases.map((phrase) => (
                <article
                  key={phrase.original}
                  className="rounded-2xl bg-stone-950 p-4 text-white"
                >
                  <p className="text-sm font-semibold leading-6">
                    {phrase.original}
                  </p>
                  <p className="mt-2 border-t border-white/10 pt-2 text-sm leading-6 text-stone-300">
                    {phrase.translation}
                  </p>
                </article>
              ))}
            </div>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {details.simPurchase.tips.map((tip) => (
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
      )}

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
