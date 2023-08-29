import { db } from '@/app/_helpers/server'
import { ProductOptionInfoCreate } from '@/variables/interface/api/product-option-info'
import { ProductOptionGroupInfoCreate } from '@/variables/interface/api/product-option-group'

// TODO 여기 손봐야됨.
const ProductOption = db.ProductOption

function getAll() {
  return ProductOption.find({ deletedDate: null })
}

function getAllByGroupId(id: string) {
  return ProductOption.find({ deletedDate: null, groupId: id })
}

async function getById(id: string) {
  try {
    return ProductOption.findById(id)
  } catch {
    throw 'ProductOption Not Found'
  }
}

async function create(
  productOptionGroupInfo: ProductOptionGroupInfoCreate,
  productOptionInfo: ProductOptionInfoCreate
) {
  const productOption: ProductOptionInfoCreate = new ProductOption(productOptionInfo)
  await productOption.save()

  productOptionGroupInfo.productOptions.push(productOption)
  await productOptionGroupInfo.save()
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

export const productOptionRepository = {
  getAll,
  getAllByGroupId,
  getById,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}
