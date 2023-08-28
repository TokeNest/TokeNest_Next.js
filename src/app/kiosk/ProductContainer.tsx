'use client'
import { CardContent } from '@mui/material'
import React from 'react'
import { Product } from '@/variables/interface/kiosk-interface'

export default function ProductContainer({
  children,
  products,
}: {
  children: React.ReactNode
  products: Product[]
}) {
  return <CardContent sx={{ px: 4 }}>{children}</CardContent>
}
