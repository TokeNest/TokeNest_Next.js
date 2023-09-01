import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

const pages = [{ text: 'Kiosk', href: '/kiosk' }]
const rootHref = '/'
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
          <Link href={rootHref} style={{ textDecorationLine: 'none', color: 'white' }}>
            TokeИest
          </Link>
        </Typography>
        {pages.map(({ text, href }, i) => (
          <Link href={href} key={i} style={{ textDecorationLine: 'none' }}>
            <Typography fontWeight="bold" sx={{ my: 2, color: 'white', display: 'block' }}>
              {text}
            </Typography>
          </Link>
        ))}
      </Toolbar>
    </AppBar>
  )
}
