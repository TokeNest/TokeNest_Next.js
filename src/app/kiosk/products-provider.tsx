'use client'
import React, { createContext, useContext, useState } from 'react'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'

interface ProductsContextType {
  products: ProductInfoClient[]
  setProducts: React.Dispatch<React.SetStateAction<ProductInfoClient[]>>
}
export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
})
export default function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductInfoClient[]>([])
  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProductsContext() {
  return useContext(ProductsContext)
}
