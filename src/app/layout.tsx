import * as React from 'react'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import AppHeader from '@/components/AppHeader'
import { ReduxProvider } from '@/redux/provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeRegistry>
            <AppHeader />
            {children}
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  )
}
