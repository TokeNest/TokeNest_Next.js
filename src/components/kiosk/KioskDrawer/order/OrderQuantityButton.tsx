import Grid from '@mui/material/Unstable_Grid2'
import { ButtonGroup, CardActions } from '@mui/material'
import * as React from 'react'
import { QuantityButtonGroup } from '@/components/kiosk/KioskDrawer/order/interaction'

export default function OrderQuantityButton() {
  return (
    <Grid xs={12}>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonGroup size="large" variant="text" aria-label="text button group">
          <QuantityButtonGroup />
        </ButtonGroup>
      </CardActions>
    </Grid>
  )
}
