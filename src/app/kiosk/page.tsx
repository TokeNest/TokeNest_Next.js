import React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Unstable_Grid2'
import ProductCard from '@/app/kiosk/_components/productCard/ProductCard'
import { nextFetcher } from '@/utils/component/api-fetcher-util'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'
import ProductListProvide from '@/app/kiosk/_components/ProductListProvide'

const getCategoryList = async (): Promise<ProductInfoClient[]> => {
  const storeId = '64edd8182040a028b03823c4'
  const data = await nextFetcher(`product/store/${storeId}`, { cache: 'no-store' })
  return data.body
}

export default async function KioskPage() {
  const products = await getCategoryList()
  return (
    <Card sx={{ height: 1, bgcolor: 'primary.light', borderRadius: 2 }}>
      <ProductListProvide products={products}>
        <Grid sx={{ p: 2, flexGrow: 1 }} container spacing={4}>
          {products.map((product) => (
            <Grid xs={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </ProductListProvide>
    </Card>
  )
}
