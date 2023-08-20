import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardMedia } from '@mui/material'
import { Product } from '@/variables/interface/kiosk-interface'
import ProductCardActionArea from '@/components/kiosk/ProductCard/interaction/ProductCardActionArea'
import ProductCardHeader from '@/components/kiosk/ProductCard/interaction/ProductCardHeader'
import Image from 'next/image'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card sx={{ borderRadius: 3, p: 0 }}>
      <ProductCardActionArea product={product}>
        <CardMedia sx={{ p: 1, height: 200 }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <Image
              fill={true}
              src={product.productImageUrl}
              alt={product.productName}
              sizes="(max-width: 200px) 100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </CardMedia>
        <ProductCardHeader product={product} />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            {product.productIntroduction}
          </Typography>
        </CardContent>
      </ProductCardActionArea>
    </Card>
  )
}
