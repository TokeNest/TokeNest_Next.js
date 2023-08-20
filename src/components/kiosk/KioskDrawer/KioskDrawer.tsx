import { Card } from '@mui/material'
import KioskHeader from '@/components/kiosk/KioskDrawer/KioskHeader'
import KioskFooter from '@/components/kiosk/KioskDrawer/KioskFooter'
import * as React from 'react'
import KioskOrderBody from '@/components/kiosk/KioskDrawer/order/KioskOrderBody'
import { KioskDrawerManager } from '@/components/kiosk/KioskDrawer/interaction'

export default function KioskDrawer() {
  return (
    <KioskDrawerManager>
      <Card elevation={0} sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <KioskHeader />
        <KioskOrderBody />
        <KioskFooter />
      </Card>
    </KioskDrawerManager>
  )
}
