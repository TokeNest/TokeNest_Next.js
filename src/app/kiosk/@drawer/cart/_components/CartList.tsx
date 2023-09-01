'use client'
import { KioskListProvider } from '@/app/kiosk/@drawer/cart/_components/provider'
import KioskListItem from '@/app/kiosk/@drawer/cart/_components/KioskListItem'
import * as React from 'react'
import { useAppSelector } from '@/redux/store'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'

export default function CartList({ products }: { products: ProductInfoClient[] }) {
  const basket = useAppSelector(({ cartReducer }) => cartReducer.basket)
  const productOrderList = basket.map((orderProduct) => ({
    orderProduct,
    product: products.find(({ id }) => orderProduct.productId === id) as ProductInfoClient,
  }))
  return productOrderList.map(({ orderProduct, product }, i) => (
    <KioskListProvider key={i}>
      <KioskListItem product={product} orderProduct={orderProduct} orderProductIndex={i} />
    </KioskListProvider>
  ))
}
