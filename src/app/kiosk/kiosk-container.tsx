'use client'
import { useEffect, useRef, useState } from 'react'
import { Box, Container } from '@mui/material'
import { ItemContainer } from '@/app/kiosk/item-grid'
import { CustomDrawer } from '@/components/CustomDrawer'
import useSWR, { Fetcher } from 'swr'
import { Product } from '@/variables/interface/kiosk-api'

const fetcher: Fetcher<Product[]> = async (url: string) => {
  const res = await fetch(url)
  return await res.json()
}
export const KioskContainer = () => {
  const { data: productData } = useSWR('/api/kiosk', fetcher)
  const container = useRef<HTMLDivElement>(null)
  const [drawerRender, setDrawerRender] = useState(false)
  useEffect(() => setDrawerRender(true), [])
  if (!productData) {
    return <div>err</div>
  }
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
        <ItemContainer productData={productData} />
      </Box>
      {drawerRender && <CustomDrawer container={container.current} />}
    </Container>
  )
}
