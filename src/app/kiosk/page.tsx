import React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Unstable_Grid2'
import { Category } from '@/variables/interface/kiosk-interface'
import ProductCard from '@/components/kiosk/ProductCard/ProductCard'
import ProductContainer from '@/app/kiosk/ProductContainer'
import { nextFetcher } from '@/utils/component/api-fetcher-util'

const getCategoryList = async (): Promise<Category[]> => {
  const storeId = '64e97a11e807a956dff77f94'
  const data = await nextFetcher(`kiosk/${storeId}`, {
    cache: 'no-store',
  })
  return await data.json()
}

export default async function KioskPage() {
  const category = await getCategoryList()
  const { products } = category[0]
  return (
    <Card sx={{ height: 1, bgcolor: 'primary.light', borderRadius: 2 }}>
      <ProductContainer products={products}>
        <Grid sx={{ p: 2, flexGrow: 1 }} container spacing={4}>
          {products.map((product) => (
            <Grid xs={3} key={product.productId}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </ProductContainer>
    </Card>
  )
}
