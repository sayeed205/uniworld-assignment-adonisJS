import {
  ChevronLeft,
  CircleUser,
  Eye,
  EyeOff,
  Hexagon,
  Loader2,
  LogOut,
  Minus,
  Plus,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react'

export type Icon = LucideIcon

export const Icons = {
  eye: Eye,
  eyeOff: EyeOff,

  spinner: Loader2,
  chevronLeft: ChevronLeft,

  plus: Plus,
  minus: Minus,

  cart: ShoppingCart,

  logo: Hexagon,

  user: CircleUser,
  logout: LogOut,
}
