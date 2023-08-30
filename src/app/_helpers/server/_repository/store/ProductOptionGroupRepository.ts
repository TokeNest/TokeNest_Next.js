import { db } from '@/app/_helpers/server'
import {
  ProductOptionGroupInfo,
  ProductOptionGroupInfoClient,
} from '@/variables/interface/api/product-option-group'
import { ProductInfoSave } from '@/variables/interface/api/product-interface'
import {
  productOptionGroupProjection,
  productOptionProjection,
  tokenProjection,
} from '@/variables/projection/projection'

const ProductOptionGroup = db.ProductOptionGroup

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

const getById = async (id: string): Promise<ProductOptionGroupInfo> =>
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

const create = async (
  id: string,
  productInfo: ProductInfoSave,
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

async function update(id: string, params: any) {
  const productOptionGroup = await ProductOptionGroup.findById(id)
  if (!productOptionGroup) {
    throw 'ProductOptionGroup Not Found'
  }

  Object.assign(productOptionGroup, params)

  await productOptionGroup.save()
}

async function _softDelete(id: string) {
  const productOptionGroup = await ProductOptionGroup.findById(id)
  if (!productOptionGroup) {
    throw 'ProductOptionGroup Not Found'
  }

  productOptionGroup.deletedDate = new Date()

  await productOptionGroup.save()
}

async function _delete(id: string) {
  await ProductOptionGroup.findByIdAndDelete(id)
}

export const productOptionGroupRepository = {
  getAll,
  getAllByProductId,
  getById,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}
