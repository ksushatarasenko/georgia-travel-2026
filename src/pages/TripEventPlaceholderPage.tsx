import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { TripDay, TripEvent } from '../types/data'

interface TripEventPlaceholderPageProps {
  day: TripDay
  event: TripEvent
}

export function TripEventPlaceholderPage({
  day,
  event,
}: TripEventPlaceholderPageProps) {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#f7f8f4] px-5 py-6 sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -right-28 -top-28 size-96 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-28 size-96 rounded-full bg-red-50 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col">
        <Link
          to={`/trip/${day.id}`}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Назад
        </Link>

        <section className="my-auto py-12 text-center sm:py-16">
          <div className="mx-auto max-w-2xl rounded-[2.25rem] border border-white/90 bg-white/90 p-7 shadow-[0_24px_80px_rgba(28,43,34,0.10)] backdrop-blur sm:p-12">
            <h1 className="text-4xl font-semibold tracking-[-0.05em] text-stone-950 sm:text-5xl">
              {event.title}
            </h1>
            <p className="mt-5 text-base leading-7 text-stone-500 sm:text-lg">
              Контент будет добавлен позже.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
