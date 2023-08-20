import joi from 'joi'

import { apiHandler } from '@/app/_helpers/server/api'
import { addressRepository } from '@/app/_helpers/server/_repository/addressRespository'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete,
})

async function getById(req: Request, { params: { id } }: any) {
  return await addressRepository.getById(id)
}

async function update(req: Request, { params: { id } }: any) {
  const body = req.json()
  await addressRepository.update(id, body)
  return body
}

update.schema = joi.object({
  address_name: joi.string().required(),
  road_address: joi.string().required(),
  address_detail: joi.string().required(),
})

async function _delete(req: Request, { params: { id } }: any) {
  await addressRepository.delete(id)
  return true
}
