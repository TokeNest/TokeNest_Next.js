import { Card, CardActions, CardHeader, IconButton } from '@mui/material'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import Button from '@mui/material/Button'
import ProductInfo from '@/components/KioskDrawer/ProductInfo'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'

export default function OrderInfo() {
  const { product } = useDrawerContext()
  if (product === null) return <div />
  return (
    <Card
      elevation={0}
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <OrderHeader />
      <ProductInfo product={product} />
      <OrderFooter />
    </Card>
  )
}

function OrderHeader() {
  const { setIsShowDrawer } = useDrawerContext()
  return (
    <CardHeader
      action={
        <IconButton size="large" onClick={() => setIsShowDrawer(false)}>
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
      }
      title={<Typography variant="h4">주문 옵션</Typography>}
      sx={{
        '& .MuiCardHeader-action': {
          p: '12px',
          order: 0,
        },
        '& .MuiCardHeader-content': {
          order: 1,
        },
        height: 96,
      }}
    />
  )
}

function OrderFooter() {
  const { setIsShowDrawer } = useDrawerContext()
  return (
    <CardActions
      sx={{
        height: 96,
        alignItems: 'stretch',
      }}
    >
      <Button
        variant="outlined"
        size="large"
        color="primary"
        sx={{
          flexGrow: 1,
        }}
        onClick={() => setIsShowDrawer(false)}
      >
        장바구니 담기
      </Button>
    </CardActions>
  )
}
