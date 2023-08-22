'use client'
import { CardActions, Drawer, IconButton } from '@mui/material'
import * as React from 'react'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { addCartBasket } from '@/redux/slice/cart-slice'
import Typography from '@mui/material/Typography'
import { DRAWER_TYPE } from '@/variables/enum/kiosk-enum'
import Button from '@mui/material/Button'

export function KioskDrawerManager({ children }: { children: React.ReactNode }) {
  const { drawerState } = useDrawerContext()
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
      open={drawerState.isShow}
      hideBackdrop={false}
      keepMounted={false}
    >
      {children}
    </Drawer>
  )
}

export function KioskFooterCardActions({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const { setDrawerState } = useDrawerContext()
  const orderProduct = useAppSelector(({ orderProductReducer }) => orderProductReducer)
  const handleAddCartBasket = () => {
    dispatch(addCartBasket(orderProduct))
    setDrawerState((state) => ({ isShow: false, type: state.type }))
  }

  return (
    <CardActions sx={{ height: 1 / 10, alignItems: 'stretch' }} onClick={handleAddCartBasket}>
      {children}
    </CardActions>
  )
}

export function KioskHeaderBackButton({ children }: { children: React.ReactNode }) {
  const { setDrawerState } = useDrawerContext()
  return (
    <IconButton
      size="large"
      onClick={() => setDrawerState((state) => ({ isShow: false, type: state.type }))}
    >
      {children}
    </IconButton>
  )
}

export function KioskHeaderTypography() {
  const { drawerState } = useDrawerContext()
  return (
    <Typography variant="h4">
      {drawerState.type === DRAWER_TYPE.ORDER ? '주문 옵션' : '장바구니'}
    </Typography>
  )
}
export function KioskFooterTypography() {
  const { drawerState } = useDrawerContext()
  const isOrderType = drawerState.type === DRAWER_TYPE.ORDER
  return (
    <Button
      variant={isOrderType ? 'outlined' : 'contained'}
      size="large"
      color="primary"
      sx={{ flexGrow: 1 }}
    >
      {isOrderType ? '장바구니 담기' : '결제하기'}
    </Button>
  )
}
