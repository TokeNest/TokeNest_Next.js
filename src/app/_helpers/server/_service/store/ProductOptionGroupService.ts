import { ProductOptionGroupInfo } from '@/variables/interface/api/product-option-group'
import { productOptionGroupRepository } from '@/app/_helpers/server/_repository/store/ProductOptionGroupRepository'
import { productOptionRepository } from '@/app/_helpers/server/_repository/store/ProductOptionRepository'
import { ProductOptionInfoSave } from '@/variables/interface/api/product-option-info'
import { productRepository } from '@/app/_helpers/server/_repository/store/ProductRepository'
import { ProductInfoSave } from '@/variables/interface/api/product-interface'
import { tokenRepository } from '@/app/_helpers/server/_repository/token/TokenRepository'

const create = async (id: string, productOptionGroupInfo: ProductOptionGroupInfo) => {
  const product = (await productRepository.getById(id)) as ProductInfoSave
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

export const productOptionGroupService = { create }
