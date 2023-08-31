import { FileInfo } from '@/variables/interface/api/file-interface'
import {
  ProductOptionGroupInfo,
  ProductOptionGroupInfoClient,
} from '@/variables/interface/api/product-option-group-interface'

export interface ProductInfo {
  productName: string
  productIntro: string
  productInfo: string
  productPrice: number
  productCategory: string
  file: FileInfo
  productOptionGroups: ProductOptionGroupInfo[]
}

export interface ProductInfoCreate extends ProductInfo {
  save?(): any
}

export interface ProductInfoDelete extends ProductInfoCreate {
  deletedDate: Date
}

export interface ProductInfoClient extends ProductInfo {
  id: string
  productOptionGroups: ProductOptionGroupInfoClient[]
}
