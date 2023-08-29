import { storeService } from '@/app/_helpers/server/_service/store/storeService'
import joi from 'joi'
import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'

async function create(req: Request, { params }: ParamsInputId) {
  return storeService.createStoreByUserId(params.id, await req.json())
}

async function getByUserId(_req: Request, { params }: ParamsInputId) {
  return storeService.getStoreByUserId(params.id)
}

create.schema = joi.object({
  storeName: joi.string().required(),
  storeTel: joi.string().required(),
  storeEmail: joi.string().required(),
  storeCategory: joi.string().required(),
  storeOffDay: joi.string().required(),
  storeOpenCloseTime: joi.string().required(),
  storeStatus: joi.string().required(),
})

module.exports = apiHandler({
  POST: create,
  GET: getByUserId,
})
