import { apiHandler } from '@/app/_helpers/server/api'
import { prdOptGrpRepository } from '@/app/_helpers/server/_repository'
import joi from 'joi'

module.exports = apiHandler({
  GET: getAll,
  PUT: update,
  DELETE: _delete,
})

async function getAll(req: Request, { params: { option_group_id } }: any) {
  return await prdOptGrpRepository.getById(option_group_id)
}

async function update(req: Request, { params: { option_group_id } }: any) {
  const body = await req.json()
  await prdOptGrpRepository.update(option_group_id, body)
}

update.schema = joi.object({
  product_option_group_name: joi.string().required(),
  product_option_group_is_require: joi.boolean().required(),
  product_option_group_is_duplicate: joi.boolean().required(),
})

async function _delete(req: Request, { params: { option_group_id } }: any) {
  await prdOptGrpRepository.softDelete(option_group_id)
}
