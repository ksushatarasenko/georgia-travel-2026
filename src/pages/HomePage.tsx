import { CalendarDays, Plane } from 'lucide-react'
import { SectionCard } from '../components/SectionCard'
import { sections } from '../config/sections'

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
            {sections.map((section, index) => (
              <SectionCard key={section.path} section={section} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
