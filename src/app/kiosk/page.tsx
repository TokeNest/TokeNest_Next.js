'use client'
import { ItemContainer } from '@/app/kiosk/item-grid'
import { Box, Container } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { CustomDrawer } from '@/components/CustomDrawer'

export default function KioskPage() {
  const container = useRef<HTMLDivElement>(null)
  const [drawerRender, setDrawerRender] = useState(false)
  useEffect(() => setDrawerRender(true), [])
  return (
    <Container
      component="main"
      maxWidth="lg"
      disableGutters
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: '4rem',
        minHeight: 1920,
      }}
      ref={container}
    >
      <Box
        sx={{
          height: 1900,
          py: '1.25rem',
          px: '6.25rem',
        }}
      >
        <ItemContainer />
      </Box>
      {drawerRender && <CustomDrawer container={container.current} />}
    </Container>
  )
}
