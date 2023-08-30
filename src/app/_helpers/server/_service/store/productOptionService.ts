import { productRepository } from '@/app/_helpers/server/_repository/store/ProductRepository'
import { productOptionGroupRepository } from '@/app/_helpers/server/_repository/store/ProductOptionGroupRepository'
import { productOptionRepository } from '@/app/_helpers/server/_repository/store/ProductOptionRepository'
import { ProductOptionInfo } from '@/variables/interface/api/product-option-info'

const getProductOptions = async (id: string) => {
  const productOptions = await productOptionRepository.getAll()
  return productOptions.length ? productOptions : Promise.reject('productOption not found')
}

const getProductOptionById = async (id: string) => {
  const productOption = await productOptionRepository.getById(id)
  return productOption ? productOption : Promise.reject('productOption not found')
}

const getProductOptionsByProductOptionGroupId = async (id: string) =>
  (await productOptionGroupRepository.getById(id))
    ? (await productOptionGroupRepository.getById(id)).productOptions
    : Promise.reject('ProductOptionGroup not found')

const updateProductOptionById = async (id: string, productOptionInfo: ProductOptionInfo) =>
  (await productOptionRepository.getById(id))
    ? productOptionRepository.update(id, productOptionInfo)
    : Promise.reject('productOption not found')

const softDeleteProductOptionByProductOptionGroupId = async (id: string) => {
  const productOptions = (await productOptionGroupRepository.getById(id)).productOptions
  for (const productOption of productOptions) {
    await productRepository.softDelete(productOption.id)
  }
}

const softDeleteProductOptionById = async (id: string) =>
  (await productOptionRepository.getById(id))
    ? productOptionRepository.softDelete(id)
    : Promise.reject('productOption not found')

export const productOptionService = {
  getProductOptions,
  getProductOptionById,
  updateProductOptionById,
  getProductOptionsByProductOptionGroupId,
  softDeleteProductOptionByProductOptionGroupId,
  softDeleteProductOptionById,
}
