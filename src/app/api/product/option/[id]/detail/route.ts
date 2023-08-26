import { apiHandler } from '@/app/_helpers/server/api'
import { prdOptRepository } from '@/app/_helpers/server/_repository'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'

module.exports = apiHandler({
  GET: getAll,
})

function getAll(_req: Request, { params }: ParamsInputId) {
  return prdOptRepository.getAllByGroupId(params.id)
}
