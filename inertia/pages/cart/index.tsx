import CartController from '#controllers/cart_controller'
import { Icons } from '@/components/icons'
import Button from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch } from '@/hooks/use_app_dispatch'
import { useAppSelector } from '@/hooks/use_app_selector'
import { decreaseQuantity, increaseQuantity, setInitialState } from '@/redux/cart_slice'
import { InferPageProps } from '@adonisjs/inertia/types'
import { router } from '@inertiajs/react'
import { useEffect, useMemo } from 'react'

const CartPage = (props: InferPageProps<CartController, 'index'>) => {
  const { user } = props

  console.log(user)

  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)

  useEffect(() => {
    const localStorageCart = localStorage.getItem('cart')
    if (localStorageCart) {
      dispatch(setInitialState(JSON.parse(localStorageCart)))
    }
  }, [])

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
                      !user && dispatch(decreaseQuantity(item.id))
                    }}
                  >
                    <Icons.minus className="w-4 h-4" />
                  </Button>
                  <span className="font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      !user && dispatch(increaseQuantity(item.id))
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
