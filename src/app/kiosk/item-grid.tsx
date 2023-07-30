'use client'
import { Item } from '@/api/kiosk-api'
import Grid from '@mui/material/Unstable_Grid2'
import { MediaCard } from '@/components/MediaCard'
import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { CustomDrawer } from '@/components/CustomDrawer'
import Container from '@mui/material/Container'

export const ItemContainer = ({ itemList }: { itemList: Item[] }) => {
  const [openItemInfo, setOpenItemInfo] = useState(false)
  const container = useRef(null)
  const clickEvent = () => setOpenItemInfo(!openItemInfo)
  return (
    <>
      <Box
        sx={{
          bgcolor: 'primary.main',
          height: '100%',
          display: 'flex',
          borderRadius: 6,
        }}
        ref={container}
      >
        <Container>
          <Grid container rowSpacing={4} columnSpacing={4} p={4} sx={{}}>
            {itemList.map((item, i) => (
              <Grid xs={3} key={i}>
                <MediaCard item={item} clickEvent={clickEvent} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <CustomDrawer open={openItemInfo} onClose={clickEvent} container={container.current} />
    </>
  )
}
