import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'
import { productOptionGroupRepository } from '@/app/_helpers/server/_repository/productOptionGroupRepository'
import joi from 'joi'
import { productOptionGroupService } from '@/app/_helpers/server/_service/productOptionGroupService'

module.exports = apiHandler({
  GET: getAll,
  POST: create,
})

function getAll(_req: Request, { params }: ParamsInputId) {
  return productOptionGroupRepository.getAllByProductId(params.id)
}

async function create(req: Request, { params }: ParamsInputId) {
  return await productOptionGroupService.create(params.id, await req.json())
}

create.schema = joi.object({
  productOptionGroupName: joi.string().required(),
  productOptionGroupType: joi.string().required(),
  productOptions: joi.array().items({
    productOptionName: joi.string().required(),
    productOptionIsDefault: joi.boolean(),
    productOptionPrice: joi.number().required(),
  }),
})
