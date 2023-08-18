import React from 'react'
import { Box } from '@mui/material'
import KioskDrawer from '@/components/kiosk/KioskDrawer/KioskDrawer'
import DrawerProvider from '@/app/kiosk/drawer-provider'
import KioskOrderBadge from '@/components/kiosk/KioskDrawer/KioskOrderBadge'
import KioskOrderInfo from '@/components/kiosk/KioskDrawer/KioskOrderInfo/KioskOrderInfo'

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
        <KioskDrawer>
          <KioskOrderInfo />
        </KioskDrawer>
      </Box>
      <KioskOrderBadge />
    </DrawerProvider>
  )
}
