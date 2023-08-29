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
import { useDrawerContext } from '@/app/kiosk/drawer-provider'

export function KioskDrawerManager({ children }: { children: React.ReactNode }) {
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
      open={drawerIsOpen}
      hideBackdrop={false}
      keepMounted={false}
    >
      {children}
    </Drawer>
  )
}

export function KioskFooterCardActions() {
  const router = useRouter()
  const { setDrawerIsOpen } = useDrawerContext()
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()
  const searchParams = useSearchParams()
  const isOrder = searchParams.get('drawer') === DRAWER_TYPE.ORDER
  const orderProduct = useAppSelector(({ orderProductReducer }) => orderProductReducer)
  const handleCartBasket = () => {
    dispatch(pathname.includes('order') ? addCartBasket(orderProduct) : clearCartBasket())
    setDrawerIsOpen(false)
    router.back()
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
  const { setDrawerIsOpen } = useDrawerContext()
  const router = useRouter()
  return (
    <IconButton
      size="large"
      onClick={() => {
        router.back()
        setDrawerIsOpen(false)
      }}
    >
      {children}
    </IconButton>
  )
}

export function KioskHeaderTypography() {
  const pathname = usePathname()
  return (
    <Typography variant="h4">{pathname.includes('order') ? '주문 옵션' : '장바구니'}</Typography>
  )
}
