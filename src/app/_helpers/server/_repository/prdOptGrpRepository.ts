import { db } from '@/app/_helpers/server'
import { prdOptRepository } from '@/app/_helpers/server/_repository/prdOptRepository'
import { productRepository } from '@/app/_helpers/server/_repository/productRepository'

const ProductOptionGroup = db.ProductOptionGroup

const getAll = async () => await ProductOptionGroup.find({ deletedDate: null }).exec()

const getAllByProductId = async (id: string) =>
  await ProductOptionGroup.find({ deletedDate: null, productId: id }).exec()

const getById = async (id: string) => await ProductOptionGroup.findById(id)

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

export const prdOptGrpRepository = {
  getAll,
  getAllByProductId,
  getById,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}
