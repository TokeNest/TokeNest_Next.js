import React from 'react'
import { Box } from '@mui/material'
import DrawerProvider from '@/app/kiosk/drawer-provider'
import KioskOrderBadge from '@/app/kiosk/_components/KioskOrderBadge'
import ProductsProvider from '@/app/kiosk/products-provider'

export default function KioskLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProductsProvider>
      <DrawerProvider>
        <Box sx={{ height: 1900, py: '1.25rem', px: '6.25rem' }}>{children}</Box>
        <KioskOrderBadge />
      </DrawerProvider>
    </ProductsProvider>
  )
}
