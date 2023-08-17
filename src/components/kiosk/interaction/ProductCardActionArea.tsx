'use client'
import CardActionArea from '@mui/material/CardActionArea'
import { setOptionsState } from '@/redux/slice/order-info-slice'
import { setDefaultOptionsPrice } from '@/utils/calculate-util'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import React from 'react'
import { Product } from '@/variables/interface/kiosk-interface'

export default function ProductCardActionArea({
  children,
  product,
}: {
  children: React.ReactNode
  product: Product
}) {
  const dispatch = useDispatch<AppDispatch>()
  const { setIsShowDrawer, setProduct } = useDrawerContext()
  const clickEvent = () => {
    dispatch(setOptionsState(setDefaultOptionsPrice(product)))
    setProduct(product)
    setIsShowDrawer(true)
  }
  return (
    <CardActionArea onClick={clickEvent} onDragStart={(e) => e.preventDefault()}>
      {children}
    </CardActionArea>
  )
}
