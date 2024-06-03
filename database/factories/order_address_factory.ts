import factory from '@adonisjs/lucid/factories'
import OrderAddress from '#models/order_address'

export const OrderAddressFactory = factory
  .define(OrderAddress, async ({ faker }) => {
    return {}
  })
  .build()