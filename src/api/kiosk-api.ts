export interface Product {
  name: string
  info: string
  description: string
  price: number
  imageUrl: string
  options: ProductOption[]
}
export interface Category {
  name: string
  index: number
  data: Product[]
}

export interface ProductOption {
  optionName: string
  defaultValue: number
  optionInfo: OptionInfo[]
}

export interface OptionInfo {
  label: string
  value: number
}
