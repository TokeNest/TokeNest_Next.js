'use client'
import { CardContent, List, Paper } from '@mui/material'
import * as React from 'react'
import { useAppSelector } from '@/redux/store'
import { useProductsContext } from '@/app/kiosk/products-provider'
import Typography from '@mui/material/Typography'
import { CartItemTotalPrice } from '@/app/kiosk/_components/drawer/cart/interaction'
import {
  KioskCartPriceProvider,
  KioskListProvider,
} from '@/app/kiosk/_components/drawer/cart/provider'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'
import KioskListItem from '../../_components/drawer/cart/KioskListItem'

export default function KioskCartPage() {
  const { products } = useProductsContext()
  const basket = useAppSelector(({ cartReducer }) => cartReducer.basket)
  const productOrderList = basket.map((orderProduct) => ({
    orderProduct,
    product: products.find(({ id }) => orderProduct.productId === id) as ProductInfoClient,
  }))

  return (
    <KioskCartPriceProvider>
      <CardContent
        sx={{
          height: 8 / 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <List sx={{ overflow: 'auto' }}>
          {productOrderList.map(({ orderProduct, product }, i) => (
            <KioskListProvider key={i}>
              <KioskListItem product={product} orderProduct={orderProduct} orderProductIndex={i} />
            </KioskListProvider>
          ))}
        </List>
        <Paper
          sx={{
            height: 100,
            minHeight: 100,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            결제금액
          </Typography>
          <CartItemTotalPrice />
        </Paper>
      </CardContent>
    </KioskCartPriceProvider>
  )
}
