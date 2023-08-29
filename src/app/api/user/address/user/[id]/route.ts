import joi from 'joi'

import { apiHandler } from '@/app/_helpers/server/api'
import { addressService } from '@/app/_helpers/server/_service/account/addressService'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'

const create = async function (req: Request, { params }: ParamsInputId) {
  return addressService.createAddressByUserId(params.id, await req.json())
}

const getByUserId = async function (_req: Request, { params }: ParamsInputId) {
  return addressService.getAddressesByUserId(params.id)
}

create.schema = joi.object({
  addressName: joi.string().required(),
  roadAddress: joi.string().required(),
  addressDetail: joi.string().required(),
})

module.exports = apiHandler({
  POST: create,
  GET: getByUserId,
})
