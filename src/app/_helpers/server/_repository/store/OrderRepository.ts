import { db } from '@/app/_helpers/server'
import { OrderInfo, OrderInfoCreate } from '@/variables/interface/api/order-interface'
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

const getAll = async (): Promise<(Omit<OrderInfo, never> & {})[]> =>
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
    .exec()

const getById = async (id: string): Promise<any> => {
  await Order.find({ _id: id, deletedDate: null }, orderProjection)
    .populate({
      path: 'orderOptions',
      match: { deletedDate: { $eq: null } },
      populate: [
        {
          path: 'product',
          select: productProjection,
        },
        {
          path: 'optionGroups',
          select: productOptionProjection,
        },
      ],
      select: orderOptionProjection,
    })
    .populate({
      path: 'store',
      match: { deletedDate: { $eq: null } },
      select: storeProjection,
    })
    .exec()
}

const create = async (params: OrderInfoCreate): Promise<string> => {
  console.log(params)
  const order = new Order({ ...params })
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
  softDelete: _softDelete,
  delete: _delete,
}
