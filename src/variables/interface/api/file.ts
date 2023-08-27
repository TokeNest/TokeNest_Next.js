import { ProductRequestDto } from '@/app/_helpers/server/dto/product/request/ProductRequestDto'

export interface FileInfo {
  file_name: string
  file_type: string
  file_capacity: string
  file_path: string
  product: ProductRequestDto
}
