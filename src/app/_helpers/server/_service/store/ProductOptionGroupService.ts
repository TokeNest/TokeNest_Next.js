import { ProductOptionGroupInfo } from '@/variables/interface/api/product-option-group'
import { productRepository } from '@/app/_helpers/server/_repository/store/ProductRepository'
import { productOptionGroupRepository } from '@/app/_helpers/server/_repository/store/ProductOptionGroupRepository'

const create = async (id: string, productOptionGroupInfo: ProductOptionGroupInfo) =>
  productOptionGroupRepository.create(
    id,
    await productRepository.getById(id),
    productOptionGroupInfo
  )

export const productOptionGroupService = { create }
