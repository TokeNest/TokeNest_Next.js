export interface ProductOption {
  productOptionName: string
  productOptionPrice: number
}

export interface ProductOptionInfo extends ProductOption {
  productOptionIsDefault: boolean
  save(): any
}