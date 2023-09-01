'use client'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { calculateTotalPrice } from '@/utils/component/calculate-util'
import { useDispatch } from 'react-redux'
import { setOrderProductQuantity } from '@/redux/slice/order-product-slice'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { ProductOptionGroupInfoClient } from '@/variables/interface/api/product-option-group-interface'
import PriceNumberFormat from '@/components/input/PriceNumberFormat'

export function OrderDetailInfoTotalPrice({
  optionGroups,
  productPrice,
}: {
  optionGroups: ProductOptionGroupInfoClient[]
  productPrice: number
}) {
  const marketList = useAppSelector(({ marketReducer }) => marketReducer.marketList)
  const optionGroupsInfo = useAppSelector(
    ({ orderProductReducer }) => orderProductReducer.optionGroupsInfo
  )
  const productQuantity = useAppSelector(
    ({ orderProductReducer }) => orderProductReducer.productQuantity
  )

  const currentPrice =
    calculateTotalPrice(productPrice, optionGroupsInfo, optionGroups, marketList) * productQuantity
  return (
    <Typography align="right" variant="h4" sx={{ color: 'text.secondary' }}>
      <PriceNumberFormat price={currentPrice} />
    </Typography>
  )
}

export function QuantityButtonGroup() {
  const productQuantity = useAppSelector(
    ({ orderProductReducer }) => orderProductReducer.productQuantity
  )
  const dispatch = useDispatch<AppDispatch>()
  const handleQuantity = (isPlus: boolean) => dispatch(setOrderProductQuantity(isPlus))

  return (
    <>
      <Button startIcon={<AddIcon />} onClick={() => handleQuantity(true)}>
        더하기
      </Button>
      <Button disableRipple sx={{ px: 4 }}>
        {productQuantity}
      </Button>
      <Button endIcon={<RemoveIcon />} onClick={() => handleQuantity(false)}>
        빼기
      </Button>
    </>
  )
}
