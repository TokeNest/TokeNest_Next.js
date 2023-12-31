import { db } from '@/app/_helpers/server'
import {
  ProductOptionInfoClient,
  ProductOptionInfoCreate,
} from '@/variables/interface/api/product-option-interface'
import { ProductOptionGroupInfoCreate } from '@/variables/interface/api/product-option-group-interface'
import { TokenInfo } from '@/variables/interface/api/token-interface'
import { productOptionProjection, tokenProjection } from '@/variables/projection/projection'

const ProductOption = db.ProductOption

const getAll = async (): Promise<(Omit<ProductOptionInfoClient, never> & {})[]> =>
  ProductOption.find({ deletedDate: null }, productOptionProjection)
    .populate({
      path: 'token',
      match: { deletedDate: { $eq: null } },
      select: tokenProjection,
    })
    .exec()

const getById = async (id: string): Promise<ProductOptionInfoClient> => {
  const productOption = await ProductOption.findOne(
    { _id: id, deletedDate: null },
    productOptionProjection
  )
    .populate({
      path: 'token',
      match: { deletedDate: { $eq: null } },
      select: tokenProjection,
    })
    .exec()
  return productOption
}

const create = async (
  productOptionGroupInfo: ProductOptionGroupInfoCreate,
  productOptionInfo: ProductOptionInfoCreate,
  tokenInfo: TokenInfo | null
): Promise<string> => {
  const productOption: ProductOptionInfoCreate = new ProductOption(productOptionInfo)
  if (tokenInfo) {
    productOption.token = tokenInfo
  } else {
    productOption.token = null
  }
  await productOption.save!()

  productOptionGroupInfo.productOptions.push(productOption)
  return (await productOptionGroupInfo.save!())._id
}

const update = async (id: string, params: any): Promise<string> => {
  const productOption: ProductOptionInfoCreate = await getById(id)
  Object.assign(productOption, params)
  return (await productOption.save!())._id
}

const softDelete = async (id: string): Promise<string> => {
  const productOption = await ProductOption.findById({ _id: id, deletedDate: null })
  productOption.deletedDate = new Date()
  return (await productOption.save())._id
}

// async function _delete(id: string) {
//   await ProductOption.findByIdAndDelete(id)
// }

export const productOptionRepository = {
  getAll,
  getById,
  create,
  update,
  softDelete,
  // delete: _delete,
}
