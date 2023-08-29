import { apiHandler } from '@/app/_helpers/server/api'
import { productService } from '@/app/_helpers/server/_service/store/productService'

module.exports = apiHandler({
  GET: getAll,
})

async function getAll(req: Request) {
  return productService.getProducts()
}
