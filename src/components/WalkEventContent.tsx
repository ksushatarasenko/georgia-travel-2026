import {
  BadgeCheck,
  Check,
  Lightbulb,
  MapPin,
  Route,
  Utensils,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { WalkEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'

interface WalkEventContentProps {
  details: WalkEventDetails
}

interface WalkSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function WalkSection({ icon, title, children }: WalkSectionProps) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(28,43,34,0.06)] sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          {icon}
        </span>
        <h2 className="text-xl font-semibold tracking-[-0.025em] text-stone-950 sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function WalkEventContent({ details }: WalkEventContentProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <WalkSection
          icon={<Route size={22} aria-hidden="true" />}
          title="Общая информация"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {details.overview.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {item.icon}
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.13em] text-stone-400">
                  {item.label}
                </p>
                <p className="mt-2 font-semibold leading-6 text-stone-900">
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </WalkSection>
      </div>

      <div className="lg:col-span-2">
        <WalkSection
          icon={<MapPin size={22} aria-hidden="true" />}
          title="Маршрут прогулки"
        >
          <div className="mx-auto max-w-3xl">
            {details.routeStops.map((stop, index) => (
              <div
                key={stop.id}
                className="relative grid grid-cols-[3rem_1fr] gap-3 pb-5 last:pb-0 sm:grid-cols-[3.5rem_1fr] sm:gap-4"
              >
                {index < details.routeStops.length - 1 && (
                  <span className="absolute bottom-0 left-6 top-12 w-px bg-emerald-200 sm:left-7" />
                )}
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(21,128,61,0.2)] sm:size-14">
                  {index + 1}
                </span>

                <article className="min-w-0 overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50">
                  <div className="border-b border-stone-200 bg-white p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                      Точка {index + 1}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-stone-950 sm:text-2xl">
                      📍 {stop.name}
                    </h3>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div
                      className={`grid gap-3 ${
                        stop.duration
                          ? 'sm:grid-cols-3'
                          : 'sm:grid-cols-2'
                      }`}
                    >
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                          🚶 {stop.transferLabel}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-stone-800">
                          {stop.distance}
                        </p>
                        <p className="mt-1 text-xs text-stone-500">
                          {stop.walkingTime}
                        </p>
                      </div>
                      {stop.duration && (
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                            ⏱ {stop.durationLabel}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-stone-800">
                            {stop.duration}
                          </p>
                        </div>
                      )}
                    </div>

                    {stop.highlights && (
                      <div className="mt-5">
                        <p className="text-sm font-semibold text-stone-900">
                          Что увидите
                        </p>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {stop.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="rounded-xl bg-white p-3 text-sm leading-6 text-stone-600 shadow-sm"
                            >
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {stop.tip && (
                      <p className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                        <span className="font-semibold">Совет: </span>
                        {stop.tip}
                      </p>
                    )}

                    {stop.conclusion && (
                      <p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-medium leading-6 text-emerald-900">
                        {stop.conclusion}
                      </p>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </WalkSection>
      </div>

      <div className="lg:col-span-2">
        <WalkSection
          icon={<Utensils size={22} aria-hidden="true" />}
          title="Что попробовать на ужин"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {details.dinnerIdeas.map((dish) => (
              <article
                key={dish.id}
                className="flex items-center gap-4 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {dish.icon}
                </span>
                <h3 className="font-semibold leading-6 text-stone-900">
                  {dish.title}
                </h3>
              </article>
            ))}
          </div>
        </WalkSection>
      </div>

      <div className="lg:col-span-2">
        <section className="overflow-hidden rounded-[1.75rem] bg-emerald-900 p-6 text-white shadow-[0_18px_50px_rgba(20,83,45,0.2)] sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-100">
              <BadgeCheck size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-200">
                Итоги прогулки
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                Сегодня вы увидите
              </h2>
            </div>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_1fr]">
            <ul className="grid gap-3 sm:grid-cols-2">
              {details.summary.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-2 rounded-2xl bg-white/10 p-3.5 text-sm"
                >
                  <Check
                    size={17}
                    className="shrink-0 text-emerald-200"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="grid gap-3">
              {details.summary.stats.map((stat) => (
                <article
                  key={stat.label}
                  className="flex items-center gap-4 rounded-2xl bg-emerald-950/50 p-4"
                >
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{stat.value}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="lg:col-span-2">
        <WalkSection
          icon={<Lightbulb size={22} aria-hidden="true" />}
          title="Полезные советы"
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {details.usefulTips.map((tip) => (
              <li
                key={tip}
                className="flex gap-3 rounded-2xl bg-emerald-50/60 p-4 text-sm leading-6 text-stone-700"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                {tip}
              </li>
            ))}
          </ul>
        </WalkSection>
      </div>

      <EventNavFooter action={details.nextAction} />
    </div>
  )
}
