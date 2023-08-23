import * as React from 'react'
import { Collapse, IconButton } from '@mui/material'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { useKioskListContext } from '@/components/kiosk/KioskDrawer/cart/KioskListProvider'
import Typography from '@mui/material/Typography'
import { Option } from '@/variables/interface/kiosk-interface'
import { useAppSelector } from '@/redux/store'
import { getOptionMarketPrice } from '@/utils/component/calculate-util'

export function OpenDetailInfoBtn() {
  const { open, setOpen } = useKioskListContext()
  return (
    <IconButton edge="end" aria-label="open" onClick={() => setOpen(!open)}>
      <KeyboardArrowDown
        sx={{
          transform: `rotate(${open ? 180 : 0}deg)`,
          transition: '0.2s',
        }}
      />
    </IconButton>
  )
}

export function ListItemDetailInfo({ children }: { children: React.ReactNode }) {
  const { open } = useKioskListContext()
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      {children}
    </Collapse>
  )
}

export function ListItemCalculatePrice({
  quantity,
  productPrice,
  options,
}: {
  quantity: number
  productPrice: number
  options: Option[]
}) {
  const { marketList } = useAppSelector(({ marketReducer }) => marketReducer)
  const totalPrice = (
    options.reduce(
      (pre, { optionPrice, tokenOption }) =>
        pre + getOptionMarketPrice(optionPrice, tokenOption, marketList),
      productPrice
    ) * quantity
  ).toFixed(0)
  return (
    <Typography variant="h4" align="right" fontWeight="bold">
      {totalPrice}원
    </Typography>
  )
}
