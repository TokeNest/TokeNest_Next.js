import { apiHandler } from '@/app/_helpers/server/api'
import { addressService } from '@/app/_helpers/server/_service/addressService'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'
import joi from 'joi'
import { apiResponses } from '@/utils/server/response/apiResponse'

const getById = async function (_req: Request, { params }: ParamsInputId) {
  return apiResponses.apiExecuteSuccessWithBody(await addressService.getAddressById(params.id))
}

const update = async function (req: Request, { params }: ParamsInputId) {
  return apiResponses.apiExecuteSuccessWithId(
    await addressService.update(params.id, await req.json())
  )
}

const _delete = async function (_req: Request, { params }: ParamsInputId) {
  return apiResponses.apiExecuteSuccessWithId(await addressService.delete(params.id))
}

update.schema = joi.object({
  addressName: joi.string().required(),
  roadAddress: joi.string().required(),
  addressDetail: joi.string().required(),
})

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})
