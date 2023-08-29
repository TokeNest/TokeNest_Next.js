'use client'

import React, { createContext, useContext, useState } from 'react'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'

interface DrawerContextType {
  drawerIsOpen: boolean
  setDrawerIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  product: ProductInfoClient | null
  setProduct: React.Dispatch<React.SetStateAction<ProductInfoClient | null>>
}
export const DrawerContext = createContext<DrawerContextType>({
  drawerIsOpen: false,
  setDrawerIsOpen: () => {},
  product: null,
  setProduct: () => {},
} as DrawerContextType)

export default function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [product, setProduct] = useState<ProductInfoClient | null>(null)
  return (
    <DrawerContext.Provider value={{ drawerIsOpen, setDrawerIsOpen, product, setProduct }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawerContext() {
  return useContext(DrawerContext)
}
