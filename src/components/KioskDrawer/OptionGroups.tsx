import {
  OptionCheckboxGroup,
  OptionGroup,
  OptionRadioGroup,
} from '@/variables/interface/kiosk-interface'
import { Box, Divider, Tab, Tabs } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useState } from 'react'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { updateOptionsState } from '@/redux/slice/order-info-slice'
import { setCalculateOptionPrice } from '@/utils/calculate-util'

export default function OptionGroups({ optionGroups }: { optionGroups: OptionGroup[] }) {
  const dispatch = useDispatch<AppDispatch>()
  const handleChangeOption = (optionGroupId: number, totalPrice: number) => {
    dispatch(
      updateOptionsState({
        optionGroupId,
        totalPrice,
      })
    )
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
  const { marketList } = useAppSelector(({ marketReducer }) => marketReducer.value)
  const [tabValue, setTabValue] = useState(defaultOptionId)
  const handleChange = (_: React.SyntheticEvent, id: number) => {
    setTabValue(id)
    const option = options.find(({ optionId }) => optionId === id)
    if (option) {
      const { tokenOption, optionPrice } = option
      handleChangeOption(
        optionGroupId,
        setCalculateOptionPrice(marketList, optionPrice, tokenOption)
      )
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
