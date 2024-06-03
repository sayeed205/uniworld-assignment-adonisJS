import getUserCart from '#lib/get_user_cart'
import Product from '#models/product'
import { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  /**
   * Display home page
   */
  async show({ inertia, auth }: HttpContext) {
    const user = auth.user!

    const cart = await getUserCart(user)
    const products = await Product.all().then((products) =>
      products.map((product) => product.serialize())
    )

    return inertia.render('home', { user: user?.serialize(), cart, products })
  }
}
