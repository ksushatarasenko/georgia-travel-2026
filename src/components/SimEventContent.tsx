import {
  Check,
  Languages,
  Lightbulb,
  MapPin,
  PackageCheck,
  Radio,
  Sparkles,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import type { SimEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'

const simChecklistStorageKey = 'georgia-travel-2026:kutaisi-magti:checklist'

interface SimEventContentProps {
  details: SimEventDetails
}

interface SimSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function SimSection({ icon, title, children }: SimSectionProps) {
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

export function SimEventContent({ details }: SimEventContentProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      try {
        const savedValue = localStorage.getItem(simChecklistStorageKey)
        return savedValue ? JSON.parse(savedValue) : {}
      } catch {
        return {}
      }
    },
  )

  useEffect(() => {
    localStorage.setItem(simChecklistStorageKey, JSON.stringify(checkedItems))
  }, [checkedItems])

  const completedItems = details.checklist.filter(
    (item) => checkedItems[item.id],
  ).length
  const progress =
    details.checklist.length > 0
      ? Math.round((completedItems / details.checklist.length) * 100)
      : 0

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <SimSection
          icon={<Radio size={22} aria-hidden="true" />}
          title="Почему Magti"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {details.benefits.map((benefit) => (
              <article
                key={benefit.id}
                className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {benefit.icon}
                </span>
                <h3 className="mt-5 font-semibold leading-6 text-stone-900">
                  {benefit.title}
                </h3>
              </article>
            ))}
          </div>
        </SimSection>
      </div>

      <SimSection
        icon={<MapPin size={22} aria-hidden="true" />}
        title="Где купить"
      >
        <article className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
              {details.purchasePoint.icon}
            </span>
            <h3 className="text-xl font-semibold text-stone-950">
              {details.purchasePoint.title}
            </h3>
          </div>
          <ul className="mt-6 space-y-3">
            {details.purchasePoint.details.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-6 text-stone-600"
              >
                <Check
                  size={17}
                  className="mt-1 shrink-0 text-emerald-700"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </SimSection>

      <SimSection
        icon={<PackageCheck size={22} aria-hidden="true" />}
        title="Что понадобится"
      >
        <div className="grid gap-3">
          {details.requirements.map((requirement) => (
            <article
              key={requirement.id}
              className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                {requirement.icon}
              </span>
              <h3 className="font-semibold text-stone-900">
                {requirement.title}
              </h3>
            </article>
          ))}
        </div>
      </SimSection>

      <div className="lg:col-span-2">
        <section className="overflow-hidden rounded-[1.75rem] bg-emerald-900 p-6 text-white shadow-[0_18px_50px_rgba(20,83,45,0.2)] sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-100">
              <Sparkles size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-200">
                Какой тариф выбрать
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                {details.recommendedPlan.title}
              </h2>
            </div>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
            <div className="rounded-[1.5rem] bg-white/10 p-5 sm:p-6">
              <p className="text-sm font-semibold text-emerald-100">
                Что входит
              </p>
              <ul className="mt-4 space-y-3">
                {details.recommendedPlan.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <Check
                      size={17}
                      className="text-emerald-200"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex items-center rounded-[1.5rem] bg-emerald-950/50 p-5 text-sm leading-7 text-emerald-100 sm:p-6">
              {details.recommendedPlan.note}
            </p>
          </div>
        </section>
      </div>

      <div className="lg:col-span-2">
        <section className="overflow-hidden rounded-[1.75rem] bg-stone-950 p-6 text-white shadow-[0_18px_50px_rgba(28,25,23,0.18)] sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-400/15 text-blue-200">
              <Languages size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200">
                Полезные фразы
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                🇬🇧 English
              </h2>
            </div>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {details.englishPhrases.map((phrase) => (
              <article
                key={phrase.original}
                className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/10"
              >
                <p className="text-base font-semibold leading-7 text-white">
                  {phrase.original}
                </p>
                <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-6 text-stone-300">
                  <span aria-hidden="true">📖 </span>
                  {phrase.translation}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="lg:col-span-2">
        <SimSection
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
        </SimSection>
      </div>

      <EventNavFooter action={details.nextAction} />

      <div className="lg:col-span-2">
        <SimSection
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
        </SimSection>
      </div>
    </div>
  )
}
