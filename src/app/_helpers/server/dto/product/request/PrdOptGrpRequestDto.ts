import { PrdOptRequestDto } from '@/app/_helpers/server/dto/product/request/PrdOptRequestDto'

export class PrdOptGrpRequestDto {
  optionGroupName: string
  isRequire: boolean
  isDuplicate: boolean
  options: PrdOptRequestDto[]
}
