'use client'

import React, { createContext, useContext, useState } from 'react'
import { Product } from '@/variables/interface/kiosk-interface'

interface DrawerContextType {
  isShowDrawer: boolean
  setIsShowDrawer: (value: boolean) => void
  product: Product | null
  setProduct: (value: Product) => void
}
export const DrawerContext = createContext<DrawerContextType>({
  isShowDrawer: true,
  setIsShowDrawer: () => {},
  product: null,
  setProduct: () => {},
} as DrawerContextType)

export default function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isShowDrawer, setIsShowDrawer] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  return (
    <DrawerContext.Provider value={{ isShowDrawer, setIsShowDrawer, product, setProduct }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawerContext() {
  return useContext(DrawerContext)
}
