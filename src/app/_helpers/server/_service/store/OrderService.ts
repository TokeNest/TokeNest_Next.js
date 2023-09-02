import { OrderInfoCreate } from '@/variables/interface/api/order-interface'
import { orderRepository } from '@/app/_helpers/server/_repository/store/OrderRepository'
import { orderOptionRepository } from '@/app/_helpers/server/_repository/store/OrderOptionRepository'
import { storeRepository } from '@/app/_helpers/server/_repository/store/StoreRepository'
import { productRepository } from '@/app/_helpers/server/_repository/store/ProductRepository'
import { productOptionRepository } from '@/app/_helpers/server/_repository/store/ProductOptionRepository'

const createOrder = async (params: OrderInfoCreate): Promise<string> => {
  // parameter validate check
  try {
    await validateParams(params)
    console.log('validate function finish')
  } catch (error) {
    console.log(error)
  }

  console.log('validate finish')
  const optionIds: string[] = []

  await Promise.all(
    params.orderOptions.map(async (orderOption) => {
      optionIds.push(await orderOptionRepository.create(orderOption))
    })
  )
  const id = await orderRepository.create(params)
  await Promise.all(
    optionIds.map(async (optionId) => {
      await orderRepository.addOrderOptions(id, optionId)
    })
  )
  console.log('return id')
  return id
}

const getOrder = async (id: string) => {
  return await orderRepository.getById(id)
}

const validateParams = async (params: OrderInfoCreate): Promise<void> => {
  if (!(await storeRepository.getById(params.store))) {
    return Promise.reject('Store Not Found')
    // throw 'Store Not Found'
  }
  await Promise.all(
    params.orderOptions.map(async (orderOption) => {
      if (!(await productRepository.getById(orderOption.product))) {
        console.log('없음')
        // return Promise.reject('Product Not Found')
        throw 'Product Not Found'
      } else {
        console.log('exists')
      }
      console.log('before promise all')
      orderOption.productOptions.map(async (productOption) => {
        console.log('ㅁㄽㄷㄱㅁㅇㄴㄻㄴㅇㄻ promise all')
        console.log(await productOptionRepository.getById(productOption))
        if (!(await productOptionRepository.getById(productOption))) {
          console.log('없음')
          // return Promise.reject('ProductOption Not Found')
          throw 'ProductOption Not Found'
        } else {
          console.log('있음')
        }
      })
    })
  )
  console.log('finish')
}

export const orderService = {
  createOrder,
  getOrder,
}
