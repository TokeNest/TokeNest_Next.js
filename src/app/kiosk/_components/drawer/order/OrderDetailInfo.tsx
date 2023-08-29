import * as React from 'react'
import { CardHeader, CardMedia, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import OrderQuantityButton from '@/app/kiosk/_components/drawer/order/OrderQuantityButton'
import { OrderDetailInfoTotalPrice } from '@/app/kiosk/_components/drawer/order/interaction'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'

export default function OrderDetailInfo({
  product: { productPrice, file, productName, productInfo, productOptionGroups },
  productInfoHeight,
}: {
  product: ProductInfoClient
  productInfoHeight: number
}) {
  const imageUrl = file === null ? '' : file.filePath
  return (
    <Paper elevation={0} sx={{ height: 400, display: 'flex' }}>
      <CardMedia
        component="img"
        alt="image"
        image={imageUrl}
        sx={{ width: 400, height: productInfoHeight, p: 1, borderRadius: 6 }}
      />
      <Grid container justifyContent="space-around">
        <Grid xs={12}>
          <CardHeader
            title={<Typography variant="h3">{productName}</Typography>}
            subheader={
              <OrderDetailInfoTotalPrice
                optionGroups={productOptionGroups}
                productPrice={productPrice}
              />
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
