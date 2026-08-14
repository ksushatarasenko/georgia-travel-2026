import {
  Check,
  CircleDollarSign,
  Lightbulb,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { SeafoodLunchEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'
import { LightboxImage } from './lightbox'
import { PlaceCard } from './PlaceCard'
import { ScheduleCard } from './ScheduleCard'

interface SeafoodLunchEventContentProps {
  details: SeafoodLunchEventDetails
}

interface SectionProps {
  title: string
  children: ReactNode
  icon?: ReactNode
}

function Section({ title, children, icon }: SectionProps) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(28,43,34,0.06)] sm:p-7">
      <div className="flex items-center gap-3">
        {icon ? (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            {icon}
          </span>
        ) : null}
        <h2 className="text-xl font-semibold tracking-[-0.025em] text-stone-950 sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function SeafoodLunchEventContent({
  details,
}: SeafoodLunchEventContentProps) {
  const dishImages = details.dishes.map((dish) => ({
    src: dish.image,
    alt: dish.imageAlt,
  }))

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <ScheduleCard
          title={details.timeline.title}
          range={details.timeline.range}
          steps={details.timeline.steps}
        />
      </div>

      <div className="lg:col-span-2">
        <Section title={details.restaurantSectionTitle}>
          <PlaceCard data={details.restaurant} />
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section title={details.dishesSectionTitle}>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {details.dishes.map((dish, index) => (
              <article
                key={dish.id}
                className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50"
              >
                <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                  <LightboxImage
                    src={dish.image}
                    alt={dish.imageAlt}
                    images={dishImages}
                    index={index}
                    className="size-full"
                    imgClassName="size-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                    {dish.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {dish.description}
                  </p>
                  <p className="mt-4 text-sm text-stone-800">
                    <span className="font-semibold text-stone-500">
                      Приготовление:{' '}
                    </span>
                    {dish.cookingMethod}
                  </p>
                  {dish.price ? (
                    <p className="mt-2 text-sm font-semibold text-emerald-800">
                      {dish.price}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      <div>
        <Section
          title={details.familyOrder.title}
          icon={<Check size={22} aria-hidden="true" />}
        >
          <ul className="space-y-2">
            {details.familyOrder.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-[1.15rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-900"
              >
                <span className="text-emerald-700" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div>
        <Section
          title={details.budget.title}
          icon={<CircleDollarSign size={22} aria-hidden="true" />}
        >
          <p className="text-sm font-medium text-stone-500">
            {details.budget.familyNote}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-stone-950">
            {details.budget.estimate}
          </p>
        </Section>
      </div>

      <div className="lg:col-span-2">
        <Section
          title={details.travelTip.title}
          icon={<Lightbulb size={22} aria-hidden="true" />}
        >
          <p className="rounded-[1.25rem] border border-emerald-100 bg-emerald-50/70 p-5 text-base leading-7 text-emerald-950">
            {details.travelTip.text}
          </p>
        </Section>
      </div>

      <EventNavFooter action={details.nextAction} />
    </div>
  )
}
