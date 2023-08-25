'use client'
import { Card } from '@mui/material'
import KioskHeader from '@/components/kiosk/KioskDrawer/KioskHeader'
import KioskFooter from '@/components/kiosk/KioskDrawer/KioskFooter'
import * as React from 'react'
import KioskOrderBody from '@/components/kiosk/KioskDrawer/order/KioskOrderBody'
import { KioskDrawerManager } from '@/components/kiosk/KioskDrawer/interaction'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { DRAWER_TYPE } from '@/variables/enum/kiosk-enum'
import KioskCartBody from '@/components/kiosk/KioskDrawer/cart/KioskCartBody'

export default function KioskDrawer() {
  const { drawerState } = useDrawerContext()
  return (
    <KioskDrawerManager>
      <Card elevation={0} sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <KioskHeader />
        {drawerState.type === DRAWER_TYPE.ORDER && <KioskOrderBody />}
        {drawerState.type === DRAWER_TYPE.CART && <KioskCartBody />}
        <KioskFooter />
      </Card>
    </KioskDrawerManager>
  )
}
