import { CardContent, List, Paper } from '@mui/material'
import * as React from 'react'
import KioskListItem from './KioskListItem'
import { useAppSelector } from '@/redux/store'
import { useProductsContext } from '@/app/kiosk/products-provider'
import { Product } from '@/variables/interface/kiosk-interface'
import Typography from '@mui/material/Typography'
import { CartItemTotalPrice } from '@/components/kiosk/KioskDrawer/cart/interaction'
import {
  KioskCartPriceProvider,
  KioskListProvider,
} from '@/components/kiosk/KioskDrawer/cart/provider'

export default function KioskCartBody() {
  const { products } = useProductsContext()
  const { basket } = useAppSelector(({ cartReducer }) => cartReducer)
  const productOrderList = basket.map(({ productId: id, optionGroupsInfo, productQuantity }) => ({
    productQuantity,
    optionGroupsInfo,
    product: products.find(({ productId }) => productId === id) as Product,
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
          {productOrderList.map(({ product, productQuantity, optionGroupsInfo }, i) => (
            <KioskListProvider key={i}>
              <KioskListItem
                product={product}
                productQuantity={productQuantity}
                optionGroupsInfo={optionGroupsInfo}
              />
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
