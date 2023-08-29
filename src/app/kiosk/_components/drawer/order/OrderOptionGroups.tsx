import { Box, Divider } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'
import {
  CheckboxOptionGroup,
  RadioOptionGroup,
} from '@/app/kiosk/_components/drawer/order/OptionGroup'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'

export default function OrderOptionGroups({ product }: { product: ProductInfoClient }) {
  return product.productOptionGroups.map((optionGroup) => {
    const { id, productOptionGroupType, productOptionGroupName } = optionGroup
    return (
      <Box sx={{ py: 6 }} key={id}>
        <Divider component="div" textAlign="left" role="presentation">
          <Typography variant="h4">{productOptionGroupName}</Typography>
        </Divider>
        {productOptionGroupType === OPTION_TYPE.RADIO && (
          <RadioOptionGroup optionGroup={optionGroup} />
        )}
        {productOptionGroupType === OPTION_TYPE.CHECKBOX && (
          <CheckboxOptionGroup optionGroup={optionGroup} />
        )}
      </Box>
    )
  })
}
