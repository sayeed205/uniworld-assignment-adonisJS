import { CartItem } from '@/redux/cart_slice'
import { router } from '@inertiajs/react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function updateCartFromLocalStorageToServer() {
  const localCart = localStorage.getItem('cart')
  if (localCart) {
    const parsedCart = JSON.parse(localCart) as CartItem[]
    if (!parsedCart.length) return
    const cartItems = parsedCart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }))

    await router.post('/cart', { cartItems })

    localStorage.removeItem('cart')
  }
}

export async function updateCart(id: string, quantity: number) {
  await router.put(`/cart/${id}`, { quantity }, { preserveScroll: true })
}

export async function removeFromCart(id: string) {
  await router.delete(`/cart/${id}`, { preserveScroll: true })
}

export async function addToCart(cartItems: { productId: string; quantity: number }[]) {
  await router.post('/cart', { cartItems }, { preserveScroll: true })
}
