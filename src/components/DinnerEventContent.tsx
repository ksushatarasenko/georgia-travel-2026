import {
  Check,
  CircleDollarSign,
  Lightbulb,
  UtensilsCrossed,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import type { DinnerEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'
import { PlaceCard } from './PlaceCard'
import { ScheduleCard } from './ScheduleCard'

const dinnerChecklistStorageKey =
  'georgia-travel-2026:georgian-dinner:checklist'

interface DinnerEventContentProps {
  details: DinnerEventDetails
}

interface DinnerSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function DinnerSection({ icon, title, children }: DinnerSectionProps) {
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

export function DinnerEventContent({ details }: DinnerEventContentProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      try {
        const savedValue = localStorage.getItem(dinnerChecklistStorageKey)
        return savedValue ? JSON.parse(savedValue) : {}
      } catch {
        return {}
      }
    },
  )

  useEffect(() => {
    localStorage.setItem(
      dinnerChecklistStorageKey,
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
      {details.timeline ? (
        <div className="lg:col-span-2">
          <ScheduleCard
            title={details.timeline.title}
            range={details.timeline.range}
            steps={details.timeline.steps}
          />
        </div>
      ) : null}

      <div className="lg:col-span-2">
        <DinnerSection
          icon={<UtensilsCrossed size={22} aria-hidden="true" />}
          title={details.restaurantsTitle ?? 'Рекомендуемые рестораны'}
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {details.restaurants.map((restaurant) => (
              <PlaceCard key={restaurant.id} data={restaurant} />
            ))}
          </div>
        </DinnerSection>
      </div>

      <div className="lg:col-span-2">
        <DinnerSection
          icon={<UtensilsCrossed size={22} aria-hidden="true" />}
          title="Что заказать впервые"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {details.firstOrderDishes.map((dish) => (
              <article
                key={dish.id}
                className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                      {dish.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold text-stone-950">
                        {dish.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-emerald-800">
                        {dish.price}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-stone-600">
                  {dish.description}
                </p>

                {dish.howToEat && (
                  <p className="mt-3 rounded-2xl bg-white p-3 text-sm leading-6 text-stone-600 shadow-sm">
                    <span className="font-semibold text-stone-900">
                      Как есть:{' '}
                    </span>
                    {dish.howToEat}
                  </p>
                )}

                {dish.note && (
                  <p className="mt-3 text-sm leading-6 text-stone-500">
                    {dish.note}
                  </p>
                )}

                {dish.flavors && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-stone-900">
                      Попробуйте
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {dish.flavors.map((flavor) => (
                        <span
                          key={flavor}
                          className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm ring-1 ring-stone-200"
                        >
                          {flavor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </DinnerSection>
      </div>

      <div className="lg:col-span-2">
        <DinnerSection
          icon={<Lightbulb size={22} aria-hidden="true" />}
          title="Полезные советы"
        >
          <div className="grid gap-4 sm:grid-cols-3">
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
        </DinnerSection>
      </div>

      <div className="lg:col-span-2">
        <section className="overflow-hidden rounded-[1.75rem] bg-emerald-900 p-6 text-white shadow-[0_18px_50px_rgba(20,83,45,0.2)] sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-100">
              <CircleDollarSign size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-200">
                Пример первого ужина
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                🍽️ {details.sampleOrder.title}
              </h2>
              <p className="mt-2 text-sm text-emerald-100/80">
                Для двоих рекомендуем:
              </p>
            </div>
          </div>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {details.sampleOrder.items.map((item) => (
              <li
                key={item}
                className="rounded-2xl bg-white/10 p-4 text-sm font-medium"
              >
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-5 rounded-2xl bg-emerald-950/50 p-4 text-sm font-semibold leading-6 text-emerald-50">
            Итого: {details.sampleOrder.total}
          </p>
        </section>
      </div>

      <div className="lg:col-span-2">
        <DinnerSection
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
        </DinnerSection>
      </div>

      <EventNavFooter action={details.nextAction} />
    </div>
  )
}
