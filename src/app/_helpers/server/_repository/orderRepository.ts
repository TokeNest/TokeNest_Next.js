import { db } from '@/app/_helpers/server'

const Order = db.Order

const orderProjection = {
  orderNum: true,
  orderStatus: true,
  OrderOptions: true,
}

const orderOptionProjection = {
  orderAmount: true,
  product: true,
  productOptionPrice: true,
}

const productOptionProjection = {
  productOptionName: true,
  productOptionPrice: true,
}

const getAll = async (): Promise<any> => {
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
}

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
