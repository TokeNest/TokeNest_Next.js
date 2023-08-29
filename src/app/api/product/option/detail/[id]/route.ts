import { apiHandler } from '@/app/_helpers/server/api'
import { productOptionRepository } from '@/app/_helpers/server/_repository/store/productOptionRepository'
import joi from 'joi'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(_req: Request, { params }: ParamsInputId) {
  return productOptionRepository.getById(params.id)
}

async function update(req: Request, { params }: ParamsInputId) {
  const body = await req.json()
  await productOptionRepository.update(params.id, body)
}

update.schema = joi.object({
  productOptionName: joi.string().required(),
  productIsDefault: joi.boolean().required(),
  productOptionPrice: joi.number().required(),
})

async function _delete(_req: Request, { params }: ParamsInputId) {
  await productOptionRepository.softDelete(params.id)
}
