import CartController from '#controllers/cart_controller'
import { Icons } from '@/components/icons'
import Button, { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch } from '@/hooks/use_app_dispatch'
import { useAppSelector } from '@/hooks/use_app_selector'
import { cn, updateCart, updateCartFromLocalStorageToServer } from '@/lib/utils'
import { CartItem, decreaseQuantity, increaseQuantity, setInitialState } from '@/redux/cart_slice'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link, router } from '@inertiajs/react'
import { useEffect, useMemo } from 'react'

const CartPage = (props: InferPageProps<CartController, 'index'>) => {
  const { user, cart } = props

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

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }, [cartItems])

  const handlePlaceOrder = (): void => {
    if (!user) {
      console.log('User is not logged in')
      return router.visit('/login?next=cart')
    }
    // handle order placement
  }

  const handleQuantityIncrease = (cart: CartItem): void => {
    const quantity = cart.quantity + 1
    user ? updateCart(cart.cartId!, quantity) : dispatch(increaseQuantity(cart.id))
  }

  const handleQuantityDecrease = (cart: CartItem): void => {
    const quantity = cart.quantity - 1
    user ? updateCart(cart.cartId!, quantity) : dispatch(decreaseQuantity(cart.id))
  }

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
          <p className="text-muted-foreground">
            Looks like you haven't added anything to your cart yet. Continue browsing our products
            and add items to your cart.
          </p>
        </div>
        <Link href="/products" className={cn(buttonVariants({ variant: 'default' }))}>
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col max-w-6xl gap-8 px-4 py-8 mx-auto md:flex-row">
      <div className="flex flex-col w-full gap-6">
        {cartItems.map((item) => {
          const itemTotal = item.price * item.quantity
          return (
            <div key={item.id} className="flex items-center gap-4 md:flex-row">
              <div className="flex flex-col space-y-3">
                <Skeleton className="w-[100px] h-[100px] rounded-xl" />
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </div>
              <div className="flex items-center justify-around gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      handleQuantityDecrease(item)
                    }}
                  >
                    <Icons.minus className="w-4 h-4" />
                  </Button>
                  <span className="font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      handleQuantityIncrease(item)
                    }}
                  >
                    <Icons.plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-medium">${item.price}</span>
                  <span className="text-sm text-muted-foreground">${itemTotal}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-col gap-4 sticky top-4 max-h-72 bg-background rounded-md shadow-2xl p-6 w-full md:w-[300px]">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">Order Summary</h2>
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            handlePlaceOrder()
          }}
        >
          Place Order
        </Button>
      </div>
    </div>
  )
}

export default CartPage
