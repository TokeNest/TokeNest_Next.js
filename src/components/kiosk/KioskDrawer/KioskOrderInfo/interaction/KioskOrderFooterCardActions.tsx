'use client'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { birdOvo } from '@/variables/mock/asciiArt'
import { addCartBasket } from '@/redux/slice/cart-slice'
import { CardActions } from '@mui/material'
import React from 'react'

export default function KioskOrderFooterCardActions({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const { setIsShowDrawer } = useDrawerContext()
  const handleAddCartBasket = () => {
    console.log(birdOvo)
    dispatch(addCartBasket([birdOvo]))
    setIsShowDrawer(false)
  }
  return (
    <CardActions
      sx={{
        height: 96,
        alignItems: 'stretch',
      }}
      onClick={handleAddCartBasket}
    >
      {children}
    </CardActions>
  )
}
