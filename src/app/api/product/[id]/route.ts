import { apiHandler } from '@/app/_helpers/server/api'
import joi from 'joi'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'
import { productRepository } from '@/app/_helpers/server/_repository/store/productRepository'
import { productService } from '@/app/_helpers/server/_service/store/productService'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(_req: Request, { params }: ParamsInputId) {
  return productRepository.getById(params.id)
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
  return productService.softDeleteProduct(params.id)
}
