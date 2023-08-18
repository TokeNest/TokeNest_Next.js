'use client'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { setCalculateTotalPrice } from '@/utils/calculate-util'
import { useAppSelector } from '@/redux/store'

export default function ProductDetailInfoTotalPrice({ productPrice }: { productPrice: number }) {
  const { optionsState, productQuantity } = useAppSelector(
    ({ orderInfoReducer }) => orderInfoReducer
  )

  const calculateTotalPrice = setCalculateTotalPrice(optionsState, productPrice, productQuantity)
  return (
    <Typography align="right" variant="h4" sx={{ color: 'text.secondary' }}>
      {calculateTotalPrice.toFixed(0)}
    </Typography>
  )
}
