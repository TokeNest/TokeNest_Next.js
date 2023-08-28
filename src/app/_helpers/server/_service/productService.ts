import { productRepository } from '@/app/_helpers/server/_repository/productRepository'
import { fileService } from '@/app/_helpers/server/_service/fileService'

const getProducts = async (id: string) => {
  const products = productRepository.getAll()
}

const softDeleteProduct = async (id: string) => {
  const product = await productRepository.getById(id)
  // delete file
  await fileService.softDeleteFile(product.file._id)
  return await productRepository.softDelete(id)
}

export const productService = {
  getProducts,
  softDeleteProduct,
}
