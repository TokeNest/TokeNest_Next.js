import { OrderInfoCreate } from '@/variables/interface/api/order-interface'
import { orderRepository } from '@/app/_helpers/server/_repository/store/OrderRepository'
import { orderOptionRepository } from '@/app/_helpers/server/_repository/store/OrderOptionRepository'

const createOrder = async (params: OrderInfoCreate) => {
  const id = await orderRepository.create(params)
  const optionIds: string[] = []
  await Promise.all(
    params.orderOptions.map(async (orderOption) => {
      optionIds.push(await orderOptionRepository.create(orderOption))
    })
  )
  await Promise.all(
    optionIds.map(async (optionId) => {
      await orderRepository.addOrderOptions(id, optionId)
    })
  )
  return id
}

const getOrder = async (id: string) => {
  return orderRepository.getById(id)
}

export const orderService = {
  createOrder,
  getOrder,
}
