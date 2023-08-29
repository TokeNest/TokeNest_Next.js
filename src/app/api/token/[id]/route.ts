import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { tokenService } from '@/app/_helpers/server/_service/token/TokenService'

async function getById(_req: Request, { params }: ParamsInputId) {
  return tokenService.getTokenById(params.id)
}

async function _delete(_req: Request, { params }: ParamsInputId) {
  return tokenService.softDeleteTokenById(params.id)
}

module.exports = apiHandler({
  GET: getById,
  DELETE: _delete,
})
