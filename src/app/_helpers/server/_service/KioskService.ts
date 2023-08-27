import { ProductResponseDto } from '@/app/_helpers/server/dto/product/response/ProductResponseDto'
import { CategoryResponseDto } from '@/app/_helpers/server/dto/product/response/CategoryResponseDto'
import { productRepository } from '@/app/_helpers/server/_repository/productRepository'

export const kioskService = {
  getProductList,
}

async function getProductList(id: string) {
  const list = await productRepository.getAllByStoreId(id)
  const categoryList: CategoryResponseDto[] = []
  const categories: string[] = []
  list.forEach((prd: any) => {
    const productDto = new ProductResponseDto({
      productId: prd._id,
      productName: prd.productName,
      productIntro: prd.productIntro,
      productInfo: prd.productInfo,
      productPrice: prd.productPrice,
      productImageUrl: '',
      optionGroups: prd.optionGroups.map((optGrp: any) => ({
        optionGroupId: optGrp._id,
        optionGroupName: optGrp.productOptionGroupName,
        optionGroupType: optGrp.productOptionGroupType,
        options: optGrp.options.map((opt: any) => ({
          optionId: opt._id,
          optionName: opt.productOptionName,
          isDefault: opt.productOptionIsDefault,
          optionPrice: opt.productOptionPrice,
        })),
      })),
    })
    if (categories.includes(prd.productCategory)) {
      categoryList.forEach((category: CategoryResponseDto) => {
        if (category.categoryName === prd.productCategory) {
          category.products.push(productDto)
        }
      })
    } else {
      categories.push(prd.productCategory)
      categoryList.push(
        new CategoryResponseDto({
          categoryName: prd.productCategory,
          products: [productDto],
        })
      )
    }
  })
  return categoryList
}
