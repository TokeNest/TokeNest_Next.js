import { db } from '@/app/_helpers/server'
import { HydratedDocument } from 'mongoose'
import { ProductInfo } from '@/variables/interface/api/product'

const Product = db.Product
const Store = db.Store
const productProjection = {
  productId: true,
  productName: true,
  productIntro: true,
  productInfo: true,
  productPrice: true,
  productImageUrl: true,
  optionGroups: true,
}

const getAll = async (): Promise<Array<HydratedDocument<ProductInfo, {}, {}>>> =>
  await Product.find({ deletedDate: null }, productProjection).exec()

const getAllByStoreId = async (id: string): Promise<Omit<ProductInfo, never>[]> => {
  return Product.find({ deletedDate: null, storeId: id }).populate({
    path: 'optionGroups',
    match: { deletedDate: { $eq: null } },
    populate: { path: 'options', match: { deletedDate: { $eq: null } } },
  })
}

const getStoreIdByProductId = async (id: string) => {
  return (await Product.findOne({ _id: id, deletedDate: null }).exec()).store._id
}

const getById = async (id: string): Promise<ProductInfo> =>
  await Product.findOne({ _id: id, deletedDate: null }).exec()

const save = async (id: string, productInfo: ProductInfo): Promise<string> =>
  (await new Product({ store: id, ...productInfo }).save())._id

/*
const save = async (id: string, addressInfo: AddressInfo): Promise<string> => {
  const user = await User.findOne({ _id: id, deletedDate: null }).exec()
  const address = new Address({ user, ...addressInfo })
  await address.save()
  // setting relationship
  user.addresses.push(address)
  await user.save()
  return address._id
}
 */

const update = async (id: string, productInfo: ProductInfo): Promise<string> => {
  const product = await Product.findOne({ _id: id, deletedDate: null }).exec()
  Object.assign(product, productInfo)
  return (await product.save())._id
}

const softDelete = async (id: string) => {
  const product = await Product.findOne({ _id: id, deletedDate: null }).exec()
  product.deletedDate = new Date()
  return (await product.save())._id
}

const _delete = async (id: string) => {
  await Product.findByIdAndDelete(id)
  return id
}

export const productRepository = {
  getAll,
  getAllByStoreId,
  getStoreIdByProductId,
  getById,
  save,
  update,
  softDelete: softDelete,
  delete: _delete,
}
