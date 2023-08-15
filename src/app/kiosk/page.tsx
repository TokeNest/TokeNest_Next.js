import React from 'react'
import { Box, Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2'
import ItemContainer from '@/app/kiosk/item-container'
import { axiosFetcher } from '@/utils/api-fetcher-util'
import KioskDrawer from '@/components/KioskDrawer'

export default async function KioskPage() {
  const productData = await axiosFetcher('kiosk')
  return (
    <Box
      sx={{
        height: 1900,
        py: '1.25rem',
        px: '6.25rem',
      }}
    >
      <Card
        sx={{
          height: 1,
          bgcolor: 'primary.light',
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ px: 4 }}>
          <Grid sx={{ p: 2, flexGrow: 1 }} container spacing={4}>
            <ItemContainer productData={productData} />
          </Grid>
        </CardContent>
      </Card>
      <KioskDrawer />
    </Box>
  )
}
