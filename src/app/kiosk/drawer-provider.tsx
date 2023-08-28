'use client'

import React, { createContext, useContext, useState } from 'react'
import { Product } from '@/variables/interface/kiosk-interface'

interface DrawerContextType {
  product: Product | null
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>
}
export const DrawerContext = createContext<DrawerContextType>({
  product: null,
  setProduct: () => {},
} as DrawerContextType)

export default function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null)
  return <DrawerContext.Provider value={{ product, setProduct }}>{children}</DrawerContext.Provider>
}

export function useDrawerContext() {
  return useContext(DrawerContext)
}
