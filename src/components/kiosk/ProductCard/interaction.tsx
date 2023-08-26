'use client'
import Typography from '@mui/material/Typography'
import { CardHeader } from '@mui/material'
import * as React from 'react'
import { useCallback } from 'react'
import { Product } from '@/variables/interface/kiosk-interface'
import { getCurrentPrice } from '@/utils/component/calculate-util'
import { AppDispatch, useAppSelector } from '@/redux/store'
import CardActionArea from '@mui/material/CardActionArea'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { useDispatch } from 'react-redux'
import { convertOrderProduct } from '@/utils/component/redux-util'
import { setOrderProduct } from '@/redux/slice/order-product-slice'
import { DRAWER_TYPE } from '@/variables/enum/kiosk-enum'

export function ProductCardActionArea({
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

export function ProductCardHeader({
  product: { productPrice, optionGroups, productName },
}: {
  product: Product
}) {
  const { marketList } = useAppSelector(({ marketReducer }) => marketReducer)
  const getCurrentOptionPrice = useCallback(
    () => getCurrentPrice(optionGroups, marketList),
    [optionGroups, marketList]
  )
  const currentPrice = productPrice + getCurrentOptionPrice()

  return (
    <CardHeader
      sx={{ px: 1, py: 0 }}
      title={productName}
      subheader={<Typography sx={{ textAlign: 'right' }}>{currentPrice.toFixed(0)}</Typography>}
    />
  )
}
