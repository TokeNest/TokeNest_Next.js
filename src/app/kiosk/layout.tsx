import React from 'react'
import { Box } from '@mui/material'
import DrawerProvider from '@/app/kiosk/drawer-provider'
import KioskOrderBadge from '@/app/kiosk/_components/KioskOrderBadge'
import ProductsProvider from '@/app/kiosk/products-provider'
import KioskDrawer from '@/app/kiosk/_components/drawer/KioskDrawer'

export default function KioskLayout({
  children,
  drawer,
}: {
  children: React.ReactNode
  drawer: React.ReactNode
}) {
  return (
    <ProductsProvider>
      <DrawerProvider>
        <Box sx={{ height: 1900, py: '1.25rem', px: '6.25rem' }}>{children}</Box>
        <KioskOrderBadge />
        <KioskDrawer>{drawer}</KioskDrawer>
      </DrawerProvider>
    </ProductsProvider>
  )
}
