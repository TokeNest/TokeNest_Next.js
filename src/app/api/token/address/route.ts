import { apiHandler } from '@/app/_helpers/server/api'
import joi from 'joi'
import { tokenService } from '@/app/_helpers/server/_service/token/TokenService'

async function getByAddress(req: Request) {
  console.log('dd')
  return tokenService.getTokenByAddress((await req.json()).tokenAddress)
}

getByAddress.schema = joi.object({
  tokenAddress: joi.string().required(),
})
module.exports = apiHandler({
  POST: getByAddress,
})
