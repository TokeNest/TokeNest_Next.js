import { ProductOptionInfo } from '@/variables/interface/api/productOption'

export interface ProductOptionGroupInfo {
  _id: string
  productOptionGroupName: string
  productOptionGroupType: string
  productOptions: ProductOptionInfo[]

  save(): any
}
