'use client'
import * as React from 'react'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { CloseReason, OpenReason, SpeedDial } from '@mui/material'
import { useAppSelector } from '@/redux/store'
import { DRAWER_TYPE } from '@/variables/enum/kiosk-enum'
import { usePathname, useRouter } from 'next/navigation'

export default function KioskOrderBadge() {
  const router = useRouter()
  const pathname = usePathname()
  const { basket } = useAppSelector(({ cartReducer }) => cartReducer)
  const handleChangeOpen = (
    _: React.SyntheticEvent<{}, Event>,
    reason: CloseReason | OpenReason
  ) => {
    if (reason === 'toggle') {
      router.push(`${pathname}?drawer=${DRAWER_TYPE.CART}`)
    }
  }
  return (
    <SpeedDial
      ariaLabel="SpeedDial controlled open example"
      sx={{ position: 'fixed', left: 16, bottom: 16 }}
      FabProps={{ sx: { width: 84, height: 84 } }}
      icon={
        <Badge badgeContent={basket.length} color="secondary" overlap="circular">
          <ShoppingCartIcon sx={{ fontSize: 36 }} />
        </Badge>
      }
      onClose={handleChangeOpen}
      onOpen={handleChangeOpen}
      open={false}
    />
  )
}
