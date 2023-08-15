import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { CardHeader, IconButton } from '@mui/material'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import Typography from '@mui/material/Typography'
import * as React from 'react'

export default function KioskOrderHeader() {
  const { setIsShowDrawer } = useDrawerContext()
  return (
    <CardHeader
      action={
        <IconButton size="large" onClick={() => setIsShowDrawer(false)}>
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
      }
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
