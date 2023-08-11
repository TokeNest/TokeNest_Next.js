'use client'
import Grid from '@mui/material/Unstable_Grid2'
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
  return data.map((product, i) => (
    <Grid xs={3} key={i}>
      <MediaCard product={product} clickEvent={clickEvent} />
    </Grid>
  ))
}
