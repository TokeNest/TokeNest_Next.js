import { db } from '@/app/_helpers/server'
import { ProductInfo, ProductInfoClient } from '@/variables/interface/api/product-interface'
import {
  fileProjection,
  productOptionGroupsProjection,
  productOptionsProjection,
  productProjection,
} from '@/variables/projection/projection'

// TODO Product code refactoring
const Product = db.Product

const getAll = async (): Promise<(Omit<Omit<ProductInfoClient, never> & {}, never> & {})[]> =>
  Product.find({ deletedDate: null }, productProjection)
    .populate({
      path: 'productOptionGroups',
      populate: {
        path: 'productOptions',
        match: { deletedDate: { $eq: null } },
        select: productOptionsProjection,
      },
      select: productOptionGroupsProjection,
    })
    .populate({
      path: 'file',
      match: { deletedDate: { $eq: null } },
      select: fileProjection,
    })
    .exec()

const getAllByStoreId = async (
  id: string
): Promise<(Omit<Omit<ProductInfoClient, never> & {}, never> & {})[]> =>
  Product.find({ store: id, deletedDate: null }, productProjection)
    .populate({
      path: 'productOptionGroups',
      populate: {
        path: 'productOptions',
        match: { deletedDate: { $eq: null } },
        select: productOptionsProjection,
      },
      select: productOptionGroupsProjection,
    })
    .populate({
      path: 'file',
      match: { deletedDate: { $eq: null } },
      select: fileProjection,
    })
    .exec()

const getFileIdByProductId = async (id: string): Promise<string> =>
  (await Product.findOne({ _id: id, deletedDate: null }).exec()).file._id

const getStoreIdByProductId = async (id: string) => {
  return (await Product.findOne({ _id: id, deletedDate: null }).exec()).store._id
}

const getById = async (id: string): Promise<ProductInfo> =>
  Product.findOne({ _id: id, deletedDate: null })
    .populate({
      path: 'productOptionGroups',
      populate: {
        path: 'productOptions',
        match: { deletedDate: { $eq: null } },
        select: productOptionsProjection,
      },
      select: productOptionGroupsProjection,
    })
    .populate({
      path: 'file',
      match: { deletedDate: { $eq: null } },
      select: fileProjection,
    })
    .exec()

const create = async (id: string, productInfo: ProductInfo): Promise<string> =>
  (await new Product({ store: id, ...productInfo }).save())._id

const update = async (id: string, productInfo: ProductInfo): Promise<string> => {
  const product = await Product.findOne({ _id: id, deletedDate: null }).exec()
  Object.assign(product, productInfo)
  return (await product.save())._id
}

const softDelete = async (id: string): Promise<string> => {
  const product = await Product.findOne({ _id: id, deletedDate: null }).exec()
  product.deletedDate = new Date()
  return (await product.save())._id
}

// const _delete = async (id: string) => {
//   await Product.findByIdAndDelete(id)
//   return id
// }

export const productRepository = {
  getAll,
  getFileIdByProductId,
  getAllByStoreId,
  getStoreIdByProductId,
  getById,
  create,
  update,
  softDelete: softDelete,
  // delete: _delete,
}
