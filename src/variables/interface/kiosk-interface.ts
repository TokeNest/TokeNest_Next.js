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

export type OptionGroup = OptionRadioGroup | OptionCheckboxGroup

/**
 * Product에서 사용하는 옵션 정보
 * */
export interface OptionRadioGroup {
  optionGroupId: ID
  optionGroupType: OPTION_TYPE.RADIO
  optionGroupName: string
  defaultOptionId: ID
  options: Option[]
}
/**
 * Product에서 사용하는 옵션 정보
 * */
export interface OptionCheckboxGroup {
  optionGroupId: ID
  optionGroupType: OPTION_TYPE.CHECKBOX
  optionGroupName: string
  defaultOptionIds: ID[]
  isRequire: boolean
  options: Option[]
}

/**
 * 체크박스 옵션 구성
 * */
export interface Option {
  optionId: ID
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
