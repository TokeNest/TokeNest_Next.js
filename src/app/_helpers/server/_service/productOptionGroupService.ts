import { ProductOptionGroupInfo } from '@/variables/interface/api/productOptionGroup'
import { productRepository } from '@/app/_helpers/server/_repository/productRepository'
import { productOptionGroupRepository } from '@/app/_helpers/server/_repository/productOptionGroupRepository'

const create = async (id: string, productOptionGroupInfo: ProductOptionGroupInfo) =>
  await productOptionGroupRepository.create(
    id,
    await productRepository.getById(id),
    productOptionGroupInfo
  )

export const productOptionGroupService = { create }
