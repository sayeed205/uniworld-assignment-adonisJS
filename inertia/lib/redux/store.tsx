import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cart_slice'

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
})

const unsubscribe = store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart.items))
})

unsubscribe()

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
