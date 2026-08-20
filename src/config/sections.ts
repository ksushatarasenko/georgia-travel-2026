import {
  ClipboardList,
  FileText,
  Landmark,
  Settings,
  ShoppingCart,
  WalletCards,
  type LucideIcon,
} from 'lucide-react'

export interface AppSection {
  path: string
  title: string
  description: string
  icon: LucideIcon
  accent: string
}

/** Cards shown on the Home screen, in display order. */
export const homeSectionPaths = [
  '/sights',
  '/checklist',
  '/budget',
  '/shopping',
  '/documents',
] as const

export const sections: AppSection[] = [
  {
    path: '/sights',
    title: 'Места маршрута',
    description: 'Центральный гид по локациям поездки',
    icon: Landmark,
    accent: 'bg-rose-50 text-rose-700',
  },
  {
    path: '/checklist',
    title: 'Чек-лист',
    description: 'Документы, вещи и покупки перед поездкой.',
    icon: ClipboardList,
    accent: 'bg-indigo-50 text-indigo-700',
  },
  {
    path: '/budget',
    title: 'Бюджет',
    description: 'Расходы путешествия и конвертер валют',
    icon: WalletCards,
    accent: 'bg-lime-50 text-lime-700',
  },
  {
    path: '/shopping',
    title: 'Покупки',
    description: 'Что купить, попробовать и посмотреть в Грузии',
    icon: ShoppingCart,
    accent: 'bg-orange-50 text-orange-700',
  },
  {
    path: '/documents',
    title: 'Документы',
    description: 'Важные документы и ссылки на них',
    icon: FileText,
    accent: 'bg-sky-50 text-sky-700',
  },
  {
    path: '/settings',
    title: 'Настройки',
    description: 'Параметры приложения',
    icon: Settings,
    accent: 'bg-stone-100 text-stone-700',
  },
]
