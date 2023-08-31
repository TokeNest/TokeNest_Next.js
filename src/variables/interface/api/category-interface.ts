import { FileInfo } from '@/variables/interface/api/file-interface'
import { ProductOptionGroupInfo } from '@/variables/interface/api/product-option-group-interface'

export interface CategoryInfo {
  category: string
  products: ProductInfoWithCategory[]
}

export interface ProductInfoWithCategory {
  productName: string
  productIntro: string
  productInfo: string
  productPrice: number
  file: FileInfo
  productOptionGroups: ProductOptionGroupInfo[]
}

export interface CategoryInfoClient extends CategoryInfo {
  id: string
}
