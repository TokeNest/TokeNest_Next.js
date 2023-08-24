import { createSlice } from '@reduxjs/toolkit'
import { OrderProduct } from '@/variables/interface/kiosk-interface'

interface CartState {
  basket: OrderProduct[]
}

const initialState: CartState = {
  basket: [],
}
export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartBasket: (state, { payload }: { payload: OrderProduct }) => {
      state.basket = [...state.basket, payload]
    },
    clearCartBasket: (state) => {
      state.basket = []
    },
  },
})

export const { addCartBasket, clearCartBasket } = cart.actions
export default cart.reducer
