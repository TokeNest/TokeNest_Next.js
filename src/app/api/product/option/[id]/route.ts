import { apiHandler } from '@/app/_helpers/server/api'
import { prdOptGrpRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'

module.exports = apiHandler({
  GET: getAll,
  PUT: update,
  DELETE: _delete,
})

async function getAll(_req: Request, { params }: ParamsInputId) {
  return await prdOptGrpRepository.getById(params.id)
}

async function update(req: Request, { params }: ParamsInputId) {
  const body = await req.json()
  await prdOptGrpRepository.update(params.id, body)
}

update.schema = joi.object({
  productOptionGroupName: joi.string().required(),
  productOptionGroupIsRequire: joi.boolean().required(),
  productOptionGroupIsDuplicate: joi.boolean().required(),
})

async function _delete(req: Request, { params }: ParamsInputId) {
  await prdOptGrpRepository.softDelete(params.id)
}
