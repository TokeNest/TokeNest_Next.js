'use client'

import React, { createContext, useContext, useState } from 'react'

interface DrawerContextType {
  drawerIsOpen: boolean
  setDrawerIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const DrawerContext = createContext<DrawerContextType>({
  drawerIsOpen: false,
  setDrawerIsOpen: () => {},
} as DrawerContextType)

export default function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  return (
    <DrawerContext.Provider value={{ drawerIsOpen, setDrawerIsOpen }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawerContext() {
  return useContext(DrawerContext)
}
