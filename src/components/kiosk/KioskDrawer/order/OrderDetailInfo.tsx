'use component'
import * as React from 'react'
import { CardHeader, CardMedia, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { Product } from '@/variables/interface/kiosk-interface'
import OrderQuantityButton from '@/components/kiosk/KioskDrawer/order/OrderQuantityButton'
import { OrderDetailInfoTotalPrice } from '@/components/kiosk/KioskDrawer/order/interaction'

export default function OrderDetailInfo({ productInfoHeight }: { productInfoHeight: number }) {
  const { product } = useDrawerContext()
  const { productPrice, productImageUrl, productName, productInfo, optionGroups } =
    product as Product
  return (
    <Paper elevation={0} sx={{ height: 400, display: 'flex' }}>
      <CardMedia
        component="img"
        alt="image"
        image={productImageUrl}
        sx={{ width: 400, height: productInfoHeight, p: 1, borderRadius: 6 }}
      />
      <Grid container justifyContent="space-around">
        <Grid xs={12}>
          <CardHeader
            title={<Typography variant="h3">{productName}</Typography>}
            subheader={
              <OrderDetailInfoTotalPrice optionGroups={optionGroups} productPrice={productPrice} />
            }
          />
        </Grid>
        <Grid xs={12}>
          <Typography sx={{ px: 4 }} variant="h4">
            {productInfo}
          </Typography>
        </Grid>
        <OrderQuantityButton />
      </Grid>
    </Paper>
  )
}
