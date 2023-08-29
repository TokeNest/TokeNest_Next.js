'use client'
import { CardContent } from '@mui/material'
import React from 'react'

export default function ProductContainer({ children }: { children: React.ReactNode }) {
  return <CardContent sx={{ px: 4 }}>{children}</CardContent>
}
