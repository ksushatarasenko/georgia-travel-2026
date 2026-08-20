import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Check, ShoppingCart, WifiOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  flattenShoppingItems,
  isMustTryItem,
  isTakeHomeItem,
  tripShoppingGroups,
  tripShoppingStorageKey,
  type ShoppingGroup,
  type ShoppingItem,
} from '../data/tripShopping'

function loadChecked(): Record<string, boolean> {
  try {
    const saved = localStorage.getItem(tripShoppingStorageKey)
    if (!saved) return {}
    const parsed = JSON.parse(saved) as Record<string, boolean>
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function countGroupProgress(
  group: ShoppingGroup,
  checked: Record<string, boolean>,
) {
  const done = group.items.filter((item) => checked[item.id]).length
  return { done, total: group.items.length }
}

export function ShoppingPage() {
  const [checkedItems, setCheckedItems] =
    useState<Record<string, boolean>>(loadChecked)

  useEffect(() => {
    localStorage.setItem(tripShoppingStorageKey, JSON.stringify(checkedItems))
  }, [checkedItems])

  const allItems = useMemo(() => flattenShoppingItems(), [])
  const totalDone = allItems.filter((item) => checkedItems[item.id]).length
  const totalCount = allItems.length
  const totalProgress =
    totalCount > 0 ? Math.round((totalDone / totalCount) * 100) : 0

  const toggleItem = (id: string, value: boolean) => {
    setCheckedItems((current) => ({ ...current, [id]: value }))
  }

  const renderCheckbox = (
    item: ShoppingItem,
    group: ShoppingGroup,
    isChecked: boolean,
  ) => (
    <>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(event) => toggleItem(item.id, event.target.checked)}
        aria-label={
          isChecked ? `${item.label} — ${group.checkLabel}` : item.label
        }
        className="sr-only"
      />
      <span
        className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border transition ${
          isChecked
            ? 'border-emerald-700 bg-emerald-700 text-white'
            : 'border-stone-300 bg-white text-transparent'
        }`}
        aria-hidden="true"
      >
        <Check size={15} strokeWidth={2.5} />
      </span>
    </>
  )

  const renderSimpleItem = (
    item: ShoppingItem,
    group: ShoppingGroup,
    isChecked: boolean,
  ) => (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
        isChecked
          ? 'border-emerald-200 bg-emerald-50/70'
          : 'border-stone-200 bg-stone-50 hover:border-orange-200'
      }`}
    >
      {renderCheckbox(item, group, isChecked)}
      <span className="min-w-0 flex-1">
        <span
          className={`block text-sm font-medium leading-6 ${
            isChecked
              ? 'text-emerald-900 line-through decoration-emerald-400'
              : 'text-stone-800'
          }`}
        >
          {item.label}
        </span>
        {isChecked ? (
          <span className="mt-1 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
            {group.checkLabel}
          </span>
        ) : null}
      </span>
    </label>
  )

  const renderTakeHomeItem = (
    item: ShoppingItem,
    group: ShoppingGroup,
    isChecked: boolean,
  ) => (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
        isChecked
          ? 'border-emerald-200 bg-emerald-50/70'
          : 'border-stone-200 bg-stone-50 hover:border-orange-200'
      }`}
    >
      {renderCheckbox(item, group, isChecked)}
      <span className="min-w-0 flex-1">
        <span
          className={`block text-sm font-semibold leading-6 ${
            isChecked
              ? 'text-emerald-900 line-through decoration-emerald-400'
              : 'text-stone-900'
          }`}
        >
          {item.label}
        </span>
        <span className="mt-1 block text-xs font-medium text-stone-500">
          {item.quantity} · {item.priceGel} · {item.pricePln}
        </span>
        <span className="mt-2 block text-xs leading-5 text-stone-500">
          {item.description}
        </span>
        {item.transportBadge ? (
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-800 ring-1 ring-sky-100">
            <span aria-hidden="true">✈️</span>
            {item.transportBadge}
          </span>
        ) : null}
        {item.transportNote ? (
          <span className="mt-1 block text-[11px] leading-4 text-stone-400">
            {item.transportNote}
          </span>
        ) : null}
        {isChecked ? (
          <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
            {group.checkLabel}
          </span>
        ) : null}
      </span>
    </label>
  )

  const renderMustTryItem = (
    item: ShoppingItem,
    group: ShoppingGroup,
    isChecked: boolean,
  ) => (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
        isChecked
          ? 'border-emerald-200 bg-emerald-50/70'
          : 'border-stone-200 bg-stone-50 hover:border-orange-200'
      }`}
    >
      {renderCheckbox(item, group, isChecked)}
      <span className="min-w-0 flex-1">
        <span
          className={`block text-sm font-semibold leading-6 ${
            isChecked
              ? 'text-emerald-900 line-through decoration-emerald-400'
              : 'text-stone-900'
          }`}
        >
          {item.label}
        </span>
        {item.description ? (
          <span className="mt-2 block text-xs leading-5 text-stone-600">
            <span className="font-semibold text-stone-700">
              Краткое описание:{' '}
            </span>
            {item.description}
          </span>
        ) : null}
        {item.taste ? (
          <span className="mt-2 block text-[11px] leading-4 text-stone-500">
            <span className="font-semibold text-stone-600">Вкус: </span>
            {item.taste}
          </span>
        ) : null}
        {item.whyTry ? (
          <span className="mt-1.5 block text-[11px] leading-4 text-stone-500">
            <span className="font-semibold text-stone-600">
              Почему стоит попробовать:{' '}
            </span>
            {item.whyTry}
          </span>
        ) : null}
        {item.tip ? (
          <span className="mt-1.5 block text-[11px] leading-4 text-stone-500">
            <span className="font-semibold text-stone-600">
              {item.tipLabel === 'advice' ? 'Совет: ' : 'Что попробовать: '}
            </span>
            {item.tip}
          </span>
        ) : null}
        {isChecked ? (
          <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
            {group.checkLabel}
          </span>
        ) : null}
      </span>
    </label>
  )

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <header className="relative overflow-hidden border-b border-stone-200/70 bg-white px-5 pb-10 pt-6 sm:px-8 sm:pb-14 sm:pt-10 lg:px-12">
        <div className="pointer-events-none absolute -right-28 -top-36 size-[28rem] rounded-full bg-orange-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-28 top-20 size-72 rounded-full bg-emerald-50 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            На главную
          </Link>

          <div className="pt-12 sm:pt-16">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-[0_10px_25px_rgba(234,88,12,0.22)]">
              <ShoppingCart size={27} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
              Список покупок
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-stone-950 sm:text-6xl">
              Покупки
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
              Что купить, попробовать и посмотреть в Грузии. Отмечайте пункты по
              мере выполнения — всё сохраняется на устройстве.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-600 shadow-sm">
                <WifiOff size={14} className="text-emerald-700" aria-hidden="true" />
                Офлайн
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-600 shadow-sm">
                Прогресс сохраняется на этом устройстве
              </span>
            </div>

            <div className="mt-8 max-w-xl rounded-[1.5rem] border border-stone-200/80 bg-[#f7f8f4] p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-stone-700">
                  Общий прогресс
                </span>
                <span className="text-sm font-semibold text-orange-800">
                  {totalDone} из {totalCount} · {totalProgress}%
                </span>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-stone-200/80">
                <div
                  className="h-full rounded-full bg-orange-600 transition-[width] duration-300"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-6">
          {tripShoppingGroups.map((group) => {
            const progress = countGroupProgress(group, checkedItems)
            const groupPercent =
              progress.total > 0
                ? Math.round((progress.done / progress.total) * 100)
                : 0

            return (
              <article
                key={group.id}
                className="rounded-[2rem] border border-stone-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(28,43,34,0.06)] sm:p-8"
              >
                <div className="flex flex-col gap-3 border-b border-stone-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-2xl">
                      <span className="mr-2" aria-hidden="true">
                        {group.icon}
                      </span>
                      {group.title}
                    </h2>
                    <p className="mt-1 text-sm text-stone-500">
                      Отметка: {group.checkLabel}
                    </p>
                  </div>
                  <div className="shrink-0 rounded-2xl bg-orange-50 px-4 py-3 sm:min-w-32">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-orange-700">
                      Готово
                    </p>
                    <p className="mt-1 text-lg font-semibold text-orange-950">
                      {progress.done} из {progress.total}
                    </p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-orange-100">
                      <div
                        className="h-full rounded-full bg-orange-600 transition-[width] duration-300"
                        style={{ width: `${groupPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {group.hint ? (
                  <p className="mt-5 rounded-[1.25rem] border border-sky-100 bg-sky-50/80 px-4 py-3 text-sm leading-6 text-stone-700">
                    {group.hint}
                  </p>
                ) : null}

                <ul
                  className={`mt-6 grid gap-3 ${
                    group.id === 'take-home' || group.id === 'must-try'
                      ? ''
                      : 'sm:grid-cols-2'
                  }`}
                >
                  {group.items.map((item) => {
                    const isChecked = Boolean(checkedItems[item.id])

                    return (
                      <li key={item.id}>
                        {isTakeHomeItem(item)
                          ? renderTakeHomeItem(item, group, isChecked)
                          : isMustTryItem(item)
                            ? renderMustTryItem(item, group, isChecked)
                            : renderSimpleItem(item, group, isChecked)}
                      </li>
                    )
                  })}
                </ul>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
