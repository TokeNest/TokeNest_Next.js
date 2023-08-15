'use client'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea, CardHeader, CardMedia, Skeleton } from '@mui/material'
import { Product } from '@/variables/interface/kiosk'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { setDrawerStatus } from '@/redux/slice/drawer-slice'
import { useDispatch } from 'react-redux'

export const MediaCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>()
  const clickEvent = () => dispatch(setDrawerStatus({ isShow: true, product }))

  const { marketList } = useAppSelector(({ marketReducer }) => marketReducer.value)
  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 0,
      }}
    >
      <CardActionArea onClick={clickEvent} onDragStart={(e) => e.preventDefault()}>
        <CardMedia
          component="img"
          alt="image"
          image={product.productImageUrl}
          sx={{
            height: 200,
            p: 1,
            borderRadius: 3,
          }}
        />
        <CardHeader
          sx={{
            px: 1,
            py: 0,
          }}
          title={product.productName}
          subheader={
            <Typography
              sx={{
                textAlign: 'right',
              }}
            >
              {product.productPrice}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            {product.productIntroduction}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export const SkeletonMediaCard = () => (
  <Card>
    <Skeleton animation="wave" variant="rectangular" sx={{ height: 240, width: 240 }} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        <Skeleton />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <Skeleton />
      </Typography>
    </CardContent>
  </Card>
)
