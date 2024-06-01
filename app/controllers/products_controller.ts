// import type { HttpContext } from '@adonisjs/core/http'

import bindProduct from '#decorators/bind_product'
import Product from '#models/product'
import { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a listing of the products.
   */
  async index({ inertia }: HttpContext) {
    const products = await Product.all()
    return inertia.render('products/index', { products })
  }

  /**
   * Display the specified product.
   */
  @bindProduct()
  async show({ inertia }: HttpContext, product: Product) {
    return inertia.render('products/show', { product })
  }
}
