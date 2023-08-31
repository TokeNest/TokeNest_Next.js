'use client'
import * as React from 'react'
import { useEffect } from 'react'
import { Collapse, IconButton } from '@mui/material'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import {
  useKioskCartPriceContext,
  useKioskListContext,
} from '@/app/kiosk/_components/drawer/cart/provider'
import Typography from '@mui/material/Typography'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { setCalculateOptionPrice } from '@/utils/component/calculate-util'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { ProductOptionInfoClient } from '@/variables/interface/api/product-option-interface'
import PriceNumberFormat from '@/components/input/PriceNumberFormat'
import { setCartProductQuantity } from '@/redux/slice/cart-slice'

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
}: {
  quantity: number
  productPrice: number
  options: ProductOptionInfoClient[]
}) {
  const { setTotalPrice } = useKioskCartPriceContext()
  const marketList = useAppSelector(({ marketReducer }) => marketReducer.marketList)
  const totalPrice =
    options.reduce(
      (pre, { productOptionPrice, token, tokenRatio }) =>
        pre + setCalculateOptionPrice(marketList, productOptionPrice, token, tokenRatio),
      productPrice
    ) * quantity

  useEffect(() => {
    setTotalPrice((state) => state + totalPrice)
  }, [setTotalPrice, totalPrice])

  return (
    <Typography variant="h4" align="right" fontWeight="bold">
      <PriceNumberFormat price={totalPrice} />
    </Typography>
  )
}

export function CartItemTotalPrice() {
  const { totalPrice } = useKioskCartPriceContext()
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
