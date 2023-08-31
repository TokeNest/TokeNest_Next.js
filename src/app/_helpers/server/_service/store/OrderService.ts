import { OrderInfoCreate } from '@/variables/interface/api/order-interface'
import { orderRepository } from '@/app/_helpers/server/_repository/store/OrderRepository'
import { orderOptionRepository } from '@/app/_helpers/server/_repository/store/OrderOptionRepository'
import { storeRepository } from '@/app/_helpers/server/_repository/store/StoreRepository'
import { productRepository } from '@/app/_helpers/server/_repository/store/ProductRepository'
import { productOptionRepository } from '@/app/_helpers/server/_repository/store/ProductOptionRepository'

const createOrder = async (params: OrderInfoCreate): Promise<string> => {
  if (!(await storeRepository.getById(params.store))) {
    return Promise.reject('Store Not Found')
  }
  const id = await orderRepository.create(params)
  const optionIds: string[] = []
  await Promise.all(
    params.orderOptions.map(async (orderOption) => {
      if (!(await productRepository.getById(orderOption.product))) {
        return Promise.reject('Product Not Found')
      }
      orderOption.productOptions.map(async (productOption) => {
        if (!(await productOptionRepository.getById(productOption))) {
          throw 'ProductOption Not Found'
        }
      })
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
  return await orderRepository.getById(id)
}

export const orderService = {
  createOrder,
  getOrder,
}
