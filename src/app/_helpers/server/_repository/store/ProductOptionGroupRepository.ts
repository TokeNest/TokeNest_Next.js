import { db } from '@/app/_helpers/server'
import {
  ProductOptionGroupInfo,
  ProductOptionGroupInfoClient,
  ProductOptionGroupInfoCreate,
  ProductOptionGroupInfoDelete,
} from '@/variables/interface/api/product-option-group-interface'
import { ProductInfoCreate } from '@/variables/interface/api/product-interface'
import {
  productOptionGroupProjection,
  productOptionProjection,
  tokenProjection,
} from '@/variables/projection/projection'

const ProductOptionGroup = db.ProductOptionGroup

const create = async (
  id: string,
  productInfo: ProductInfoCreate,
  productOptionGroupInfo: ProductOptionGroupInfo
): Promise<string> => {
  const productOptionGroup = new ProductOptionGroup({
    product: id,
    productOptionGroupName: productOptionGroupInfo.productOptionGroupName,
    productOptionGroupType: productOptionGroupInfo.productOptionGroupType,
  })
  await productOptionGroup.save()

  // relation setting
  productInfo.productOptionGroups.push(productOptionGroup)
  await productInfo.save!()

  return productOptionGroup._id
}
const getAll = async (): Promise<(Omit<ProductOptionGroupInfoClient, never> & {})[]> =>
  ProductOptionGroup.find({ deletedDate: null }, productOptionGroupProjection)
    .populate({
      path: 'productOptions',
      match: { deletedDate: { $eq: null } },
      select: productOptionProjection,
      populate: {
        path: 'token',
        match: { deletedDate: { $eq: null } },
        select: tokenProjection,
      },
    })
    .exec()

const getAllByProductId = async (
  id: string
): Promise<(Omit<ProductOptionGroupInfoClient, never> & {})[]> =>
  ProductOptionGroup.find({ deletedDate: null, product: id }, productOptionGroupProjection)
    .populate({
      path: 'productOptions',
      match: { deletedDate: { $eq: null } },
      select: productOptionProjection,
      populate: {
        path: 'token',
        match: { deletedDate: { $eq: null } },
        select: tokenProjection,
      },
    })
    .exec()

const getById = async (id: string): Promise<ProductOptionGroupInfoClient> =>
  ProductOptionGroup.findOne({ _id: id, deletedDate: null }, productOptionGroupProjection)
    .populate({
      path: 'productOptions',
      match: { deletedDate: { $eq: null } },
      select: productOptionProjection,
      populate: {
        path: 'token',
        match: { deletedDate: { $eq: null } },
        select: tokenProjection,
      },
    })
    .exec()

const update = async (
  id: string,
  productOptionGroupInfo: ProductOptionGroupInfo
): Promise<string> => {
  const productOptionGroup: ProductOptionGroupInfoCreate = await getById(id)
  Object.assign(productOptionGroup, productOptionGroupInfo)
  return (await productOptionGroup.save!())._id
}

const softDelete = async (id: string): Promise<string> => {
  const productOptionGroup: ProductOptionGroupInfoDelete = await ProductOptionGroup.findOne({
    _id: id,
    deletedDate: null,
  }).exec()
  productOptionGroup.deletedDate = new Date()
  return (await productOptionGroup.save!())._id
}

// async function _delete(id: string) {
//   await ProductOptionGroup.findByIdAndDelete(id)
// }

export const productOptionGroupRepository = {
  create,
  getAll,
  getAllByProductId,
  getById,
  update,
  softDelete,
  // delete: _delete,
}
