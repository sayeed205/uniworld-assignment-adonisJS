import { useAppDispatch } from '@/hooks/use_app_dispatch'
import { addToCart, removeFromCart } from '@/lib/utils'
import { CartItem, addToLocalCart, removeFromLocalCart } from '@/redux/cart_slice'
import { Link } from '@inertiajs/react'
import Button from './ui/button'
import { Skeleton } from './ui/skeleton'

interface ProductCardProps {
  product: any
  inCart: CartItem | undefined
  user: any
}

const ProductCard: React.FunctionComponent<ProductCardProps> = ({ product, inCart, user }) => {
  const dispatch = useAppDispatch()

  const handleCartClick = (user: any, product: any, inCart: CartItem | undefined) => {
    if (user) {
      if (inCart) {
        removeFromCart(inCart.orderId!)
      } else {
        addToCart([{ productId: product.id, quantity: 1 }])
      }
    } else {
      if (inCart) {
        dispatch(removeFromLocalCart(product.id))
      } else {
        dispatch(
          addToLocalCart({
            id: product.id,
            quantity: 1,
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
    <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
      <Link href={`/products/${product.slug}`} className="">
        <Skeleton className="h-[200px] w-full rounded-t-lg" />
      </Link>
      <div className="p-4 bg-background">
        <Link href={`/products/${product.slug}`} className="">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </Link>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold md:text-xl">${product.price}</h4>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              handleCartClick(user, product, inCart)
            }}
            variant={inCart ? 'destructive' : 'default'}
          >
            {inCart ? 'Remove from Cart' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
