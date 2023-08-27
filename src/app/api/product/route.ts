import { apiHandler } from '@/app/_helpers/server/api'
import { productRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'

module.exports = apiHandler({
  GET: getAll,
  POST: create,
})

function getAll() {
  return productRepository.getAll()
}

async function create(req: Request) {
  const body = await req.json()
  await productRepository.create(body)
}

create.schema = joi.object({
  productName: joi.string().required(),
  productInfo: joi.string().required(),
  productStatus: joi.string().required(),
  productIntro: joi.string().required(),
  productPrice: joi.number().required(),
  productCategory: joi.string().required(),
  storeId: joi.string().required(),
})
