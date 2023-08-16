import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { CardActions } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'

export default function KioskOrderFooter() {
  const { setIsShowDrawer } = useDrawerContext()
  return (
    <CardActions
      sx={{
        height: 96,
        alignItems: 'stretch',
      }}
    >
      <Button
        variant="outlined"
        size="large"
        color="primary"
        sx={{
          flexGrow: 1,
        }}
        onClick={() => setIsShowDrawer(false)}
      >
        장바구니 담기
      </Button>
    </CardActions>
  )
}
