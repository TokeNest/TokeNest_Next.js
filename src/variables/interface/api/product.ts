import { PrdOptGrpResponseDto } from '@/app/_helpers/server/dto/product/response/PrdOptGrpResponseDto'
import { FileInfoWithId } from '@/variables/interface/api/file'

export interface ProductInfo {
  productName: string
  productIntro: string
  productInfo: string
  productPrice: number
  file: FileInfoWithId
  optionGroups: PrdOptGrpResponseDto[]

  save(): any
}
