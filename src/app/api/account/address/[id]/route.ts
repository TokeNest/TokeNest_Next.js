import joi from 'joi'

import { apiHandler } from '@/app/_helpers/server/api'
import { addressService } from '@/app/_helpers/server/_service/addressService'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(req: Request, { params: { id } }: any) {
  return addressService.getAddressById(id)
}

async function update(req: Request, { params: { id } }: any) {
  return addressService.update(id, await req.json())
}

update.schema = joi.object({
  address_name: joi.string().required(),
  road_address: joi.string().required(),
  address_detail: joi.string().required(),
})

async function _delete(req: Request, { params: { id } }: any) {
  return addressService.delete(id)
}
