import { apiHandler } from '@/app/_helpers/server/api'
import { productRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(_req: Request, { params }: ParamsInputId) {
  return await productRepository.getById(params.id)
}

async function update(req: Request, { params }: ParamsInputId) {
  const body = await req.json()
  await productRepository.update(params.id, body)
}

update.schema = joi.object({
  productName: joi.string().required(),
  productInfo: joi.string().required(),
  productStatus: joi.string().required(),
  productIntro: joi.string().required(),
  productPrice: joi.number().required(),
  storeId: joi.string().required(),
})

async function _delete(_req: Request, { params }: ParamsInputId) {
  await productRepository.softDelete(params.id)
}
