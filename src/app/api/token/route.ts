import { apiHandler } from '@/app/_helpers/server/api'
import { tokenService } from '@/app/_helpers/server/_service/token/TokenService'
import joi from 'joi'

async function create(req: Request) {
  return tokenService.createToken(await req.json())
}

create.schema = joi.object({
  tokenSymbol: joi.string().required(),
  tokenAddress: joi.string().required(),
  tokenDecimals: joi.number().required(),
})

async function getAll(_req: Request) {
  return tokenService.getTokens()
}

module.exports = apiHandler({
  POST: create,
  GET: getAll,
})
