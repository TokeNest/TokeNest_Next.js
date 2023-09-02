import * as React from 'react'
import { Box, CardHeader, CardMedia, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import OrderQuantityButton from '@/app/kiosk/_components/drawer/order/OrderQuantityButton'
import { OrderDetailInfoTotalPrice } from '@/app/kiosk/_components/drawer/order/interaction'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'
import cuteMockCat from '../../../../../../public/images/cuteMockCat.png'
import Image from 'next/image'

export default function OrderDetailInfo({
  product: { productPrice, file, productName, productInfo, productOptionGroups },
}: {
  product: ProductInfoClient
}) {
  const [src, alt] = file ? [file.filePath, file.fileName] : [cuteMockCat.src, 'not found image']
  return (
    <Paper
      elevation={0}
      sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <CardMedia sx={{ width: 350, height: 350, p: 1 }}>
        <Box sx={{ position: 'relative', width: 1, height: 1 }}>
          <Image
            fill
            src={src}
            alt={alt}
            sizes="(max-width: 350px) 100vw"
            style={{ objectFit: 'cover', borderRadius: '6px' }}
          />
        </Box>
      </CardMedia>
      <Grid container justifyContent="space-around" sx={{ width: 600 }}>
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
