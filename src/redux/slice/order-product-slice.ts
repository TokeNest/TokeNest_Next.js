import { OrderProduct, OrderProductOptionGroup } from '@/variables/interface/kiosk-interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState: OrderProduct = {
  productId: '',
  productQuantity: 1,
  optionGroupsInfo: [],
}

export const orderProduct = createSlice({
  name: 'orderProduct',
  initialState,
  reducers: {
    setOrderProduct: (_, { payload }: { payload: OrderProduct }) => payload,
    setOrderProductQuantity: (state, { payload }: { payload: boolean }) => {
      if (payload) {
        state.productQuantity = state.productQuantity + 1
      } else if (state.productQuantity > 1) {
        state.productQuantity = state.productQuantity - 1
      }
    },
    setOrderProductOptionIds: (state, { payload }: { payload: OrderProductOptionGroup }) => {
      const index = state.optionGroupsInfo.findIndex(
        (optionGroupsInfo) => optionGroupsInfo.optionGroupId === payload.optionGroupId
      )
      if (index !== -1) {
        state.optionGroupsInfo[index].optionIds = payload.optionIds
      }
    },
  },
})

export const { setOrderProduct, setOrderProductQuantity, setOrderProductOptionIds } =
  orderProduct.actions
export default orderProduct.reducer
