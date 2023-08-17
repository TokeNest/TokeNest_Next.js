import { CardHeader } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import KioskOrderHeaderBackButton from '@/components/kiosk/KioskDrawer/KioskOrderInfo/interaction/KioskOrderHeaderBackButton'

export default function KioskOrderHeader() {
  return (
    <CardHeader
      action={<KioskOrderHeaderBackButton />}
      title={<Typography variant="h4">주문 옵션</Typography>}
      sx={{
        '& .MuiCardHeader-action': {
          p: '12px',
          order: 0,
        },
        '& .MuiCardHeader-content': {
          order: 1,
        },
        height: 96,
      }}
    />
  )
}
