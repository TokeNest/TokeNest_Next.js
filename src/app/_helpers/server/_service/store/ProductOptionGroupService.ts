import { ProductOptionGroupInfo } from '@/variables/interface/api/product-option-group'
import { productOptionGroupRepository } from '@/app/_helpers/server/_repository/store/ProductOptionGroupRepository'
import { productOptionRepository } from '@/app/_helpers/server/_repository/store/ProductOptionRepository'
import { ProductOptionInfoSave } from '@/variables/interface/api/product-option-info'
import { productRepository } from '@/app/_helpers/server/_repository/store/ProductRepository'
import { ProductInfoSave } from '@/variables/interface/api/product-interface'
import { tokenRepository } from '@/app/_helpers/server/_repository/token/TokenRepository'
import { productOptionService } from '@/app/_helpers/server/_service/store/productOptionService'

const create = async (id: string, productOptionGroupInfo: ProductOptionGroupInfo) => {
  const product: ProductInfoSave = await productRepository.getById(id)
  if (!product) {
    throw 'product not found'
  }

  const productOptionGroupId = await productOptionGroupRepository.create(
    id,
    product,
    productOptionGroupInfo
  )

  for (const productOption of productOptionGroupInfo.productOptions) {
    let tokenInfo = null
    if (productOption.tokenAddress) {
      tokenInfo = await tokenRepository.getByAddress(productOption.tokenAddress)
    }
    await productOptionRepository.create(
      await productOptionGroupRepository.getById(productOptionGroupId),
      productOption as ProductOptionInfoSave,
      tokenInfo
    )
  }
  return productOptionGroupId
}

const getProductOptionGroups = async () => {
  const productOptionGroups = await productOptionGroupRepository.getAll()
  return productOptionGroups.length
    ? productOptionGroups
    : Promise.reject('productOptionGroup not found')
}

const getProductOptionGroupsByProductId = async (id: string) => {
  const productOptionGroups = await productOptionGroupRepository.getAllByProductId(id)
  return productOptionGroups.length
    ? productOptionGroups
    : Promise.reject('productOptionGroup not found')
}

const getProductOptionGroupById = async (id: string) => {
  const productOptionGroup = await productOptionGroupRepository.getById(id)
  return productOptionGroup ? productOptionGroup : Promise.reject('productOptionGroup not found')
}

const updateProductOptionGroupById = async (
  id: string,
  productOptionGroupInfo: ProductOptionGroupInfo
) =>
  (await productOptionGroupRepository.getById(id))
    ? productOptionGroupRepository.update(id, productOptionGroupInfo)
    : Promise.reject('productOptionGroup not found')

const softDeleteProductOptionGroupByProductId = async (id: string) => {
  const productOptionGroups = await productOptionGroupRepository.getAllByProductId(id)

  for (const productOptionGroup of productOptionGroups) {
    await softDeleteOptions(productOptionGroup.id)
  }
}

const softDeleteProductOptionGroupById = async (id: string) =>
  (await productOptionGroupRepository.getById(id))
    ? softDeleteOptions(id)
    : Promise.reject('productOptionGroup not found')

const softDeleteOptions = async (id: string) => {
  await productOptionService.softDeleteProductOptionByProductOptionGroupId(id)
  return productOptionGroupRepository.softDelete(id)
}

export const productOptionGroupService = {
  create,
  getProductOptionGroups,
  getProductOptionGroupsByProductId,
  getProductOptionGroupById,
  updateProductOptionGroupById,
  softDeleteProductOptionGroupByProductId,
  softDeleteProductOptionGroupById,
}
