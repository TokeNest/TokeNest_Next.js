import { StoreInfo } from '@/variables/interface/api/store-interface'
import { storeRepository } from '@/app/_helpers/server/_repository/store/StoreRepository'
import { userRepository } from '@/app/_helpers/server/_repository/account/UserRepository'
import { productService } from '@/app/_helpers/server/_service/store/ProductService'

const createStoreByUserId = async (id: string, storeInfo: StoreInfo) =>
  (await userRepository.getById(id))
    ? storeRepository.create(id, storeInfo)
    : Promise.reject('user not found')

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

const softDeleteStoreById = async (id: string) => {
  if (!(await storeRepository.getById(id))) {
    throw 'store not found'
  }
  await productService.softDeleteProductByStoreId(id)
  return storeRepository.softDelete(id)
}

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
