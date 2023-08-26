import { apiHandler } from '@/app/_helpers/server/api'
import { productRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(req: Request, { params: { productId } }: any) {
  return await productRepository.getById(productId)
}

async function update(req: Request, { params: { productId } }: any) {
  const body = await req.json()
  await productRepository.update(productId, body)
}

update.schema = joi.object({
  productName: joi.string().required(),
  productInfo: joi.string().required(),
  productStatus: joi.string().required(),
  productIntro: joi.string().required(),
  productPrice: joi.number().required(),
  storeId: joi.string().required(),
})

async function _delete(req: Request, { params: { productId } }: any) {
  await productRepository.softDelete(productId)
}
