import React from 'react'
import { Box } from '@mui/material'
import KioskDrawer from '@/app/kiosk/kiosk-drawer'
import DrawerProvider from '@/app/kiosk/drawer-provider'

export default function KioskLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: 1900,
        py: '1.25rem',
        px: '6.25rem',
      }}
    >
      <DrawerProvider>
        {children}
        <KioskDrawer />
      </DrawerProvider>
    </Box>
  )
}
