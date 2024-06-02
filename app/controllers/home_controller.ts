import Product from '#models/product'
import { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  /**
   * Display home page
   */
  async show({ inertia, auth }: HttpContext) {
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

    const products = await Product.all().then((products) =>
      products.map((product) => product.serialize())
    )

    return inertia.render('home', { user: user?.serialize(), cart, products })
  }
}
