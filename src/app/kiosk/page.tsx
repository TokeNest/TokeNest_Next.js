import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2'
import { axiosFetcher } from '@/utils/api-fetcher-util'
import { Product } from '@/variables/interface/kiosk-interface'
import ProductCard from '@/components/ProductCard'

export default async function KioskPage() {
  const { data: products }: { data: Product[] } = await axiosFetcher('kiosk')
  return (
    <Card
      sx={{
        height: 1,
        bgcolor: 'primary.light',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ px: 4 }}>
        <Grid sx={{ p: 2, flexGrow: 1 }} container spacing={4}>
          {products.map((product) => (
            <Grid xs={3} key={product.productId}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}
