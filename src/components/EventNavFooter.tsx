import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface EventNavAction {
  title: string
  description?: string
  icon?: string
  eventId?: string
  to?: string
  buttonLabel?: string
}

interface EventNavFooterProps {
  action: EventNavAction
  className?: string
}

function resolveHref(action: EventNavAction): string {
  if (action.to) return action.to
  if (action.eventId) return `/trip/event/${action.eventId}`
  return '/trip'
}

function isDayEnd(action: EventNavAction): boolean {
  if (action.title.includes('День завершён')) return true
  if (action.title.includes('До свидания')) return true
  if (action.to && /^\/trip\/trip-day-/.test(action.to)) return true
  return false
}

/**
 * Standard event-page footer.
 * Next event → «Следующий шаг»; last event of the day → «День завершён».
 */
export function EventNavFooter({
  action,
  className = '',
}: EventNavFooterProps) {
  const dayEnd = isDayEnd(action)
  const farewell = action.title.includes('До свидания')
  const href = resolveHref(action)
  const eyebrow = farewell
    ? 'До свидания, Грузия!'
    : dayEnd
      ? 'День завершён'
      : 'Следующий шаг'
  const icon = farewell ? '❤️' : dayEnd ? '🌙' : (action.icon ?? '➡')
  const buttonLabel = dayEnd
    ? (action.buttonLabel ?? (farewell ? 'К плану поездки' : 'К плану дня'))
    : (action.buttonLabel ?? 'Перейти')

  return (
    <div className={`lg:col-span-2 ${className}`.trim()}>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
        <span className="mr-1.5" aria-hidden="true">
          {farewell ? '❤️' : dayEnd ? '🌙' : '➡'}
        </span>
        {eyebrow}
      </p>
      <Link
        to={href}
        className="group mt-4 flex items-center gap-4 rounded-[1.5rem] bg-emerald-900 p-5 text-white shadow-[0_15px_40px_rgba(20,83,45,0.18)] transition hover:-translate-y-0.5 hover:bg-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:p-7"
      >
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xl font-semibold tracking-[-0.02em]">
            {farewell
              ? 'До свидания, Грузия!'
              : dayEnd
                ? 'Вернуться к плану дня'
                : action.title}
          </span>
          {action.description ? (
            <span className="mt-1 block text-sm leading-6 text-emerald-100/80">
              {action.description}
            </span>
          ) : null}
        </span>
        <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
          {buttonLabel}
          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </Link>
    </div>
  )
}
