import { apiHandler } from '@/app/_helpers/server/api'
import joi from 'joi'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { productService } from '@/app/_helpers/server/_service/store/ProductService'

module.exports = apiHandler({
  GET: getByStoreId,
  POST: create,
})

function getByStoreId(_req: Request, { params }: ParamsInputId) {
  return productService.getProducts()
}

async function create(req: Request, { params }: ParamsInputId) {
  return productService.createProduct(params.id, await req.json())
}

create.schema = joi.object({
  productName: joi.string().required(),
  productInfo: joi.string().required(),
  productStatus: joi.string().required(),
  productIntro: joi.string().required(),
  productPrice: joi.number().required(),
  productCategory: joi.string().required(),
})
