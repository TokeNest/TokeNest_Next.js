import { apiHandler } from '@/app/_helpers/server/api'
import { prdOptGrpRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'

module.exports = apiHandler({
  GET: getAll,
  PUT: update,
  DELETE: _delete,
})

async function getAll(req: Request, { params: { optionGroupId } }: any) {
  return await prdOptGrpRepository.getById(optionGroupId)
}

async function update(req: Request, { params: { optionGroupId } }: any) {
  const body = await req.json()
  await prdOptGrpRepository.update(optionGroupId, body)
}

update.schema = joi.object({
  productOptionGroupName: joi.string().required(),
  productOptionGroupIsRequire: joi.boolean().required(),
  productOptionGroupIsDuplicate: joi.boolean().required(),
})

async function _delete(req: Request, { params: { optionGroupId } }: any) {
  await prdOptGrpRepository.softDelete(optionGroupId)
}
