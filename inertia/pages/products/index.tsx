import { InferPageProps } from '@adonisjs/inertia/types'
import { router } from '@inertiajs/react'
import { useState } from 'react'

import { Icons } from '@/components/icons'
import Navbar from '@/components/navbar'
import ProductCard from '@/components/product_card'
import Button from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useAppSelector } from '@/hooks/use_app_selector'
import { CartItem } from '@/redux/cart_slice'
import ProductController from '../../../app/controllers/products_controller'

const ProductPage = (props: InferPageProps<ProductController, 'index'>) => {
  const { products, user, cart, params } = props
  const { selectedCategory, query: searchQuery } = params

  const cartItems = cart ? (cart as CartItem[]) : useAppSelector((state) => state.cart.items)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    selectedCategory || ['all']
  )

  const [query, setQuery] = useState(searchQuery || '')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    router.visit(`/products?query=${query}`, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  const handleCategorySelect = (category: string) => {
    let updatedCategories: string[] = []

    if (selectedCategories.includes(category)) {
      if (category === 'all') {
        updatedCategories = []
      } else {
        updatedCategories = selectedCategories.filter((c) => c !== category)
      }
    } else {
      updatedCategories = category === 'all' ? ['all'] : [...selectedCategories, category]
    }

    setSelectedCategories(updatedCategories)

    const cats = updatedCategories.join(',')
    router.visit(`/products?category=${cats}`)
  }

  return (
    <div className="flex flex-col">
      <Navbar user={user} cart={cart} />
      <section className="w-full">
        <div className="container grid gap-6 px-4 md:gap-8 md:px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-8">
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Fall Collection</h1>
              <p className="text-muted-foreground">
                Discover Cozy Elegance: The Fall Collection for a Stylish Season Ahead
              </p>
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={query}
                  onChange={handleSearchChange}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" className="md:ml-auto shrink-0">
                    <Icons.filter className="w-4 h-4 mr-2" />
                    Filter by category
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem
                    checked={selectedCategories.includes('all')}
                    onCheckedChange={() => handleCategorySelect('all')}
                  >
                    All
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedCategories.includes('chairs')}
                    onCheckedChange={() => handleCategorySelect('chairs')}
                  >
                    Chairs
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedCategories.includes('tables')}
                    onCheckedChange={() => handleCategorySelect('tables')}
                  >
                    Tables
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedCategories.includes('dining_tops')}
                    onCheckedChange={() => handleCategorySelect('dining_tops')}
                  >
                    Dining Tops
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
