export interface ScheduleStep {
  id: string
  time: string
  label: string
}

interface ScheduleCardProps {
  title?: string
  range?: string
  steps: ScheduleStep[]
  className?: string
}

/**
 * Compact event schedule — one card, one line per step.
 * Use this instead of tall vertical timeline blocks.
 */
export function ScheduleCard({
  title = 'Расписание',
  range,
  steps,
  className = '',
}: ScheduleCardProps) {
  return (
    <section
      className={`rounded-[1.5rem] border border-stone-200/80 bg-white p-5 shadow-[0_8px_28px_rgba(28,43,34,0.05)] sm:p-6 ${className}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold tracking-[-0.02em] text-stone-950">
          <span className="mr-2" aria-hidden="true">
            🕒
          </span>
          {title}
        </h2>
        {range ? (
          <p className="text-sm font-medium tabular-nums text-stone-400">
            {range}
          </p>
        ) : null}
      </div>
      <ul className="mt-4 divide-y divide-stone-100">
        {steps.map((step) => (
          <li
            key={step.id}
            className="flex items-baseline gap-3 py-2.5 first:pt-0 last:pb-0"
          >
            <span className="w-[5.5rem] shrink-0 text-sm font-semibold tabular-nums text-emerald-800 sm:w-24">
              {step.time}
            </span>
            <span className="min-w-0 text-sm leading-6 text-stone-700 sm:text-[0.95rem]">
              {step.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
