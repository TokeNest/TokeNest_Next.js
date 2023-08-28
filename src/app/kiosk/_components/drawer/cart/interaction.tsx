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
import { Option } from '@/variables/interface/kiosk-interface'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getOptionMarketPrice } from '@/utils/component/calculate-util'
import { useDispatch } from 'react-redux'
import { setOrderProductQuantity } from '@/redux/slice/order-product-slice'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

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
  options: Option[]
}) {
  const { setTotalPrice } = useKioskCartPriceContext()
  const { marketList } = useAppSelector(({ marketReducer }) => marketReducer)
  const totalPrice =
    options.reduce(
      (pre, { optionPrice, tokenOption }) =>
        pre + getOptionMarketPrice(optionPrice, tokenOption, marketList),
      productPrice
    ) * quantity

  useEffect(() => {
    setTotalPrice((state) => state + totalPrice)
  }, [setTotalPrice, totalPrice])

  return (
    <Typography variant="h4" align="right" fontWeight="bold">
      {totalPrice.toFixed(0)}원
    </Typography>
  )
}

export function CartItemTotalPrice({}: {}) {
  const { totalPrice } = useKioskCartPriceContext()
  return (
    <Typography variant="h4" fontWeight="bold">
      {totalPrice.toFixed(0)}원
    </Typography>
  )
}

export function QuantityButtonGroup() {
  const dispatch = useDispatch<AppDispatch>()
  const handleQuantity = (isPlus: boolean) => dispatch(setOrderProductQuantity(isPlus))

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
