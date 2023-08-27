import { Card } from '@mui/material'
import KioskHeader from '@/components/kiosk/KioskDrawer/KioskHeader'
import KioskFooter from '@/components/kiosk/KioskDrawer/KioskFooter'
import * as React from 'react'
import { KioskDrawerManager } from '@/components/kiosk/KioskDrawer/interaction'
import { DRAWER_TYPE } from '@/variables/enum/kiosk-enum'
import KioskOrderBody from '@/components/kiosk/KioskDrawer/order/KioskOrderBody'
import KioskCartBody from '@/components/kiosk/KioskDrawer/cart/KioskCartBody'

export default function KioskDrawer({ drawerType }: { drawerType: string | undefined }) {
  return (
    <KioskDrawerManager>
      <Card elevation={0} sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <KioskHeader />
        {drawerType === DRAWER_TYPE.ORDER && <KioskOrderBody />}
        {drawerType === DRAWER_TYPE.CART && <KioskCartBody />}
        <KioskFooter />
      </Card>
    </KioskDrawerManager>
  )
}
