import { TokenOption } from '@/variables/interface/kiosk-interface'

export interface ProductOptionInterface {
  productOptionName: string
  productOptionPrice: number
}

export interface ProductOptionInfo extends ProductOptionInterface {
  productOptionIsDefault: boolean
  productOptionTokenOption: TokenOption
}

export interface ProductOptionInfoServer extends ProductOptionInfo {
  _id: string
  save(): any
}

export interface ProductOptionInfoClient extends ProductOptionInfo {
  id: string
}
