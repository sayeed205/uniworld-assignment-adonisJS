import { HttpContext } from '@adonisjs/core/http'

export default class CartController {
  /**
   * Display a listing of the cart items.
   */
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user?.serialize()

    console.log('CartController.index', user)

    return inertia.render('cart/index', { user })
  }
}
