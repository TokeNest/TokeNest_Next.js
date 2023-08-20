import React from 'react'
import { Box } from '@mui/material'
import DrawerProvider from '@/app/kiosk/drawer-provider'
import KioskOrderBadge from '@/components/kiosk/KioskOrderBadge'
import KioskDrawer from '@/components/kiosk/KioskDrawer/KioskDrawer'

export default function KioskLayout({ children }: { children: React.ReactNode }) {
  return (
    <DrawerProvider>
      <Box sx={{ height: 1900, py: '1.25rem', px: '6.25rem' }}>{children}</Box>
      <KioskDrawer />
      <KioskOrderBadge />
    </DrawerProvider>
  )
}
