import { ProductInfo } from '@/variables/interface/api/product'

export default function isExistProduct(product: ProductInfo) {
  if (!product) {
    throw 'Product Not Found'
  }
}
