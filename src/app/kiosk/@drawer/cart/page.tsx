import { CardContent, List, Paper } from '@mui/material'
import * as React from 'react'
import Typography from '@mui/material/Typography'
import { CartItemTotalPrice } from '@/app/kiosk/@drawer/cart/_components/interaction'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'
import { nextFetcher } from '@/utils/component/api-fetcher-util'
import CartList from '@/app/kiosk/@drawer/cart/_components/CartList'

const getCategoryList = async (): Promise<ProductInfoClient[]> => {
  const storeId = '64edd8182040a028b03823c4'
  const data = await nextFetcher(`product/store/${storeId}`, { cache: 'no-store' })
  return data.body
}

export default async function KioskCartPage() {
  const products = await getCategoryList()
  return (
    <CardContent
      sx={{
        height: 8 / 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <List sx={{ overflow: 'auto' }}>
        <CartList products={products} />
      </List>
      <CartProductTotalPrice />
    </CardContent>
  )
}

function CartProductTotalPrice() {
  return (
    <Paper
      sx={{
        height: 100,
        minHeight: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        결제금액
      </Typography>
      <CartItemTotalPrice />
    </Paper>
  )
}
