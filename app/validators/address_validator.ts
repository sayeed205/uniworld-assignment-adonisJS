import vine from '@vinejs/vine'

export const createAddressValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    addressLine1: vine.string().trim().minLength(3).maxLength(255),
    addressLine2: vine.string().trim().minLength(3).maxLength(255).optional(),
    city: vine.string().trim().minLength(3).maxLength(255),
    state: vine.string().trim().minLength(3).maxLength(255),
    postalCode: vine.number().positive(),
    country: vine.string().trim().minLength(3).maxLength(255),
    phone: vine.string().trim().minLength(3).maxLength(255),
  })
)
