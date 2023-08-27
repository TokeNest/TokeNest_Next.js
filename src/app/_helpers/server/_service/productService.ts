import { productRepository } from '@/app/_helpers/server/_repository/productRepository'

const getProducts = async (id: string) => {
  const products = productRepository.getAll()
}

export const productService = {}
