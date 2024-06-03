import { HttpContext } from '@adonisjs/core/http'

import bindProduct from '#decorators/bind_product'
import getUserCart from '#lib/get_user_cart'
import Product from '#models/product'

export default class ProductsController {
  /**
   * Display a listing of the products.
   */
  async index({ inertia, auth, request }: HttpContext) {
    const user = auth.user!

    // in query params
    let productCategory = request.input('category') as string | string[]

    // If 'productCategory' is 'all' or falsy, set it to an empty array
    if (productCategory === 'all' || !productCategory) {
      productCategory = []
    } else if (!Array.isArray(productCategory)) {
      // If 'productCategory' is a string, wrap it in an array
      productCategory = [productCategory]
    }

    const cart = await getUserCart(user)
    const products = await Product.query().if(productCategory.length, (query) => {
      return query.whereIn('category', productCategory)
    })

    return inertia.render('products/index', {
      products,
      user: user?.serialize(),
      cart,
      selectedCategory: productCategory,
    })
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
