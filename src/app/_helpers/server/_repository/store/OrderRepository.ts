import { db } from '@/app/_helpers/server'
import { OrderInfo, OrderInfoCreate } from '@/variables/interface/api/order-interface'
import { orderOptionProjection, orderProjection } from '@/variables/projection/projection'

const Order = db.Order

const storeProjection = {
  storeName: true,
}

const productProjection = {
  productName: true,
}

const optionProjection = {
  productOptionName: true,
  productOptionPrice: true,
}

const getAll = async (): Promise<(Omit<Omit<OrderInfo, never> & {}, never> & {})[]> =>
  Order.find({ deletedDate: null }, orderProjection)
    .populate({
      path: 'orderOptions',
      populate: [
        {
          path: 'product',
          select: productProjection,
        },
        {
          path: 'productOptions',
          select: optionProjection,
        },
      ],
      select: orderOptionProjection,
    })
    .populate({
      path: 'store',
      select: storeProjection,
    })
    .exec()

const getById = async (id: string): Promise<OrderInfo> =>
  Order.findOne({ _id: id, deletedDate: null }, orderProjection)
    .populate({
      path: 'orderOptions',
      populate: [
        {
          path: 'product',
          select: productProjection,
        },
        {
          path: 'productOptions',
          select: optionProjection,
        },
      ],
      select: orderOptionProjection,
    })
    .populate({
      path: 'store',
      select: storeProjection,
    })
    .exec()

const create = async (params: OrderInfoCreate): Promise<string> => {
  // const order = new Order({ ...params })
  const order = new Order({
    orderNum: params.orderNum,
    store: params.store,
    orderOptions: [],
  })
  await order.save()
  return order._id
}

const updateStatus = async (id: string, orderStatus: string): Promise<String> => {
  const order = await Order.findById(id)
  if (!order) {
    throw 'Order Not Found'
  }
  order.orderStatus = orderStatus
  return (await order.save())._id
}

const addOrderOptions = async (id: string, optionId: string): Promise<String> => {
  const order = await Order.findById(id)
  if (!order) {
    throw 'Order Not Found'
  }

  order.orderOptions.push(optionId)
  return (await order.save())._id
}

const _softDelete = async (id: string): Promise<void> => {
  const order = await Order.findById(id)
  if (!order) {
    throw 'Order Not Found'
  }

  order.deletedDate = new Date()
  return (await order.save())._id
}

const _delete = async (id: string): Promise<void> => {
  await Order.findByIdAndDelete(id)
}

export const orderRepository = {
  getAll,
  getById,
  create,
  addOrderOptions,
  updateStatus,
  softDelete: _softDelete,
  delete: _delete,
}
