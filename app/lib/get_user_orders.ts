import User from '#models/user'

const getUserOrders = async (user: User) => {
  const data = await user?.related('orders').query().preload('product').preload('address')

  return data
}

export default getUserOrders
