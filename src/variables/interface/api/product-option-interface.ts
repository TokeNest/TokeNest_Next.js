export interface ProductOptionInfo {
  productOptionName: string
  productOptionPrice: number
  productOptionIsDefault: boolean
  tokenRatio: number | null
  token: {
    tokenSymbol: string
    tokenAddress: string
  }
}

export interface ProductOptionInfoSave extends ProductOptionInfo {
  save?(): any
}

export interface ProductOptionInfoDelete extends ProductOptionInfoSave {
  deletedDate: Date
}

export interface ProductOptionInfoClient extends ProductOptionInfo {
  id: string
}
