import { apiHandler } from '@/app/_helpers/server/api'
import { productRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'

module.exports = apiHandler({
  GET: getAll,
  POST: create,
})

async function getAll(req: Request) {
  return await productRepository.getAll()
}

async function create(req: Request) {
  const body = await req.json()
  await productRepository.create(body)
}

create.schema = joi.object({
  product_name: joi.string().required(),
  product_info: joi.string().required(),
  product_status: joi.string().required(),
  product_intro: joi.string().required(),
  product_price: joi.number().required(),
  product_category: joi.string().required(),
  store_id: joi.string().required(),
})
