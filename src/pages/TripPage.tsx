import { ArrowRight, CalendarDays, ListChecks } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { dataService } from '../services/dataService'

const tripDays = dataService.getTripDays()

function parseDate(date: string) {
  return new Date(`${date}T12:00:00`)
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(parseDate(date))
}

function formatWeekday(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
  }).format(parseDate(date))
}

function formatEventCount(count: number) {
  const remainder = count % 100

  if (remainder >= 11 && remainder <= 14) {
    return `${count} событий`
  }

  if (count % 10 === 1) {
    return `${count} событие`
  }

  if ([2, 3, 4].includes(count % 10)) {
    return `${count} события`
  }

  return `${count} событий`
}

export function TripPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <header className="relative overflow-hidden border-b border-stone-200/70 bg-white px-5 pb-14 pt-6 sm:px-8 sm:pb-20 sm:pt-10 lg:px-12">
        <div className="pointer-events-none absolute -right-28 -top-36 size-[30rem] rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-28 top-24 size-80 rounded-full bg-red-50 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: 'Главная', to: '/' },
              { label: 'Мое путешествие' },
            ]}
          />

          <div className="pt-12 sm:pt-16">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-[0_10px_25px_rgba(22,101,52,0.2)]">
              <CalendarDays size={27} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              25 августа — 3 сентября 2026
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-stone-950 sm:text-6xl">
              📅 Мое путешествие
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-500 sm:text-lg">
              Все дни поездки в одном последовательном плане.
            </p>
          </div>
        </div>
      </header>

      <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                План по дням
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-stone-950">
                {tripDays.length} дней
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {tripDays.map((day, index) => (
              <Link
                key={day.id}
                to={`/trip/${day.id}`}
                className="group animate-card-in flex min-h-72 flex-col rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(28,43,34,0.06)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_22px_55px_rgba(28,43,34,0.11)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:p-7"
                style={{ animationDelay: `${index * 45}ms` }}
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-[#f7f8f4] text-2xl shadow-sm">
                    {day.icon}
                  </span>
                  <div className="text-right">
                    <p className="text-lg font-semibold capitalize text-stone-950">
                      {formatDate(day.date)}
                    </p>
                    <p className="mt-1 text-sm capitalize text-stone-400">
                      {formatWeekday(day.date)}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-10">
                  <h3 className="text-2xl font-semibold tracking-[-0.035em] text-stone-950">
                    {day.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-stone-500">
                    {day.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-stone-100 pt-5">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-stone-500">
                      <ListChecks
                        size={17}
                        className="text-emerald-700"
                        aria-hidden="true"
                      />
                      {formatEventCount(day.eventIds.length)}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      Открыть
                      <ArrowRight
                        size={17}
                        className="transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
