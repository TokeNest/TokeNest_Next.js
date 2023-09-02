'use client'
import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { useCategoryContext } from '@/app/kiosk/_components/category/CategoryProvider'

export default function CategoryTabContext({ categories }: { categories: string[] }) {
  const { categoryIndex, setCategoryIndex } = useCategoryContext()
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCategoryIndex(newValue)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#ffffff' }}>
        <Tabs value={categoryIndex} onChange={handleChange} variant="fullWidth">
          {categories.map((category, i) => (
            <Tab key={i} label={category} />
          ))}
        </Tabs>
      </Box>
    </Box>
  )
}
