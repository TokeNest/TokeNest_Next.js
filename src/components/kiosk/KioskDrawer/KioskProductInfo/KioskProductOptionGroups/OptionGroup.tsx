'use client'
import { OptionCheckboxGroup, OptionRadioGroup } from '@/variables/interface/kiosk-interface'
import { useAppSelector } from '@/redux/store'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { setCalculateOptionPrice } from '@/utils/calculate-util'
import { Tab, Tabs } from '@mui/material'

export function RadioOptionGroup({
  optionGroup: { options, defaultOptionId, optionGroupId },
  handleChangeOption,
}: {
  optionGroup: OptionRadioGroup
  handleChangeOption: (optionGroupId: number, totalPrice: number) => void
}) {
  const { marketList } = useAppSelector(({ marketReducer }) => marketReducer)
  const [tabValue, setTabValue] = useState(defaultOptionId)
  const handleChange = (_: React.SyntheticEvent, id: number) => setTabValue(id)
  useEffect(() => {
    const option = options.find(({ optionId }) => optionId === tabValue)
    if (option) {
      const { tokenOption, optionPrice } = option
      handleChangeOption(
        optionGroupId,
        setCalculateOptionPrice(marketList, optionPrice, tokenOption)
      )
    }
  }, [handleChangeOption, optionGroupId, options, marketList, tabValue])

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

export function CheckboxOptionGroup({
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
