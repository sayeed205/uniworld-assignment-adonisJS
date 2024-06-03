import {
  Check,
  ChevronLeft,
  CircleUser,
  Eye,
  EyeOff,
  Filter,
  Hexagon,
  Loader2,
  LogOut,
  LucideProps,
  Minus,
  Plus,
  Search,
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

  check: Check,

  cart: ShoppingCart,

  logo: Hexagon,

  user: CircleUser,
  logout: LogOut,

  filter: Filter,
  search: Search,

  star: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
}
