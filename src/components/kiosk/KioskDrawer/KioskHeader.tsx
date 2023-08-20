import { CardHeader } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { KioskHeaderBackButton } from '@/components/kiosk/KioskDrawer/interaction'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'

export default function KioskHeader() {
  return (
    <CardHeader
      action={
        <KioskHeaderBackButton>
          <ArrowBackIosNewRoundedIcon />
        </KioskHeaderBackButton>
      }
      title={<Typography variant="h4">주문 옵션</Typography>}
      sx={{
        height: 1 / 10,
        '& .MuiCardHeader-action': {
          p: '12px',
          order: 0,
        },
        '& .MuiCardHeader-content': {
          order: 1,
        },
      }}
    />
  )
}
