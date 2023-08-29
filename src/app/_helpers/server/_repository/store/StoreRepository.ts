import { db } from '@/app/_helpers/server'
import { StoreInfo, StoreInfoDelete } from '@/variables/interface/api/store-interface'
import { storeProjection } from '@/variables/projection/projection'

const Store = db.Store

// TODO store의 조회범위 어떻게 할지 정해야됨.
const create = async (id: string, storeInfo: StoreInfo): Promise<string> =>
  (await new Store({ user: id, ...storeInfo }).save())._id

const getAll = async (): Promise<StoreInfo[]> =>
  Store.find({ deletedDate: null }, storeProjection).exec()

const getById = async (id: string): Promise<StoreInfo> =>
  Store.findOne({ _id: id, deletedDate: null }, storeProjection).exec()

const getByUserId = async (id: string): Promise<StoreInfo[]> =>
  Store.find({ user: id, deletedDate: null }, storeProjection).exec()

const update = async (id: string, storeInfo: StoreInfo): Promise<string> => {
  const store = await getById(id)
  Object.assign(store, storeInfo)
  return (await store.save())._id
}

const softDelete = async (id: string): Promise<string> => {
  const store: StoreInfoDelete = await Store.findOne({ _id: id, deletedDate: null }).exec()
  store.deletedDate = new Date()
  return (await store.save())._id
}

// const _delete = (id: string) => await Store.findByIdAndDelete(id)

export const storeRepository = {
  create,
  getAll,
  getById,
  getByUserId,
  update,
  softDelete,
  // delete: _delete,
}
