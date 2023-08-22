import { CardHeader } from '@mui/material'
import * as React from 'react'
import {
  KioskHeaderBackButton,
  KioskHeaderTypography,
} from '@/components/kiosk/KioskDrawer/interaction'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'

export default function KioskHeader() {
  return (
    <CardHeader
      action={
        <KioskHeaderBackButton>
          <ArrowBackIosNewRoundedIcon />
        </KioskHeaderBackButton>
      }
      title={<KioskHeaderTypography />}
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
