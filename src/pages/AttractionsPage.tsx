import { useMemo, useState } from 'react'
import { ArrowLeft, Compass, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RoutePlaceCardView } from '../components/RoutePlaceCard'
import { dataService } from '../services/dataService'
import { ROUTE_PLACE_CATEGORIES } from '../lib/routePlaces'
import type { RoutePlaceCategory } from '../types/data'

type CatalogFilter = 'all' | RoutePlaceCategory

const filters: { value: CatalogFilter; label: string; icon?: string }[] = [
  { value: 'all', label: 'Все' },
  ...ROUTE_PLACE_CATEGORIES.map((category) => ({
    value: category.value as CatalogFilter,
    label: category.label,
    icon: category.icon,
  })),
]

export function AttractionsPage() {
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const catalog = dataService.getRoutePlaces()

  const visiblePlaces = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase('ru-RU')

    return catalog.filter((place) => {
      const matchesCategory =
        activeFilter === 'all' || place.category === activeFilter
      const matchesSearch =
        normalizedQuery.length === 0 ||
        place.title.toLocaleLowerCase('ru-RU').includes(normalizedQuery) ||
        place.description
          .toLocaleLowerCase('ru-RU')
          .includes(normalizedQuery) ||
        place.categoryLabel
          .toLocaleLowerCase('ru-RU')
          .includes(normalizedQuery)

      return matchesCategory && matchesSearch
    })
  }, [activeFilter, catalog, searchQuery])

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <header className="relative overflow-hidden border-b border-stone-200/70 bg-white px-5 py-6 sm:px-8 sm:py-10 lg:px-12">
        <div className="pointer-events-none absolute -right-24 -top-36 size-96 rounded-full bg-rose-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-16 size-80 rounded-full bg-emerald-50 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            На главную
          </Link>

          <div className="py-12 sm:py-16">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-rose-700 text-white shadow-[0_10px_25px_rgba(190,18,60,0.2)]">
              <Compass size={26} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">
              Гид поездки
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-stone-950 sm:text-6xl">
              Места маршрута
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
              Центральный гид по локациям путешествия. Каждая карточка открывает
              ту же страницу, что и в плане поездки — без дублирования.
            </p>
          </div>
        </div>
      </header>

      <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[1.75rem] border border-stone-200/80 bg-white p-4 shadow-[0_10px_35px_rgba(28,43,34,0.05)] sm:p-6">
            <label className="relative block">
              <span className="sr-only">Поиск</span>
              <Search
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Поиск по названию или описанию"
                className="w-full rounded-2xl border border-stone-200 bg-[#f7f8f4] py-3.5 pl-12 pr-4 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            <div
              className="mt-5 flex gap-2 overflow-x-auto pb-1"
              role="group"
              aria-label="Фильтр по категории"
            >
              {filters.map((filter) => {
                const isActive = activeFilter === filter.value

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setActiveFilter(filter.value)}
                    aria-pressed={isActive}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-emerald-800'
                    }`}
                  >
                    {filter.icon ? (
                      <span className="mr-1.5" aria-hidden="true">
                        {filter.icon}
                      </span>
                    ) : null}
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mb-6 mt-10 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-stone-950">
              Найдено: {visiblePlaces.length}
            </h2>
          </div>

          {visiblePlaces.length > 0 ? (
            <div className="grid gap-5 pb-16 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePlaces.map((place) => (
                <RoutePlaceCardView key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
              <Search
                size={28}
                className="mx-auto text-stone-300"
                aria-hidden="true"
              />
              <h2 className="mt-5 text-xl font-semibold text-stone-900">
                Ничего не найдено
              </h2>
              <p className="mt-2 text-sm text-stone-500">
                Попробуйте изменить запрос или выбрать другую категорию.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
