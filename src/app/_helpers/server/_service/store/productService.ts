import { productRepository } from '@/app/_helpers/server/_repository/store/productRepository'
import isExistProduct from '@/utils/server/validate/validateProduct'
import { fileService } from '@/app/_helpers/server/_service/account/fileService'
import { fileRepository } from '@/app/_helpers/server/_repository/account/fileRepository'

const getProducts = async () => {
  return await productRepository.getAll()
}

const softDeleteProduct = async (id: string) => {
  const product = await productRepository.getById(id)
  isExistProduct(product)

  if (product.file._id) {
    if (await fileRepository.getById(product.file._id)) {
      // delete file
      await fileService.softDeleteFile(product.file._id)
    }
  }
  return await productRepository.softDelete(id)
}

export const productService = {
  getProducts,
  softDeleteProduct,
}
