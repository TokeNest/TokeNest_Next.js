import { apiHandler } from '@/app/_helpers/server/api'
import { kioskService } from '@/app/_helpers/server/_service/store/KioskService'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'

module.exports = apiHandler({
  GET: getAll,
})
export async function getAll(_request: Request, { params }: ParamsInputId) {
  return kioskService.getProductList(params.id)
}
