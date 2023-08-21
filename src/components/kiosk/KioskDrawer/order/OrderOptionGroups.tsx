'use component'
import { Box, Divider } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'
import {
  CheckboxOptionGroup,
  RadioOptionGroup,
} from '@/components/kiosk/KioskDrawer/order/OptionGroup'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'
import { Product } from '@/variables/interface/kiosk-interface'

export default function OrderOptionGroups() {
  const { product } = useDrawerContext()
  const { optionGroups } = product as Product
  return optionGroups.map((optionGroup) => {
    const { optionGroupId, optionGroupType, optionGroupName } = optionGroup
    return (
      <Box sx={{ py: 6 }} key={optionGroupId}>
        <Divider component="div" textAlign="left" role="presentation">
          <Typography variant="h4">{optionGroupName}</Typography>
        </Divider>
        {optionGroupType === OPTION_TYPE.RADIO && <RadioOptionGroup optionGroup={optionGroup} />}
        {optionGroupType === OPTION_TYPE.CHECKBOX && (
          <CheckboxOptionGroup optionGroup={optionGroup} />
        )}
      </Box>
    )
  })
}
