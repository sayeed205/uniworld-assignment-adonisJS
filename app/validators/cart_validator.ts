import vine from '@vinejs/vine'

const cartValidator = vine.object({
  productId: vine.string().uuid(),
  quantity: vine.number().positive(),
})

export const addToCartValidator = vine.compile(
  vine.object({
    cartItems: vine.array(cartValidator),
  })
)

export const updateCartValidator = vine.compile(
  vine.object({
    quantity: vine.number(),
  })
)
