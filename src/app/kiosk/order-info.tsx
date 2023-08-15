import { Card, CardActions, CardHeader, IconButton } from '@mui/material'
import { closeDrawer } from '@/redux/slice/drawer-slice'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import Button from '@mui/material/Button'
import { Product } from '@/variables/interface/kiosk'
import ProductInfo from '@/components/KioskDrawer/ProductInfo'

export default function OrderInfo({ product }: { product: Product | null }) {
  const dispatch = useDispatch<AppDispatch>()
  const handleCloseDrawer = () => dispatch(closeDrawer())
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
      <OrderHeader clickEvent={handleCloseDrawer} />
      <ProductInfo product={product} />
      <OrderFooter clickEvent={handleCloseDrawer} />
    </Card>
  )
}

function OrderHeader({ clickEvent }: { clickEvent: () => void }) {
  return (
    <CardHeader
      action={
        <IconButton size="large" onClick={clickEvent}>
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

function OrderFooter({ clickEvent }: { clickEvent: () => void }) {
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
        onClick={clickEvent}
      >
        장바구니 담기
      </Button>
    </CardActions>
  )
}
