import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardHeader, CardMedia } from '@mui/material'
import Image from 'next/image'
import {
  ProductCardActionArea,
  ProductCardPrice,
} from '@/app/kiosk/_components/productCard/interaction'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'

export default function ProductCard({ product }: { product: ProductInfoClient }) {
  const fileUrl = product.file === null ? '' : product.file?.filePath
  return (
    <Card sx={{ borderRadius: 3, p: 0, height: 340 }}>
      <ProductCardActionArea product={product}>
        <CardMedia sx={{ p: 1, height: 200 }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <Image
              fill
              src={fileUrl}
              alt={product.file?.fileName ?? ''}
              sizes="(max-width: 200px) 100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </CardMedia>
        <CardHeader
          sx={{ px: 1, py: 0 }}
          title={product.productName}
          subheader={<ProductCardPrice product={product} />}
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            {product.productIntro}
          </Typography>
        </CardContent>
      </ProductCardActionArea>
    </Card>
  )
}
