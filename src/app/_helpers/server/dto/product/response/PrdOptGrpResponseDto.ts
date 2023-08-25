import { PrdOptResponseDto } from '@/app/_helpers/server/dto/product/response/PrdOptResponseDto'

export class PrdOptGrpResponseDto {
  optionGroupName: string
  isRequire: boolean
  isDuplicate: boolean
  options: PrdOptResponseDto[]

  constructor(prdOptGrp: PrdOptGrpResponseDto) {
    this.optionGroupName = prdOptGrp.optionGroupName
    this.isRequire = prdOptGrp.isRequire
    this.isDuplicate = prdOptGrp.isDuplicate
    this.options = prdOptGrp.options
  }
}
