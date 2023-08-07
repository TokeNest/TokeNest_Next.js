'use client'
import * as React from 'react'
import { useEffect } from 'react'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { network, networkHooks } from '@/web3/connectors/network'

const pages = [
  { text: 'Kiosk', href: '/kiosk' },
  { text: 'Manager', href: '/manager' },
]

const { useIsActive } = networkHooks

export default function AppHeader() {
  const isActive = useIsActive()
  useEffect(() => {
    void network.activate().catch(() => console.debug('Failed to connect to network'))
  }, [])
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'primary.light',
        zIndex: 1000,
        height: '4rem',
        alignItems: 'center',
      }}
    >
      <Toolbar
        sx={{ width: '75rem', flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}
      >
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          TokeИest {isActive ? <>🟢 Connected</> : <>⚪️ Disconnected</>}
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
