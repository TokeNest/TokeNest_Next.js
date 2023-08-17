'use client'
import { IconButton } from '@mui/material'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import * as React from 'react'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'

export default function KioskOrderHeaderBackButton() {
  const { setIsShowDrawer } = useDrawerContext()
  return (
    <IconButton size="large" onClick={() => setIsShowDrawer(false)}>
      <ArrowBackIosNewRoundedIcon />
    </IconButton>
  )
}
