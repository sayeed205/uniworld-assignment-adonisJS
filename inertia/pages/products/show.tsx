import { InferPageProps } from '@adonisjs/inertia/types'

import { Icons } from '@/components/icons'
import Navbar from '@/components/navbar'
import ProductCard from '@/components/product_card'
import Button from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch } from '@/hooks/use_app_dispatch'
import { useAppSelector } from '@/hooks/use_app_selector'
import { addToCart, removeFromCart } from '@/lib/utils'
import { CartItem, addToLocalCart, removeFromLocalCart } from '@/redux/cart_slice'
import { useState } from 'react'
import ProductController from '../../../app/controllers/products_controller'

const ProductPage = (props: InferPageProps<ProductController, 'show'>) => {
  const { product, user, cart, products } = props

  const colors = ['black', 'white', 'blue']
  const sizes = ['xs', 's', 'm', 'l', 'xl']
  const quantity = [1, 2, 3, 4, 5]

  const [quantityValue, setQuantityValue] = useState(1)

  const dispatch = useAppDispatch()

  const cartItems = cart ? (cart as CartItem[]) : useAppSelector((state) => state.cart.items)

  const inCart = cartItems?.find((item) => item.id === product.id)

  const handleCartClick = (user: any, product: any, inCart: CartItem | undefined) => {
    if (user) {
      if (inCart) {
        removeFromCart(inCart.orderId!)
      } else {
        addToCart([{ productId: product.id, quantity: quantityValue }])
      }
    } else {
      if (inCart) {
        dispatch(removeFromLocalCart(product.id))
      } else {
        dispatch(
          addToLocalCart({
            id: product.id,
            quantity: quantityValue,
            name: product.name,
            price: product.price,
            category: product.category,
            orderId: null,
          })
        )
      }
    }
  }

  return (
    <div className="flex flex-col">
      <Navbar user={user} cart={cart} />
      <div className="container px-4 py-12 mx-auto md:px-6">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="grid gap-6">
            <Skeleton className=" h-[35rem]" />
            <div className="grid gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="overflow-hidden transition-colors border rounded-lg h-22 hover:border-foreground"
                >
                  <img
                    src="/placeholder.svg"
                    alt="Preview thumbnail"
                    width={100}
                    height={100}
                    className="object-cover aspect-square"
                  />
                  <span className="sr-only">View Image {i}</span>
                </Button>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="mt-2 text-muted-foreground">Description of the product goes here</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <Icons.star className="w-5 h-5 fill-primary" />
                <Icons.star className="w-5 h-5 fill-primary" />
                <Icons.star className="w-5 h-5 fill-primary" />
                <Icons.star className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <Icons.star className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
              <div className="text-muted-foreground">(12 reviews)</div>
            </div>
            <div className="text-4xl font-bold">$99</div>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="color" className="text-base">
                  Color
                </Label>
                <RadioGroup id="color" defaultValue="black" className="flex items-center gap-2">
                  {colors.map((color) => (
                    <Label
                      key={color}
                      htmlFor={`color-${color}`}
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-secondary "
                    >
                      <RadioGroupItem id={`color-${color}`} value={color} />
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </Label>
                  ))}
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="size" className="text-base">
                  Size
                </Label>
                <RadioGroup id="size" defaultValue="m" className="flex items-center gap-2">
                  {sizes.map((size) => (
                    <Label
                      key={size}
                      htmlFor={`size-${size}`}
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-secondary"
                    >
                      <RadioGroupItem id={`size-${size}`} value={size} />
                      {size.toUpperCase()}
                    </Label>
                  ))}
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity" className="text-base">
                  Quantity
                </Label>
                <Select defaultValue="1" onValueChange={(e) => setQuantityValue(parseInt(e))}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {quantity.map((q) => (
                      <SelectItem key={q} value={q.toString()}>
                        {q}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                size="lg"
                variant={inCart ? 'destructive' : 'outline'}
                onClick={(e) => {
                  e.preventDefault()
                  handleCartClick(user, product, inCart)
                }}
              >
                {inCart ? 'Remove from Cart' : 'Add to Cart'}
              </Button>
              <Button size="lg" disabled>
                Buy Now - TODO
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12">
          <Separator />
          <div className="grid gap-8 mt-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Product Specifications</h2>
              <div className="grid gap-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold">Material</h3>
                  <p className="text-muted-foreground">
                    Some material information about the product
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Care Instructions</h3>
                  <p className="text-muted-foreground">Some care instructions about the product</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Related Products</h2>
              <div className="grid gap-6 mt-4 sm:grid-cols-2">
                {products.slice(product.name.length, product.name.length + 2).map((item) => {
                  const inCart = cartItems?.find((cartItem) => cartItem.id === item.id)
                  return <ProductCard key={item.id} product={item} inCart={inCart} user={user} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
