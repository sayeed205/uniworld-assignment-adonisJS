import { HttpContext } from '@adonisjs/core/http'

import bindCart from '#decorators/bind_cart'
import getUserCart from '#lib/get_user_cart'
import Order from '#models/order'
import { addToCartValidator, updateCartValidator } from '#validators/cart_validator'

export default class CartController {
  /**
   * Display a listing of the order items.
   */
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!

    const cart = await getUserCart(user)

    return inertia.render('cart/index', { user: user?.serialize(), cart })
  }

  /**
   * Add product(s) to the order.
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.redirect('/login')
    }

    const { cartItems } = await request.validateUsing(addToCartValidator)

    // remove duplicates from cartItems searching db
    const finalCart: { productId: string; quantity: number }[] = []

    for (const cartItem of cartItems) {
      const existingOrderItem = await user
        .related('orders')
        .query()
        .where('product_id', cartItem.productId)
        .andWhere('user_id', user.id)
        .first()

      if (!existingOrderItem) {
        finalCart.push(cartItem)
      }
    }

    // Add product(s) to the order
    await user.related('orders').createMany(finalCart)

    return response.redirect().back()
  }

  /**
   * Remove a product from the order.
   */
  @bindCart()
  async destroy({ response }: HttpContext, order: Order) {
    await order.delete()

    return response.redirect().back()
  }

  /**
   * Update the quantity of a product in the order.
   */
  @bindCart()
  async update({ request, response }: HttpContext, order: Order) {
    const { quantity } = await request.validateUsing(updateCartValidator)

    if (quantity <= 0) {
      await order.delete()
    } else {
      order.quantity = quantity
      await order.save()
    }

    return response.redirect().toRoute('cart.index')
  }
}
