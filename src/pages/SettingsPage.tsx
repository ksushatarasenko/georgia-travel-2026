import { ArrowLeft, Braces, ChevronRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { AppSection } from '../config/sections'

interface SettingsPageProps {
  section: AppSection
}

export function SettingsPage({ section }: SettingsPageProps) {
  const Icon = section.icon

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#f7f8f4] px-5 py-6 sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -right-28 -top-28 size-96 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-28 size-96 rounded-full bg-red-50 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          На главную
        </Link>

        <section className="my-auto py-12 sm:py-16">
          <div className="mx-auto max-w-2xl rounded-[2.25rem] border border-white/90 bg-white/90 p-7 text-center shadow-[0_24px_80px_rgba(28,43,34,0.10)] backdrop-blur sm:p-12">
            <span
              className={`mx-auto flex size-16 items-center justify-center rounded-[1.4rem] ${section.accent}`}
            >
              <Icon size={30} strokeWidth={1.7} aria-hidden="true" />
            </span>

            <h1 className="mt-8 text-4xl font-semibold tracking-[-0.05em] text-stone-950 sm:text-5xl">
              {section.title}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-stone-500 sm:text-lg">
              {section.description}
            </p>

            <button
              type="button"
              disabled
              className="mt-9 inline-flex cursor-default items-center gap-2 rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(22,101,52,0.2)]"
            >
              <Sparkles size={17} aria-hidden="true" />
              Скоро будет
            </button>

            <div className="mt-8 border-t border-stone-200 pt-6 text-left">
              <Link
                to="/settings/developer"
                className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-[#f7f8f4] p-4 transition hover:border-emerald-200 hover:bg-emerald-50/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-white">
                  <Braces size={21} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-stone-900">
                    Developer
                  </span>
                  <span className="mt-0.5 block text-sm text-stone-500">
                    Проверка локальных данных
                  </span>
                </span>
                <ChevronRight
                  size={20}
                  className="text-stone-400 transition group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>

        <p className="pb-2 text-center text-xs font-medium uppercase tracking-[0.16em] text-stone-400">
          Georgia Travel 2026
        </p>
      </div>
    </main>
  )
}
