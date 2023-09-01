import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import SvgIcon from '@mui/material/SvgIcon'

const pages = [{ text: 'KIOSK', href: '/kiosk' }]
export default function AppHeader() {
  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: 'primary.light', zIndex: 1000, height: '4rem', alignItems: 'center' }}
    >
      <Toolbar
        sx={{ width: '75rem', flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}
      >
        <TokeNestLogo />
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecorationLine: 'none', color: 'white' }}>
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

function TokeNestLogo() {
  return (
    <SvgIcon sx={{ mr: 1 }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <path
          fill="#BE1931"
          d="M18.437 35.747c-.242.337-.632.337-.874 0L5.314 18.612c-.242-.338-.242-.886 0-1.224L17.563.253c.242-.338.632-.338.874 0l12.25 17.135c.241.338.241.886 0 1.224l-12.25 17.135z"
        />
      </svg>
    </SvgIcon>
  )
}
