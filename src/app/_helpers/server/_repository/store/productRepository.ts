import { db } from '@/app/_helpers/server'
import { ProductInfo } from '@/variables/interface/api/product'
import {
  fileProjection,
  productOptionGroupsProjection,
  productOptionsProjection,
  productProjection,
} from '@/variables/enum/projection-enum'

// TODO Product code refactoring
const Product = db.Product

const getAll = async () => {
  return Product.find({ deletedDate: null }, productProjection)
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
}

const getAllByStoreId = async (id: string): Promise<Omit<ProductInfo, never>[]> => {
  return Product.find({ deletedDate: null, storeId: id }).populate({
    path: 'optionGroups',
    match: { deletedDate: { $eq: null } },
    populate: { path: 'options', match: { deletedDate: { $eq: null } } },
  })
}

const getFileIdByProductId = async (id: string): Promise<string> =>
  (await Product.findOne({ _id: id, deletedDate: null }).exec()).file._id

const getStoreIdByProductId = async (id: string) => {
  return (await Product.findOne({ _id: id, deletedDate: null }).exec()).store._id
}

const getById = async (id: string): Promise<ProductInfo> =>
  Product.findOne({ _id: id, deletedDate: null }).exec()

const save = async (id: string, productInfo: ProductInfo): Promise<string> =>
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
  save,
  update,
  softDelete: softDelete,
  // delete: _delete,
}
