import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { orderService } from '@/app/_helpers/server/_service/store/OrderService'
import { orderRepository } from '@/app/_helpers/server/_repository/store/OrderRepository'
import joi from 'joi'

module.exports = apiHandler({
  GET: getOrder,
  PUT: updateStatus,
})

export async function getOrder(_req: Request, { params }: ParamsInputId) {
  return orderService.getOrder(params.id)
}

export async function updateStatus(req: Request, { params }: ParamsInputId) {
  return orderRepository.updateStatus(params.id, await req.json())
}

updateStatus.schema = joi.object({
  orderStatus: joi
    .string()
    .valid('결제완료', '결제취소', '주문취소', '주문접수', '상품준비중', '상품준비완료')
    .required(),
})
