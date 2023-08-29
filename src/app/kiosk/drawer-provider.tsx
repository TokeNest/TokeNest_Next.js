'use client'

import React, { createContext, useContext, useState } from 'react'
import { Product } from '@/variables/interface/kiosk-interface'

interface DrawerContextType {
  drawerIsOpen: boolean
  setDrawerIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  product: Product | null
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>
}
export const DrawerContext = createContext<DrawerContextType>({
  drawerIsOpen: false,
  setDrawerIsOpen: () => {},
  product: null,
  setProduct: () => {},
} as DrawerContextType)

export default function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  return (
    <DrawerContext.Provider value={{ drawerIsOpen, setDrawerIsOpen, product, setProduct }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawerContext() {
  return useContext(DrawerContext)
}
