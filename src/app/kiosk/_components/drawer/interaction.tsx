'use client'
import { CardActions, Drawer, IconButton } from '@mui/material'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { addCartBasket, clearCartBasket } from '@/redux/slice/cart-slice'
import Typography from '@mui/material/Typography'
import { DRAWER_TYPE } from '@/variables/enum/kiosk-enum'
import Button from '@mui/material/Button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function KioskDrawerManager({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const isShowDrawer = searchParams.get('drawer') !== null
  return (
    <Drawer
      anchor="right"
      ModalProps={{ disableAutoFocus: true }}
      PaperProps={{
        sx: {
          width: 1000,
          height: 1,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        },
      }}
      open={isShowDrawer}
      hideBackdrop={false}
      keepMounted={false}
    >
      {children}
    </Drawer>
  )
}

export function KioskFooterCardActions() {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()
  const searchParams = useSearchParams()
  const isOrder = searchParams.get('drawer') === DRAWER_TYPE.ORDER
  const orderProduct = useAppSelector(({ orderProductReducer }) => orderProductReducer)
  const handleCartBasket = () => {
    dispatch(isOrder ? addCartBasket(orderProduct) : clearCartBasket())
    router.push(pathname)
  }
  return (
    <CardActions sx={{ height: 1 / 10 }} onClick={handleCartBasket}>
      <Button
        variant={isOrder ? 'outlined' : 'contained'}
        size="large"
        color="primary"
        sx={{ width: 1, height: 1 }}
      >
        {isOrder ? '장바구니 담기' : '결제하기'}
      </Button>
    </CardActions>
  )
}

export function KioskHeaderBackButton({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <IconButton size="large" onClick={() => router.push(pathname)}>
      {children}
    </IconButton>
  )
}

export function KioskHeaderTypography() {
  const searchParams = useSearchParams()
  return (
    <Typography variant="h4">
      {searchParams.get('drawer') === DRAWER_TYPE.ORDER ? '주문 옵션' : '장바구니'}
    </Typography>
  )
}
