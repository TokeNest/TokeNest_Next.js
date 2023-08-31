export interface OrderInfo {
  id: string
  orderNum: number
  orderStatus: string
  store: storeData
  orderOptions: OrderOptionInfo[]
}

export interface OrderOptionInfo {
  orderAmount: number
  product: productData
  productOptions: productOptionData[]
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

interface storeData {
  storeName: string
  id: string
}

interface productData {
  productName: string
  id: string
}

interface productOptionData {
  productOptionName: string
  productOptionPrice: number
  id: string
}
