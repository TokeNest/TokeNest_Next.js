import joi from 'joi'

import { apiHandler } from '@/app/_helpers/server/api'
import { parse } from 'url'
import { addressRepository } from '@/app/_helpers/server/_repository/addressRespository'


module.exports = apiHandler({
  POST: create,
})

async function create(req: Request) {
  const body = await req.json()

  // get param
  const url = req.url
  const urlObj = parse(url, true)
  const userId: string = urlObj.query.userId as string

  await addressRepository.create(userId, body)
}

create.schema = joi.object({
  address_name: joi.string().required(),
  road_address: joi.string().required(),
  address_detail: joi.string().required(),
})

