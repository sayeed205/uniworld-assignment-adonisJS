import User from '#models/user'

const getUserAddresses = async (user: User) => {
  const addresses = (await user.related('addresses').query()).map((address) => {
    return {
      id: address.id,
      name: address.name,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.postalCode,
      phone: address.phone,
    }
  })
  return addresses
}

export default getUserAddresses
