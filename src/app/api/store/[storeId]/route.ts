import { apiHandler } from '@/app/_helpers/server/api'
import { storeRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(req: Request, { params: { storeId } }: any) {
  return await storeRepository.getById(storeId)
}

async function update(req: Request, { params: { storeId } }: any) {
  const body = await req.json()
  await storeRepository.update(storeId, body)
}

update.schema = joi.object({
  storeName: joi.string().required(),
  storeTel: joi.string().required(),
  storeEmail: joi.string().required(),
  storeCategory: joi.string().required(),
  storeOffDay: joi.string().required(),
  storeOpenCloseTime: joi.string().required(),
  storeStatus: joi.string().required(),
})

async function _delete(req: Request, { params: { storeId } }: any) {
  await storeRepository.softDelete(storeId)
}
