'use client'
import CardActionArea from '@mui/material/CardActionArea'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import React from 'react'
import { Product } from '@/variables/interface/kiosk-interface'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { convertOrderProduct } from '@/utils/component/redux-util'
import { setOrderProduct } from '@/redux/slice/order-product-slice'
import { DRAWER_TYPE } from '@/variables/enum/kiosk-enum'

export default function ProductCardActionArea({
  children,
  product,
}: {
  children: React.ReactNode
  product: Product
}) {
  const dispatch = useDispatch<AppDispatch>()
  const { setDrawerState, setProduct } = useDrawerContext()
  const clickEvent = () => {
    setProduct(product)
    setDrawerState({ isShow: true, type: DRAWER_TYPE.ORDER })
    dispatch(setOrderProduct(convertOrderProduct(product)))
  }
  return (
    <CardActionArea onClick={clickEvent} onDragStart={(e) => e.preventDefault()}>
      {children}
    </CardActionArea>
  )
}
