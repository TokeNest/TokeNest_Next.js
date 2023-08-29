import { apiHandler } from '@/app/_helpers/server/api'
import joi from 'joi'
import { productRepository } from '@/app/_helpers/server/_repository/store/productRepository'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'

module.exports = apiHandler({
  GET: getAll,
  POST: create,
})

function getAll(_req: Request, { params }: ParamsInputId) {
  return productRepository.getAll()
}

async function create(req: Request, { params }: ParamsInputId) {
  return productRepository.save(params.id, await req.json())
}

create.schema = joi.object({
  productName: joi.string().required(),
  productInfo: joi.string().required(),
  productStatus: joi.string().required(),
  productIntro: joi.string().required(),
  productPrice: joi.number().required(),
  productCategory: joi.string().required(),
})
