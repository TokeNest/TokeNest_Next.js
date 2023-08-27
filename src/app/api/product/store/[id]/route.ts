import { apiHandler } from '@/app/_helpers/server/api'
import joi from 'joi'
import { productRepository } from '@/app/_helpers/server/_repository/productRepository'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'

module.exports = apiHandler({
  GET: getAll,
  POST: create,
})
function getAll() {
  return productRepository.getAll()
}

async function create(req: Request, { params }: ParamsInputId) {
  const body = await req.json()
  await productRepository.save(params.id, body)
}

create.schema = joi.object({
  productName: joi.string().required(),
  productInfo: joi.string().required(),
  productStatus: joi.string().required(),
  productIntro: joi.string().required(),
  productPrice: joi.number().required(),
  productCategory: joi.string().required(),
})
