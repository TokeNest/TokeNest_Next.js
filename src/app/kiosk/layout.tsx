import React from 'react'
import { Box } from '@mui/material'
import KioskDrawer from '@/app/kiosk/kiosk-drawer'
import DrawerProvider from '@/app/kiosk/drawer-provider'
import KioskOrderBadge from '@/components/KioskDrawer/KioskOrderBadge'

export default function KioskLayout({ children }: { children: React.ReactNode }) {
  return (
    <DrawerProvider>
      <Box
        sx={{
          height: 1900,
          py: '1.25rem',
          px: '6.25rem',
        }}
      >
        {children}
        <KioskDrawer />
      </Box>
      <KioskOrderBadge />
    </DrawerProvider>
  )
}
