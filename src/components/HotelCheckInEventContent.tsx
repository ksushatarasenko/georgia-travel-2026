import {
  Check,
  ClipboardCheck,
  Hotel,
  KeyRound,
  Languages,
  Lightbulb,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import type { HotelCheckInEventDetails } from '../types/data'
import { EventNavFooter } from './EventNavFooter'

const hotelChecklistStorageKey =
  'georgia-travel-2026:hotel-check-in:checklist'

interface HotelCheckInEventContentProps {
  details: HotelCheckInEventDetails
}

interface HotelSectionProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function HotelSection({ icon, title, children }: HotelSectionProps) {
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

export function HotelCheckInEventContent({
  details,
}: HotelCheckInEventContentProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      try {
        const savedValue = localStorage.getItem(hotelChecklistStorageKey)
        return savedValue ? JSON.parse(savedValue) : {}
      } catch {
        return {}
      }
    },
  )

  useEffect(() => {
    localStorage.setItem(
      hotelChecklistStorageKey,
      JSON.stringify(checkedItems),
    )
  }, [checkedItems])

  const completedItems = details.checklist.filter(
    (item) => checkedItems[item.id],
  ).length
  const progress =
    details.checklist.length > 0
      ? Math.round((completedItems / details.checklist.length) * 100)
      : 0

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <HotelSection
          icon={<Hotel size={22} aria-hidden="true" />}
          title="Информация о бронировании"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {details.bookingInfo.map((item) => (
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
                <p className="mt-2 font-semibold leading-6 text-stone-800">
                  {item.value.startsWith('http') ? (
                    <a
                      href={item.value}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-800 underline decoration-emerald-200 underline-offset-2 hover:text-emerald-950"
                    >
                      Открыть в Google Maps
                    </a>
                  ) : (
                    item.value
                  )}
                </p>
              </article>
            ))}
          </div>
        </HotelSection>
      </div>

      <div className="lg:col-span-2">
        <HotelSection
          icon={<ClipboardCheck size={22} aria-hidden="true" />}
          title="Что показать на ресепшене"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {details.receptionDocuments.map((document) => (
              <article
                key={document.id}
                className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {document.icon}
                </span>
                <h3 className="mt-5 font-semibold leading-6 text-stone-900">
                  {document.title}
                </h3>
                {document.note && (
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    {document.note}
                  </p>
                )}
              </article>
            ))}
          </div>
        </HotelSection>
      </div>

      <div className="lg:col-span-2">
        <HotelSection
          icon={<KeyRound size={22} aria-hidden="true" />}
          title="Как проходит заселение"
        >
          <div className="mx-auto max-w-2xl">
            {details.checkInSteps.map((step, index) => (
              <div key={step} className="relative flex gap-4 pb-4 last:pb-0">
                {index < details.checkInSteps.length - 1 && (
                  <span className="absolute left-5 top-10 h-[calc(100%-1.25rem)] w-px bg-emerald-200" />
                )}
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white shadow-sm">
                  {index + 1}
                </span>
                <article className="min-w-0 flex-1 rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:p-5">
                  <p className="font-semibold leading-6 text-stone-900">
                    {step}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </HotelSection>
      </div>

      <div className="lg:col-span-2">
        <section className="overflow-hidden rounded-[1.75rem] bg-stone-950 p-6 text-white shadow-[0_18px_50px_rgba(28,25,23,0.18)] sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-400/15 text-blue-200">
              <Languages size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200">
                Полезные фразы
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                🇬🇧 English
              </h2>
            </div>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {details.englishPhrases.map((phrase) => (
              <article
                key={phrase.original}
                className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/10"
              >
                <p className="text-base font-semibold leading-7 text-white">
                  {phrase.original}
                </p>
                <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-6 text-stone-300">
                  <span aria-hidden="true">📖 </span>
                  {phrase.translation}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="lg:col-span-2">
        <HotelSection
          icon={<Check size={22} aria-hidden="true" />}
          title="Чек-лист"
        >
          <div className="mb-5 rounded-2xl bg-emerald-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-emerald-900">
                Выполнено
              </span>
              <span className="text-sm font-semibold text-emerald-800">
                {completedItems} из {details.checklist.length}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-100">
              <div
                className="h-full rounded-full bg-emerald-700 transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {details.checklist.map((item) => {
              const isChecked = Boolean(checkedItems[item.id])

              return (
                <label
                  key={item.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                    isChecked
                      ? 'border-emerald-200 bg-emerald-50/70'
                      : 'border-stone-200 bg-stone-50 hover:border-emerald-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(event) =>
                      setCheckedItems((current) => ({
                        ...current,
                        [item.id]: event.target.checked,
                      }))
                    }
                    className="sr-only"
                  />
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-lg border transition ${
                      isChecked
                        ? 'border-emerald-700 bg-emerald-700 text-white'
                        : 'border-stone-300 bg-white text-transparent'
                    }`}
                  >
                    <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isChecked
                        ? 'text-emerald-900 line-through decoration-emerald-400'
                        : 'text-stone-700'
                    }`}
                  >
                    {item.label}
                  </span>
                </label>
              )
            })}
          </div>
        </HotelSection>
      </div>

      <EventNavFooter action={details.nextAction} />

      <div className="lg:col-span-2">
        <HotelSection
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
        </HotelSection>
      </div>
    </div>
  )
}
