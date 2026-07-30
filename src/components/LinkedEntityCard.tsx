import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface LinkedEntityCardProps {
  to: string
  icon: ReactNode
  eyebrow: string
  title: string
  description: string
  meta?: string
}

export function LinkedEntityCard({
  to,
  icon,
  eyebrow,
  title,
  description,
  meta,
}: LinkedEntityCardProps) {
  return (
    <Link
      to={to}
      className="group flex h-full min-h-48 flex-col rounded-[1.5rem] border border-stone-200/80 bg-white p-5 shadow-[0_8px_28px_rgba(28,43,34,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_38px_rgba(28,43,34,0.10)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-xl bg-[#f7f8f4] text-xl shadow-sm">
          {icon}
        </span>
        {meta && (
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500">
            {meta}
          </span>
        )}
      </div>

      <div className="mt-auto pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-stone-950">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-500">
          {description}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
          Открыть
          <ArrowRight
            size={16}
            className="transition group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}
