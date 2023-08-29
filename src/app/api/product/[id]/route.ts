import { apiHandler } from '@/app/_helpers/server/api'
import joi from 'joi'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { productService } from '@/app/_helpers/server/_service/store/ProductService'

async function getById(_req: Request, { params }: ParamsInputId) {
  return productService.getProductById(params.id)
}

async function update(req: Request, { params }: ParamsInputId) {
  return productService.updateProductById(params.id, await req.json())
}

update.schema = joi.object({
  productName: joi.string().required(),
  productInfo: joi.string().required(),
  productStatus: joi.string().required(),
  productIntro: joi.string().required(),
  productPrice: joi.number().required(),
})

async function _delete(_req: Request, { params }: ParamsInputId) {
  return productService.softDeleteProduct(params.id)
}

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})
