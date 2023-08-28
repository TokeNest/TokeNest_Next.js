import { db } from '@/app/_helpers/server'
import { OrderInfo } from '@/variables/interface/api/order'
import {
  orderOptionProjection,
  orderProjection,
  productOptionProjection,
} from '@/variables/enum/projection-enum'

const Order = db.Order

const getAll = async (): Promise<(Omit<OrderInfo, never> & {})[]> =>
  await Order.find({ deletedDate: null }, orderProjection)
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
      populate: {
        path: 'optionGroups',
        select: productOptionProjection,
      },
      select: orderOptionProjection,
    })
    .exec()
}

const create = async (params: any): Promise<void> => {
  const order = new Order(params)
  await order.save()
}

async function update(id: string, params: any): Promise<void> {
  const order = await Order.findById(id)
  if (!order) {
    throw 'Order Not Found'
  }

  Object.assign(order, params)

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
  softDelete: _softDelete,
  delete: _delete,
}
