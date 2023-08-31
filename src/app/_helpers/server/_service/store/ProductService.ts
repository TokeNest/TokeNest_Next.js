import { productRepository } from '@/app/_helpers/server/_repository/store/ProductRepository'
import { fileService } from '@/app/_helpers/server/_service/account/FileService'
import { fileRepository } from '@/app/_helpers/server/_repository/account/FileRepository'
import { ProductInfo } from '@/variables/interface/api/product-interface'
import { storeRepository } from '@/app/_helpers/server/_repository/store/StoreRepository'
import { productOptionGroupService } from '@/app/_helpers/server/_service/store/ProductOptionGroupService'

const createProduct = async (id: string, productInfo: ProductInfo) =>
  (await storeRepository.getById(id))
    ? await productRepository.create(id, productInfo)
    : Promise.reject('store not found')

const getProducts = async () => {
  const products = await productRepository.getAll()
  return products.length ? products : Promise.reject('product not found')
}

const getProductsByStoreId = async (id: string) => {
  const products = await productRepository.getAllByStoreId(id)
  return products.length ? products : Promise.reject('product not found')
}

const getProductById = async (id: string) => {
  const product = await productRepository.getById(id)
  return product ? product : Promise.reject('product not found')
}

const softDeleteProduct = async (id: string) => {
  if (!(await productRepository.getById(id))) {
    throw 'product not found'
  }

  const fileId = await productRepository.getFileIdById(id)
  if (fileId) {
    if (await fileRepository.getById(fileId)) {
      // delete file
      await fileService.softDeleteFileById(fileId)
    }
  }

  return productRepository.softDelete(id)
}

const updateProductById = async (id: string, productInfo: ProductInfo) =>
  (await productRepository.getById(id))
    ? productRepository.update(id, productInfo)
    : Promise.reject('product not found')

const softDeleteProductByStoreId = async (id: string) => {
  const products = await productRepository.getAllByStoreId(id)
  for (const product of products) {
    await softDeleteOptions(product.id)
  }
}

const softDeleteProductById = async (id: string) => {
  if (await productRepository.getById(id)) {
    throw 'product not found'
  }
  return softDeleteOptions(id)
}

const softDeleteOptions = async (id: string) => {
  await productOptionGroupService.softDeleteProductOptionGroupByProductId(id)
  return productRepository.softDelete(id)
}

export const productService = {
  createProduct,
  getProducts,
  getProductsByStoreId,
  getProductById,
  softDeleteProduct,
  updateProductById,
  softDeleteProductByStoreId,
  softDeleteProductById,
}
