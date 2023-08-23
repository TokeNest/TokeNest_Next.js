import { CardContent, List } from '@mui/material'
import * as React from 'react'
import KioskListItem from './KioskListItem'
import KioskListProvider from '@/components/kiosk/KioskDrawer/cart/KioskListProvider'
import { useAppSelector } from '@/redux/store'
import { useProductsContext } from '@/app/kiosk/products-provider'
import { Product } from '@/variables/interface/kiosk-interface'

export default function KioskCartBody() {
  const { products } = useProductsContext()
  const { basket } = useAppSelector(({ cartReducer }) => cartReducer)
  const productOrderList = basket.map(({ productId: id, optionGroupsInfo, productQuantity }) => ({
    productQuantity,
    optionGroupsInfo,
    product: products.find(({ productId }) => productId === id) as Product,
  }))
  return (
    <CardContent sx={{ height: 8 / 10 }}>
      <List>
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
    </CardContent>
  )
}
