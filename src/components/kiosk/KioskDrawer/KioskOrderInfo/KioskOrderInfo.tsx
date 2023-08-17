import { Card, Container } from '@mui/material'
import * as React from 'react'
import KioskOrderHeader from '@/components/kiosk/KioskDrawer/KioskOrderInfo/KioskOrderHeader'
import KioskProductInfo from '@/components/kiosk/KioskDrawer/KioskProductInfo/KioskProductInfo'
import KioskOrderFooter from '@/components/kiosk/KioskDrawer/KioskOrderInfo/KioskOrderFooter'

export default function KioskOrderInfo() {
  return (
    <Container
      sx={{
        height: 1,
      }}
    >
      <Card
        elevation={0}
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <KioskOrderHeader />
        <KioskProductInfo />
        <KioskOrderFooter />
      </Card>
    </Container>
  )
}
