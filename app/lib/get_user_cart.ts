import User from '#models/user'

const getUserCart = async (user: User) => {
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

  return cart
}

export default getUserCart
