'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useDrawerContext } from '@/app/kiosk/drawer-provider'

export function NavigationEvents() {
  const pathname = usePathname()
  const { setDrawerIsOpen } = useDrawerContext()
  useEffect(() => {
    if (pathname.includes('/kiosk/cart') || pathname.includes('/kiosk/order')) {
      setDrawerIsOpen(true)
    }
  }, [pathname, setDrawerIsOpen])

  return null
}
