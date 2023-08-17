import { db } from '@/app/_helpers/server'

const Store = db.Store

export const storeRepository = {
  create,
  update,
  softDelete: _softDelete,
  delete: _delete,
}

async function create() {}

async function update() {}

async function _softDelete() {}

async function _delete() {}
