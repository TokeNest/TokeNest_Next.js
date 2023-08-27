import { CardContent, Paper } from '@mui/material'
import * as React from 'react'
import OrderDetailInfo from '@/app/kiosk/_components/drawer/order/OrderDetailInfo'
import OrderOptionGroups from '@/app/kiosk/_components/drawer/order/OrderOptionGroups'

const productInfoHeight = 400
export default function KioskOrderBody() {
  return (
    <CardContent sx={{ height: 8 / 10 }}>
      <OrderDetailInfo productInfoHeight={productInfoHeight} />
      <Paper elevation={0} sx={{ height: `calc(100% - ${productInfoHeight}px)`, overflow: 'auto' }}>
        <OrderOptionGroups />
      </Paper>
    </CardContent>
  )
}
