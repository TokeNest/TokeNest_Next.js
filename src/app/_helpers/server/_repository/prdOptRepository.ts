import { db } from '@/app/_helpers/server'
import { prdOptGrpRepository } from '@/app/_helpers/server/_repository/prdOptGrpRepository'

const ProductOption = db.Product_Option

export const prdOptRepository = {
  getAll,
  getAllByGroupId,
  getById,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}

async function getAll() {
  return await ProductOption.find({ deleted_date: null })
}

async function getAllByGroupId(id: string) {
  return await ProductOption.find({ deleted_date: null, group_id: id })
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
    product_option_name: params['optionName'],
    product_option_is_default: params['isDefault'],
    product_option_price: params['optionPrice'],
    group_id: groupId,
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

  productOption.deleted_date = new Date()

  await productOption.save()
}

async function _delete(id: string) {
  await ProductOption.findByIdAndDelete(id)
}
