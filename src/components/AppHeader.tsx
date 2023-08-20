import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const pages = [
  { text: 'Kiosk', href: '/kiosk' },
  { text: 'Manager', href: '/manager' },
]

export default function AppHeader() {
  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: 'primary.light', zIndex: 1000, height: '4rem', alignItems: 'center' }}
    >
      <Toolbar
        sx={{ width: '75rem', flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}
      >
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          TokeИest
        </Typography>
        {pages.map(({ text, href }) => (
          <Button key={text} href={href} sx={{ my: 2, color: 'white', display: 'block' }}>
            {text}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  )
}
