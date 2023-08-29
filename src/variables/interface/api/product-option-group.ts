import {
  ProductOptionInfo,
  ProductOptionInfoClient,
} from '@/variables/interface/api/product-option-interface'

export interface ProductOptionGroupInfo {
  productOptionGroupName: string
  productOptionGroupType: string
  productOptions: ProductOptionInfo[]
}

export interface ProductOptionGroupInfoServer extends ProductOptionGroupInfo {
  _id: string
  save(): any
}
export interface ProductOptionGroupInfoClient extends ProductOptionGroupInfo {
  id: string
  productOptions: ProductOptionInfoClient[]
}
