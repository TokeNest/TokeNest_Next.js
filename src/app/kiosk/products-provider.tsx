'use client'
import React, { createContext, useContext, useState } from 'react'
import { Product } from '@/variables/interface/kiosk-interface'

interface ProductsContextType {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}
export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
})
export default function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProductsContext() {
  return useContext(ProductsContext)
}
