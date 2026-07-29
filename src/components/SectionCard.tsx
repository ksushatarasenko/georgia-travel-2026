import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { AppSection } from '../config/sections'

interface SectionCardProps {
  section: AppSection
  index: number
}

export function SectionCard({ section, index }: SectionCardProps) {
  const Icon = section.icon

  return (
    <Link
      to={section.path}
      className="group animate-card-in relative flex min-h-52 flex-col rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(28,43,34,0.03),0_16px_40px_rgba(28,43,34,0.06)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(28,43,34,0.11)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:p-7"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="flex items-start justify-between">
        <span
          className={`flex size-13 items-center justify-center rounded-2xl ${section.accent}`}
        >
          <Icon size={25} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <ArrowUpRight
          className="text-stone-300 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-700"
          size={22}
          aria-hidden="true"
        />
      </div>

      <div className="mt-auto pt-8">
        <h2 className="text-xl font-semibold tracking-[-0.025em] text-stone-900">
          {section.title}
        </h2>
        <p className="mt-2 max-w-64 text-sm leading-6 text-stone-500">
          {section.description}
        </p>
      </div>
    </Link>
  )
}
