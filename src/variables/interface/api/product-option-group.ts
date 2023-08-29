import {
  ProductOptionInfoClient,
  ProductOptionInfoToken,
} from '@/variables/interface/api/product-option-info'

export interface ProductOptionGroupInfo {
  productOptionGroupName: string
  productOptionGroupType: string
  productOptions: ProductOptionInfoToken[]
}

export interface ProductOptionGroupInfoCreate extends ProductOptionGroupInfo {
  save(): any
}

export interface ProductOptionGroupInfoClient extends ProductOptionGroupInfo {
  id: string
  productOptions: ProductOptionInfoClient[]
}
