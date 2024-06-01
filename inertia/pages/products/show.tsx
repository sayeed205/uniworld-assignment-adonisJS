import { InferPageProps } from '@adonisjs/inertia/types'

import ProductController from '../../../app/controllers/products_controller'

const ProductPage = (props: InferPageProps<ProductController, 'show'>) => {
  const { product } = props
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
  )
}

export default ProductPage
