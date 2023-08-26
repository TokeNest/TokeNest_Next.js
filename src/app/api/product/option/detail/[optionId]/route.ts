import { apiHandler } from '@/app/_helpers/server/api'
import { prdOptRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(req: Request, { params: { optionId } }: any) {
  return await prdOptRepository.getById(optionId)
}

async function update(req: Request, { params: { optionId } }: any) {
  const body = await req.json()
  await prdOptRepository.update(optionId, body)
}

update.schema = joi.object({
  productOptionName: joi.string().required(),
  productOptionIsDefault: joi.boolean().required(),
  productOptionPrice: joi.number().required(),
})

async function _delete(req: Request, { params: { optionId } }: any) {
  await prdOptRepository.softDelete(optionId)
}
