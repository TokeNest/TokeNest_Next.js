'use client'
import * as React from 'react'
import { useEffect } from 'react'
import { Collapse, IconButton } from '@mui/material'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { useKioskListContext } from '@/app/kiosk/@drawer/cart/_components/provider'
import Typography from '@mui/material/Typography'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import PriceNumberFormat from '@/components/input/PriceNumberFormat'
import {
  deleteCartTotalPrice,
  setCartProductQuantity,
  setCartTotalPrice,
} from '@/redux/slice/cart-slice'
import { ProductOptionInfoClient } from '@/variables/interface/api/product-option-interface'
import { setCalculateOptionPrice } from '@/utils/component/calculate-util'

export function OpenDetailInfoBtn() {
  const { open, setOpen } = useKioskListContext()
  return (
    <IconButton edge="end" aria-label="open" onClick={() => setOpen(!open)}>
      <KeyboardArrowDown
        sx={{
          transform: `rotate(${open ? 180 : 0}deg)`,
          transition: '0.2s',
        }}
      />
    </IconButton>
  )
}

export function ListItemDetailInfo({ children }: { children: React.ReactNode }) {
  const { open } = useKioskListContext()
  return (
    <Collapse
      in={open}
      timeout="auto"
      unmountOnExit
      sx={{ '& .MuiCollapse-wrapperInner': { display: 'flex' } }}
    >
      {children}
    </Collapse>
  )
}

export function ListItemCalculatePrice({
  quantity,
  productPrice,
  options,
  orderProductIndex,
}: {
  quantity: number
  productPrice: number
  options: ProductOptionInfoClient[]
  orderProductIndex: number
}) {
  const dispatch = useDispatch<AppDispatch>()
  const marketList = useAppSelector(({ marketReducer }) => marketReducer.marketList)
  const totalPrice =
    options.reduce(
      (pre, { productOptionPrice, token, tokenRatio }) =>
        pre + setCalculateOptionPrice(marketList, productOptionPrice, token, tokenRatio),
      productPrice
    ) * quantity
  useEffect(() => {
    dispatch(setCartTotalPrice({ index: orderProductIndex, totalPrice }))
  }, [dispatch, orderProductIndex, quantity, totalPrice])
  useEffect(() => {
    return () => {
      dispatch(deleteCartTotalPrice(orderProductIndex))
    }
  }, [dispatch, orderProductIndex])
  return (
    <Typography variant="h4" align="right" fontWeight="bold">
      <PriceNumberFormat price={totalPrice} />
    </Typography>
  )
}

export function CartItemTotalPrice() {
  const orderProductsPrice = useAppSelector(({ cartReducer }) => cartReducer.orderProductsPrice)
  const totalPrice = orderProductsPrice.reduce((pre, { totalPrice }) => pre + totalPrice, 0)
  return (
    <Typography variant="h4" fontWeight="bold">
      <PriceNumberFormat price={totalPrice} />
    </Typography>
  )
}

export function QuantityButtonGroup({ orderProductIndex }: { orderProductIndex: number }) {
  const dispatch = useDispatch<AppDispatch>()
  const handleQuantity = (isPlus: boolean) =>
    dispatch(setCartProductQuantity({ isPlus, orderProductIndex }))

  return (
    <>
      <Button startIcon={<AddIcon />} sx={{ height: 1 / 2 }} onClick={() => handleQuantity(true)}>
        더하기
      </Button>
      <Button
        startIcon={<RemoveIcon />}
        sx={{ height: 1 / 2 }}
        onClick={() => handleQuantity(false)}
      >
        빼기
      </Button>
    </>
  )
}
