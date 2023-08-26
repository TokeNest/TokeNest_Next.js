import joi from 'joi'

import { apiHandler } from '@/app/_helpers/server/api'
import { addressService } from '@/app/_helpers/server/_service/addressService'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'

const create = async function (req: Request, { params }: ParamsInputId) {
  return addressService.join(params.id, await req.json())
}

const getByUserId = async function (_req: Request, { params }: ParamsInputId) {
  return addressService.getAddressByUserId(params.id)
}

create.schema = joi.object({
  address_name: joi.string().required(),
  road_address: joi.string().required(),
  address_detail: joi.string().required(),
})

module.exports = apiHandler({
  POST: create,
  GET: getByUserId,
})
