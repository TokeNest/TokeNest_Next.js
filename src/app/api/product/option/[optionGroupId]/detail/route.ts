import { apiHandler } from '@/app/_helpers/server/api'
import { prdOptRepository } from '@/app/_helpers/server/_repository'

module.exports = apiHandler({
  GET: getAll,
})

function getAll(req: Request, { params: { optionGroupId } }: any) {
  return prdOptRepository.getAllByGroupId(optionGroupId)
}
