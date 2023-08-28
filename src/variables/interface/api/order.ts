import { ProductOption } from '@/variables/interface/api/productOption'

export interface OrderInfo {
  orderNum: number
  orderStatus: string
  OrderOptions: OrderOption[]
}

export interface OrderOption {
  orderAmount: number
  productOptions: ProductOption[]
}

export interface OrderInfoToCreate extends OrderInfo {
  store: string
}
