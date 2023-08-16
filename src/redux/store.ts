import { configureStore } from '@reduxjs/toolkit'
import marketReducer from './slice/market-slice'
import cartReducer from './slice/cart-slice'
import orderInfoReducer from './slice/order-info-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    marketReducer,
    orderInfoReducer,
    cartReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
