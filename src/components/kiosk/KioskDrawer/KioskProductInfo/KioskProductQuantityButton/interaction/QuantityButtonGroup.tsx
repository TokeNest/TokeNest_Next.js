'use client'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import * as React from 'react'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { setOrderProductQuantity } from '@/redux/slice/order-product-slice'

export default function QuantityButtonGroup() {
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
