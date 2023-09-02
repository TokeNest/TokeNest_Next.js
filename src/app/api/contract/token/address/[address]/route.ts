import { apiHandler } from '@/app/_helpers/server/api'
import { tokenService } from '@/app/_helpers/server/_service/contract/TokenService'
import { ParamsInputAddress } from '@/variables/interface/api/params-input-interface'

async function getByAddress(_req: Request, { params }: ParamsInputAddress) {
  return tokenService.getTokenByAddress(params.address)
}

module.exports = apiHandler({
  GET: getByAddress,
})
