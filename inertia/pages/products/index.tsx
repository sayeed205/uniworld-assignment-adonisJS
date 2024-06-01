import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'

import Button, { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch } from '@/hooks/use_app_dispatch'
import { useAppSelector } from '@/hooks/use_app_selector'
import { cn } from '@/lib/utils'
import { addToCart, removeFromCart, setInitialState } from '@/redux/cart_slice'
import { useEffect } from 'react'
import ProductController from '../../../app/controllers/products_controller'

const ProductPage = (props: InferPageProps<ProductController, 'index'>) => {
  const { products, user } = props

  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)

  useEffect(() => {
    const localStorageCart = localStorage.getItem('cart')
    if (localStorageCart) {
      dispatch(setInitialState(JSON.parse(localStorageCart)))
    }
  }, [])

  return (
    <section className="w-full py-12">
      <div className="container grid gap-6 px-4 md:gap-8 md:px-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Fall Collection</h1>
            <p className="text-muted-foreground">
              Discover Cozy Elegance: The Fall Collection for a Stylish Season Ahead
            </p>
          </div>
          <Link href="/cart" as="button" className={cn(buttonVariants(), 'md:ml-auto shrink-0')}>
            View Cart ({cartItems.length})
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const inCart = cartItems.some((item) => item.id === product.id)
            return (
              <div key={product.id} className="grid gap-4">
                <div className="grid gap-2.5 relative group">
                  <Link href="#" className="absolute inset-0 z-10">
                    <span className="sr-only">View</span>
                  </Link>
                  <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-full rounded-xl" />
                  </div>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <h4 className="ml-auto font-semibold">${product.price}</h4>
                    </div>
                    <p className="text-sm leading-none">{product.category}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    !user &&
                      (inCart
                        ? dispatch(removeFromCart(product.id))
                        : dispatch(
                            addToCart({
                              id: product.id,
                              quantity: 1,
                              name: product.name,
                              price: product.price,
                            })
                          ))
                  }}
                >
                  {inCart ? 'Remove from Cart' : 'Add to Cart'}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductPage
