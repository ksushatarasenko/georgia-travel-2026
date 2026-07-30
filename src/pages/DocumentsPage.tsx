import {
  ArrowLeft,
  Contact,
  CreditCard,
  Files,
  FolderOpen,
  HeartPulse,
  Hotel,
  Plane,
  TicketCheck,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface DocumentCategory {
  title: string
  icon: LucideIcon
  fileCount: number
  accent: string
}

const documentCategories: DocumentCategory[] = [
  {
    title: 'Авиабилеты',
    icon: Plane,
    fileCount: 0,
    accent: 'bg-sky-50 text-sky-700',
  },
  {
    title: 'Посадочные талоны',
    icon: TicketCheck,
    fileCount: 0,
    accent: 'bg-violet-50 text-violet-700',
  },
  {
    title: 'Страховка',
    icon: HeartPulse,
    fileCount: 0,
    accent: 'bg-rose-50 text-rose-700',
  },
  {
    title: 'Бронирование жилья',
    icon: Hotel,
    fileCount: 0,
    accent: 'bg-amber-50 text-amber-700',
  },
  {
    title: 'Паспорта',
    icon: Contact,
    fileCount: 0,
    accent: 'bg-emerald-50 text-emerald-700',
  },
  {
    title: 'Банковские карты',
    icon: CreditCard,
    fileCount: 0,
    accent: 'bg-blue-50 text-blue-700',
  },
  {
    title: 'Другие документы',
    icon: Files,
    fileCount: 0,
    accent: 'bg-stone-100 text-stone-700',
  },
]

export function DocumentsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <header className="relative overflow-hidden border-b border-stone-200/70 bg-white px-5 pb-14 pt-6 sm:px-8 sm:pb-20 sm:pt-10 lg:px-12">
        <div className="pointer-events-none absolute -right-28 -top-36 size-[28rem] rounded-full bg-blue-100/70 blur-3xl" />
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
            <span className="flex size-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-[0_10px_25px_rgba(29,78,216,0.18)]">
              <FolderOpen size={27} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Важное под рукой
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-stone-950 sm:text-6xl">
              Документы
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-500 sm:text-lg">
              Все важные документы поездки в одном месте.
            </p>
          </div>
        </div>
      </header>

      <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {documentCategories.map((category, index) => {
              const Icon = category.icon

              return (
                <article
                  key={category.title}
                  className="animate-card-in flex min-h-64 flex-col rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(28,43,34,0.06)] sm:p-7"
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`flex size-13 items-center justify-center rounded-2xl ${category.accent}`}
                    >
                      <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-500">
                      {category.fileCount} файлов
                    </span>
                  </div>

                  <div className="mt-auto pt-8">
                    <h2 className="text-xl font-semibold tracking-[-0.025em] text-stone-950">
                      {category.title}
                    </h2>
                    <p className="mt-2 text-sm text-stone-400">
                      Документы пока не добавлены
                    </p>
                    <button
                      type="button"
                      disabled
                      className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-stone-100 px-5 py-3 text-sm font-semibold text-stone-400"
                    >
                      Открыть
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
