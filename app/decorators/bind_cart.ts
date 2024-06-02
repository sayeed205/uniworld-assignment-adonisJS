import { HttpContext } from '@adonisjs/core/http'

const bindCart = () => (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value

  descriptor.value = async function (this: any, ctx: HttpContext) {
    const { auth, response } = ctx

    if (!auth.user) return response.unauthorized({ success: false, message: 'Unauthorized' })

    const cartId = ctx.params.id
    try {
      const cart = await auth.user.related('carts').query().where('id', cartId).first()

      if (!cart) return response.notFound({ success: false, message: 'Cart not found' })

      return await originalMethod.call(this, ctx, cart)
    } catch (error) {
      return response.badRequest({ success: false, errors: error.messages || 'Cart not found' })
    }
  }

  return descriptor
}

export default bindCart
