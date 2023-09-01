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
      const index = state.basket.findIndex(
        (orderProduct) =>
          orderProduct.productId === payload.productId &&
          JSON.stringify(orderProduct.optionGroupsInfo) === JSON.stringify(payload.optionGroupsInfo)
      )
      if (index === -1) {
        state.basket = [...state.basket, payload]
      } else {
        state.basket[index].productQuantity += payload.productQuantity
      }
    },
    setCartProductQuantity: (
      state,
      { payload }: { payload: { isPlus: boolean; orderProductIndex: number } }
    ) => {
      state.basket[payload.orderProductIndex].productQuantity += payload.isPlus ? 1 : -1
      if (state.basket[payload.orderProductIndex].productQuantity <= 0) {
        state.basket = state.basket.filter((_, i) => i !== payload.orderProductIndex)
      }
    },
    clearCartBasket: (state) => {
      state.basket = []
    },
  },
})

export const { addCartBasket, clearCartBasket, setCartProductQuantity } = cart.actions
export default cart.reducer
