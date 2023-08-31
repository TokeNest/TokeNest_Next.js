export interface ProductOptionInfo {
  productOptionName: string
  productOptionPrice: number
  productOptionIsDefault: boolean
  tokenRatio: number | null
  token: {
    tokenAddress: string
  }
}

export interface ProductOptionInfoCreate extends ProductOptionInfo {
  save?(): any
}

export interface ProductOptionInfoDelete extends ProductOptionInfoCreate {
  deletedDate: Date
}

export interface ProductOptionInfoClient extends ProductOptionInfo {
  id: string
}
