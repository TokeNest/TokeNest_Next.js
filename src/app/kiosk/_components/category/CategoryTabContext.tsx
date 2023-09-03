'use client'
import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { useCategoryContext } from '@/app/kiosk/_components/category/CategoryProvider'
import Typography from '@mui/material/Typography'

export default function CategoryTabContext({ categories }: { categories: string[] }) {
  const { categoryIndex, setCategoryIndex } = useCategoryContext()
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCategoryIndex(newValue)
  }
  return (
    <Box bgcolor="primary.light">
      <Tabs
        value={categoryIndex}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="inherit"
      >
        {categories.map((category, i) => (
          <Tab
            key={i}
            label={
              <Typography color="white" fontWeight="bold">
                {category}
              </Typography>
            }
          />
        ))}
      </Tabs>
    </Box>
  )
}
