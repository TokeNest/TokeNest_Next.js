import { PrdOptGrpRequestDto } from '@/app/_helpers/server/dto/product/request/PrdOptGrpRequestDto'

export class ProductRequestDto {
  productName: string
  productIntro: string
  productInfo: string
  productStatus: string
  productPrice: number
  optionGroups: PrdOptGrpRequestDto[]
}
