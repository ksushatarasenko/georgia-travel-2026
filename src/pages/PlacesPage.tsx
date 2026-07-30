import { useMemo, useState } from 'react'
import { ArrowLeft, MapPin, Search, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PlaceCard } from '../components/PlaceCard'
import { dataService } from '../services/dataService'
import type { PlaceCategory } from '../types/data'

type PlaceFilter = 'all' | PlaceCategory

const filters: { value: PlaceFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'sight', label: 'Достопримечательности' },
  { value: 'beach', label: 'Пляжи' },
  { value: 'cafe', label: 'Кафе' },
  { value: 'park', label: 'Парки' },
  { value: 'museum', label: 'Музеи' },
  { value: 'nature', label: 'Природа' },
]

const places = dataService.getPlaces()

export function PlacesPage() {
  const [activeFilter, setActiveFilter] = useState<PlaceFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const visiblePlaces = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase('ru-RU')

    return places.filter((place) => {
      const matchesCategory =
        activeFilter === 'all' || place.category === activeFilter
      const matchesSearch =
        normalizedQuery.length === 0 ||
        place.name.toLocaleLowerCase('ru-RU').includes(normalizedQuery)

      return matchesCategory && matchesSearch
    })
  }, [activeFilter, searchQuery])

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <header className="relative overflow-hidden border-b border-stone-200/70 bg-white px-5 py-6 sm:px-8 sm:py-10 lg:px-12">
        <div className="pointer-events-none absolute -right-24 -top-36 size-96 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-16 size-80 rounded-full bg-red-50 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            На главную
          </Link>

          <div className="py-12 sm:py-16">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-[0_10px_25px_rgba(22,101,52,0.2)]">
              <MapPin size={26} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Places
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-stone-950 sm:text-6xl">
              Все объекты
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-stone-500 sm:text-lg">
              Единый каталог мест с локальным поиском и категориями.
            </p>
          </div>
        </div>
      </header>

      <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[1.75rem] border border-stone-200/80 bg-white p-4 shadow-[0_10px_35px_rgba(28,43,34,0.05)] sm:p-6">
            <label className="relative block">
              <span className="sr-only">Поиск по названию</span>
              <Search
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Поиск по названию"
                className="w-full rounded-2xl border border-stone-200 bg-[#f7f8f4] py-3.5 pl-12 pr-4 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            <div className="mt-5 flex items-start gap-3">
              <SlidersHorizontal
                size={18}
                className="mt-2.5 hidden shrink-0 text-stone-400 sm:block"
                aria-hidden="true"
              />
              <div
                className="flex gap-2 overflow-x-auto pb-2"
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
                      {filter.label}
                    </button>
                  )
                })}
              </div>
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
                <PlaceCard key={place.id} place={place} />
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
