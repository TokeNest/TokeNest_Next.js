import { db } from '@/app/_helpers/server'
import { productOptionRepository } from '@/app/_helpers/server/_repository/store/productOptionRepository'
import { ProductOptionGroupInfo } from '@/variables/interface/api/product-option-group'
import { ProductInfo } from '@/variables/interface/api/product-interface'

const ProductOptionGroup = db.ProductOptionGroup

const getAll = async () => ProductOptionGroup.find({ deletedDate: null }).exec()

const getAllByProductId = async (id: string) =>
  ProductOptionGroup.find({ deletedDate: null, product: id }).exec()

const getById = async (id: string): Promise<ProductOptionGroupInfo> =>
  ProductOptionGroup.findOne({ _id: id, deletedDate: null }).exec()

const create = async (
  id: string,
  productInfo: ProductInfo,
  productOptionGroupInfo: ProductOptionGroupInfo
) => {
  const productOptionGroup: ProductOptionGroupInfo = new ProductOptionGroup({
    product: id,
    productOptionGroupName: productOptionGroupInfo.productOptionGroupName,
    productOptionGroupType: productOptionGroupInfo.productOptionGroupType,
  })
  await productOptionGroup.save()

  // relation setting
  productInfo.productOptionGroups.push(productOptionGroup)
  await productInfo.save()

  for (const productOption of productOptionGroupInfo.productOptions) {
    await productOptionRepository.create(productOptionGroup, productOption)
  }
  return productOptionGroup._id
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

export const productOptionGroupRepository = {
  getAll,
  getAllByProductId,
  getById,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}
