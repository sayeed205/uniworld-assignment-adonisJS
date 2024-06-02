import { Link } from '@inertiajs/react'

import { useAppDispatch } from '@/hooks/use_app_dispatch'
import { useAppSelector } from '@/hooks/use_app_selector'
import { cn, updateCartFromLocalStorageToServer } from '@/lib/utils'
import { CartItem, setInitialState } from '@/redux/cart_slice'
import { useEffect } from 'react'
import { Icons } from './icons'
import { buttonVariants } from './ui/button'
import { UserAccountNav } from './user-account-nav'

interface NavbarProps {
  user: any
  cart: CartItem[]
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ user, cart }) => {
  const dispatch = useAppDispatch()
  const cartItems = cart
    ? (cart as CartItem[])
    : (useAppSelector((state) => state.cart.items) as CartItem[])

  useEffect(() => {
    const localStorageCart = localStorage.getItem('cart')
    if (localStorageCart) {
      dispatch(setInitialState(JSON.parse(localStorageCart)))
    }
    user && updateCartFromLocalStorageToServer()
  }, [user])

  return (
    <header className="sticky top-0 z-50 flex items-center px-4 shadow-sm bg-background lg:px-6 h-14 ">
      <Link href="/" className="flex items-center justify-center">
        <Icons.logo className="w-6 h-6" />
        <span className="sr-only">Uniworld</span>
      </Link>
      <nav className="flex gap-4 ml-auto sm:gap-6">
        <Link href="products" className="text-sm font-medium hover:underline underline-offset-4">
          Products
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
          About
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-4 ml-4">
        <Link href="/cart" className="relative">
          <Icons.cart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-primary text-background rounded-full px-2 py-0.5 text-xs font-medium">
            {cartItems.length}
          </span>
        </Link>
        {user ? (
          <UserAccountNav user={user} />
        ) : (
          <Link href="/login" className={cn(buttonVariants({ variant: 'default' }))}>
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar
