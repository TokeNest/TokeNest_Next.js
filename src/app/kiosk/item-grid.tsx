'use client'
import Grid from '@mui/material/Unstable_Grid2'
import { MediaCard } from '@/components/MediaCard'
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { setDrawerStatus } from '@/redux/slice/drawer-slice'
import useSWR from 'swr'
import { mockFetcher } from '@/api/mock/kiosk-api-mock'
import { Product } from '@/api/kiosk-api'

export const ItemContainer = () => {
  const { data, isLoading } = useSWR('a', mockFetcher)
  const dispatch = useDispatch<AppDispatch>()
  const clickEvent = (product: Product) =>
    dispatch(setDrawerStatus({ isShow: true, data: product }))
  if (!data) return <div>Loading... {isLoading}</div>
  return (
    <Card
      sx={{
        height: 1,
        bgcolor: 'primary.light',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ px: 4 }}>
        <Grid sx={{ p: 2, flexGrow: 1 }} container spacing={4}>
          {data[0].data.map((product, i) => (
            <Grid xs={3} key={i}>
              <MediaCard product={product} clickEvent={clickEvent} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}
