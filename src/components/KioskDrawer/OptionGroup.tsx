import { Option, OptionGroup } from '@/variables/interface/kiosk'
import { Box, Divider, Tab, Tabs } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useState } from 'react'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'

export default function OptionGroup({
  optionGroup,
  handleChangeOptionPrice,
}: {
  optionGroup: OptionGroup
  handleChangeOptionPrice: (optionGroupId: number, totalPrice: number) => void
}) {
  const { optionGroupId, optionGroupName, optionGroupType, options } = optionGroup
  // const { marketList } = useAppSelector(({ marketReducer }) => marketReducer.value)
  const handleChangeOption = (totalPrice: number) =>
    handleChangeOptionPrice(optionGroupId, totalPrice)
  return (
    <Box
      sx={{
        py: 6,
      }}
    >
      <Divider component="div" textAlign="left" role="presentation">
        <Typography variant="h4">{optionGroupName}</Typography>
      </Divider>
      {optionGroupType === OPTION_TYPE.RADIO && (
        <RadioOptionGroup
          options={options}
          defaultOptionId={optionGroup.defaultOptionId}
          handleChangeOption={handleChangeOption}
        />
      )}
      {optionGroupType === OPTION_TYPE.CHECKBOX && (
        <CheckboxOptionGroup
          options={options}
          defaultOptionIds={optionGroup.defaultOptionIds}
          handleChangeOption={handleChangeOption}
        />
      )}
    </Box>
  )
}

function RadioOptionGroup({
  options,
  defaultOptionId,
  handleChangeOption,
}: {
  options: Option[]
  defaultOptionId: number
  handleChangeOption: (totalPrice: number) => void
}) {
  const [tabValue, setTabValue] = useState(defaultOptionId)
  const handleChange = (_: React.SyntheticEvent, id: number) => {
    setTabValue(id)
    const option = options.find(({ optionId }) => optionId === id)
    if (option) {
      handleChangeOption(option.optionPrice)
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
  options,
  defaultOptionIds,
  handleChangeOption,
}: {
  options: Option[]
  defaultOptionIds: number[]
  handleChangeOption: (totalPrice: number) => void
}) {
  return (
    <div>
      {options.map((res, i) => (
        <div key={i}>{res.optionId}</div>
      ))}
      ,{defaultOptionIds}
    </div>
  )
}
