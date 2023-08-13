'use client'
import Grid from '@mui/material/Unstable_Grid2'
import { Product } from '@/variables/interface/kiosk'
import { MediaCard } from '@/components/MediaCard'

export default function ItemContainer({ productData }: { productData: any }) {
  const { data }: { data: Product[] } = productData
  return data.map((product, i) => (
    <Grid xs={3} key={i}>
      <MediaCard product={product} />
    </Grid>
  ))
}
