import * as React from 'react'
import Box from '@mui/material/Box'

export default function HomePage() {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        borderRadius: 6,
        p: 4,
      }}
    >
      Home
    </Box>
  )
}
