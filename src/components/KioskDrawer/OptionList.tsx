import { ProductOption } from '@/variables/interface/kiosk-api'
import { Box, Divider, Tab, Tabs } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'

export const OptionList = ({ option }: { option: ProductOption }) => {
  const { optionName, optionInfo, defaultValue } = option
  const [tabValue, setTabValue] = React.useState(defaultValue)
  const handleChange = (_: React.SyntheticEvent, newValue: number) => setTabValue(newValue)
  return (
    <Box
      sx={{
        py: 6,
      }}
    >
      <Divider component="div" textAlign="left" role="presentation">
        <Typography variant="h4">{optionName}</Typography>
      </Divider>
      <Tabs value={tabValue} onChange={handleChange} centered>
        {optionInfo.map(({ label, value: optionValue }, i) => (
          <Tab
            key={i}
            value={optionValue}
            label={label}
            sx={{
              flexGrow: 1,
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}
