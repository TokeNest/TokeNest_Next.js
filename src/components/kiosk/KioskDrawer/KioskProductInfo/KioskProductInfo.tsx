import * as React from 'react'
import CardContent from '@mui/material/CardContent'
import { Paper } from '@mui/material'
import KioskProductOptionGroups from '@/components/kiosk/KioskDrawer/KioskProductInfo/KioskProductOptionGroups/KioskProductOptionGroups'
import KioskProductDetailInfo from '@/components/kiosk/KioskDrawer/KioskProductInfo/KioskProductDetailInfo/KioskProductDetailInfo'
import KioskProductQuantityButton from '@/components/kiosk/KioskDrawer/KioskProductInfo/KioskProductQuantityButton'

export default function KioskProductInfo() {
  return (
    <CardContent
      sx={{
        height: 1,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
        }}
      >
        <KioskProductDetailInfo>
          <KioskProductQuantityButton />
        </KioskProductDetailInfo>
      </Paper>
      <KioskProductOptionGroups />
    </CardContent>
  )
}
