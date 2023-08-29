import { ProductOption } from '@/variables/interface/api/productOption'

export interface OrderInfo {
  orderNum: number
  orderStatus: string
  OrderOptions: OrderOptionInfo[]
}

export interface OrderOptionInfo {
  orderAmount: number
  productOptions: ProductOption[]
}

export interface OrderInfoCreate extends OrderInfo {
  store: string
}
