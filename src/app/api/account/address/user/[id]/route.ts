import joi from 'joi'

import { apiHandler } from '@/app/_helpers/server/api'
import { addressRepository } from '@/app/_helpers/server/_repository/addressRespository'

module.exports = apiHandler({
  POST: create,
  GET: getByUserId,
})

async function create(req: Request, { params: { id } }: any) {
  const body = await req.json()
  return await addressRepository.create(id, body)
}

create.schema = joi.object({
  address_name: joi.string().required(),
  road_address: joi.string().required(),
  address_detail: joi.string().required(),
})

async function getByUserId(req: Request, { params: { id } }: any) {
  return await addressRepository.getByUserId(id)
}
