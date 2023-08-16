'use client'
import { Drawer } from '@mui/material'
import * as React from 'react'
import Container from '@mui/material/Container'
import OrderInfo from '@/app/kiosk/order-info'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'

export default function KioskDrawer() {
  const { isShowDrawer } = useDrawerContext()
  return (
    <Drawer
      anchor="right"
      ModalProps={{
        disableAutoFocus: true,
        sx: {
          width: 1,
          height: 1,
          top: 0,
          bottom: 'auto',
          left: 'auto',
          right: 'auto',
          position: 'absolute',
        },
      }}
      PaperProps={{
        elevation: 5,
        sx: {
          position: 'absolute',
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
      <Container
        sx={{
          height: 1,
        }}
      >
        <OrderInfo />
      </Container>
    </Drawer>
  )
}
