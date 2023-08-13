import { TOKEN } from '@/web3/contractList'

/**
 * Product에 관한 정보
 * */
export interface Product {
  tokenAddress: TOKEN
  tokenRatio: number
  name: string
  info: string
  description: string
  price: number
  imageUrl: string
  options: ProductOption[]
}

/**
 * Product에서 카테고리 분류
 * */
export interface Category {
  name: string
  index: number
  data: Product[]
}

/**
 * Product에서 사용하는 옵션 정보
 * */
export interface ProductOption {
  optionName: string
  defaultValue: number
  optionInfo: OptionInfo[]
}

/**
 * 옵션 구성
 * */
export interface OptionInfo {
  label: string
  value: number
}
