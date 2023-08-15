import { Product } from '@/variables/interface/kiosk-interface'
import * as React from 'react'
import CardContent from '@mui/material/CardContent'
import { ButtonGroup, CardActions, CardHeader, CardMedia, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import OptionGroups from '@/components/KioskDrawer/OptionGroups'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { minusProductQuantity, plusProductQuantity } from '@/redux/slice/order-info-slice'
import { setCalculateTotalPrice } from '@/utils/calculate-util'

export default function KioskProductInfo({ product }: { product: Product | null }) {
  if (!product) {
    return <div />
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
        <ProductDetailInfo product={product}>
          <ProductQuantityButton />
        </ProductDetailInfo>
      </Paper>
      <OptionGroups optionGroups={product.optionGroups} />
    </CardContent>
  )
}

function ProductDetailInfo({
  children,
  product: { productImageUrl, productName, productInfo, productPrice },
}: {
  children: React.ReactNode
  product: Product
}) {
  const { optionsState, productQuantity } = useAppSelector(
    ({ orderInfoReducer }) => orderInfoReducer
  )
  const calculateTotalPrice = setCalculateTotalPrice(optionsState, productPrice, productQuantity)
  return (
    <>
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
                {calculateTotalPrice}
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
        {children}
      </Grid>
    </>
  )
}

function ProductQuantityButton() {
  const dispatch = useDispatch<AppDispatch>()
  const { productQuantity } = useAppSelector(({ orderInfoReducer }) => orderInfoReducer)
  return (
    <Grid xs={12}>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonGroup size="large" variant="text" aria-label="text button group">
          <Button startIcon={<AddIcon />} onClick={() => dispatch(plusProductQuantity())}>
            더하기
          </Button>
          <Button disableRipple sx={{ px: 4 }}>
            {productQuantity}
          </Button>
          <Button endIcon={<RemoveIcon />} onClick={() => dispatch(minusProductQuantity())}>
            빼기
          </Button>
        </ButtonGroup>
      </CardActions>
    </Grid>
  )
}
