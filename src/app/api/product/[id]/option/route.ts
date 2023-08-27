import { apiHandler } from '@/app/_helpers/server/api'
import { prdOptGrpRepository } from '@/app/_helpers/server/_repository'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'
import { OptionGroup } from '@/variables/interface/kiosk-interface'

module.exports = apiHandler({
  GET: getAll,
  POST: create,
})

function getAll(_req: Request, { params }: ParamsInputId) {
  return prdOptGrpRepository.getAllByProductId(params.id)
}

async function create(req: Request, { params }: ParamsInputId) {
  const body: OptionGroup = await req.json()
  return await prdOptGrpRepository.create(params.id, body)
}

// create.schema = joi.object({
//   optionGroupName: joi.string().required(),
//   isRequire: joi.boolean(),
//   isDuplicate: joi.boolean(),
//   options: joi.array().items({
//     optionName: joi.string().required(),
//     isDefault: joi.boolean(),
//     optionPrice: joi.number().required(),
//   }),
// })
