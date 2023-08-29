'use client'

import React, { createContext, useContext, useState } from 'react'
import { ProductInfo } from '@/variables/interface/api/product-interface'

interface DrawerContextType {
  drawerIsOpen: boolean
  setDrawerIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  product: ProductInfo | null
  setProduct: React.Dispatch<React.SetStateAction<ProductInfo | null>>
}
export const DrawerContext = createContext<DrawerContextType>({
  drawerIsOpen: false,
  setDrawerIsOpen: () => {},
  product: null,
  setProduct: () => {},
} as DrawerContextType)

export default function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [product, setProduct] = useState<ProductInfo | null>(null)
  return (
    <DrawerContext.Provider value={{ drawerIsOpen, setDrawerIsOpen, product, setProduct }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawerContext() {
  return useContext(DrawerContext)
}
