import { TokenInfo } from '@/variables/interface/api/token-interface'

export interface ProductOptionInfo {
  productOptionName: string
  productOptionPrice: number
  productOptionIsDefault: boolean
}

export interface ProductOptionInfoToken extends ProductOptionInfo {
  tokenRatio: number | null
  tokenAddress: string | null
  token: TokenInfo
}

export interface ProductOptionInfoSave extends ProductOptionInfoToken {
  save?(): any
}

export interface ProductOptionInfoDelete extends ProductOptionInfoSave {
  deletedDate: Date
}

export interface ProductOptionInfoClient extends ProductOptionInfoToken {
  id: string
}
