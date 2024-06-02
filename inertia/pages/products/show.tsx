import { InferPageProps } from '@adonisjs/inertia/types'

import Navbar from '@/components/navbar'
import ProductController from '../../../app/controllers/products_controller'

const ProductPage = (props: InferPageProps<ProductController, 'show'>) => {
  const { product, user, cart } = props
  return (
    <div className="flex flex-col">
      <Navbar user={user} cart={cart} />
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
  )
}

export default ProductPage
