import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CartItem {
  id: string
  name: string
  price: number
  category: string
  quantity: number
  orderId: string | null
}

interface CartItems {
  items: CartItem[]
}

const initialState: CartItems = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToLocalCart(state, action: PayloadAction<CartItem>) {
      // check if item already exists in cart if so do nothing
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id)
      if (itemIndex !== -1) {
        return
      }

      state.items.push(action.payload)

      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeFromLocalCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload)

      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload)
      state.items[itemIndex].quantity += 1

      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload)
      state.items[itemIndex].quantity -= 1

      if (state.items[itemIndex].quantity === 0) {
        state.items = state.items.filter((item) => item.id !== action.payload)
      }

      localStorage.setItem('cart', JSON.stringify(state.items))
    },

    setInitialState(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload
    },
  },
})

export const {
  addToLocalCart,
  removeFromLocalCart,
  increaseQuantity,
  decreaseQuantity,
  setInitialState,
} = cartSlice.actions

export default cartSlice
