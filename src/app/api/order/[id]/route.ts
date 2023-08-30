import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { orderService } from '@/app/_helpers/server/_service/store/OrderService'

module.exports = apiHandler({
  GET: getOrder,
})

export async function getOrder(req: Request, { params }: ParamsInputId) {
  return await orderService.getOrder(params.id)
}
