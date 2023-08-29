import { TokenOption } from '@/variables/interface/kiosk-interface'

export interface ProductOptionInterface {
  productOptionName: string
  productOptionPrice: number
}

export interface ProductOptionInfo extends ProductOptionInterface {
  _id: string
  productOptionIsDefault: boolean
  productOptionTokenOption?: TokenOption
  save(): any
}
