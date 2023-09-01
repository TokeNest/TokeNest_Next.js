import { createSlice } from '@reduxjs/toolkit'
import { OrderProduct } from '@/variables/interface/kiosk-interface'

type OrderProductPrice = { index: number; totalPrice: number }
interface CartState {
  basket: OrderProduct[]
  orderProductsPrice: OrderProductPrice[]
}

const initialState: CartState = {
  basket: [],
  orderProductsPrice: [],
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
    setCartTotalPrice: (state, { payload }) => {
      const index = state.orderProductsPrice.findIndex((res) => res.index === payload.index)
      if (index !== -1) {
        state.orderProductsPrice[index] = payload
      } else {
        state.orderProductsPrice = [...state.orderProductsPrice, payload]
      }
    },
  },
})

export const { addCartBasket, clearCartBasket, setCartProductQuantity, setCartTotalPrice } =
  cart.actions
export default cart.reducer
