import Grid from '@mui/material/Unstable_Grid2'
import { Product } from '@/variables/interface/kiosk-interface'
import ProductCard from '@/components/ProductCard'

export default function ProductContainer({ productData }: { productData: any }) {
  const { data }: { data: Product[] } = productData
  return data.map((product, i) => (
    <Grid xs={3} key={i}>
      <ProductCard product={product} />
    </Grid>
  ))
}
