import {
  ArrowRight,
  Clock3,
  Coins,
  Image as ImageIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { AttractionCatalogEntry } from '../types/data'

const categoryStyles: Record<AttractionCatalogEntry['category'], string> = {
  attraction: 'bg-rose-50 text-rose-700',
  evening: 'bg-violet-50 text-violet-700',
}

interface AttractionCatalogCardProps {
  entry: AttractionCatalogEntry
}

export function AttractionCatalogCard({ entry }: AttractionCatalogCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-[0_10px_35px_rgba(28,43,34,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(28,43,34,0.12)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-emerald-50 via-[#f7f8f4] to-red-50">
        {entry.image ? (
          <img
            src={entry.image}
            alt={entry.title}
            className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-2xl border border-white/80 bg-white/75 text-2xl shadow-sm backdrop-blur">
              {entry.icon || (
                <ImageIcon size={28} strokeWidth={1.6} aria-hidden="true" />
              )}
            </span>
          </div>
        )}

        <span
          className={`pointer-events-none absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${categoryStyles[entry.category]}`}
        >
          {entry.categoryLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-2xl font-semibold tracking-[-0.035em] text-stone-950">
          <span className="mr-2" aria-hidden="true">
            {entry.icon}
          </span>
          {entry.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-500">
          {entry.description}
        </p>

        {(entry.duration || entry.price) && (
          <dl className="mt-5 grid gap-2 text-sm text-stone-600">
            {entry.duration && (
              <div className="flex items-start gap-2">
                <Clock3
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-700"
                  aria-hidden="true"
                />
                <dd>{entry.duration}</dd>
              </div>
            )}
            {entry.price && (
              <div className="flex items-start gap-2">
                <Coins
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-700"
                  aria-hidden="true"
                />
                <dd>{entry.price}</dd>
              </div>
            )}
          </dl>
        )}

        <Link
          to={`${entry.href}?from=sights`}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          Открыть
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
