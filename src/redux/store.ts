import { configureStore } from '@reduxjs/toolkit'
import drawerReducer from './slice/drawer-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    drawerReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
