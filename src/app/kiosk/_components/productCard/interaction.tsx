'use client'
import Typography from '@mui/material/Typography'
import { CardHeader } from '@mui/material'
import * as React from 'react'
import { useCallback } from 'react'
import { getCurrentPrice } from '@/utils/component/calculate-util'
import { AppDispatch, useAppSelector } from '@/redux/store'
import CardActionArea from '@mui/material/CardActionArea'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { useDispatch } from 'react-redux'
import { convertOrderProduct } from '@/utils/component/redux-util'
import { setOrderProduct } from '@/redux/slice/order-product-slice'
import { useRouter } from 'next/navigation'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'
import PriceNumberFormat from '@/components/input/PriceNumberFormat'

export function ProductCardActionArea({
  children,
  product,
}: {
  children: React.ReactNode
  product: ProductInfoClient
}) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { setProduct, setDrawerIsOpen } = useDrawerContext()
  const clickEvent = () => {
    setProduct(product)
    dispatch(setOrderProduct(convertOrderProduct(product)))
    router.push(`kiosk/order/${product.id}`)
    setDrawerIsOpen(true)
  }
  return (
    <CardActionArea onClick={clickEvent} onDragStart={(e) => e.preventDefault()}>
      {children}
    </CardActionArea>
  )
}

export function ProductCardHeader({
  product: { productPrice, productOptionGroups, productName },
}: {
  product: ProductInfoClient
}) {
  const { marketList } = useAppSelector(({ marketReducer }) => marketReducer)
  const getCurrentOptionPrice = useCallback(
    () => getCurrentPrice(productOptionGroups, marketList),
    [productOptionGroups, marketList]
  )
  const currentPrice = productPrice + getCurrentOptionPrice()

  return (
    <CardHeader
      sx={{ px: 1, py: 0 }}
      title={productName}
      subheader={
        <Typography sx={{ textAlign: 'right' }}>
          <PriceNumberFormat price={currentPrice} />
        </Typography>
      }
    />
  )
}
