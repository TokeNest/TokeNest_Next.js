'use client'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { CardActions } from '@mui/material'
import React from 'react'
import { addCartBasket } from '@/redux/slice/cart-slice'

export default function KioskOrderFooterCardActions({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const { setIsShowDrawer } = useDrawerContext()
  const orderProduct = useAppSelector(({ orderProductReducer }) => orderProductReducer)
  const handleAddCartBasket = () => {
    dispatch(addCartBasket(orderProduct))
    setIsShowDrawer(false)
  }
  return (
    <CardActions
      sx={{
        height: 96,
        alignItems: 'stretch',
      }}
      onClick={handleAddCartBasket}
    >
      {children}
    </CardActions>
  )
}
