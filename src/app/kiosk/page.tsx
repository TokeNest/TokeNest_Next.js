import React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Unstable_Grid2'
import ProductCard from '@/app/kiosk/_components/productCard/ProductCard'
import { nextFetcher } from '@/utils/component/api-fetcher-util'
import CategoryTabContext from '@/app/kiosk/_components/category/CategoryTabContext'
import { CategoryInfoClient } from '@/variables/interface/api/category-interface'
import { CardContent } from '@mui/material'
import CategoryProvider from '@/app/kiosk/_components/category/CategoryProvider'
import CategoryTabPanel from '@/app/kiosk/_components/category/CategoryTabPanel'

const storeId = '64f33895bab8fbcc6cdf194d'
const getCategoryList = async (): Promise<CategoryInfoClient[]> => {
  const data = await nextFetcher(`kiosk/${storeId}`, { cache: 'no-store' })
  return data.body
}

export default async function KioskPage() {
  const categories = await getCategoryList()
  return (
    <Card sx={{ height: 1, bgcolor: 'primary.main', borderRadius: 4 }}>
      <CategoryProvider>
        <CategoryTabContext categories={categories.map(({ category }) => category)} />
        <CardContent sx={{ px: 4 }}>
          {categories.map(({ products }, categoryIndex) => (
            <CategoryTabPanel index={categoryIndex} key={categoryIndex}>
              <Grid sx={{ p: 2, flexGrow: 1 }} container spacing={4} key={categoryIndex}>
                {products.map((product) => (
                  <Grid xs={3} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </CategoryTabPanel>
          ))}
        </CardContent>
      </CategoryProvider>
    </Card>
  )
}
