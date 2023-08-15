import { Card, Container } from '@mui/material'
import * as React from 'react'

export default function KioskOrderInfo({ children }: { children: React.ReactNode }) {
  return (
    <Container
      sx={{
        height: 1,
      }}
    >
      <Card
        elevation={0}
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Card>
    </Container>
  )
}
