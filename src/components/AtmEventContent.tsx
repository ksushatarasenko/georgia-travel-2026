import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Check,
  CircleDollarSign,
  CreditCard,
  Landmark,
  Lightbulb,
  TriangleAlert,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { AtmEventDetails } from '../types/data'

const atmChecklistStorageKey = 'georgia-travel-2026:kutaisi-atm:checklist'

interface AtmEventContentProps {
  details: AtmEventDetails
}

interface AtmSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function AtmSection({ icon, title, children }: AtmSectionProps) {
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

export function AtmEventContent({ details }: AtmEventContentProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      try {
        const savedValue = localStorage.getItem(atmChecklistStorageKey)
        return savedValue ? JSON.parse(savedValue) : {}
      } catch {
        return {}
      }
    },
  )

  useEffect(() => {
    localStorage.setItem(atmChecklistStorageKey, JSON.stringify(checkedItems))
  }, [checkedItems])

  const completedItems = details.checklist.filter(
    (item) => checkedItems[item.id],
  ).length

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-2">
      <AtmSection
        icon={<Landmark size={22} aria-hidden="true" />}
        title="Какие банкоматы есть"
      >
        <div className="space-y-4">
          {details.banks.map((bank) => (
            <article
              key={bank.id}
              className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  {bank.icon}
                </span>
                <h3 className="text-lg font-semibold text-stone-950">
                  {bank.name}
                </h3>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-stone-600">
                {[bank.location, bank.hours].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check
                      size={16}
                      className="text-emerald-700"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled
                className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-400"
              >
                Подробнее
              </button>
            </article>
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          В аэропорту также есть пункт обмена валюты.
        </p>
      </AtmSection>

      <AtmSection
        icon={<CreditCard size={22} aria-hidden="true" />}
        title="Какие карты работают"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {details.supportedCards.map((card) => (
            <article
              key={card.id}
              className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                {card.icon}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-stone-950">
                {card.name}
              </h3>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
                <BadgeCheck size={16} aria-hidden="true" />
                {card.status}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          {details.cardNote}
        </p>
      </AtmSection>

      <div className="lg:col-span-2">
        <AtmSection
          icon={<Banknote size={22} aria-hidden="true" />}
          title="Сколько снять"
        >
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex min-h-56 flex-col justify-center rounded-[1.5rem] bg-emerald-900 p-6 text-white sm:p-8">
              <p className="text-sm font-medium text-emerald-200">
                Рекомендуемая сумма
              </p>
              <p className="mt-3 text-5xl font-semibold tracking-[-0.055em]">
                {details.recommendedAmount}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-stone-50 p-5 sm:p-7">
              <p className="font-semibold text-stone-900">
                Этого обычно достаточно на первые дни:
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {details.recommendedUses.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 rounded-xl bg-white p-3.5 text-sm text-stone-600 shadow-sm"
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-stone-500">
                {details.amountNote}
              </p>
            </div>
          </div>
        </AtmSection>
      </div>

      <div className="lg:col-span-2">
        <section className="overflow-hidden rounded-[1.75rem] bg-stone-950 p-6 text-white shadow-[0_18px_50px_rgba(28,25,23,0.18)] sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-red-300">
              <TriangleAlert size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-red-300">
                Важный совет
              </p>
              <h2 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">
                {details.dccAdvice.warning}
              </h2>
            </div>
          </div>

          <div className="mt-7 rounded-[1.5rem] bg-white/10 p-5 sm:p-6">
            <p className="text-sm text-stone-300">Выбирать:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {details.dccAdvice.choices.map((choice) => (
                <span
                  key={choice}
                  className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-200 ring-1 ring-emerald-300/20"
                >
                  {choice}
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-stone-300">
              {details.dccAdvice.explanation}
            </p>
          </div>
        </section>
      </div>

      <div className="lg:col-span-2">
        <AtmSection
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
        </AtmSection>
      </div>

      <div className="lg:col-span-2">
        <AtmSection
          icon={<CircleDollarSign size={22} aria-hidden="true" />}
          title="Следующее действие"
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
              Перейти
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </AtmSection>
      </div>

      <div className="lg:col-span-2">
        <AtmSection
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
        </AtmSection>
      </div>
    </div>
  )
}
