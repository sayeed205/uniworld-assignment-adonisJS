import { HttpContext } from '@adonisjs/core/http'

import bindProduct from '#decorators/bind_product'
import getUserCart from '#lib/get_user_cart'
import Product from '#models/product'

export default class ProductsController {
  /**
   * Display a listing of the products.
   */
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!

    const cart = await getUserCart(user)

    const products = await Product.all()
    return inertia.render('products/index', { products, user: user?.serialize(), cart })
  }

  /**
   * Display the specified product.
   */
  @bindProduct()
  async show({ inertia, auth }: HttpContext, product: Product) {
    const user = auth.user!

    const cart = await getUserCart(user)

    const products = await Product.all()

    return inertia.render('products/show', { product, user: user?.serialize(), cart, products })
  }
}
