import { apiHandler } from '@/app/_helpers/server/api'
import { prdOptGrpRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'

module.exports = apiHandler({
  GET: getAll,
  POST: create,
})

function getAll(req: Request, { params: { product_id } }: any) {
  return prdOptGrpRepository.getAllByProductId(product_id)
}

async function create(req: Request, { params: { product_id } }: any) {
  const body = await req.json()
  return await prdOptGrpRepository.create(product_id, body)
}

create.schema = joi.object({
  optionGroupName: joi.string().required(),
  isRequire: joi.boolean(),
  isDuplicate: joi.boolean(),
  options: joi.array().items({
    optionName: joi.string().required(),
    isDefault: joi.boolean(),
    optionPrice: joi.number().required(),
  }),
})
