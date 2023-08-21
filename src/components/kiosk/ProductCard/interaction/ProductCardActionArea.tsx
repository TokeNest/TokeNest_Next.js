'use component'
import CardActionArea from '@mui/material/CardActionArea'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import React from 'react'
import { Product } from '@/variables/interface/kiosk-interface'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { convertOrderProduct } from '@/utils/component/redux-util'
import { setOrderProduct } from '@/redux/slice/order-product-slice'

export default function ProductCardActionArea({
  children,
  product,
}: {
  children: React.ReactNode
  product: Product
}) {
  const dispatch = useDispatch<AppDispatch>()
  const { setIsShowDrawer, setProduct } = useDrawerContext()
  const clickEvent = () => {
    setProduct(product)
    setIsShowDrawer(true)
    dispatch(setOrderProduct(convertOrderProduct(product)))
  }
  return (
    <CardActionArea onClick={clickEvent} onDragStart={(e) => e.preventDefault()}>
      {children}
    </CardActionArea>
  )
}
