import { db } from '@/app/_helpers/server'
import { prdOptRepository } from '@/app/_helpers/server/_repository/prdOptRepository'
import { productRepository } from '@/app/_helpers/server/_repository/productRepository'

const ProductOptionGroup = db.ProductOptionGroup

export const prdOptGrpRepository = {
  getAll,
  getAllByProductId,
  getById,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}

function getAll() {
  return ProductOptionGroup.find({ deletedDate: null })
}

function getAllByProductId(id: string) {
  return ProductOptionGroup.find({ deletedDate: null, productId: id })
}

async function getById(id: string) {
  try {
    return await ProductOptionGroup.findById(id)
  } catch {
    throw 'ProductOptionGroup Not Found'
  }
}

async function create(productId: string, params: any) {
  const options: any[] = await params['options']
  const product = await productRepository.getById(productId)
  const optionGroup = await new ProductOptionGroup({
    productOptionGroupName: params['optionGroupName'],
    productOptionGroupIsRequire: params['isRequire'],
    productOptionGroupIsDuplicate: params['isDuplicate'],
    productId: productId,
  })
  await optionGroup.save()
  product.optionGroups.push(optionGroup._id)
  await product.save()
  options.forEach((option: any) => {
    prdOptRepository.create(optionGroup._id, option)
  })
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
