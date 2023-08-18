import { createSlice } from '@reduxjs/toolkit'

interface CartState {
  basket: any[]
}

const initialState: CartState = {
  basket: [],
}
export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartBasket: (state, { payload }) => {
      state.basket = [...state.basket, payload]
    },
  },
})

export const { addCartBasket } = cart.actions
export default cart.reducer
