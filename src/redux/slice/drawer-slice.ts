import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/variables/interface/kiosk'

interface DrawerState {
  product: null | Product
}
const initialState = {
  value: { product: null } as DrawerState,
}
export const drawer = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setDrawerStatus: (_, { payload }: PayloadAction<DrawerState>) => ({
      value: {
        product: payload.product,
      },
    }),
    closeDrawer: () => initialState,
  },
})
export const { setDrawerStatus, closeDrawer } = drawer.actions
export default drawer.reducer
