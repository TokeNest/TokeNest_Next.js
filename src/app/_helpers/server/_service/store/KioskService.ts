import { CategoryInfo } from '@/variables/interface/api/categori-interface'
import { productRepository } from '@/app/_helpers/server/_repository/store/ProductRepository'

const getProductList = async (id: string) => {
  const products = await productRepository.getAllByStoreId(id)
  const categoryList: CategoryInfo[] = []
  const categories: string[] = []

  for (const product of products) {
    if (categories.includes(product.productCategory)) {
      for (const category of categoryList) {
        if (category.category === product.productCategory) {
          category.products.push(product)
        }
      }
    } else {
      categories.push(product.productCategory)
      categoryList.push({ category: product.productCategory, products: [product] })
    }
  }
  return categoryList
}

export const kioskService = {
  getProductList,
}
