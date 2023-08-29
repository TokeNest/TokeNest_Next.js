import { StoreInfo } from '@/variables/interface/api/store-interface'
import { storeRepository } from '@/app/_helpers/server/_repository/store/StoreRepository'

const createStoreByUserId = async (id: string, storeInfo: StoreInfo) =>
  storeRepository.create(id, storeInfo)

const getStores = async () => {
  const stores = await storeRepository.getAll()
  return stores.length ? stores : Promise.reject('store not found')
}

const getStoreById = async (id: string) => {
  const store = await storeRepository.getById(id)
  return store ? store : Promise.reject('store not found')
}

const getStoreByUserId = async (id: string) => {
  const stores = await storeRepository.getByUserId(id)
  return stores.length ? stores : Promise.reject('store not found')
}

const updateStoreById = async (id: string, storeInfo: StoreInfo) =>
  (await storeRepository.getById(id))
    ? storeRepository.update(id, storeInfo)
    : Promise.reject('store not found')

const softDeleteStoreById = async (id: string) =>
  (await storeRepository.getById(id))
    ? storeRepository.softDelete(id)
    : Promise.reject('store not found')

// const _delete = async (id: string) =>
//   (await storeRepository.getById(id))
//     ? storeRepository.delete(id)
//     : Promise.reject('store not found')

export const storeService = {
  createStoreByUserId,
  getStores,
  getStoreById,
  getStoreByUserId,
  updateStoreById,
  softDeleteStoreById,
  // delete: _delete,
}
