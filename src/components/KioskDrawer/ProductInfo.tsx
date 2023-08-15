import { Product } from '@/variables/interface/kiosk'
import * as React from 'react'
import { useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { ButtonGroup, CardActions, CardHeader, CardMedia, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import OptionGroups from '@/components/KioskDrawer/OptionGroups'

export default function ProductInfo({
  product: { productName, productInfo, productPrice, productImageUrl, optionGroups },
}: {
  product: Product
}) {
  const [totalProductPrice, setTotalProductPrice] = useState(productPrice)
  const handleChangeProductPrice = (totalPrice: number) => {
    setTotalProductPrice(productPrice + totalPrice)
  }
  return (
    <CardContent
      sx={{
        height: 1,
      }}
    >
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
                <Typography align="right" variant="h4" sx={{ color: 'text.secondary' }}>
                  {totalProductPrice}
                </Typography>
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
          <ProductQuantityGrid />
        </Grid>
      </Paper>
      <OptionGroups
        handleChangeProductPrice={handleChangeProductPrice}
        optionGroups={optionGroups}
      />
    </CardContent>
  )
}

function ProductQuantityGrid() {
  const [productQuantity, setProductQuantity] = useState(1)
  const handleQuantity = (value: 'plus' | 'minus') => {
    switch (value) {
      case 'plus':
        setProductQuantity((state) => state + 1)
        break
      case 'minus':
        productQuantity && setProductQuantity((state) => state - 1)
        break
    }
  }

  return (
    <Grid xs={12}>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonGroup size="large" variant="text" aria-label="text button group">
          <Button startIcon={<AddIcon />} onClick={() => handleQuantity('plus')}>
            더하기
          </Button>
          <Button disableRipple sx={{ px: 4 }}>
            {productQuantity}
          </Button>
          <Button endIcon={<RemoveIcon />} onClick={() => handleQuantity('minus')}>
            빼기
          </Button>
        </ButtonGroup>
      </CardActions>
    </Grid>
  )
}
