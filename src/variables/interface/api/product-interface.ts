import { FileInfo } from '@/variables/interface/api/file-interface'
import {
  ProductOptionGroupInfo,
  ProductOptionGroupInfoClient,
} from '@/variables/interface/api/product-option-group'

export interface ProductInfo {
  productName: string
  productIntro: string
  productInfo: string
  productPrice: number
  file: FileInfo
  productOptionGroups: ProductOptionGroupInfo[]
}

export interface ProductInfoCreate extends ProductInfo {
  save(): any
}

export interface ProductInfoClient extends ProductInfo {
  id: string
  productOptionGroups: ProductOptionGroupInfoClient[]
}
