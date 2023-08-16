import { TOKEN } from '@/variables/enum/web3-enum'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'

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
  productId: number
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
  optionGroupId: number
  optionGroupType: OPTION_TYPE.RADIO
  optionGroupName: string
  defaultOptionId: number
  options: Option[]
}
/**
 * Product에서 사용하는 옵션 정보
 * */
export interface OptionCheckboxGroup {
  optionGroupId: number
  optionGroupType: OPTION_TYPE.CHECKBOX
  optionGroupName: string
  defaultOptionIds: number[]
  isRequire: boolean
  options: Option[]
}

/**
 * 체크박스 옵션 구성
 * */
export interface Option {
  optionId: number
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

//
// export interface OrderProduct {
//   productId: number
//   productAmount: number
//   options: Option[]
// }
//
// export interface Order {
//   orderNum: number // 주문번호
//   orderStatus: string
//   orderList: OrderProduct[]
// }
