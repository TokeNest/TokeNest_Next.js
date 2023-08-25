'use client'
import { CardContent } from '@mui/material'
import React, { useEffect } from 'react'
import { Product } from '@/variables/interface/kiosk-interface'
import { useProductsContext } from '@/app/kiosk/products-provider'

export default function ProductContainer({
  children,
  products,
}: {
  children: React.ReactNode
  products: Product[]
}) {
  const { setProducts } = useProductsContext()
  useEffect(() => {
    setProducts(products)
  }, [products, setProducts])
  return <CardContent sx={{ px: 4 }}>{children}</CardContent>
}
