import factory from '@adonisjs/lucid/factories'
import UserAddress from '#models/user_address'

export const UserAddressFactory = factory
  .define(UserAddress, async ({ faker }) => {
    return {}
  })
  .build()