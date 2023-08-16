'use client'
import { Drawer } from '@mui/material'
import * as React from 'react'
import KioskOrderInfo from '@/components/KioskDrawer/OrderInfo/KioskOrderInfo'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import KioskProductInfo from '@/components/KioskDrawer/KioskProductInfo'
import KioskOrderHeader from '@/components/KioskDrawer/OrderInfo/KioskOrderHeader'
import KioskOrderFooter from '@/components/KioskDrawer/OrderInfo/KioskOrderFooter'

export default function KioskDrawer() {
  const { isShowDrawer, product } = useDrawerContext()
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
      <KioskOrderInfo>
        <KioskOrderHeader />
        <KioskProductInfo product={product} />
        <KioskOrderFooter />
      </KioskOrderInfo>
    </Drawer>
  )
}
