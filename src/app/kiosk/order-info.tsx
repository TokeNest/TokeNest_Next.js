import {
  ButtonGroup,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Paper,
} from '@mui/material'
import { closeDrawer } from '@/redux/slice/drawer-slice'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'
import { OptionList } from '@/components/KioskDrawer/OptionList'
import { Product } from '@/api/kiosk-api'

const KioskHeader = ({ clickEvent }: { clickEvent: () => void }) => {
  return (
    <CardHeader
      action={
        <IconButton size="large" onClick={clickEvent} children={<ArrowBackIosNewRoundedIcon />} />
      }
      title={<Typography variant="h4">주문 옵션</Typography>}
      sx={{
        '& .MuiCardHeader-action': {
          p: '12px',
          order: 0,
        },
        '& .MuiCardHeader-content': {
          order: 1,
        },
        height: 96,
      }}
    />
  )
}
const KioskFooter = ({ clickEvent }: { clickEvent: () => void }) => {
  return (
    <CardActions
      sx={{
        height: 96,
        alignItems: 'stretch',
      }}
    >
      <Button
        variant="outlined"
        size="large"
        color="primary"
        sx={{
          flexGrow: 1,
        }}
        onClick={clickEvent}
      >
        장바구니 담기
      </Button>
    </CardActions>
  )
}
export const OrderInfo = ({ product }: { product: Product | null }) => {
  const dispatch = useDispatch<AppDispatch>()
  const closeEvent = () => dispatch(closeDrawer())
  if (product === null) return <div />
  const { name, imageUrl, description, price, options } = product
  return (
    <Card
      elevation={0}
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <KioskHeader clickEvent={closeEvent} />
      <CardContent
        sx={{
          height: 1,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
          }}
        >
          <CardMedia
            component="img"
            alt="image"
            image={imageUrl}
            sx={{
              width: 400,
              height: 400,
              p: 1,
              borderRadius: 6,
            }}
          />
          <Grid container justifyContent="space-around">
            <Grid xs={12}>
              <CardHeader
                title={<Typography variant="h3">{name}</Typography>}
                subheader={
                  <Typography align="right" variant="h4" sx={{ color: 'text.secondary' }}>
                    {price}
                  </Typography>
                }
              />
            </Grid>
            <Grid xs={12}>
              <Typography
                sx={{
                  px: 4,
                }}
                variant="h4"
              >
                {description}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonGroup size="large" variant="text" aria-label="text button group">
                  <Button startIcon={<AddIcon />}>더하기</Button>
                  <Button disableRipple sx={{ px: 4 }}>
                    0
                  </Button>
                  <Button endIcon={<RemoveIcon />}>빼기</Button>
                </ButtonGroup>
              </CardActions>
            </Grid>
          </Grid>
        </Paper>
        {options.map((option) => (
          <OptionList option={option} />
        ))}
      </CardContent>
      <KioskFooter clickEvent={closeEvent} />
    </Card>
  )
}
