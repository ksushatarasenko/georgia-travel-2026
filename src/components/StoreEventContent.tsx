import {
  Check,
  CircleDollarSign,
  Info,
  Lightbulb,
  ShoppingCart,
  Store,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import type { StoreEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'

const storeChecklistStorageKey =
  'georgia-travel-2026:first-store:checklist'

interface StoreEventContentProps {
  details: StoreEventDetails
}

interface StoreSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function StoreSection({ icon, title, children }: StoreSectionProps) {
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

export function StoreEventContent({ details }: StoreEventContentProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      try {
        const savedValue = localStorage.getItem(storeChecklistStorageKey)
        return savedValue ? JSON.parse(savedValue) : {}
      } catch {
        return {}
      }
    },
  )

  useEffect(() => {
    localStorage.setItem(storeChecklistStorageKey, JSON.stringify(checkedItems))
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
        <StoreSection
          icon={<Store size={22} aria-hidden="true" />}
          title="Лучшие супермаркеты в центре"
        >
          <div className="grid gap-5 lg:grid-cols-2">
            {details.supermarkets.map((supermarket) => (
              <article
                key={supermarket.id}
                className="flex flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50"
              >
                <div className="border-b border-stone-200 bg-white p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">
                      {supermarket.rank}
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                        {supermarket.name}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-stone-500">
                        {supermarket.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <ul className="space-y-2 text-sm leading-6 text-stone-600">
                    {supermarket.description.map((paragraph) => (
                      <li key={paragraph} className="flex gap-2">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                        {paragraph}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <p className="text-sm font-semibold text-stone-900">
                      Что можно купить
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {supermarket.products.map((product) => (
                        <span
                          key={product}
                          className="rounded-full bg-white px-3 py-2 text-xs font-medium text-stone-700 shadow-sm ring-1 ring-stone-200"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-semibold text-stone-900">
                      Преимущества
                    </p>
                    <ul className="mt-3 grid gap-2">
                      {supermarket.advantages.map((advantage) => (
                        <li
                          key={advantage}
                          className="flex items-center gap-2 text-sm text-stone-600"
                        >
                          <Check
                            size={16}
                            className="shrink-0 text-emerald-700"
                            aria-hidden="true"
                          />
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </StoreSection>
      </div>

      <div className="lg:col-span-2">
        <section className="overflow-hidden rounded-[1.75rem] bg-emerald-900 p-6 text-white shadow-[0_18px_50px_rgba(20,83,45,0.2)] sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-100">
              <ShoppingCart size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-200">
                Как покупать
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                🛍️ {details.shoppingGuide.title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-emerald-100/80">
                {details.shoppingGuide.introduction}
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
            <ol className="grid gap-3">
              {details.shoppingGuide.steps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-emerald-900">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{step}</span>
                </li>
              ))}
            </ol>
            <div className="rounded-[1.5rem] bg-emerald-950/50 p-5">
              <p className="text-sm font-semibold text-emerald-100">
                Способы оплаты
              </p>
              <ul className="mt-4 space-y-3">
                {details.shoppingGuide.paymentMethods.map((method) => (
                  <li
                    key={method}
                    className="rounded-xl bg-white/10 p-3 text-sm"
                  >
                    {method}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="lg:col-span-2">
        <StoreSection
          icon={<Info size={22} aria-hidden="true" />}
          title="Полезно знать"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {details.usefulToKnow.map((item) => (
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
        </StoreSection>
      </div>

      <div className="lg:col-span-2">
        <StoreSection
          icon={<CircleDollarSign size={22} aria-hidden="true" />}
          title={`💰 ${details.priceGuide.title}`}
        >
          <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50">
              <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-stone-200 bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                <span>Товар</span>
                <span>Примерная цена</span>
              </div>
              <div className="grid sm:grid-cols-2">
                {details.priceGuide.items.map((item) => (
                  <div
                    key={item.product}
                    className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-stone-200 px-4 py-2.5 text-sm last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-child(odd)]:border-r"
                  >
                    <span className="min-w-0 text-stone-700">
                      {item.product}
                    </span>
                    <span className="whitespace-nowrap font-semibold text-emerald-800">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[1.5rem] bg-emerald-900 p-5 text-white sm:p-6">
              <h3 className="text-lg font-semibold">
                🛍️ Пример корзины на первый вечер
              </h3>
              <dl className="mt-5 space-y-3">
                {details.priceGuide.sampleBasket.map((item) => (
                  <div
                    key={item.item}
                    className="flex items-start justify-between gap-3 border-b border-white/10 pb-3 text-sm last:border-0 last:pb-0"
                  >
                    <dt className="text-emerald-50/85">{item.item}</dt>
                    <dd className="shrink-0 font-semibold">{item.price}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 rounded-2xl bg-white/10 p-4 text-sm font-semibold leading-6 text-emerald-50">
                Итого: {details.priceGuide.sampleTotal}
              </p>
            </aside>
          </div>
        </StoreSection>
      </div>

      <div className="lg:col-span-2">
        <StoreSection
          icon={<Check size={22} aria-hidden="true" />}
          title="Что купить в первый день"
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
        </StoreSection>
      </div>

      <div className="lg:col-span-2">
        <StoreSection
          icon={<Lightbulb size={22} aria-hidden="true" />}
          title="Советы"
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
        </StoreSection>
      </div>

      <EventNavFooter action={details.nextAction} />
    </div>
  )
}
