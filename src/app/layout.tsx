import * as React from 'react'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import AppHeader from '@/components/AppHeader'
import { ReduxProvider } from '@/redux/provider'
import { Web3ContextProvider } from '@/web3/Web3Provider'
import { Container } from '@mui/material'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Web3ContextProvider>
            <ThemeRegistry>
              <AppHeader />
              <Container
                component="main"
                maxWidth="lg"
                disableGutters
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  pt: '4rem',
                  minHeight: 1920,
                }}
              >
                {children}
              </Container>
            </ThemeRegistry>
          </Web3ContextProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
