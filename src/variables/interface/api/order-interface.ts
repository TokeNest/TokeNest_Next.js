import { ProductOptionInterface } from '@/variables/interface/api/product-option-interface'

export interface OrderInfo {
  orderNum: number
  orderStatus: string
  OrderOptions: OrderOptionInfo[]
}

export interface OrderOptionInfo {
  orderAmount: number
  productOptions: ProductOptionInterface[]
}

export interface OrderInfoCreate extends OrderInfo {
  store: string
}
