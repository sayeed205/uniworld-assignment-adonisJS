import User from '#models/user'
import { OrderStatus } from './enums/order_enums.js'

const getUserCart = async (user: User) => {
  const cart = (
    await user?.related('orders').query().where('status', OrderStatus.CART).preload('product')
  )?.map((el) => {
    const cart = el.serialize()
    return {
      id: cart.product.id,
      name: cart.product.name,
      price: cart.product.price,
      category: cart.product.category,
      quantity: cart.quantity,
      orderId: cart.id,
    }
  })

  return cart
}

export default getUserCart
