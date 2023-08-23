import joi from 'joi'

import { apiHandler } from '@/app/_helpers/server/api'
import { addressService } from '@/app/_helpers/server/_service/addressService'

module.exports = apiHandler({
  POST: create,
  GET: getByUserId,
})

async function create(req: Request, { params: { id } }: any) {
  return addressService.join(id, await req.json())
}

create.schema = joi.object({
  address_name: joi.string().required(),
  road_address: joi.string().required(),
  address_detail: joi.string().required(),
})

async function getByUserId(req: Request, { params: { id } }: any) {
  return addressService.getAddressByUserId(id)
}
