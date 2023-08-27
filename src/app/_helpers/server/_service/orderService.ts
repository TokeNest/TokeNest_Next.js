import { orderRepository } from '@/app/_helpers/server/_repository/orderRepository'

const create = async (storeId: string, params: any) => {
  await orderRepository.create(params)
}

export const orderService = {
  create,
}
