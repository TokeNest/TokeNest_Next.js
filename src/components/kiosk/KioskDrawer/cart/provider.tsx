'use client'

import React, { createContext, useContext, useState } from 'react'

interface KioskListContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const KioskListContext = createContext<KioskListContextType>({
  open: false,
  setOpen: () => {},
})

export function KioskListProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return <KioskListContext.Provider value={{ open, setOpen }}>{children}</KioskListContext.Provider>
}

export const useKioskListContext = () => useContext(KioskListContext)

interface KioskCartPriceContextType {
  totalPrice: number
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>
}

export const KioskCartPriceContext = createContext<KioskCartPriceContextType>({
  totalPrice: 0,
  setTotalPrice: () => {},
})
export function KioskCartPriceProvider({ children }: { children: React.ReactNode }) {
  const [totalPrice, setTotalPrice] = useState(0)
  return (
    <KioskCartPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
      {children}
    </KioskCartPriceContext.Provider>
  )
}
export const useKioskCartPriceContext = () => useContext(KioskCartPriceContext)
