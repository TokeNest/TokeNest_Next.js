import { Card } from '@mui/material'
import KioskHeader from '@/app/kiosk/_components/drawer/KioskHeader'
import KioskFooter from '@/app/kiosk/_components/drawer/KioskFooter'
import * as React from 'react'
import { KioskDrawerManager } from '@/app/kiosk/_components/drawer/interaction'
import { DRAWER_TYPE } from '@/variables/enum/kiosk-enum'
import KioskOrderBody from '@/app/kiosk/_components/drawer/order/KioskOrderBody'
import KioskCartBody from '@/app/kiosk/_components/drawer/cart/KioskCartBody'

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
