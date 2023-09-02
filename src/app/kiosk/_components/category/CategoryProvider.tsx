'use client'

import React, { createContext, useContext, useState } from 'react'

interface CategoryContextType {
  categoryIndex: number
  setCategoryIndex: React.Dispatch<React.SetStateAction<number>>
}

export const CategoryContext = createContext<CategoryContextType>({
  categoryIndex: 0,
  setCategoryIndex: () => {},
})

export default function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categoryIndex, setCategoryIndex] = useState(0)
  return (
    <CategoryContext.Provider value={{ categoryIndex, setCategoryIndex }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategoryContext = () => useContext(CategoryContext)
