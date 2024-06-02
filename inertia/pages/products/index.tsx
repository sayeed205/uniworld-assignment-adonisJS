import { InferPageProps } from '@adonisjs/inertia/types'

import Navbar from '@/components/navbar'
import ProductCard from '@/components/product_card'
import { useAppSelector } from '@/hooks/use_app_selector'
import { CartItem } from '@/redux/cart_slice'
import ProductController from '../../../app/controllers/products_controller'

const ProductPage = (props: InferPageProps<ProductController, 'index'>) => {
  const { products, user, cart } = props

  const cartItems = cart ? (cart as CartItem[]) : useAppSelector((state) => state.cart.items)

  return (
    <div className="flex flex-col">
      <Navbar user={user} cart={cart} />
      <section className="w-full">
        <div className="container grid gap-6 px-4 md:gap-8 md:px-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Fall Collection</h1>
              <p className="text-muted-foreground">
                Discover Cozy Elegance: The Fall Collection for a Stylish Season Ahead
              </p>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const inCart = cartItems.find((item) => item.id === product.id)
              return <ProductCard key={product.id} product={product} inCart={inCart} user={user} />
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductPage
