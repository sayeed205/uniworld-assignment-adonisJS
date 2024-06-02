import HomeController from '#controllers/home_controller'
import CategoryCard from '@/components/category_card'
import Navbar from '@/components/navbar'
import ProductCard from '@/components/product_card'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppSelector } from '@/hooks/use_app_selector'
import { cn } from '@/lib/utils'
import { CartItem } from '@/redux/cart_slice'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, Link } from '@inertiajs/react'

export default function Home(props: InferPageProps<HomeController, 'show'>) {
  const { user, products, cart } = props
  const cartItems = cart ? (cart as CartItem[]) : useAppSelector((state) => state.cart.items)

  const categories = [
    {
      name: 'Chairs',
      description: 'Sit back and relax',
    },
    {
      name: 'Tables',
      description: 'Work from home in style',
    },
    {
      name: 'Dining tops',
      description: 'Gather around the table',
    },
  ]

  return (
    <>
      <Head title="Homepage" />

      <div className="flex flex-col ">
        <Navbar user={user} cart={cart} />
        <main className="flex-1">
          <section className="w-full p-12 md:pt-24 lg:pt-32 border-y">
            <div className="container space-y-10 xl:space-y-16">
              <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
                <div>
                  <Skeleton className="w-full h-72" />
                </div>
                <div className="flex flex-col items-start space-y-4">
                  <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                    Discover the perfect product for your needs
                  </h1>
                  <p className="mx-auto max-w-[700px] text-primary md:text-xl">
                    Browse our wide selection of high-quality products and find the perfect fit for
                    you.
                  </p>
                  <Link href="products" className={cn(buttonVariants({ variant: 'default' }))}>
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 space-y-12 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Featured Products
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                    Browse our selection of the latest and greatest products.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.slice(0, 4).map((product) => {
                  const inCart = cartItems.find((item) => item.id === product.id)
                  return (
                    <ProductCard key={product.id} product={product} inCart={inCart} user={user} />
                  )
                })}
              </div>
            </div>
          </section>
          <section className="w-full py-12 bg-secondary md:py-24 lg:py-32">
            <div className="container px-4 space-y-12 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Featured Categories
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Browse our selection of products by category.
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-6 ">
                {categories.map((category) => (
                  <CategoryCard key={category.name} {...category} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
