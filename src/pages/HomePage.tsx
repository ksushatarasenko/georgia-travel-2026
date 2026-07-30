import { ArrowRight, CalendarDays, CalendarRange, Plane } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionCard } from '../components/SectionCard'
import { sections } from '../config/sections'

const documentsSection = sections.find(
  (section) => section.path === '/documents',
)

const homeSections = [
  ...(documentsSection
    ? [
        {
          ...documentsSection,
          description: 'Все важные документы поездки в одном месте',
        },
      ]
    : []),
  ...sections.filter(
    (section) =>
      section.path !== '/plan' && section.path !== '/documents',
  ),
]

export function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12 lg:pb-24">
        <div className="pointer-events-none absolute -right-24 -top-32 size-80 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-28 top-28 size-72 rounded-full bg-red-50 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-sm font-medium text-stone-600 shadow-sm backdrop-blur">
            <Plane size={16} className="text-emerald-700" aria-hidden="true" />
            Познань — Кутаиси
          </div>

          <h1 className="mt-8 max-w-3xl text-[clamp(2.8rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.065em] text-stone-950">
            <span className="mr-3 inline-block text-[0.68em] align-[0.08em]">🇬🇪</span>
            Georgia
            <span className="block text-emerald-800">Travel 2026</span>
          </h1>

          <div className="mt-8 flex items-start gap-3 text-stone-600 sm:mt-10">
            <CalendarDays
              size={21}
              className="mt-0.5 shrink-0 text-red-600"
              aria-hidden="true"
            />
            <p className="text-base leading-7 sm:text-lg">
              Путешествие
              <span className="block font-medium text-stone-900">
                25 августа — 3 сентября 2026
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200/70 bg-[#f7f8f4] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/trip"
            className="group relative mb-12 flex min-h-72 overflow-hidden rounded-[2rem] bg-emerald-900 p-7 text-white shadow-[0_24px_65px_rgba(20,83,45,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_75px_rgba(20,83,45,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:min-h-80 sm:p-10"
          >
            <div className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full bg-emerald-600/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/4 size-72 rounded-full bg-red-400/15 blur-3xl" />

            <div className="relative flex w-full flex-col">
              <div className="flex items-start justify-between gap-5">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-white/12 shadow-inner ring-1 ring-white/15 backdrop-blur">
                  <CalendarRange
                    size={27}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-50 ring-1 ring-white/10 backdrop-blur">
                  Главный раздел
                </span>
              </div>

              <div className="mt-auto pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  10 дней · единый план
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  📅 Мое путешествие
                </h2>
                <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <p className="max-w-xl text-sm leading-6 text-emerald-100/80 sm:text-base">
                    Дни, события и подробный план всей поездки в одном месте.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    Открыть путешествие
                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Всё для поездки
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-4xl">
                Разделы
              </h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-6 text-stone-500 sm:block">
              Нужная информация будет доступна даже без интернета
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homeSections.map((section, index) => (
              <SectionCard key={section.path} section={section} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
