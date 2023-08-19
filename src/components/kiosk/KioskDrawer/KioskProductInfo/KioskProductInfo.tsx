import * as React from 'react'
import CardContent from '@mui/material/CardContent'

export default function KioskProductInfo({ children }: { children: React.ReactNode }) {
  return (
    <CardContent
      sx={{
        height: 1,
      }}
    >
      {children}
    </CardContent>
  )
}
