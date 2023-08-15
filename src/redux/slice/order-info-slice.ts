import { createSlice } from '@reduxjs/toolkit'

interface OptionState {
  optionGroupId: number
  totalPrice: number
}
interface ProductOrderState {
  productQuantity: number
  optionsState: OptionState[]
}

const initialState: ProductOrderState = { productQuantity: 1, optionsState: [] }

export const orderInfo = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    plusProductQuantity: (state) => {
      state.productQuantity += 1
    },
    minusProductQuantity: (state) => {
      if (state.productQuantity > 1) {
        state.productQuantity -= 1
      }
    },
    setOptionsState: (state, { payload }) => {
      state.optionsState = payload
    },
    updateOptionsState: (
      state,
      { payload: { optionGroupId, totalPrice } }: { payload: OptionState }
    ) => {
      const index = state.optionsState.findIndex((res) => res.optionGroupId === optionGroupId)
      if (index !== -1) {
        state.optionsState[index].totalPrice = totalPrice
      }
    },
  },
})

export const { plusProductQuantity, minusProductQuantity, setOptionsState, updateOptionsState } =
  orderInfo.actions
export default orderInfo.reducer
