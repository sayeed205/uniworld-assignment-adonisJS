import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import { errors as validationErrors } from '@vinejs/vine'

import Product from '#models/product'

const bindProduct = () => (_target: any, _key: any, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value

  descriptor.value = async function (this: any, ctx: HttpContext) {
    const { params, inertia, request } = ctx
    const productSlugOrId =
      params.productSlugOrId || request.input('productSlugOrId') || request.all().productSlugOrId
    if (!productSlugOrId) {
      throw new validationErrors.E_VALIDATION_ERROR('Product ID or slug is required.')
    }
    try {
      const product = await Product.getProductBySlugOrId(productSlugOrId)
      if (!product) {
        return inertia.render('errors/404', { message: 'Product not found' })
      }
      return await originalMethod.call(this, ctx, product)
    } catch (error) {
      logger.error(error, 'Failed to bind product.')
      return inertia.render('errors/500', { message: 'Some internal error' })
    }
  }
  return descriptor
}

export default bindProduct
