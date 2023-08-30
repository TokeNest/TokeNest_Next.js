import { db } from '@/app/_helpers/server'
import { OrderOptionInfoCreate } from '@/variables/interface/api/order-interface'

const OrderOption = db.OrderOption

const getAll = async (): Promise<any> => {
  await OrderOption.find({ deletedDate: null }).exec()
}

const getById = async (id: string) => {
  await OrderOption.find({ _id: id, deletedDate: null }).exec()
}

const create = async (params: OrderOptionInfoCreate): Promise<string> => {
  const orderOption = new OrderOption(params)
  await orderOption.save()
  return orderOption._id
}

async function update(id: string, params: any): Promise<void> {
  const orderOption = await OrderOption.findById(id)
  if (!orderOption) {
    throw 'OrderOption Not Found'
  }

  Object.assign(orderOption, params)

  await orderOption.save()
}

const _softDelete = async (id: string): Promise<void> => {
  const orderOption = await OrderOption.findById(id)
  if (!orderOption) {
    throw 'orderOption Not Found'
  }

  orderOption.deletedDate = new Date()
  await orderOption.save()
}

const _delete = async (id: string): Promise<void> => {
  await OrderOption.findByIdAndDelete(id)
}

export const orderOptionRepository = {
  getAll,
  getById,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}
