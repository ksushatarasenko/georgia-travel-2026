import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowLeftRight,
  CheckCircle2,
  CircleDollarSign,
  WalletCards,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  approximateRates,
  budgetCategories,
  convertAmount,
  currencyMeta,
  formatMoney,
  gelTo,
  sumByCategory,
  sumLines,
  tripBudgetLines,
  type BudgetCurrency,
} from '../data/tripBudget'

type BudgetTab = 'planned' | 'paid' | 'remaining' | 'converter'

const tabs: { id: BudgetTab; label: string; icon: string }[] = [
  { id: 'planned', label: 'Планируемые расходы', icon: '📋' },
  { id: 'paid', label: 'Уже оплачено', icon: '✅' },
  { id: 'remaining', label: 'Осталось оплатить', icon: '⏳' },
  { id: 'converter', label: 'Конвертер валют', icon: '💱' },
]

const currencies: BudgetCurrency[] = ['GEL', 'PLN', 'UAH', 'USD']

function MultiCurrencyTotal({
  amountGel,
  title,
  tone = 'default',
}: {
  amountGel: number
  title: string
  tone?: 'default' | 'paid' | 'remaining'
}) {
  const shell =
    tone === 'paid'
      ? 'border-emerald-100 bg-emerald-50/80'
      : tone === 'remaining'
        ? 'border-amber-100 bg-amber-50/80'
        : 'border-stone-200/80 bg-white'

  return (
    <div className={`rounded-[1.75rem] border p-5 shadow-sm sm:p-6 ${shell}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-stone-500">
        {title}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-4xl">
        {formatMoney(amountGel, 'GEL')}
      </p>
      <p className="mt-1 text-xs text-stone-400">базовая валюта поездки</p>
      <dl className="mt-5 grid grid-cols-3 gap-3">
        {(['PLN', 'UAH', 'USD'] as BudgetCurrency[]).map((currency) => (
          <div
            key={currency}
            className="rounded-2xl bg-white/80 px-3 py-3 ring-1 ring-stone-200/70"
          >
            <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">
              {currencyMeta[currency].flag} {currency}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-stone-800">
              {formatMoney(gelTo(amountGel, currency), currency)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function BudgetPage() {
  const [activeTab, setActiveTab] = useState<BudgetTab>('planned')
  const [converterAmount, setConverterAmount] = useState('100')
  const [converterFrom, setConverterFrom] = useState<BudgetCurrency>('GEL')

  const totalPlanned = useMemo(() => sumLines(tripBudgetLines), [])
  const totalPaid = useMemo(
    () => sumLines(tripBudgetLines, (line) => line.paid),
    [],
  )
  const totalRemaining = useMemo(
    () => sumLines(tripBudgetLines, (line) => !line.paid),
    [],
  )
  const byCategory = useMemo(() => sumByCategory(tripBudgetLines), [])
  const paidRatio =
    totalPlanned > 0 ? Math.round((totalPaid / totalPlanned) * 100) : 0

  const parsedAmount = Number(
    converterAmount.replace(',', '.').replace(/\s/g, ''),
  )
  const safeAmount = Number.isFinite(parsedAmount) ? parsedAmount : 0

  const linesForTab = tripBudgetLines.filter((line) => {
    if (activeTab === 'paid') return line.paid
    if (activeTab === 'remaining') return !line.paid
    return true
  })

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <header className="relative overflow-hidden border-b border-stone-200/70 bg-white px-5 pb-10 pt-6 sm:px-8 sm:pb-14 sm:pt-10 lg:px-12">
        <div className="pointer-events-none absolute -right-28 -top-36 size-[28rem] rounded-full bg-lime-100/80 blur-3xl" />
        <div className="pointer-events-none absolute -left-28 top-20 size-72 rounded-full bg-emerald-50 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            На главную
          </Link>

          <div className="pt-12 sm:pt-16">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-lime-700 text-white shadow-[0_10px_25px_rgba(77,124,15,0.22)]">
              <WalletCards size={27} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-lime-800">
              Деньги поездки
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-stone-950 sm:text-6xl">
              Бюджет
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
              Ориентировочный семейный бюджет 2+1: жильё, еда, транспорт,
              экскурсии и запас. Суммы приблизительные — для спокойного
              планирования.
            </p>

            <div className="mt-6 rounded-[1.25rem] border border-amber-100 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
              Курсы валют — {approximateRates.asOfLabel}.{' '}
              {approximateRates.disclaimer}
            </div>
          </div>
        </div>
      </header>

      <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 lg:grid-cols-3">
            <MultiCurrencyTotal
              amountGel={totalPlanned}
              title="Оценка всего бюджета"
            />
            <MultiCurrencyTotal
              amountGel={totalPaid}
              title="Уже оплачено"
              tone="paid"
            />
            <MultiCurrencyTotal
              amountGel={totalRemaining}
              title="Осталось оплатить"
              tone="remaining"
            />
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-stone-800">
                  Прогресс оплаты
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  {formatMoney(totalPaid, 'GEL')} из{' '}
                  {formatMoney(totalPlanned, 'GEL')}
                </p>
              </div>
              <p className="text-2xl font-semibold text-emerald-800">
                {paidRatio}%
              </p>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full rounded-full bg-emerald-600 transition-[width] duration-500"
                style={{ width: `${paidRatio}%` }}
              />
            </div>
          </div>

          <div
            className="mt-8 flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Разделы бюджета"
          >
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-700 ${
                    isActive
                      ? 'bg-lime-800 text-white shadow-sm'
                      : 'bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-lime-50 hover:text-lime-900'
                  }`}
                >
                  <span className="mr-1.5" aria-hidden="true">
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              )
            })}
          </div>

          {activeTab === 'converter' ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[2rem] border border-stone-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(28,43,34,0.06)] sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-lime-50 text-lime-800">
                    <ArrowLeftRight size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                      Конвертер валют
                    </h2>
                    <p className="mt-1 text-sm text-stone-500">
                      Быстрый расчёт по ориентировочным курсам
                    </p>
                  </div>
                </div>

                <label className="mt-8 block">
                  <span className="text-sm font-medium text-stone-600">
                    Сумма
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={converterAmount}
                    onChange={(event) => setConverterAmount(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-stone-200 bg-[#f7f8f4] px-4 py-3.5 text-lg font-semibold text-stone-950 outline-none transition focus:border-lime-600 focus:bg-white focus:ring-4 focus:ring-lime-100"
                  />
                </label>

                <div className="mt-5">
                  <p className="text-sm font-medium text-stone-600">Из валюты</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {currencies.map((currency) => {
                      const isActive = converterFrom === currency
                      return (
                        <button
                          key={currency}
                          type="button"
                          onClick={() => setConverterFrom(currency)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            isActive
                              ? 'bg-lime-800 text-white'
                              : 'bg-stone-100 text-stone-600 hover:bg-lime-50'
                          }`}
                        >
                          {currencyMeta[currency].flag} {currency}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {currencies.map((currency) => {
                    const value = convertAmount(
                      safeAmount,
                      converterFrom,
                      currency,
                    )
                    return (
                      <div
                        key={currency}
                        className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
                          {currencyMeta[currency].flag}{' '}
                          {currencyMeta[currency].label}
                        </p>
                        <p className="mt-2 text-xl font-semibold text-stone-950">
                          {formatMoney(value, currency)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-[2rem] border border-stone-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(28,43,34,0.06)] sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                    <CircleDollarSign size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-stone-950">
                      Ориентировочные курсы
                    </h2>
                    <p className="mt-1 text-sm text-stone-500">
                      За 1 лари (GEL)
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {(
                    [
                      ['PLN', approximateRates.fromGel.PLN],
                      ['UAH', approximateRates.fromGel.UAH],
                      ['USD', approximateRates.fromGel.USD],
                    ] as const
                  ).map(([currency, rate]) => (
                    <li
                      key={currency}
                      className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3"
                    >
                      <span className="text-sm font-medium text-stone-700">
                        {currencyMeta[currency].flag} 1 GEL
                      </span>
                      <span className="text-sm font-semibold text-stone-950">
                        ≈ {rate} {currency}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
                    <span className="text-sm font-medium text-stone-700">
                      🇺🇸 1 USD
                    </span>
                    <span className="text-sm font-semibold text-stone-950">
                      ≈ 2.63 GEL
                    </span>
                  </li>
                </ul>

                <p className="mt-6 text-sm leading-6 text-stone-500">
                  {approximateRates.disclaimer}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-6">
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                  Категории
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {budgetCategories.map((category) => {
                    const planned = byCategory[category.id]
                    const paid = sumLines(
                      tripBudgetLines,
                      (line) =>
                        line.categoryId === category.id && line.paid,
                    )
                    const share =
                      totalPlanned > 0
                        ? Math.round((planned / totalPlanned) * 100)
                        : 0
                    const paidShare =
                      planned > 0 ? Math.round((paid / planned) * 100) : 0

                    return (
                      <article
                        key={category.id}
                        className="rounded-[1.75rem] border border-stone-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(28,43,34,0.05)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span
                            className={`flex size-12 items-center justify-center rounded-2xl text-xl ${category.accent}`}
                          >
                            {category.icon}
                          </span>
                          <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-500">
                            {share}% бюджета
                          </span>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-stone-950">
                          {category.label}
                        </h3>
                        <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                          {formatMoney(planned, 'GEL')}
                        </p>
                        <p className="mt-1 text-xs text-stone-400">
                          ≈ {formatMoney(gelTo(planned, 'PLN'), 'PLN')} ·{' '}
                          {formatMoney(gelTo(planned, 'UAH'), 'UAH')} ·{' '}
                          {formatMoney(gelTo(planned, 'USD'), 'USD')}
                        </p>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-100">
                          <div
                            className={`h-full rounded-full ${category.bar}`}
                            style={{ width: `${Math.max(share, 4)}%` }}
                          />
                        </div>
                        <p className="mt-3 text-xs font-medium text-stone-500">
                          Оплачено {paidShare}% · {formatMoney(paid, 'GEL')}
                        </p>
                      </article>
                    )
                  })}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                  {activeTab === 'paid'
                    ? 'Оплаченные позиции'
                    : activeTab === 'remaining'
                      ? 'Что ещё предстоит оплатить'
                      : 'Все планируемые расходы'}
                </h2>
                <ul className="mt-4 grid gap-3">
                  {linesForTab.map((line) => {
                    const category = budgetCategories.find(
                      (item) => item.id === line.categoryId,
                    )!

                    return (
                      <li
                        key={line.id}
                        className="flex flex-col gap-3 rounded-[1.5rem] border border-stone-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5"
                      >
                        <div className="flex min-w-0 items-start gap-3">
                          <span
                            className={`flex size-11 shrink-0 items-center justify-center rounded-2xl text-lg ${category.accent}`}
                          >
                            {category.icon}
                          </span>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-semibold text-stone-950">
                                {line.title}
                              </p>
                              {line.paid ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                                  <CheckCircle2
                                    size={12}
                                    aria-hidden="true"
                                  />
                                  Оплачено
                                </span>
                              ) : (
                                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
                                  К оплате
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs font-medium text-stone-400">
                              {category.label}
                            </p>
                            {line.note ? (
                              <p className="mt-1 text-sm text-stone-500">
                                {line.note}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="shrink-0 text-left sm:text-right">
                          <p className="text-lg font-semibold text-stone-950">
                            {formatMoney(line.amountGel, 'GEL')}
                          </p>
                          <p className="mt-1 text-xs text-stone-400">
                            ≈ {formatMoney(gelTo(line.amountGel, 'PLN'), 'PLN')}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
