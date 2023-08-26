import { db } from '@/app/_helpers/server'

const Product = db.Product

export const productRepository = {
  getAll,
  getAllByStoreId,
  getById,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}

function getAll() {
  return Product.find({ deletedDate: null })
}

async function getAllByStoreId(id: string) {
  return Product.find({ deletedDate: null, storeId: id }).populate({
    path: 'optionGroups',
    match: { deletedDate: { $eq: null } },
    populate: { path: 'options', match: { deletedDate: { $eq: null } } },
  })
}

async function getById(id: string) {
  try {
    return await Product.findById(id)
  } catch {
    throw 'Product Not Found'
  }
}

async function create(params: any) {
  const product = new Product(params)
  await product.save()
}

async function update(id: string, params: any) {
  const product = await Product.findById(id)
  if (!product) {
    throw 'Product Not Found'
  }

  Object.assign(product, params)

  await product.save()
}

async function _softDelete(id: string) {
  const product = await Product.findById(id)
  if (!product) {
    throw 'Product Not Found'
  }

  product.deletedDate = new Date()

  await product.save()
}

async function _delete(id: string) {
  await Product.findByIdAndDelete(id)
}
