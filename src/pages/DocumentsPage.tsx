import { ArrowLeft, FileText, WifiOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DocumentLinkCard } from '../components/DocumentLinkCard'
import {
  tripDocumentCategories,
  tripDocuments,
} from '../data/tripDocuments'

export function DocumentsPage() {
  const documentsByCategory = tripDocumentCategories.map((category) => ({
    category,
    documents: tripDocuments.filter(
      (document) => document.categoryId === category.id,
    ),
  }))

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <header className="relative overflow-hidden border-b border-stone-200/70 bg-white px-5 pb-10 pt-6 sm:px-8 sm:pb-14 sm:pt-10 lg:px-12">
        <div className="pointer-events-none absolute -right-28 -top-36 size-[28rem] rounded-full bg-sky-100/70 blur-3xl" />
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
            <span className="flex size-14 items-center justify-center rounded-2xl bg-sky-700 text-white shadow-[0_10px_25px_rgba(3,105,161,0.22)]">
              <FileText size={27} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              Важные материалы
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-stone-950 sm:text-6xl">
              Документы
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
              Билеты, брони, страховка и копии документов — всё в одном месте.
              Открываются внутри приложения.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-600 shadow-sm">
                <WifiOff size={14} className="text-emerald-700" aria-hidden="true" />
                Ссылки сохраняются офлайн
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-600 shadow-sm">
                {tripDocuments.length} документов
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-6">
          {documentsByCategory.map(({ category, documents }) => (
            <article
              key={category.id}
              className="rounded-[2rem] border border-stone-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(28,43,34,0.06)] sm:p-8"
            >
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-2xl">
                <span className="mr-2" aria-hidden="true">
                  {category.icon}
                </span>
                {category.title}
              </h2>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {documents.map((document) => (
                  <li key={document.id}>
                    <DocumentLinkCard
                      title={document.title}
                      description={document.description}
                      icon={document.icon}
                      url={document.url}
                      available={document.available}
                    />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
