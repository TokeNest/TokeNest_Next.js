import { apiHandler } from '@/app/_helpers/server/api'
import { kioskService } from '@/app/_helpers/server/_service'

module.exports = apiHandler({
  GET: getAll,
})
export async function getAll(_request: Request, { params: { storeId } }: any) {
  return await kioskService.getProductList(storeId)
}
