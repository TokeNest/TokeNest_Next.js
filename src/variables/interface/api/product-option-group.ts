import {
  ProductOptionInfoClient,
  ProductOptionInfoToken,
} from '@/variables/interface/api/product-option-info'

export interface ProductOptionGroupInfo {
  productOptionGroupName: string
  productOptionGroupType: string
  productOptions: ProductOptionInfoToken[]
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
