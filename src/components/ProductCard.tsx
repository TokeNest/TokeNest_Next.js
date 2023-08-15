'use client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea, CardHeader, CardMedia } from '@mui/material'
import { Product } from '@/variables/interface/kiosk-interface'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { setOptionsState } from '@/redux/slice/order-info-slice'
import { setDefaultOptionsPrice, setProductCardPrice } from '@/utils/calculate-util'

export default function ProductCard({ product }: { product: Product }) {
  const { optionGroups, productPrice } = product
  const { marketList } = useAppSelector(({ marketReducer }) => marketReducer)
  const [defaultProductPrice, setDefaultProductPrice] = useState(productPrice)
  const { setIsShowDrawer, setProduct } = useDrawerContext()
  const dispatch = useDispatch<AppDispatch>()
  const clickEvent = () => {
    dispatch(setOptionsState(setDefaultOptionsPrice(product)))
    setProduct(product)
    setIsShowDrawer(true)
  }

  useEffect(() => {
    setDefaultProductPrice(productPrice + setProductCardPrice(optionGroups, marketList))
  }, [optionGroups, marketList, productPrice])

  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 0,
      }}
    >
      <CardActionArea onClick={clickEvent} onDragStart={(e) => e.preventDefault()}>
        <CardMedia
          component="img"
          alt="image"
          image={product.productImageUrl}
          sx={{
            height: 200,
            p: 1,
            borderRadius: 3,
          }}
        />
        <CardHeader
          sx={{
            px: 1,
            py: 0,
          }}
          title={product.productName}
          subheader={
            <Typography
              sx={{
                textAlign: 'right',
              }}
            >
              {defaultProductPrice.toFixed(0)}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            {product.productIntroduction}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
