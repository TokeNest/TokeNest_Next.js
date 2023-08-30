import { db } from '@/app/_helpers/server'
import { ProductOptionInfoSave } from '@/variables/interface/api/product-option-info'
import { ProductOptionGroupInfoSave } from '@/variables/interface/api/product-option-group'
import { TokenInfo } from '@/variables/interface/api/token-interface'

// TODO #2 리펙토링 & 토큰 입력 시 등록 로직 추가 (토큰등록 Api필요할 듯??)
const ProductOption = db.ProductOption

const getAll = () => {
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
  productOptionGroupInfo: ProductOptionGroupInfoSave,
  productOptionInfo: ProductOptionInfoSave,
  tokenInfo: TokenInfo | null
) {
  const productOption: ProductOptionInfoSave = new ProductOption(productOptionInfo)
  if (tokenInfo) {
    productOption.token = tokenInfo
  }
  await productOption.save!()

  productOptionGroupInfo.productOptions.push(productOption)
  return (await productOptionGroupInfo.save!())._id
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
