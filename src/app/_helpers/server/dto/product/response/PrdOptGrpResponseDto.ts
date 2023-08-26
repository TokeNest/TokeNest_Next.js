import { PrdOptResponseDto } from '@/app/_helpers/server/dto/product/response/PrdOptResponseDto'
import { OPTION_TYPE } from '@/variables/enum/kiosk-enum'

export class PrdOptGrpResponseDto {
  optionGroupId: string
  optionGroupType: OPTION_TYPE
  optionGroupName: string
  options: PrdOptResponseDto[]

  constructor(prdOptGrp: PrdOptGrpResponseDto) {
    this.optionGroupId = prdOptGrp.optionGroupId
    this.optionGroupType = prdOptGrp.optionGroupType
    this.optionGroupName = prdOptGrp.optionGroupName
    this.options = prdOptGrp.options
  }
}
