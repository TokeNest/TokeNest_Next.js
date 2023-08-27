'use client'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { OptionGroup } from '@/variables/interface/kiosk-interface'
import { calculateTotalPrice } from '@/utils/component/calculate-util'
import { useDispatch } from 'react-redux'
import { setOrderProductQuantity } from '@/redux/slice/order-product-slice'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

export function OrderDetailInfoTotalPrice({
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

export function QuantityButtonGroup() {
  const { productQuantity } = useAppSelector(({ orderProductReducer }) => orderProductReducer)
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
