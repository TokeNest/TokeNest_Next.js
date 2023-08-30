import {
  ProductOptionInfo,
  ProductOptionInfoClient,
} from '@/variables/interface/api/product-option-interface'

export interface ProductOptionGroupInfo {
  productOptionGroupName: string
  productOptionGroupType: string
  productOptions: ProductOptionInfo[]
}

export interface ProductOptionGroupInfoSave extends ProductOptionGroupInfo {
  save?(): any
}

export interface ProductOptionGroupInfoDelete extends ProductOptionGroupInfoSave {
  deletedDate: Date
}

export interface ProductOptionGroupInfoClient extends ProductOptionGroupInfo {
  id: string
  productOptions: ProductOptionInfoClient[]
}
