import React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Unstable_Grid2'
import { Category } from '@/variables/interface/kiosk-interface'
import ProductCard from '@/app/kiosk/_components/productCard/ProductCard'
import ProductContainer from '@/app/kiosk/ProductContainer'
import { nextFetcher } from '@/utils/component/api-fetcher-util'
import KioskDrawer from '@/app/kiosk/_components/drawer/KioskDrawer'

const getCategoryList = async (): Promise<Category[]> => {
  const storeId = '64e9b9d623373bbc4a1ab263'
  const data = await nextFetcher(`kiosk/${storeId}`, {
    cache: 'no-store',
  })
  return await data.body
}

export default async function KioskPage({
  searchParams,
}: {
  searchParams: Record<string, string> | null | undefined
}) {
  const drawerType = searchParams?.drawer
  const category = await getCategoryList()
  const { products } = category[0]
  return (
    <>
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
      <KioskDrawer drawerType={drawerType} />
    </>
  )
}
