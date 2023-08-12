import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/variables/interface/kiosk'

interface DrawerState {
  isShow: boolean
  data: null | Product
}
const initialState = {
  value: { isShow: false, data: null } as DrawerState,
}
export const drawer = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setDrawerStatus: (_, action: PayloadAction<DrawerState>) => ({
      value: {
        isShow: action.payload.isShow,
        data: action.payload.data,
      },
    }),
    closeDrawer: () => initialState,
  },
})
export const { setDrawerStatus, closeDrawer } = drawer.actions
export default drawer.reducer
