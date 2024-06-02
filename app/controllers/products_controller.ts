import { HttpContext } from '@adonisjs/core/http'

import bindProduct from '#decorators/bind_product'
import Product from '#models/product'

export default class ProductsController {
  /**
   * Display a listing of the products.
   */
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!

    const cart = (await user?.related('carts').query().preload('product'))?.map((el) => {
      const cart = el.serialize()
      return {
        id: cart.product.id,
        name: cart.product.name,
        price: cart.product.price,
        category: cart.product.category,
        quantity: cart.quantity,
        cartId: cart.id,
      }
    })

    const products = await Product.all()
    return inertia.render('products/index', { products, user: user?.serialize(), cart })
  }

  /**
   * Display the specified product.
   */
  @bindProduct()
  async show({ inertia }: HttpContext, product: Product) {
    return inertia.render('products/show', { product })
  }
}
