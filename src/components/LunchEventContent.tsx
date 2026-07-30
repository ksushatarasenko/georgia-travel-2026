import {
  ArrowRight,
  CircleDollarSign,
  Clock3,
  Lightbulb,
  MapPin,
  UtensilsCrossed,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LunchEventDetails } from '../types/data'

interface LunchEventContentProps {
  details: LunchEventDetails
}

interface LunchSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function LunchSection({ icon, title, children }: LunchSectionProps) {
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

export function LunchEventContent({ details }: LunchEventContentProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <LunchSection
          icon={<UtensilsCrossed size={22} aria-hidden="true" />}
          title={details.whyHere.title}
        >
          <div className="space-y-4">
            {details.whyHere.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-7 text-stone-600 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </LunchSection>
      </div>

      <div className="lg:col-span-2">
        <LunchSection
          icon={<MapPin size={22} aria-hidden="true" />}
          title="📍 Где лучше пообедать"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {details.restaurants.map((restaurant) => (
              <article
                key={restaurant.id}
                className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50"
              >
                <div className="border-b border-stone-200 bg-white p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-2xl">
                      {restaurant.rank}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-[-0.03em] text-stone-950 sm:text-xl">
                        {restaurant.name}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-stone-500">
                        {restaurant.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="space-y-2 text-sm text-stone-600">
                    <p>📍 {restaurant.location}</p>
                    <p>🚗 {restaurant.driveTime}</p>
                  </div>

                  <p className="mt-5 text-sm font-semibold text-stone-900">
                    Почему стоит выбрать
                  </p>
                  <ul className="mt-3 space-y-2">
                    {restaurant.reasons.map((reason) => (
                      <li
                        key={reason}
                        className="flex gap-2 text-sm leading-6 text-stone-600"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-600" />
                        {reason}
                      </li>
                    ))}
                  </ul>

                  {restaurant.note && (
                    <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                      {restaurant.note}
                    </p>
                  )}

                  <div className="mt-auto pt-5">
                    <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
                      👤 Средний чек: {restaurant.averageCheck}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </LunchSection>
      </div>

      <div className="lg:col-span-2">
        <LunchSection
          icon={<UtensilsCrossed size={22} aria-hidden="true" />}
          title="🍲 Что попробовать"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.dishes.map((dish) => (
              <article
                key={dish.id}
                className="flex items-center gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  {dish.icon}
                </span>
                <p className="text-sm font-semibold text-stone-900 sm:text-base">
                  {dish.title}
                </p>
              </article>
            ))}
          </div>
        </LunchSection>
      </div>

      <div>
        <LunchSection
          icon={<CircleDollarSign size={22} aria-hidden="true" />}
          title="💰 Средний чек"
        >
          <div className="grid gap-3">
            <article className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                На человека
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-emerald-700">
                {details.averageCheck.perPerson}
              </p>
            </article>
            <article className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                На семью
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-emerald-700">
                {details.averageCheck.family}
              </p>
            </article>
            {details.averageCheck.note && (
              <p className="text-sm leading-6 text-stone-500">
                {details.averageCheck.note}
              </p>
            )}
          </div>
        </LunchSection>
      </div>

      <div>
        <LunchSection
          icon={<Clock3 size={22} aria-hidden="true" />}
          title="⏱️ Сколько времени заложить"
        >
          <p className="text-3xl font-semibold tracking-[-0.04em] text-stone-950">
            {details.duration.value}
          </p>
          {details.duration.note && (
            <p className="mt-4 text-sm leading-6 text-stone-600">
              {details.duration.note}
            </p>
          )}
        </LunchSection>
      </div>

      <div className="lg:col-span-2">
        <LunchSection
          icon={<Lightbulb size={22} aria-hidden="true" />}
          title="💡 Советы"
        >
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.tips.map((tip) => (
              <li
                key={tip.id}
                className="rounded-[1.25rem] border border-stone-200 bg-emerald-50/60 p-5 text-sm font-medium leading-6 text-stone-800"
              >
                {tip.text}
              </li>
            ))}
          </ul>
        </LunchSection>
      </div>

      <div className="lg:col-span-2">
        <LunchSection
          icon={<ArrowRight size={22} aria-hidden="true" />}
          title="➡️ Следующий шаг"
        >
          <Link
            to={`/trip/event/${details.nextAction.eventId}`}
            className="group flex items-center gap-4 rounded-[1.5rem] bg-emerald-900 p-5 text-white shadow-[0_15px_40px_rgba(20,83,45,0.18)] transition hover:-translate-y-0.5 hover:bg-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:p-7"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              {details.nextAction.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xl font-semibold">
                {details.nextAction.title}
              </span>
              <span className="mt-1 block text-sm leading-6 text-emerald-100/80">
                {details.nextAction.description}
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
              {details.nextAction.buttonLabel}
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </LunchSection>
      </div>
    </div>
  )
}
