import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'

import Button from '@/components/ui/button'
import ProductController from '../../../app/controllers/products_controller'

const ProductPage = (props: InferPageProps<ProductController, 'index'>) => {
  const { products } = props
  return (
    <section className="w-full py-12">
      <div className="container grid gap-6 px-4 md:gap-8 md:px-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Fall Collection</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Discover Cozy Elegance: The Fall Collection for a Stylish Season Ahead
            </p>
          </div>
          <Button size="lg" variant="outline" className="md:ml-auto shrink-0">
            View Cart (0)
          </Button>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            // const inCart = cart.some((item) => item.id === product.id)
            return (
              <div key={product.id} className="grid gap-4">
                <div className="grid gap-2.5 relative group">
                  <Link href="#" className="absolute inset-0 z-10">
                    <span className="sr-only">View</span>
                  </Link>
                  <img
                    src="/placeholder.svg"
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-cover w-full transition-opacity rounded-lg aspect-square group-hover:opacity-50"
                  />
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
                  // onClick={() => {
                  //   if (inCart) {
                  //     handleRemoveFromCart(product)
                  //   } else {
                  //     handleAddToCart(product)
                  //   }
                  // }}
                >
                  {/* {inCart ? 'Remove from Cart' : 'Add to Cart'} */}
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
