import { apiHandler } from '@/app/_helpers/server/api'
import joi from 'joi'
import { orderService } from '@/app/_helpers/server/_service/store/OrderService'
import { orderRepository } from '@/app/_helpers/server/_repository/store/OrderRepository'

module.exports = apiHandler({
  POST: createOrder,
  GET: getAllOrder,
})

export async function createOrder(req: Request) {
  return await orderService.createOrder(await req.json())
}

createOrder.schema = joi.object({
  orderNum: joi.number().required(),
  store: joi.string().required(),
  orderOptions: joi.array().items({
    orderAmount: joi.number().required(),
    product: joi.string().required(),
    productOptions: joi.array().items(joi.string()),
  }),
})

export async function getAllOrder(_req: Request) {
  return await orderRepository.getAll()
}
