'use client'
import { NumericFormat } from 'react-number-format'
import * as React from 'react'

export default function PriceNumberFormat({
  price,
  disableSuffix = false,
}: {
  price: number
  disableSuffix?: boolean
}) {
  return (
    <NumericFormat
      displayType="text"
      decimalScale={0}
      thousandSeparator
      value={price}
      suffix={disableSuffix ? undefined : '원'}
    />
  )
}
