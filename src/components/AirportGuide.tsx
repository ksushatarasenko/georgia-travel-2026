import { Lightbulb } from 'lucide-react'
import type { FlightAirportGuide } from '../types/data'

interface AirportGuideProps {
  guide: FlightAirportGuide
}

export function AirportGuide({ guide }: AirportGuideProps) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(28,43,34,0.06)] sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Lightbulb size={22} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-[-0.025em] text-stone-950 sm:text-2xl">
            {guide.title}
          </h2>
          <p className="mt-1 text-sm text-stone-500">{guide.subtitle}</p>
        </div>
      </div>

      <ol className="mt-7">
        {guide.steps.map((step, index) => (
          <li key={`${step.time}-${step.title}`} className="flex gap-4">
            <div className="flex w-8 shrink-0 flex-col items-center">
              <span className="flex size-8 items-center justify-center rounded-full bg-emerald-800 text-xs font-semibold text-white">
                {index + 1}
              </span>
              {index < guide.steps.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-emerald-100" />
              )}
            </div>

            <div
              className={`min-w-0 flex-1 ${index < guide.steps.length - 1 ? 'pb-7' : ''}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                {step.time}
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-stone-950">
                {step.title}
              </h3>
              <p className="mt-1 text-xs font-medium leading-5 text-stone-400">
                {step.signEn}
                <span className="mx-1.5 text-stone-300">·</span>
                {step.signPl}
              </p>
              <p className="mt-3 text-sm leading-6 text-stone-600">{step.body}</p>
              {step.alert && (
                <p className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-950">
                  {step.alert}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 border-t border-stone-100 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
          Три проверки — это не одно и то же
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {guide.checks.map((check) => (
            <article
              key={check.number}
              className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                {check.number}
              </p>
              <h4 className="mt-2 font-semibold text-stone-950">{check.en}</h4>
              <p className="mt-0.5 text-xs text-stone-400">{check.pl}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {check.checks}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
