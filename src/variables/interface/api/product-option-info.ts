import { TokenInfo } from '@/variables/interface/api/token-interface'

export interface ProductOptionInfo {
  productOptionName: string
  productOptionPrice: number
  productOptionIsDefault: boolean
}

export interface ProductOptionInfoToken extends ProductOptionInfo {
  tokenRatio: number
  productOptionTokenOption: TokenInfo
}

export interface ProductOptionInfoCreate extends ProductOptionInfoToken {
  _id: string
  save(): any
}

export interface ProductOptionInfoClient extends ProductOptionInfoToken {
  id: string
}
