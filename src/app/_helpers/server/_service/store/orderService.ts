import { orderRepository } from '@/app/_helpers/server/_repository/store/orderRepository'

const createOrder = async () => {
  await orderRepository.create(params)
}

const getOrder = async () => {}

export const orderService = {
  createOrder,
  getOrder,
}
