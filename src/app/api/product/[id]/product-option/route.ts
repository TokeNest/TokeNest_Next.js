import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import joi from 'joi'
import { productOptionGroupService } from '@/app/_helpers/server/_service/store/ProductOptionGroupService'

function getAllByProductId(_req: Request, { params }: ParamsInputId) {
  return productOptionGroupService.getProductOptionGroupsByProductId(params.id)
}

async function create(req: Request, { params }: ParamsInputId) {
  return productOptionGroupService.create(params.id, await req.json())
}

// Token Schema
const tokenSchema = joi.object({
  tokenAddress: joi.string().allow(null),
})

// Product Option Schema
const productOptionSchema = joi.object({
  productOptionName: joi.string().required(),
  productOptionIsDefault: joi.boolean(),
  productOptionPrice: joi.number().required(),
  tokenRatio: joi.number().required(),
  token: tokenSchema.required(),
})

// Create Schema
create.schema = joi.object({
  productOptionGroupName: joi.string().required(),
  productOptionGroupType: joi.string().required(),
  productOptions: joi.array().items(productOptionSchema).min(1).required(),
})

module.exports = apiHandler({
  GET: getAllByProductId,
  POST: create,
})
