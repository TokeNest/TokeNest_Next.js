import { apiHandler } from '@/app/_helpers/server/api'
import { kioskService } from '@/app/_helpers/server/_service'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'

module.exports = apiHandler({
  GET: getAll,
})
export async function getAll(_request: Request, { params }: ParamsInputId) {
  return await kioskService.getProductList(params.id)
}
