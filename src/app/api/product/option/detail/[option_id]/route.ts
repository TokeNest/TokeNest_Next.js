import { apiHandler } from '@/app/_helpers/server/api'
import { prdOptRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(req: Request, { params: { option_id } }: any) {
  return await prdOptRepository.getById(option_id)
}

async function update(req: Request, { params: { option_id } }: any) {
  const body = await req.json()
  await prdOptRepository.update(option_id, body)
}

update.schema = joi.object({
  product_option_name: joi.string().required(),
  product_option_is_default: joi.boolean().required(),
  product_option_price: joi.number().required(),
})

async function _delete(req: Request, { params: { option_id } }: any) {
  await prdOptRepository.softDelete(option_id)
}
