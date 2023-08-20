'use client'
import Typography from '@mui/material/Typography'
import { CardHeader } from '@mui/material'
import * as React from 'react'
import { useCallback } from 'react'
import { Product } from '@/variables/interface/kiosk-interface'
import { getCurrentPrice } from '@/utils/calculate-util'
import { useAppSelector } from '@/redux/store'

export default function ProductCardHeader({
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
