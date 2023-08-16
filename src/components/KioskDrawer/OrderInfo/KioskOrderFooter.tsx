import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { CardActions } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { addCartBasket } from '@/redux/slice/cart-slice'
import { birdOvo } from '@/variables/mock/asciiArt'

export default function KioskOrderFooter() {
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
    >
      <Button
        variant="outlined"
        size="large"
        color="primary"
        sx={{
          flexGrow: 1,
        }}
        onClick={handleAddCartBasket}
      >
        장바구니 담기
      </Button>
    </CardActions>
  )
}
