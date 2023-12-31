import React, { Suspense } from 'react'
import { Box } from '@mui/material'
import DrawerProvider from '@/app/kiosk/drawer-provider'
import KioskOrderBadge from '@/app/kiosk/_components/KioskOrderBadge'
import KioskDrawer from '@/app/kiosk/_components/drawer/KioskDrawer'
import { NavigationEvents } from '@/app/kiosk/navigation-events'

export const metadata = {
  title: 'TokeИest | Kiosk',
  description: 'Kiosk',
}
export default function KioskLayout({
  children,
  drawer,
}: {
  children: React.ReactNode
  drawer: React.ReactNode
}) {
  return (
    <DrawerProvider>
      <Box sx={{ height: 1900, py: '1.25rem', px: '6.25rem' }}>{children}</Box>
      <KioskOrderBadge />
      <KioskDrawer>{drawer}</KioskDrawer>
      <Suspense>
        <NavigationEvents />
      </Suspense>
    </DrawerProvider>
  )
}
