import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { productOptionGroupRepository } from '@/app/_helpers/server/_repository/store/ProductOptionGroupRepository'
import joi from 'joi'
import { productOptionGroupService } from '@/app/_helpers/server/_service/store/ProductOptionGroupService'

module.exports = apiHandler({
  GET: getAllByProductId,
  POST: create,
})

function getAllByProductId(_req: Request, { params }: ParamsInputId) {
  return productOptionGroupRepository.getAllByProductId(params.id)
}

async function create(req: Request, { params }: ParamsInputId) {
  return productOptionGroupService.create(params.id, await req.json())
}

create.schema = joi.object({
  productOptionGroupName: joi.string().required(),
  productOptionGroupType: joi.string().required(),
  productOptions: joi.array().items({
    productOptionName: joi.string().required(),
    productOptionIsDefault: joi.boolean(),
    productOptionPrice: joi.number().required(),
    tokenRatio: joi.number().allow(null),
    tokenAddress: joi.string().allow(null),
  }),
})
