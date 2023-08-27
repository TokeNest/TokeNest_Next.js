import { db } from '@/app/_helpers/server'

const Order = db.Order

export const orderRepository = {
  getAll,
  getById,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}

async function getAll() {
  return await Order.find({ deleted_date: null })
}

async function getById(id: string) {
  try {
    return await Order.findById(id)
  } catch {
    throw 'Order Not Found'
  }
}

async function create(params: any) {
  const order = new Order(params)
  await order.save()
}

async function update(id: string, params: any) {
  const order = await Order.findById(id)
  if (!order) {
    throw 'Order Not Found'
  }

  Object.assign(order, params)

  await order.save()
}

async function _softDelete(id: string) {
  const order = await Order.findById(id)
  if (!order) {
    throw 'Order Not Found'
  }

  order.deleted_date = new Date()

  await order.save()
}

async function _delete(id: string) {
  await Order.findByIdAndDelete(id)
}
