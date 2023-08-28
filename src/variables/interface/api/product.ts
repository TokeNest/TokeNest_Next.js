import { FileInfoWithId } from '@/variables/interface/api/file'
import { ProductOptionGroupInfo } from '@/variables/interface/api/productOptionGroup'

export interface ProductInfo {
  productName: string
  productIntro: string
  productInfo: string
  productPrice: number
  file: FileInfoWithId
  productOptionGroups: ProductOptionGroupInfo[]

  save(): any
}
