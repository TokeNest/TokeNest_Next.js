import { CardContent, List } from '@mui/material'
import * as React from 'react'
import KioskListItem from './KioskListItem'
import KioskListProvider from '@/components/kiosk/KioskDrawer/cart/KioskListProvider'
import { useAppSelector } from '@/redux/store'

export default function KioskCartBody() {
  const { basket } = useAppSelector(({ cartReducer }) => cartReducer)
  return (
    <CardContent sx={{ height: 8 / 10 }}>
      <List>
        {basket.map((_, i) => (
          <KioskListProvider key={i}>
            <KioskListItem />
          </KioskListProvider>
        ))}
      </List>
    </CardContent>
  )
}
