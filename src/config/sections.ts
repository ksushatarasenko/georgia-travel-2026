import {
  BedDouble,
  ClipboardList,
  Compass,
  FileText,
  Landmark,
  Map,
  MapPinned,
  Settings,
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
] as const

export const sections: AppSection[] = [
  {
    path: '/plan',
    title: 'План поездки',
    description: 'Все дни путешествия в одном месте',
    icon: MapPinned,
    accent: 'bg-emerald-50 text-emerald-700',
  },
  {
    path: '/documents',
    title: 'Документы',
    description: 'Все важные документы поездки в одном месте',
    icon: FileText,
    accent: 'bg-blue-50 text-blue-700',
  },
  {
    path: '/map',
    title: 'Карта',
    description: 'Важные места под рукой',
    icon: Map,
    accent: 'bg-sky-50 text-sky-700',
  },
  {
    path: '/accommodation',
    title: 'Жильё',
    description: 'Все детали проживания',
    icon: BedDouble,
    accent: 'bg-violet-50 text-violet-700',
  },
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
    path: '/settings',
    title: 'Настройки',
    description: 'Параметры приложения',
    icon: Settings,
    accent: 'bg-stone-100 text-stone-700',
  },
]

export const brandIcon = Compass
