import {
  ProductOptionInfo,
  ProductOptionInfoClient,
} from '@/variables/interface/api/product-option-interface'

export interface ProductOptionGroupInfo {
  productOptionGroupName: string
  productOptionGroupType: string
  productOptions: ProductOptionInfo[]
}

export interface ProductOptionGroupInfoCreate extends ProductOptionGroupInfo {
  save?(): any
}

export interface ProductOptionGroupInfoDelete extends ProductOptionGroupInfoCreate {
  deletedDate: Date
}

export interface ProductOptionGroupInfoClient extends ProductOptionGroupInfo {
  id: string
  productOptions: ProductOptionInfoClient[]
}
