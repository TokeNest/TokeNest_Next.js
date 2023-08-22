import { productRepository } from '@/app/_helpers/server/_repository'
import { ProductResponseDto } from '@/app/_helpers/server/dto/product/response/ProductResponseDto'
import { CategoryResponseDto } from '@/app/_helpers/server/dto/product/response/CategoryResponseDto'

export const kioskService = {
  getProductList,
}

async function getProductList(id: string) {
  const list = await productRepository.getAllByStoreId(id)
  const categoryList: CategoryResponseDto[] = []
  const categories: string[] = []
  list.forEach((prd) => {
    const productDto = new ProductResponseDto({
      productId: prd._id,
      productName: prd.product_name,
      productIntro: prd.product_intro,
      productInfo: prd.product_info,
      productPrice: prd.product_price,
      productImageUrl: '',
      optionGroups: prd.option_groups.map((optGrp: any) => ({
        optionGroupName: optGrp.product_option_group_name,
        isRequire: optGrp.product_option_group_is_require,
        isDuplicate: optGrp.product_option_group_is_duplicate,
        options: optGrp.options.map((opt: any) => ({
          optionId: opt._id,
          optionName: opt.product_option_name,
          isDefault: opt.product_option_is_default,
          optionPrice: opt.product_option_price,
        })),
      })),
    })
    if (categories.includes(prd.product_category)) {
      categoryList.forEach((category: CategoryResponseDto) => {
        if (category.categoryName === prd.product_category) {
          category.products.push(productDto)
        }
      })
    } else {
      categories.push(prd.product_category)
      categoryList.push(
        new CategoryResponseDto({
          categoryName: prd.product_category,
          products: [productDto],
        })
      )
    }
  })
  return categoryList
}
