import { ProductOptionGroupInfo } from '@/variables/interface/api/product-option-group'
import { productRepository } from '@/app/_helpers/server/_repository/store/productRepository'
import { productOptionGroupRepository } from '@/app/_helpers/server/_repository/store/productOptionGroupRepository'

const create = async (id: string, productOptionGroupInfo: ProductOptionGroupInfo) =>
  productOptionGroupRepository.create(
    id,
    await productRepository.getById(id),
    productOptionGroupInfo
  )

export const productOptionGroupService = { create }
