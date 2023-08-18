import joi from 'joi'

import { apiHandler } from '@/app/_helpers/server/api'
import { parse } from 'url'
import { addressRepository } from '@/app/_helpers/server/_repository/addressRespository'


module.exports = apiHandler({
  POST: create,
})

async function create(req: Request, { params: { user_id } }: any) {
  const body = await req.json()
  await addressRepository.create(user_id, body)
}

create.schema = joi.object({
  address_name: joi.string().required(),
  road_address: joi.string().required(),
  address_detail: joi.string().required(),
})

