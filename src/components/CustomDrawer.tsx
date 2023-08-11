'use client'
import { Drawer } from '@mui/material'
import * as React from 'react'
import { useAppSelector } from '@/redux/store'
import Container from '@mui/material/Container'
import { OrderInfo } from '@/app/kiosk/order-info'

export const CustomDrawer = () => {
  const { isShow, data } = useAppSelector(({ drawerReducer }) => drawerReducer.value)
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
      open={isShow}
      hideBackdrop={false}
      keepMounted={false}
    >
      <Container
        sx={{
          height: 1,
        }}
        children={<OrderInfo product={data} />}
      />
    </Drawer>
  )
}
