import { Card, CardContent } from '@mui/material'
import KioskHeader from '@/app/kiosk/_components/drawer/KioskHeader'
import KioskFooter from '@/app/kiosk/_components/drawer/KioskFooter'
import * as React from 'react'
import { KioskDrawerManager } from '@/app/kiosk/_components/drawer/interaction'

export default function KioskDrawer({ children }: { children: React.ReactNode }) {
  return (
    <KioskDrawerManager>
      <Card elevation={0} sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <KioskHeader />
        <CardContent sx={{ height: 8 / 10 }}>{children}</CardContent>
        <KioskFooter />
      </Card>
    </KioskDrawerManager>
  )
}
