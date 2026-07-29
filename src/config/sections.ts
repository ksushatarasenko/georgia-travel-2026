import {
  BedDouble,
  BusFront,
  Coffee,
  Compass,
  FileText,
  Landmark,
  Map,
  MapPinned,
  Settings,
  Umbrella,
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

export const sections: AppSection[] = [
  {
    path: '/plan',
    title: 'План поездки',
    description: 'Все дни путешествия в одном месте',
    icon: MapPinned,
    accent: 'bg-emerald-50 text-emerald-700',
  },
  {
    path: '/map',
    title: 'Карта',
    description: 'Важные места под рукой',
    icon: Map,
    accent: 'bg-sky-50 text-sky-700',
  },
  {
    path: '/transport',
    title: 'Транспорт',
    description: 'Информация о передвижениях',
    icon: BusFront,
    accent: 'bg-amber-50 text-amber-700',
  },
  {
    path: '/accommodation',
    title: 'Жилье',
    description: 'Все детали проживания',
    icon: BedDouble,
    accent: 'bg-violet-50 text-violet-700',
  },
  {
    path: '/sights',
    title: 'Достопримечательности',
    description: 'Места, которые хочется увидеть',
    icon: Landmark,
    accent: 'bg-rose-50 text-rose-700',
  },
  {
    path: '/beaches',
    title: 'Пляжи',
    description: 'Отдых у моря',
    icon: Umbrella,
    accent: 'bg-cyan-50 text-cyan-700',
  },
  {
    path: '/cafes',
    title: 'Кафе',
    description: 'Места для вкусных остановок',
    icon: Coffee,
    accent: 'bg-orange-50 text-orange-700',
  },
  {
    path: '/documents',
    title: 'Документы',
    description: 'Важные данные в одном разделе',
    icon: FileText,
    accent: 'bg-blue-50 text-blue-700',
  },
  {
    path: '/budget',
    title: 'Бюджет',
    description: 'Расходы путешествия',
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
