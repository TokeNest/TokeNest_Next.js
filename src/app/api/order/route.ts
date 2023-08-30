import { apiHandler } from '@/app/_helpers/server/api'
import joi from 'joi'
import { orderService } from '@/app/_helpers/server/_service/store/OrderService'

module.exports = apiHandler({
  POST: createOrder,
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
