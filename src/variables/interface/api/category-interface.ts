import { ProductInfo, ProductInfoClient } from '@/variables/interface/api/product-interface'

export interface CategoryInfo {
  category: string
  products: ProductInfo[]
}

export interface CategoryInfoClient extends CategoryInfo {
  id: string
  products: ProductInfoClient[]
}
