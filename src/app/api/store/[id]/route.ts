import { apiHandler } from '@/app/_helpers/server/api'
import joi from 'joi'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'
import { storeRepository } from '@/app/_helpers/server/_repository/storeRepository'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(_req: Request, { params }: ParamsInputId) {
  return await storeRepository.getById(params.id)
}

async function update(req: Request, { params }: ParamsInputId) {
  const body = await req.json()
  await storeRepository.update(params.id, body)
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

async function _delete(req: Request, { params }: ParamsInputId) {
  await storeRepository.softDelete(params.id)
}
