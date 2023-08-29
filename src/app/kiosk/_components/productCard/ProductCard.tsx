import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardMedia } from '@mui/material'
import Image from 'next/image'
import {
  ProductCardActionArea,
  ProductCardHeader,
} from '@/app/kiosk/_components/productCard/interaction'
import { ProductInfo } from '@/variables/interface/api/product-interface'

export default function ProductCard({ product }: { product: ProductInfo }) {
  return (
    <Card sx={{ borderRadius: 3, p: 0 }}>
      <ProductCardActionArea product={product}>
        <CardMedia sx={{ p: 1, height: 200 }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <Image
              fill={true}
              src={''}
              alt={product.productName}
              sizes="(max-width: 200px) 100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </CardMedia>
        <ProductCardHeader product={product} />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            {product.productInfo}
          </Typography>
        </CardContent>
      </ProductCardActionArea>
    </Card>
  )
}
