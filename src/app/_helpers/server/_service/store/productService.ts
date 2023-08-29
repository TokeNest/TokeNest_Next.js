import { productRepository } from '@/app/_helpers/server/_repository/store/productRepository'
import { fileService } from '@/app/_helpers/server/_service/account/fileService'
import { fileRepository } from '@/app/_helpers/server/_repository/account/fileRepository'

const getProducts = async () => {
  return productRepository.getAll()
}

const softDeleteProduct = async (id: string) => {
  const fileId = await productRepository.getFileIdByProductId(id)

  if (fileId) {
    if (await fileRepository.getById(fileId)) {
      // delete file
      await fileService.softDeleteFile(fileId)
    }
  }
  return productRepository.softDelete(id)
}

export const productService = {
  getProducts,
  softDeleteProduct,
}
