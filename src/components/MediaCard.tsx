import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea, CardMedia, Skeleton } from '@mui/material'
import { Item } from '@/api/kiosk-api'

export const MediaCard = ({
  item: { image, text, heading },
  clickEvent,
}: {
  item: Item
  clickEvent: () => void
}) => {
  return (
    <Card>
      <CardActionArea onClick={clickEvent} onDragStart={(e) => e.preventDefault()}>
        <CardMedia
          component="img"
          alt="image"
          image={image}
          style={{
            objectFit: 'cover',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {heading}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
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
