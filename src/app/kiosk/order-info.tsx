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
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'
import OptionGroup from '@/components/KioskDrawer/OptionGroup'
import { Product } from '@/variables/interface/kiosk'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'

export default function OrderInfo({ product }: { product: Product | null }) {
  const dispatch = useDispatch<AppDispatch>()
  const handleCloseDrawer = () => dispatch(closeDrawer())
  if (product === null) return <div />
  return (
    <Card
      elevation={0}
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <KioskHeader clickEvent={handleCloseDrawer} />
      <KioskProductInfo product={product} />
      <KioskFooter clickEvent={handleCloseDrawer} />
    </Card>
  )
}

function KioskHeader({ clickEvent }: { clickEvent: () => void }) {
  return (
    <CardHeader
      action={
        <IconButton size="large" onClick={clickEvent}>
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
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

function KioskProductInfo({ product }: { product: Product }) {
  const { productName, productInfo, productPrice, productImageUrl, optionGroups } = product
  const [calculatePrice, setCalculatePrice] = useState(productPrice)
  const [optionGroupTotalPrice, setOptionGroupTotalPrice] = useState(
    optionGroups.map((optionGroup) => {
      switch (optionGroup.optionGroupType) {
        case OPTION_TYPE.RADIO: {
          const { optionGroupId, defaultOptionId, options } = optionGroup
          return {
            optionGroupId,
            totalPrice:
              options.find(({ optionId }) => optionId === defaultOptionId)?.optionPrice ?? 0,
          }
        }
        case OPTION_TYPE.CHECKBOX: {
          const { optionGroupId, defaultOptionIds, options } = optionGroup
          return {
            optionGroupId,
            totalPrice: options
              .filter(({ optionId }) => defaultOptionIds.includes(optionId))
              .reduce((pre, { optionPrice }) => pre + optionPrice, 0),
          }
        }
      }
    })
  )
  const handleChangeOptionPrice = (optionGroupId: number, totalPrice: number) => {
    setOptionGroupTotalPrice((state) => {
      const optionGroup = state.find(({ optionGroupId: id }) => id === optionGroupId)
      if (optionGroup) {
        optionGroup.totalPrice = totalPrice
      }
      return state
    })
    setCalculatePrice(
      optionGroupTotalPrice.reduce((pre, { totalPrice }) => pre + totalPrice, productPrice)
    )
  }
  return (
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
          image={productImageUrl}
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
              title={<Typography variant="h3">{productName}</Typography>}
              subheader={
                <Typography align="right" variant="h4" sx={{ color: 'text.secondary' }}>
                  {calculatePrice}
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
              {productInfo}
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
      {optionGroups.map((optionGroup) => (
        <OptionGroup
          key={optionGroup.optionGroupId}
          optionGroup={optionGroup}
          handleChangeOptionPrice={handleChangeOptionPrice}
        />
      ))}
    </CardContent>
  )
}

function KioskFooter({ clickEvent }: { clickEvent: () => void }) {
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
