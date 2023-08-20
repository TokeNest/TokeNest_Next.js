import Button from '@mui/material/Button'
import * as React from 'react'
import { KioskFooterCardActions } from '@/components/kiosk/KioskDrawer/interaction'

export default function KioskFooter() {
  return (
    <KioskFooterCardActions>
      <Button variant="outlined" size="large" color="primary" sx={{ flexGrow: 1 }}>
        장바구니 담기
      </Button>
    </KioskFooterCardActions>
  )
}
