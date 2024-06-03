import getUserCart from '#lib/get_user_cart'
import { createAddressValidator } from '#validators/address_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserAddressesController {
  public async index({ inertia, auth }: HttpContext) {
    const user = auth.user!
    const cart = await getUserCart(user)

    const addresses = (await user.related('addresses').query()).map(
      (address) =>
        address.serialize() as {
          id: string
          name: string
          addressLine1: string
          addressLine2: string
          city: string
          state: string
          postalCode: number
          country: string
          phone: string
        }
    )

    return inertia.render('addresses/index', { user, cart, addresses })
  }

  public async create({ inertia, auth }: HttpContext) {
    const user = auth.user!

    const cart = await getUserCart(user)

    const countries = (await fetch(
      'https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json'
    ).then((res) => res.json())) as { name: string; code: string; dial_code: string }[]

    return inertia.render('addresses/create', { user, cart, countries })
  }

  public async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(createAddressValidator)

    await user.related('addresses').create(payload)

    response.redirect().toRoute('address.index')
  }

  public async edit({ response }: HttpContext) {
    // todo))
    return response.redirect().toRoute('address.index')
  }

  public async update({ response }: HttpContext) {
    // todo))
    response.redirect().toRoute('address.index')
  }

  public async destroy({ response }: HttpContext) {
    // todo))
    response.redirect().toRoute('address.index')
  }
}
