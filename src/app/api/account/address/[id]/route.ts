import { addressService } from '@/app/_helpers/server/_service/account/addressService'
import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'
import joi from 'joi'

const getById = async function (_req: Request, { params }: ParamsInputId) {
  return await addressService.getAddress(params.id)
}

const update = async function (req: Request, { params }: ParamsInputId) {
  return await addressService.updateAddress(params.id, await req.json())
}

const _delete = async function (_req: Request, { params }: ParamsInputId) {
  return await addressService.softDeleteAddress(params.id)
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
