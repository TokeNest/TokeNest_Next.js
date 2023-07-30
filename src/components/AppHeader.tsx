'use client'
import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const pages = [
  { text: 'Home', href: '/' },
  { text: 'Kiosk', href: '/kiosk' },
  { text: 'Manager', href: '/manager' },
]

export default function AppHeader() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
      <Container>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {pages.map(({ text, href }) => (
              <Button key={text} href={href} sx={{ my: 2, color: 'white', display: 'block' }}>
                {text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
