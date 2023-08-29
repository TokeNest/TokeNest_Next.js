import { apiHandler } from '@/app/_helpers/server/api'
import joi from 'joi'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { productOptionGroupRepository } from '@/app/_helpers/server/_repository/store/productOptionGroupRepository'

module.exports = apiHandler({
  GET: getAll,
  PUT: update,
  DELETE: _delete,
})

async function getAll(_req: Request, { params }: ParamsInputId) {
  return productOptionGroupRepository.getById(params.id)
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
