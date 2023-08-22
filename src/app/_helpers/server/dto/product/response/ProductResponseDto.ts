import { PrdOptGrpResponseDto } from '@/app/_helpers/server/dto/product/response/PrdOptGrpResponseDto'

export class ProductResponseDto {
  productId: string
  productName: string
  productIntro: string
  productInfo: string
  productPrice: number
  productImageUrl: string
  optionGroups: PrdOptGrpResponseDto[]

  constructor(Prd: ProductResponseDto) {
    this.productId = Prd.productId
    this.productName = Prd.productName
    this.productIntro = Prd.productIntro
    this.productInfo = Prd.productInfo
    this.productPrice = Prd.productPrice
    this.productImageUrl = Prd.productImageUrl
    this.optionGroups = Prd.optionGroups
  }
}
