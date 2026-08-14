import {
  CircleDollarSign,
  Clock3,
  Languages,
  Lightbulb,
  MapPin,
  UtensilsCrossed,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { LunchEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'
import { PlaceCard } from './PlaceCard'

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
              <PlaceCard key={restaurant.id} data={restaurant} />
            ))}
          </div>
        </LunchSection>
      </div>

      {details.englishPhrases && details.englishPhrases.length > 0 ? (
        <div className="lg:col-span-2">
          <LunchSection
            icon={<Languages size={22} aria-hidden="true" />}
            title="🗣 English phrases"
          >
            <ul className="grid gap-3 sm:grid-cols-2">
              {details.englishPhrases.map((phrase) => (
                <li
                  key={phrase.original}
                  className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4"
                >
                  <p className="text-sm font-semibold text-stone-950">
                    {phrase.original}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    {phrase.translation}
                  </p>
                </li>
              ))}
            </ul>
          </LunchSection>
        </div>
      ) : null}

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

      <EventNavFooter action={details.nextAction} />
    </div>
  )
}
