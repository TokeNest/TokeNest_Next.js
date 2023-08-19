'use client'
import * as React from 'react'
import { CardHeader, CardMedia, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import ProductDetailInfoTotalPrice from '@/components/kiosk/KioskDrawer/KioskProductInfo/KioskProductDetailInfo/interaction/ProductDetailInfoTotalPrice'
import { Product } from '@/variables/interface/kiosk-interface'
import KioskProductQuantityButton from '@/components/kiosk/KioskDrawer/KioskProductInfo/KioskProductQuantityButton/KioskProductQuantityButton'

export default function KioskProductDetailInfo() {
  const { product } = useDrawerContext()
  const { productPrice, productImageUrl, productName, productInfo, optionGroups } =
    product as Product
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
      }}
    >
      <CardMedia
        component="img"
        alt="image"
        image={productImageUrl}
        sx={{
          width: 400,
          height: 400,
          p: 1,
          borderRadius: 6,
        }}
      />
      <Grid container justifyContent="space-around">
        <Grid xs={12}>
          <CardHeader
            title={<Typography variant="h3">{productName}</Typography>}
            subheader={
              <ProductDetailInfoTotalPrice
                optionGroups={optionGroups}
                productPrice={productPrice}
              />
            }
          />
        </Grid>
        <Grid xs={12}>
          <Typography
            sx={{
              px: 4,
            }}
            variant="h4"
          >
            {productInfo}
          </Typography>
        </Grid>
        <KioskProductQuantityButton />
      </Grid>
    </Paper>
  )
}
