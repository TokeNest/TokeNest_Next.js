import * as React from 'react'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import AppHeader from '@/components/AppHeader'
import { ReduxProvider } from '@/redux/provider'
import { Web3ContextProvider } from '@/web3/web3Provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Web3ContextProvider>
          <ReduxProvider>
            <ThemeRegistry>
              <AppHeader />
              {children}
            </ThemeRegistry>
          </ReduxProvider>
        </Web3ContextProvider>
      </body>
    </html>
  )
}
