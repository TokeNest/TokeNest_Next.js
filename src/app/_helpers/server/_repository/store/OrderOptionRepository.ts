import { db } from '@/app/_helpers/server'
import { OrderOptionInfoCreate } from '@/variables/interface/api/order-interface'

const OrderOption = db.OrderOption
const create = async (params: OrderOptionInfoCreate): Promise<string> => {
  const orderOption = new OrderOption(params)
  await orderOption.save()
  return orderOption._id
}

const _softDelete = async (id: string) => {
  const orderOption = await OrderOption.findById(id)
  if (!orderOption) {
    throw 'orderOption Not Found'
  }

  orderOption.deletedDate = new Date()
  return (await orderOption.save())._id
}

const _delete = async (id: string): Promise<void> => {
  await OrderOption.findByIdAndDelete(id)
}

export const orderOptionRepository = {
  create,
  softDelete: _softDelete,
  delete: _delete,
}
