import { OptionCheckboxGroup, OptionGroup, OptionRadioGroup } from '@/variables/interface/kiosk'
import { Box, Divider, Tab, Tabs } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useState } from 'react'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'

export default function OptionGroups({
  handleChangeProductPrice,
  optionGroups,
}: {
  handleChangeProductPrice: (totalPrice: number) => void
  optionGroups: OptionGroup[]
}) {
  const [optionGroupPrice, setOptionGroupPrice] = useState(
    optionGroups.map((optionGroup) => {
      switch (optionGroup.optionGroupType) {
        case OPTION_TYPE.RADIO: {
          const { optionGroupId, defaultOptionId, options } = optionGroup
          return {
            optionGroupId,
            totalPrice:
              options.find(({ optionId }) => optionId === defaultOptionId)?.optionPrice ?? 0,
          }
        }
        case OPTION_TYPE.CHECKBOX: {
          const { optionGroupId, defaultOptionIds, options } = optionGroup
          return {
            optionGroupId,
            totalPrice: options
              .filter(({ optionId }) => defaultOptionIds.includes(optionId))
              .reduce((pre, { optionPrice }) => pre + optionPrice, 0),
          }
        }
      }
    })
  )
  const handleChangeOption = (optionGroupId: number, totalPrice: number) => {
    setOptionGroupPrice((state) => {
      const optionGroup = state.find(({ optionGroupId: id }) => id === optionGroupId)
      if (optionGroup) {
        optionGroup.totalPrice = totalPrice
      }
      return state
    })
    handleChangeProductPrice(optionGroupPrice.reduce((pre, { totalPrice }) => pre + totalPrice, 0))
  }

  return optionGroups.map((optionGroup) => {
    const { optionGroupId, optionGroupType, optionGroupName } = optionGroup
    return (
      <Box
        sx={{
          py: 6,
        }}
        key={optionGroupId}
      >
        <Divider component="div" textAlign="left" role="presentation">
          <Typography variant="h4">{optionGroupName}</Typography>
        </Divider>
        {optionGroupType === OPTION_TYPE.RADIO && (
          <RadioOptionGroup optionGroup={optionGroup} handleChangeOption={handleChangeOption} />
        )}
        {optionGroupType === OPTION_TYPE.CHECKBOX && (
          <CheckboxOptionGroup optionGroup={optionGroup} handleChangeOption={handleChangeOption} />
        )}
      </Box>
    )
  })
}
function RadioOptionGroup({
  optionGroup: { options, defaultOptionId, optionGroupId },
  handleChangeOption,
}: {
  optionGroup: OptionRadioGroup
  handleChangeOption: (optionGroupId: number, totalPrice: number) => void
}) {
  const [tabValue, setTabValue] = useState(defaultOptionId)
  const handleChange = (_: React.SyntheticEvent, id: number) => {
    setTabValue(id)
    const option = options.find(({ optionId }) => optionId === id)
    if (option) {
      handleChangeOption(optionGroupId, option.optionPrice)
    }
  }
  return (
    <Tabs value={tabValue} onChange={handleChange} centered>
      {options.map(({ optionName, optionId }) => (
        <Tab
          key={optionId}
          value={optionId}
          label={optionName}
          sx={{
            flexGrow: 1,
          }}
        />
      ))}
    </Tabs>
  )
}

function CheckboxOptionGroup({
  optionGroup: { options, defaultOptionIds, optionGroupId },
  handleChangeOption,
}: {
  optionGroup: OptionCheckboxGroup
  handleChangeOption: (optionGroupId: number, totalPrice: number) => void
}) {
  return (
    <div>
      {options.map((res, i) => (
        <div key={i}>{res.optionId}</div>
      ))}
      {defaultOptionIds}
    </div>
  )
}
