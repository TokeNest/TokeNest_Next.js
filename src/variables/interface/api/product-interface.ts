import { FileInfo } from '@/variables/interface/api/file-interface'
import { ProductOptionGroupInfo } from '@/variables/interface/api/product-option-group'

export interface ProductInfo {
  productName: string
  productIntro: string
  productInfo: string
  productPrice: number
  file: FileInfo
  productOptionGroups: ProductOptionGroupInfo[]
}

export interface ProductInfoServer extends ProductInfo {
  _id: string
  save(): any
}

export interface ProductInfoClient extends ProductInfo {
  id: string
}
