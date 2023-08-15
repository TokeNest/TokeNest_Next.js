'use client'

import React, { createContext, useContext, useState } from 'react'

interface DrawerContextType {
  isShowDrawer: boolean
  setIsShowDrawer: (value: boolean) => void
}
export const DrawerContext = createContext<DrawerContextType>({
  isShowDrawer: true,
  setIsShowDrawer: () => {},
} as DrawerContextType)
export default function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isShowDrawer, setIsShowDrawer] = useState(false)
  return (
    <DrawerContext.Provider value={{ isShowDrawer, setIsShowDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawerContext() {
  return useContext(DrawerContext)
}
