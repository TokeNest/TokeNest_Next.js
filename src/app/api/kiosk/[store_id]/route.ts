import { apiHandler } from '@/app/_helpers/server/api'
import { kioskService } from '@/app/_helpers/server/_service'

module.exports = apiHandler({
  GET: getAll,
})
export async function getAll(request: Request, { params: { store_id } }: any) {
  return await kioskService.getProductList(store_id)
}
