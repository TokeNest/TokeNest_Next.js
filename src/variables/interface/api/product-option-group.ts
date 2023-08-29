import { ProductOptionInfo } from '@/variables/interface/api/product-option-interface'

export interface ProductOptionGroupInfo {
  _id: string
  productOptionGroupName: string
  productOptionGroupType: string
  productOptions: ProductOptionInfo[]

  save(): any
}
