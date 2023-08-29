import { productRepository } from '@/app/_helpers/server/_repository/store/ProductRepository'
import { fileService } from '@/app/_helpers/server/_service/account/FileService'
import { fileRepository } from '@/app/_helpers/server/_repository/account/FileRepository'
import { ProductInfo } from '@/variables/interface/api/product-interface'

const createProduct = async (id: string, productInfo: ProductInfo) =>
  await productRepository.create(id, productInfo)

const getProducts = async () => {
  const products = await productRepository.getAll()
  return products.length ? products : Promise.reject('product not found')
}

const getProductsByStoreId = async (id: string) => {
  const products = await productRepository.getAllByStoreId(id)
  return products.length ? products : Promise.reject('product not found')
}

const softDeleteProduct = async (id: string) => {
  const fileId = await productRepository.getFileIdByProductId(id)

  if (fileId) {
    if (await fileRepository.getById(fileId)) {
      // delete file
      await fileService.softDeleteFileById(fileId)
    }
  }
  return productRepository.softDelete(id)
}

export const productService = {
  getProducts,
  getProductsByStoreId,
  softDeleteProduct,
}
