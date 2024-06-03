import { HttpContext } from '@adonisjs/core/http'

import { OrderStatus } from '#lib/enums/order_enums'
import getUserAddresses from '#lib/get_user_addresses'
import getUserCart from '#lib/get_user_cart'
import getUserOrders from '#lib/get_user_orders'
import Order from '#models/order'
import OrderAddress from '#models/order_address'
import UserAddress from '#models/user_address'
import { createOrderValidator } from '#validators/order_validator'

export default class OrdersController {
  /**
   * Display all the orders of the user.
   */
  async index({ inertia, auth }: HttpContext) {
    const user = auth.user!

    const cart = await getUserCart(user)

    const orders = (await getUserOrders(user)).map((order) => order.serialize())

    return inertia.render('order/index', { user: user?.serialize(), cart, orders })
  }

  /**
   * Add product(s) to the order.
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user

    const { addressId } = await request.validateUsing(createOrderValidator)

    if (!user) {
      return response.redirect('/login')
    }

    const cart = await getUserCart(user)

    // create order address
    const userAddress = await UserAddress.findOrFail(addressId)

    const orderAddress = await OrderAddress.create({
      name: userAddress.name,
      addressLine1: userAddress.addressLine1,
      addressLine2: userAddress.addressLine2,
      city: userAddress.city,
      state: userAddress.state,
      postalCode: userAddress.postalCode,
      country: userAddress.country,
      phone: userAddress.phone,
    })

    const cartAsOrder = cart.map((item) => {
      return {
        id: item.orderId,
        status: OrderStatus.PLACED,
        orderAddressId: orderAddress.id,
      }
    })

    // Update the order
    await Order.updateOrCreateMany('id', cartAsOrder)

    // create

    return response.redirect().toRoute('orders.index')
  }

  /**
   * Check out the order.
   */
  async create({ inertia, auth, response }: HttpContext) {
    const user = auth.user!

    const cart = await getUserCart(user)

    if (!cart.length) {
      return response.redirect('/cart')
    }

    const addresses = await getUserAddresses(user)

    return inertia.render('order/create', { user: user?.serialize(), cart, addresses })
  }
}
