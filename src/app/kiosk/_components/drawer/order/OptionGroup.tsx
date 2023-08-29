'use client'
import { AppDispatch, useAppSelector } from '@/redux/store'
import * as React from 'react'
import { useCallback, useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setOrderProductOptionIds } from '@/redux/slice/order-product-slice'
import { ProductOptionGroupInfoClient } from '@/variables/interface/api/product-option-group'

export function RadioOptionGroup({
  optionGroup: { productOptions, id },
}: {
  optionGroup: ProductOptionGroupInfoClient
}) {
  const { marketList } = useAppSelector(({ marketReducer }) => marketReducer)
  const dispatch = useDispatch<AppDispatch>()
  const [tabValue, setTabValue] = useState(
    productOptions.find(({ productOptionIsDefault }) => productOptionIsDefault)?.id
  )
  const handleChange = useCallback(
    (_: React.SyntheticEvent, id: string) => {
      dispatch(setOrderProductOptionIds({ optionGroupId: id, optionIds: [id] }))
      setTabValue(id)
    },
    [dispatch]
  )

  return (
    <Tabs value={tabValue} onChange={handleChange} centered>
      {productOptions.map(({ productOptionName, id }) => (
        <Tab key={id} value={id} label={productOptionName} sx={{ flexGrow: 1 }} />
      ))}
    </Tabs>
  )
}

export function CheckboxOptionGroup({
  optionGroup: { productOptions },
}: {
  optionGroup: ProductOptionGroupInfoClient
}) {
  return (
    <div>
      {productOptions.map((res) => (
        <div key={res.id}>{res.id}</div>
      ))}
    </div>
  )
}
