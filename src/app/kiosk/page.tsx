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

const storeId = process.env.storeId as string
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
              <Grid
                spacing={4}
                sx={{ p: 2, flexGrow: 1 }}
                container
                columns={{ xs: 4, sm: 8, md: 12 }}
                key={categoryIndex}
              >
                {products.map((product) => (
                  <Grid
                    xs={2}
                    sm={4}
                    md={4}
                    key={product.id}
                    display="flex"
                    justifyContent="center"
                  >
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
