'use client'
import { useCategoryContext } from '@/app/kiosk/_components/category/CategoryProvider'
import { Box, Fade } from '@mui/material'
import React from 'react'

export default function CategoryTabPanel({
  index,
  children,
}: {
  index: number
  children: React.ReactNode
}) {
  const { categoryIndex } = useCategoryContext()
  const isShow = categoryIndex === index
  const boxSx = isShow ? {} : { display: 'none' }
  return (
    <Fade in={isShow} timeout={0}>
      <Box sx={boxSx}>{children}</Box>
    </Fade>
  )
}
