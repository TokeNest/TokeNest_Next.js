'use client'
import { OptionGroup } from '@/variables/interface/kiosk-interface'
import { AppDispatch, useAppSelector } from '@/redux/store'
import * as React from 'react'
import { useCallback, useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setOrderProductOptionIds } from '@/redux/slice/order-product-slice'

export function RadioOptionGroup({
  optionGroup: { options, optionGroupId },
}: {
  optionGroup: OptionGroup
}) {
  const { marketList } = useAppSelector(({ marketReducer }) => marketReducer)
  const dispatch = useDispatch<AppDispatch>()
  const [tabValue, setTabValue] = useState(options.find(({ isDefault }) => isDefault)?.optionId)
  const handleChange = useCallback(
    (_: React.SyntheticEvent, id: string) => {
      dispatch(setOrderProductOptionIds({ optionGroupId, optionIds: [id] }))
      setTabValue(id)
    },
    [dispatch, optionGroupId]
  )

  return (
    <Tabs value={tabValue} onChange={handleChange} centered>
      {options.map(({ optionName, optionId }, i) => (
        <Tab key={i} value={optionId} label={optionName} sx={{ flexGrow: 1 }} />
      ))}
    </Tabs>
  )
}

export function CheckboxOptionGroup({ optionGroup: { options } }: { optionGroup: OptionGroup }) {
  return (
    <div>
      {options.map((res, i) => (
        <div key={i}>{res.optionId}</div>
      ))}
    </div>
  )
}
