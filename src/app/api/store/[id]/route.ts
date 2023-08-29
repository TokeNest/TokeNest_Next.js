import { apiHandler } from '@/app/_helpers/server/api'
import joi from 'joi'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { storeService } from '@/app/_helpers/server/_service/store/storeService'

async function getById(_req: Request, { params }: ParamsInputId) {
  return storeService.getStoreById(params.id)
}

async function update(req: Request, { params }: ParamsInputId) {
  return storeService.updateStoreById(params.id, await req.json())
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
  return storeService.softDeleteStoreById(params.id)
}

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})
