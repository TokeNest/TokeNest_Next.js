import joi from 'joi'

import { apiHandler } from '@/app/_helpers/server/api'
import { userRepository } from '@/app/_helpers/server/_repository'


module.exports = apiHandler({
  POST: create
})

async function create(req: Request) {
  const body = await req.json()
  const searchParams = new URL(req.url)
  const user_id = searchParams.get('user_id')
  await userRepository.createAddress(user_id,body)
}

create.schema = joi.object({
  addresses: joi.array().items({
    address_name: joi.string(),
    road_address: joi.string(),
    address_detail: joi.string(),
  }),
})

