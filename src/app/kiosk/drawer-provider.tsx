'use client'

import React, { createContext, useContext, useState } from 'react'
import { Product } from '@/variables/interface/kiosk-interface'
import { DRAWER_TYPE } from '@/variables/enum/kiosk-enum'

interface DrawerContextType {
  drawerState: { isShow: boolean; type: DRAWER_TYPE }
  setDrawerState: React.Dispatch<React.SetStateAction<{ isShow: boolean; type: DRAWER_TYPE }>>
  product: Product | null
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>
}
export const DrawerContext = createContext<DrawerContextType>({
  drawerState: { isShow: false, type: DRAWER_TYPE.CART },
  setDrawerState: () => {},
  product: null,
  setProduct: () => {},
} as DrawerContextType)

export default function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [drawerState, setDrawerState] = useState({ isShow: false, type: DRAWER_TYPE.CART })
  const [product, setProduct] = useState<Product | null>(null)
  return (
    <DrawerContext.Provider value={{ drawerState, setDrawerState, product, setProduct }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawerContext() {
  return useContext(DrawerContext)
}
