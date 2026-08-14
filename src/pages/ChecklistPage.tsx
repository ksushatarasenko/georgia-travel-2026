import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Check,
  ClipboardList,
  Lightbulb,
  WifiOff,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  flattenChecklistItems,
  tripChecklistStorageKey,
  tripChecklistTabs,
  type TripChecklistTab,
} from '../data/tripChecklist'

function loadChecked(): Record<string, boolean> {
  try {
    const saved = localStorage.getItem(tripChecklistStorageKey)
    if (!saved) return {}
    const parsed = JSON.parse(saved) as Record<string, boolean>
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function countTabProgress(
  tab: TripChecklistTab,
  checked: Record<string, boolean>,
) {
  const items = tab.groups.flatMap((group) => group.items)
  const done = items.filter((item) => checked[item.id]).length
  return { done, total: items.length }
}

export function ChecklistPage() {
  const [activeTabId, setActiveTabId] = useState(tripChecklistTabs[0].id)
  const [checkedItems, setCheckedItems] =
    useState<Record<string, boolean>>(loadChecked)

  useEffect(() => {
    localStorage.setItem(tripChecklistStorageKey, JSON.stringify(checkedItems))
  }, [checkedItems])

  const allItems = useMemo(() => flattenChecklistItems(), [])
  const totalDone = allItems.filter((item) => checkedItems[item.id]).length
  const totalCount = allItems.length
  const totalProgress =
    totalCount > 0 ? Math.round((totalDone / totalCount) * 100) : 0

  const activeTab =
    tripChecklistTabs.find((tab) => tab.id === activeTabId) ??
    tripChecklistTabs[0]

  const tabProgress = countTabProgress(activeTab, checkedItems)
  const tabPercent =
    tabProgress.total > 0
      ? Math.round((tabProgress.done / tabProgress.total) * 100)
      : 0

  const toggleItem = (id: string, value: boolean) => {
    setCheckedItems((current) => ({ ...current, [id]: value }))
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <header className="relative overflow-hidden border-b border-stone-200/70 bg-white px-5 pb-10 pt-6 sm:px-8 sm:pb-14 sm:pt-10 lg:px-12">
        <div className="pointer-events-none absolute -right-28 -top-36 size-[28rem] rounded-full bg-indigo-100/70 blur-3xl" />
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
            <span className="flex size-14 items-center justify-center rounded-2xl bg-indigo-700 text-white shadow-[0_10px_25px_rgba(67,56,202,0.2)]">
              <ClipboardList size={27} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">
              Ассистент поездки
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-stone-950 sm:text-6xl">
              Чек-лист
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
              Документы, вещи и покупки для маршрута Познань → Кутаиси →
              Кобулети → Кутаиси → Познань. Всё работает без интернета.
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
                <span className="text-sm font-semibold text-indigo-800">
                  {totalDone} из {totalCount} · {totalProgress}%
                </span>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-stone-200/80">
                <div
                  className="h-full rounded-full bg-indigo-700 transition-[width] duration-300"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div
            className="flex gap-2 overflow-x-auto pb-2"
            role="tablist"
            aria-label="Разделы чек-листа"
          >
            {tripChecklistTabs.map((tab) => {
              const progress = countTabProgress(tab, checkedItems)
              const isActive = tab.id === activeTabId
              const complete =
                progress.total > 0 && progress.done === progress.total

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`shrink-0 rounded-[1.25rem] border px-4 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 ${
                    isActive
                      ? 'border-indigo-700 bg-indigo-700 text-white shadow-sm'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-indigo-200'
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <span aria-hidden="true">{tab.icon}</span>
                    {tab.shortTitle}
                    {complete ? (
                      <span
                        className={`ml-1 inline-flex size-5 items-center justify-center rounded-full ${
                          isActive ? 'bg-white/20' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        <Check size={12} strokeWidth={3} aria-hidden="true" />
                      </span>
                    ) : null}
                  </span>
                  <span
                    className={`mt-1 block text-xs ${
                      isActive ? 'text-indigo-100' : 'text-stone-400'
                    }`}
                  >
                    {progress.done}/{progress.total}
                  </span>
                </button>
              )
            })}
          </div>

          <article className="mt-6 rounded-[2rem] border border-stone-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(28,43,34,0.06)] sm:p-8">
            <div className="flex flex-col gap-4 border-b border-stone-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700">
                  {activeTab.when}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-stone-950 sm:text-3xl">
                  <span className="mr-2" aria-hidden="true">
                    {activeTab.icon}
                  </span>
                  {activeTab.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500 sm:text-base">
                  {activeTab.intro}
                </p>
              </div>

              <div className="shrink-0 rounded-2xl bg-indigo-50 px-4 py-3 sm:min-w-40">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-700">
                  Вкладка
                </p>
                <p className="mt-1 text-lg font-semibold text-indigo-950">
                  {tabProgress.done} из {tabProgress.total}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-indigo-100">
                  <div
                    className="h-full rounded-full bg-indigo-700 transition-[width] duration-300"
                    style={{ width: `${tabPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3 rounded-[1.25rem] border border-amber-100 bg-amber-50/80 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm">
                <Lightbulb size={18} aria-hidden="true" />
              </span>
              <p className="text-sm leading-6 text-stone-700">{activeTab.tip}</p>
            </div>

            {tabProgress.done === tabProgress.total && tabProgress.total > 0 ? (
              <p className="mt-5 rounded-[1.25rem] border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
                Готово. Этот этап можно не держать в голове — переходите к
                следующему.
              </p>
            ) : null}

            <div className="mt-8 space-y-8">
              {activeTab.groups.map((group) => (
                <section key={group.id}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-stone-400">
                    {group.title}
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {group.items.map((item) => {
                      const isChecked = Boolean(checkedItems[item.id])

                      return (
                        <li key={item.id}>
                          <label
                            className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                              isChecked
                                ? 'border-emerald-200 bg-emerald-50/70'
                                : 'border-stone-200 bg-stone-50 hover:border-indigo-200'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(event) =>
                                toggleItem(item.id, event.target.checked)
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
                            <span className="min-w-0">
                              <span
                                className={`block text-sm font-medium leading-6 ${
                                  isChecked
                                    ? 'text-emerald-900 line-through decoration-emerald-400'
                                    : 'text-stone-800'
                                }`}
                              >
                                {item.label}
                              </span>
                              {item.note ? (
                                <span className="mt-1 block text-xs leading-5 text-stone-500">
                                  {item.note}
                                </span>
                              ) : null}
                            </span>
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
