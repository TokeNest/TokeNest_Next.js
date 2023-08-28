import { apiHandler } from '@/app/_helpers/server/api'
import joi from 'joi'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'
import { productOptionGroupRepository } from '@/app/_helpers/server/_repository/productOptionGroupRepository'

module.exports = apiHandler({
  GET: getAll,
  PUT: update,
  DELETE: _delete,
})

async function getAll(_req: Request, { params }: ParamsInputId) {
  return await productOptionGroupRepository.getById(params.id)
}

async function update(req: Request, { params }: ParamsInputId) {
  const body = await req.json()
  await productOptionGroupRepository.update(params.id, body)
}

update.schema = joi.object({
  productOptionGroupName: joi.string().required(),
  productOptionGroupIsDuplicate: joi.boolean().required(),
})

async function _delete(req: Request, { params }: ParamsInputId) {
  await productOptionGroupRepository.softDelete(params.id)
}
