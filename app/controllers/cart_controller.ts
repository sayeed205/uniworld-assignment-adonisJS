import bindCart from '#decorators/bind_cart'
import Cart from '#models/cart'
import { addToCartValidator, updateCartValidator } from '#validators/cart_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class CartController {
  /**
   * Display a listing of the cart items.
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

    return inertia.render('cart/index', { user: user?.serialize(), cart })
  }

  /**
   * Add product(s) to the cart.
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
      const existingCartItem = await user
        .related('carts')
        .query()
        .where('product_id', cartItem.productId)
        .andWhere('user_id', user.id)
        .first()

      if (!existingCartItem) {
        finalCart.push(cartItem)
      }
    }

    // Add product(s) to the cart
    await user.related('carts').createMany(finalCart)

    return response.redirect().back()
  }

  /**
   * Remove a product from the cart.
   */
  @bindCart()
  async destroy({ response }: HttpContext, cart: Cart) {
    await cart.delete()

    return response.redirect().back()
  }

  /**
   * Update the quantity of a product in the cart.
   */
  @bindCart()
  async update({ request, response }: HttpContext, cart: Cart) {
    const { quantity } = await request.validateUsing(updateCartValidator)

    if (quantity <= 0) {
      await cart.delete()
    } else {
      cart.quantity = quantity
      await cart.save()
    }

    return response.redirect().toRoute('cart.index')
  }
}
