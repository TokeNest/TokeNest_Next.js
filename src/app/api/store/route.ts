import joi from 'joi'
import { apiHandler } from '@/app/_helpers/server/api'
import { storeRepository } from '@/app/_helpers/server/_repository/store/storeRepository'

module.exports = apiHandler({
  GET: getAll,
  POST: create,
})

async function getAll() {
  return storeRepository.getAll()
}

async function create(req: Request) {
  return await storeRepository.create(await req.json())
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
