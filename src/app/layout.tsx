import * as React from 'react'
import Box from '@mui/material/Box'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import AppHeader from '@/components/AppHeader'
import Container from '@mui/material/Container'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppHeader />
          <Container>
            <Box
              component="main"
              sx={{
                height: 1920,
                width: 1200,
                overflow: 'hidden',
                bgcolor: 'background.default',
                mt: ['48px', '56px', '64px'],
                p: 5,
              }}
            >
              {children}
            </Box>
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  )
}
