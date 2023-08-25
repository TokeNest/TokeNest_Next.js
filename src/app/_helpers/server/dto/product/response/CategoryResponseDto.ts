import { ProductResponseDto } from '@/app/_helpers/server/dto/product/response/ProductResponseDto'

export class CategoryResponseDto {
  categoryName: string
  products: ProductResponseDto[]

  constructor(category: CategoryResponseDto) {
    this.categoryName = category.categoryName
    this.products = category.products
  }
}
