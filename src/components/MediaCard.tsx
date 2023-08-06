import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea, CardHeader, CardMedia, Skeleton } from '@mui/material'
import { Product } from '@/api/kiosk-api'

export const MediaCard = ({
  product,
  clickEvent,
}: {
  product: Product
  clickEvent: (prop: Product) => void
}) => {
  const { name, info, price, imageUrl } = product
  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 0,
      }}
    >
      <CardActionArea onClick={() => clickEvent(product)} onDragStart={(e) => e.preventDefault()}>
        <CardMedia
          component="img"
          alt="image"
          image={imageUrl}
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
          title={name}
          subheader={
            <Typography
              sx={{
                textAlign: 'right',
              }}
            >
              {price}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            {info}
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
