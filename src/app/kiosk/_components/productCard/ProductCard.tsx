import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Box, CardHeader, CardMedia } from '@mui/material'
import Image from 'next/image'
import {
  ProductCardActionArea,
  ProductCardPrice,
} from '@/app/kiosk/_components/productCard/interaction'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'
import cuteMockCat from '/public/images/cuteMockCat.png'
import { FileInfo } from '@/variables/interface/api/file-interface'
import { ProductOptionGroupInfoClient } from '@/variables/interface/api/product-option-group-interface'

export default function ProductCard({ product }: { product: ProductInfoClient }) {
  return (
    <Card sx={{ borderRadius: 3, p: 0, width: 200, height: 350, justifyContent: 'center' }}>
      <ProductCardActionArea product={product}>
        <ProductImage file={product.file} />
        <ProductInformation
          productName={product.productName}
          productPrice={product.productPrice}
          productOptionGroups={product.productOptionGroups}
        />
        <ProductIntro intro={product.productIntro} />
      </ProductCardActionArea>
    </Card>
  )
}

function ProductImage({ file }: { file: FileInfo }) {
  const [src, alt] = file ? [file.filePath, file.fileName] : [cuteMockCat.src, 'not found image']
  return (
    <CardMedia sx={{ p: 1, height: 200 }}>
      <Box sx={{ position: 'relative', width: 1, height: 1 }}>
        <Image
          fill
          src={src}
          alt={alt}
          sizes="(max-width: 200px) 100vw"
          style={{ objectFit: 'cover', borderRadius: '6px' }}
        />
      </Box>
    </CardMedia>
  )
}

function ProductInformation({
  productName,
  productPrice,
  productOptionGroups,
}: {
  productName: string
  productPrice: number
  productOptionGroups: ProductOptionGroupInfoClient[]
}) {
  return (
    <CardHeader
      sx={{ px: 1, py: 0 }}
      titleTypographyProps={{ width: 184, noWrap: true }}
      title={productName}
      subheader={
        <ProductCardPrice productPrice={productPrice} productOptionGroups={productOptionGroups} />
      }
    />
  )
}

function ProductIntro({ intro }: { intro: string }) {
  return (
    <CardContent>
      <Typography variant="body1" color="text.primary" sx={{ height: 48, overflow: 'hidden' }}>
        {intro}
      </Typography>
    </CardContent>
  )
}
