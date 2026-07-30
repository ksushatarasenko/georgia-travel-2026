import { ArrowLeft, Database, FileJson } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dataService } from '../services/dataService'

const collections = dataService.getCollections()

export function DeveloperPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f4] px-5 py-6 sm:px-8 sm:py-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/settings"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Настройки
        </Link>

        <header className="py-12 sm:py-16">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-stone-900 text-white">
            <Database size={26} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <h1 className="mt-7 text-4xl font-semibold tracking-[-0.05em] text-stone-950 sm:text-6xl">
            Developer
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
            Локальные тестовые данные приложения. Здесь отображается содержимое
            всех JSON-файлов.
          </p>
        </header>

        <section className="grid gap-5 pb-14 lg:grid-cols-2">
          {collections.map((collection) => (
            <article
              key={collection.fileName}
              className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-[0_12px_35px_rgba(28,43,34,0.06)]"
            >
              <div className="flex items-center gap-4 border-b border-stone-200 bg-white p-5 sm:p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <FileJson size={21} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold text-stone-900">
                    {collection.fileName}
                  </h2>
                  <p className="mt-0.5 text-sm text-stone-500">
                    {collection.label} · {collection.records.length}{' '}
                    {collection.records.length === 1 ? 'запись' : 'записи'}
                  </p>
                </div>
              </div>

              <pre className="max-h-[30rem] overflow-auto whitespace-pre-wrap break-words bg-stone-950 p-5 font-mono text-xs leading-6 text-emerald-100 sm:p-6">
                {JSON.stringify(collection.records, null, 2)}
              </pre>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
