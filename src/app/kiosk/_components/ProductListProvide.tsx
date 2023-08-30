'use client'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'
import { useProductsContext } from '@/app/kiosk/products-provider'
import React, { useEffect } from 'react'
import { CardContent } from '@mui/material'

export default function ProductListProvide({
  children,
  products,
}: {
  children: React.ReactNode
  products: ProductInfoClient[]
}) {
  const { setProducts } = useProductsContext()
  useEffect(() => {
    setProducts(products)
  }, [products, setProducts])

  return <CardContent sx={{ px: 4 }}>{children}</CardContent>
}
