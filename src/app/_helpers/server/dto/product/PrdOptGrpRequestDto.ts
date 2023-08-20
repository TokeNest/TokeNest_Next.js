import { PrdOptRequestDto } from '@/app/_helpers/server/dto/product/PrdOptRequestDto'

export class PrdOptGrpRequestDto {
  option_group_name: string
  is_duplicate: boolean
  is_require: boolean
  options: PrdOptRequestDto[]
}
