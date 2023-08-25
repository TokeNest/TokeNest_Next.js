'use client'
import { CardActions, Drawer, IconButton } from '@mui/material'
import * as React from 'react'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { addCartBasket, clearCartBasket } from '@/redux/slice/cart-slice'
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

export function KioskFooterCardActions() {
  const dispatch = useDispatch<AppDispatch>()
  const { drawerState, setDrawerState } = useDrawerContext()
  const isOrder = drawerState.type === DRAWER_TYPE.ORDER
  const orderProduct = useAppSelector(({ orderProductReducer }) => orderProductReducer)
  const handleCartBasket = () => {
    dispatch(isOrder ? addCartBasket(orderProduct) : clearCartBasket())
    setDrawerState((state) => ({ isShow: false, type: state.type }))
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
