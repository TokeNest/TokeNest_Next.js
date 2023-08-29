import { addressService } from '@/app/_helpers/server/_service/account/addressService'
import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import joi from 'joi'

const getById = async function (_req: Request, { params }: ParamsInputId) {
  return addressService.getAddressById(params.id)
}

const update = async function (req: Request, { params }: ParamsInputId) {
  return addressService.updateAddressById(params.id, await req.json())
}

const _delete = async function (_req: Request, { params }: ParamsInputId) {
  return addressService.softDeleteAddressById(params.id)
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
