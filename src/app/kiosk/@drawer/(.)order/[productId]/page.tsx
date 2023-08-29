import { ProductInfoClient } from '@/variables/interface/api/product-interface'
import { nextFetcher } from '@/utils/component/api-fetcher-util'
import { Paper } from '@mui/material'
import OrderDetailInfo from '@/app/kiosk/_components/drawer/order/OrderDetailInfo'
import OrderOptionGroups from '@/app/kiosk/_components/drawer/order/OrderOptionGroups'
import * as React from 'react'

const getProductInfo = async (productId: string): Promise<ProductInfoClient> => {
  const data = await nextFetcher(`product/${productId}`, { cache: 'no-store' })
  return data.body
}

const productInfoHeight = 400
export default async function KioskDrawerOrder({
  params: { productId },
}: {
  params: { productId: string }
}) {
  const product = await getProductInfo(productId)
  return (
    <>
      <OrderDetailInfo product={product} productInfoHeight={productInfoHeight} />
      <Paper elevation={0} sx={{ height: `calc(100% - ${productInfoHeight}px)`, overflow: 'auto' }}>
        <OrderOptionGroups product={product} />
      </Paper>
    </>
  )
}
