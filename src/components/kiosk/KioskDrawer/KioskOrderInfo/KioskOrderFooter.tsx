import Button from '@mui/material/Button'
import * as React from 'react'
import KioskOrderFooterCardActions from '@/components/kiosk/KioskDrawer/KioskOrderInfo/interaction/KioskOrderFooterCardActions'

export default function KioskOrderFooter() {
  return (
    <KioskOrderFooterCardActions>
      <Button
        variant="outlined"
        size="large"
        color="primary"
        sx={{
          flexGrow: 1,
        }}
      >
        장바구니 담기
      </Button>
    </KioskOrderFooterCardActions>
  )
}
