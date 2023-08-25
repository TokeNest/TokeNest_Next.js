import { PrdOptGrpRequestDto } from '@/app/_helpers/server/dto/product/request/PrdOptGrpRequestDto'

export class ProductRequestDto {
  product_name: string
  product_intro: string
  product_info: string
  product_status: string
  product_price: number
  option_groups: PrdOptGrpRequestDto[]
}
