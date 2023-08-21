'use client'
import { CardActions, Drawer, IconButton } from '@mui/material'
import * as React from 'react'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { addCartBasket } from '@/redux/slice/cart-slice'

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
