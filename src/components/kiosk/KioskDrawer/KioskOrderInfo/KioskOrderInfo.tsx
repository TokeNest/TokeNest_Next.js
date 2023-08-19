import { Card, Container } from '@mui/material'
import * as React from 'react'
import KioskOrderHeader from '@/components/kiosk/KioskDrawer/KioskOrderInfo/KioskOrderHeader'
import KioskProductInfo from '@/components/kiosk/KioskDrawer/KioskProductInfo/KioskProductInfo'
import KioskOrderFooter from '@/components/kiosk/KioskDrawer/KioskOrderInfo/KioskOrderFooter'
import KioskProductDetailInfo from '@/components/kiosk/KioskDrawer/KioskProductInfo/KioskProductDetailInfo/KioskProductDetailInfo'
import KioskProductOptionGroups from '@/components/kiosk/KioskDrawer/KioskProductInfo/KioskProductOptionGroups/KioskProductOptionGroups'

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
        <KioskProductInfo>
          <KioskProductDetailInfo />
          <KioskProductOptionGroups />
        </KioskProductInfo>
        <KioskOrderFooter />
      </Card>
    </Container>
  )
}
