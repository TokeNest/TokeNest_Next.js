'use component'
import * as React from 'react'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { useAppSelector } from '@/redux/store'

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
]

export default function KioskOrderBadge() {
  const { basket } = useAppSelector(({ cartReducer }) => cartReducer)
  const [open, setOpen] = React.useState(false)

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
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => setOpen(false)}
        />
      ))}
    </SpeedDial>
  )
}
