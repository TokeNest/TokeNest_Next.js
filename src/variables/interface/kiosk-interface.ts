import { TOKEN } from '@/variables/enum/web3-enum'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'

type ID = string

/**
 * Product에서 카테고리 분류
 * */
export interface Category {
  categoryName: string
  products: Product[]
}
/**
 * Product에 관한 정보
 * */
export interface Product {
  productId: ID
  productName: string
  productIntroduction: string
  productInfo: string
  productPrice: number
  productImageUrl: string
  optionGroups: OptionGroup[]
}

export interface OptionGroup {
  optionGroupId: ID
  optionGroupType: OPTION_TYPE
  optionGroupName: string
  options: Option[]
}

/**
 * 체크박스 옵션 구성
 * */
export interface Option {
  optionId: ID
  isDefault: boolean
  optionName: string
  optionInfo?: string
  optionPrice: number
  tokenOption?: TokenOption
}

/**
 * 토큰 옵션 구성
 * */
export interface TokenOption {
  tokenAddress: TOKEN
  tokenRatio: number
}

export interface OrderProduct {
  productId: ID
  productQuantity: number
  optionGroupsInfo: OrderProductOptionGroup[]
}

export interface OrderProductOptionGroup {
  optionGroupId: ID
  optionIds: ID[]
}
export interface CartOrderProduct {
  storeId?: ID
  blockHeight: number
  orderProducts: OrderProduct[]
}
