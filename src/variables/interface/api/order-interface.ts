import { ProductOptionInfo } from '@/variables/interface/api/product-option-info'

export interface OrderInfo {
  orderNum: number
  orderStatus: string
  OrderOptions: OrderOptionInfo[]
}

export interface OrderOptionInfo {
  orderAmount: number
  productOptions: ProductOptionInfo[]
}

export interface OrderInfoCreate extends OrderInfo {
  store: string
}
