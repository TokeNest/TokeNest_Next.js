'use client'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import Grid from '@mui/material/Unstable_Grid2'
import { ButtonGroup, CardActions } from '@mui/material'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { minusProductQuantity, plusProductQuantity } from '@/redux/slice/order-info-slice'
import RemoveIcon from '@mui/icons-material/Remove'
import * as React from 'react'

export default function KioskProductQuantityButton() {
  const dispatch = useDispatch<AppDispatch>()
  const { productQuantity } = useAppSelector(({ orderInfoReducer }) => orderInfoReducer)
  return (
    <Grid xs={12}>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonGroup size="large" variant="text" aria-label="text button group">
          <Button startIcon={<AddIcon />} onClick={() => dispatch(plusProductQuantity())}>
            더하기
          </Button>
          <Button disableRipple sx={{ px: 4 }}>
            {productQuantity}
          </Button>
          <Button endIcon={<RemoveIcon />} onClick={() => dispatch(minusProductQuantity())}>
            빼기
          </Button>
        </ButtonGroup>
      </CardActions>
    </Grid>
  )
}
