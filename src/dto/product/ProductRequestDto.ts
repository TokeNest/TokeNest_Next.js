import { PrdOptGrpRequestDto } from '@/dto/product/PrdOptGrpRequestDto'

export class ProductRequestDto {
  product_name: string
  product_intro: string
  product_info: string
  product_status: string
  product_price: number
  option_groups: PrdOptGrpRequestDto[]
}
