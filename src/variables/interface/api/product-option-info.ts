import { TokenOption } from '@/variables/interface/kiosk-interface'

export interface ProductOptionInfo {
  productOptionName: string
  productOptionPrice: number
}

export interface ProductOptionInfoToken extends ProductOptionInfo {
  productOptionIsDefault: boolean
  productOptionTokenOption: TokenOption
}

export interface ProductOptionInfoCreate extends ProductOptionInfoToken {
  _id: string
  save(): any
}

export interface ProductOptionInfoClient extends ProductOptionInfoToken {
  id: string
}
