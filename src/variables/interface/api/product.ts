import { PrdOptGrpResponseDto } from '@/app/_helpers/server/dto/product/response/PrdOptGrpResponseDto'

export interface ProductInfo {
  _id: string
  productName: string
  productIntro: string
  productInfo: string
  productPrice: number
  file: string
  optionGroups: PrdOptGrpResponseDto[]

  save(): any
}
