import { ProductOptionInfo } from '@/variables/interface/api/product-option-interface'

export interface OrderInfo {
  orderNum: number
  orderOptions: OrderOptionInfo[]
}

export interface OrderOptionInfo {
  orderAmount: number
  productOptions: ProductOptionInfo[]
}

export interface OrderInfoCreate {
  orderNum: number
  store: string
  orderOptions: OrderOptionInfoCreate[]
}

export interface OrderOptionInfoCreate {
  orderAmount: number
  product: string
  productOptions: string[]
}
