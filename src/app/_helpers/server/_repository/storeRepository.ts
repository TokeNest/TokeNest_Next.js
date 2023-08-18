import { db } from '@/app/_helpers/server'

const Store = db.Store

export const storeRepository = {
  getAll,
  getById,
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}

async function getAll() {
  return await Store.find({ deleted_date: null })
}

async function getById(id: string) {
  try {
    return await Store.findById(id)
  } catch {
    throw 'Store Not Found'
  }
}

async function create(params: any) {
  const store = new Store(params)
  await store.save()
}

async function update(id: string, params: any) {
  const store = await Store.findById(id)
  if (!store) {
    throw 'Store Not Found'
  }

  Object.assign(store, params)

  await store.save()
}

async function _softDelete(id: string) {
  const store = await Store.findById(id)
  if (!store) {
    throw 'Store Not Found'
  }

  store.deleted_date = new Date()

  await store.save()
}

async function _delete(id: string) {
  await Store.findByIdAndDelete(id)
}
