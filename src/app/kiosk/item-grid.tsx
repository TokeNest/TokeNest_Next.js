'use client'
import Grid from '@mui/material/Unstable_Grid2'
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { setDrawerStatus } from '@/redux/slice/drawer-slice'
import { Product } from '@/variables/interface/kiosk-api'
import { MediaCard } from '@/components/MediaCard'

export const ItemContainer = ({ productData }: { productData: any }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { data }: { data: Product[] } = productData
  const clickEvent = (product: Product) =>
    dispatch(setDrawerStatus({ isShow: true, data: product }))
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
          {data.map((product, i) => (
            <Grid xs={3} key={i}>
              <MediaCard product={product} clickEvent={clickEvent} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}
