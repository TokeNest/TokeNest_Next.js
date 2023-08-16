import React from 'react'
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2'
import ProductContainer from '@/app/kiosk/product-container'
import { axiosFetcher } from '@/utils/api-fetcher-util'

export default async function KioskPage() {
  const productData = await axiosFetcher('kiosk')
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
          <ProductContainer productData={productData} />
        </Grid>
      </CardContent>
    </Card>
  )
}
