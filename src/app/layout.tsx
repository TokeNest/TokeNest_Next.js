import * as React from 'react'
import ThemeRegistry from '@/app/_components/ThemeRegistry/ThemeRegistry'
import AppHeader from '@/app/_components/AppHeader'
import { ReduxProvider } from '@/redux/provider'
import { Container } from '@mui/material'
import Web3Provider from '@/web3/Web3Provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Web3Provider>
            <ThemeRegistry>
              <AppHeader />
              <Container
                component="main"
                maxWidth="lg"
                disableGutters
                sx={{ position: 'relative', overflow: 'hidden', pt: '4rem', minHeight: 1920 }}
              >
                {children}
              </Container>
            </ThemeRegistry>
          </Web3Provider>
        </ReduxProvider>
      </body>
    </html>
  )
}
