import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { dataService } from '../services/dataService'
import type { TripEvent } from '../types/data'

const tripDays = dataService.getTripDays()
const tripEvents = dataService.getTripEvents()

function parseDate(date: string) {
  return new Date(`${date}T12:00:00`)
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(parseDate(date))
}

function formatFullDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
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

export function TripDayPage() {
  const { dayId } = useParams()
  const day = tripDays.find((item) => item.id === dayId)

  if (!day) {
    return <Navigate to="/trip" replace />
  }

  const events = day.eventIds
    .map((eventId) => tripEvents.find((event) => event.id === eventId))
    .filter((event): event is TripEvent => Boolean(event))

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <header className="relative overflow-hidden border-b border-stone-200/70 bg-white px-5 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-10 lg:px-12">
        <div className="pointer-events-none absolute -right-24 -top-36 size-96 rounded-full bg-emerald-100/70 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { label: 'Главная', to: '/' },
              { label: 'Мое путешествие', to: '/trip' },
              { label: formatDate(day.date) },
            ]}
          />

          <div className="pt-12 sm:pt-16">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-800 text-2xl text-white shadow-[0_10px_25px_rgba(22,101,52,0.2)]">
              {day.icon}
            </span>
            <p className="mt-7 text-sm font-semibold capitalize text-emerald-700">
              {formatFullDate(day.date)}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-stone-950 sm:text-6xl">
              {day.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-500 sm:text-lg">
              {day.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f7f8f4] px-4 py-2 text-sm font-medium text-stone-600">
              <CalendarDays
                size={17}
                className="text-emerald-700"
                aria-hidden="true"
              />
              {formatEventCount(events.length)}
            </span>
          </div>
        </div>
      </header>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-9">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              План дня
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-stone-950">
              Расписание дня
            </h2>
          </div>

          <div className="relative">
            <div className="absolute bottom-8 left-[5.45rem] top-8 w-px bg-emerald-200 sm:left-[7.25rem]" />

            <div className="space-y-5">
              {events.map((event) => {
                const isDayEnd =
                  event.title === 'День завершён' ||
                  event.title.includes('До свидания')

                return (
                  <div
                    key={event.id}
                    className="relative grid grid-cols-[3.6rem_2.75rem_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[5rem_3rem_minmax(0,1fr)] sm:gap-3"
                  >
                    <time className="pt-4 text-sm font-semibold text-stone-700 sm:text-base">
                      {event.isPlaceholder && !event.isTimeConfirmed
                        ? '—'
                        : event.time}
                    </time>

                    <span className="relative z-10 flex size-11 items-center justify-center rounded-full border-4 border-[#f7f8f4] bg-white text-lg shadow-[0_4px_16px_rgba(28,43,34,0.12)] sm:size-12">
                      {event.icon}
                    </span>

                    {isDayEnd ? (
                      <div className="min-w-0 overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white shadow-[0_8px_28px_rgba(28,43,34,0.06)]">
                        <div className="p-5 sm:p-6">
                          <h3 className="text-lg font-semibold tracking-[-0.025em] text-stone-950 sm:text-xl">
                            {event.title}
                          </h3>
                          {event.description ? (
                            <p className="mt-2 text-sm leading-6 text-stone-500">
                              {event.description}
                            </p>
                          ) : null}
                          {event.duration ? (
                            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-stone-400">
                              <Clock3 size={14} aria-hidden="true" />
                              {event.duration}
                            </span>
                          ) : null}
                          <Link
                            to="/trip"
                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[1.25rem] bg-emerald-900 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(20,83,45,0.18)] transition hover:bg-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:w-auto"
                          >
                            Вернуться к плану дня
                            <ArrowRight size={16} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={`/trip/event/${event.id}`}
                        className="group min-w-0 overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white shadow-[0_8px_28px_rgba(28,43,34,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_38px_rgba(28,43,34,0.10)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                      >
                        {event.image ? (
                          <div className="aspect-[21/9] overflow-hidden bg-stone-100 sm:aspect-[24/9]">
                            <img
                              src={event.image}
                              alt=""
                              className="size-full object-cover transition duration-500 group-hover:scale-[1.02]"
                            />
                          </div>
                        ) : null}
                        <div className="p-5 sm:p-6">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="text-lg font-semibold tracking-[-0.025em] text-stone-950 sm:text-xl">
                                {event.title}
                              </h3>
                              {event.description ? (
                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-500">
                                  {event.description}
                                </p>
                              ) : null}
                            </div>
                            <ArrowRight
                              size={19}
                              className="mt-1 shrink-0 text-stone-300 transition group-hover:translate-x-1 group-hover:text-emerald-700"
                              aria-hidden="true"
                            />
                          </div>
                          {event.duration ? (
                            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-stone-400">
                              <Clock3 size={14} aria-hidden="true" />
                              {event.duration}
                            </span>
                          ) : null}
                        </div>
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
