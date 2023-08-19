'use client'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useAppSelector } from '@/redux/store'
import { OptionGroup } from '@/variables/interface/kiosk-interface'
import { calculateTotalPrice } from '@/utils/calculate-util'

export default function ProductDetailInfoTotalPrice({
  optionGroups,
  productPrice,
}: {
  optionGroups: OptionGroup[]
  productPrice: number
}) {
  const [{ marketList }, { optionGroupsInfo, productQuantity }] = useAppSelector(
    ({ marketReducer, orderProductReducer }) => [marketReducer, orderProductReducer]
  )
  const calculatePrice =
    calculateTotalPrice(productPrice, optionGroupsInfo, optionGroups, marketList) * productQuantity
  return (
    <Typography align="right" variant="h4" sx={{ color: 'text.secondary' }}>
      {calculatePrice.toFixed(0)}
    </Typography>
  )
}
