import { db } from '@/app/_helpers/server'
import { OrderInfoCreate } from '@/variables/interface/api/order-interface'
import {
  orderOptionProjection,
  orderProjection,
  productOptionProjection,
} from '@/variables/projection/projection'

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

const getAll = async (): Promise<any> => //Promise<(Omit<OrderInfo, never> & {})[]>
  Order.find({ deletedDate: null }, orderProjection)
    .populate({
      path: 'orderOptions',
      match: { deletedDate: { $eq: null } },
      populate: {
        path: 'optionGroups',
        select: productOptionProjection,
      },
      select: orderOptionProjection,
    })
    .populate({
      path: 'store',
    })
    .exec()

const getById = async (id: string): Promise<any> =>
  await Order.find({ _id: id, deletedDate: null }, orderProjection)
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

const update = async (id: string, params: any): Promise<void> => {
  const order = await Order.findById(id)
  if (!order) {
    throw 'Order Not Found'
  }

  Object.assign(order, params)

  await order.save()
}

const updateStatus = async (id: string, params: any): Promise<void> => {
  const order = await Order.findById(id)
  if (!order) {
    throw 'Order Not Found'
  }
  order.orderStatus = params.orderStatus
  await order.save()
}

const addOrderOptions = async (id: string, optionId: string): Promise<void> => {
  const order = await Order.findById(id)
  if (!order) {
    throw 'Order Not Found'
  }

  order.orderOptions.push(optionId)
  await order.save()
}

const _softDelete = async (id: string): Promise<void> => {
  const order = await Order.findById(id)
  if (!order) {
    throw 'Order Not Found'
  }

  order.deletedDate = new Date()
  await order.save()
}

const _delete = async (id: string): Promise<void> => {
  await Order.findByIdAndDelete(id)
}

export const orderRepository = {
  getAll,
  getById,
  create,
  update,
  addOrderOptions,
  updateStatus,
  softDelete: _softDelete,
  delete: _delete,
}
