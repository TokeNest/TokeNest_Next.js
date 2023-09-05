'use client'
import { CardActions, Drawer, IconButton } from '@mui/material'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { addCartBasket, clearCartBasket } from '@/redux/slice/cart-slice'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { usePathname, useRouter } from 'next/navigation'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'

export function KioskDrawerManager({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { drawerIsOpen } = useDrawerContext()
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
      SlideProps={{ onExited: () => router.back() }}
      open={drawerIsOpen}
      hideBackdrop={false}
      keepMounted={false}
    >
      {children}
    </Drawer>
  )
}

export function KioskFooterCardActions() {
  const { setDrawerIsOpen } = useDrawerContext()
  const pathname = usePathname()
  const isOrder = pathname.includes('order')
  const dispatch = useDispatch<AppDispatch>()
  const orderProduct = useAppSelector(({ orderProductReducer }) => orderProductReducer)
  const handleCartBasket = () => {
    dispatch(isOrder ? addCartBasket(orderProduct) : clearCartBasket())
    setDrawerIsOpen(false)
  }
  return (
    <CardActions sx={{ height: 1 / 10 }} onClick={handleCartBasket}>
      <Button
        variant={isOrder ? 'outlined' : 'contained'}
        size="large"
        color="primary"
        sx={{ width: 1, height: 1, '& .MuiButton-outlined': {} }}
      >
        <Typography letterSpacing={6} variant="h5" fontWeight={700}>
          {isOrder ? '장바구니 담기' : '결제하기'}
        </Typography>
      </Button>
    </CardActions>
  )
}

export function KioskHeaderBackButton({ children }: { children: React.ReactNode }) {
  const { setDrawerIsOpen } = useDrawerContext()
  return (
    <IconButton size="large" onClick={() => setDrawerIsOpen(false)}>
      {children}
    </IconButton>
  )
}

export function KioskHeaderTypography() {
  const pathname = usePathname()
  return (
    <Typography fontWeight={700} variant="h4">
      {pathname.includes('order') ? '주문 옵션' : '장바구니'}
    </Typography>
  )
}
