import { apiHandler } from '@/app/_helpers/server/api'
import { productRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(req: Request, { params: { product_id } }: any) {
  return await productRepository.getById(product_id)
}

async function update(req: Request, { params: { product_id } }: any) {
  const body = await req.json()
  await productRepository.update(product_id, body)
}

update.schema = joi.object({
  product_name: joi.string().required(),
  product_info: joi.string().required(),
  product_status: joi.string().required(),
  product_intro: joi.string().required(),
  product_price: joi.number().required(),
  store_id: joi.string().required(),
})

async function _delete(req: Request, { params: { product_id } }: any) {
  await productRepository.softDelete(product_id)
}
