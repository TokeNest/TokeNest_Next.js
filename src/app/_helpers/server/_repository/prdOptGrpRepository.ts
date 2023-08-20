import { db } from '@/app/_helpers/server'

const ProductOptionGroup = db.Product_Option_Group

export const prdOptGrpRepository = {
  getAll,
  getById,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}

async function getAll() {
  return await ProductOptionGroup.find({ deleted_date: null })
}

async function getById(id: string) {
  try {
    return await ProductOptionGroup.findById(id)
  } catch {
    throw 'ProductOptionGroup Not Found'
  }
}

async function create(params: any) {
  const product = new ProductOptionGroup(params)
  await product.save()
}

async function update(id: string, params: any) {
  const product = await ProductOptionGroup.findById(id)
  if (!product) {
    throw 'Product Not Found'
  }

  Object.assign(product, params)

  await product.save()
}

async function _softDelete(id: string) {
  const product = await ProductOptionGroup.findById(id)
  if (!product) {
    throw 'Product Not Found'
  }

  product.deleted_date = new Date()

  await product.save()
}

async function _delete(id: string) {
  await ProductOptionGroup.findByIdAndDelete(id)
}
