import { apiHandler } from '@/app/_helpers/server/api'
import { storeRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(req: Request, { params: { store_id } }: any) {
  return await storeRepository.getById(store_id)
}

async function update(req: Request, { params: { store_id } }: any) {
  const body = await req.json()
  await storeRepository.update(store_id, body)
}

update.schema = joi.object({
  store_name: joi.string().required(),
  store_tel: joi.string().required(),
  store_email: joi.string().required(),
  store_category: joi.string().required(),
  store_off_day: joi.string().required(),
  store_open_close_time: joi.string().required(),
  store_status: joi.string().required(),
})

async function _delete(req: Request, { params: { store_id } }: any) {
  await storeRepository.softDelete(store_id)
}
