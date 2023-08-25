import joi from 'joi'
import { apiHandler } from '@/app/_helpers/server/api'
import { storeRepository } from '@/app/_helpers/server/_repository'

module.exports = apiHandler({
  GET: getAll,
  POST: create,
})

async function getAll(req: Request) {
  return storeRepository.getAll()
}

async function create(req: Request) {
  console.log('test')
  const body = await req.json()
  await storeRepository.create(body)
}

create.schema = joi.object({
  store_name: joi.string().required(),
  store_tel: joi.string().required(),
  store_email: joi.string().required(),
  store_category: joi.string().required(),
  store_off_day: joi.string().required(),
  store_open_close_time: joi.string().required(),
  store_status: joi.string().required(),
})
