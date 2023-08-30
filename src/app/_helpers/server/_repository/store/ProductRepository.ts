import { db } from '@/app/_helpers/server'
import {
  ProductInfo,
  ProductInfoClient,
  ProductInfoDelete,
} from '@/variables/interface/api/product-interface'
import {
  fileProjection,
  productOptionGroupProjection,
  productOptionProjection,
  productProjection,
  tokenProjection,
} from '@/variables/projection/projection'

const Product = db.Product

const create = async (id: string, productInfo: ProductInfo): Promise<string> =>
  (await new Product({ store: id, ...productInfo }).save())._id

const getAll = async (): Promise<(Omit<Omit<ProductInfoClient, never> & {}, never> & {})[]> =>
  Product.find({ deletedDate: null }, productProjection)
    .populate({
      path: 'productOptionGroups',
      populate: {
        path: 'productOptions',
        match: { deletedDate: { $eq: null } },
        select: productOptionProjection,
        populate: {
          path: 'token',
          match: { deletedDate: { $eq: null } },
          select: tokenProjection,
        },
      },
      select: productOptionGroupProjection,
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
        select: productOptionProjection,
        populate: {
          path: 'token',
          match: { deletedDate: { $eq: null } },
          select: tokenProjection,
        },
      },
      select: productOptionGroupProjection,
    })
    .populate({
      path: 'file',
      match: { deletedDate: { $eq: null } },
      select: fileProjection,
    })
    .exec()

const getById = async (id: string): Promise<ProductInfoClient> =>
  Product.findOne({ _id: id, deletedDate: null }, productProjection)
    .populate({
      path: 'productOptionGroups',
      populate: {
        path: 'productOptions',
        match: { deletedDate: { $eq: null } },
        select: productOptionProjection,
        populate: {
          path: 'token',
          match: { deletedDate: { $eq: null } },
          select: tokenProjection,
        },
      },
      select: productOptionGroupProjection,
    })
    .populate({
      path: 'file',
      match: { deletedDate: { $eq: null } },
      select: fileProjection,
    })
    .exec()

const getFileIdById = async (id: string): Promise<string> => {
  const product = await Product.findOne({ _id: id, deletedDate: null })
    .populate({
      path: 'file',
      match: { deletedDate: { $eq: null } },
    })
    .exec()
  return product.file ? product.file._id : null
}

const getStoreIdById = async (id: string): Promise<string> =>
  (await Product.findOne({ _id: id, deletedDate: null }).exec()).store._id

const update = async (id: string, productInfo: ProductInfo): Promise<string> => {
  const product = await Product.findOne({ _id: id, deletedDate: null }).exec()
  Object.assign(product, productInfo)
  return (await product.save())._id
}

const softDelete = async (id: string): Promise<string> => {
  const product: ProductInfoDelete = await Product.findOne({ _id: id, deletedDate: null }).exec()
  product.deletedDate = new Date()
  return (await product.save!())._id
}

// const _delete = async (id: string) => {
//   await Product.findByIdAndDelete(id)
//   return id
// }

export const productRepository = {
  getAll,
  getFileIdById,
  getAllByStoreId,
  getStoreIdById,
  getById,
  create,
  update,
  softDelete,
  // delete: _delete,
}
