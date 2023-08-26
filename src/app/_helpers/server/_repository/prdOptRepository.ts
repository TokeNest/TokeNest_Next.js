import { db } from '@/app/_helpers/server'
import { prdOptGrpRepository } from '@/app/_helpers/server/_repository/prdOptGrpRepository'

const ProductOption = db.ProductOption

export const prdOptRepository = {
  getAll,
  getAllByGroupId,
  getById,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}

function getAll() {
  return ProductOption.find({ deletedDate: null })
}

function getAllByGroupId(id: string) {
  return ProductOption.find({ deletedDate: null, groupId: id })
}

async function getById(id: string) {
  try {
    return await ProductOption.findById(id)
  } catch {
    throw 'ProductOption Not Found'
  }
}

async function create(groupId: string, params: any) {
  const optionGroup = await prdOptGrpRepository.getById(groupId)
  const productOption = new ProductOption({
    productOptionName: params['optionName'],
    productOptionIsDefault: params['isDefault'],
    productOptionPrice: params['optionPrice'],
    groupId: groupId,
  })
  await productOption.save()
  optionGroup.options.push(productOption._id)
  await optionGroup.save()
}

async function update(id: string, params: any) {
  const productOption = await ProductOption.findById(id)
  if (!productOption) {
    throw 'ProductOption Not Found'
  }

  Object.assign(productOption, params)

  await productOption.save()
}

async function _softDelete(id: string) {
  const productOption = await ProductOption.findById(id)
  if (!productOption) {
    throw 'ProductOption Not Found'
  }

  productOption.deletedDate = new Date()

  await productOption.save()
}

async function _delete(id: string) {
  await ProductOption.findByIdAndDelete(id)
}
